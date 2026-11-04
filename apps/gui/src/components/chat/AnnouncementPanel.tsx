// ── 服务端公告面板 ──
//
// 从工具栏铃铛打开。和「更新说明」分开：这里只放需要**着重提醒**的消息。
//
// 已读状态存在本地 settings（`readAnnouncementIds`），服务端不记录。

import { useEffect, useState } from "react";
import { Marked } from "marked";
import { t } from "../../i18n";
import {
  getCached,
  refreshAnnouncements,
  markRead,
  markAllRead,
  type Announcement,
  type AnnouncementLevel,
} from "../../services/announcementService";
import { notifyAnnouncementsChanged } from "../../services/announcementBadge";

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

export function AnnouncementPanel() {
  const [items, setItems] = useState<Announcement[]>(() => getCached());
  const [loading, setLoading] = useState(items.length === 0);
  const [error, setError] = useState<string | null>(null);

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

  // 打开面板即视为读过当前的 —— 这是"常驻铃铛"最常见的预期
  useEffect(() => {
    if (!items.length) return;
    markAllRead(items);
    notifyAnnouncementsChanged();
  }, [items]);

  const handleAllRead = () => {
    markAllRead(items);
    notifyAnnouncementsChanged();
    setItems([...items]);   // 触发重渲染
  };

  return (
    <div style={S.root}>
      <div style={S.header}>
        <span style={S.title}>{t("announcement.title")}</span>
        {items.length > 0 && (
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
        {items.map((a) => {
          const lv = LEVEL_STYLE[a.level] ?? LEVEL_STYLE.info;
          return (
            <article
              key={a.uuid}
              style={{ ...S.item, borderLeftColor: lv.color }}
              onClick={() => markRead(a.uuid)}
            >
              <div style={S.itemHead}>
                <span style={{ ...S.badge, color: lv.color, borderColor: lv.color }}>
                  {lv.label()}
                </span>
                <span style={S.itemTitle}>{a.title}</span>
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
  title: { fontWeight: 600 },
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
    cursor: "default",
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
