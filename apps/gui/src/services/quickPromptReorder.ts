// ── 快捷提示排序（纯函数，可单测）──
//
// 列表顺序就是数组顺序，重排 = 把某个元素挪到另一个位置再存回去。
// 抽成纯函数是因为「插到目标前面还是后面」最容易写错一位 ——
// 从前往后拖动时，移除元素会让目标下标前移，很多实现会因此差一格。

export type DropPosition = "before" | "after";

/**
 * 把 `fromIndex` 的元素移动到 `toIndex`（移动后它在 toIndex 位置）。
 *
 * 越界/无意义的调用原样返回，不抛错 —— 拖拽过程中各种边界都会出现。
 */
export function moveItem<T>(list: readonly T[], fromIndex: number, toIndex: number): T[] {
  const n = list.length;
  if (fromIndex < 0 || fromIndex >= n) return [...list];
  const clampedTo = Math.max(0, Math.min(n - 1, toIndex));
  if (fromIndex === clampedTo) return [...list];

  const out = [...list];
  const [moved] = out.splice(fromIndex, 1);
  out.splice(clampedTo, 0, moved);
  return out;
}

/**
 * 算出「放下之后它应该排第几」。
 *
 * @param byId 当前列表
 * @param dragId 正在拖的元素
 * @param targetId 悬停的目标元素
 * @param position 落在目标的上半（before）还是下半（after）
 */
export function computeDropIndex<T extends { id: string }>(
  byId: readonly T[],
  dragId: string,
  targetId: string,
  position: DropPosition,
): number {
  const from = byId.findIndex((x) => x.id === dragId);
  const target = byId.findIndex((x) => x.id === targetId);
  if (from < 0 || target < 0) return -1;
  if (from === target) return -1;

  // 目标位置在"移除自己之后"的坐标系里：
  // 往前拖（from < target）时，自己先被摘走，目标前移一位。
  const insertAt = position === "before" ? target : target + 1;
  return from < insertAt ? insertAt - 1 : insertAt;
}

/** 一步上移/下移（右键菜单用）。到边界返回 -1。 */
export function neighborIndex(
  length: number,
  index: number,
  direction: "up" | "down",
): number {
  if (index < 0 || index >= length) return -1;
  const next = direction === "up" ? index - 1 : index + 1;
  return next < 0 || next >= length ? -1 : next;
}
