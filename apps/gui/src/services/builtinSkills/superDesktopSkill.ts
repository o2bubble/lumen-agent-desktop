// 超级桌面的排版技能内容 —— 内联成字符串，运行时写盘。
//
// ## 为什么不做成 claude 的内置技能
//
// `desktop_*` 这套 MCP 工具**完全由 GUI 进程提供**（见 App.tsx 的
// startMcpBridge）。纯 CLI 模式下这些工具根本不存在，把技能编进 claude.exe
// 只会给 CLI 用户塞一份永远用不上的东西。
//
// 所以：内容留在 GUI 侧，GUI 启动时投影进 `~/.claude/skills/super-desktop`。
// 纯 CLI 不启动 GUI，自然不会写。
//
// ## 为什么内联而不是读文件
//
// 打包后的 GUI 只有 exe，`gui/src/...` 这些目录不存在。内联成字符串是唯一
// 不依赖运行时资源路径的做法（同 superDesktopContent 当初的教训：
// `.md` 经某些 loader 会被渲染成 HTML，字符串没有这个问题）。
//
// 文件内容通过 Vite 的 `?raw` 直接引入（构建时内联成字符串），
// 所以改文档只需要改 `super-desktop/` 下的原文件，不用同步第二份。

import skillMd from './super-desktop/SKILL.md?raw'
import itemTypesMd from './super-desktop/references/item-types.md?raw'
import cheatsheetMd from './super-desktop/references/tool-cheatsheet.md?raw'
import layoutPy from './super-desktop/scripts/layout.py?raw'

/** 技能目录名 —— 也是 `~/.claude/skills/<name>` 的名字 */
export const SKILL_NAME = 'super-desktop';

/**
 * 内容指纹。改了上面任一文件，这个值会变 → 触发重新写盘。
 *
 * 不比较 mtime：打包后的内容没有真实文件时间；也不比较全量内容：读一次要
 * 遍历所有文件，而这里只是要一个"变没变"的信号。
 */
export function skillFingerprint(): string {
  const all = [skillMd, itemTypesMd, cheatsheetMd, layoutPy].join('\u0000');
  // FNV-1a 32 位，够用且不用引 crypto
  let h = 0x811c9dc5;
  for (let i = 0; i < all.length; i++) {
    h ^= all.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16) + '-' + all.length;
}

/** 相对路径 → 内容。路径用正斜杠，Rust 侧统一处理分隔符。 */
export function skillFiles(): Record<string, string> {
  return {
    'SKILL.md': skillMd,
    'references/item-types.md': itemTypesMd,
    'references/tool-cheatsheet.md': cheatsheetMd,
    'scripts/layout.py': layoutPy,
  };
}
