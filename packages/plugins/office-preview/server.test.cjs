// office-preview 进程侧的行为契约。
//
// 重点锁两件事：
//   ① 工作区从 **manifest 的 env 声明** 来（`${workspace}` 占位符由宿主展开），
//      不是凭空猜测的环境变量名 —— 少声明一次，所有文件都会被判"越界"
//   ② 越界路径必须被拒

const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const PLUGIN_DIR = __dirname;

/** 起一个插件进程，等它打印 PLUGIN_PORT=<n>。 */
function startServer(env, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(PLUGIN_DIR, "server.cjs")], {
      cwd: PLUGIN_DIR,
      env: { ...process.env, ...env },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let out = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`等 PLUGIN_PORT 超时。输出: ${out}`));
    }, timeoutMs);

    child.stdout.on("data", (d) => {
      out += d.toString();
      const m = out.match(/PLUGIN_PORT=(\d+)/);
      if (m) {
        clearTimeout(timer);
        resolve({ child, port: Number(m[1]) });
      }
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
  });
}

async function get(port, p) {
  const r = await fetch(`http://127.0.0.1:${port}${p}`);
  return { status: r.status, body: await r.text() };
}

test("有工作区时能读到区内文件，区外仍被拒", async () => {
  const workspace = path.resolve(PLUGIN_DIR, "..", "..");
  const { child, port } = await startServer({ CLAUDE_PLUGIN_WORKSPACE: workspace });
  try {
    const health = JSON.parse((await get(port, "/health")).body);
    assert.equal(health.ok, true);

    // 工作区里放一个临时文件（用 server.cjs 自己当目标，肯定存在）
    const target = path.join(PLUGIN_DIR, "server.cjs");
    const encoded = encodeURIComponent(target);
    const r = await get(port, `/file?path=${encoded}`);
    assert.equal(r.status, 200, "工作区内的文件应能读到");
    assert.ok(r.body.includes("office-preview"), "读到的是 server.cjs 的内容");

    // 区外
    const outside = await get(port, `/file?path=${encodeURIComponent("C:/Windows/win.ini")}`);
    assert.equal(outside.status, 403, "工作区外必须拒绝");
  } finally {
    child.kill();
  }
});

test("没有工作区时，任何文件都读不到（安全默认）", async () => {
  // 这条是 bug 的回归测试：宿主不传工作区时（如 manifest 忘了写 env），
  // 进程必须**什么都不敢给**，而不是放开。
  const env = { ...process.env };
  delete env.CLAUDE_PLUGIN_WORKSPACE;
  const { child, port } = await startServer({ CLAUDE_PLUGIN_WORKSPACE: "" });
  try {
    const health = JSON.parse((await get(port, "/health")).body);
    assert.equal(health.roots, 0, "没有工作区时允许目录必须是 0");

    const target = path.join(PLUGIN_DIR, "server.cjs");
    const r = await get(port, `/file?path=${encodeURIComponent(target)}`);
    assert.equal(r.status, 403, "没有工作区时必须一律拒绝");
  } finally {
    child.kill();
  }
});

test("目录穿越出不去", async () => {
  const workspace = path.join(PLUGIN_DIR, "vendor");
  const { child, port } = await startServer({ CLAUDE_PLUGIN_WORKSPACE: workspace });
  try {
    const escape = path.join(workspace, "..", "..", "..", "..", "Windows", "win.ini");
    const r = await get(port, `/file?path=${encodeURIComponent(escape)}`);
    assert.equal(r.status, 403, "../ 穿越必须被拦");
  } finally {
    child.kill();
  }
});

test("manifest 必须把 xlsx 关联到 sheet 面板", () => {
  // 键名/面板 id 对不上时会静默失效（双击没反应，用户只会说"不好使"）。
  const manifest = JSON.parse(fs.readFileSync(path.join(PLUGIN_DIR, "plugin.json"), "utf8"));
  const fts = manifest.contributes.fileTypes || [];
  const xlsx = fts.find((f) => f.extensions.includes("xlsx"));
  assert.ok(xlsx, "必须声明 xlsx 的文件类型关联");
  assert.equal(xlsx.panelId, "sheet", "xlsx 应关联到 sheet 面板");

  const sheetPanel = manifest.contributes.panels.find((p) => p.id === "sheet");
  assert.ok(sheetPanel, "sheet 面板必须存在");
  assert.equal(sheetPanel.content.src, "sheet.html");
  assert.equal(sheetPanel.process, "office-preview-server", "面板要绑到进程才能取到 port");
});

test("vendor 里的三个库都要在包里", () => {
  // 缺任何一个都会白屏：docx-preview 要 JSZip；Excel 要 ooxml 全套；PPT 要 pptx-renderer。
  const required = [
    "vendor/jszip.min.js",
    "vendor/docx-preview.min.js",
    "vendor/ooxml/core.js",
    "vendor/pptx-renderer.es.js",
  ];
  for (const f of required) {
    assert.ok(fs.existsSync(path.join(PLUGIN_DIR, f)), `缺少 ${f}`);
  }
});

test("ooxml vendor 的 chunks 目录必须完整", () => {
  // 🔴 2026-11-03 实测：只拷 core.js + 静态 import 的那个 chunk 不够 ——
  // 库内部还有**变量拼接的动态 import**（如 exceljs.min-*.js），
  // 静态分析抓不到，漏拷会在运行时才报 "Failed to fetch dynamically imported module"。
  // 所以这里直接要求整个 chunks 目录存在且不空。
  const chunksDir = path.join(PLUGIN_DIR, "vendor/ooxml/chunks");
  assert.ok(fs.existsSync(chunksDir), "vendor/ooxml/chunks 目录不存在");
  const files = fs.readdirSync(chunksDir).filter((f) => f.endsWith(".js"));
  assert.ok(files.length >= 10, `chunks 目录文件数异常少: ${files.length} 个`);
  assert.ok(files.includes("core.js") === false);
  // core.js 必须和 chunks 同级
  assert.ok(fs.existsSync(path.join(PLUGIN_DIR, "vendor/ooxml/core.js")));
});

test("manifest 必须把 pptx 关联到 slides 面板", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(PLUGIN_DIR, "plugin.json"), "utf8"));
  const pptx = (manifest.contributes.fileTypes || []).find((f) => f.extensions.includes("pptx"));
  assert.ok(pptx, "必须声明 pptx 的文件类型关联");
  assert.equal(pptx.panelId, "slides");
  const panel = manifest.contributes.panels.find((p) => p.id === "slides");
  assert.ok(panel, "slides 面板必须存在");
  assert.equal(panel.content.src, "slides.html");
  assert.equal(panel.process, "office-preview-server");
});

test("三种格式的面板都指向真实存在的文件", () => {
  // 面板 src 写错时宿主加载 404，白屏且无明显错误提示
  const manifest = JSON.parse(fs.readFileSync(path.join(PLUGIN_DIR, "plugin.json"), "utf8"));
  for (const ft of manifest.contributes.fileTypes) {
    const panel = manifest.contributes.panels.find((p) => p.id === ft.panelId);
    assert.ok(panel, `${ft.extensions[0]} 指向的面板 ${ft.panelId} 不存在`);
    assert.ok(
      fs.existsSync(path.join(PLUGIN_DIR, panel.content.src)),
      `${panel.content.src} 不存在`,
    );
  }
});

test("manifest 必须声明 CLAUDE_PLUGIN_WORKSPACE=${workspace}", () => {
  // 🔴 2026-11-03 实测事故：manifest 里漏了这条 env 声明，宿主就不会传工作区，
  // 用户双击文档看到「这个文件不在当前工作区内」。
  // 宿主只在 manifest 声明了 env 时才展开占位符（见 pluginProcessBridge.buildPluginProcessEnv）。
  const manifest = JSON.parse(fs.readFileSync(path.join(PLUGIN_DIR, "plugin.json"), "utf8"));
  const proc = (manifest.processes || []).find((p) => p.id === "office-preview-server");
  assert.ok(proc, "找不到 office-preview-server 进程声明");
  assert.equal(
    proc.env && proc.env.CLAUDE_PLUGIN_WORKSPACE,
    "${workspace}",
    "必须在 processes[].env 里声明 CLAUDE_PLUGIN_WORKSPACE=${workspace}，否则宿主不传工作区",
  );
});
