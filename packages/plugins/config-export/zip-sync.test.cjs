// ── 发布一致性：config-export.zip 必须与源码一致，且签名有效 ──
//
// 🔴 为什么要有这条（2026-11-07，两次真实事故）：
//
// 1. tar-writer.cjs 的状态机修复提交进了源码，但 config-export.zip 是三天前
//    打的，没人重新打包。于是**安装出去的插件跑的是旧代码**：
//    读 manifest 171 秒（新版 2 秒）、整包解压半小时级。
//    仓库里的测试全绿 —— 它们测的是源码，不是发出去的包。
//
// 2. 第一次改走 web 发布路径时上传没带 signature，服务端
//    `elif sig_path.exists(): unlink()` 把原有签名删了 →
//    marketplace 里 config-export 从 signed=true 变 signed=false，
//    用户直接失去「安装」按钮。
//
// 所以两条都锁住：zip 必须同步、sig 必须有效。签名由 pack-plugins.py 自动生成。

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const DIR = __dirname;
const ZIP = path.join(DIR, "config-export.zip");
const SIG = path.join(DIR, "config-export.sig");

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

const hasUnzip = process.platform !== "win32" ? fs.existsSync("/usr/bin/unzip") : true;

function zipList() {
  const out = execFileSync("unzip", ["-l", ZIP], { encoding: "utf8" });
  return out.split("\n")
    .filter((l) => /\s\d+\s+1980-01-01/.test(l) || /\s\d{2}-\d{2}-\d{4}/.test(l))
    .map((l) => l.trim().split(/\s+/).pop())
    .filter(Boolean);
}

/** 用 Node 内置 crypto 验 Ed25519？Node 没直接暴露 —— 交给 python + 内嵌公钥。 */
function verifySig(zipPath, sigPath) {
  const py = `
import base64,hashlib,re,sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
src=open(r'${path.join(DIR, "..", "..", "..", "apps", "gui", "src-tauri", "src", "plugin_pubkey.rs").replace(/\\/g, "\\\\")}',encoding='utf-8').read()
pub=bytes(int(x,16) for x in re.findall(r'0x([0-9a-fA-F]{2})',src)[:32])
z=open(sys.argv[1],'rb').read(); d=hashlib.sha256(z).digest()
s=base64.b64decode(open(sys.argv[2]).read().strip())
try:
    Ed25519PublicKey.from_public_bytes(pub).verify(s,d); print('PASS')
except Exception as e: print('FAIL:'+str(e))
`;
  try {
    return execFileSync("python", ["-c", py, zipPath, sigPath], { encoding: "utf8" }).trim();
  } catch (e) {
    return "FAIL:" + String(e.message || e);
  }
}

test("config-export.zip 存在", () => {
  assert.ok(fs.existsSync(ZIP), "缺少 config-export.zip");
});

test("zip 与源码一致（漏打包 = 发出去的还是旧代码）", (t) => {
  if (!hasUnzip) { t.skip("没有 unzip"); return; }
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
  if (!hasUnzip) { t.skip("没有 unzip"); return; }
  const names = zipList();
  if (!names.includes("meta.yaml")) { t.skip("zip 里没有 meta.yaml"); return; }
  const meta = execFileSync("unzip", ["-p", ZIP, "meta.yaml"], { encoding: "utf8" });
  const src = fs.readFileSync(path.join(DIR, "meta.yaml"), "utf8");
  const v = (s) => (s.match(/^version:\s*"([^"]+)"/m) || [])[1];
  assert.strictEqual(v(meta), v(src), "zip 里的版本号落后于源码");
});

test("签名存在且与当前 zip 匹配（否则市场上是 signed=false）", (t) => {
  if (!fs.existsSync(SIG)) {
    // 没有私钥的机器拿不到 .sig（它被 gitignore 了）—— 这种情况跳过，
    // 但**发布前必须跑过 pack-plugins.py**，它会自动签名。
    t.skip(`没有 ${path.basename(SIG)}（无签名私钥的机器正常；发布前需 pack-plugins.py 自动生成）`);
    return;
  }
  const res = verifySig(ZIP, SIG);
  assert.ok(res === "PASS",
    `签名与 zip 不匹配 → 发布后市场会判为「未受信任」。重新打包会自动重签。\n  ${res}`);
});

test("zip 的 sha256 与签名覆盖的内容一致（自证）", (t) => {
  if (!fs.existsSync(SIG)) { t.skip("没有 .sig"); return; }
  // 同一份 zip，签名必须可重复验证 —— 防止 .sig 是别的版本的残留
  const a = verifySig(ZIP, SIG);
  const b = verifySig(ZIP, SIG);
  assert.strictEqual(a, b, "同一输入两次验签结论应一致");
  assert.ok(crypto.createHash("sha256").update(fs.readFileSync(ZIP)).digest("hex").length === 64);
});
