// ── 服务端公告（着重提醒用）──
//
// 与「更新说明」不同：更新说明每版都有，多数人不看。公告只放**少数几条
// 需要用户真的注意到**的东西 —— 重要功能上线、严重 bug 修复。
//
// ## 设计要点
//
// 1. **不做全量拉取**：每次只带 `since=<本地已知最新 uuid>` 取增量。
//    用户量大了，全量返回是很实的带宽成本。
// 2. **已读只在本地记**：这套服务没有用户体系，服务端记不了"谁读过"；
//    这是纯客户端体验，也不需要跨设备同步。
// 3. **不需要实时**：启动时拉一次即可（用户明确说过不要实时性）。

import { getSettings, saveSettings } from "../stores/settingsStore";
import { INTRANET_SERVER_URL } from "../utils/serverProfile";

export type AnnouncementLevel = "info" | "important" | "critical";

export interface Announcement {
  uuid: string;
  level: AnnouncementLevel;
  title: string;
  body: string;
  url: string;
  created_at: string;
}

/** 已读列表上限 —— 只增不减会无限涨，超过就丢最老的。 */
const MAX_READ_IDS = 300;

/** 后端只需要这几条；给个上限避免异常数据把界面撑爆。 */
const FETCH_LIMIT = 50;

function baseUrl(): string {
  return getSettings().skillRegistryUrl ?? INTRANET_SERVER_URL;
}

/**
 * 本地已知的**最新**一条公告 uuid，作为下次拉取的 `since`。
 *
 * 注意：不能用"已读列表的最后一条" —— 用户可能没读完就关掉了。
 * 用服务端返回过的最大 uuid 才准确，所以这里存的是 `announcementCursor`。
 */
function readIds(): Set<string> {
  return new Set(getSettings().readAnnouncementIds ?? []);
}

export function isRead(uuid: string): boolean {
  return readIds().has(uuid);
}

export function unreadCount(items: Announcement[]): number {
  const read = readIds();
  return items.filter((a) => !read.has(a.uuid)).length;
}

/**
 * 写回已读集合。
 *
 * 用 `saveSettings`（会落盘）而不是 `updateSettings`（只改内存）——
 * 后者重启后就丢了，用户会觉得"读过的又变成未读"。
 *
 * ⚠️ **必须传 "global"**（2026-11-04 修）：
 * `saveSettings` 默认 scope 是 `"workspace"`，会把已读写进
 * `<工作区>/.claude/settings.local.json`。但公告是**全局**概念，不属于任何
 * 工作区 —— 存进工作区会导致：
 *   · 多实例绑不同工作区 → 各存各的，A 点已读 B 那边又红点；
 *   · 还没绑工作区时 → Rust 侧 `save_target_path` 返回 None，**静默丢弃**。
 * 改走 global 后两端读写同一份文件，配合 `notify_settings_changed` 广播，
 * 另一实例 reloadSettings 即可同步。
 *
 * 不 await：调用方是 UI 事件，等落盘会卡住刷新；失败也只需静默。
 */
function persistRead(ids: string[]): void {
  void saveSettings(
    {
      readAnnouncementIds: ids.length > MAX_READ_IDS ? ids.slice(-MAX_READ_IDS) : ids,
    },
    "global",
  );
}

/** 标记一条已读。 */
export function markRead(uuid: string): void {
  const read = getSettings().readAnnouncementIds ?? [];
  if (read.includes(uuid)) return;
  persistRead([...read, uuid]);
}

/** 全部已读。 */
export function markAllRead(items: Announcement[]): void {
  const read = getSettings().readAnnouncementIds ?? [];
  const set = new Set(read);
  for (const a of items) set.add(a.uuid);
  if (set.size === read.length) return;   // 没有新增 → 不写盘
  persistRead([...set]);
}

export interface FetchResult {
  items: Announcement[];
  /** 服务端报错（网络不通等）时给调用方一个信号，界面上做静默处理 */
  error?: string;
}

/**
 * 拉取增量公告。
 *
 * @param sinceUuid 本地已知的最新 uuid；不传 = 取最近 FETCH_LIMIT 条
 */
export async function fetchAnnouncements(sinceUuid?: string | null): Promise<FetchResult> {
  const url = new URL(`${baseUrl()}/api/announcements`);
  url.searchParams.set("limit", String(FETCH_LIMIT));
  if (sinceUuid) url.searchParams.set("since", sinceUuid);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(url.toString(), { signal: ctrl.signal });
    if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
    const json = (await res.json()) as { ok: boolean; data?: Announcement[] };
    if (!json.ok || !Array.isArray(json.data)) return { items: [], error: "响应格式异常" };
    return { items: json.data };
  } catch (e) {
    // 网络不通是常态（离线/内网），调用方静默处理即可
    return { items: [], error: String((e as Error)?.message ?? e) };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 缓存上次拉到的**全部**公告，供界面反复渲染。
 *
 * 为什么不每次打开弹层都重新请求：
 *   · 用户明确说不需要实时性
 *   · 服务端只给增量，重新拉会拿到空（since = 最新）
 *   · 离线时要能看已缓存的
 */
let cached: Announcement[] = [];

export function getCached(): Announcement[] {
  return cached;
}

/** 服务端过滤后的最新 uuid，作为下次 since 的基准。 */
let cursor: string | null = null;

export function getCursor(): string | null {
  return cursor;
}

/**
 * 启动时调用一次：先取最近一批，再看有没有更新的。
 *
 * 两步是有意为之：
 *   ① 不带 since → 拿到最近 FETCH_LIMIT 条，用户第一次用也能看到历史公告
 *   ② 带 since（上一轮的最新）→ 拿之后的增量
 */
export async function refreshAnnouncements(): Promise<FetchResult> {
  const first = await fetchAnnouncements(cursor);
  if (first.error) return first;

  // 服务端按 created_at 升序返回；合并去重后按时间倒序（界面上新的在上）
  const byUuid = new Map<string, Announcement>();
  for (const a of cached) byUuid.set(a.uuid, a);
  for (const a of first.items) byUuid.set(a.uuid, a);

  cached = [...byUuid.values()].sort((a, b) =>
    a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0,
  );

  const newest = cached[0];
  if (newest) cursor = newest.uuid;

  return { items: cached };
}
