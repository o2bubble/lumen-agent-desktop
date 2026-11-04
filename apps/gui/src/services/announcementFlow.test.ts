// 端到端复现用户场景：启动 → 拉到公告 → 打开面板 → 角标应清零。

import { describe, expect, it, beforeEach, vi } from "vitest";

let mockSettings: Record<string, unknown> = {};
let serverItems: Array<Record<string, unknown>> = [];

vi.mock("../stores/settingsStore", () => ({
  getSettings: () => mockSettings,
  updateSettings: (patch: Record<string, unknown>) => {
    mockSettings = { ...mockSettings, ...patch };
  },
  saveSettings: (patch: Record<string, unknown>) => {
    mockSettings = { ...mockSettings, ...patch };
    return Promise.resolve();
  },
}));

vi.mock("../utils/serverProfile", () => ({
  INTRANET_SERVER_URL: "http://test.local",
}));

globalThis.fetch = (async () => ({
  ok: true,
  json: async () => ({ ok: true, data: serverItems }),
})) as unknown as typeof fetch;

async function fresh() {
  vi.resetModules();
  mockSettings = {};
  serverItems = [];
  return await import("./announcementService");
}

const ITEM = {
  uuid: "u1", level: "info", title: "公告一", body: "", url: "",
  created_at: "2026-11-01T00:00:00Z",
};

describe("完整流程", () => {
  beforeEach(() => {
    mockSettings = {};
    serverItems = [];
  });

  it("启动拉取后应有 1 条未读", async () => {
    const m = await fresh();
    serverItems = [ITEM];
    await m.refreshAnnouncements();
    expect(m.getCached()).toHaveLength(1);
    expect(m.unreadCount(m.getCached())).toBe(1);
  });

  it("打开面板后再拉一次，仍然拿到条目（cursor 不为空也不该丢）", async () => {
    const m = await fresh();
    serverItems = [ITEM];
    await m.refreshAnnouncements();      // 启动时 Toolbar 拉的

    // 面板打开时再拉 —— 真实服务端此时 since=cursor 会返回 []
    serverItems = [];
    const r = await m.refreshAnnouncements();

    expect(r.items).toHaveLength(1);     // 必须保留已缓存的
    expect(m.unreadCount(r.items)).toBe(1);
  });

  it("markAllRead 之后 unreadCount 归零", async () => {
    const m = await fresh();
    serverItems = [ITEM];
    await m.refreshAnnouncements();
    const items = m.getCached();

    m.markAllRead(items);
    expect(m.unreadCount(m.getCached())).toBe(0);
  });

  it("标记已读后再次 refresh 不会把已读又变回未读", async () => {
    const m = await fresh();
    serverItems = [ITEM];
    await m.refreshAnnouncements();
    m.markAllRead(m.getCached());

    serverItems = [];
    await m.refreshAnnouncements();
    expect(m.unreadCount(m.getCached())).toBe(0);
  });
});
