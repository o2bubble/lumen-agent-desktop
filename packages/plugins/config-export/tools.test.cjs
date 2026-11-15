// ── restore-tools：恢复率模型 + 各命令 ──
//
// 重点是**恢复率的算法**（纯函数，可精确断言）。
// 命令层只做冒烟（确认能跑、输出结构对），不重复测 tar 本身。

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const { verifiabilityOf, computeRecoveryRate } = require("./restore-tools.cjs");

// ── 恢复率的可验证级别 ──

test("verifiabilityOf: overwrite 可精确验证（sha256 一致）", () => {
  assert.strictEqual(verifiabilityOf("overwrite"), "exact");
});

test("verifiabilityOf: merge / append 只能部分验证", () => {
  assert.strictEqual(verifiabilityOf("merge"), "partial");
  assert.strictEqual(verifiabilityOf("append"), "partial");
});

test("verifiabilityOf: manual 无法自动验证", () => {
  assert.strictEqual(verifiabilityOf("manual"), "unverifiable");
  assert.strictEqual(verifiabilityOf("unknown-mode"), "unverifiable", "未知模式也归为不可验证");
});

// ── 恢复率：两个数，不合成 ──

test("computeRecoveryRate: 全部可验证且全过 → 两个数都是 100%", () => {
  const r = computeRecoveryRate([
    { mode: "overwrite", verified: "pass" },
    { mode: "merge", verified: "pass" },
  ]);
  assert.strictEqual(r.autoPassRate, 1);
  assert.strictEqual(r.overallCoverage, 1);
  assert.strictEqual(r.unverifiable.total, 0);
  assert.ok(r.note.includes("全部条目都可自动验证"));
});

test("computeRecoveryRate: 有无法验证的项 → 覆盖率**低于**自动验证率", () => {
  const r = computeRecoveryRate([
    { mode: "overwrite", verified: "pass" },  // 可验，过
    { mode: "overwrite", verified: "pass" },  // 可验，过
    { mode: "manual", verified: "skipped" },  // 不可验
    { mode: "manual", verified: "skipped" },  // 不可验
  ]);
  // 自动验证：2/2 = 100%
  assert.strictEqual(r.autoPassRate, 1);
  // 整体覆盖：2/4 = 50%
  assert.strictEqual(r.overallCoverage, 0.5);
  assert.strictEqual(r.unverifiable.total, 2);
  assert.ok(r.note.includes("无法自动验证"), "必须如实说明有几个验不了");
});

test("computeRecoveryRate: 部分失败时两个数一起降", () => {
  const r = computeRecoveryRate([
    { mode: "overwrite", verified: "pass" },
    { mode: "overwrite", verified: "fail" },
    { mode: "manual", verified: "skipped" },
  ]);
  assert.strictEqual(r.autoPassRate, 0.5);      // 1/2
  assert.strictEqual(r.overallCoverage, 1 / 3); // 1/3
  assert.strictEqual(r.exact.fail, 1);
});

test("computeRecoveryRate: 全是 manual → 自动验证率为 null（不是 0 也不是 100）", () => {
  const r = computeRecoveryRate([
    { mode: "manual", verified: "skipped" },
    { mode: "manual", verified: "skipped" },
  ]);
  assert.strictEqual(r.autoPassRate, null, "没有可验证项时不能编一个数");
  assert.strictEqual(r.overallCoverage, 0);
  assert.strictEqual(r.unverifiable.total, 2);
});

test("computeRecoveryRate: 空包 → 都是 null", () => {
  const r = computeRecoveryRate([]);
  assert.strictEqual(r.autoPassRate, null);
  assert.strictEqual(r.overallCoverage, null);
  assert.ok(r.note.includes("没有可恢复的条目"));
});

test("computeRecoveryRate: 分类计数正确", () => {
  const r = computeRecoveryRate([
    { mode: "overwrite", verified: "pass" },
    { mode: "overwrite", verified: "pass" },
    { mode: "merge", verified: "pass" },
    { mode: "append", verified: "fail" },
    { mode: "manual", verified: "skipped" },
  ]);
  assert.deepStrictEqual(r.exact, { pass: 2, fail: 0, total: 2 });
  assert.deepStrictEqual(r.partial, { pass: 1, fail: 1, total: 2 });
  assert.deepStrictEqual(r.unverifiable, { total: 1 });
});

// ── 命令冒烟测试 ──

const HOME = fs.mkdtempSync(path.join(os.tmpdir(), "rt-test-"));
process.env.HOME = HOME;
process.env.USERPROFILE = HOME;
delete process.env.APPDATA;
process.env.CLAUDE_PLUGIN_WORKSPACE = "";

const m = require("./export-server.cjs");
const CLAUDE = path.join(HOME, ".claude");
function w(p, c) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c, "utf8");
}

let PKG;
test.before(async () => {
  w(path.join(CLAUDE, "CLAUDE.md"), "# 指令\n");
  w(path.join(CLAUDE, "settings.json"), JSON.stringify({ theme: "dark" }, null, 2));
  w(path.join(CLAUDE, "projects/x/memory/MEMORY.md"), "- 记忆\n");
  PKG = path.join(HOME, "pkg.tar.gz");
  await m.doExport({ categories: ["claude-md", "claude-settings", "claude-memory"], outputPath: PKG });
});
test.after(() => fs.rmSync(HOME, { recursive: true, force: true }));

function run(args) {
  try {
    return JSON.parse(execFileSync(
      "node", [path.join(__dirname, "restore-tools.cjs"), ...args],
      { encoding: "utf8", timeout: 120000 },
    ));
  } catch (e) {
    if (e.stdout) { try { return JSON.parse(e.stdout); } catch { /* fallthrough */ } }
    throw e;
  }
}

test("list: 返回分类与总量", () => {
  const r = run(["list", PKG]);
  assert.strictEqual(r.ok, true);
  assert.ok(r.totals.files >= 3);
  assert.ok(r.categories.some((c) => c.id === "claude-md"));
});

test("verify: 完好的包校验通过", () => {
  const r = run(["verify", PKG]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.packageIntact, true);
  assert.strictEqual(r.failed, 0);
});

test("verify: 损坏的包必须报错（不能假装完整）", () => {
  const broken = path.join(HOME, "broken.tar.gz");
  fs.writeFileSync(broken, Buffer.from("1f8b08000000000000", "hex"));
  const r = run(["verify", broken]);
  assert.strictEqual(r.ok, false, "截断的包绝不能校验通过");
});

test("compare: 空目标 → 全部 missing", () => {
  const dest = path.join(HOME, "empty-dest");
  const r = run(["compare", PKG, "--dest", dest]);
  assert.strictEqual(r.summary.missing, r.summary.missing + r.summary.identical + r.summary.different + r.summary.exists + r.summary.unresolvable);
  assert.ok(r.summary.missing >= 3);
});

test("compare + rate: 恢复一半后能算出**两个**不同的比例", () => {
  const dest = path.join(HOME, "half-dest");
  fs.mkdirSync(path.join(dest, ".claude"), { recursive: true });
  fs.copyFileSync(path.join(CLAUDE, "CLAUDE.md"), path.join(dest, ".claude", "CLAUDE.md"));

  const r = run(["rate", PKG, "--dest", dest]);
  assert.strictEqual(r.ok, true);
  assert.ok(typeof r.recovery.autoPassPercent === "number");
  assert.ok(typeof r.recovery.overallPercent === "number");
  assert.ok(
    r.recovery.overallPercent <= r.recovery.autoPassPercent,
    "覆盖率不应高于自动验证率（它把不可验的算作未覆盖）",
  );
  assert.ok(r.recovery.breakdown.unverifiable.total >= 1, "记忆文件应归入不可验证");
  assert.ok(r.customItems.length === 0, "这个包没有自定义项");
});

test("session-diff: 能看出多出来的轮次", () => {
  const a = path.join(HOME, "a.jsonl");
  const b = path.join(HOME, "b.jsonl");
  fs.writeFileSync(a, '{"uuid":"u1","timestamp":1}\n');
  fs.writeFileSync(b, '{"uuid":"u1","timestamp":1}\n{"uuid":"u2","timestamp":2}\n');
  const r = run(["session-diff", a, b]);
  assert.strictEqual(r.onlyInB.count, 1);
  assert.strictEqual(r.conflicting.count, 0);
  assert.ok(r.hint.includes("合并"));
});

test("session-diff: 同 uuid 内容不同 → 报真冲突", () => {
  const a = path.join(HOME, "c.jsonl");
  const b = path.join(HOME, "d.jsonl");
  fs.writeFileSync(a, '{"uuid":"u1","timestamp":1,"x":1}\n');
  fs.writeFileSync(b, '{"uuid":"u1","timestamp":1,"x":2}\n');
  const r = run(["session-diff", a, b]);
  assert.strictEqual(r.conflicting.count, 1);
  assert.ok(r.conflicting.note.includes("必须问用户"));
});

test("session-merge: 正常合并并保持 uuid 唯一", () => {
  const a = path.join(HOME, "m1.jsonl");
  const b = path.join(HOME, "m2.jsonl");
  const o = path.join(HOME, "mo.jsonl");
  fs.writeFileSync(a, '{"uuid":"u1","timestamp":1}\n{"uuid":"u2","timestamp":2}\n');
  fs.writeFileSync(b, '{"uuid":"u1","timestamp":1}\n{"uuid":"u3","timestamp":3}\n');
  const r = run(["session-merge", a, b, "-o", o]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.merged, 3, "u1 只出现一次");
  const lines = fs.readFileSync(o, "utf8").trim().split("\n");
  assert.strictEqual(lines.length, 3);
});

test("session-merge: 有真冲突时**拒绝合并**（不能猜）", () => {
  const a = path.join(HOME, "x1.jsonl");
  const b = path.join(HOME, "x2.jsonl");
  const o = path.join(HOME, "xo.jsonl");
  fs.writeFileSync(a, '{"uuid":"u1","v":1}\n');
  fs.writeFileSync(b, '{"uuid":"u1","v":2}\n');
  const r = run(["session-merge", a, b, "-o", o]);
  assert.strictEqual(r.ok, false);
  assert.ok(r.error.includes("不能自动合并"));
  assert.ok(!fs.existsSync(o), "拒绝时不该产生输出文件");
});

test("session-merge: 覆盖已有文件前自动备份", () => {
  const a = path.join(HOME, "y1.jsonl");
  const b = path.join(HOME, "y2.jsonl");
  const o = path.join(HOME, "yo.jsonl");
  fs.writeFileSync(a, '{"uuid":"u1","timestamp":1}\n');
  fs.writeFileSync(b, '{"uuid":"u2","timestamp":2}\n');
  fs.writeFileSync(o, '{"uuid":"old"}\n');
  const r = run(["session-merge", a, b, "-o", o]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.backups.length, 1, "必须留下备份");
  assert.ok(fs.existsSync(r.backups[0]));
});

test("json-merge: 只预览不写盘，分开 added / changed", () => {
  const a = path.join(HOME, "ja.json");
  const b = path.join(HOME, "jb.json");
  fs.writeFileSync(a, JSON.stringify({ theme: "dark", keep: 1 }));
  fs.writeFileSync(b, JSON.stringify({ theme: "light", added: 2 }));
  const before = fs.statSync(a).mtimeMs;
  const r = run(["json-merge", a, b]);
  assert.deepStrictEqual(r.addedFromOther.map((x) => x.key), ["added"]);
  assert.deepStrictEqual(r.changed.map((x) => x.key), ["theme"]);
  assert.strictEqual(fs.statSync(a).mtimeMs, before, "预览不能改文件");
  assert.ok(r.hint.includes("问用户"));
  assert.ok(r.hint.includes("env"), "必须提醒 env 段不能带过来");
});

test("未知命令 → 报错而不是静默", () => {
  const r = run(["no-such-cmd"]);
  assert.strictEqual(r.ok, false);
  assert.ok(r.error.includes("未知命令"));
});

// ── 2026-11-07：路径重映射 / 子集提取 / 流式校验 ──

test("--only: 只解压匹配的条目，其余跳过", () => {
  const dest = path.join(HOME, "only-dest");
  const r = run(["extract", PKG, "--dest", dest, "--only", "^(claude/settings\.json$)"]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.filtered, "^(claude/settings\.json$)");
  assert.strictEqual(r.files, 1, "只应有 1 个文件落盘");
  assert.ok(r.skipped > 0, "其余条目应记为 skipped");
  assert.ok(fs.existsSync(path.join(dest, "data/claude/settings.json")));
  assert.ok(!fs.existsSync(path.join(dest, "data/claude/CLAUDE.md")), "不该解出未匹配的文件");
});

test("verify: 流式校验不落盘（不产生解包目录）", () => {
  const before = fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith("rt-verify-")).length;
  const r = run(["verify", PKG]);
  const after = fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith("rt-verify-")).length;
  assert.strictEqual(r.ok, true);
  assert.strictEqual(after, before, "verify 不应再建临时解包目录");
});

test("--map: 把 ~ 映射到别处后，目标判定跟着走", () => {
  const fakeHome = path.join(HOME, "other-home");
  fs.mkdirSync(path.join(fakeHome, ".claude"), { recursive: true });
  fs.copyFileSync(path.join(CLAUDE, "CLAUDE.md"), path.join(fakeHome, ".claude", "CLAUDE.md"));

  const r = run(["compare", PKG, "--dest", path.join(HOME, "nope"), "--map", `~=${fakeHome}`]);
  assert.strictEqual(r.ok, true);
  assert.ok(r.summary.identical >= 1 || r.summary.exists >= 1,
    `映射后应能在这份家目录里找到文件，实际 ${JSON.stringify(r.summary)}`);
});

test("resolveTarget: ~/.skills 支持单独映射（不被 ~ 吃掉）", () => {
  const { resolveTarget } = require("./restore-tools.cjs");
  const map = { "~": "/home/u", "~/.skills": "/home/u/.claude/skills" };
  assert.strictEqual(
    resolveTarget("~/.skills/foo/SKILL.md", "/x", map).replace(/\\/g, "/"),
    "/home/u/.claude/skills/foo/SKILL.md",
  );
  assert.strictEqual(
    resolveTarget("~/.claude/settings.json", "/x", map).replace(/\\/g, "/"),
    "/home/u/.claude/settings.json",
  );
});

test("resolveTarget: 未映射 ~/.skills 不报 unresolvable", () => {
  const { resolveTarget } = require("./restore-tools.cjs");
  const got = resolveTarget("~/.skills/a/SKILL.md", "/root");
  assert.ok(got && got.replace(/\\/g, "/").endsWith("/root/.skills/a/SKILL.md"));
});

// ══════════════════════════════════════════════════════════════
// 撞名会话：sessionId 复用 ≠ 同一会话的两个进度（2026-11-15）
// ══════════════════════════════════════════════════════════════
//
// 真实事故：`56342174` 在导出机是 11-06→11-09、本机是 11-11→11-15，
// 两个文件的 uuid **零交集**。旧版 session-diff 的 hint 是「可以按 uuid 合并」，
// session-merge 也照做不误（因为没有同 uuid 不同内容，不触发冲突门）。
// 结果会缝出一段跨 9 天、上下文无关的对话，还报 ok:true。

test("session-diff: 同文件名 + 零共享 uuid → 报 id 复用，禁止合并", () => {
  const dir = path.join(HOME, "reuse-a");
  fs.mkdirSync(dir, { recursive: true });
  const a = path.join(dir, "sess1.jsonl");
  const b = path.join(HOME, "reuse-b", "sess1.jsonl");
  fs.mkdirSync(path.dirname(b), { recursive: true });
  fs.writeFileSync(a, '{"sessionId":"sess1","uuid":"u1","timestamp":"2026-11-06T00:00:00Z"}\n');
  fs.writeFileSync(b, '{"sessionId":"sess1","uuid":"u9","timestamp":"2026-11-11T00:00:00Z"}\n');

  const r = run(["session-diff", a, b]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.shared, 0);
  assert.strictEqual(r.idReuse.detected, true, "零共享 uuid 且同文件名 → 必须是 id 复用");
  assert.ok(r.hint.includes("禁止"), `hint 不能建议合并，实际：${r.hint}`);
});

test("session-diff: 不同会话、零共享 uuid → 不算 id 复用（拼接是合法用法）", () => {
  const a = path.join(HOME, "p1.jsonl");
  const b = path.join(HOME, "p2.jsonl");
  fs.writeFileSync(a, '{"sessionId":"aaa","uuid":"u1"}\n');
  fs.writeFileSync(b, '{"sessionId":"bbb","uuid":"u2"}\n');
  const r = run(["session-diff", a, b]);
  assert.strictEqual(r.idReuse.detected, false, "两个不相干的导出拼起来是合法的");
  assert.ok(r.hint.includes("合并"));
});

test("session-merge: 同会话身份 + 零共享 uuid → 拒绝并指向 session-fork", () => {
  const dir = path.join(HOME, "reuse-m");
  fs.mkdirSync(dir, { recursive: true });
  const a = path.join(dir, "same.jsonl");
  const b = path.join(HOME, "reuse-m2", "same.jsonl");
  fs.mkdirSync(path.dirname(b), { recursive: true });
  const o = path.join(HOME, "reuse-out.jsonl");
  fs.writeFileSync(a, '{"sessionId":"same","uuid":"u1"}\n');
  fs.writeFileSync(b, '{"sessionId":"same","uuid":"u2"}\n');

  const r = run(["session-merge", a, b, "-o", o]);
  assert.strictEqual(r.ok, false, "必须拒绝合并");
  assert.ok(r.hint.includes("session-fork"));
  assert.ok(!fs.existsSync(o), "拒绝时不该产生输出文件");
});

// ── session-fork：另存为新 sessionId，正文不动 ──

test("session-fork: 只改 sessionId 字段，正文里提到的旧 id 保留", () => {
  const src = path.join(HOME, "fork-src.jsonl");
  const dst = path.join(HOME, "fork-out.jsonl");
  fs.writeFileSync(
    src,
    [
      '{"sessionId":"old-id","uuid":"u1","message":"见会话 old-id 的结论"}',
      '{"sessionId":"old-id","uuid":"u2","message":"无关"}',
    ].join("\n") + "\n",
  );
  const r = run(["session-fork", src, "--new-id", "new-id", "-o", dst]);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.sessionIdFieldsRewritten, 2);

  const lines = fs.readFileSync(dst, "utf8").trim().split("\n").map((l) => JSON.parse(l));
  assert.ok(lines.every((o) => o.sessionId === "new-id"), "sessionId 全部换新");
  assert.ok(
    lines[0].message.includes("old-id"),
    "正文里的旧 id 是历史内容，**不能**被改写（2026-11-15 手工 replaceAll 误伤 48 处）",
  );
});

test("session-fork: 不给 --new-id 也能生成（自动配 uuid）", () => {
  const src = path.join(HOME, "fork-auto.jsonl");
  fs.writeFileSync(src, '{"sessionId":"x","uuid":"u1"}\n');
  const r = run(["session-fork", src]);
  assert.strictEqual(r.ok, true);
  assert.ok(/^[0-9a-f-]{36}$/.test(r.newSessionId));
  assert.ok(fs.existsSync(r.output));
});

// ══════════════════════════════════════════════════════════════
// 项目 slug ≠ 项目（工作区搬家）
// ══════════════════════════════════════════════════════════════
//
// 真实事故：`C:\Storage\claude-code-haha-dev` 搬到 `D:\Development\...` 后
// slug 从 `C--Storage-...` 变成 `D--Development-...`，compare 报 388 missing，
// 看起来像「包里少了半个」，实际只需要重映射。

test("slugOfPath: 非字母数字一律压成 -（与 GUI 生成规则一致）", () => {
  const { slugOfPath } = require("./restore-tools.cjs");
  assert.strictEqual(
    slugOfPath(String.raw`D:\Development\claude-code-haha-dev`),
    "D--Development-claude-code-haha-dev",
  );
  assert.strictEqual(
    slugOfPath(String.raw`C:\Users\MR\claude-code-workspace`),
    "C--Users-MR-claude-code-workspace",
  );
  assert.strictEqual(
    slugOfPath(String.raw`C:\Storage\work\EL-Ruoyi`),
    "C--Storage-work-EL-Ruoyi",
  );
});

test("analyzeProjects: 同一项目换了盘符 → remap，并给出可用的 --map 片段", () => {
  const { analyzeProjects } = require("./restore-tools.cjs");
  const root = path.join(HOME, "slug-root");
  fs.mkdirSync(path.join(root, ".claude", "projects", "D--Development-proj"), { recursive: true });
  fs.writeFileSync(
    path.join(root, ".claude", "settings.json"),
    JSON.stringify({ gui: { workspaces: [String.raw`D:\Development\proj`] } }),
  );
  const mf = {
    items: [
      { relPath: "claude/projects/C--Storage-proj/abc.jsonl", category: "claude-sessions", size: 10 },
      { relPath: "claude/projects/C--Storage-proj/memory/MEMORY.md", category: "claude-memory", size: 5 },
    ],
  };
  const r = analyzeProjects(mf, root);
  const p = r.projects.find((x) => x.packageSlug === "C--Storage-proj");
  assert.strictEqual(p.action, "remap");
  assert.strictEqual(p.localSlug, "D--Development-proj");
  // mapArg 的目标是基于 destRoot 拼的（真实运行时 destRoot 就是家目录）
  assert.ok(
    r.summary.mapArg.includes("~/.claude/projects/C--Storage-proj=") &&
      r.summary.mapArg.includes("D--Development-proj"),
    `--map 片段要能直接用，实际：${r.summary.mapArg}`,
  );
});

test("analyzeProjects: 本机和 GUI 都没有该项目 → absent + recommendSkip", () => {
  const { analyzeProjects } = require("./restore-tools.cjs");
  const root = path.join(HOME, "slug-root2");
  fs.mkdirSync(path.join(root, ".claude", "projects"), { recursive: true });
  fs.writeFileSync(path.join(root, ".claude", "settings.json"), JSON.stringify({ gui: { workspaces: [] } }));
  const mf = {
    items: [{ relPath: "claude/projects/C--Storage-gone/x.jsonl", category: "claude-sessions", size: 1 }],
  };
  const r = analyzeProjects(mf, root);
  const p = r.projects[0];
  assert.strictEqual(p.action, "absent");
  assert.strictEqual(p.recommendSkip, true, "本机没有的项目默认不恢复 —— 恢复了也没地方用");
  assert.strictEqual(r.summary.recommendSkip, 1);
});

test("analyzeProjects: GUI 里有该项目但会话目录没建 → absent 但不劝退", () => {
  const { analyzeProjects } = require("./restore-tools.cjs");
  const root = path.join(HOME, "slug-root3");
  fs.mkdirSync(path.join(root, ".claude", "projects"), { recursive: true });
  fs.writeFileSync(
    path.join(root, ".claude", "settings.json"),
    JSON.stringify({ gui: { workspaces: [String.raw`D:\Development\live`] } }),
  );
  const mf = { items: [{ relPath: "claude/projects/C--Storage-live/x.jsonl", category: "claude-sessions", size: 1 }] };
  const r = analyzeProjects(mf, root);
  const p = r.projects[0];
  assert.strictEqual(p.action, "absent");
  assert.strictEqual(p.recommendSkip, false, "工作区还在 → 只是会话没建，值得恢复");
  assert.ok(p.guiWorkspacePath);
});

test("analyzeProjects: 多个同名候选 → ambiguous，不替用户选", () => {
  const { analyzeProjects } = require("./restore-tools.cjs");
  const root = path.join(HOME, "slug-root4");
  fs.mkdirSync(path.join(root, ".claude", "projects", "C--Users-A-proj"), { recursive: true });
  fs.mkdirSync(path.join(root, ".claude", "projects", "C--Users-B-proj"), { recursive: true });
  fs.writeFileSync(
    path.join(root, ".claude", "settings.json"),
    JSON.stringify({
      gui: { workspaces: [String.raw`C:\Users\A\proj`, String.raw`C:\Users\B\proj`] },
    }),
  );
  const mf = { items: [{ relPath: "claude/projects/C--Storage-proj/x.jsonl", category: "claude-sessions", size: 1 }] };
  const r = analyzeProjects(mf, root);
  assert.strictEqual(r.projects[0].action, "ambiguous");
  assert.strictEqual(r.projects[0].candidates.length, 2);
});
