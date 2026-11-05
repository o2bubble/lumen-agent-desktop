// ── 公告面板的展示状态（纯函数，可单测）──
//
// 面板本身负责渲染；「哪条算未读、标题栏显示什么」这类判定放这里，
// 因为它是**用户能直接感知的语义**，值得锁住：
//   · 打开面板 ≠ 已读（2026-11-05 改）
//   · 点哪条读哪条
//   · 全部已读后不再显示「全部已读」按钮

import type { Announcement } from "./announcementService";

export interface AnnouncementRowState {
  announcement: Announcement;
  /** 未读 → 左侧色条用等级色、底色提亮、标题加粗、右侧带圆点 */
  unread: boolean;
}

export interface AnnouncementViewState {
  rows: AnnouncementRowState[];
  unreadCount: number;
  /** 还有未读才显示「全部标为已读」—— 全读完按钮就没意义了 */
  showMarkAllRead: boolean;
}

export function computeAnnouncementViewState(
  items: readonly Announcement[],
  readIds: ReadonlySet<string>,
): AnnouncementViewState {
  const rows = items.map((announcement) => ({
    announcement,
    unread: !readIds.has(announcement.uuid),
  }));
  const unreadCount = rows.filter((r) => r.unread).length;
  return { rows, unreadCount, showMarkAllRead: unreadCount > 0 };
}
