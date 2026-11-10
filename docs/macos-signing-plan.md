# macOS 签名与公证 —— 接入方案（阶段 1）

> 现在是**阶段 0**：DMG 有了，但未签名、未公证，用户首次打开要「右键 → 打开」。
> 本文是把阶段 1 接上时需要做的事，写在这里免得下次重新调研一遍。
>
> 状态：**未实施**。等 Apple Developer 账号到手。

## 0. 费用与前置

| 项 | 费用 | 备注 |
|---|---|---|
| Apple Developer Program（个人） | **¥688 / 年**（$99） | 个人与公司同价 |
| Developer ID Application 证书 | 含在会员里 | ⚠️ **不是** "Apple Distribution"（那个只能上 App Store） |
| 公证（notarytool） | 免费、不限次数 | |
| GitHub Actions macOS runner | 免费 | 公开仓不限分钟 |

公司账号与个人同价，但要多一个 D-U-N-S 编码（免费，1–2 周）。**代号和界面上的显示名**
由证书决定，**只影响"关于"页和钥匙串**，不影响能不能装。

一次性准备：

1. 用 Apple ID 注册（2020 年后只能通过 **Apple Developer App**，网页端不再支持新注册）
2. 生成 CSR（任意平台都能做，Apple 文档假设用 Mac）→ 传上去 → 下载 `.cer` → 双击进钥匙串
3. 从钥匙串导出 `.p12`（设个密码）→ base64 → 存进 GitHub secrets

## 1. 为什么不能直接开 Tauri 的 `APPLE_SIGNING_IDENTITY`

Tauri 的签名发生在 **bundle 阶段**，但本仓的 `.app` 在那之后还要改：

```
cargo tauri build --bundles app     ← Tauri 在这里签
  ↓
embedIntoAppBundle()                ← 往 Contents/MacOS/ 里塞 claude / server /
  ↓                                   python / bin / extensions（见 build.ts）
D MG / zip
```

塞进去的每一个都是**新的 Mach-O**，Tauri 签的时候它们还不存在。

公证（notarytool）会逐个检查包内每个 Mach-O，任何一个没签/签名无效 → **整包拒绝**。
所以顺序必须是：

```
build → embed → 由内向外签 → 公证 → staple → 打 DMG
```

## 2. 需要三层不同的 entitlements

Hardened Runtime（公证的硬性要求）默认禁止一堆东西，而这个 app 里有三种
互相冲突的二进制：

| 目标 | entitlements | 为什么 |
|---|---|---|
| `claude`、`bun`（Bun 编译产物） | `allow-jit`、`allow-unsigned-executable-memory`、`disable-executable-page-protection`、`allow-dyld-environment-variables` | 内嵌 JavaScriptCore，运行时 JIT。**没有 `allow-jit` 会启动即崩**（`Ran out of executable memory`），而且**只有签名版才崩**——本地开发完全看不到 |
| 内置 `python`（含 `mcp` / pydantic-core 的 `.so`） | `disable-library-validation` | 装进来的 `.so` 不带同一个 Team ID，Hardened Runtime 默认拒绝加载 |
| `claude-gui-server`、`claude-code-gui`、其余 | 空（或不设 entitlements） | 纯 Rust，不需要额外放行 |

⚠️ **Bun 自己的签名不能直接沿用**：交叉编译出来的 arm64 只有链接器签名，
x86_64 可能还带着 Bun 的 Developer ID——两者都对不上追加进去的 payload，
**必须整体重签**。

⚠️ 签完要**真的跑一次**（`claude --version`），不能只看 `codesign -v` 通过。
签名有效但缺 entitlement 的二进制能过公证，第一次真正使用时才崩。

## 3. 接入点（代码已经留好）

`build.ts` 第 12 步（DMG）上面插一步签名即可。现在的调用顺序已经是对的
（`generateRelease` 里通过 `beforeManifest` 调 `embedIntoAppBundle`，DMG 在之后）。

大致形态：

```ts
// 12. 签名 + 公证（仅当 secrets 齐全）
if (PLATFORM === 'macos' && RELEASE_VER && process.env.APPLE_SIGNING_IDENTITY) {
  // ① 由内向外签：先签 Contents/MacOS/ 下每个可执行文件，再签 .app
  //    ⚠️ 顺序不能反——签完外层再改里面的文件，外层签名立刻失效
  // ② xcrun notarytool submit <zip> --wait
  // ③ xcrun stapler staple "Claude Code.app"
}
// 13. DMG（现有）
```

DMG 里的「首次打开请先读我.txt」由 `build-dmg.sh --first-run-note` 控制，
`build.ts` 已经按 `APPLE_SIGNING_IDENTITY` / `APPLE_CERTIFICATE` 是否存在自动决定 ——
**签名接上后不用改调用方，说明文件会自动消失**。

## 4. GitHub secrets

| secret | 内容 |
|---|---|
| `APPLE_CERTIFICATE` | `.p12` 的 base64 |
| `APPLE_CERTIFICATE_PASSWORD` | `.p12` 的密码 |
| `APPLE_SIGNING_IDENTITY` | 如 `Developer ID Application: Your Name (TEAMID)` |
| `APPLE_ID` | 开发者账号邮箱 |
| `APPLE_PASSWORD` | **App 专用密码**（不是账号密码） |
| `APPLE_TEAM_ID` | 10 位 Team ID |

CI 里还要一个临时钥匙串：`security create-keychain` → `import` → `set-key-partition-list`。
漏了最后一步 `codesign` 会卡在「找不到钥匙串密码」的交互提示里（无头环境直接挂）。

## 5. 验证清单（接上之后）

1. `codesign --verify --strict --deep "Claude Code.app"` 通过
2. `spctl -a -vvv -t exec "Claude Code.app"` 输出 `accepted / source=Notarized Developer ID`
3. **`xcrun stapler validate`** 通过（离线也能装）
4. 把 DMG 传到另一台**干净**的 mac（没有开发者证书）→ 双击 → **出现的是
   「无法验证开发者」，右键能打开**，**不是**「已损坏，移到废纸篓」
5. 装好后 `claude --version` 能跑（验 `allow-jit` 真的生效）
6. 插件面板能起（验 server 能跑）；Office MCP 能起（验 python 的 `.so` 加载）
7. `spctl` 在**断网**下也 accepted（验 staple 生效）

## 6. 一个容易忽略的点

裸 Mach-O **不能被 staple**——`stapler` 只支持 `.app` / `.pkg` / `.dmg`。
所以 `claude` 这个独立组件（走 zip 分发的那份）**没法离线验证**，它的票据
只能在线取。这不影响 `.app`（整包已经 staple 过），但如果哪天要单独分发
裸二进制，得把它包进 `.pkg`。
