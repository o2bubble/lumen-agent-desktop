// 已打开文件的变更监听。
//
// 契约：
//   · 首次见到某文件只记录签名，**不上报**（否则打开文件那一刻就会误判"变了"）
//   · 签名变化（mtime 或 size）才上报
//   · 开关关掉时完全不动

import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

const emitted: Array<{ path: string }> = [];
let mockSignatures: Array<{ path: string; mtime: number; size: number; exists: boolean }> = [];
let mockTabs: Array<{ path: string }> = [];
let mockSettings: { autoReloadOnExternalChange?: boolean } = {};

vi.mock("./windowBus", () => ({
  windowBus: {
    emit: (_evt: string, payload: { path: string }) => emitted.push(payload),
  },
}));

vi.mock("../stores/editorStore", () => ({
  editorStore: {
    get tabs() {
      return mockTabs;
    },
  },
}));

vi.mock("../stores/settingsStore", () => ({
  getSettings: () => mockSettings,
}));

vi.mock("@tauri-apps/api/core", () => ({
  invoke: async () => mockSignatures,
}));

vi.mock("./events", () => ({
  Events: { FILE_CHANGED: "file.changed" },
}));

async function freshModule() {
  vi.resetModules();
  return await import("./fileWatcher");
}

describe("fileWatcher", () => {
  beforeEach(() => {
    emitted.length = 0;
    mockSignatures = [];
    mockTabs = [];
    mockSettings = {};
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("首次见到文件只记录，不上报", async () => {
    const m = await freshModule();
    mockTabs = [{ path: "a.ts" }];
    mockSignatures = [{ path: "a.ts", mtime: 100, size: 10, exists: true }];

    await m.__pollOnceForTest();
    expect(emitted).toHaveLength(0);

    // 第二次没变化，仍然不上报
    await m.__pollOnceForTest();
    expect(emitted).toHaveLength(0);
  });

  it("mtime 变化时上报", async () => {
    const m = await freshModule();
    mockTabs = [{ path: "a.ts" }];
    mockSignatures = [{ path: "a.ts", mtime: 100, size: 10, exists: true }];
    await m.__pollOnceForTest();

    mockSignatures = [{ path: "a.ts", mtime: 200, size: 10, exists: true }];
    await m.__pollOnceForTest();
    expect(emitted).toEqual([{ path: "a.ts" }]);
  });

  it("只有 size 变化也上报（同一时间粒度内多次写）", async () => {
    const m = await freshModule();
    mockTabs = [{ path: "a.ts" }];
    mockSignatures = [{ path: "a.ts", mtime: 100, size: 10, exists: true }];
    await m.__pollOnceForTest();

    mockSignatures = [{ path: "a.ts", mtime: 100, size: 20, exists: true }];
    await m.__pollOnceForTest();
    expect(emitted).toHaveLength(1);
  });

  it("文件消失时也上报（交给上层标记删除）", async () => {
    const m = await freshModule();
    mockTabs = [{ path: "a.ts" }];
    mockSignatures = [{ path: "a.ts", mtime: 100, size: 10, exists: true }];
    await m.__pollOnceForTest();

    mockSignatures = [{ path: "a.ts", mtime: 0, size: 0, exists: false }];
    await m.__pollOnceForTest();
    expect(emitted).toEqual([{ path: "a.ts" }]);
  });

  it("标签已关闭的文件不再上报", async () => {
    const m = await freshModule();
    mockTabs = [{ path: "a.ts" }, { path: "b.ts" }];
    mockSignatures = [
      { path: "a.ts", mtime: 1, size: 1, exists: true },
      { path: "b.ts", mtime: 1, size: 1, exists: true },
    ];
    await m.__pollOnceForTest();

    mockTabs = [{ path: "a.ts" }]; // b 关了
    mockSignatures = [
      { path: "a.ts", mtime: 1, size: 1, exists: true },
      { path: "b.ts", mtime: 9, size: 9, exists: true },
    ];
    await m.__pollOnceForTest();
    expect(emitted).toHaveLength(0);
  });

  it("没有打开文件时什么都不做", async () => {
    const m = await freshModule();
    mockTabs = [];
    mockSignatures = [];
    await m.__pollOnceForTest();
    expect(emitted).toHaveLength(0);
  });
});
