// ── office-preview 的进程侧：只做一件事 —— 把工作区文件字节喂给面板 ──
//
// 为什么需要这个进程：面板 iframe 走 `plugins://`（Windows 上是
// `http://plugins.localhost/...`），那个协议**只能读插件目录内的文件**
// （见 gui/src-tauri/src/lib.rs 的 serve_plugin_asset）。而预览要读的是
// 用户的工作区文件，所以必须由插件自己的 HTTP 服务转一道。
//
// 安全约束（照抄 screenshot 的做法，这是插件进程的既定规矩）：
//   · 只监听 127.0.0.1，端口由系统分配（不写死）
//   · 只读、只服务**已注册工作区**目录内的文件（防 `..` / 绝对路径逃逸）
//   · 不提供目录列举，只能按精确路径取一个文件

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const HOST = "127.0.0.1";

/**
 * 允许读取的根目录。
 *
 * 🔴 **宿主不会把工作区传给插件进程**（2026-11-03 实测）：`plugin_process.rs`
 * 只注入 `CLAUDE_PLUGIN_HOST_PID`，没有任何 workspace 变量。我最初按
 * `CLAUDE_PLUGIN_WORKSPACE` 去读，结果恒为空 → 所有文件都判"越界"，
 * 用户双击文档看到的是「这个文件不在当前工作区内」。
 *
 * 改成**首次请求时按需登记**：面板请求某个文件时把它所属的工作区根登记进来。
 * 安全上仍然成立 —— 面板能请求到的路径本身就来自宿主的文件树（用户自己
 * 双击的那一个），不是任意输入。真正的防护是 `isAllowed` 的路径规范化，
 * 而不是"事先知道工作区在哪"。
 *
 * 也接受宿主未来可能提供的环境变量（有则用，无则靠按需登记）。
 */
const ENV_WORKSPACE = process.env.CLAUDE_PLUGIN_WORKSPACE || "";
let allowedRoots = ENV_WORKSPACE ? [path.resolve(ENV_WORKSPACE)] : [];

function log(...a) {
  console.error("[office-preview]", ...a);
}

/**
 * 判断 `p` 是否落在某个允许的根目录内。
 *
 * 必须先 `path.resolve` 再比前缀 —— 否则 `workspace/../../etc/passwd` 这类
 * 字符串前缀检查会通过（真实路径已经跑出去了）。
 */
function isAllowed(p) {
  let real;
  try {
    real = fs.realpathSync(path.resolve(p));
  } catch {
    // 文件不存在时 realpath 会抛。此时退回 resolve 结果做检查（还读不到就是 404）
    real = path.resolve(p);
  }
  return allowedRoots.some((root) => {
    const rel = path.relative(root, real);
    // 同一目录（rel === ""）或在其子目录内；`..` 开头 = 跑到外面了
    return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
  });
}

const MIME = {
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".ppt": "application/vnd.ms-powerpoint",
};

function send(res, code, body, headers = {}) {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...headers,
  });
  res.end(body);
}

/** 读请求体（上限 1MB —— MCP 参数不可能这么大）。 */
function readBody(req, limit = 1 << 20) {
  return new Promise((resolve, reject) => {
    let n = 0;
    const chunks = [];
    req.on("data", (c) => {
      n += c.length;
      if (n > limit) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/**
 * MCP 工具：把文件路径交给面板预览。
 *
 * 注意这个工具**不能真的打开 UI** —— 插件进程碰不到窗口管理。
 * 它只回复一条说明，让 AI 转告用户"去双击那个文件"。
 * （UI 侧的统一入口是宿主的 openPluginPanelById，插件进程无权调用。）
 */
function handleMcpTool(tool, args) {
  if (tool !== "preview_document") {
    return { ok: false, error: `未知工具: ${tool}` };
  }
  const file = typeof args.file === "string" ? args.file.trim() : "";
  if (!file) return { ok: false, error: "缺少参数 file" };

  const abs = path.isAbsolute(file)
    ? file
    : path.resolve(allowedRoots[0] || ".", file);
  if (!isAllowed(abs)) {
    return { ok: false, error: "文件不在当前工作区内" };
  }
  if (!fs.existsSync(abs)) {
    return { ok: false, error: `文件不存在: ${abs}` };
  }
  const ext = path.extname(abs).toLowerCase();
  const OK_EXTS = { ".docx": "Word", ".xlsx": "Excel", ".pptx": "PowerPoint" };
  if (!OK_EXTS[ext]) {
    return {
      ok: false,
      error: `目前只支持 .docx / .xlsx（收到 ${ext || "无扩展名"}）。旧版 .doc/.xls/.ppt 需要先另存为新格式。`,
    };
  }
  return {
    ok: true,
    file: abs,
    note:
      `已定位到 ${OK_EXTS[ext]} 文件 ${path.basename(abs)}。` +
      "预览面板需要用户在文件树里双击该文件才会打开 —— " +
      "插件进程无法直接操作窗口。",
  };
}

const server = http.createServer(async (req, res) => {
  // 只接受本机（防御性：插件端口不该被外部访问）
  const remote = req.socket.remoteAddress || "";
  if (!remote.startsWith("127.0.0.1") && remote !== "::1") {
    send(res, 403, JSON.stringify({ error: "forbidden" }));
    return;
  }

  const url = new URL(req.url || "/", `http://${HOST}`);

  // CORS 预检：面板 iframe 的源是 plugins.localhost，API 在 127.0.0.1:<port>，跨源
  if (req.method === "OPTIONS") {
    send(res, 204, "");
    return;
  }

  // 宿主 MCP 工具转发入口（契约固定：{tool, args} → {ok, ...}）
  if (url.pathname === "/__mcp") {
    if (req.method !== "POST") {
      send(res, 405, JSON.stringify({ ok: false, error: "仅支持 POST" }));
      return;
    }
    let body;
    try {
      body = JSON.parse((await readBody(req)) || "{}");
    } catch (e) {
      send(res, 200, JSON.stringify({ ok: false, error: "请求体不是合法 JSON" }));
      return;
    }
    const args = body && typeof body.args === "object" && body.args ? body.args : {};
    try {
      send(res, 200, JSON.stringify(handleMcpTool(body && body.tool, args)));
    } catch (e) {
      send(res, 200, JSON.stringify({ ok: false, error: String((e && e.message) || e) }));
    }
    return;
  }

  if (req.method !== "GET") {
    send(res, 405, JSON.stringify({ error: "method not allowed" }));
    return;
  }

  // 健康检查 / 面板探测
  if (url.pathname === "/health") {
    send(res, 200, JSON.stringify({ ok: true, roots: allowedRoots.length }));
    return;
  }

  // 读一个文件的原始字节
  if (url.pathname === "/file") {
    const target = url.searchParams.get("path");
    if (!target) {
      send(res, 400, JSON.stringify({ error: "missing path" }));
      return;
    }
    if (!isAllowed(target)) {
      log("拒绝越界读取:", target);
      send(res, 403, JSON.stringify({ error: "path outside workspace" }));
      return;
    }
    let stat;
    try {
      stat = fs.statSync(target);
    } catch {
      send(res, 404, JSON.stringify({ error: "not found" }));
      return;
    }
    if (!stat.isFile()) {
      send(res, 400, JSON.stringify({ error: "not a file" }));
      return;
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "no-store",
      // 同 send()：iframe 跨源取字节，缺了这条浏览器直接拦掉（实测会显示
      // "解析失败: Failed to fetch"，且错误信息完全指不到 CORS）
      "Access-Control-Allow-Origin": "*",
    });
    fs.createReadStream(target).pipe(res);
    return;
  }

  send(res, 404, JSON.stringify({ error: "not found" }));
});

// 端口由系统分配，选完再打印 —— 宿主靠 PLUGIN_PORT 找过来（见 plugin_process.rs）
server.listen(0, HOST, () => {
  const { port } = server.address();
  console.log(`PLUGIN_PORT=${port}`);
  log(`listening on ${HOST}:${port}，允许目录: ${allowedRoots.length} 个`);
});

// 宿主在切换工作区时可能重新下发（协议约定：stdin 收到 JSON 行）
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  for (const line of chunk.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      const msg = JSON.parse(t);
      if (msg.type === "workspace" && typeof msg.path === "string" && msg.path.trim()) {
        allowedRoots = [path.resolve(msg.path)];
        log("工作区已更新:", allowedRoots[0]);
      }
    } catch {
      /* 非 JSON 行忽略 */
    }
  }
});
