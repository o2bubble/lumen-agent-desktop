// 公告面板的展示状态。
//
// 用户 2026-11-05 的要求：
//   ① 未读要有明显的样式区别
//   ② 点哪条就标记哪条已读
//   ③ 「全部已读」标记完自动关闭面板
//
// ①② 的判定在这里锁住；③ 是关闭浮窗的副作用，靠 code review 保证
// （关闭逻辑依赖 layoutStore，属于集成行为）。
//
// ⚠️ 特别锁住「打开面板不等于已读」这条 —— 旧实现一打开就全标已读，
// 红点直接消失，用户根本没看内容。这是被明确纠正过的行为。

import { describe, expect, it } from "vitest";
import { computeAnnouncementViewState } from "./announcementViewState";
import type { Announcement } from "./announcementService";

const make = (uuid: string, title = uuid): Announcement => ({
  uuid,
  level: "info",
  title,
  body: "",
  url: "",
  created_at: "2026-11-05T00:00:00Z",
});

const items = [make("a"), make("b"), make("c")];

describe("computeAnnouncementViewState", () => {
  it("全部未读：三条都标 unread，角标 3，显示全部已读按钮", () => {
    const s = computeAnnouncementViewState(items, new Set());
    expect(s.rows.map((r) => r.unread)).toEqual([true, true, true]);
    expect(s.unreadCount).toBe(3);
    expect(s.showMarkAllRead).toBe(true);
  });

  it("只读了一条：其余仍是未读（点哪条读哪条）", () => {
    const s = computeAnnouncementViewState(items, new Set(["b"]));
    expect(s.rows.map((r) => r.unread)).toEqual([true, false, true]);
    expect(s.unreadCount).toBe(2);
    expect(s.showMarkAllRead).toBe(true);
  });

  it("只有 b 是已读的 —— 状态跟着 uuid 走，不是按下标", () => {
    const s = computeAnnouncementViewState(items, new Set(["b"]));
    expect(s.rows[1].announcement.uuid).toBe("b");
    expect(s.rows[1].unread).toBe(false);
  });

  it("全部已读：角标归零，不再显示全部已读按钮", () => {
    const s = computeAnnouncementViewState(items, new Set(["a", "b", "c"]));
    expect(s.unreadCount).toBe(0);
    expect(s.showMarkAllRead).toBe(false);
    expect(s.rows.every((r) => !r.unread)).toBe(true);
  });

  it("已读列表里有不存在的 uuid 不影响结果（历史公告被删）", () => {
    const s = computeAnnouncementViewState(items, new Set(["a", "already-deleted"]));
    expect(s.unreadCount).toBe(2);
  });

  it("空列表：无角标、无按钮", () => {
    const s = computeAnnouncementViewState([], new Set());
    expect(s.rows).toEqual([]);
    expect(s.unreadCount).toBe(0);
    expect(s.showMarkAllRead).toBe(false);
  });
});
