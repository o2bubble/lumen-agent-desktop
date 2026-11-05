// ── 插件钩子对账（contributes.hooks → ~/.claude/settings.json）──
//
// 与 syncPluginSkillLinks 同一心智：**每次插件重扫做一次全量对账**，
// 不依赖"安装时写一次"。插件在 → 钩子在；卸载/禁用/手改坏了 → 下次重扫自愈。
//
// 宿主只负责把声明翻译成命令并落盘（Rust `sync_plugin_hooks`）；
// 判定逻辑全在被调用的脚本里。

import type { PluginManifest } from "./pluginRegistry";

export interface PluginHookSpec {
  plugin: string;
  event: string;
  script: string;
  runner: string;
  timeout?: number;
  matcher?: string;
}

/** 从当前启用插件集合里摊平出全部钩子声明。纯函数，可单测。 */
export function collectPluginHooks(manifests: PluginManifest[]): PluginHookSpec[] {
  const out: PluginHookSpec[] = [];
  for (const m of manifests) {
    const hooks = m.contributes?.hooks;
    if (!hooks) continue;
    for (const [event, decls] of Object.entries(hooks)) {
      for (const d of decls) {
        out.push({
          plugin: m.pluginName,
          event,
          script: d.script,
          runner: d.runner ?? "bun",
          ...(d.timeout !== undefined ? { timeout: d.timeout } : {}),
          ...(d.matcher !== undefined ? { matcher: d.matcher } : {}),
        });
      }
    }
  }
  return out;
}

/**
 * 把当前启用插件的钩子同步进引擎设置。
 *
 * 失败只告警 —— 钩子不可用不该阻断插件本身（面板/命令照常）。
 * 每次重扫都会调用，所以一次失败下次还有机会。
 */
export async function syncPluginHooks(manifests: PluginManifest[]): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const specs = collectPluginHooks(manifests);
    const res = (await invoke("sync_plugin_hooks", { specs })) as
      | { added?: number; removed?: number; written?: boolean }
      | undefined;
    if (res?.written) {
      console.info(
        `[plugin] hooks 已更新: +${res.added ?? 0} / -${res.removed ?? 0}`,
      );
    }
  } catch (e) {
    console.warn("[plugin] syncPluginHooks 失败（插件钩子可能不生效）:", e);
  }
}
