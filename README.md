# Lumen Agent Desktop

桌面客户端：Tauri 2 + React，为 [Claude Code](https://github.com/anthropics/claude-code) 提供图形界面。

多面板工作台（聊天 / 编辑器 / 文件树 / 终端 / 超级桌面 / 笔记 / 子代理），插件生态，内置 MCP 工具。

**License: [MIT](LICENSE)**

## 这是什么

Claude Code 本身是一个命令行工具。这个仓库提供一个桌面外壳：把它的能力放进带面板的图形界面里，
并补上 CLI 没有的东西 —— 无限画布（超级桌面）、笔记、文件预览、插件市场、GUI 专属 MCP 工具
（`deliver` 交付卡片、`desktop_*` 画布操作等）。

## 目录

```
apps/
  gui/                 Tauri 桌面客户端（Rust + React）
  extensions/          IDE 插件（VS Code / VS / IntelliJ / CDP）
  release-platform/    自托管更新服务器
packages/
  plugins/             GUI 插件（git-viewer / pointer / office-preview …）
  skills-src/          随包分发的技能源
build/
  build.ts             构建入口
  engine.ts            发布引擎（manifest / zip / 复用校验）
  installer/           Inno Setup 安装器
  updater/             更新器（Windows）
docs/                  设计文档、架构说明、复盘
```

## 构建

### 前置

- [Bun](https://bun.sh) 1.3+
- Rust 工具链 + [Tauri 前置依赖](https://tauri.app/start/prerequisites/)

### 独立构建（只有 GUI）

```bash
bun install
cd apps/gui && bun install

# 从仓库根跑
bun run build/build.ts --claude-from <path/to/claude.exe>
```

`--claude-from` 指向一个已构建好的 `claude` 二进制。**不给也能构建** —— 产物可以运行，
只是没有 CLI 后端，聊天面板不可用。

### 与 CLI 仓联合构建（推荐，产物完整）

如果你还有 `claude-code-haha` 仓的本地副本：

```bash
bun run <claude-repo>/build/joint.ts --gui-repo <this-repo>
```

一条命令产出一整套（桌面端 + CLI + Python + Git + 工具链），manifest 统一生成。

### 产物

全部落在 `dist/`：

| 路径 | 内容 |
|---|---|
| `dist/claude-code-gui.exe` | 桌面客户端 |
| `dist/claude-gui-server.exe` | 后台服务 |
| `dist/release/<version>/` | 更新包（manifest + 各组件 zip） |

## 开发

```bash
cd apps/gui
bun run dev        # Vite 热更新
bun run test       # Vitest
cargo tauri dev    # 完整桌面调试
```

## 架构

见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。GUI 与后端之间走 WebSocket；
画布、笔记等状态由 Rust 侧持久化到 SQLite；MCP 工具通过内置 HTTP 服务器暴露给模型。

## 相关

- `claude` CLI 由单独的项目构建后提供，不在本仓库内
