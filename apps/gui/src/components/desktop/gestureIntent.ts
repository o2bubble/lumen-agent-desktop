// 画布上「按下鼠标」到底想干什么。
//
// 从 SuperDesktopCanvas 的 handleMouseDown 抽出来的：那段近百行的回调，
// 实质是**判断意图**——点到哪儿、按了什么键、当前有没有选区——然后分派给
// 五种完全不同的手势。判断和动作混在一个函数里，于是每加一种手势就要
// 在中间插一段，还得小心别破坏前面的分支顺序。
//
// 抽成纯函数后：判断可以直接喂数据验证（顺序、优先级、边界都测得到），
// 组件里只剩「按意图分派」的接线。

import type { ConnectionAnchor } from "../../types/desktop";

/** 一个手势的意图。`null` 表示这次按下不做任何事（交给浏览器默认行为）。 */
export type GestureIntent =
  /** 平移画布：空格+左键，或中键 */
  | { kind: "pan" }
  /** 从某个 item 的锚点拉一条连线 */
  | { kind: "connect"; itemId: string; side: AnchorSide; }
  /** 拖动多选中的一批 item */
  | { kind: "multi-drag"; itemIds: string[] }
  /** 点在某个 item 上，但不需要画布介入 —— 让 item 自己处理 */
  | { kind: "item-owned" }
  /** 空白处拖动 → 框选 */
  | { kind: "box-select" };

// 复用 ConnectionAnchor 的 side 定义，**不要自己再写一遍** ——
// 它包含 "center"（画布本身只渲染四边锚点，但 center 用于连线终点计算）。
// 自己复制一份字面量联合，加新锚点时这里会悄悄漏掉。
export type AnchorSide = ConnectionAnchor["side"];

/** 判断时需要的全部信息 —— 都是从事件和 DOM 上读得到的事实。 */
export interface GestureInput {
  button: number;
  /** 空格键是否按住 */
  spaceHeld: boolean;
  /** 命中的锚点（`[data-anchor]`），没有则 null */
  anchor: { itemId: string; side: AnchorSide } | null;
  /** 命中的 item id（`[data-desktop-item]`），没有则 null */
  itemId: string | null;
  /** 命中画布工具栏（`[data-canvas-toolbar]`） */
  onToolbar: boolean;
  /** 当前选中的 item id */
  selectedIds: ReadonlySet<string>;
  /** 这几个 id 里，有多少是真实存在于桌面上的 */
  existingItemCount: number;
}

/**
 * 判定这次按下要做什么。
 *
 * **顺序是有意义的** —— 越靠前的判断优先级越高：
 *
 *   1. 空格/中键 → 平移。最高优先：用户在"准备挪画布"时，
 *      不该因为手底下正好有个 item 就变成拖它。
 *   2. 非左键 → 不做（右键菜单是另一个事件）
 *   3. 锚点 → 连线。锚点通常在 item 边缘，必须先于"点到 item"判断，
 *      否则永远连不上线。
 *   4. item（且在多选中）→ 批量拖动
 *   5. item → 交给 item 自己
 *   6. 工具栏 → 不做
 *   7. 其余 → 框选
 */
export function resolveGesture(input: GestureInput): GestureIntent | null {
  // ① 平移：空格+左键，或任意中键
  if ((input.spaceHeld && input.button === 0) || input.button === 1) {
    return { kind: "pan" };
  }

  // ② 只处理左键
  if (input.button !== 0) return null;

  // ③ 锚点 → 连线（必须先于 item 判断：锚点就在 item 内部）
  if (input.anchor) {
    return { kind: "connect", itemId: input.anchor.itemId, side: input.anchor.side };
  }

  // ④ item 在多选里 → 批量拖动
  //
  // 要求「至少两个真实存在的 item」：选中集合可能包含已被删掉的 id，
  // 只剩一个能拖的话，不如让 item 自己走单拖路径（行为更自然）。
  if (input.itemId && input.selectedIds.has(input.itemId) && input.existingItemCount >= 2) {
    return { kind: "multi-drag", itemIds: [...input.selectedIds] };
  }

  // ⑤ 单个 item → 交给它自己
  if (input.itemId) return { kind: "item-owned" };

  // ⑥ 工具栏上的点击不画框
  if (input.onToolbar) return null;

  // ⑦ 空白处 → 框选
  return { kind: "box-select" };
}

/**
 * 从 DOM 事件目标上读锚点信息。
 *
 * 单独拎出来是为了让 `resolveGesture` 保持纯数据输入 —— DOM 遍历放在边缘，
 * 判断逻辑就能脱离 DOM 测试。
 */
export function readAnchor(el: Element | null): { itemId: string; side: AnchorSide } | null {
  if (!el) return null;
  const anchor = el.closest("[data-anchor]");
  if (!anchor) return null;
  const itemEl = anchor.closest("[data-desktop-item]");
  if (!itemEl) return null;
  const itemId = itemEl.getAttribute("data-desktop-item");
  const side = anchor.getAttribute("data-anchor");
  if (!itemId || !side) return null;
  return { itemId, side: side as AnchorSide };
}

/** 距离最近的 item id，没有则 null。 */
export function readItemId(el: Element | null): string | null {
  if (!el) return null;
  return el.closest("[data-desktop-item]")?.getAttribute("data-desktop-item") ?? null;
}
