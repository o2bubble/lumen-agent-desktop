import { useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { Package, FolderOpen, Copy, Check } from "lucide-react";
import {
  normalizeDeliverInput,
  deliverItemLabel,
  type DeliverAction,
  type DeliverItem,
} from "../../services/deliverSpec";
import { openReference } from "../../services/referenceActions";
import { addStatusMessage } from "../../stores/statusMsgStore";
import { t } from "../../i18n";

/**
 * 交付卡片 —— 在会话列表里展示 deliver 工具交付的文件。
 *
 * **数据只来自 tool.input，不读 tool.output**：会话重新加载时
 * （`sessionMerge.extractContent`）只解析 assistant 的 tool_use 块，
 * tool_result 的文本不会回绑到 ToolUse.output 上，只有实时流才绑
 * （`chatReduce` 的 `case "user"`）。渲染若依赖 output，切走再切回卡片就空了。
 *
 * input 是**边流边渲染**的：partial_json 每解析出一片就更新一次 input，
 * 所以 props 里随时可能是半截数据。normalizeDeliverInput 负责把认不出的丢掉，
 * 绝不抛 —— 渲染期抛错会被 ErrorBoundary 捕获，代价是整条消息消失。
 */
export function DeliverCard({ input }: { input: Record<string, unknown> | undefined }) {
  const payload = useMemo(() => normalizeDeliverInput(input), [input]);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
  };

  const openItem = async (item: DeliverItem) => {
    // 删除的文件点了没法预览，也不该假装成功：openPathInEditor 会回退到
    // 资源管理器，但对已删除的路径那同样会失败 —— 此时明确告诉用户。
    const ok = await openReference({
      type: "file",
      path: item.path,
      ...(item.label ? { label: item.label } : {}),
    });
    if (!ok) addStatusMessage(t("message.deliverFailed", { path: item.path }), "error");
  };

  if (payload.items.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={headerStyle}>
          <Package size={13} />
          <span style={{ fontWeight: 600 }}>{t("message.deliverTitle")}</span>
        </div>
        <div style={{ padding: "6px 10px", fontSize: 12, color: "var(--fg-muted)" }}>
          {t("message.deliverEmpty")}
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <Package size={13} />
        <span style={{ fontWeight: 600 }}>{t("message.deliverTitle")}</span>
        <span style={{ color: "var(--fg-muted)", fontSize: 11, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {payload.summary ?? `${payload.items.length}`}
        </span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 2, flexShrink: 0 }}>
          <IconBtn
            title={t("message.deliverCopyAll")}
            onClick={() => copy(payload.items.map((i) => i.path).join("\n"), "__all")}
            active={copied === "__all"}
          />
          <IconBtn
            title={t("message.deliverOpenExplorer")}
            onClick={() => openInExplorer(payload.items)}
            icon="explorer"
          />
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {payload.items.map((item, i) => (
          <div
            key={`${item.path}-${i}`}
            onClick={() => openItem(item)}
            title={`${item.path}\n${t("message.deliverOpenHint")}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              fontSize: 12,
              cursor: "pointer",
              borderTop: i === 0 ? "none" : "1px solid var(--border-light)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            <ActionGlyph action={item.action} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, flexShrink: 0 }}>
              {deliverItemLabel(item)}
            </span>
            {item.note && (
              <span style={{ color: "var(--fg-muted)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.note}
              </span>
            )}
            <span style={{ marginLeft: "auto", flexShrink: 0, display: "flex" }}>
              <IconBtn
                title={t("message.deliverCopyPath")}
                onClick={(e) => { e.stopPropagation(); copy(item.path, item.path); }}
                active={copied === item.path}
                small
              />
            </span>
          </div>
        ))}
      </div>

      {payload.dropped > 0 && (
        <div style={{ padding: "3px 10px", fontSize: 11, color: "var(--semantic-warning)" }}>
          {t("message.deliverDropped", { n: payload.dropped })}
        </div>
      )}
    </div>
  );
}

const ACTION_STYLE: Record<DeliverAction, { glyph: string; color: string }> = {
  created: { glyph: "+", color: "var(--semantic-success)" },
  modified: { glyph: "~", color: "var(--semantic-warning)" },
  deleted: { glyph: "×", color: "var(--semantic-error)" },
};

function ActionGlyph({ action }: { action: DeliverAction }) {
  const s = ACTION_STYLE[action];
  const label = t(
    action === "created" ? "message.deliverCreated"
      : action === "deleted" ? "message.deliverDeleted"
        : "message.deliverModified",
  );
  return (
    <span
      title={label}
      style={{
        width: 14, textAlign: "center", flexShrink: 0,
        color: s.color, fontWeight: 700, fontFamily: "monospace", fontSize: 13,
      }}
    >
      {s.glyph}
    </span>
  );
}

function IconBtn({
  title, onClick, active, small, icon,
}: {
  title: string;
  onClick: (e: MouseEvent) => void;
  active?: boolean;
  small?: boolean;
  /** 默认是复制 —— 交付卡片上绝大多数按钮都是"复制"。 */
  icon?: "copy" | "explorer";
}) {
  const size = small ? 11 : 12;
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: small ? 18 : 22, height: small ? 18 : 22,
        padding: 0, border: "none", borderRadius: 4,
        background: "transparent", color: active ? "var(--semantic-success)" : "var(--fg-muted)",
        cursor: "pointer", opacity: small ? 0.7 : 1,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.opacity = small ? "0.7" : "1"; }}
    >
      {icon === "explorer"
        ? <FolderOpen size={size} />
        : active ? <Check size={size} /> : <Copy size={size} />}
    </button>
  );
}

/** 在资源管理器里定位：取第一个条目所在目录（多文件时逐个打开会开一堆窗口）。 */
async function openInExplorer(items: DeliverItem[]) {
  const first = items[0];
  if (!first) return;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("open_in_explorer", { path: first.path });
  } catch {
    addStatusMessage(t("message.deliverFailed", { path: first.path }), "error");
  }
}

const cardStyle: CSSProperties = {
  alignSelf: "stretch",
  marginBottom: 6,
  fontSize: 12,
  fontFamily: "var(--font-sans)",
  border: "1px solid var(--border-light)",
  borderRadius: 6,
  overflow: "hidden",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  backgroundColor: "var(--semantic-info-subtle)",
  color: "var(--fg-primary)",
};
