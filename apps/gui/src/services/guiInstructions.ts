// ── GUI 侧注入给模型的常驻指令 ──
//
// ## 走的是哪条通道
//
// 通过 MCP 协议 `initialize` 响应的 `instructions` 字段。claude 侧把它存进
// 连接对象（`src/services/mcp/client.ts` 的 `client.getInstructions()`），
// 最终由 `src/constants/prompts.ts` 的 `getMcpInstructions()` 渲染成一个
// 「# MCP Server Instructions」段落，**进的是系统提示词**，不是 CLAUDE.md、
// 也不是 attachment，权重和位置都最接近我们想要的效果。
//
// ## 为什么不用另外两种
//
// · `append-system-prompt`：要 GUI 去改后端 spawn 参数，而且**不分场景常驻**
//   —— CLI 用不上 GUI 的规则，反过来也一样。
// · 改 `src/constants/prompts.ts` 加一个 section：要重编 claude.exe，并且会把
//   GUI 专属指令塞给所有 CLI 用户。这个仓库为 super-desktop 已经明确拒绝过
//   这种做法（见 `gui/src/services/builtinSkills/superDesktopSkill.ts` 注释）。
//
// MCP instructions 天生按「这个 server 连没连上」作用域 —— 只有 GUI 进程在跑
// 才有这段，纯 CLI 天然拿不到，正好。
//
// ## 以后要加东西往哪加
//
// 往 `BASE_INSTRUCTIONS` 里加小节。硬上限是 claude 侧的
// `MAX_MCP_DESCRIPTION_LENGTH` = 2048 字符（`src/services/mcp/client.ts`），
// 超了会被截断并打日志。目前占用约 1/3，留有余量。
//
// ⚠️ 别和 `src/utils/messages.ts` 的 `gui_context` attachment 重复：那段讲的是
// 「去读哪些文档」，这里讲的是「必须怎么做」。两边都写同一件事，改了必然漂移。

/** claude 侧对 MCP instructions 的硬截断长度，与服务端常量保持一致。 */
export const MAX_INSTRUCTIONS_CHARS = 2048;

const BASE_INSTRUCTIONS = `This MCP server is the Claude Code GUI desktop client. The user works in a
graphical app with panels (chat, editor, files, terminal, Super Desktop, notes,
sub-agents), not a terminal. Tool calls and thinking are not reliably visible to
them — your text output is.

## Delivering work

When a turn creates, modifies, or deletes files, call \`deliver\` once before your
final reply: pass every file with its action (created/modified/deleted) and a
one-line note. It renders as a clickable card the user can open in the editor,
preview, or file explorer.

Don't paste the same paths into your reply afterwards — the card already lists
them. Reading a file is not a delivery.

Use it for finished work, not for intermediate edits you are still making.`;

/**
 * 生成 `initialize` 响应里的 instructions 字符串。
 *
 * 导出成函数而不是常量：将来要按环境/设置动态拼装（比如只在某个面板开着时
 * 才提示某项能力）时，调用点不用改。
 */
export function buildGuiInstructions(): string {
  const text = BASE_INSTRUCTIONS;
  if (text.length <= MAX_INSTRUCTIONS_CHARS) return text;
  return text.slice(0, MAX_INSTRUCTIONS_CHARS - 20) + '… [truncated]';
}
