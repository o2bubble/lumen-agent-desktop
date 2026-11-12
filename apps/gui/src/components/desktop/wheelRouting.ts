// ── 滚轮该给谁：内容内部缩放 / 块内滚动 / 画布缩放 ──
//
// 与 useContentZoom 的分工（画布侧在 SuperDesktopCanvas 调用本模块）：
//   Ctrl/Cmd + 滚轮、且目标在 [data-wheel-zoom] 内 → 内容内部缩放（图片/图形）
//   目标处在**还能朝这个方向滚**的容器里          → 滚动它
//   其余                                          → 缩放画布
//
// 第三条曾经是「目标处在任意可滚动容器里就让路」—— 只看「能不能滚」不看
// 「这一下滚不滚得动」。后果是滚到顶/底之后事件被吞掉，既不再滚动也不缩放；
// 块一多、铺满视口，整块画布就成了缩放死区（用户："填充的 block 多了后缩放就失效了"）。
// 现在按浏览器原生的 scroll-chaining 语义：滚到头就把事件还给画布。

export interface ScrollableBox {
  overflowX: string;
  overflowY: string;
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}

export type WheelRoute = "content-zoom" | "scroll" | "canvas-zoom";

/** 亚像素容差：scrollHeight/clientHeight 是取整值，缩放后的布局差 1px 很常见。 */
const EPS = 1;

/**
 * 一个容器至少要还能滚这么多像素，才值得把滚轮让给它。
 *
 * 为什么需要（2026-11-12，用户第二次报「block 多了缩放又失效」）：
 * `DesktopItemView` 的内容包装层是 `overflow:auto`，布局取整后常常带
 * **几像素的幽灵溢出**（实测 232 vs 224 → 8px）。按「能滚就让路」的规则，
 * 这几像素会吃掉**一整个滚轮刻度** —— 100px 的 delta 里只消费 8px，
 * 剩下 92px 没有任何人消费，画布也没收到。
 *
 * 单独一个块不明显；但块铺满视口后，每次滚轮都落在新的块上、被它那几像素
 * 吃掉 —— 用户体感就是「缩放彻底失效」。
 *
 * 24 的取值：明显大于取整误差（通常 < 10px），又远小于一个滚轮刻度，
 * 真能滚的容器不会被误判成「已经到头」。
 */
const MIN_CONSUMABLE_PX = 24;

function canScrollY(b: ScrollableBox): boolean {
  return (b.overflowY === "auto" || b.overflowY === "scroll") && b.scrollHeight > b.clientHeight + EPS;
}

function canScrollX(b: ScrollableBox): boolean {
  return (b.overflowX === "auto" || b.overflowX === "scroll") && b.scrollWidth > b.clientWidth + EPS;
}

/** 这个容器在当前滚动位置还能否**有意义地**消费该方向的位移。 */
function consumes(b: ScrollableBox, deltaX: number, deltaY: number): boolean {
  if (deltaY < 0 && canScrollY(b) && b.scrollTop >= MIN_CONSUMABLE_PX) return true;
  if (deltaY > 0 && canScrollY(b) && b.scrollHeight - b.clientHeight - b.scrollTop >= MIN_CONSUMABLE_PX) return true;
  if (deltaX < 0 && canScrollX(b) && b.scrollLeft >= MIN_CONSUMABLE_PX) return true;
  if (deltaX > 0 && canScrollX(b) && b.scrollWidth - b.clientWidth - b.scrollLeft >= MIN_CONSUMABLE_PX) return true;
  return false;
}

/**
 * @param chain 从事件目标向上的祖先链（**不含画布容器本身**），由近及远。
 */
export function decideWheelRoute(opts: {
  ctrlKey: boolean;
  metaKey: boolean;
  deltaX: number;
  deltaY: number;
  /** 目标在 [data-wheel-zoom] 内（图片/图形的内容缩放区） */
  overContentZoom: boolean;
  chain: readonly ScrollableBox[];
}): WheelRoute {
  if ((opts.ctrlKey || opts.metaKey) && opts.overContentZoom) return "content-zoom";
  for (const box of opts.chain) {
    if (consumes(box, opts.deltaX, opts.deltaY)) return "scroll";
  }
  return "canvas-zoom";
}
