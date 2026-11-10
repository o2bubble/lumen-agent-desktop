# macOS 兼容性现状

> 2026-11-10 做的一轮「回过头看 mac 适配」的结论。
> 目标平台：**arm64 / macOS 14+**（只出 Apple Silicon，见 `macos-build-playbook.md`）。
>
> 这份文档只记**差异**，不重复功能说明。改 mac 相关代码前先扫一眼，
> 别把已经踩过的坑再挖一遍。

## 一、本轮修掉的（有代码改动）

| # | 问题 | 影响 | 位置 |
|---|---|---|---|
| 1 | **进程启动时刻在 mac 上恒为 `None`** | 实例判活永远为假 → 工作区锁被当成过期、升级后窗口/会话恢复全丢、`wait_for_new_instance` 必然超时 | `shared/src/instances.rs`（新增 `proc_pidinfo` 实现） |
| 2 | `process_alive` 非 Windows 恒 `false` | 同上，锁竞争时误判持有者已死 | `src/lib.rs` |
| 3 | **`app_data_dir_early()` 与 Tauri 的 `app_data_dir()` 在 mac 上不同路径** | GUI 写 `~/Library/Application Support/<id>`，早期逻辑读 `~/.config/<id>` → 清理工具看不到别的实例（会把别人正在用的工作区当清理目标）、server 看不到实例 | `shared/src/instances.rs` |
| 4 | GUI 从 Finder 启动时 PATH 里没有 Homebrew | `node` / `git` / `python`（用户自己装的）全部找不到 | `src/lib.rs` `prepend_tool_dirs`（补 `/opt/homebrew/bin` 等） |
| 5 | `app_relaunch` 在 mac 上直接 spawn 二进制 | 绕过 LaunchServices：Dock 归属、激活策略、TCC 权限都不对 | `src/lib.rs` 新增 `spawn_detached_instance()` |
| 6 | 更新完成后不重启、也不杀旧进程 | 用户必须手动打开新版本；server 带着旧代码继续跑（Windows 侧 2026-10-27 同一个坑） | `src/update.rs` `launch_updater_and_exit` |
| 7 | macOS 提权安装的 shell 引用错误 | 单引号里转义 `\` / `"` 反而改写路径；`claude` 组件取「zip 里第一个文件」而不是按名字找 | `src/update.rs` |
| 8 | mac 上只 kill 直接子进程 | `node` 再 spawn 的孙进程被 init 收养 → 孤儿（cwd 钉在插件目录 → 卸载报 os error 32） | `src/lib.rs` 新增 `kill_process_tree()`；`plugin_process.rs` / `backend.rs` 改用它 |
| 9 | 前端快捷键文案写死 `Ctrl+` | mac 上实际是 ⌘，帮助文案全错 | `i18n/*.ts` 改 `{mod}` 占位符 + `t()` 里按平台替换 |
| 10 | 多选只认 `ctrlKey` | mac 上 Ctrl+click 是**右键**，多选按不出来 | `DesktopItemView.tsx` |
| 11 | 文件树删除只认 `Delete` 键 | mac 笔记本键盘没有 Delete（发 Backspace）→ **没有任何键盘删除入口** | `FileTree.tsx`（补 ⌘⌫） |
| 12 | `Ctrl+Enter` 发送 | mac 惯例是 ⌘↩ | `InputArea.tsx`（两者都认） |
| 13 | `force_foreground` 非 Windows 硬编码 `false` | 每次成功聚焦都打一条假警告，真问题反而看不见 | `src/lib.rs`（改成核对 `is_focused()`） |
| 14 | `count_gui_instances` 非 Windows 恒 1 | 全局热键冲突时无法区分「别的实例」和「别的软件」 | `src/lib.rs`（改读实例注册表） |
| 15 | mono 字体栈只有 Cascadia / Consolas | mac 上代码块和终端字体回退难看 | `tokens.css`（补 SF Mono / Menlo） |
| 16 | `build.ts` 自带一份 `KNOWN_COMPONENTS`，漏了 `claude` | `--components claude` 打印「未知组件」却照常构建 → 日志说谎 | `build/build.ts` 改用 `componentPlan.ts` 的清单 |

## 二、已知差异，但**没做**（有意或待做）

| 项 | 现状 | 说明 |
|---|---|---|
| **菜单栏托盘** | **没有**。`server/src/tray.rs` 的 `spawn()` 在非 Windows 直接返回 `None` | mac 的状态栏项必须在主线程 + NSApplication 事件循环里创建，而 server 是 tokio 程序、没有 AppKit 主循环。要做得单开（换 Tauri 内建 tray 或给 server 起 AppKit loop）。**mac 用户目前只能通过 Dock 切换/退出。** |
| 自启动 | 没有实现（Windows 也没有） | 要做得用 `SMAppService`（macOS 13+）或 LaunchAgent |
| 公证 / 签名 | 没有 | **阶段 0**：DMG 已能产出（`scripts/macos/build-dmg.sh`），但未签名未公证，用户首次需「右键 → 打开」。**⏸ 阶段 1 已搁置**（2026-11-10，「以后再说」，触发条件=买 Apple 账号）；接入方案已备在 `macos-signing-plan.md` |
| Intel mac | 不支持 | 全链路硬编码 aarch64 |
| 进程树击杀的**极端**情况 | mac 用 `pkill -P` + SIGTERM→1s→SIGKILL | 不是真正的进程组语义；如果子进程自己再 detach（`setsid`），还是会漏。Windows 侧是 Win32 原生树杀 |

## 三、**必须在真机验证**（这台机器没有 mac，全部未经运行验证）

按风险从高到低：

1. **`app_data_dir_early()` 的路径是否真的与 Tauri 一致** —— 这是本轮改动里唯一「靠推断而不是实测」的路径。
   验证：启动 GUI，`ls ~/Library/Application\ Support/com.claudecode.gui/instances/` 应有 `instances/<pid>.json`；
   清理工具里「其他实例工作区」不再为空。
2. **实例判活**：开两个窗口 → 关一个 → 另一个的「新建窗口/恢复」逻辑不把它当活着。
3. **PATH 注入**：GUI 里开终端，`which node` / `which git` 能解析到 Homebrew 的版本。
4. **更新流程**：跑一次假更新（或手工替换 .app），确认 `osascript` 提权对话框出现、替换后自动重启。
5. **⌘⌫ 删文件**、**⌘ Enter 发送**、**⌘ 点击多选**。
6. **孤儿进程**：装一个插件 → 杀 GUI → `ps aux | grep <plugin>` 应无残留。

## 四、给后续改动的提醒

- **任何「早期」路径与「Tauri 路径」必须同值**。改 `APP_BUNDLE_ID` 或数据目录规则时，两处一起改。
- **别在 mac 上用 `Command::new("kill")` 只杀直接子进程** —— 用 `crate::kill_process_tree(pid)`。
- **shell 引用**：单引号里 `'` → `'\''`，其余原样；AppleScript 双引号字符串要再转义一层。
- **前端快捷键**：优先用 `services/shortcuts.ts` 的 `matchesEvent` / `displayKeys`，文案用 `{mod}` 占位符，别手写 `Ctrl`。
- 平台判断统一走 `utils/platform.ts`（`isMacPlatform()`），不要各处再写 `navigator.platform` 正则。
