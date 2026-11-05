// 快捷提示排序 —— 用户要「把常用的调到前面」。
//
// 锁住的重排语义：拖到目标**上半**=插到它前面，**下半**=插到它后面。
// 往后拖时最容易差一格（移除自己后目标下标前移），这里专门覆盖。

import { describe, expect, it } from "vitest";
import { computeDropIndex, moveItem, neighborIndex } from "./quickPromptReorder";

const list = ["a", "b", "c", "d"];

describe("moveItem", () => {
  it("往后移：a 放到 c 的位置", () => {
    expect(moveItem(list, 0, 2)).toEqual(["b", "c", "a", "d"]);
  });

  it("往前移：d 放到 a 的位置", () => {
    expect(moveItem(list, 3, 0)).toEqual(["d", "a", "b", "c"]);
  });

  it("原地不动 → 内容相同的新数组（不共享引用）", () => {
    const out = moveItem(list, 1, 1);
    expect(out).toEqual(list);
    expect(out).not.toBe(list);
  });

  it("越界原样返回，不抛错", () => {
    expect(moveItem(list, -1, 2)).toEqual(list);
    expect(moveItem(list, 9, 2)).toEqual(list);
  });

  it("目标下标越界时钳到末尾", () => {
    expect(moveItem(list, 0, 99)).toEqual(["b", "c", "d", "a"]);
  });

  it("不改原数组", () => {
    const src = [...list];
    moveItem(src, 0, 3);
    expect(src).toEqual(list);
  });
});

describe("computeDropIndex — 拖到目标的哪一半", () => {
  const items = ["a", "b", "c", "d"].map((id) => ({ id }));

  it("往后拖、落在目标上半 → 插到它前面", () => {
    // a 拖到 c 的上半：期望 a 排在 c 前面 → ["b", "a", "c", "d"]
    const idx = computeDropIndex(items, "a", "c", "before");
    expect(moveItem(items, 0, idx).map((x) => x.id)).toEqual(["b", "a", "c", "d"]);
  });

  it("往后拖、落在目标下半 → 插到它后面", () => {
    // a 拖到 c 的下半：期望 a 排在 c 后面 → ["b", "c", "a", "d"]
    const idx = computeDropIndex(items, "a", "c", "after");
    expect(moveItem(items, 0, idx).map((x) => x.id)).toEqual(["b", "c", "a", "d"]);
  });

  it("往前拖、落在目标上半 → 插到它前面", () => {
    // d 拖到 b 的上半 → ["a", "d", "b", "c"]
    const idx = computeDropIndex(items, "d", "b", "before");
    expect(moveItem(items, 3, idx).map((x) => x.id)).toEqual(["a", "d", "b", "c"]);
  });

  it("往前拖、落在目标下半 → 插到它后面", () => {
    // d 拖到 b 的下半 → ["a", "b", "d", "c"]
    const idx = computeDropIndex(items, "d", "b", "after");
    expect(moveItem(items, 3, idx).map((x) => x.id)).toEqual(["a", "b", "d", "c"]);
  });

  it("拖到自己身上 → 无效", () => {
    expect(computeDropIndex(items, "b", "b", "before")).toBe(-1);
  });

  it("id 不存在 → 无效", () => {
    expect(computeDropIndex(items, "zzz", "b", "before")).toBe(-1);
    expect(computeDropIndex(items, "b", "zzz", "before")).toBe(-1);
  });
});

describe("neighborIndex — 右键上移/下移", () => {
  it("中间项两个方向都行", () => {
    expect(neighborIndex(4, 2, "up")).toBe(1);
    expect(neighborIndex(4, 2, "down")).toBe(3);
  });

  it("首项不能上移、末项不能下移", () => {
    expect(neighborIndex(4, 0, "up")).toBe(-1);
    expect(neighborIndex(4, 3, "down")).toBe(-1);
  });

  it("单元素两项都不行", () => {
    expect(neighborIndex(1, 0, "up")).toBe(-1);
    expect(neighborIndex(1, 0, "down")).toBe(-1);
  });

  it("非法下标", () => {
    expect(neighborIndex(4, -1, "down")).toBe(-1);
    expect(neighborIndex(4, 9, "up")).toBe(-1);
  });
});
