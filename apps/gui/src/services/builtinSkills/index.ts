// GUI 内置技能的投放。
//
// 这些技能讲的是 `desktop_*` MCP 工具 —— 只有 GUI 进程提供它们。
// 所以内容留在 GUI 侧，启动时投影进 `~/.claude/skills/`，纯 CLI 不会碰到。
//
// 和插件技能的区别：插件技能要用户装插件、走软链；这里是 GUI 自带，
// 用户零操作。

import {
  SKILL_NAME as SUPER_DESKTOP,
  skillFingerprint as superDesktopFingerprint,
  skillFiles as superDesktopFiles,
} from "./superDesktopSkill";

interface BuiltinSkill {
  name: string;
  fingerprint: () => string;
  files: () => Record<string, string>;
}

const BUILTIN_SKILLS: BuiltinSkill[] = [
  {
    name: SUPER_DESKTOP,
    fingerprint: superDesktopFingerprint,
    files: superDesktopFiles,
  },
];

/**
 * 把内置技能写到 `~/.claude/skills/`。
 *
 * 幂等：指纹没变就跳过；用户自己建了同名目录（且没有 GUI 标记）也跳过，
 * 不覆盖用户的东西。整件事失败也不影响启动 —— 技能只是少了参考资料。
 */
export async function syncBuiltinSkills(): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    for (const skill of BUILTIN_SKILLS) {
      try {
        const r = await invoke<{ written: boolean; skipped?: string }>(
          "sync_builtin_skill",
          {
            name: skill.name,
            fingerprint: skill.fingerprint(),
            files: skill.files(),
          },
        );
        if (r.skipped === "exists-but-not-gui-managed") {
          console.warn(
            `[builtinSkill] ${skill.name}: ~/.claude/skills 下已有同名目录且非 GUI 管理，跳过`,
          );
        }
      } catch (e) {
        console.warn(`[builtinSkill] ${skill.name} 同步失败:`, e);
      }
    }
  } catch {
    // 非 Tauri 环境（浏览器开发）没有 invoke，静默跳过
  }
}
