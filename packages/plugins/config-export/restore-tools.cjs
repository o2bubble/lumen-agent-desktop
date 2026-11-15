#!/usr/bin/env node
// ── restore-tools.cjs ──
// 恢复期的常用操作 —— **随包分发**，供恢复端 AI 直接调用，不必临场写脚本。
//
// ## 为什么要有它
//
// 恢复时 AI 会反复写同一类临时脚本：解包、比对、算 hash、比较两个 jsonl 的差异……
// 每次写法还不一样（一次用 `tar -xzf`、一次用 node，路径处理各错各的）。
// 把**固定套路**固化成带参数的命令，AI 只需调用、读 JSON 结果。
//
// ## 用法
//
//   node tools/restore-tools.cjs <command> [args]
//
//   list        <pkg>                       列出包内条目（分类/文件数/大小）
//   verify      <pkg> [--dest <dir>]        校验包完整性；给 --dest 则比对已恢复的文件
//   compare     <pkg> --dest <dir>          对比包内文件与目标位置（存在/缺失/不同）
//   rate        <pkg> --dest <dir>          算恢复率（见下「恢复率怎么算」）
//   session-diff <a.jsonl> <b.jsonl>        比较两个会话文件的差异（按 uuid）
//   session-merge <base> <other> -o <out>   按 uuid 合并两个会话（自动备份原文件）
//   session-fork <src.jsonl> [--new-id <u>] [-o <out>]
//                                           撞名时另存为新 sessionId（只改字段，不动正文）
//   json-merge  <base.json> <other.json>    预览两个 JSON 的按键合并结果（不写盘）
//   extract     <pkg> --dest <dir>          解包到目标目录
//               [--only <正则>]             只解压匹配的条目（跳过其余，省下大部分 I/O）
//
// compare / rate / verify 都接受 `--map`：
//   --map "~=C:/Users/me,%APPDATA%=C:/Users/me/AppData/Roaming,<workspace>=D:/proj,.skills=C:/Users/me/.claude/skills"
// 用来处理「导出机的路径在导入机上不存在」——不映射的话这些条目只会报 unresolvable / missing。
//
// compare / rate 另外接受 `--settings <path>`（默认 `<dest>/.claude/settings.json`），
// 用来读 `gui.workspaces` 判断「这个项目本机还要不要」。
//
// ## ⚠️ 项目 slug 不等于项目（2026-11-15）
//
// `~/.claude/projects/<slug>` 的 slug 是**项目绝对路径**的编码。工作区一搬家
// （`C:\Storage\x` → `D:\Development\x`），slug 全变，但项目还是同一个。
// 所以 compare/rate 会顺带输出 `projects[]`：逐个项目给出
// `exact`（本机有）/ `remap`（同项目不同 slug，附 `suggestedMap`）/ `absent`（本机没有）。
// **`absent` 且 `recommendSkip` 的默认不恢复** —— 本机连工作区都没有，恢复它干什么。
//
// ## ⚠️ 这些是**参考实现**，不是必须照抄的教条
//
// 脚本把常见套路固化下来，省得每个 AI 各写一版、各错各的。
// 但它**不知道**这台机器的实际情况 —— 遇到下面这些情况，**改脚本/绕开它都行**：
//   · 目标机的目录布局和这里假设的不一样（技能根在别处、APPDATA 被重定向）
//   · 需要按内容合并（脚本只做按键/按 uuid 的机械合并）
//   · 包内清单本身就是错的（路径写错、分类放错）—— 以**用户的实际环境**为准
// 改动后记得把「为什么改」告诉用户，别默默偏离。
//
// ## 恢复率怎么算（**这是本文件最重要的约定**）
//
// **不拍一个数字交差。** 按 `restore.mode` 分成三类，分别统计：
//
//   · **精确验证**（overwrite：整份替换）
//       最硬的标准 —— **sha256 逐字节一致**才算。不一致就是不一致。
//   · **部分验证**（merge / append：合并/追加）
//       合并后内容必然和包里不同，**不能**比 sha256。
//       只能验"目标存在 + 关键标记在" → 记为"部分验证"，不算满分别。
//   · **无法自动验证**（manual：记忆 / 桌面数据库 / 自定义项数据）
//       **没有客观标准** —— 谁也不能自动判断"记忆合并得对不对"。
//       如实列为"需人工确认"，**不计入百分比**（计进去就是假精确）。
//
// 于是输出**两个数**，不要合成一个：
//
//   自动验证通过率 = 通过验证的文件 / 可自动验证的文件
//   整体覆盖率     = (精确验证 + 部分验证) / 全部文件
//
// 前者回答"能验的都验过了吗"，后者回答"还差多少要人看"。
// 合并成一个数会掩盖"55 个记忆文件根本没验"这个事实。
//
// 全部输出 JSON（AI 好解析），人读也看得懂。

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

// ══════════════════════════════════════════════════════════════
// 基础
// ══════════════════════════════════════════════════════════════

// 这里曾经有个 `runTar()`，包一层 `tar --force-local`。
// 已删除：Windows 自带的是 bsdtar，**不支持这个参数**
//   tar.exe: Option --force-local is not supported
// 而 Git Bash 里是 GNU tar、支持它 —— 于是开发机测着没问题，到用户机器上就挂。
// 解包统一走 `tar-writer.cjs` 的纯 Node 实现，不再赌 PATH 里是哪个 tar。

/**
 * 解包到 destDir。
 *
 * 🔴 **纯 Node，不调系统 tar**（2026-10-26）。
 *
 * 之前用 `tar --force-local -xzf`，但 Windows 上 PATH 里可能是
 * `C:\WINDOWS\system32\tar.exe`（bsdtar），它**不支持 `--force-local`**
 * → 直接退出、什么都不解，返回码 1 还被我们当成了"警告"。
 * 导出端已经因此被坑了三次，恢复端没理由再赌一次环境。
 *
 * `tar-writer.cjs` 随包分发（`tools/tar-writer.cjs`），纯 Node 实现。
 */
async function extractTo(pkgAbs, destDir, onlyRe) {
  return require("./tar-writer.cjs").extractArchive(pkgAbs, destDir, onlyRe);
}

/** 报错并退出。**也写 stdout** —— 调用方（AI / 脚本）通常只解析 stdout，
 *  写 stderr 会让它们拿到空输出、误以为"命令没返回"。 */
function die(msg, code = 1) {
  const payload = JSON.stringify({ ok: false, error: msg }, null, 2);
  console.log(payload);
  process.stderr.write(payload + "\n");
  process.exit(code);
}

function out(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

/** 读包内某个文本文件（纯 Node，不调系统 tar） */
async function readFromPkg(pkg, entry) {
  try {
    return await require("./tar-writer.cjs").readEntry(pkg, entry);
  } catch {
    return null;
  }
}

async function readManifest(pkg) {
  const raw = await readFromPkg(pkg, "manifest.json");
  if (!raw) die(`包里没有 manifest.json（是不是选错文件了？）：${pkg}`);
  try {
    return JSON.parse(raw);
  } catch (e) {
    die(`manifest.json 解析失败：${e.message}`);
  }
}

function argOf(argv, name, def = undefined) {
  const i = argv.indexOf(name);
  if (i < 0) return def;
  return argv[i + 1] ?? def;
}

function posArgs(argv) {
  const flags = new Set(["--dest", "-o", "--name", "--map", "--settings", "--new-id"]);
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    if (flags.has(argv[i])) { i++; continue; }
    if (argv[i].startsWith("-")) continue;
    out.push(argv[i]);
  }
  return out;
}

/**
 * 流式 sha256。
 *
 * 🔴 原来用 `readFileSync`（2026-11-07 改）：会话文件动辄 100+ MB，
 * `rate`/`compare` 要对成千上万个文件算哈希，同步整读既慢又可能把内存打爆。
 */
async function sha256File(p) {
  const h = crypto.createHash("sha256");
  try {
    for await (const chunk of fs.createReadStream(p, { highWaterMark: 1024 * 1024 })) {
      h.update(chunk);
    }
    return h.digest("hex");
  } catch {
    return null;
  }
}

const expandHome = (p) =>
  p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p;

// ══════════════════════════════════════════════════════════════
// 恢复率模型（纯函数，可单测）
// ══════════════════════════════════════════════════════════════

/**
 * 一个条目的"可验证级别"。
 *
 * @param {string} mode  restore.mode
 * @returns {"exact"|"partial"|"unverifiable"}
 */
function verifiabilityOf(mode) {
  switch (mode) {
    case "overwrite":
      return "exact";       // 整份替换 → sha256 必须一致
    case "merge":
    case "append":
      return "partial";     // 合并/追加 → 内容会变，只能验"存在 + 标记"
    case "manual":
    default:
      return "unverifiable"; // 记忆/数据库 → 没有客观标准
  }
}

/**
 * 算恢复率 —— **两个数，不合成一个**（见文件头）。
 *
 * @param {Array<{mode:string, verified:"pass"|"fail"|"skipped"}>} results
 * @returns {{exact:{pass,fail,total}, partial:{...}, unverifiable:{total}, autoPassRate:number|null, overallCoverage:number|null, note:string}}
 */
function computeRecoveryRate(results) {
  const bucket = {
    exact: { pass: 0, fail: 0, total: 0 },
    partial: { pass: 0, fail: 0, total: 0 },
    unverifiable: { total: 0 },
  };

  for (const r of results) {
    const level = verifiabilityOf(r.mode);
    if (level === "unverifiable") {
      bucket.unverifiable.total++;
      continue;
    }
    bucket[level].total++;
    if (r.verified === "pass") bucket[level].pass++;
    else if (r.verified === "fail") bucket[level].fail++;
  }

  // 自动验证通过率：只算能自动验的
  const autoTotal = bucket.exact.total + bucket.partial.total;
  const autoPass = bucket.exact.pass + bucket.partial.pass;
  const autoPassRate = autoTotal > 0 ? autoPass / autoTotal : null;

  // 整体覆盖率：算上无法验证的（它们不算"已验证"，拉低覆盖）
  const allTotal = autoTotal + bucket.unverifiable.total;
  const overallCoverage = allTotal > 0 ? autoPass / allTotal : null;

  // 诚实说明：两个数的差别就是"还有多少要人看"
  let note;
  if (allTotal === 0) {
    note = "包里没有可恢复的条目";
  } else if (bucket.unverifiable.total === 0) {
    note = "全部条目都可自动验证";
  } else {
    note = `另有 ${bucket.unverifiable.total} 个条目**无法自动验证**（记忆/数据库/自定义项）` +
      `—— 它们没有客观标准，必须由用户确认后自行判断。` +
      `「自动验证通过率」不含它们；「整体覆盖率」把未确认的算作未覆盖。`;
  }

  return {
    exact: bucket.exact,
    partial: bucket.partial,
    unverifiable: bucket.unverifiable,
    autoPassRate,
    overallCoverage,
    note,
  };
}

// ══════════════════════════════════════════════════════════════
// 命令实现
// ══════════════════════════════════════════════════════════════

async function cmdList(argv) {
  const [pkg] = posArgs(argv);
  if (!pkg) die("用法：list <包路径>");
  const mf = await readManifest(pkg);

  const byCat = {};
  for (const it of mf.items || []) {
    byCat[it.category] = byCat[it.category] || { files: 0, bytes: 0 };
    byCat[it.category].files++;
    byCat[it.category].bytes += it.size || 0;
  }

  out({
    ok: true,
    package: path.resolve(pkg),
    version: mf.formatVersion,
    exportedAt: mf.exportedAt,
    from: mf.source && mf.source.hostname,
    formatVersion: mf.formatVersion,
    totals: {
      files: (mf.items || []).length,
      bytes: (mf.items || []).reduce((a, i) => a + (i.size || 0), 0),
      customItems: (mf.customItems || []).length,
    },
    categories: Object.entries(byCat).map(([id, v]) => ({ id, ...v })),
    customItems: (mf.customItems || []).map((c) => ({
      id: c.id,
      label: c.label,
      entryDoc: c.entryDoc,
      dataIncluded: !!c.dataIncluded,
      fileCount: c.fileCount,
      overlaps: (c.overlaps || []).map((o) => `${o.category}(${o.shared})`),
    })),
    redactions: mf.redactions || [],
    // 把"该怎么恢复"的指引直接带出来，省得 AI 再翻 manifest
    nextSteps: [
      "1. 先跑 verify 看包是否完整",
      "2. 恢复前**评估新机器现状**（见包内 IMPORT_GUIDE.md 第 0 步）",
      "3. 逐个恢复，冲突按内容类型分别处理",
      "4. 恢复后跑 rate 算恢复率，出报告",
    ],
  });
}

async function cmdVerify(argv) {
  const [pkg] = posArgs(argv);
  const dest = argOf(argv, "--dest");
  if (!pkg) die("用法：verify <包路径> [--dest <已恢复目录>]");
  const mf = await readManifest(pkg);

  // 🔴 **不再落地解包**（2026-11-07）：
  // 旧实现是 extractArchive 到临时目录（651MB 写盘）再逐个 readFileSync 算哈希 ——
  // 同一份数据读了写、写了读，机械盘上光 I/O 就好几分钟。
  // 现在一遍流过归档、边读边算 sha256，不产生任何磁盘写。
  //
  // 归档里的条目名带 `data/` 前缀，manifest 的 `relPath` 不带 —— 统一剥掉再比对。
  const rawHashes = await require("./tar-writer.cjs").hashArchive(path.resolve(pkg));
  const hashes = new Map();
  for (const [k, v] of rawHashes) {
    hashes.set(k.replace(/^data\//, ""), v);
  }

  const results = [];
  for (const it of mf.items || []) {
    const got = hashes.get(it.relPath);
    const ok = !!got && (!it.sha256 || got.sha256 === it.sha256);
    results.push({
      relPath: it.relPath,
      category: it.category,
      mode: it.restore && it.restore.mode,
      target: it.restore && it.restore.target,
      packageSha: it.sha256,
      actualSha: got ? got.sha256 : null,
      packageOk: ok,
      // 若给了 dest，顺带比对目标位置
      dest: dest ? await checkDest(it, dest, parseMap(argv)) : undefined,
    });
  }

  // 归档里有、manifest 里没登记的文件（正常情况下不该有）
  const listed = new Set((mf.items || []).map((i) => i.relPath));
  const unlisted = [...hashes.keys()].filter((k) => !listed.has(k));

  const bad = results.filter((r) => !r.packageOk);
  out({
    ok: bad.length === 0,
    packageIntact: bad.length === 0,
    checked: results.length,
    failed: bad.length,
    failures: bad.slice(0, 20),
    failuresTruncated: bad.length > 20 ? bad.length - 20 : 0,
    unlistedFiles: { count: unlisted.length, sample: unlisted.slice(0, 10) },
    note: bad.length
      ? "包本身损坏或不完整 —— 重新导出，别拿这个包恢复"
      : "包完整，每个文件的 sha256 与 manifest 一致",
  });
}

/** 检查某个条目在 dest 下的状态（用于 --dest 模式） */
async function checkDest(it, destRoot, map) {
  const target = it.restore && it.restore.target;
  if (!target) return { status: "unknown" };
  const level = verifiabilityOf(it.restore.mode);

  // 把 restore.target 的占位符换成实际路径
  const real = resolveTarget(target, destRoot, map);
  if (!real) return { status: "unresolvable", target };

  const exists = fs.existsSync(real);
  if (!exists) return { status: "missing", path: real };

  if (level !== "exact") {
    // 合并/追加型：内容必然不同，不能比 sha —— 也不用去读大文件
    return { status: "exists", path: real, note: "合并型，内容预期不同（无法用 sha 比对）" };
  }
  const actual = await sha256File(real);
  return {
    status: actual === it.sha256 ? "identical" : "different",
    path: real,
    actualSha: actual,
    expectedSha: it.sha256,
  };
}

/**
 * 把 `restore.target` 的占位符解析成**这台机器上的真实路径**。
 *
 * `destRoot` 只是"模拟根"（用来假设一台新机器长什么样）；
 * 真正恢复完想核对时，应该让 destRoot 就是根（`/` 或 `C:\`），
 * 或者用 `--map <占位符>=<真实路径>` 直接给出映射。
 *
 * @param {string} target   如 `~/.claude/settings.json`、`<workspace>/.claude/x`
 * @param {string} destRoot 模拟根
 * @param {Record<string,string>} [map] 显式映射，优先级最高
 */
function resolveTarget(target, destRoot, map) {
  const t = target;

  // ① 显式映射优先。要**按最长键优先**匹配 ——
  //    否则 `~/.skills/x` 会先被 `~` 吃掉，更具体的 `~/.skills` 映射永远轮不到。
  if (map) {
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      const base = map[key];
      if (!base) continue;
      // `~` 既能匹配 `~/.claude/x`，也能匹配 `~/x`
      const hit =
        key === "~" ? t === "~" || t.startsWith("~/") :
        t === key || t.startsWith(key + "/");
      if (!hit) continue;
      const rest = key === "~" ? t.replace(/^~\/?/, "") : t.slice(key.length + 1);
      return rest ? path.join(base, rest) : base;
    }
  }

  if (t.startsWith("~/.claude/")) {
    return path.join(destRoot, ".claude", t.slice("~/.claude/".length));
  }
  if (t.startsWith("~/.agents/")) {
    return path.join(destRoot, ".agents", t.slice("~/.agents/".length));
  }
  // 有些包会把"个人技能库"导成 `~/.skills/...`（源机器上确实存在这个目录）；
  // 但导入端不一定有 —— 这属于**需要重映射**的情况，不该一律报 unresolvable。
  // `--map ~/.skills=<真实技能根>` 即可。
  if (t.startsWith("~/.skills/")) {
    return path.join(destRoot, ".skills", t.slice("~/.skills/".length));
  }
  if (t.startsWith("%APPDATA%/com.claudecode.gui/")) {
    return path.join(destRoot, "AppData", "Roaming", "com.claudecode.gui",
      t.slice("%APPDATA%/com.claudecode.gui/".length));
  }
  if (t.startsWith("<workspace>/.claude/")) {
    return path.join(destRoot, "workspace", ".claude", t.slice("<workspace>/.claude/".length));
  }
  return null;
}

/**
 * 解析 `--map a=b,c=d`。
 * 键支持 `~` / `~/.skills` / `%APPDATA%` / `<workspace>`。
 */
function parseMap(argv) {
  const raw = argOf(argv, "--map");
  if (!raw) return undefined;
  const map = {};
  for (const pair of String(raw).split(",")) {
    const i = pair.indexOf("=");
    if (i <= 0) continue;
    map[pair.slice(0, i).trim()] = expandHome(pair.slice(i + 1).trim());
  }
  return Object.keys(map).length ? map : undefined;
}

/**
 * slug 是**项目绝对路径的编码**：非字母数字一律压成 `-`。
 *   `D:\Development\claude-code-haha-dev` → `D--Development-claude-code-haha-dev`
 *
 * 🔴 工作区搬家后（`C:\Storage\...` → `D:\Development\...`）**整个 slug 都变**，
 * 但项目是同一个。2026-11-15 实测：`compare` 报的 388 条 missing 里 330 条
 * 全是这一个原因 —— 看起来「包里少了半个」，实际只是要重映射。
 *
 * 所以**绝不能拿 slug 做纯文本全量比较**。这里改成用真实数据对齐：
 * 从本机 GUI 工作区的绝对路径反推 slug + 项目名，再按项目名匹配。
 *
 * ⚠️ 不写「从 slug 反推项目名」的正则 —— `-` 既是分隔符又可能是目录名的一部分，
 * 反推出的名字不可靠。宁可报「不确定」，也不给一个看似聪明的错答案。
 */
function slugOfPath(absPath) {
  return String(absPath).replace(/[^a-zA-Z0-9]/g, "-");
}

/** 本机 ~/.claude/projects 下真实存在的 slug 目录 */
function localProjectSlugs(destRoot) {
  try {
    return fs.readdirSync(path.join(destRoot, ".claude", "projects"), { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
  } catch {
    return [];
  }
}

/**
 * 读 GUI 工作区列表（`~/.claude/settings.json` 的 `gui.workspaces`）。
 * 这是**用户实际在用的项目**的权威清单 —— 判断「本机还要不要这个项目」靠它。
 */
function readGuiWorkspaces(destRoot, settingsPath) {
  const p = settingsPath || path.join(destRoot, ".claude", "settings.json");
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return ((j.gui && j.gui.workspaces) || []).filter((w) => typeof w === "string");
  } catch {
    return [];
  }
}

/**
 * 判断包内每个项目 slug 在本机的归属。
 *
 * 判定只看**真实存在的东西**，不猜：
 *   · `exact`   —— 本机有同名 slug 目录
 *   · `remap`   —— 本机没有该 slug，但有 GUI 工作区**同名项目**（路径搬过家）
 *   · `absent`  —— 本机和 GUI 工作区都没有这个项目 → recommendSkip
 *
 * `remap` 只在**唯一命中**时给出；多个候选就报 `ambiguous`，不替用户选。
 */
function analyzeProjects(mf, destRoot, settingsPath) {
  const localSlugs = localProjectSlugs(destRoot);
  const guiWs = readGuiWorkspaces(destRoot, settingsPath);
  const lowerLocal = new Map(localSlugs.map((s) => [s.toLowerCase(), s]));

  // 项目名 → 本机真实路径（来自 GUI 工作区，不是从 slug 猜的）。
  // ⚠️ 用数组不用 Map：两个同名工作区（不同盘 / 不同父目录）会互相覆盖，
  // 「多个候选」就永远只剩一个 → 静默挑错项目。这正是 ambiguous 要防的。
  const guiByName = [];
  for (const w of guiWs) {
    const name = path.basename(String(w).replace(/[\\/]+$/, "")).toLowerCase();
    if (name) guiByName.push({ name, absPath: w });
  }

  // 聚合：每个 slug 下有多少文件、多少字节
  // relPath 形如 `claude/projects/<slug>/...`（不带前导点，与 restore.target 不同）
  const bySlug = new Map();
  for (const it of mf.items || []) {
    const m = String(it.relPath).match(/^(?:\.?claude|data\/claude)\/(?:projects|workspaces)\/([^/]+)\//);
    if (!m) continue;
    const s = bySlug.get(m[1]) || { files: 0, bytes: 0, categories: new Set() };
    s.files++;
    s.bytes += it.size || 0;
    s.categories.add(it.category);
    bySlug.set(m[1], s);
  }

  const projects = [];
  const maps = {};
  for (const [slug, agg] of [...bySlug.entries()].sort((a, b) => b[1].files - a[1].files)) {
    const hit = lowerLocal.get(slug.toLowerCase());
    let entry = {
      packageSlug: slug,
      files: agg.files,
      bytes: agg.bytes,
      categories: [...agg.categories],
    };

    if (hit) {
      Object.assign(entry, { action: "exact", localSlug: hit, reason: "本机已有同名 slug 目录" });
    } else {
      // 用 GUI 工作区拿项目名：包内 slug 以该工作区的项目名结尾 → 同一个项目
      const candidates = [];
      for (const { name, absPath } of guiByName) {
        if (slug.toLowerCase().endsWith(name)) {
          const target = lowerLocal.get(slugOfPath(absPath).toLowerCase());
          candidates.push({ name, absPath, localSlug: target || null });
        }
      }
      const resolved = candidates.filter((c) => c.localSlug);

      if (resolved.length === 1) {
        const c = resolved[0];
        Object.assign(entry, {
          action: "remap",
          localSlug: c.localSlug,
          guiWorkspacePath: c.absPath,
          reason: `本机没有这个 slug，但 GUI 工作区 "${c.name}" 是同一项目（路径搬过家？）`,
        });
        maps[`~/.claude/projects/${slug}`] =
          path.join(destRoot, ".claude", "projects", c.localSlug);
      } else if (resolved.length > 1) {
        Object.assign(entry, {
          action: "ambiguous",
          candidates: resolved.map((c) => c.localSlug),
          reason: `${resolved.length} 个本机项目同名，需要用户指定`,
        });
      } else {
        // GUI 工作区里有没有这个名字（有 = 项目还在，只是会话没建；没有 = 项目都删了）
        const guiOnly = guiByName.find((g) => slug.toLowerCase().endsWith(g.name));
        Object.assign(entry, {
          action: "absent",
          guiWorkspacePath: guiOnly ? guiOnly.absPath : null,
          recommendSkip: !guiOnly,
          reason: guiOnly
            ? "GUI 工作区有该项目，但本机还没有它的会话目录 —— 恢复时放在原 slug 下即可"
            : "本机和 GUI 工作区都没有这个项目 —— **建议跳过**，恢复了也没有对应工作区",
        });
      }
    }
    projects.push(entry);
  }

  return {
    projects,
    localProjects: localSlugs,
    guiWorkspaces: guiWs,
    summary: {
      exact: projects.filter((p) => p.action === "exact").length,
      remap: projects.filter((p) => p.action === "remap").length,
      absent: projects.filter((p) => p.action === "absent").length,
      ambiguous: projects.filter((p) => p.action === "ambiguous").length,
      recommendSkip: projects.filter((p) => p.recommendSkip).length,
      // 只含 remap 的 --map 片段，可直接拼进命令行
      mapArg: Object.keys(maps).length ? Object.entries(maps).map(([k, v]) => `${k}=${v}`).join(",") : null,
    },
    maps,
  };
}

async function cmdCompare(argv) {
  const [pkg] = posArgs(argv);
  const dest = argOf(argv, "--dest");
  if (!pkg || !dest) die("用法：compare <包路径> --dest <目标根目录>");
  const mf = await readManifest(pkg);

  const map = parseMap(argv);
  const rows = [];
  for (const it of mf.items || []) {
    const d = await checkDest(it, dest, map);
    rows.push({
      relPath: it.relPath,
      category: it.category,
      mode: it.restore && it.restore.mode,
      ...d,
    });
  }

  const count = (s) => rows.filter((r) => r.status === s).length;
  const projectInfo = analyzeProjects(mf, dest, argOf(argv, "--settings"));

  // 🔴 整类缺失预警：某个项目在本机根本不存在时，逐条报 missing 会误导成
  // 「包里少了东西」。单独说清楚，并把能用的 --map 直接给出来。
  const warn = [];
  if (projectInfo.summary.remap > 0) {
    warn.push(
      `有 ${projectInfo.summary.remap} 个项目是**同一项目、不同 slug**（路径搬过家）` +
      `—— 这些条目现在报 missing，加上 --map 就对了`,
    );
  }
  if (projectInfo.summary.absent > 0) {
    warn.push(
      `有 ${projectInfo.summary.absent} 个项目本机**完全不存在**（其中 ` +
      `${projectInfo.summary.recommendSkip} 个连 GUI 工作区里都没有）` +
      `—— 先问用户要不要恢复，别默默建目录`,
    );
  }

  out({
    ok: true,
    target: path.resolve(dest),
    summary: {
      missing: count("missing"),
      identical: count("identical"),
      different: count("different"),
      exists: count("exists"),
      unresolvable: count("unresolvable"),
    },
    projects: projectInfo.projects,
    warnings: warn,
    suggestedMap: projectInfo.summary.mapArg,
    // 分组给处理建议 —— 这是 AI 下一步要用的
    actions: {
      missing: rows.filter((r) => r.status === "missing").map((r) => r.relPath),
      different: rows.filter((r) => r.status === "different").map((r) => r.relPath),
      unresolvable: rows.filter((r) => r.status === "unresolvable").map((r) => r.relPath),
    },
    hint:
      "missing = 新机器没有，可直接放入；" +
      "different = 两边都有但内容不同，**先问用户**；" +
      "exists = 合并型，需按类型判断（见 IMPORT_GUIDE 冲突表）；" +
      "unresolvable = 路径占位符没识别，需要你手动确定目标位置；" +
      "**projects 里 remap 的项不是缺失，是路径搬家**（用 suggestedMap 重跑）；" +
      "**absent 且 recommendSkip 的项默认不恢复** —— 本机没有对应工作区，恢复了也用不上",
  });
}

async function cmdRate(argv) {
  const [pkg] = posArgs(argv);
  const dest = argOf(argv, "--dest");
  if (!pkg || !dest) die("用法：rate <包路径> --dest <目标根目录>");
  const mf = await readManifest(pkg);

  const map = parseMap(argv);
  const results = [];
  const detail = [];
  for (const it of mf.items || []) {
    const mode = (it.restore && it.restore.mode) || "overwrite";
    const level = verifiabilityOf(mode);
    const d = await checkDest(it, dest, map);

    let verified;
    if (level === "unverifiable") {
      verified = "skipped"; // 无法自动验证
    } else if (d.status === "identical" || d.status === "exists") {
      verified = "pass";
    } else {
      verified = "fail";
    }
    results.push({ mode, verified });
    detail.push({
      relPath: it.relPath,
      mode,
      level,
      status: d.status,
      verified,
    });
  }

  const rate = computeRecoveryRate(results);
  const projectInfo = analyzeProjects(mf, dest, argOf(argv, "--settings"));

  // 自定义项单独列（它们的"恢复"靠 AI 判断，不能算进百分比）
  const customs = (mf.customItems || []).map((c) => ({
    label: c.label,
    dataIncluded: !!c.dataIncluded,
    status: "需人工确认",
    entryDoc: c.entryDoc,
  }));

  out({
    ok: true,
    target: path.resolve(dest),
    projectSummary: projectInfo.summary,
    suggestedMap: projectInfo.summary.mapArg,
    recovery: {
      // 两个数，别合成
      autoPassRate: rate.autoPassRate,
      autoPassPercent: rate.autoPassRate == null ? null : Math.round(rate.autoPassRate * 1000) / 10,
      overallCoverage: rate.overallCoverage,
      overallPercent: rate.overallCoverage == null ? null : Math.round(rate.overallCoverage * 1000) / 10,
      breakdown: {
        exact: rate.exact,        // 精确验证（sha256 一致）
        partial: rate.partial,    // 部分验证（合并型，只能验存在）
        unverifiable: rate.unverifiable, // 需人工确认
      },
      note: rate.note,
    },
    customItems: customs,
    failures: detail.filter((d) => d.verified === "fail"),
    hint:
      "**报告时两个数都要说，不要只报一个。**" +
      "「自动验证通过率」回答『能验的都验过了吗』；" +
      "「整体覆盖率」回答『还有多少要人看』。" +
      "合并成一个数会掩盖『记忆文件根本没验』这个事实。",
  });
}

async function cmdExtract(argv) {
  const [pkg] = posArgs(argv);
  const dest = argOf(argv, "--dest");
  const filter = argOf(argv, "--only");
  if (!pkg || !dest) die("用法：extract <包路径> --dest <目录> [--only <正则>]");
  const r = await extractTo(path.resolve(pkg), path.resolve(dest), filter);
  out({
    ok: true,
    extractedTo: path.resolve(dest),
    files: r.files,
    dirs: r.dirs,
    skipped: r.skipped,
    filtered: filter || null,
    note: filter
      ? `只解压了匹配 /${filter}/ 的 ${r.files} 个文件`
      : "解包完成，但**没有**放到任何目标位置 —— 恢复要按 IMPORT_GUIDE 走",
  });
}

// ── 会话相关 ──

function readJsonl(p) {
  const lines = fs.readFileSync(p, "utf8").split("\n").filter((l) => l.trim());
  return lines.map((l, i) => {
    let o = null;
    try { o = JSON.parse(l); } catch { /* 保留原文 */ }
    return { line: l, obj: o, index: i };
  });
}

/**
 * 两个会话文件是不是**同一个会话的身份**（同文件名，或声明了同一个 sessionId）。
 *
 * 光看「共享 uuid 为 0」不够 —— 把两个不相干的导出拼起来是**合法**用法
 * （用户可能就是想合并两份互不重叠的记录）。危险的是这种组合：
 * **同一个会话身份 + 零共享 uuid** —— 那说明 sessionId 被复用成了两段无关对话。
 */
function sessionIdentity(filePath, entries) {
  const sessionIds = new Set();
  for (const e of entries) {
    const sid = e.obj && e.obj.sessionId;
    if (typeof sid === "string" && sid) sessionIds.add(sid);
  }
  return { stem: path.basename(filePath, ".jsonl").toLowerCase(), sessionIds };
}

function isIdReuse(aPath, A, bPath, B, sharedUuids) {
  if (sharedUuids !== 0) return false;
  if (A.length === 0 || B.length === 0) return false;
  const a = sessionIdentity(aPath, A);
  const b = sessionIdentity(bPath, B);
  const sameStem = !!a.stem && a.stem === b.stem;
  let sameSid = false;
  for (const s of a.sessionIds) if (b.sessionIds.has(s)) sameSid = true;
  return sameStem || sameSid;
}

function cmdSessionDiff(argv) {
  const [a, b] = posArgs(argv);
  if (!a || !b) die("用法：session-diff <a.jsonl> <b.jsonl>");
  const A = readJsonl(a);
  const B = readJsonl(b);

  const uuidOf = (e) => (e.obj && e.obj.uuid) || null;
  const mapA = new Map();
  const mapB = new Map();
  for (const e of A) { const u = uuidOf(e); if (u) mapA.set(u, e.line); }
  for (const e of B) { const u = uuidOf(e); if (u) mapB.set(u, e.line); }

  const onlyA = [...mapA.keys()].filter((u) => !mapB.has(u));
  const onlyB = [...mapB.keys()].filter((u) => !mapA.has(u));
  // 同 uuid 但内容不同 = 真冲突
  const conflicting = [...mapA.keys()].filter((u) => mapB.has(u) && mapA.get(u) !== mapB.get(u));

  // 🔴 同一会话身份 + 零共享 uuid → sessionId 被复用成了两段无关对话
  // （2026-11-15 实测：`56342174`，包内 11-06→11-09、本机 11-11→11-15，共享 uuid 0）。
  // 按 uuid 合并会缝出跨越 9 天、上下文无关的怪东西，而且照样报 ok:true。
  const shared = mapA.size - onlyA.length;
  const idReuse = isIdReuse(a, A, b, B, shared);

  out({
    ok: true,
    a: { path: a, lines: A.length, uuids: mapA.size },
    b: { path: b, lines: B.length, uuids: mapB.size },
    shared,
    onlyInA: { count: onlyA.length, sample: onlyA.slice(0, 5) },
    onlyInB: { count: onlyB.length, sample: onlyB.slice(0, 5) },
    conflicting: {
      count: conflicting.length,
      sample: conflicting.slice(0, 5),
      note: conflicting.length
        ? "⚠️ 同一 uuid 但内容不同 —— **这是真冲突，必须问用户哪边是对的**"
        : "无同 uuid 内容冲突",
    },
    idReuse: {
      detected: idReuse,
      note: idReuse
        ? "🔴 两边**零个**共享 uuid —— 这不是同一会话的进度差异，是 sessionId 被复用。" +
          "**不要合并**：另存为新的 sessionId（`session-fork --new-id`），两份都保留。"
        : "共享 uuid 非零（或有一方为空），不构成 id 复用",
    },
    hint: idReuse
      ? "🔴 禁止按 uuid 合并 —— 这是两段无关对话。先问用户，通常做法是另存一份（换新 sessionId）"
      : onlyA.length || onlyB.length
        ? "两边有对方没有的轮次 → 可以按 uuid 合并（见 session-merge）"
        : "两边 uuid 集合一致",
  });
}

function cmdSessionMerge(argv) {
  const pos = posArgs(argv);
  const [base, other] = pos;
  const outPath = argOf(argv, "-o");
  if (!base || !other || !outPath) die("用法：session-merge <base> <other> -o <输出>");

  const A = readJsonl(base);
  const B = readJsonl(other);
  const uuidOf = (e) => (e.obj && e.obj.uuid) || null;

  // 🔴 撞名门控：同一会话身份 + 零共享 uuid → sessionId 被复用（两段无关对话）。
  // 这种合并不会报冲突（没有同 uuid 不同内容），只会静默缝成一段跨天怪东西。
  // 必须在建 seen 之前就拦下，别让"没有冲突"这个假信号放行。
  {
    const ua = new Set(A.map(uuidOf).filter(Boolean));
    const ub = new Set(B.map(uuidOf).filter(Boolean));
    let shared = 0;
    for (const u of ua) if (ub.has(u)) shared++;
    if (isIdReuse(base, A, other, B, shared)) {
      out({
        ok: false,
        error: "同一会话身份、但两边**零个**共享 uuid —— 这是 sessionId 被复用，不是同一会话的两个进度",
        a: { uuids: ua.size },
        b: { uuids: ub.size },
        shared: 0,
        hint:
          "**不要合并。** 用 `session-fork <包里的.jsonl> --new-id` 另存一份，" +
          "两份都保留；然后问用户怎么处理。",
      });
      process.exit(2);
    }
  }

  const seen = new Map(); // uuid → line
  const order = [];       // 保持出现顺序
  const conflicts = [];

  for (const e of A) {
    const u = uuidOf(e);
    if (u && seen.has(u)) continue;
    if (u) seen.set(u, e.line);
    order.push({ key: u || `idx:${e.index}`, line: e.line, obj: e.obj });
  }
  for (const e of B) {
    const u = uuidOf(e);
    if (u && seen.has(u)) {
      if (seen.get(u) !== e.line) conflicts.push(u);
      continue;
    }
    if (u) seen.set(u, e.line);
    order.push({ key: u || `idx:${e.index}`, line: e.line, obj: e.obj });
  }

  if (conflicts.length) {
    out({
      ok: false,
      error: "存在同 uuid 但内容不同的消息，**不能自动合并**",
      conflicts: { count: conflicts.length, sample: conflicts.slice(0, 10) },
      hint: "先跑 session-diff 看清楚，然后问用户哪边是对的",
    });
    process.exit(2);
  }

  // 按 timestamp 排序（没有就保持原序）
  const ts = (o) => (o && (o.timestamp || o.createdAt)) || null;
  const hasTs = order.every((x) => ts(x.obj));
  if (hasTs) {
    order.sort((x, y) => String(ts(x.obj)).localeCompare(String(ts(y.obj))));
  }

  // 备份现有输出文件
  const backups = [];
  if (fs.existsSync(outPath)) {
    const bak = `${outPath}.bak-${Date.now()}`;
    fs.copyFileSync(outPath, bak);
    backups.push(bak);
  }

  fs.writeFileSync(outPath, order.map((x) => x.line).join("\n") + "\n", "utf8");

  out({
    ok: true,
    output: path.resolve(outPath),
    merged: order.length,
    fromA: A.length,
    fromB: B.length,
    sortedByTimestamp: hasTs,
    backups,
    hint: hasTs ? "已按 timestamp 排序" : "缺 timestamp 字段，保持原顺序（可能需要人工检查顺序）",
  });
}

/**
 * 把一个会话另存为**新 sessionId**（撞名时的正确做法：两份都留着，不缝在一起）。
 *
 * ⚠️ 只改 `"sessionId":"..."` 字段，**不碰正文**。
 * 2026-11-15 的教训：手工 `replaceAll` 整个文件，把消息正文里提到的 session id
 * 也一起改了（48 处误伤）。对话内容里的 id 是历史事实，不该被改写。
 */
function cmdSessionFork(argv) {
  const [src] = posArgs(argv);
  const newId = argOf(argv, "--new-id");
  const outPath = argOf(argv, "-o");
  if (!src) die("用法：session-fork <会话.jsonl> [--new-id <uuid>] [-o <输出>]");

  const newSessionId = newId || crypto.randomUUID();
  const dest = outPath || path.join(path.dirname(src), `${newSessionId}.jsonl`);

  const lines = fs.readFileSync(src, "utf8").split("\n").filter((l) => l.trim());
  let touched = 0;
  const rewritten = lines.map((l) => {
    const n = l.replace(/"sessionId":"[^"]*"/g, `"sessionId":"${newSessionId}"`);
    if (n !== l) touched++;
    return n;
  });

  if (fs.existsSync(dest) && path.resolve(dest) !== path.resolve(src)) {
    const bak = `${dest}.bak-${Date.now()}`;
    fs.copyFileSync(dest, bak);
  }
  fs.writeFileSync(dest, rewritten.join("\n") + "\n", "utf8");

  // 核对：正文里旧 id 的提及保留了多少（证明只改了字段）
  const oldIds = new Set();
  for (const l of lines) for (const m of l.matchAll(/"sessionId":"([^"]*)"/g)) oldIds.add(m[1]);

  out({
    ok: true,
    source: path.resolve(src),
    output: path.resolve(dest),
    newSessionId,
    lines: rewritten.length,
    sessionIdFieldsRewritten: touched,
    oldSessionIds: [...oldIds],
    note: "只改了 sessionId 字段；消息正文里出现的旧 id 原样保留（那是历史内容）",
  });
}

function cmdJsonMerge(argv) {
  const [a, b] = posArgs(argv);
  if (!a || !b) die("用法：json-merge <base.json> <other.json>");
  const A = JSON.parse(fs.readFileSync(a, "utf8"));
  const B = JSON.parse(fs.readFileSync(b, "utf8"));

  const added = [];
  const changed = [];
  const same = [];

  function walk(o, n, prefix) {
    for (const k of Object.keys(n)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (!(k in o)) { added.push({ key, value: n[k] }); continue; }
      const ov = o[k], nv = n[k];
      const bothObj = ov && typeof ov === "object" && !Array.isArray(ov) &&
        nv && typeof nv === "object" && !Array.isArray(nv);
      if (bothObj) { walk(ov, nv, key); continue; }
      if (JSON.stringify(ov) === JSON.stringify(nv)) { same.push(key); continue; }
      changed.push({ key, base: ov, other: nv });
    }
  }
  walk(A, B, "");

  out({
    ok: true,
    onlyInBase: Object.keys(A).filter((k) => !(k in B)),
    addedFromOther: added,
    changed: changed,
    unchanged: same.length,
    hint:
      "**这只是预览，没写盘。** " +
      "默认建议：以 base（新机器现有）为准，只补 addedFromOther 里缺的键；" +
      "changed 的项**问用户**。" +
      "注意 `env` 段永远不要从包里带过来（里面有凭据）。",
  });
}

// ══════════════════════════════════════════════════════════════
// 入口
// ══════════════════════════════════════════════════════════════

const COMMANDS = {
  list: cmdList,
  verify: cmdVerify,
  compare: cmdCompare,
  rate: cmdRate,
  extract: cmdExtract,
  "session-diff": cmdSessionDiff,
  "session-merge": cmdSessionMerge,
  "session-fork": cmdSessionFork,
  "json-merge": cmdJsonMerge,
};

function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (!cmd || cmd === "-h" || cmd === "--help") {
    out({
      ok: true,
      usage: "node tools/restore-tools.cjs <command> [args]",
      commands: Object.keys(COMMANDS),
      note: "全部命令输出 JSON；出错时 exit code != 0 且 stdout 有 {ok:false,error}",
    });
    return;
  }
  const fn = COMMANDS[cmd];
  if (!fn) die(`未知命令：${cmd}。可用：${Object.keys(COMMANDS).join(", ")}`);
  // 命令可能返回 Promise（extract / list / verify / compare / rate 都是 async）
  Promise.resolve()
    .then(() => fn(argv.slice(1)))
    .catch((e) => die(String((e && e.message) || e)));
}

if (require.main === module) main();

module.exports = {
  verifiabilityOf, computeRecoveryRate, resolveTarget, readFromPkg,
  slugOfPath, analyzeProjects, readGuiWorkspaces, localProjectSlugs,
};
