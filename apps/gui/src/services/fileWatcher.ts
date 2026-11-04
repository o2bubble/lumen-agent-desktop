// ── 已打开文件的变更监听 ──
//
// 做什么：编辑器里打开的每个文件（文本 + 所有预览类型）如果被外部改动
// （用别的编辑器保存、脚本写入、`git checkout` 切分支……），自动重新加载。
//
// ## 为什么是轮询而不是后端 inotify/FSEvents
//
// - 已打开文件通常个位数，每 1.5s 一轮 stat 的成本可以忽略
// - 不用引入新的原生依赖（`notify` 要额外编译、跨平台行为还不一致）
// - 判断"要不要刷新"本来就在前端（它知道哪些 tab 开着、哪些是预览）
//
// ## 判断"变了"的依据
//
// 后端返回 `{mtime, size, exists}`。任一项变化都算改过：
// - 只用 mtime 不够：有些工具在同一时间粒度内多次写
// - 加上 size 能挡住绝大多数情况，代价仍只有一次 stat

import { Events } from "./events";
import { getSettings } from "../stores/settingsStore";
import { editorStore } from "../stores/editorStore";
import { windowBus } from "./windowBus";

/** 轮询间隔。太短浪费 CPU，太长用户会觉得"改了没反应"。 */
const POLL_MS = 1500;

interface FileSignature {
  path: string;
  mtime: number;
  size: number;
  exists: boolean;
}

/** 上次看到的签名：path → "mtime:size" */
const seen = new Map<string, string>();

function sigKey(s: FileSignature): string {
  return `${s.mtime}:${s.size}`;
}

function isEnabled(): boolean {
  // 缺省开启 —— 写 `!== false` 而不是 `=== true`
  return getSettings().autoReloadOnExternalChange !== false;
}

let timer: ReturnType<typeof setInterval> | null = null;
let polling = false;

async function pollOnce(): Promise<void> {
  if (polling) return; // 上一轮还没回来（磁盘慢/文件多），跳过这轮
  const paths = editorStore.tabs.map((t) => t.path);
  if (!paths.length) {
    seen.clear();
    return;
  }

  polling = true;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const sigs = await invoke<FileSignature[]>("file_signatures", { paths });

    const livePaths = new Set(paths);
    for (const s of sigs) {
      // 后端可能返回我们这轮没问的路径（上一轮的遗留 / 竞态），一律忽略 ——
      // 否则标签关掉后还会收到它的"变更"通知（测试抓到的真实场景）。
      if (!livePaths.has(s.path)) continue;

      const prev = seen.get(s.path);

      // 第一次见到它：只记下来，不算"改动"
      if (prev === undefined) {
        seen.set(s.path, sigKey(s));
        continue;
      }

      const now = sigKey(s);
      if (prev === now) continue;
      seen.set(s.path, now);

      if (!s.exists) {
        // 文件被删/改名：交给现有逻辑标记（标签上会显示删除态）
        windowBus.emit(Events.FILE_CHANGED, { path: s.path });
        continue;
      }
      windowBus.emit(Events.FILE_CHANGED, { path: s.path });
    }

    // 清理已关闭的标签
    const live = new Set(paths);
    for (const k of [...seen.keys()]) {
      if (!live.has(k)) seen.delete(k);
    }
  } catch {
    // 监听失败不该影响任何主流程，静默跳过这轮
  } finally {
    polling = false;
  }
}

/** 启动监听（重复调用无副作用）。 */
export function startFileWatcher(): void {
  if (timer) return;
  timer = setInterval(() => {
    if (!isEnabled()) return;
    void pollOnce();
  }, POLL_MS);
}

/** 停掉（目前只有测试/调试用得到）。 */
export function stopFileWatcher(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  seen.clear();
}

/** 供测试：手动触发一轮。 */
export const __pollOnceForTest = pollOnce;
