// ── 会话消息编辑：WS 消息通道 ──
//
// 「按轮删除」需要两条新的后端消息（load_session_messages / session_turns_deleted）。
// 它们与聊天主流程无关，塞进 chatReduce 只会让那个本就庞大的 reducer 再多两个
// 分支；这里开一条独立的小通道：chatSession 在 dispatch 之前转一手。
//
// ⚠️ **必须在 dispatch 之前转发**：dispatch 里对未知类型是静默忽略的，
// 但如果将来有人给同名类型加了 reducer 分支，两条路会各自处理一次。

import { useEffect, useState } from "react";

/** 一轮 = 一条真实用户输入 + 它后面直到下一条用户输入的全部内容。 */
export interface SessionTurnInfo {
  id: string;
  preview: string;
  entryCount: number;
  /** 本轮包含的 entry uuid（前端据此切出可渲染的消息） */
  uuids: string[];
}

/** transcript 里的一条原始记录（只带渲染需要的字段）。 */
export interface SessionRawEntry {
  uuid?: string;
  type?: string;
  isMeta?: boolean;
  message?: Record<string, unknown>;
}

export interface SessionMessagesPayload {
  sessionId: string;
  turns: SessionTurnInfo[];
  entries: SessionRawEntry[];
}

type Listener = (msg: Record<string, unknown>) => void;

const listeners = new Set<Listener>();

/** chatSession 在 dispatch 之前调用。未知类型直接忽略。 */
export function forwardSessionEditMessage(msg: Record<string, unknown>): void {
  const t = msg.type;
  if (t !== "session_messages" && t !== "session_turns_deleted") return;
  for (const fn of listeners) {
    try {
      fn(msg);
    } catch (e) {
      console.warn("[sessionEdit] listener error:", e);
    }
  }
}

function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * 等一条指定类型的消息。
 *
 * 用 Promise 而不是常驻订阅：编辑面板是**请求-应答**式交互，一次性等待
 * 比"订阅 + 自己判断这次响应属于哪次请求"简单得多，也不会串台
 * （delete 和 load 的响应类型不同，各等各的）。
 */
export function waitForSessionEditMessage(
  type: "session_messages" | "session_turns_deleted",
  timeoutMs = 15000,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let done = false;
    const off = subscribe((msg) => {
      if (done || msg.type !== type) return;
      done = true;
      off();
      clearTimeout(timer);
      resolve(msg);
    });
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      off();
      reject(new Error("后端未响应（超时）"));
    }, timeoutMs);
  });
}

/** 面板用：拿到最近一次 session_messages 的原始载荷。 */
export function useSessionMessagesPayload() {
  const [payload, setPayload] = useState<SessionMessagesPayload | null>(null);
  useEffect(
    () =>
      subscribe((msg) => {
        if (msg.type !== "session_messages") return;
        setPayload({
          sessionId: String(msg.session_id ?? ""),
          turns: (msg.turns as SessionTurnInfo[]) ?? [],
          entries: (msg.entries as SessionRawEntry[]) ?? [],
        });
      }),
    [],
  );
  return payload;
}
