// 手势意图识别。
//
// 重点是**优先级**：同样的击键组合，命中不同元素时意图不同；
// 而平移必须压过一切（用户准备挪画布时，手底下有东西也不该拖它）。

import { describe, expect, it } from "vitest";
import { resolveGesture, type GestureInput } from "./gestureIntent";

const base: GestureInput = {
  button: 0,
  spaceHeld: false,
  anchor: null,
  itemId: null,
  onToolbar: false,
  selectedIds: new Set<string>(),
  existingItemCount: 0,
};

const input = (patch: Partial<GestureInput>): GestureInput => ({ ...base, ...patch });

describe("平移优先", () => {
  it("空格 + 左键 → 平移", () => {
    expect(resolveGesture(input({ spaceHeld: true, button: 0 }))).toEqual({ kind: "pan" });
  });

  it("空格按住时即使点在 item 上也平移", () => {
    // 用户在"准备挪画布"，不该因为手底下正好有东西就变成拖它
    expect(
      resolveGesture(input({ spaceHeld: true, itemId: "a", selectedIds: new Set(["a"]), existingItemCount: 1 })),
    ).toEqual({ kind: "pan" });
  });

  it("中键 → 平移（不需要空格）", () => {
    expect(resolveGesture(input({ button: 1 }))).toEqual({ kind: "pan" });
  });

  it("中键点在锚点上 → 仍是平移", () => {
    expect(
      resolveGesture(input({ button: 1, anchor: { itemId: "a", side: "top" } })),
    ).toEqual({ kind: "pan" });
  });
});

describe("非左键不处理", () => {
  it("右键 → null", () => {
    expect(resolveGesture(input({ button: 2 }))).toBeNull();
  });

  it("右键点在 item 上 → 仍是 null（右键菜单是另一个事件）", () => {
    expect(resolveGesture(input({ button: 2, itemId: "a" }))).toBeNull();
  });
});

describe("锚点优先于 item", () => {
  it("点在锚点上 → 连线，不是拖 item", () => {
    // 锚点在 item 内部，判断顺序错了就永远连不上线
    expect(
      resolveGesture(
        input({
          anchor: { itemId: "a", side: "right" },
          itemId: "a",
          selectedIds: new Set(["a", "b"]),
          existingItemCount: 2,
        }),
      ),
    ).toEqual({ kind: "connect", itemId: "a", side: "right" });
  });

  it("四个方向都能识别", () => {
    for (const side of ["top", "right", "bottom", "left"] as const) {
      expect(resolveGesture(input({ anchor: { itemId: "x", side } })))
        .toEqual({ kind: "connect", itemId: "x", side });
    }
  });

  it("center 也能透传（类型来自 ConnectionAnchor，不自己复制一份）", () => {
    // 画布只渲染四边锚点，但 ConnectionAnchor["side"] 包含 center
    // （用于连线终点计算）。类型复用意味着这里不该丢。
    expect(resolveGesture(input({ anchor: { itemId: "x", side: "center" } })))
      .toEqual({ kind: "connect", itemId: "x", side: "center" });
  });
});

describe("多选拖动", () => {
  it("点中多选里的一项 → 批量拖动", () => {
    expect(
      resolveGesture(input({ itemId: "a", selectedIds: new Set(["a", "b"]), existingItemCount: 2 })),
    ).toEqual({ kind: "multi-drag", itemIds: ["a", "b"] });
  });

  it("只选中一个 → 不批量拖动（交给 item 自己）", () => {
    expect(
      resolveGesture(input({ itemId: "a", selectedIds: new Set(["a"]), existingItemCount: 1 })),
    ).toEqual({ kind: "item-owned" });
  });

  it("点中未选中的 item → 交给 item 自己（先选中它）", () => {
    expect(
      resolveGesture(input({ itemId: "c", selectedIds: new Set(["a", "b"]), existingItemCount: 2 })),
    ).toEqual({ kind: "item-owned" });
  });

  it("选区里只剩一个真实存在的 item → 退回单拖", () => {
    // 选中集合可能包含已被删掉的 id。只剩一个能拖时强行走多拖路径，
    // 拖起来的手感会不对（计算了 1 个 item 的位移），不如交给单拖。
    expect(
      resolveGesture(input({ itemId: "a", selectedIds: new Set(["a", "ghost"]), existingItemCount: 1 })),
    ).toEqual({ kind: "item-owned" });
  });
});

describe("空白处与工具栏", () => {
  it("空白处左键 → 框选", () => {
    expect(resolveGesture(input({}))).toEqual({ kind: "box-select" });
  });

  it("点在工具栏上 → 不画框", () => {
    expect(resolveGesture(input({ onToolbar: true }))).toBeNull();
  });

  it("点在工具栏上且多选 → 仍不画框", () => {
    expect(
      resolveGesture(input({ onToolbar: true, selectedIds: new Set(["a", "b"]), existingItemCount: 2 })),
    ).toBeNull();
  });
});
