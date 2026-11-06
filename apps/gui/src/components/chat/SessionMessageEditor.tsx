// ── 会话消息编辑：按「轮」删除 ──
//
// 用途：用户在一轮里发错了内容，想把那一轮抹掉。
//
// ## 为什么是「轮」不是「条」
//
// transcript 是 parentUuid 链表。中间删一条会让加载器在断点处**截断**，
// 之前的历史全部看不见；更糟的是删掉 tool_use 或 tool_result 的任一侧，
// 会话恢复时 API 会直接拒绝。按轮删（一条真实用户输入 + 它后面直到下一条
// 用户输入的全部内容）天然保住这两件事。后端 sessionTurns.ts 里做链表修复。
//
// ## 为什么不用「先切走再删」
//
// 用户 2026-11-06 的定案：**interrupt 当前回合即可**。后端只在「当前会话」
// 上追加写，interrupt 后不会有新写入；删完由后端自己重载一次，
// 内存与磁盘就一致了，不需要多一次切会话的写盘窗口。

import { useCallback, useEffect, useMemo, useState } from "react";
import { X, Trash2, AlertTriangle, ChevronRight, ChevronDown } from "lucide-react";
import { t } from "../../i18n";
import {
  waitForSessionEditMessage,
  useSessionMessagesPayload,
  type SessionTurnInfo,
} from "../../services/sessionEditBridge";
import { mergeSessionMessages } from "../../chat/sessionMerge";
import type { ChatMessage } from "../../stores/chatStore";
import { MessageItem } from "./MessageItem";
import { chatSession } from "../../chat/chatSession";
import { addStatusMessage } from "../../stores/statusMsgStore";

const send = (type: string, payload?: unknown) =>
  chatSession.send(type, payload as never);

interface Props {
  sessionId: string;
  sessionTitle?: string;
  onClose: () => void;
}

/** 把一轮的 entries 转成可渲染的 ChatMessage（复用主聊天同一套合并逻辑）。 */
function turnMessages(
  turn: SessionTurnInfo,
  entries: { uuid?: string; type?: string; isMeta?: boolean; message?: Record<string, unknown> }[],
): ChatMessage[] {
  const want = new Set(turn.uuids);
  const slice = entries.filter((e) => e.uuid && want.has(e.uuid));
  try {
    return mergeSessionMessages(slice as never, () => crypto.randomUUID());
  } catch {
    return [];
  }
}

export function SessionMessageEditor({ sessionId, sessionTitle, onClose }: Props) {
  const payload = useSessionMessagesPayload();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 打开时拉一次
  useEffect(() => {
    setSelected(new Set());
    setExpanded(new Set());
    setError(null);
    // 空 id 直接报错、不发请求 —— 否则后端拿 undefined 拼出 `undefined.jsonl`
    if (!sessionId) {
      setError(t("sessionEdit.loadFailed"));
      return;
    }
    try {
      send("load_session_messages", { session_id: sessionId });
    } catch {
      setError(t("sessionEdit.loadFailed"));
    }
  }, [sessionId]);

  const turns = useMemo(
    () => (payload?.sessionId === sessionId ? payload.turns : []),
    [payload, sessionId],
  );
  const entries = useMemo(
    () => (payload?.sessionId === sessionId ? payload.entries : []),
    [payload, sessionId],
  );

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const doDelete = useCallback(async () => {
    if (selected.size === 0 || busy || !sessionId) return;
    const ok = window.confirm(
      t("sessionEdit.confirm", {
        n: String(selected.size),
      }),
    );
    if (!ok) return;

    setBusy(true);
    setError(null);
    try {
      const wait = waitForSessionEditMessage("session_turns_deleted", 30000);
      send("delete_session_turns", {
        session_id: sessionId,
        turn_ids: [...selected],
      });
      await wait;
      addStatusMessage(t("sessionEdit.deleted", { n: String(selected.size) }), "success");
      setSelected(new Set());
      // 后端删完若正是当前会话，会自己重载并发 session_loaded —— 消息区已刷新。
      // 这里再拉一次编辑面板自己的数据。
      send("load_session_messages", { session_id: sessionId });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [selected, busy, sessionId]);

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={S.header}>
          <div style={{ minWidth: 0 }}>
            <div style={S.title}>{t("sessionEdit.title")}</div>
            <div style={S.sub} title={sessionTitle}>
              {sessionTitle || sessionId.slice(0, 8)}
            </div>
          </div>
          <button type="button" onClick={onClose} style={S.iconBtn} title={t("sessionEdit.close")}>
            <X size={16} />
          </button>
        </div>

        <div style={S.hint}>
          <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{t("sessionEdit.hint")}</span>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <div style={S.list}>
          {turns.length === 0 && <div style={S.empty}>{t("sessionEdit.empty")}</div>}
          {turns.map((turn, i) => {
            const checked = selected.has(turn.id);
            const open = expanded.has(turn.id);
            const msgs = open ? turnMessages(turn, entries) : [];
            return (
              <div key={turn.id} style={{ ...S.turnCard, ...(checked ? S.turnCardChecked : null) }}>
                <div style={S.turnHead}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(turn.id)}
                    style={{ margin: 0, cursor: "pointer", flexShrink: 0 }}
                  />
                  <button
                    type="button"
                    onClick={() => toggleExpand(turn.id)}
                    style={S.expandBtn}
                    title={open ? t("sessionEdit.collapse") : t("sessionEdit.expand")}
                  >
                    {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  <span style={S.turnIdx}>#{i + 1}</span>
                  <span style={S.turnPreview} title={turn.preview}>
                    {turn.preview}
                  </span>
                  <span style={S.turnCount}>{turn.entryCount}</span>
                </div>
                {open && (
                  <div style={S.turnBody}>
                    {msgs.length === 0 ? (
                      <div style={S.emptySmall}>{t("sessionEdit.noMessages")}</div>
                    ) : (
                      msgs.map((m) => <MessageItem key={m.id} message={m} animateIn={false} />)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={S.footer}>
          <span style={S.selectedInfo}>
            {t("sessionEdit.selected", { n: String(selected.size) })}
          </span>
          <button
            type="button"
            onClick={doDelete}
            disabled={selected.size === 0 || busy}
            style={{
              ...S.dangerBtn,
              opacity: selected.size === 0 || busy ? 0.45 : 1,
              cursor: selected.size === 0 || busy ? "default" : "pointer",
            }}
          >
            <Trash2 size={14} />
            {busy ? t("sessionEdit.deleting") : t("sessionEdit.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

/** 导出仅供测试断言关键布局约束（见 sessionMessageEditorStyles.test.ts）。 */
export const S: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000,
  },
  dialog: {
    width: "min(860px, 92vw)",
    height: "min(760px, 88vh)",
    background: "var(--bg-root)",
    color: "var(--fg-primary)",
    border: "1px solid var(--border-medium)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,.45)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    padding: "12px 16px",
    borderBottom: "1px solid var(--border-light)",
  },
  title: { fontSize: 14, fontWeight: 600 },
  sub: { fontSize: 12, color: "var(--fg-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  iconBtn: {
    border: "none", background: "none", cursor: "pointer",
    color: "var(--fg-muted)", padding: 2, display: "flex", flexShrink: 0,
  },
  hint: {
    display: "flex", gap: 8, alignItems: "flex-start",
    padding: "8px 16px",
    fontSize: 12, lineHeight: 1.6,
    color: "var(--fg-secondary)",
    background: "var(--accent-subtle)",
    borderBottom: "1px solid var(--border-light)",
  },
  error: {
    padding: "8px 16px", fontSize: 12,
    color: "var(--danger, #e5645f)",
    borderBottom: "1px solid var(--border-light)",
  },
  list: { flex: "1 1 auto", overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 },
  empty: { padding: "32px 12px", textAlign: "center", color: "var(--fg-muted)", fontSize: 12 },
  emptySmall: { padding: "10px 4px", color: "var(--fg-muted)", fontSize: 12 },
  turnCard: {
    border: "1px solid var(--border-light)",
    borderRadius: 8,
    background: "var(--bg-surface)",
    overflow: "hidden",
    // 列表是 column flex 容器，子项默认 flex-shrink:1。轮数一多（真实会话
    // 72 轮）就把每张卡压成 2px —— 界面上看起来就是一排横线。
    // 必须在**主轴方向上禁止收缩**。
    flexShrink: 0,
  },
  turnCardChecked: {
    borderColor: "var(--accent)",
    boxShadow: "inset 3px 0 0 var(--accent)",
  },
  turnHead: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px" },
  expandBtn: {
    border: "none", background: "none", cursor: "pointer", padding: 0,
    color: "var(--fg-muted)", display: "flex", flexShrink: 0,
  },
  turnIdx: { fontSize: 11, color: "var(--fg-muted)", flexShrink: 0, fontVariantNumeric: "tabular-nums" },
  turnPreview: {
    flex: "1 1 auto", fontSize: 13,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  turnCount: { fontSize: 11, color: "var(--fg-muted)", flexShrink: 0 },
  turnBody: { borderTop: "1px solid var(--border-light)", padding: "4px 10px 10px" },
  footer: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 12, padding: "10px 16px",
    borderTop: "1px solid var(--border-light)",
  },
  selectedInfo: { fontSize: 12, color: "var(--fg-muted)" },
  dangerBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    border: "none", borderRadius: 6, padding: "7px 14px",
    fontSize: 12.5, fontWeight: 500, fontFamily: "var(--font-sans)",
    background: "var(--danger, #e5645f)", color: "#fff",
  },
};
