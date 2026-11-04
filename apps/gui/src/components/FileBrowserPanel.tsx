import { useState } from "react";
import { Search, ListTree } from "lucide-react";
import FileTree from "./FileTree";
import { FileSearchPanel } from "./FileSearchPanel";
import { getSettings } from "../stores/settingsStore";
import { t } from "../i18n";
import { editorStore, isPreviewable } from "../stores/editorStore";
import { fileService } from "../services/fileService";
import { showCtxMenu } from "./ContextMenu";
import { useEvent, useEventHandler } from "../services/useService";
import { windowBus } from "../services/windowBus";
import { Events, type SettingsChangedPayload, type FileRevealPayload } from "../services/events";

/** 打开文件；给了 line 就跳过去（搜索命中用）。 */
async function openFileAt(path: string, line?: number) {
  const name = path.split(/[/\\]/).pop() || path;

  // ① 插件声明的文件类型优先（2026-10-28）—— 如 Office 文档。
  //    宿主只做路由，渲染全在插件里（见 services/pluginFileTypes.ts）。
  //
  //    走**编辑器预览标签**而不是浮窗：图片/PDF 的预览本来就在标签里，
  //    文档预览没道理另起一套窗口（EditorPanel 的 PreviewSurface 负责挑渲染器）。
  //
  //    给了 line 就**不**走插件：行号是给文本编辑器用的语义，
  //    在文档预览里没有对应物（搜索命中 .docx 时仍当普通文件开）。
  if (line === undefined) {
    const { findFileTypeHandler } = await import("../services/pluginFileTypes");
    if (findFileTypeHandler(path)) {
      editorStore.openPreview(path, name);
      return;
    }
  }

  // ② 内置预览（图片 / PDF）
  if (isPreviewable(path)) {
    editorStore.openPreview(path, name);
  } else {
    // ③ 其余按文本读进 Monaco
    const content = await fileService.readFile(path);
    editorStore.openFile(path, name, content, line ? { line } : undefined);
  }
}

export function FileBrowserPanel() {
  const settingsPayload = useEvent<SettingsChangedPayload>(Events.SETTINGS_CHANGED);
  const rootPath = settingsPayload?.settings?.workDir ?? (getSettings().workDir || null);
  const showHidden = settingsPayload?.settings?.showHiddenFiles ?? getSettings().showHiddenFiles ?? false;
  const [treeKey, setTreeKey] = useState(0);
  const refreshTree = () => setTreeKey((k) => k + 1);
  // 树 / 搜索 两种模式共用一个面板：找文件与找内容是同一件事的两半，放一起
  // 就不用记"另一个面板叫什么"（用户 2026-10-26 需求）。
  const [mode, setMode] = useState<"tree" | "search">("tree");

  // 编辑器"定位目录树" → 文件树展开祖先并选中目标(粘性事件, 面板延迟挂载也能收到)
  // 带 nonce：对同一文件再次定位时 path 不变，靠它让文件树重新滚动(见 events.ts)
  const [reveal, setReveal] = useState<{ path: string; nonce: number } | null>(null);
  useEventHandler<FileRevealPayload>(Events.FILE_REVEAL, ({ path, nonce }) => {
    setReveal({ path, nonce: nonce ?? 0 });
    windowBus.clearSticky(Events.FILE_REVEAL);
  });

  if (!rootPath) {
    return (
      <div style={{ padding: 16, color: "var(--fg-muted)", fontSize: 12, textAlign: "center", fontFamily: "var(--font-sans)" }}>
        {t("files.notConfigured")}
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      onContextMenu={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("[data-file-node]")) return; // handled by FileTree
        e.preventDefault();
        showCtxMenu(e.clientX, e.clientY, [
          { label: t("files.pasteFile"), action: async () => {
            try {
              const { invoke } = await import("@tauri-apps/api/core");
              const text: string = await invoke("read_clipboard_text");
              if (text && rootPath) {
                const srcPath = text.trim();
                const fname = srcPath.split(/[/\\]/).pop() || "pasted_file";
                const sep = navigator.platform.toUpperCase().includes("WIN") ? "\\" : "/";
                await invoke("copy_file", { src: srcPath, dst: rootPath + sep + fname });
                refreshTree();
              }
            } catch (e) { console.error("[FileBrowser] paste:", e); }
          }},
          { separator: true as any },
          { label: t("files.refresh"), action: refreshTree },
        ]);
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "4px 8px", borderBottom: "1px solid var(--border-light)",
        fontSize: 11, color: "var(--fg-muted)", fontFamily: "var(--font-sans)",
      }}>
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {rootPath}
        </span>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "tree" ? "search" : "tree"))}
          title={mode === "tree" ? t("files.searchTitle") : t("files.backToTree")}
          aria-label={mode === "tree" ? t("files.searchTitle") : t("files.backToTree")}
          aria-pressed={mode === "search"}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 20, height: 20, padding: 0, border: "none", borderRadius: 3,
            cursor: "pointer", flexShrink: 0,
            background: mode === "search" ? "var(--accent)" : "transparent",
            color: mode === "search" ? "var(--fg-inverse)" : "var(--fg-secondary)",
          }}
        >
          {mode === "tree" ? <Search size={14} /> : <ListTree size={14} />}
        </button>
      </div>
      {/* minHeight:0 + 不设 overflow —— 滚动交给 FileTree / FileSearchPanel 自己
          （否则工具栏会跟着一起滚） */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {mode === "tree" ? (
          <FileTree forceRefresh={treeKey} rootPath={rootPath} showHidden={showHidden} revealPath={reveal?.path ?? null} revealNonce={reveal?.nonce ?? 0} onOpenFile={openFileAt} />
        ) : (
          <FileSearchPanel
            rootPath={rootPath}
            showHidden={showHidden}
            onOpenHit={(p, line) => void openFileAt(p, line)}
          />
        )}
      </div>
    </div>
  );
}
