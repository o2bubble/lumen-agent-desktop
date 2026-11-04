// 滚轮路由的回归测试。
//
// 用户反馈：「超级桌面填充的 block 多了后，键鼠操作缩放就失效了，但工具栏的缩放按钮还有效」。
// 根因：旧规则「祖先里有可滚动容器就让路」不看方向与是否已到头 —— 滚到顶/底后
// 事件被吞，既不再滚动也不缩放。块铺满视口后整块画布成了缩放死区。
//
// 这几条锁定的是「滚不动时必须还给画布」。

import { describe, expect, it } from "vitest";
import { decideWheelRoute, type ScrollableBox } from "./wheelRouting";

function box(o: Partial<ScrollableBox> = {}): ScrollableBox {
  return {
    overflowX: "visible",
    overflowY: "visible",
    scrollTop: 0,
    scrollHeight: 100,
    clientHeight: 100,
    scrollLeft: 0,
    scrollWidth: 100,
    clientWidth: 100,
    ...o,
  };
}

const route = (o: {
  dy?: number;
  dx?: number;
  ctrl?: boolean;
  overContentZoom?: boolean;
  chain?: ScrollableBox[];
}) =>
  decideWheelRoute({
    ctrlKey: o.ctrl ?? false,
    metaKey: false,
    deltaX: o.dx ?? 0,
    deltaY: o.dy ?? 0,
    overContentZoom: o.overContentZoom ?? false,
    chain: o.chain ?? [],
  });

/** 一个纵向可滚、当前停在 top 的块内容容器。 */
const atTop = box({ overflowY: "auto", scrollHeight: 300, clientHeight: 200, scrollTop: 0 });
/** 同上，停在中间。 */
const atMid = box({ overflowY: "auto", scrollHeight: 300, clientHeight: 200, scrollTop: 50 });
/** 同上，停到底。 */
const atBottom = box({ overflowY: "auto", scrollHeight: 300, clientHeight: 200, scrollTop: 100 });

describe("滚到尽头要把滚轮还给画布", () => {
  it("块内已到顶，继续往上滚 → 缩放画布（原来会被吞掉）", () => {
    expect(route({ dy: -120, chain: [atTop] })).toBe("canvas-zoom");
  });

  it("块内已到底，继续往下滚 → 缩放画布", () => {
    expect(route({ dy: 120, chain: [atBottom] })).toBe("canvas-zoom");
  });

  it("块内在顶部往下滚 → 滚动内容", () => {
    expect(route({ dy: 120, chain: [atTop] })).toBe("scroll");
  });

  it("块内在底部往上滚 → 滚动内容", () => {
    expect(route({ dy: -120, chain: [atBottom] })).toBe("scroll");
  });

  it("块内在中间，两个方向都滚 → 滚动内容", () => {
    expect(route({ dy: 120, chain: [atMid] })).toBe("scroll");
    expect(route({ dy: -120, chain: [atMid] })).toBe("scroll");
  });
});

describe("横向滚动独立判定", () => {
  const wide = box({
    overflowX: "auto",
    scrollWidth: 400,
    clientWidth: 200,
    scrollLeft: 0,
    overflowY: "auto",
    scrollHeight: 300,
    clientHeight: 200,
    scrollTop: 100, // 纵向已到底
  });

  it("纵向到底但横向还能滚，横向滚轮 → 滚动内容", () => {
    expect(route({ dx: 120, dy: 0, chain: [wide] })).toBe("scroll");
  });

  it("纵向到底、横向也在最左，继续往下滚 → 缩放画布", () => {
    expect(route({ dy: 120, chain: [wide] })).toBe("canvas-zoom");
  });

  it("纵向到底时往上滚 → 仍滚动内容（回滚）", () => {
    expect(route({ dy: -120, chain: [wide] })).toBe("scroll");
  });

  it("横向在最左还继续往左滚 → 缩放画布", () => {
    expect(route({ dx: -120, chain: [wide] })).toBe("canvas-zoom");
  });
});

describe("只看真正能消费的容器", () => {
  it("内层不可滚的 auto 包装（内容刚好装下）跳过，由外层接管", () => {
    const notOverflowing = box({ overflowY: "auto", scrollHeight: 200, clientHeight: 200 });
    expect(route({ dy: 120, chain: [notOverflowing, atTop] })).toBe("scroll");
  });

  it("所有容器都滚不动 → 缩放画布", () => {
    const a = box({ overflowY: "auto", scrollHeight: 200, clientHeight: 200 });
    const b = box({ overflowY: "hidden", scrollHeight: 900, clientHeight: 200 });
    expect(route({ dy: 120, chain: [a, b] })).toBe("canvas-zoom");
  });

  it("没有可滚动祖先 → 缩放画布", () => {
    expect(route({ dy: 120, chain: [] })).toBe("canvas-zoom");
  });
});

describe("内容内部缩放优先", () => {
  it("Ctrl + 滚轮、目标在 data-wheel-zoom 内 → 内容缩放", () => {
    expect(route({ dy: 120, ctrl: true, overContentZoom: true, chain: [atMid] })).toBe("content-zoom");
  });

  it("裸滚轮悬停在图片上 → 仍然缩放画布（图片本身不可滚）", () => {
    expect(route({ dy: 120, overContentZoom: true, chain: [] })).toBe("canvas-zoom");
  });

  it("Ctrl + 滚轮但目标不在 data-wheel-zoom 内 → 缩放画布", () => {
    expect(route({ dy: 120, ctrl: true, overContentZoom: false, chain: [] })).toBe("canvas-zoom");
  });
});
