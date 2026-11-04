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

function canScrollY(b: ScrollableBox): boolean {
  return (b.overflowY === "auto" || b.overflowY === "scroll") && b.scrollHeight > b.clientHeight + EPS;
}

function canScrollX(b: ScrollableBox): boolean {
  return (b.overflowX === "auto" || b.overflowX === "scroll") && b.scrollWidth > b.clientWidth + EPS;
}

/** 这个容器在当前滚动位置还能否消费该方向的位移。 */
function consumes(b: ScrollableBox, deltaX: number, deltaY: number): boolean {
  if (deltaY < 0 && canScrollY(b) && b.scrollTop > EPS) return true;
  if (deltaY > 0 && canScrollY(b) && b.scrollTop + b.clientHeight < b.scrollHeight - EPS) return true;
  if (deltaX < 0 && canScrollX(b) && b.scrollLeft > EPS) return true;
  if (deltaX > 0 && canScrollX(b) && b.scrollLeft + b.clientWidth < b.scrollWidth - EPS) return true;
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
