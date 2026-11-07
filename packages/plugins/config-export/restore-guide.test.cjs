// ── 恢复侧：AI 全程参与的评估框架 ──
//
// 用户的要求：「恢复不是通过单纯的固定模式恢复，需要 AI 全程参与去评估恢复的方案」。
// 这些断言锁住"框架里必须出现的告诫"，防止以后被精简掉。

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const HOME = fs.mkdtempSync(path.join(os.tmpdir(), "cfg-rg-"));
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
test.before(() => {
  w(path.join(CLAUDE, "CLAUDE.md"), "# 指令\n");
  w(path.join(CLAUDE, "projects/x/abc.jsonl"), '{"uuid":"u1"}\n');
  w(path.join(HOME, "scheme/00_迁移总览.md"), "# 方案\n");
});
test.after(() => fs.rmSync(HOME, { recursive: true, force: true }));

function guideOf(out) {
  return execFileSync("tar", ["--force-local", "-xzf", out, "-O", "./IMPORT_GUIDE.md"], { encoding: "utf8" });
}

test("恢复前必须先评估新机器现状（第 0 步）", async () => {
  const out = path.join(HOME, "a.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("第 0 步：先评估新机器现状"), "必须有评估现状这一步");
  assert.ok(g.includes("恢复不是「解压了就完事」"), "必须点明不是机械解压");
  assert.ok(g.includes("别猜"), "必须要求实地查而不是猜");
  assert.ok(g.includes("用户点头后再动手"), "必须要求用户确认方案");
});

test("冲突处理按内容类型给出方向（不是一条规则套全部）", async () => {
  const out = path.join(HOME, "b.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("**会话 `.jsonl`**"), "应覆盖会话");
  assert.ok(g.includes("**`settings.json`**"), "应覆盖设置");
  assert.ok(g.includes("记忆 `memory/`"), "应覆盖记忆");
  assert.ok(g.includes("`data.db`"), "应覆盖桌面数据库");
  assert.ok(g.includes("**不要用一条规则套全部**"), "必须强调差异化");
});

test("overwrite 不等于闭眼覆盖", async () => {
  const out = path.join(HOME, "c.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("没有自动合并的语义"), "应说明 overwrite 的真实含义");
  assert.ok(g.includes("不是「闭眼覆盖」"), "必须警告不要直接覆盖");
  assert.ok(g.includes("先问用户"), "目标已存在时应先问");
});

test("破坏性操作前要备份现状", async () => {
  const out = path.join(HOME, "d.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("先备份现状"), "必须先备份");
  assert.ok(g.includes("逐步执行"), "必须逐步、可回退");
  assert.ok(g.includes("不要一次性"), "禁止一次性整目录拷贝");
});

test("自定义项：明确「完全靠 AI 驱动，没有固定模式」", async () => {
  const out = path.join(HOME, "e.tar.gz");
  await m.doExport({
    categories: ["claude-md"], outputPath: out,
    customItems: [{ path: path.join(HOME, "scheme"), label: "我的方案", entryDoc: "00_迁移总览.md" }],
  });
  const g = guideOf(out);

  assert.ok(g.includes("完全靠你驱动"), "必须点明没有固定模式");
  assert.ok(g.includes("摸清新机器现状"), "必须要求先评估");
  assert.ok(g.includes("制定方案"), "必须要求先出方案");
});

test("自定义项：文档可能在新机器上跑不了（硬编码路径/依赖/顺序）", async () => {
  const out = path.join(HOME, "f.tar.gz");
  await m.doExport({
    categories: ["claude-md"], outputPath: out,
    customItems: [{ path: path.join(HOME, "scheme"), label: "我的方案", entryDoc: "00_迁移总览.md" }],
  });
  const g = guideOf(out);

  assert.ok(g.includes("用户文档 ≠ 一定能执行"), "必须提醒文档不一定可执行");
  assert.ok(g.includes("硬编码路径"), "应指出硬编码路径问题");
  assert.ok(g.includes("需要 GUI 手动操作"), "应指出 GUI 步骤 AI 做不了");
  assert.ok(g.includes("如实告诉用户"), "做不到要如实说");
  assert.ok(g.includes("不要自己发明一个替代方案"), "禁止自行发明方案");
});

test("会话冲突：给出按 uuid 合并的具体做法", async () => {
  const out = path.join(HOME, "g.tar.gz");
  await m.doExport({ categories: ["claude-sessions"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("会话（`.jsonl`）冲突怎么合并"), "应有会话合并专章");
  assert.ok(g.includes("按 uuid 去重合并"), "应给出 uuid 合并法");
  assert.ok(g.includes("同一个 uuid 但**内容不同**"), "应识别真冲突");
  assert.ok(g.includes("**问用户**"), "真冲突要问用户");
  assert.ok(g.includes("合并前把两个原文件都备份"), "合并前必须备份");
});

test("会话冲突：明确禁止的错误做法", async () => {
  const out = path.join(HOME, "h.tar.gz");
  await m.doExport({ categories: ["claude-sessions"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("❌ 直接覆盖（丢进度）"), "禁止直接覆盖");
  assert.ok(g.includes("❌ 简单追加"), "禁止简单追加");
  assert.ok(g.includes("❌ 按行数「取长的那个」"), "禁止按长度取舍");
  assert.ok(g.includes("分叉"), "应说明可能分叉而非包含");
});

test("没有会话分类时不出现会话合并章节（避免噪音）", async () => {
  const out = path.join(HOME, "i.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);
  assert.ok(!g.includes("冲突怎么合并"), "没导会话就不该有这章");
});

// ── 2026-11-07：措辞降硬 + 工具说明不能缺席 + 收尾清理 ──

test("文档是参考不是教条：明确说 AI 可按实际情况调整", async () => {
  const out = path.join(HOME, "j.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("都是**参考**"), "必须说明文档与脚本是参考实现");
  assert.ok(g.includes("你的判断优先于本文档"), "必须把判断权交给恢复端 AI");
  assert.ok(/restore\.target.*本身就是错的/.test(g), "要允许推翻清单里的错误目标");
  assert.ok(g.includes("唯一的硬要求"), "要划出唯一的硬边界（破坏性操作先备份先问）");
});

test("没有自定义项时，工具说明和恢复率口径仍然出现", async () => {
  const out = path.join(HOME, "k.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(!g.includes("自定义项："), "这个包里没有自定义项");
  assert.ok(g.includes("包内自带工具"), "工具说明必须无条件出现");
  assert.ok(g.includes("自动验证通过率"), "恢复率口径必须无条件出现");
  assert.ok(g.includes("第 3 步：验证与报告"), "验证步骤必须无条件出现");
});

test("提示命令耗时与路径映射陷阱", async () => {
  const out = path.join(HOME, "l.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("哪些命令慢"), "要提示耗时");
  assert.ok(g.includes("tar.gz 顺序流"), "要解释为什么慢");
  assert.ok(g.includes("别继续等"), "要教 AI 别干等");
  assert.ok(g.includes("旧版脚本"), "要点明分钟级通常是 bug 而非包大");
  assert.ok(g.includes("不要**用 `sleep`"), "禁止 sleep 轮询卡住的任务");
  assert.ok(g.includes("导出机 ≠ 这台机器"), "要点明路径未必匹配");
  assert.ok(g.includes("--map"), "要给出重映射手段");
  assert.ok(g.includes("别急着说「恢复失败」"), "路径对不上不等于恢复失败");
});

test("收尾要问用户是否清理临时文件", async () => {
  const out = path.join(HOME, "m.tar.gz");
  await m.doExport({ categories: ["claude-md"], outputPath: out });
  const g = guideOf(out);

  assert.ok(g.includes("要不要清理临时文件"), "必须提醒询问清理");
  assert.ok(g.includes("备份副本不要和临时文件一起删"), "备份副本不能和临时文件混为一谈");
});
