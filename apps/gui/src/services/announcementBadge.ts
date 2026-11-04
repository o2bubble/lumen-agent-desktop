// ── 公告未读数（工具栏角标用）──
//
// 单独一个轻量模块，避免 Toolbar 直接依赖 announcementService 的 fetch 逻辑
// （Toolbar 每次渲染都跑一遍网络判断会很糟）。

import { getCached, unreadCount } from "./announcementService";
import { Events } from "./events";
import { windowBus } from "./windowBus";

/** 本窗口的未读数变了 → 通知 Toolbar 重算角标。 */
export function notifyAnnouncementsChanged(): void {
  windowBus.emit(Events.ANNOUNCEMENTS_CHANGED, {});
}

/** 当前未读数（同步，读的是缓存）。 */
export function currentUnreadCount(): number {
  return unreadCount(getCached());
}
