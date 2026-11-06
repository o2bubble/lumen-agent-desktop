// 布局约束的守卫测试。
//
// 这个仓库没有 DOM 测试环境（无 jsdom / testing-library），所以没法直接断言
// 「渲染后卡片有多高」。退一步：把曾经出过错的那几条关键约束钉在样式常量上。
//
// 局限性要说清楚：**它只证明样式表里有这一条，不证明渲染结果正确**。
// 真正的高度验证靠浏览器实测（2026-11-06 用真实 72 轮会话跑过：每张 35px、
// 列表可滚动）。测试的意义是防止有人顺手把它删掉。

import { describe, expect, it } from "vitest";
import { S } from "./SessionMessageEditor";

describe("SessionMessageEditor 布局约束", () => {
  it("轮卡片禁止在主轴上收缩", () => {
    // 列表是 `display:flex; flex-direction:column`。子项默认 flexShrink:1，
    // 轮数一多（真实会话 72 轮）就被压成 2px —— 界面上是一排细横线。
    expect(S.turnCard.flexShrink).toBe(0);
  });

  it("列表容器在纵向滚动、横向不滚", () => {
    expect(S.list.overflowY).toBe("auto");
    expect(S.list.flexDirection).toBe("column");
  });

  it("预览行能正确省略，不会把行撑高", () => {
    expect(S.turnPreview.whiteSpace).toBe("nowrap");
    expect(S.turnPreview.overflow).toBe("hidden");
    expect(S.turnPreview.textOverflow).toBe("ellipsis");
  });
});
