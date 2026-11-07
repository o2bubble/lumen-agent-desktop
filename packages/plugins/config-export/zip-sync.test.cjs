// ── 发布一致性：config-export.zip 必须与源码一致 ──
//
// 🔴 为什么要有这条（2026-11-07，真实事故）：
// tar-writer.cjs 的状态机修复提交进了源码，但 config-export.zip 是三天前打的，
// 没人重新打包。于是**安装出去的插件跑的是旧代码**：
//   读 manifest 171 秒（新版 2 秒）、整包解压半小时级。
// 恢复端因此白等了半个小时，而仓库里的测试全绿 —— 它们测的是源码，不是发出去的包。
//
// 这条测试把「源码 ≠ 发布物」变成红。

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const DIR = __dirname;
const ZIP = path.join(DIR, "config-export.zip");

// 打进包里的文件（不含测试、不含文档草稿）
const SHIPPED = [
  "AI_NOTES.md",
  "README.md",
  "export-server.cjs",
  "meta.yaml",
  "panel.html",
  "plugin.json",
  "restore-tools.cjs",
  "tar-writer.cjs",
  "extract.py",
];

function zipList() {
  const out = execFileSync("node", ["-e", `
    const {execFileSync}=require("child_process");
    process.stdout.write(execFileSync("unzip",["-l",${JSON.stringify(ZIP)}],{encoding:"utf8"}));
  `], { encoding: "utf8" });
  return out.split("\n")
    .filter((l) => /\s\d+\s+1980-01-01/.test(l) || /\s\d{2}-\d{2}-\d{4}/.test(l))
    .map((l) => l.trim().split(/\s+/).pop())
    .filter(Boolean);
}

test("config-export.zip 存在", () => {
  assert.ok(fs.existsSync(ZIP), "缺少 config-export.zip");
});

test("zip 与源码逐字节一致（漏打包 = 发出去的还是旧代码）", (t) => {
  if (process.platform !== "win32" && !fs.existsSync("/usr/bin/unzip")) {
    t.skip("没有 unzip");
    return;
  }
  const names = zipList();
  assert.ok(names.length > 0, "读不出 zip 内容");

  // zip 里的文本是 **LF 归一化**过的（pack-plugins.py 有意为之：Windows 工作树
  // 是 CRLF，原样打包会让每次重新打包产生一堆二进制 diff）。比较时两边都归一化，
  // 否则这条测试会因为换行符永远红。
  const norm = (s) => s.replace(/\r\n/g, "\n");
  const stale = [];
  for (const f of SHIPPED) {
    if (!names.includes(f)) { stale.push(`${f}（zip 里没有）`); continue; }
    const inZip = execFileSync("unzip", ["-p", ZIP, f], { encoding: "utf8" });
    const onDisk = fs.readFileSync(path.join(DIR, f), "utf8");
    if (norm(inZip) !== norm(onDisk)) stale.push(`${f}（内容不一致）`);
  }
  assert.deepStrictEqual(stale, [],
    `这些文件和源码不一致，请重新打包 config-export.zip：\n  ${stale.join("\n  ")}`);
});

test("zip 里的版本号与源码一致", (t) => {
  if (process.platform !== "win32" && !fs.existsSync("/usr/bin/unzip")) {
    t.skip("没有 unzip");
    return;
  }
  const names = zipList();
  if (!names.includes("meta.yaml")) { t.skip("zip 里没有 meta.yaml"); return; }
  const meta = execFileSync("unzip", ["-p", ZIP, "meta.yaml"], { encoding: "utf8" });
  const src = fs.readFileSync(path.join(DIR, "meta.yaml"), "utf8");
  const v = (s) => (s.match(/^version:\s*"([^"]+)"/m) || [])[1];
  assert.strictEqual(v(meta), v(src), "zip 里的版本号落后于源码");
});
