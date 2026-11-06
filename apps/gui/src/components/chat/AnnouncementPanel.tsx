// ── 服务端公告面板 ──
//
// 从工具栏铃铛打开。和「更新说明」分开：这里只放需要**着重提醒**的消息。
//
// 已读状态存在本地 settings（`readAnnouncementIds`），服务端不记录。

import { useCallback, useEffect, useMemo, useState } from "react";
import { Marked } from "marked";
import { t } from "../../i18n";
import {
  getCached,
  refreshAnnouncements,
  isRead,
  markRead,
  markAllRead,
  type Announcement,
  type AnnouncementLevel,
} from "../../services/announcementService";
import { notifyAnnouncementsChanged } from "../../services/announcementBadge";
import { computeAnnouncementViewState } from "../../services/announcementViewState";
import { getSettings } from "../../stores/settingsStore";
import { getFloatingPanels, removeFloatingPanel } from "../../stores/layoutStore";

/** 三级各自的强调色 —— critical 用红，important 用橙，info 用中性。 */
const LEVEL_STYLE: Record<AnnouncementLevel, { color: string; label: () => string }> = {
  critical: { color: "#e5645f", label: () => t("announcement.levelCritical") },
  important: { color: "#d9a441", label: () => t("announcement.levelImportant") },
  info: { color: "var(--fg-muted)", label: () => t("announcement.levelInfo") },
};

function fmtTime(iso: string): string {
  // 服务端给的是 "2026-11-03T14:35:34Z"；展示到日期即可
  return iso.slice(0, 10);
}

// 公告正文按 Markdown 渲染（成对的 **、列表、换行）。
//
// ⚠️ 内容来自服务端，**原始 HTML 一律丢弃** —— 渲染结果会进
// `dangerouslySetInnerHTML`，若放行 `<script>`/`<img onerror>` 就是一个
// 可被管理后台（或被入侵的服务端）利用的 XSS 通道。公告只需要基础 Markdown，
// 不需要内联 HTML，所以直接关掉最安全，也就不必再引 sanitizer。
const md = new Marked({
  gfm: true,
  breaks: true, // 公告是手写的，单换行就该换行
});
md.use({
  renderer: {
    html: () => "",
  },
});

function renderAnnouncementBody(body: string): string {
  return md.parse(body) as string;
}

/**
 * 面板若托管在浮窗里，关掉那个浮窗。
 *
 * 不依赖 Toolbar 的 `openAnnouncementFloat`（会引入反向依赖）——
 * 直接按 panelId 在浮窗列表里找自己。找不到（面板被嵌进主区域）就什么都不做。
 */
function closeSelfIfFloating(): void {
  const fp = getFloatingPanels().find((f) =>
    f.group.tabs.some(
      (tab) =>
        tab.panelId === "announcement" ||
        tab.children?.some((c) => c.panelId === "announcement"),
    ),
  );
  if (fp) removeFloatingPanel(fp.id);
}

export function AnnouncementPanel() {
  const [items, setItems] = useState<Announcement[]>(() => getCached());
  const [loading, setLoading] = useState(items.length === 0);
  const [error, setError] = useState<string | null>(null);
  // 已读状态存在 settings 里（不是 React state），改完要递增这个计数来触发重渲染。
  const [readTick, setReadTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const r = await refreshAnnouncements();
      if (cancelled) return;
      setItems([...r.items]);
      setError(r.error ?? null);
      setLoading(false);
      notifyAnnouncementsChanged();
    })();
    return () => { cancelled = true; };
  }, []);

  // ⚠️ **打开面板不再自动标记全部已读**。
  // 之前的逻辑是「打开即全读」—— 面板一弹出，红点就没了，用户根本没看内容。
  // 现在改成一题一读：点哪条读哪条；只有「全部已读」才批量标记。

  // readTick 让「已读状态（存在 settings 里）变化」能触发重渲染
  const view = useMemo(
    () => computeAnnouncementViewState(items, new Set(getSettings().readAnnouncementIds ?? [])),
    [items, readTick],
  );
  const { unreadCount, showMarkAllRead } = view;

  const handleReadOne = useCallback((uuid: string) => {
    if (isRead(uuid)) return;
    markRead(uuid);
    notifyAnnouncementsChanged();
    setReadTick((n) => n + 1);
  }, []);

  /** 全部已读 → 标记后**自动关闭面板**（用户点这个就是"看完了，可以关"）。 */
  const handleAllRead = useCallback(() => {
    markAllRead(items);
    notifyAnnouncementsChanged();
    setReadTick((n) => n + 1);
    closeSelfIfFloating();
  }, [items]);

  return (
    <div style={S.root}>
      <div style={S.header}>
        <span style={S.title}>
          {t("announcement.title")}
          {unreadCount > 0 && <span style={S.count}>{unreadCount}</span>}
        </span>
        {showMarkAllRead && (
          <button type="button" style={S.linkBtn} onClick={handleAllRead}>
            {t("announcement.markAllRead")}
          </button>
        )}
      </div>

      {loading && <div style={S.hint}>{t("announcement.loading")}</div>}

      {!loading && error && items.length === 0 && (
        <div style={S.hint}>{t("announcement.loadFailed")}</div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={S.hint}>{t("announcement.empty")}</div>
      )}

      <div style={S.list}>
        {view.rows.map(({ announcement: a, unread }) => {
          const lv = LEVEL_STYLE[a.level] ?? LEVEL_STYLE.info;
          const read = !unread;
          return (
            <article
              key={a.uuid}
              style={{
                ...S.item,
                // 未读：左侧色条用等级色 + 底色提亮 + 标题加粗；
                // 已读：色条转灰、底色回落、整体降一档对比度。
                ...(read ? S.itemRead : S.itemUnread),
                borderLeftColor: read ? "var(--border-medium)" : lv.color,
              }}
              onClick={() => handleReadOne(a.uuid)}
              title={read ? undefined : t("announcement.clickToRead")}
            >
              <div style={S.itemHead}>
                {/* 徽章始终按等级着色，**不随已读转灰** —— 它表达的是「这条有多要紧」，
                    和「我读没读」是两件事。已读状态已经由卡片透明度、左侧色条、
                    圆点缺失、标题字重四重表达过了，不必让徽章再重复一次。 */}
                <span
                  style={{
                    ...S.badge,
                    color: lv.color,
                    borderColor: lv.color,
                    // 已读时略微降低存在感，但保住色相 —— 扫一眼仍分得出红/橙/灰
                    opacity: read ? 0.7 : 1,
                  }}
                >
                  {lv.label()}
                </span>
                <span style={read ? S.itemTitleRead : S.itemTitle}>{a.title}</span>
                {!read && <span style={S.unreadDot} aria-label={t("announcement.unread")} />}
                <span style={S.time}>{fmtTime(a.created_at)}</span>
              </div>
              {a.body && (
                <div
                  className="md-body"
                  style={S.body}
                  dangerouslySetInnerHTML={{ __html: renderAnnouncementBody(a.body) }}
                />
              )}
              {a.url && (
                // 暂不支持功能跳转（用户明确说的），但**外链**仍然给出来 ——
                // 有些公告就是要引导去看一个页面，纯文本没法替代。
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={S.link}
                  onClick={(e) => e.stopPropagation()}
                >
                  {a.url}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

// ⚠️ 只用 tokens.css 里**真实存在**的变量（--bg-root / --fg-primary / --border-light…）。
// 早先这里写的是 `--bg` / `--fg` / `--border` —— 那三个只在插件页面里定义过，
// 主界面没有，于是 `borderBottom: "1px solid var(--border)"` 整条声明在计算值阶段
// 失效，导致**一条分割线都不显示**，多条公告糊成一片。
const S: Record<string, React.CSSProperties> = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "var(--bg-root)",
    color: "var(--fg-primary)",
    fontSize: "calc(var(--font-scale, 1) * 13px)",
  },
  header: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderBottom: "1px solid var(--border-light)",
  },
  title: { fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 },
  /** 未读数角标 —— 与工具栏铃铛的口径一致（同一个 unreadCount 算法）。 */
  count: {
    fontSize: 10,
    lineHeight: "14px",
    minWidth: 14,
    padding: "0 4px",
    borderRadius: 7,
    background: "var(--accent)",
    color: "var(--fg-inverse)",
    textAlign: "center",
    fontWeight: 600,
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "var(--fg-muted)",
    cursor: "pointer",
    fontSize: 12,
    padding: 0,
    textDecoration: "underline",
  },
  hint: {
    padding: "36px 16px",
    textAlign: "center",
    color: "var(--fg-muted)",
  },
  // 卡片式：靠 gap 拉开间距 + 圆角边框，比单纯一条 1px 分隔线更容易一眼分辨条目
  list: {
    flex: "1 1 auto",
    overflowY: "auto",
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    padding: "10px 12px",
    border: "1px solid var(--border-light)",
    // 顺序要紧：先 border 简写再覆盖左边，否则简写会把 3px 打回 1px
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "transparent", // 实际颜色由行内 lv.color 覆盖
    borderRadius: 6,
    background: "var(--bg-surface)",
    cursor: "pointer", // 点整条 = 标记已读（提示文案在 title 上）
    transition: "background-color .12s, border-color .12s, opacity .12s",
  },
  // ⚠️ 这里**不能写 `borderColor`**。对象展开时已存在的键保持原位置 ——
  // `borderLeftColor` 在 S.item 里先出现，位置就排在前面；再合并一个
  // `borderColor` 简写会落在它之后，把它覆盖掉（等级色直接失效，左侧全变灰）。
  // 所以只逐边设色，把左边让给行内的等级色。
  /** 未读：轻微提亮的底 + 更实的边框，色条由行内等级色决定。 */
  itemUnread: {
    background: "var(--bg-hover)",
    borderTopColor: "var(--border-medium)",
    borderRightColor: "var(--border-medium)",
    borderBottomColor: "var(--border-medium)",
  },
  /** 已读：整条降一档对比度 —— 底色回落、边框转浅，色条也转灰（行内覆盖）。 */
  itemRead: {
    background: "var(--bg-surface)",
    borderTopColor: "var(--border-light)",
    borderRightColor: "var(--border-light)",
    borderBottomColor: "var(--border-light)",
    opacity: 0.65,
  },
  itemHead: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  badge: {
    flex: "0 0 auto",
    fontSize: 10,
    lineHeight: "14px",
    padding: "0 4px",
    border: "1px solid",
    borderRadius: 3,
  },
  itemTitle: { flex: "1 1 auto", fontWeight: 600 },
  itemTitleRead: { flex: "1 1 auto", fontWeight: 500, color: "var(--fg-secondary)" },
  /** 未读圆点 —— 和标题字重一起构成「扫一眼就能看出哪些没看」的信号。 */
  unreadDot: {
    flex: "0 0 auto",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--accent)",
  },
  time: { flex: "0 0 auto", fontSize: 11, color: "var(--fg-muted)" },
  body: {
    margin: "4px 0 0",
    lineHeight: 1.6,
    color: "var(--fg-primary)",
    fontSize: "calc(var(--font-scale, 1) * 13px)",
  },
  link: {
    display: "inline-block",
    marginTop: 6,
    fontSize: 12,
    color: "var(--accent)",
    wordBreak: "break-all",
  },
};
