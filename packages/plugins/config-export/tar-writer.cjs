// ── 纯 Node 的 .tar.gz 打包器 ──
//
// 🔴 **为什么不用系统的 `tar` 命令**（2026-10-26，被坑了三轮）：
//
// Windows 上 PATH 里可能有两个 tar：
//   · `C:\Program Files\Git\usr\bin\tar.exe` —— GNU tar 1.35，支持 `--force-local`
//   · `C:\WINDOWS\system32\tar.exe`        —— bsdtar 3.8.9，**不认识** `--force-local`
//
// 命令行里（Git Bash 环境）解析到 GNU tar，一切正常；
// **GUI 插件进程的 PATH 不一样，落到 bsdtar** → 它直接退：
//     `tar.exe: Option --force-local is not supported`
//   返回码 **1**，而 `--force-local` 是我们为了避开 `C:` 被当主机名**必需**的。
//
// 更坑的是：返回码 1 在 GNU tar 里表示"文件读取期间有变化，但包是好的"这个**警告**，
// 我们据此把 code<2 当成功 → bsdtar 什么都没产出却报了成功。
//
// 所以干脆**自己写**：tar 格式足够简单（512 字节头部 + 数据块 + 结尾），
// gzip 用 Node 内置的 zlib。零外部依赖，不受 PATH 影响，行为可测。
//
// 输出为 USTAR 格式（POSIX 1988），GNU tar / bsdtar / 7-Zip 都能读。

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const { pipeline } = require("stream/promises");

const BLOCK = 512;

/**
 * GNU 长文件名条目名。当路径超过 ustar 的 name(100)+prefix(155) 时，
 * 先写一个 typeflag='L' 的条目，其内容是完整路径，下一个头才用截断名。
 *
 * bsdtar / GNU tar / 7-Zip 都支持这个约定。
 */
const LONG_LINK = "././@LongLink";

/**
 * 名字能否拆进 name(100) + prefix(155)。
 *
 * ⚠️ **判断和拆分必须是同一套逻辑**（2026-10-26 踩坑）：
 * 原来这里用 `lastIndexOf("/")`、而 `header()` 里用
 * `lastIndexOf("/", len-101)`，两个条件不一致 ——
 * 判断说"能拆"，拆分时却拆不出来，最后落成截断名
 * → 长目录和长文件名截断后撞车 → 解包时 EISDIR。
 *
 * 现在统一：**以 header() 的拆法为准**。
 */
function splitName(name) {
  const nm = name.replace(/\\/g, "/");
  const len = Buffer.byteLength(nm, "utf8");
  if (len <= 100) return { base: nm, prefix: "" };

  // 与 header 完全一致的拆法
  const slash = nm.lastIndexOf("/", nm.length - 101);
  if (slash <= 0) return null;
  const prefix = nm.slice(0, slash);
  const base = nm.slice(slash + 1);
  if (Buffer.byteLength(base, "utf8") > 100) return null;
  if (Buffer.byteLength(prefix, "utf8") > 155) return null;
  return { base, prefix };
}

function canSplitIntoNameAndPrefix(name) {
  return splitName(name) !== null;
}

/** 写一个 512 字节的 ustar 头 */
function header({ name, size, mode, mtime, typeflag, prefix = "", forceType = null }) {
  const h = Buffer.alloc(BLOCK, 0);

  const put = (str, off, len) => {
    const b = Buffer.from(str, "utf8");
    b.copy(h, off, 0, Math.min(b.length, len));
  };
  const putOctal = (num, off, len) => {
    // 八进制 + 结尾 NUL（ustar 规范）
    const s = num.toString(8);
    const width = len - 1;
    put(s.padStart(width, "0").slice(-width), off, width);
    h[off + width] = 0;
  };

  // name(100) + prefix(155)。**与 splitName 同一套逻辑** ——
  // 拆得下就拆；拆不下时调用方已经写过 LongLink 条目，这里用截断名占位即可。
  const split = splitName(name);
  let nm, pfx;
  if (split) {
    nm = split.base;
    pfx = split.prefix || prefix;
  } else {
    // LongLink 已承载真名，这里只要一个**非空**占位名。
    // ⚠️ 不能用 `lastIndexOf("/")` 取末段 —— 目录名以 `/` 结尾，
    // 会取到空串 → 头部 name 为空 → 解包时丢失该条目（实测踩到）。
    const n = name.replace(/\\/g, "/").replace(/\/+$/, "");
    const base = n.slice(n.lastIndexOf("/") + 1).replace(/\/+$/, "") || "entry";
    nm = base.slice(0, 100);
    pfx = "";
  }
  prefix = pfx;
  put(nm, 0, 100);
  putOctal(mode & 0o7777, 100, 8);      // mode
  putOctal(0, 108, 8);                   // uid
  putOctal(0, 116, 8);                   // gid
  putOctal(size, 124, 12);               // size
  putOctal(Math.floor(mtime / 1000), 136, 12); // mtime
  put("        ", 148, 8);               // checksum 占位（先填 8 个空格）
  h[156] = forceType
    ? forceType.charCodeAt(0)              // 'L' 长名 / '5' 目录 / '0' 文件
    : (typeflag === "dir" ? 0x35 : 0x30);
  put("ustar\0", 257, 6);                // magic
  put("00", 263, 2);                     // version
  if (prefix) put(prefix, 345, 155);

  // 校验和：所有字节加起来（checksum 字段本身按空格算）
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += h[i];
  const ck = sum.toString(8).padStart(6, "0") + "\0 ";
  put(ck, 148, 8);

  return h;
}

/** 把 size 补齐到 512 的整数倍 */
function padding(size) {
  const rem = size % BLOCK;
  return rem === 0 ? 0 : BLOCK - rem;
}

/**
 * 递归收集目录下的所有条目（相对路径 + 类型）。
 * 不跟进符号链接（与旧实现一致 —— 避免把外部目录卷进来）。
 */
async function collectEntries(rootDir) {
  const entries = [];

  async function walk(absDir, relDir) {
    let ents = [];
    try {
      ents = await fsp.readdir(absDir, { withFileTypes: true });
    } catch {
      return;
    }
    // 排序保证输出稳定（同样的输入产生同样的包，便于校验）
    ents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    for (const e of ents) {
      const abs = path.join(absDir, e.name);
      const rel = relDir ? `${relDir}/${e.name}` : e.name;

      let st;
      try {
        st = await fsp.lstat(abs); // lstat：不跟进链接
      } catch {
        continue;
      }

      if (st.isSymbolicLink()) continue; // 链接不跟进
      if (st.isDirectory()) {
        entries.push({ rel, abs, type: "dir", size: 0, mode: st.mode, mtime: st.mtimeMs });
        await walk(abs, rel);
      } else if (st.isFile()) {
        entries.push({ rel, abs, type: "file", size: st.size, mode: st.mode, mtime: st.mtimeMs });
      }
    }
  }

  await walk(rootDir, "");
  return entries;
}

/**
 * 把 `rootDir` 的内容打成 `outGzPath`（.tar.gz）。
 *
 * 边读边写、流式压缩 —— 13k 文件 / 100MB 也不会把内存打爆。
 *
 * @returns {Promise<{entries:number, bytes:number}>}
 */
async function packDirectory(rootDir, outGzPath, opts = {}) {
  let entries = await collectEntries(rootDir);

  // 把指定条目挪到最前面。
  //
  // 🔴 **manifest.json 必须在开头**（2026-11-07 实测）：
  // tar.gz 是顺序流，读第 N 个条目要先把前面所有字节 gunzip 一遍。
  // 原来按字母序打包，manifest.json 排在 data/ 之后 → **归档最后一条**，
  // 于是 restore-tools 的 list / compare / rate 每次都要解 651MB / 29000 条，
  // 光 `list` 就花了 **3 分 17 秒**（它其实只读 14MB 的 manifest）。
  // 挪到开头后同样的命令秒出。
  const first = (opts.first || []).map((s) => s.replace(/^\.?\/+/, ""));
  if (first.length) {
    const rank = new Map(first.map((n, i) => [n, i]));
    const head = [];
    const tail = [];
    for (const e of entries) {
      const r = rank.get(e.rel);
      if (r === undefined) tail.push(e);
      else head.push({ ...e, _rank: r });
    }
    head.sort((a, b) => a._rank - b._rank);
    entries = head.concat(tail);
  }

  const gzip = zlib.createGzip({ level: 6 });
  const out = fs.createWriteStream(outGzPath);
  const done = pipeline(gzip, out);

  // 条目名统一带 `./` 前缀 —— 与旧版 `tar -C dir .` 的输出保持一致，
  // 这样既有的解包/查找逻辑（以及用户的习惯）都不用改。
  const DOT = "./";

  let bytes = 0;
  // error 监听只加一次 —— 原来每次 write 都 `once("error")`，
  // 文件一多就触发 MaxListenersExceededWarning（并且真的在积累监听器）。
  let gzipError = null;
  gzip.on("error", (e) => { gzipError = e; });
  const write = (buf) =>
    new Promise((resolve, reject) => {
      if (gzipError) return reject(gzipError);
      bytes += buf.length;
      if (gzip.write(buf)) resolve();
      else gzip.once("drain", resolve);
    });

  /**
   * 路径放不进 ustar 的 name+prefix 时，先写一个 GNU LongLink 条目。
   * 真实数据里会话文件名很长（project slug + uuid），一定会触发。
   */
  async function maybeLongLink(fullName) {
    const fits =
      Buffer.byteLength(fullName, "utf8") <= 100 ||
      canSplitIntoNameAndPrefix(fullName);
    if (fits) return;
    const payload = Buffer.from(fullName, "utf8");
    await write(
      header({
        name: LONG_LINK,
        size: payload.length,
        mode: 0o644,
        mtime: Date.now(),
        typeflag: "file",
        forceType: "L",
      }),
    );
    await write(payload);
    const pad = padding(payload.length);
    if (pad) await write(Buffer.alloc(pad, 0));
  }

  for (const e of entries) {
    const fullName = DOT + (e.type === "dir" ? e.rel + "/" : e.rel);
    await maybeLongLink(fullName);

    if (e.type === "dir") {
      await write(header({ name: fullName, size: 0, mode: e.mode, mtime: e.mtime, typeflag: "dir" }));
      continue;
    }
    await write(
      header({ name: fullName, size: e.size, mode: e.mode, mtime: e.mtime, typeflag: "file" }),
    );

    // 数据块（流式背压：gzip 满了就暂停读取）
    await new Promise((resolve, reject) => {
      const rs = fs.createReadStream(e.abs, { highWaterMark: 256 * 1024 });
      const onDrain = () => rs.resume();
      rs.on("error", reject);
      rs.on("data", (chunk) => {
        bytes += chunk.length;
        if (!gzip.write(chunk)) rs.pause();
      });
      gzip.on("drain", onDrain);
      rs.on("end", () => { gzip.removeListener("drain", onDrain); resolve(); });
      rs.on("close", () => { gzip.removeListener("drain", onDrain); resolve(); });
    });

    const pad = padding(e.size);
    if (pad) await write(Buffer.alloc(pad, 0));
  }

  // 结尾：两个全零块
  await write(Buffer.alloc(BLOCK * 2, 0));
  gzip.end();
  await done;

  return { entries: entries.length, bytes };
}

/** 列出一个 .tar.gz 里的条目名（校验/自检用，纯 Node） */
async function listArchive(gzPath) {
  const names = [];
  let buf = Buffer.alloc(0);

  await new Promise((resolve, reject) => {
    const rs = fs.createReadStream(gzPath);
    const gunzip = zlib.createGunzip();
    let pending = Buffer.alloc(0);
    let pendingLongName = null; // 上一个 'L' 条目带来的完整名字
    let offset = 0; // 在解压后字节流里的位置

    gunzip.on("data", (chunk) => {
      pending = Buffer.concat([pending, chunk]);
      // 解析头部
      while (pending.length >= BLOCK) {
        const h = pending.subarray(0, BLOCK);
        // 全零块 = 结束
        if (h.every((b) => b === 0)) { pending = Buffer.alloc(0); return; }
        const nameRaw = h.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
        const prefix = h.subarray(345, 500).toString("utf8").replace(/\0.*$/, "");
        const sizeStr = h.subarray(124, 136).toString("ascii").replace(/\0.*$/, "").trim();
        const size = parseInt(sizeStr || "0", 8) || 0;
        const type = String.fromCharCode(h[156]);

        const total = BLOCK + size + padding(size);
        if (pending.length < total) break; // 等更多数据

        // GNU LongLink：条目内容是"下一个条目"的完整名字
        if (type === "L") {
          const longName = pending
            .subarray(BLOCK, BLOCK + size)
            .toString("utf8")
            .replace(/\0+$/, "");
          pendingLongName = longName;
          pending = pending.subarray(total);
          continue;
        }

        let name = prefix ? `${prefix}/${nameRaw}` : nameRaw;
        if (pendingLongName) {
          name = pendingLongName;
          pendingLongName = null;
        }

        if (type === "0" || type === "\0" || type === "5") names.push(name);
        pending = pending.subarray(total);
      }
    });
    gunzip.on("error", reject);
    gunzip.on("end", resolve);
    rs.on("error", reject);
    rs.pipe(gunzip);
  });

  return names;
}

/**
 * 把 `.tar.gz` 解到 `destDir`（纯 Node，不调系统 tar）。
 *
 * 安全：拒绝任何会逃出 destDir 的路径（`..` / 绝对路径 / 盘符），
 * 防止恶意包写到别处。
 *
 * @returns {Promise<{files:number, dirs:number}>}
 */
/**
 * @param {string} gzPath
 * @param {string} destDir
 * @param {string} [onlyRe] 只解压路径匹配该正则的条目（其余只跳过、不写盘）
 */
async function extractArchive(gzPath, destDir, onlyRe) {
  await fsp.mkdir(destDir, { recursive: true });
  const destAbs = path.resolve(destDir);
  const matcher = onlyRe ? new RegExp(onlyRe) : null;

  let files = 0;
  let dirs = 0;
  let skipped = 0;
  let pending = Buffer.alloc(0);
  let pendingLongName = null;
  let stopped = false;

  const safeJoin = (name) => {
    // 规范化：去掉 ./ 前缀，统一分隔符
    const clean = name.replace(/\\/g, "/").replace(/^\.\/+/, "");
    if (!clean) return null;
    // 拒绝绝对路径 / 盘符 / 上跳
    if (path.isAbsolute(clean) || /^[a-zA-Z]:/.test(clean)) {
      throw new Error(`包内含绝对路径，拒绝解压：${name}`);
    }
    const target = path.resolve(destAbs, clean);
    if (target !== destAbs && !target.startsWith(destAbs + path.sep)) {
      throw new Error(`包内路径逃逸，拒绝解压：${name}`);
    }
    return target;
  };

  // ── 流式解包 ──
  //
  // 🔴 **不要攒进内存**（2026-11-06，实测 247MB 包卡 164 秒）：
  //
  // 真实备份里有个 130MB 的单文件（会话历史）。旧实现在每次 chunk 到达时
  // 都 `Buffer.concat([pending, chunk])` —— pending 里那 130MB 被完整重拷一次，
  // 45981 个 chunk 下来是 O(n²)：164 秒里 157 秒花在拷内存。
  //
  // 现在改成状态机：当前 entry 还没读完时，chunk 里的数据**直接 append 到磁盘**，
  // 内存里只留解析头部需要的几百字节。
  //
  // ⚠️ 另一个坑：`gunzip.on("data", async ...)` 里 await 不生效 ——
  // 事件回调不等 Promise，`files++` 会在解压结束后才执行（实测踩到：
  // 解出 0 个文件但 readEntry 却正常）。所以这里用同步的 `writeSync`。
  let curFd = null;      // 正在写的文件句柄
  let curRemain = 0;     // 这个 entry 还剩多少字节没写
  let curPadding = 0;    // 写完正文后还要跳过的对齐字节

  // GNU LongLink 的正文也可能跨 chunk
  let longChunks = null;
  let longRemain = 0;
  let longPadding = 0;
  let longPaddingLeft = 0;

  // 被 `--only` 跳过 / 不安全路径 / 非普通文件 —— 还要跳过多少字节。
  // 🔴 **不能 `off += n` 一步跳**：n 可能远大于当前 buf 剩下长度（正文动辄几十 MB，
  // 一个 chunk 才 64KB）。越过 buf 的偏移会带到下一个 chunk 上 → 头部解析全错、
  // 无限循环（2026-11-07 实测：`--only` 在 651MB 包上卡死）。
  let skipRemain = 0;
  const queueSkip = (n) => { skipRemain = n; };

  const closeCur = () => {
    if (curFd !== null) {
      try { fs.closeSync(curFd); } catch { /* 已关 */ }
      curFd = null;
      files++;
    }
  };

  await new Promise((resolve, reject) => {
    const rs = fs.createReadStream(gzPath);
    const gunzip = zlib.createGunzip();

    gunzip.on("data", (chunk) => {
      if (stopped) return;

      try {
        let buf = pending.length === 0 ? chunk : Buffer.concat([pending, chunk]);
        let off = 0;

        while (off < buf.length) {
          // ⓪ 正在收集 GNU 长文件名（可能跨 chunk）
          if (longRemain > 0) {
            const take = Math.min(longRemain, buf.length - off);
            longChunks.push(Buffer.from(buf.subarray(off, off + take)));
            off += take;
            longRemain -= take;
            if (longRemain === 0) {
              pendingLongName = Buffer.concat(longChunks).toString("utf8").replace(/\0+$/, "");
              longChunks = null;
              longPaddingLeft = longPadding;
            }
            continue;
          }
          if (longPaddingLeft > 0) {
            const skip = Math.min(longPaddingLeft, buf.length - off);
            off += skip;
            longPaddingLeft -= skip;
            continue;
          }

          // ⓪' 需要跳过的正文（被过滤 / 非普通文件）—— 逐 chunk 消化
          if (skipRemain > 0) {
            const skip = Math.min(skipRemain, buf.length - off);
            off += skip;
            skipRemain -= skip;
            continue;
          }

          // ① 正在写某个文件的正文 → 直接 append，不攒内存
          if (curRemain > 0) {
            const take = Math.min(curRemain, buf.length - off);
            fs.writeSync(curFd, buf, off, take);
            off += take;
            curRemain -= take;
            continue;
          }

          // ② 跳过正文之后的块对齐填充
          if (curPadding > 0) {
            const skip = Math.min(curPadding, buf.length - off);
            off += skip;
            curPadding -= skip;
            if (curPadding === 0) closeCur();
            continue;
          }

          // ③ 解析下一个头部
          if (buf.length - off < BLOCK) break; // 头部不完整，等下一块
          const h = buf.subarray(off, off + BLOCK);

          if (h.every((b) => b === 0)) {
            // 结尾的全零块
            off = buf.length;
            break;
          }

          const nameRaw = h.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
          const prefix = h.subarray(345, 500).toString("utf8").replace(/\0.*$/, "");
          const sizeStr = h.subarray(124, 136).toString("ascii").replace(/\0.*$/, "").trim();
          const size = parseInt(sizeStr || "0", 8) || 0;
          const type = String.fromCharCode(h[156]);
          off += BLOCK;

          if (type === "L") {
            // GNU 长文件名：这本身是个数据块，**可能跨 chunk**（GNU 的 L
            // 条目按路径长度算，长路径 200+ 字节，chunk 边界随时会切开它）。
            // 用和正文相同的「剩余多少」状态机，不要假设它在当前 buf 里放得下。
            longChunks = [];
            longRemain = size;
            longPadding = padding(size);
            continue;
          }

          let name = prefix ? `${prefix}/${nameRaw}` : nameRaw;
          if (pendingLongName) { name = pendingLongName; pendingLongName = null; }

          // `--only` 过滤：不匹配的条目只推进偏移，不建目录、不写文件。
          // 匹配对象是**剥掉 `./` 和 `data/` 之后**的路径 —— 与 manifest 的
          // `relPath` 同一套写法，AI 才不用猜包内前缀。
          const wanted = !matcher ||
            matcher.test(name.replace(/^\.\/+/, "").replace(/^data\//, ""));

          if (type === "5") {
            if (!wanted) { skipped++; queueSkip(size + padding(size)); continue; }
            const target = safeJoin(name);
            if (target) { fs.mkdirSync(target, { recursive: true }); dirs++; }
            queueSkip(padding(size));
          } else if (type === "0" || type === "\0") {
            if (!wanted) { skipped++; queueSkip(size + padding(size)); continue; }
            const target = safeJoin(name);
            if (target) {
              fs.mkdirSync(path.dirname(target), { recursive: true });
              curFd = fs.openSync(target, "w");
              curRemain = size;
              curPadding = padding(size);
              if (size === 0) { closeCur(); curPadding = 0; }
            } else {
              queueSkip(size + padding(size)); // 不安全的路径 → 整块跳过
            }
          } else {
            // 其它类型（符号链接 / 设备文件等）→ 跳过正文
            queueSkip(size + padding(size));
          }
        }

        // 剩下的尾巴留着跟下一块拼 —— 这时它最多几百字节（头部）
        pending = off < buf.length ? Buffer.from(buf.subarray(off)) : Buffer.alloc(0);
      } catch (e) {
        stopped = true;
        closeCur();
        gunzip.destroy();
        reject(e);
      }
    });

    gunzip.on("error", (e) => { if (!stopped) { stopped = true; closeCur(); reject(e); } });
    gunzip.on("end", () => { if (!stopped) { stopped = true; closeCur(); resolve(); } });
    rs.on("error", (e) => { if (!stopped) { stopped = true; closeCur(); reject(e); } });
    rs.pipe(gunzip);
  });

  return { files, dirs, skipped };
}

/**
 * 一次性扫过整个归档，**边读边算每个文件的 sha256**（不落盘）。
 *
 * 🔴 **为什么要有它**（2026-11-07）：
 * 原来的 `verify` 是「先 extractArchive 到临时目录（651MB 落盘），
 * 再逐个 readFileSync 算哈希」—— 同一份数据读了写、写了读，
 * 在机械盘上光 I/O 就要好几分钟，还多占 651MB 临时空间。
 *
 * 这里复用 extractArchive 的状态机，但正文**只更新哈希，不写文件**。
 * 比 extractArchive 还快：不产生任何磁盘写。
 *
 * @param {string} gzPath
 * @param {{onEntry?:(info:{relPath:string,size:number,sha256:string})=>void}} [opts]
 * @returns {Promise<Map<string,{size:number,sha256:string}>>} relPath → 信息
 */
async function hashArchive(gzPath, opts = {}) {
  const out = new Map();
  let pending = Buffer.alloc(0);
  let pendingLongName = null;
  let stopped = false;

  let curRel = null;     // 正在算哈希的条目
  let curHash = null;
  let curSize = 0;
  let curRemain = 0;
  let curPadding = 0;
  let curDeclared = 0;

  // GNU LongLink 的正文也可能跨 chunk
  let longChunks = null;
  let longRemain = 0;
  let longPadding = 0;
  let longPaddingLeft = 0;

  const finishCur = () => {
    if (curRel !== null) {
      const v = { size: curDeclared, sha256: curHash.digest("hex") };
      out.set(curRel, v);
      if (opts.onEntry) opts.onEntry({ relPath: curRel, ...v });
      curRel = null;
      curHash = null;
    }
  };

  await new Promise((resolve, reject) => {
    const rs = fs.createReadStream(gzPath, { highWaterMark: 1024 * 1024 });
    const gunzip = zlib.createGunzip();

    gunzip.on("data", (chunk) => {
      if (stopped) return;
      try {
        let buf = pending.length === 0 ? chunk : Buffer.concat([pending, chunk]);
        let off = 0;

        while (off < buf.length) {
          // ⓪ GNU 长文件名（可能跨 chunk）
          if (longRemain > 0) {
            const take = Math.min(longRemain, buf.length - off);
            longChunks.push(Buffer.from(buf.subarray(off, off + take)));
            off += take;
            longRemain -= take;
            if (longRemain === 0) {
              pendingLongName = Buffer.concat(longChunks).toString("utf8").replace(/\0+$/, "");
              longChunks = null;
              longPaddingLeft = longPadding;
            }
            continue;
          }
          if (longPaddingLeft > 0) {
            const skip = Math.min(longPaddingLeft, buf.length - off);
            off += skip;
            longPaddingLeft -= skip;
            continue;
          }

          // ① 正在收集正文 → 只喂哈希
          if (curRemain > 0) {
            const take = Math.min(curRemain, buf.length - off);
            curHash.update(buf.subarray(off, off + take));
            off += take;
            curRemain -= take;
            curSize += take;
            // ⚠️ 大小恰为 512 整数倍时 padding 为 0，收尾不能只靠 ② 那条分支 ——
            // 否则这条永远不 finish，被下一条直接覆盖掉（实测丢了 85 个文件）
            if (curRemain === 0 && curPadding === 0) finishCur();
            continue;
          }
          // ② 对齐填充
          if (curPadding > 0) {
            const skip = Math.min(curPadding, buf.length - off);
            off += skip;
            curPadding -= skip;
            if (curPadding === 0) finishCur();
            continue;
          }
          // ③ 头部
          if (buf.length - off < BLOCK) break;
          const h = buf.subarray(off, off + BLOCK);
          if (h.every((b) => b === 0)) { off = buf.length; break; }

          const nameRaw = h.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
          const prefix = h.subarray(345, 500).toString("utf8").replace(/\0.*$/, "");
          const sizeStr = h.subarray(124, 136).toString("ascii").replace(/\0.*$/, "").trim();
          const size = parseInt(sizeStr || "0", 8) || 0;
          const type = String.fromCharCode(h[156]);
          off += BLOCK;

          if (type === "L") {
            longChunks = [];
            longRemain = size;
            longPadding = padding(size);
            continue;
          }

          let name = prefix ? `${prefix}/${nameRaw}` : nameRaw;
          if (pendingLongName) { name = pendingLongName; pendingLongName = null; }
          const clean = name.replace(/^\.\/+/, "");

          if (type === "0" || type === "\0") {
            curRel = clean;
            curHash = crypto.createHash("sha256");
            curSize = 0;
            curDeclared = size;
            curRemain = size;
            curPadding = padding(size);
            if (size === 0) { finishCur(); curPadding = 0; }
          } else {
            // 目录 / 其它类型：没有正文要算
            off += size + padding(size);
          }
        }
        pending = off < buf.length ? Buffer.from(buf.subarray(off)) : Buffer.alloc(0);
      } catch (e) {
        stopped = true;
        gunzip.destroy();
        reject(e);
      }
    });

    gunzip.on("error", (e) => { if (!stopped) { stopped = true; reject(e); } });
    gunzip.on("end", () => { if (!stopped) { stopped = true; finishCur(); resolve(); } });
    rs.on("error", (e) => { if (!stopped) { stopped = true; reject(e); } });
    rs.pipe(gunzip);
  });

  return out;
}

/**
 * 读包内某个条目的内容（返回 string；找不到返回 null）。
 *
 * 🔴 **不要攒 pending**（2026-11-06，实测 247MB 包读 manifest.json 花 166 秒）：
 * 旧写法每来一个 chunk 就 `Buffer.concat([pending, chunk])`，遇到包里那个
 * 130MB 的单文件时，每块都把那 130MB 重拷一遍 → O(n²)。
 *
 * 现在跟 `extractArchive` 用同一套状态机：不关心的 entry 只推进偏移，
 * 不复制数据；只有目标 entry 才把字节收集起来。
 */
async function readEntry(gzPath, entryName) {
  const want = entryName.replace(/\\/g, "/").replace(/^\.\/+/, "");
  let pending = Buffer.alloc(0);
  let pendingLongName = null;
  let found = null;

  // 状态：正在跳过某个 entry 的正文时，还剩多少字节
  let skipRemain = 0;
  // 状态：目标 entry 的正文，已收集多少 / 总共多少
  let wantChunks = null;
  let wantRemain = 0;

  // GNU LongLink 的正文也可能跨 chunk
  let longChunks = null;
  let longRemain = 0;
  let longPadding = 0;
  let longPaddingLeft = 0;

  await new Promise((resolve, reject) => {
    const rs = fs.createReadStream(gzPath);
    const gunzip = zlib.createGunzip();

    gunzip.on("data", (chunk) => {
      if (found !== null) return;

      let buf = pending.length === 0 ? chunk : Buffer.concat([pending, chunk]);
      let off = 0;

      while (off < buf.length) {
        // ⓪ GNU 长文件名（可能跨 chunk）
        if (longRemain > 0) {
          const take = Math.min(longRemain, buf.length - off);
          longChunks.push(Buffer.from(buf.subarray(off, off + take)));
          off += take;
          longRemain -= take;
          if (longRemain === 0) {
            pendingLongName = Buffer.concat(longChunks).toString("utf8").replace(/\0+$/, "");
            longChunks = null;
            longPaddingLeft = longPadding;
          }
          continue;
        }
        if (longPaddingLeft > 0) {
          const skip = Math.min(longPaddingLeft, buf.length - off);
          off += skip;
          longPaddingLeft -= skip;
          continue;
        }

        // ① 跳过不关心的 entry
        if (skipRemain > 0) {
          const take = Math.min(skipRemain, buf.length - off);
          off += take;
          skipRemain -= take;
          continue;
        }

        // ② 收集目标 entry
        if (wantChunks !== null) {
          const take = Math.min(wantRemain, buf.length - off);
          wantChunks.push(Buffer.from(buf.subarray(off, off + take)));
          off += take;
          wantRemain -= take;
          if (wantRemain === 0) {
            found = Buffer.concat(wantChunks).toString("utf8");
            wantChunks = null;
          }
          continue;
        }

        // ③ 解析头部
        if (buf.length - off < BLOCK) break;
        const h = buf.subarray(off, off + BLOCK);
        if (h.every((b) => b === 0)) { off = buf.length; break; }

        const nameRaw = h.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
        const prefix = h.subarray(345, 500).toString("utf8").replace(/\0.*$/, "");
        const sizeStr = h.subarray(124, 136).toString("ascii").replace(/\0.*$/, "").trim();
        const size = parseInt(sizeStr || "0", 8) || 0;
        const type = String.fromCharCode(h[156]);
        off += BLOCK;

        if (type === "L") {
          longChunks = [];
          longRemain = size;
          longPadding = padding(size);
          continue;
        }

        let name = prefix ? `${prefix}/${nameRaw}` : nameRaw;
        if (pendingLongName) { name = pendingLongName; pendingLongName = null; }
        const clean = name.replace(/^\.\/+/, "");

        if (clean === want && (type === "0" || type === "\0")) {
          if (size === 0) { found = ""; off += padding(size); continue; }
          wantChunks = [];
          wantRemain = size;
          // 不推进 off —— 上面的 ② 会从当前位置开始收集
        } else {
          skipRemain = size + padding(size);
        }
      }

      pending = off < buf.length ? Buffer.from(buf.subarray(off)) : Buffer.alloc(0);
    });
    gunzip.on("error", reject);
    gunzip.on("end", resolve);
    rs.on("error", reject);
    rs.pipe(gunzip);
  });

  return found;
}

module.exports = {
  packDirectory, listArchive, collectEntries, extractArchive, readEntry, hashArchive,
};
