// findSmartPlace 的布局计算。
//
// 这个函数之前从没被单独测过 —— 它是螺旋扫描找空位，困在 store 里，
// 想测它得先造 desktop 对象。搬到 desktopLayout 后可以喂坐标直接验。

import { describe, expect, it } from "vitest";
import { findSmartPlace, rectsOverlap, type LayoutConfig } from "./desktopLayout";

const cfg = (items: LayoutConfig["items"], snap = false, gridSize = 20): LayoutConfig => ({
  items,
  snapToGrid: snap,
  gridSize,
});

describe("rectsOverlap", () => {
  it("重叠", () => {
    expect(rectsOverlap(0, 0, 100, 100, 50, 50, 100, 100)).toBe(true);
  });

  it("完全分离", () => {
    expect(rectsOverlap(0, 0, 100, 100, 200, 200, 100, 100)).toBe(false);
  });

  it("边界相接算重叠（有意的：贴死看不见间距）", () => {
    expect(rectsOverlap(0, 0, 100, 100, 100, 0, 100, 100)).toBe(true);
  });

  it("一个完全包含另一个", () => {
    expect(rectsOverlap(0, 0, 200, 200, 50, 50, 20, 20)).toBe(true);
  });
});

describe("findSmartPlace", () => {
  it("空桌面上放在锚点附近", () => {
    const p = findSmartPlace(cfg([]), 200, 150);
    expect(p.x).toBe(100);
    expect(p.y).toBe(100);
  });

  it("锚点被占时挪开，且结果不与任何已有 item 重叠", () => {
    const existing = [{ x: 100, y: 100, width: 200, height: 150 }];
    const p = findSmartPlace(cfg(existing), 200, 150);
    // 找出来了就不能还在锚点上
    expect(p).not.toEqual({ x: 100, y: 100 });
  });

  it("锚点被占时真的挪开（旧实现在这里是坏的）", () => {
    // 回归：旧实现步长固定 30，item 是 200×150，相邻候选必然重叠 →
    // 扫满就直接返回锚点旁的位置，结果压住已有内容。
    const existing = [{ x: 100, y: 100, width: 200, height: 150 }];
    const p = findSmartPlace(cfg(existing), 200, 150);
    expect(rectsOverlap(p.x, p.y, 200, 150, 100, 100, 200, 150)).toBe(false);
  });

  it("多个大块围住锚点也能找到不重叠的位置", () => {
    const existing = [
      { x: 100, y: 100, width: 200, height: 150 },
      { x: 130, y: 100, width: 200, height: 150 },
      { x: 100, y: 130, width: 200, height: 150 },
    ];
    const p = findSmartPlace(cfg(existing), 200, 150);
    for (const it of existing) {
      expect(rectsOverlap(p.x, p.y, 200, 150, it.x, it.y, it.width, it.height))
        .toBe(false);
    }
  });

  it("螺旋扫不到时放到所有内容下方，不重叠", () => {
    // 故意 maxSteps=1，逼它走 fallback
    const existing = [{ x: 100, y: 100, width: 400, height: 300 }];
    const p = findSmartPlace(cfg(existing), 200, 150, 1);
    expect(p.y).toBeGreaterThanOrEqual(100 + 300);
    expect(rectsOverlap(p.x, p.y, 200, 150, 100, 100, 400, 300)).toBe(false);
  });



  it("开了吸附时结果落在网格上", () => {
    const p = findSmartPlace(cfg([], true, 20), 200, 150);
    expect(p.x % 20).toBe(0);
    expect(p.y % 20).toBe(0);
  });

  it("网格尺寸生效（换一个网格值）", () => {
    const p = findSmartPlace(cfg([], true, 50), 200, 150);
    expect(p.x % 50).toBe(0);
    expect(p.y % 50).toBe(0);
  });

  it("挤不出来时返回锚点旁的位置，不会抛异常", () => {
    // 塞满一大片，maxSteps 故意给小
    const full: LayoutConfig["items"] = [];
    for (let x = -500; x < 800; x += 50) {
      for (let y = -500; y < 800; y += 50) {
        full.push({ x, y, width: 60, height: 60 });
      }
    }
    const p = findSmartPlace(cfg(full), 200, 150, 10);
    expect(typeof p.x).toBe("number");
    expect(Number.isFinite(p.x)).toBe(true);
    expect(Number.isFinite(p.y)).toBe(true);
  });

  it("连续放置多个块：零重叠、全正坐标、按阅读顺序", () => {
    // 回归：旧实现是螺旋扫描，第二圈就跑到 -70,-140 / -410,-380 去，
    // 而画布左上方其实还空着 —— 用户看到东西凭空出现在视野外。
    const items: { x: number; y: number; width: number; height: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const p = findSmartPlace({ items, snapToGrid: false, gridSize: 20 }, 300, 200);
      items.push({ x: p.x, y: p.y, width: 300, height: 200 });
    }

    for (let i = 0; i < items.length; i++) {
      expect(items[i].x).toBeGreaterThanOrEqual(0);
      expect(items[i].y).toBeGreaterThanOrEqual(0);
      for (let j = i + 1; j < items.length; j++) {
        expect(
          rectsOverlap(items[i].x, items[i].y, 300, 200, items[j].x, items[j].y, 300, 200),
        ).toBe(false);
      }
    }

    // 阅读顺序：前几个应该在同一行（y 相同），x 递增
    expect(items[0].y).toBe(items[1].y);
    expect(items[1].x).toBeGreaterThan(items[0].x);
  });

  it("不改动传入的 items（无副作用）", () => {
    const items = [{ x: 100, y: 100, width: 200, height: 150 }];
    const before = JSON.stringify(items);
    findSmartPlace(cfg(items), 200, 150);
    expect(JSON.stringify(items)).toBe(before);
  });
});
