// ── 文件类型关联：把「双击某类文件」路由到插件面板 ──
//
// 背景（2026-10-28）：插件之前只能贡献面板/命令/事件/MCP 工具/skill，
// **没有任何"这类文件归我"的声明方式**。于是双击 .docx 会走"当文本读"的
// 老路，在 Monaco 里显示一片乱码。
//
// 这里补上缺失的那一环：插件在 manifest 里声明
//
//     "contributes": {
//       "fileTypes": [{ "extensions": ["docx"], "panelId": "preview" }]
//     }
//
// 宿主**只做路由** —— 命中后缀就打开那个面板，把文件路径作为参数传过去。
// 怎么渲染、怎么读二进制、失败怎么提示，全部归插件：平台不认识 docx，
// 也不该认识。
//
// 为什么复用「面板」而不是发明新机制：插件面板本来就是一个能自己渲染的
// iframe，白拿多开/浮动/复用/主题适配。新增基础设施为零。

import { getActiveManifests, type PluginManifest, type PluginFileType } from "./pluginRegistry";

/** 一次命中的结果：该由哪个插件的哪个面板接手。 */
export interface FileTypeMatch {
  pluginName: string;
  /** 完整面板 id（`plugin:<plugin>:<panelId>`），可直接交给 openPluginPanel。 */
  fullPanelId: string;
  /** 传给面板的参数名（manifest 可自定义，缺省 `file`）。 */
  paramName: string;
  /** 命中的扩展名（小写、不带点）。 */
  ext: string;
}

/** 取路径的扩展名（小写、不带点）。没有扩展名返回空串。 */
export function extOf(path: string): string {
  const base = path.split(/[/\\]/).pop() ?? "";
  const i = base.lastIndexOf(".");
  // `.gitignore` 这种以点开头的隐藏文件不算"扩展名"
  if (i <= 0 || i === base.length - 1) return "";
  return base.slice(i + 1).toLowerCase();
}

/**
 * 在已加载的插件里找接盘者。
 *
 * 多个插件声明了同一扩展名时，**先注册的赢**（`getActiveManifests` 的顺序 =
 * 扫描顺序）。不做优先级排序：插件之间争抢同一后缀是配置问题，
 * 静默挑一个比报错更不打扰用户。
 *
 * 纯函数（除读取模块级清单外无副作用），便于测试。
 */
export function findFileTypeHandler(path: string): FileTypeMatch | null {
  const ext = extOf(path);
  if (!ext) return null;

  for (const m of getActiveManifests()) {
    const declared = m.contributes?.fileTypes ?? [];
    for (const ft of declared) {
      if (!ft.extensions.includes(ext)) continue;
      return {
        pluginName: m.pluginName,
        fullPanelId: `plugin:${m.pluginName}:${ft.panelId}`,
        paramName: ft.paramName ?? "file",
        ext,
      };
    }
  }
  return null;
}

/** 从 manifest 列表里找接盘者 —— 纯函数版本，供测试直接喂数据。 */
export function findFileTypeHandlerIn(
  manifests: PluginManifest[],
  path: string,
): FileTypeMatch | null {
  const ext = extOf(path);
  if (!ext) return null;
  for (const m of manifests) {
    const declared: PluginFileType[] = m.contributes?.fileTypes ?? [];
    for (const ft of declared) {
      if (!ft.extensions.includes(ext)) continue;
      return {
        pluginName: m.pluginName,
        fullPanelId: `plugin:${m.pluginName}:${ft.panelId}`,
        paramName: ft.paramName ?? "file",
        ext,
      };
    }
  }
  return null;
}
