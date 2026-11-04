// ── deliver：GUI 的「交付」工具契约 ──
//
// 这是 AI 把「这次改了什么 / 生成了什么」显式交给用户看的通道。它**不改任何文件**，
// 只产出一条消息卡片；卡片里的每一项都能点开（走 openReference 的预览/编辑器/
// 资源管理器分流）。
//
// 为什么不复用 @ref 语法让模型自己往正文里塞链接：
//   · 正文里散落的链接没有「新增/修改/删除」语义，用户看不出这轮到底动了什么
//   · 模型得记住语法细节，漏一个字符整条链接就失效
//   工具的结构化入参能强制它把每一笔记清楚。
//
// ## 为什么这份规格单独一个文件
//
// 卡片的渲染（DeliverCard）、MCP 工具定义（mcpBridge）、入参归一化都要用同一份
// 规则。三处各写一份的话，改了一处另外两处就会漂 —— 这个仓库的 itemTypeSpecs
// 就是为同一个原因抽出来的（见其文件头注释）。
//
// ## v1 只收文件
//
// note / desktop-item 的跳转 openReference 已经支持，但先把文件这条路径跑稳
// （路径解析、预览回退、删除态）再放开，避免一开始就背上一堆边界。

import type { ReferenceType } from "../types/reference";

/** 交付项的动作。默认 `modified` —— 既不谎称"新建"，也不谎称"删除"。 */
export type DeliverAction = "created" | "modified" | "deleted";

/** 一件被交付的东西。v1 只有文件，所以 `type` 恒为 `file`。 */
export interface DeliverItem {
  type: ReferenceType;
  path: string;
  action: DeliverAction;
  label?: string;
  note?: string;
}

export interface DeliverPayload {
  summary?: string;
  items: DeliverItem[];
  /** 被丢弃的条目数（缺 path 之类的脏数据）。>0 时卡片给出提示，不静默吞掉。 */
  dropped: number;
}

const ACTIONS: readonly DeliverAction[] = ["created", "modified", "deleted"];

/** MCP 工具注册名（mcpBridge 的 tools/list 与 dispatch 都用它）。 */
export const DELIVER_TOOL_NAME = "deliver";

/**
 * 工具定义（description + inputSchema + `_meta`）。
 *
 * `_meta['anthropic/alwaysLoad']` 是**必需的**，不是装饰：
 * `src/tools/ToolSearchTool/prompt.ts` 的 isDeferredTool() 第一条规则就是
 * 「MCP 工具一律 deferred」，模型得先调一次 ToolSearch 才知道有这个工具。
 * 交付是回合收尾时的主动动作，藏在一轮检索后面基本等于不会发生。
 * `src/services/mcp/client.ts` 会把这条 _meta 翻成 tool.alwaysLoad=true，
 * 那条规则的第一步就提前放行。
 */
export const DELIVER_TOOL_DEF = {
  name: DELIVER_TOOL_NAME,
  description:
    "Hand off finished work to the user: list the files you created, modified or deleted this turn so they appear as a clickable delivery card in the chat. " +
    "Use it once at the END of a turn that produced or changed files — not for files you merely read. " +
    "Clicking an item opens it in the GUI (preview for images/PDF, editor for text); items that can't be opened fall back to the file explorer. " +
    "Relative paths resolve against the workspace root. Do not also paste the paths into your reply — the card already shows them.",
  inputSchema: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description:
          "One short sentence describing this delivery (e.g. \"登录流程改完了\"). Shown as the card title.",
      },
      items: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description:
                "File path, absolute or relative to the workspace root. Required.",
            },
            action: {
              type: "string",
              enum: ACTIONS as unknown as string[],
              description:
                "created = newly written; modified = existing file changed; deleted = removed. Defaults to modified.",
            },
            label: {
              type: "string",
              description:
                "Optional display name. Defaults to the file name.",
            },
            note: {
              type: "string",
              description:
                "Optional one-line note about what changed in this file.",
            },
          },
          required: ["path"],
        },
      },
    },
    required: ["items"],
  },
  _meta: { "anthropic/alwaysLoad": true },
} as const;

/**
 * 判断一个工具名是不是 deliver。
 *
 * 不能只比 `=== "deliver"`：MCP 工具发给模型的名字是 `mcp__<server>__deliver`
 * （`buildMcpToolName`），服务器名随用户改名而变；而
 * `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` 模式下又是不带前缀的裸名。两种都要认。
 */
export function isDeliverTool(name: string): boolean {
  return name === DELIVER_TOOL_NAME || name.endsWith(`__${DELIVER_TOOL_NAME}`);
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
}

/**
 * 归一化模型给的行参 —— **容忍流式半截 JSON**。
 *
 * 卡片是边流边渲染的（chatReduce 的 partial_json 每来一片就 JSON.parse 一次），
 * 所以 items 里常常出现 `{path: "src/a"` 这样的残缺对象。这里只做"能认出来的
 * 就收下，认不出的丢掉并计数"，绝不抛异常 —— 抛了整张卡片就白了。
 */
export function normalizeDeliverInput(input: unknown): DeliverPayload {
  const raw = (input ?? {}) as Record<string, unknown>;
  const rawItems = Array.isArray(raw.items) ? raw.items : [];
  const items: DeliverItem[] = [];
  let dropped = 0;

  for (const entry of rawItems) {
    const obj = entry as Record<string, unknown> | null;
    const path = asString(obj?.path);
    if (!path) {
      // 流式中还没解析出 path 的条目 —— 不算脏数据，不计入 dropped
      if (obj && Object.keys(obj).length > 0) dropped++;
      continue;
    }
    const action = obj?.action as DeliverAction;
    items.push({
      type: "file",
      path,
      action: ACTIONS.includes(action) ? action : "modified",
      ...(asString(obj?.label) ? { label: asString(obj?.label) } : {}),
      ...(asString(obj?.note) ? { note: asString(obj?.note) } : {}),
    });
  }

  return {
    ...(asString(raw.summary) ? { summary: asString(raw.summary) } : {}),
    items,
    dropped,
  };
}

/** 条目在卡片上显示的名字：优先 label，其次文件名（两种分隔符都切）。 */
export function deliverItemLabel(item: DeliverItem): string {
  return item.label || item.path.split(/[/\\]/).pop() || item.path;
}
