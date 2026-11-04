// 公告「已读」状态机。
//
// 用户反馈：点开面板后红点还在。
// 这里锁住「标记已读之后 unreadCount 必须归零」这条最基本的契约。

import { describe, expect, it, beforeEach, vi } from "vitest";

let mockSettings: Record<string, unknown> = {};
/** 记录每次 saveSettings 的 scope —— 已读必须写 global（见下方用例）。 */
let saveScopes: (string | undefined)[] = [];

vi.mock("../stores/settingsStore", () => ({
  getSettings: () => mockSettings,
  updateSettings: (patch: Record<string, unknown>) => {
    mockSettings = { ...mockSettings, ...patch };
  },
  saveSettings: (patch: Record<string, unknown>, scope?: string) => {
    saveScopes.push(scope);
    mockSettings = { ...mockSettings, ...patch };
    return Promise.resolve();
  },
}));

vi.mock("../utils/serverProfile", () => ({
  INTRANET_SERVER_URL: "http://test.local",
}));

async function fresh() {
  vi.resetModules();
  return await import("./announcementService");
}

const A1 = {
  uuid: "u1", level: "info" as const, title: "一", body: "", url: "",
  created_at: "2026-11-01T00:00:00Z",
};
const A2 = {
  uuid: "u2", level: "critical" as const, title: "二", body: "", url: "",
  created_at: "2026-11-02T00:00:00Z",
};

describe("announcementService 已读", () => {
  beforeEach(() => {
    mockSettings = {};
    saveScopes = [];
  });

  // 多实例红点反复出现的根因：已读曾写进 workspace scope。
  // 不同实例绑不同工作区就各存各的；没绑工作区时甚至被 Rust 侧静默丢弃。
  it("已读必须写 global scope（不是默认的 workspace）", async () => {
    const m = await fresh();
    m.markRead("u1");
    expect(saveScopes).toEqual(["global"]);
  });

  it("初始全部未读", async () => {
    const m = await fresh();
    expect(m.unreadCount([A1, A2])).toBe(2);
  });

  it("markRead 后计数减一", async () => {
    const m = await fresh();
    m.markRead("u1");
    expect(m.unreadCount([A1, A2])).toBe(1);
    expect(m.isRead("u1")).toBe(true);
    expect(m.isRead("u2")).toBe(false);
  });

  it("markAllRead 后计数归零", async () => {
    const m = await fresh();
    m.markAllRead([A1, A2]);
    expect(m.unreadCount([A1, A2])).toBe(0);
  });

  it("重复 markAllRead 不产生重复 uuid", async () => {
    const m = await fresh();
    m.markAllRead([A1, A2]);
    m.markAllRead([A1, A2]);
    const ids = mockSettings.readAnnouncementIds as string[];
    expect(ids).toEqual(["u1", "u2"]);
  });

  it("已读列表超过上限时裁掉最老的", async () => {
    const m = await fresh();
    const many = Array.from({ length: 310 }, (_, i) => ({
      uuid: `x${i}`, level: "info" as const, title: String(i),
      body: "", url: "", created_at: "2026-11-01T00:00:00Z",
    }));
    m.markAllRead(many);
    const ids = mockSettings.readAnnouncementIds as string[];
    expect(ids).toHaveLength(300);
    expect(ids[0]).toBe("x10");     // 最老的 10 条被丢掉
    expect(ids[299]).toBe("x309");
  });
});
