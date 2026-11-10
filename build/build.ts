/**
 * Build script — compiles all exes + bundles dist/ + optionally generates update manifest.
 *
 * Usage:
 *   bun run scripts/build.ts                        # full build
 *   bun run scripts/build.ts --rebuild              # force cargo build for gui + updater
 *   bun run scripts/build.ts --quick               # skip steps with existing output
 *   bun run scripts/build.ts --release 2026.07.31  # build + generate update manifest + component zips
 *   bun run scripts/build.ts --release 2026.07.31 --notes "fix: ..."  # + release notes shown in the GUI update panel
 *   bun run scripts/build.ts --release 2026.07.31 --gui-only  # only re-zip gui; reuse other component zips from previous release
 *   bun run scripts/build.ts --release 2026.08.21.10 --components claude,gui  # 只重建/重打列出的组件，其余复用上一版本 zip + 现有 dist
 *     known components: gui, server, claude, bun, updater, tools, python, git, extensions
 *
 * --notes 写法（更新面板按 markdown 渲染，实现见 gui/src/utils/releaseNotesMarkdown.ts）：
 *   · 首行版本号；分节用 ###；条目用 -；版本之间用 --- 分隔
 *   · 每条一句话讲清「改了什么 + 为什么」；细节留给 commit，别堆长段
 *   · 只写本版内容 —— 历史由脚本自动拼接（见下方 MAX_RELEASE_NOTES）
 *   示例：
 *     v2026.09.10.2
 *
 *     ### 修复
 *     - 更新说明支持 markdown — 层级可读，**粗体** 不再是字面星号
 */

import { spawnSync } from 'bun'
import { existsSync, copyFileSync, mkdirSync, cpSync, writeFileSync, readdirSync, statSync, rmSync, readFileSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { homedir } from 'os'
import { type Platform, KNOWN_COMPONENTS } from './componentPlan'
import { generateRelease } from './engine'

const ROOT = resolve(import.meta.dir, '..')
const DIST = join(ROOT, 'dist')
const DIST_BIN = join(DIST, 'bin')   // CLI tools only (rg, fd, jq, yq, shellcheck)
const GUILDIR = join(ROOT, 'apps', 'gui', 'src-tauri')
const SERVERDIR = join(GUILDIR, 'server')   // GUI server daemon (独立二进制, 随 GUI 同目录分发)
const UPDDIR = join(ROOT, 'build', 'updater')
const BIN_DIR = join(ROOT, 'bin')

/**
 * 打印 `cargo tauri build` 的失败详情。
 *
 * **必须打 stdout**：cargo-tauri 把 `beforeBuildCommand`（前端 `tsc && vite build`）
 * 的报错写在 stdout，stderr 只有 "Info Looking up installed tauri packages..."
 * 这类进度噪声。只打 stderr 会让日志变成
 * `[Error] GUI build failed: Info Looking up...`，真正的类型错误全丢。
 *
 * 代价实例（2026-09-13）：.13.6 的 CI 失败，日志里看不到任何有用信息，
 * 排查一轮才从"快照分支有改名前的孤儿文件"定位到根因。
 *
 * 取 stdout 的**尾部**（前端错误在最后），避免把几千行 vite 输出全刷进日志。
 */
function reportGuiBuildFailure(build: { stdout: Buffer | string; stderr: Buffer | string; exitCode: number | null }) {
  const tail = (s: Buffer | string, n: number) =>
    s.toString().split('\n').filter((l) => l.trim()).slice(-n).join('\n')
  console.error(`[Error] GUI build failed (exit ${build.exitCode})`)
  console.error('--- stdout (tail) ---')
  console.error(tail(build.stdout, 40))
  const err = tail(build.stderr, 15)
  if (err) {
    console.error('--- stderr (tail) ---')
    console.error(err)
  }
}

// 构建目标平台解析（macOS 移植 seam: planComponents 决定每组件怎么构建/是否打包）。
// 默认自动检测当前 OS（Windows 构建行为与引入前完全一致；macOS 走平台分支）。
// 可用 --platform <macos|windows> 显式覆盖——注意执行层命令平台绑定
// （mac 的 ditto/pkgutil/zip vs Windows 的 powershell/Compress-Archive），
// 显式指定与当前 OS 不符的平台时各 step 大概率执行失败，该参数适合 CI 声明/规划场景。
function resolvePlatform(): Platform {
  const auto: Platform = process.platform === 'darwin' ? 'macos' : 'windows'
  const idx = process.argv.indexOf('--platform')
  if (idx < 0) return auto
  const arg = process.argv[idx + 1]
  if (arg === 'macos' || arg === 'windows') {
    if (arg !== auto) {
      console.warn(`  [Warn] --platform=${arg} 与当前 OS (${process.platform}) 不符 — 平台构建命令互不兼容，执行将失败；此参数适合 CI 声明/规划预览`)
    }
    return arg
  }
  console.error(`[Error] Invalid --platform "${arg}" — must be "macos" or "windows"`)
  process.exit(1)
}

async function main() {
  const PLATFORM = resolvePlatform()
  const QUICK = process.argv.includes('--quick')
  const REBUILD = process.argv.includes('--rebuild')
  const GUI_ONLY = process.argv.includes('--gui-only')  // 只重打 gui 组件 zip，其余复用上一版本
  const UPDATE_ONLY = process.argv.includes('--update-only')  // 只重打 updater(Update.exe) 组件 zip, 其余复用
  const EXTENSIONS_ONLY = process.argv.includes('--extensions-only')  // 只重打 extensions 组件 zip, 其余复用
  const RELEASE_IDX = process.argv.indexOf('--release')
  const RELEASE_VER = RELEASE_IDX >= 0 ? process.argv[RELEASE_IDX + 1] : null
  const NOTES_IDX = process.argv.indexOf('--notes')
  const NOTES = NOTES_IDX >= 0 ? process.argv[NOTES_IDX + 1] : ''
  // --expect-prev <version>: 声明"上一发行版本号"（服务器上真正在跑的上一版）。
  // 复用未改动组件的 zip 时校验来源版本一致——防止本地 dist/release 缺失该版本时
  // 静默复用更老版本的包（2026.09.12.1 事故：bun/python 等被换成 09.04 的旧包，
  // sha 全变 → 用户端全量"有更新"）。
  const EXPECT_PREV_IDX = process.argv.indexOf('--expect-prev')
  const EXPECT_PREV = EXPECT_PREV_IDX >= 0 ? process.argv[EXPECT_PREV_IDX + 1] : null

  // ── Component selection ──
  // Known components: gui, claude, bun, updater (exe) + tools, python, git, extensions (dir).
  // --components <a,b,c> 只重建/重打这些组件，其余复用上一版本组件 zip 与现有 dist 产物。
  // 无 --components（且无 -only 旗标）时 = 全量构建，行为不变。
  // 组件清单的**唯一真相源**在 componentPlan.ts。这里曾另存一份、漏了 `claude`，
  // 于是 `--components claude` 会打印「未知组件」再照常构建 —— 一半真一半假，
  // 看日志的人无法判断到底建了什么。
  const COMPONENTS_IDX = process.argv.indexOf('--components')
  const COMPONENTS_ARG = COMPONENTS_IDX >= 0 ? process.argv[COMPONENTS_IDX + 1] : null
  let COMPONENT_SET: Set<string> | null = null
  if (COMPONENTS_ARG) {
    COMPONENT_SET = new Set(COMPONENTS_ARG.split(',').map((s) => s.trim()).filter(Boolean))
    for (const c of COMPONENT_SET) {
      // 元组类型是字面量联合，includes 只接受那些字面量 —— 这里输入是用户给的
      // 任意字符串，先放宽成 string[] 再查。
      if (!(KNOWN_COMPONENTS as readonly string[]).includes(c)) {
        console.warn(`  [Warn] Unknown component "${c}" — known: ${KNOWN_COMPONENTS.join(', ')}`)
      }
    }
  } else if (GUI_ONLY) {
    COMPONENT_SET = new Set(['gui'])
  } else if (UPDATE_ONLY) {
    COMPONENT_SET = new Set(['updater'])
  } else if (EXTENSIONS_ONLY) {
    COMPONENT_SET = new Set(['extensions'])
  }
  // selected(name): 显式选中 → 强制重建；want(name): 产物该存在 → 未选中时复用现有/上一版本
  const selected = (name: string) => COMPONENT_SET !== null && COMPONENT_SET.has(name)
  const want = (name: string) => COMPONENT_SET === null || COMPONENT_SET.has(name)

  // --expect-prev 前置校验（仅"部分构建+复用"场景相关）：本地 dist/release 里最"新"的
  // 版本目录必须就是声明的上一发行版——否则未选中组件会静默复用更老的包
  //（2026.09.12.1 事故：本地最新是 09.04.11，09.10.x 的 zip 缺失 → bun/python 等被换成
  //  09.04 的旧包，sha 全变，用户端全量"有更新"）。构建前快速失败，避免白跑编译。
  if (EXPECT_PREV && COMPONENT_SET !== null && RELEASE_VER) {
    const releasesDir = join(DIST, 'release')
    const localPrev = (() => {
      if (!existsSync(releasesDir)) return null
      const prevs = readdirSync(releasesDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== RELEASE_VER && /^\d{4}\.\d{2}\.\d{2}(\.\d+)?$/.test(d.name))
        .map((d) => d.name)
        .sort((a, b) => {
          const pa = a.split('.').map(Number), pb = b.split('.').map(Number)
          for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const na = pa[i] ?? 0, nb = pb[i] ?? 0
            if (na !== nb) return na - nb
          }
          return 0
        })
      return prevs.length ? prevs[prevs.length - 1] : null
    })()
    if (localPrev !== EXPECT_PREV) {
      console.error(`[Error] --expect-prev ${EXPECT_PREV} but local prev release is ${localPrev ?? '(none)'}.`)
      console.error(`        Fetch that version's component zips into dist/release/${EXPECT_PREV}/ first,`)
      console.error(`        or omit --expect-prev (only needed when reusing unselected components).`)
      process.exit(1)
    }
  }

  // mac 的 release 多一步 DMG（见第 12 步）
  const TOTAL_STEPS = RELEASE_VER ? (PLATFORM === 'macos' ? 12 : 11) : 10

  function step(n: number) {
    return `[${n}/${TOTAL_STEPS}]`
  }

  console.log('='.repeat(50))
  console.log('  Claude Code — Build')
  if (QUICK) console.log('  (quick mode — skip steps with existing output)')
  if (REBUILD) console.log('  (rebuild mode — force cargo rebuild)')
  if (RELEASE_VER) console.log(`  (release: ${RELEASE_VER})`)
  if (COMPONENT_SET !== null) console.log(`  (components: ${[...COMPONENT_SET].join(', ')} — 其余复用现有/上一版本)`)
  console.log(`  (platform: ${PLATFORM})`)
  console.log('='.repeat(50))
  console.log()

  // ── Helper: smart build for Rust projects ──
  // If --rebuild: always cargo build --release
  // If explicitly selected via --components: force cargo build (source changed)
  // If --quick and exe exists in dist: skip
  // If release exe exists: copy to dist
  // Otherwise: cargo build --release
  async function smartRustBuild(label: string, projectDir: string, exeName: string, distName: string, extraArgs: string[] = [], compName = '') {
    const releaseExe = join(projectDir, 'target', 'release', exeName)
    const distExe = join(DIST, distName)
    const force = compName ? selected(compName) : false

    if (!force && QUICK && !REBUILD && existsSync(distExe)) {
      console.log(`  ${label}: already in dist, skipping`)
      return
    }

    if (!force && !REBUILD && existsSync(releaseExe)) {
      console.log(`  ${label}: using existing release build`)
    } else {
      console.log(`  ${label}: cargo build --release...`)
      const build = spawnSync(['cargo', 'build', '--release', ...extraArgs], { cwd: projectDir, timeout: 600000 })
      if (build.exitCode !== 0) {
        console.error(`[Error] ${label} build failed:`, build.stderr.toString())
        process.exit(1)
      }
    }

    copyFileSync(releaseExe, distExe)
    console.log(`  OK: ${distExe}`)
  }

  // 1. Install deps
  if (!existsSync(join(ROOT, 'node_modules'))) {
    console.log('[1/10] Installing dependencies...')
    spawnSync(['bun', 'install'], { cwd: ROOT })
  } else {
    console.log('[1/10] Dependencies already installed, skipping')
  }

  // 2. claude 二进制不在这里构建。
  //
  // 它由 claude-code-haha 仓用 bun compile 产出，本仓只消费这个产物。
  // 两个来源：
  //   · 本地联合构建（build/joint.ts）：对方已把它放进 dist/，此处直接复用
  //   · 独立构建：从 --claude-from <path> 指定的既有产物复制过来
  // 缺产物时**不报错跳过**——GUI 单独也能构建和运行，只是没有 CLI 后端。
  const claudeBin = PLATFORM === 'windows' ? join(DIST, 'claude.exe') : join(DIST, 'claude')
  if (!existsSync(claudeBin)) {
    const fromIdx = process.argv.indexOf('--claude-from')
    const from = fromIdx >= 0 ? process.argv[fromIdx + 1] : null
    if (from && existsSync(from)) {
      mkdirSync(DIST, { recursive: true })
      copyFileSync(from, claudeBin)
      console.log(`[2/10] claude.exe ← ${from}`)
    } else {
      console.log('[2/10] claude 二进制缺失 —— 跳过（GUI 可独立运行，无 CLI 后端）')
      console.log('       提供方式：--claude-from <claude.exe 路径>，或与 claude-code-haha 联合构建')
    }
  } else {
    console.log('[2/10] claude.exe 已存在，复用')
  }

  // 3. Build GUI (cargo tauri build — includes beforeBuildCommand: bun run build)
  console.log('[3/10] Building GUI...')
  const isMac = PLATFORM === 'macos'
  const guiReleasePath = isMac
    ? join(GUILDIR, 'target', 'release', 'bundle', 'macos', 'Claude Code.app')
    : join(GUILDIR, 'target', 'release', 'claude-code-gui.exe')
  const guiDistPath = isMac ? join(DIST, 'Claude Code.app') : join(DIST, 'claude-code-gui.exe')

  async function copyGuiArtifact() {
    if (isMac) {
      rmSync(guiDistPath, { recursive: true, force: true })
      cpSync(guiReleasePath, guiDistPath, { recursive: true })
    } else {
      copyFileSync(guiReleasePath, guiDistPath)
    }
  }

  async function buildGui() {
    if (isMac) {
      console.log('  GUI: cargo tauri build --bundles app...')
      // mac: 出 .app bundle（beforeBuildCommand 编译前端）；dmg 由 CI/分发单独出
      const build = spawnSync(['cargo', 'tauri', 'build', '--bundles', 'app'], { cwd: GUILDIR, timeout: 600000 })
      if (build.exitCode !== 0) {
        // ⚠️ 必须打 **stdout**：cargo-tauri 把 beforeBuildCommand 的输出
        // （前端 `tsc && vite build` 的**类型错误**）写在 stdout，stderr 只有
        // "Info Looking up installed tauri packages..." 这类进度噪声。
        // 只打 stderr 会让 CI 日志变成 "GUI build failed: Info Looking up..."，
        // 真正的报错全丢 —— .13.6 的 CI 失败因此排查了一轮才定位到根因。
        reportGuiBuildFailure(build)
        process.exit(1)
      }
    } else {
      console.log('  GUI: cargo tauri build --no-bundle...')
      // --no-bundle: runs beforeBuildCommand (bun run build = 编译前端), compiles, skips MSI/DMG
      const build = spawnSync(['cargo', 'tauri', 'build', '--no-bundle'], { cwd: GUILDIR, timeout: 600000 })
      if (build.exitCode !== 0) {
        reportGuiBuildFailure(build)
        process.exit(1)
      }
    }
    if (!existsSync(guiReleasePath)) {
      console.error(`[Error] GUI artifact not found: ${guiReleasePath}`)
      process.exit(1)
    }
    await copyGuiArtifact()
    console.log(`  OK: ${guiDistPath}`)
  }

  if (!selected('gui') && existsSync(guiDistPath)) {
    console.log(`  GUI: not in components — reusing existing dist ${isMac ? 'app' : 'exe'}`)
  } else if (selected('gui')) {
    // 显式选中 GUI → 前端/后端刚改过，target/release 是旧的，必须真构建否则改动丢失
    await buildGui()
  } else if (QUICK && !REBUILD && existsSync(guiDistPath)) {
    console.log('  GUI: already in dist, skipping (quick)')
  } else if (!REBUILD && existsSync(guiReleasePath)) {
    console.log('  GUI: using existing release build')
    await copyGuiArtifact()
  } else {
    await buildGui()
  }

  // 3b. Build GUI server (cargo) — 独立守护进程，GUI 从 exe 同目录发现(find_server_exe)。
  //     server 与 gui 强依赖：新 GUI 依赖新 server 的 publish/claim/ack RPC。上线时组件更新
  //     顺序 server 优先于 gui(见 update.rs 组件优先级)，保证"新 GUI+新 server"配套。
  const serverDistPath = join(DIST, isMac ? 'claude-gui-server' : 'claude-gui-server.exe')
  const serverExeName = isMac ? 'claude-gui-server' : 'claude-gui-server.exe'
  if (!selected('server') && existsSync(serverDistPath)) {
    console.log('[3b/10] GUI server not in components — reusing existing dist')
  } else {
    console.log('[3b/10] Building GUI server...')
    await smartRustBuild('GUI Server', SERVERDIR, serverExeName, serverExeName, [], 'server')
  }

  // 4. Build Updater (cargo) — macOS 无 Update.exe stager（.app 更新走整体替换），plan=skip
  if (PLATFORM === 'macos') {
    console.log('[4/10] Updater skipped on macOS')
  } else if (!selected('updater') && existsSync(join(DIST, 'Update.exe'))) {
    console.log('[4/10] Updater not in components — reusing existing')
  } else {
    console.log('[4/10] Building Updater...')
    await smartRustBuild('Updater', UPDDIR, 'Update.exe', 'Update.exe', [], 'updater')
  }

  // 5. Generate dist scripts
  console.log('[5/10] Generating dist scripts...')

  if (PLATFORM === 'windows') {
    writeFileSync(join(DIST, 'claude-ide.cmd'), `@echo off\r\nsetlocal\r\n"%~dp0claude.exe" --ide-mode %*\r\n`)
  }

  // Copy scripts/ directory (only .ts files needed at runtime)
  mkdirSync(join(DIST, 'scripts'), { recursive: true })
  const keepScripts = [
    'claude-profile.ts', 'install.ts', 'install-tools.ts',
    'kill-claude.ts',
    'memory-setup.ts', 'gui-profile.py', 'inject-office-bridge.ts',
  ]
  for (const f of keepScripts) {
    const src = join(ROOT, 'scripts', f)
    if (existsSync(src)) copyFileSync(src, join(DIST, 'scripts', f))
  }
  console.log('  scripts/ bundled')

  // bun.exe — needed for TypeScript scripts
  // macOS: 自包含 bun — 下载官方 darwin 二进制（arm64），非 brew。
  if (PLATFORM === 'macos') {
    if (!selected('bun') && existsSync(join(DIST, 'bun'))) {
      console.log('  bun not in components — reusing existing')
    } else {
      console.log('  Downloading bun (macOS, bun-v1.1.30)...')
      const BUN_URL = 'https://github.com/oven-sh/bun/releases/download/bun-v1.1.30/bun-darwin-aarch64.zip'
      const bunZip = join(DIST, '_bun_dl.zip')
      const dl = spawnSync(['curl', '-L', '-f', '-o', bunZip, BUN_URL], { cwd: ROOT, timeout: 600000 })
      if (dl.exitCode !== 0) {
        console.error(`[Error] bun download failed: ${dl.stderr.toString()}`)
        process.exit(1)
      }
      const tmp = join(DIST, '_bun_tmp')
      rmSync(tmp, { recursive: true, force: true })
      mkdirSync(tmp, { recursive: true })
      const uz = spawnSync(['unzip', '-q', bunZip, '-d', tmp], { cwd: ROOT })
      if (uz.exitCode !== 0) {
        console.error(`[Error] bun unzip failed: ${uz.stderr.toString()}`)
        process.exit(1)
      }
      const ex = spawnSync(['bash', '-c',
        `B=$(find '${tmp}' -type f -name bun | head -1); if [ -z "$B" ]; then echo 'bun binary not found' >&2; exit 1; fi; ditto "$B" '${join(DIST, 'bun')}'`], { cwd: ROOT })
      rmSync(tmp, { recursive: true, force: true })
      rmSync(bunZip, { force: true })
      if (ex.exitCode !== 0) {
        console.error(`[Error] bun extract failed: ${ex.stderr.toString()}`)
        process.exit(1)
      }
      console.log('  OK: dist/bun')
    }
  } else if (!selected('bun') && existsSync(join(DIST, 'bun.exe'))) {
    console.log('  bun.exe not in components — reusing existing')
  } else {
  const bunSources = [
    join(homedir(), '.bun', 'bin', 'bun.exe'),
    join(ROOT, 'offline-tools', 'windows', 'bun.exe'),
    join(BIN_DIR, 'bun.exe'),
  ]
  let bunCopied = false
  for (const bunSrc of bunSources) {
    if (existsSync(bunSrc)) {
      copyFileSync(bunSrc, join(DIST, 'bun.exe'))
      console.log(`  bun.exe copied from ${bunSrc}`)
      bunCopied = true
      break
    }
  }
  if (!bunCopied) {
    console.warn('  [Warn] bun.exe not found in any known location')
  }
  }

  // 6. Bundle shared UI + COM bridge
  console.log('[6/10] Bundling shared files...')
  const EXT_DST = join(DIST, 'extensions')

  if (!selected('extensions') && existsSync(EXT_DST)) {
    console.log('  extensions not in components — reusing existing')
  } else {

  function copy(srcRel: string, dstRel: string) {
    const src = join(ROOT, srcRel)
    const dst = join(EXT_DST, dstRel)
    if (!existsSync(src)) { console.warn('  [Warn] missing:', srcRel); return }
    mkdirSync(dst.replace(/[/\\][^/\\]+$/, ''), { recursive: true })
    copyFileSync(src, dst)
  }

  function copyDir(srcRel: string, dstRel: string) {
    const src = join(ROOT, srcRel)
    const dst = join(EXT_DST, dstRel)
    if (!existsSync(src)) { console.warn('  [Warn] missing dir:', srcRel); return }
    mkdirSync(dst, { recursive: true })
    cpSync(src, dst, { recursive: true })
  }

  // Office bridge + MCP server (Python)
  // bridge.py = Windows win32com backend; bridge_mac.py = macOS AppleScript backend;
  // office_mcp_server.py = stdio MCP server auto-registered to ~/.claude.json by the GUI.
  copy('apps/extensions/office/com/bridge.py', 'office/com/bridge.py')
  copy('apps/extensions/office/com/bridge_mac.py', 'office/com/bridge_mac.py')
  copy('apps/extensions/office/com/office_mcp_server.py', 'office/com/office_mcp_server.py')
  // office-bridge.md 现在是**技能源**：GUI 启动时（settings::sync_office_guide）
  // 或 scripts/inject-office-bridge.ts 把它装到
  // ~/.claude/skills/office-bridge/SKILL.md。
  // ⚠️ 2026-11-02 起不再注入 CLAUDE.md 的 @引用 —— 那会让 7.6K 字符常驻每轮上下文。
  // python-env.md 仍走 @引用：只有 360 字符，没必要为它单开一个技能。
  copy('apps/extensions/office/office-bridge.md', 'office/office-bridge.md')
  copy('apps/extensions/python/python-env.md', 'python/python-env.md')

  // Memory MCP Server — Python source + frontend + skills
  // Skip wheels/ (183MB), model/ (88MB), docker images, temp files
  for (const f of [
    'server.py', 'store.py', 'search_engine.py', 'api.py', 'auth.py', 'tokenizer.py', 'normalize.py',
    'requirements.txt', 'Dockerfile', 'docker-compose.yml', 'config.example.json', '.dockerignore',
  ]) {
    copy(`apps/extensions/memory/${f}`, `memory/${f}`)
  }
  copyDir('apps/extensions/memory/web/dist', 'memory/web/dist')
  copyDir('apps/extensions/memory/skills', 'memory/skills')
  console.log('  memory/ bundled')

  // handoff-compact 压缩提取脚本 — 随程序发布（自建技能，其他机器无 ~/.claude/skills）
  copyDir('apps/extensions/handoff-compact', 'handoff-compact')
  console.log('  handoff-compact/ bundled')
  }

  // VS Code extension webview is self-contained in the VSIX — no need to duplicate here

  // 7. Copy offline CLI tools
  // macOS: 自包含 tools — 下载各工具 darwin arm64 资产（官方 GitHub release），非 brew。
  if (PLATFORM === 'macos') {
    if (!selected('tools') && existsSync(join(DIST, 'bin'))) {
      console.log('[7/10] tools not in components — reusing existing')
    } else {
      console.log('[7/10] Downloading CLI tools (macOS)...')
      mkdirSync(join(DIST, 'bin'), { recursive: true })
      const TOOL_SOURCES: Array<[string, string, 'raw' | 'tar.gz' | 'tar.xz']> = [
        ['rg', 'https://github.com/BurntSushi/ripgrep/releases/download/14.1.1/ripgrep-14.1.1-aarch64-apple-darwin.tar.gz', 'tar.gz'],
        ['fd', 'https://github.com/sharkdp/fd/releases/download/v10.2.0/fd-v10.2.0-aarch64-apple-darwin.tar.gz', 'tar.gz'],
        ['jq', 'https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-macos-arm64', 'raw'],
        ['yq', 'https://github.com/mikefarah/yq/releases/download/v4.44.3/yq_darwin_arm64', 'raw'],
        ['shellcheck', 'https://github.com/koalaman/shellcheck/releases/download/v0.10.0/shellcheck-v0.10.0.darwin.aarch64.tar.xz', 'tar.xz'],
      ]
      for (const [name, url, kind] of TOOL_SOURCES) {
        console.log(`  ${name}...`)
        const dlPath = join(DIST, `_tool_${name}`)
        const dl = spawnSync(['curl', '-L', '-f', '-o', dlPath, url], { cwd: ROOT, timeout: 600000 })
        if (dl.exitCode !== 0) {
          console.error(`[Error] ${name} download failed: ${dl.stderr.toString()}`)
          process.exit(1)
        }
        const dst = join(DIST, 'bin', name)
        if (kind === 'raw') {
          spawnSync(['ditto', dlPath, dst], { cwd: ROOT })
        } else {
          const tmp = join(DIST, `_tool_tmp_${name}`)
          rmSync(tmp, { recursive: true, force: true })
          mkdirSync(tmp, { recursive: true })
          const tarArgs = kind === 'tar.gz'
            ? ['tar', 'xzf', dlPath, '-C', tmp]
            : ['tar', 'xJf', dlPath, '-C', tmp]
          const tar = spawnSync(tarArgs, { cwd: ROOT })
          if (tar.exitCode !== 0) {
            console.error(`[Error] ${name} extract failed: ${tar.stderr.toString()}`)
            process.exit(1)
          }
          const ex = spawnSync(['bash', '-c',
            `B=$(find '${tmp}' -type f -name '${name}' | head -1); if [ -z "$B" ]; then echo '${name} not found' >&2; exit 1; fi; ditto "$B" '${dst}'`], { cwd: ROOT })
          rmSync(tmp, { recursive: true, force: true })
          if (ex.exitCode !== 0) {
            console.error(`[Error] ${name} extract failed: ${ex.stderr.toString()}`)
            process.exit(1)
          }
        }
        rmSync(dlPath, { force: true })
        spawnSync(['chmod', '+x', dst], { cwd: ROOT })
        console.log(`    ${name} → dist/bin/${name}`)
      }
    }
  } else {
  console.log('[7/10] Copying offline CLI tools...')
  const TOOLS = ['rg.exe', 'fd.exe', 'jq.exe', 'yq.exe', 'shellcheck.exe']
  mkdirSync(DIST_BIN, { recursive: true })
  if (!selected('tools') && readdirSync(DIST_BIN).some((f) => f.endsWith('.exe'))) {
    console.log('  tools not in components — reusing existing')
  } else {
  for (const tool of TOOLS) {
    const src = join(BIN_DIR, tool)
    if (existsSync(src)) {
      copyFileSync(src, join(DIST_BIN, tool))
      console.log(`  ${tool}`)
    } else {
      console.warn(`  [Warn] ${tool} not found, skipping`)
    }
  }
  }
  }

  // 8. Setup full Python environment
  // macOS: 自包含 python —— 用 **python-build-standalone**（Astral 维护）。
  //
  // 为什么不用 python.org 的官方 .pkg（旧方案，2026-09-13 废弃）：
  //   pkg 装出来的是**框架式**安装，二进制里硬编码
  //   `/Library/Frameworks/Python.framework/Versions/3.12/Python`。ditto 拷走副本
  //   只能搬文件、**改不了二进制里的绝对路径** → 用户机器上系统框架一旦升到别的
  //   版本（如 3.14），那份 3.12 dylib 就没了，内置 python 直接
  //   `dyld: Library not loaded` 起不来。**"分发副本"从根上不成立**。
  //   （注意：重建 symlink 救不了 —— 问题不在链接，在 LC_LOAD_DYLIB 的绝对路径。）
  //
  // standalone 是**真自包含**：自身引用走 `@rpath` / `@executable_path/../lib`，
  // libpython3.12.dylib 随包分发；只依赖 /System/Library 下的系统库（永远存在）。
  // 顺带体积从 ~176MB 降到 ~24MB。
  if (PLATFORM === 'macos') {
    if (!selected('python') && existsSync(join(DIST, 'python'))) {
      console.log('[8/10] python not in components — reusing existing')
    } else {
      console.log('[8/10] Building self-contained Python (macOS)...')
      // 版本固定（可复现构建）。升级时改这两行 + 下面 pip 的版本约束一并复核。
      const PBS_TAG = '20260901'                     // release tag
      const PBS_PY = '3.12.14'                       // CPython 版本
      const PBS_ARCH = 'aarch64-apple-darwin'        // 只出 Apple Silicon（架构决策见 docs/macos-build-playbook.md）
      const PBS_NAME = `cpython-${PBS_PY}+${PBS_TAG}-${PBS_ARCH}-install_only.tar.gz`
      const PBS_URL = `https://github.com/astral-sh/python-build-standalone/releases/download/${PBS_TAG}/${PBS_NAME}`
      const PYTHON_DIR = join(DIST, 'python')
      const LOCAL_TGZ = join(ROOT, 'offline-tools', 'macos', PBS_NAME)

      if (!existsSync(LOCAL_TGZ)) {
        mkdirSync(dirname(LOCAL_TGZ), { recursive: true })
        console.log(`  Downloading ${PBS_NAME}...`)
        const dl = spawnSync(['curl', '-L', '-f', '-o', LOCAL_TGZ, PBS_URL], { cwd: ROOT, timeout: 600000 })
        if (dl.exitCode !== 0) {
          console.error(`[Error] python-build-standalone download failed: ${dl.stderr.toString()}`)
          process.exit(1)
        }
        console.log(`  Saved ${LOCAL_TGZ}`)
      } else {
        console.log(`  Using offline archive: ${LOCAL_TGZ}`)
      }

      // 解压 —— tarball 顶层就是 `python/`（内含 bin/ lib/ include/ share/），
      // 正好等于 dist/python 想要的结构，解到 DIST 即可，**无需再建 bin 链接**
      // （旧方案要手建 `python/bin/python3`，那步随 pkg 方案一起消失）。
      rmSync(PYTHON_DIR, { recursive: true, force: true })
      const ex = spawnSync(['tar', '-xzf', LOCAL_TGZ, '-C', DIST], { cwd: ROOT, timeout: 600000 })
      if (ex.exitCode !== 0) {
        console.error(`[Error] python archive extract failed: ${ex.stderr.toString()}`)
        process.exit(1)
      }
      const py3 = join(PYTHON_DIR, 'bin', 'python3')
      if (!existsSync(py3)) {
        // 下游契约：settings.rs 用 {exe}/python/bin/python3 注册 office MCP。
        // 布局变了必须在这里失败，而不是等用户装完发现 python 起不来。
        console.error(`[Error] expected interpreter missing after extract: ${py3}`)
        process.exit(1)
      }
      console.log('  Extracted python-build-standalone → dist/python/')

      // 安装 mcp SDK（office MCP server 依赖；mac 走 osascript，无 COM，不需要 pywin32）。
      console.log('  Installing mcp SDK...')
      // PYTHONNOUSERSITE=1：隔离 user site-packages，强制全部依赖装进 dist 自带
      // site-packages——否则构建机/user 有缓存依赖时 pip 跳过，发版打包丢依赖。
      const pipInstall = spawnSync([py3, '-m', 'pip', 'install', 'mcp==1.28.1'], { cwd: ROOT, timeout: 180000, env: { ...process.env, PYTHONNOUSERSITE: '1' } })
      if (pipInstall.exitCode !== 0) {
        console.warn(`  [Warn] mcp install failed: ${pipInstall.stderr.toString()}`)
      } else {
        console.log('  mcp installed')
      }
    }
  } else {
  console.log('[8/10] Setting up Python 3.12...')
  const PYTHON_ZIP_NAME = 'python-3.12.10-amd64.zip'
  const PYTHON_URL = `https://mirrors.huaweicloud.com/python/3.12.10/${PYTHON_ZIP_NAME}`
  const PYTHON_DIR = join(DIST, 'python')
  const LOCAL_ZIP = join(ROOT, 'offline-tools', 'windows', PYTHON_ZIP_NAME)

  // Component / quick mode: skip if Python already set up
  const pythonReady = existsSync(join(PYTHON_DIR, 'python.exe'))
  if (!selected('python') && pythonReady) {
    console.log('  Python not in components — reusing existing')
  } else if (QUICK && pythonReady) {
    console.log('  Python already set up, skipping (quick)')
  } else {
    // Use offline zip if available, otherwise download
    let zipPath = LOCAL_ZIP
    if (existsSync(LOCAL_ZIP)) {
      console.log(`  Using offline zip: ${LOCAL_ZIP}`)
    } else {
      console.log(`  Downloading ${PYTHON_URL}...`)
      const download = spawnSync(['powershell', '-NoProfile', '-Command',
        `Invoke-WebRequest -Uri '${PYTHON_URL}' -OutFile '${LOCAL_ZIP}'`], { cwd: ROOT, timeout: 180000 })
      if (download.exitCode !== 0) {
        console.error(`[Error] Python download failed: ${download.stderr.toString()}`)
        process.exit(1)
      }
      console.log('  Download complete')
      zipPath = LOCAL_ZIP
    }

    // Extract
    if (existsSync(PYTHON_DIR)) {
      rmSync(PYTHON_DIR, { recursive: true })
    }
    mkdirSync(PYTHON_DIR, { recursive: true })
    const unzip = spawnSync(['powershell', '-NoProfile', '-Command',
      `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${zipPath}', '${PYTHON_DIR}')`], { cwd: ROOT })
    if (unzip.exitCode !== 0) {
      console.error(`[Error] Python unzip failed: ${unzip.stderr.toString()}`)
      process.exit(1)
    }
    console.log('  Extracted to dist/python/')

    // Install pywin32 (COM bridge) + mcp SDK (office MCP server) — pip is in Lib/site-packages/
    // mcp==1.28.1 锁定版本（官方 SDK，同 memory MCP server），装进 dist 自带 site-packages，
    // 随 python 组件打包——不依赖用户级 site-packages（发版不打包，会丢）。
    const pythonExe = join(PYTHON_DIR, 'python.exe')
    console.log('  Installing pywin32 + mcp SDK...')
    const pipInstall = spawnSync([pythonExe, '-m', 'pip', 'install', 'pywin32', 'mcp==1.28.1'], { cwd: ROOT, timeout: 180000, env: { ...process.env, PYTHONNOUSERSITE: '1' } })
    if (pipInstall.exitCode !== 0) {
      console.warn(`  [Warn] pywin32/mcp install failed: ${pipInstall.stderr.toString()}`)
    } else {
      console.log('  pywin32 + mcp installed')
    }
  }
  }

  // 9. Setup Git environment (PortableGit zip)
  // 9. Setup Git environment (macOS: 系统自带 git，plan=system 不打包)
  if (PLATFORM === 'macos') {
    console.log('[9/10] git skipped on macOS (system git)')
  } else {
  console.log('[9/10] Setting up Git...')
  const GIT_DIR = join(DIST, 'git')
  const GIT_ZIP = join(ROOT, 'offline-tools', 'windows', 'PortableGit.zip')

  // Component / quick mode: skip if already set up
  const gitReady = existsSync(join(GIT_DIR, 'usr', 'bin', 'bash.exe'))
  if (!selected('git') && gitReady) {
    console.log('  Git not in components — reusing existing')
  } else if (QUICK && gitReady) {
    console.log('  Git already set up, skipping (quick)')
  } else if (existsSync(GIT_ZIP)) {
    // Extract PortableGit.zip → dist/git/
    if (existsSync(GIT_DIR)) {
      rmSync(GIT_DIR, { recursive: true })
    }
    mkdirSync(GIT_DIR, { recursive: true })

    const gitTempDir = join(DIST, '_git_tmp')
    try {
      if (existsSync(gitTempDir)) rmSync(gitTempDir, { recursive: true })
      mkdirSync(gitTempDir, { recursive: true })

      console.log('  Extracting PortableGit.zip...')
      // Use .NET ZipFile — Expand-Archive hangs/OOMs on 155MB zips
      const unzip = spawnSync(['powershell', '-NoProfile', '-Command',
        `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${GIT_ZIP}', '${gitTempDir}')`], { cwd: ROOT, timeout: 120000 })
      if (unzip.exitCode !== 0) {
        console.error(`[Error] Git unzip failed:`, unzip.stderr.toString())
        process.exit(1)
      }

      // Move PortableGit/* → dist/git/
      const extracted = join(gitTempDir, 'PortableGit')
      if (existsSync(extracted)) {
        for (const f of readdirSync(extracted)) {
          const src = join(extracted, f)
          const dst = join(GIT_DIR, f)
          try {
            if (statSync(src).isDirectory()) {
              cpSync(src, dst, { recursive: true })
            } else {
              copyFileSync(src, dst)
            }
          } catch { /* skip locked */ }
        }
      }
      console.log('  PortableGit extracted')
    } finally {
      try { rmSync(gitTempDir, { recursive: true }) } catch {}
    }
  } else {
    console.warn(`  [Warn] PortableGit.zip not found at ${GIT_ZIP}`)
    console.warn('  [Warn] Download from https://github.com/git-for-windows/git/releases')
    console.warn('  [Warn] and save as offline-tools/windows/PortableGit.zip')
  }
  }

  // 10. Copy IDE extension packages + generate dist launcher scripts
  console.log('[10/10] Copying IDE extensions + generating launcher scripts...')
  const EXT_PKG = join(DIST, 'extensions')
  mkdirSync(EXT_PKG, { recursive: true })

  // IDE 插件复制 — 组件未选中且已有产物时复用，省时间
  if (!selected('extensions') && existsSync(join(EXT_PKG, 'vscode'))) {
    console.log('  IDE extensions not in components — reusing existing')
  } else {

  // VS Code
  const vscodeVsix = join(ROOT, 'apps', 'extensions', 'vscode', 'claude-code-ide-0.2.37.vsix')
  if (existsSync(vscodeVsix)) {
    mkdirSync(join(EXT_PKG, 'vscode'), { recursive: true })
    copyFileSync(vscodeVsix, join(EXT_PKG, 'vscode', 'claude-code-ide-0.2.37.vsix'))
    console.log('  VS Code extension')
  } else { console.warn('  [Warn] VS Code VSIX not found') }

  // Visual Studio
  const vsVsix = join(ROOT, 'apps', 'extensions', 'vs', 'ClaudeCodeVS-0.2.12.vsix')
  if (existsSync(vsVsix)) {
    mkdirSync(join(EXT_PKG, 'vs'), { recursive: true })
    copyFileSync(vsVsix, join(EXT_PKG, 'vs', 'ClaudeCodeVS-0.2.12.vsix'))
    console.log('  Visual Studio extension')
  } else { console.warn('  [Warn] VS VSIX not found') }

  // IntelliJ (pre-built copy first, gradle output as fallback)
  const intellijZip = (() => {
    const prebuilt = join(ROOT, 'apps', 'extensions', 'intellij', 'claude-code-ide-0.2.12.zip')
    if (existsSync(prebuilt)) return prebuilt
    return join(ROOT, 'apps', 'extensions', 'intellij', 'build', 'distributions', 'claude-code-ide-0.2.12.zip')
  })()
  if (existsSync(intellijZip)) {
    mkdirSync(join(EXT_PKG, 'intellij'), { recursive: true })
    copyFileSync(intellijZip, join(EXT_PKG, 'intellij', 'claude-code-ide-0.2.12.zip'))
    console.log('  IntelliJ extension')
  } else { console.warn('  [Warn] IntelliJ ZIP not found') }

  }

  // launcher scripts — at dist/ root (Windows .cmd；macOS 用 bin/ shell 脚本 + .app 自带启动)
  if (PLATFORM === 'windows') {
  const launchers: Record<string, string[]> = {
    'claude.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal', '"%~dp0claude.exe" %*', ''],
    'claude-haha.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal', '"%~dp0claude.exe" %*', ''],
    'cla.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal', '"%~dp0claude.exe" %*', ''],
    'cla-bypass.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal', '"%~dp0claude.exe" --permission-mode bypassPermissions %*', ''],
    'claude-ide.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal', '"%~dp0claude.exe" --ide-mode %*', ''],
    'claude-profile.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal',
      'if exist "%~dp0bun.exe" (',
      '  "%~dp0bun.exe" "%~dp0scripts\\claude-profile.ts" %*',
      ') else (',
      '  echo [Error] bun.exe not found.',
      ')', ''],
    'kill-claude.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal',
      '"%~dp0bun.exe" "%~dp0scripts\\kill-claude.ts" %*', ''],

    'memory-setup.cmd': ['@echo off', 'chcp 65001 >nul', 'setlocal',
      '"%~dp0bun.exe" "%~dp0scripts\\memory-setup.ts" %*', ''],
  }
  for (const [name, lines] of Object.entries(launchers)) {
    writeFileSync(join(DIST, name), lines.join('\r\n'))
    console.log(`  ${name}`)
  }

  // Extra utility scripts
  const extraScripts = ['inject-office-bridge.cmd']
  for (const name of extraScripts) {
    const src = join(BIN_DIR, name)
    if (existsSync(src)) {
      copyFileSync(src, join(DIST, name))
      console.log(`  ${name}`)
    }
  }
  } else {
    // macOS launcher：Unix shebang，跟 claude 二进制平级放 dist/ 根。IDE 插件
    // （vscode/intellij：extension.ts IDE_SCRIPT / intellij ProcessManager）按平台找
    // 无扩展名 claude-ide，此前 mac 分支零 launcher → mac IDE 找不到启动脚本。
    // CLI 用 shebang 调 claude。claude/claude-haha 不生成（会与 mac 的 claude
    // 二进制同名冲突，命令行直接用二进制）。
    //
    // ⚠️ **不生成依赖 `$DIR/scripts/*.ts` 的那三个**（claude-profile / kill-claude /
    // memory-setup）：.app 的 Contents/MacOS/ 下**没有 `scripts/` 目录**
    // （embedDirs 只含 claude/bun/bin/python/extensions，scripts 不打进去），
    // 这几个 launcher 必然 `exec: .../scripts/xxx.ts: No such file` 跑不起来 ——
    // 是纯死文件。且这三个功能在 mac 上都由 GUI 界面提供（Profile 管理 / 杀进程 /
    // 记忆 MCP 配置），命令行入口对 mac 用户没有实际用途。
    // （真机验证时发现，见 docs/macos-build-playbook.md。）
    const unix: Record<string, string> = {
      'claude-ide': '#!/bin/sh\nDIR="$(cd "$(dirname "$0")" && pwd)"\nexec "$DIR/claude" --ide-mode "$@"\n',
      'cla': '#!/bin/sh\nDIR="$(cd "$(dirname "$0")" && pwd)"\nexec "$DIR/claude" "$@"\n',
      'cla-bypass': '#!/bin/sh\nDIR="$(cd "$(dirname "$0")" && pwd)"\nexec "$DIR/claude" --permission-mode bypassPermissions "$@"\n',
    };
    for (const [name, content] of Object.entries(unix)) {
      const p = join(DIST, name)
      writeFileSync(p, content)
      spawnSync(['chmod', '+x', p])
      console.log(`  ${name}`)
    }
  }

  // 组件源映射（按平台）——Windows gui/claude 是单文件 exe；macOS gui 是 .app bundle(dir)、
  // claude 无 .exe 后缀；bun/tools/python/git 用系统自带、updater 专属 Windows → 由 plan 过滤不打包。
  function buildComponentSources(): Record<string, { kind: 'file' | 'dir'; path: string }> {
    const sources: Record<string, { kind: 'file' | 'dir'; path: string }> = {
      gui: PLATFORM === 'windows' ? { kind: 'file', path: 'claude-code-gui.exe' } : { kind: 'dir', path: 'Claude Code.app' },
      claude: PLATFORM === 'windows' ? { kind: 'file', path: 'claude.exe' } : { kind: 'file', path: 'claude' },
      bun: PLATFORM === 'windows' ? { kind: 'file', path: 'bun.exe' } : { kind: 'file', path: 'bun' },
      updater: { kind: 'file', path: 'Update.exe' },
      tools: { kind: 'dir', path: 'bin' },
      python: { kind: 'dir', path: 'python' },
      git: { kind: 'dir', path: 'git' },
      extensions: { kind: 'dir', path: 'extensions' },
    }
    // server 仅 Windows 作为独立组件分发；mac 上随 .app(embed)，不作为独立 manifest 组件
    // （mac 是整 .app 替换，独立 server 更新与时序冲突；GUI 从 exe 同目录 find_server_exe）。
    if (PLATFORM === 'windows') {
      sources.server = { kind: 'file', path: 'claude-gui-server.exe' }
    }
    return sources
  }

  // macOS: 把全部组件合并进 Claude Code.app（Contents/MacOS/），出开箱即用的完整 .app。
  // 必须在 manifest 计算之前——gui 的 sha 是 .app 目录 hash，embed 后才是最终形态，
  // 否则服务器 manifest 的 gui sha 与完整 .app 不符，客户端永远提示 gui 需更新。
  function embedIntoAppBundle() {
    const appMacOS = join(DIST, 'Claude Code.app', 'Contents', 'MacOS')
    // gui 自身是 .app，不嵌。
    //
    // ⚠️ `server` **不在** embedDirs 里 —— 它在 dist 下是**单文件**
    // `claude-gui-server`（见上面 serverDistPath），不是同名目录。早先把 'server'
    // 混在目录列表里 → `existsSync(dist/server)` 恒为假 → 只打一行 [Warn] 静默跳过
    // → .app 里没有 server 二进制 → GUI 的 find_server_exe()（找 current_exe 同目录）
    // 失败 → 诊断面板显示「GUI SERVER 已停止」。整个 GUI server 功能在 mac 上缺失。
    //
    // 教训：这里的"缺失"分支只 warn 不 fail，而 warn 混在长日志里没人看。
    // 所以下面给 server 单独做**硬校验**（它是必须存在的，不是可选组件）。
    const embedDirs = ['claude', 'bun', 'bin', 'python', 'extensions']
    for (const rel of embedDirs) {
      const srcP = join(DIST, rel)
      if (existsSync(srcP)) {
        console.log(`  embed ${rel} → .app/Contents/MacOS/`)
        const run = spawnSync(['ditto', srcP, join(appMacOS, rel)], { cwd: DIST, timeout: 600000 })
        if (run.exitCode !== 0) {
          console.error(`  [Error] embed ${rel} failed:`, run.stderr.toString())
          process.exit(1)
        }
      } else {
        console.warn(`  [Warn] embed ${rel}: dist/${rel} missing, skipping`)
      }
    }
    // server 单文件：必须嵌入（GUI 启动时从 exe 同目录 spawn 它）。
    {
      const src = join(DIST, 'claude-gui-server')
      if (!existsSync(src)) {
        console.error(`  [Error] 缺少 GUI server 二进制: ${src}`)
        console.error('          它在 dist 下叫 claude-gui-server（单文件，不是 server/ 目录）。')
        console.error('          检查 build.ts 第 8.5 步的 GUI Server 构建是否被 --components 跳过。')
        process.exit(1)
      }
      const run = spawnSync(['ditto', src, join(appMacOS, 'claude-gui-server')], { cwd: DIST, timeout: 600000 })
      if (run.exitCode !== 0) {
        console.error('  [Error] embed claude-gui-server failed:', run.stderr.toString())
        process.exit(1)
      }
      spawnSync(['chmod', '+x', join(appMacOS, 'claude-gui-server')])
      console.log('  embed claude-gui-server → .app/Contents/MacOS/')
    }
    // mac launcher 也复制进 .app 根（跟 claude 二进制平级）——IDE 插件按平台找
    // 无扩展名 claude-ide（extension.ts:57 IDE_SCRIPT / intellij ProcessManager），
    // 否则 .app 里只有 claude 没有 claude-ide，mac IDE 找不到启动脚本。
    // 列表与上面的 unix 生成清单保持一致（那三个依赖 scripts/*.ts 的已不再生成）。
    for (const name of ['claude-ide', 'cla', 'cla-bypass']) {
      const srcP = join(DIST, name)
      if (existsSync(srcP)) {
        copyFileSync(srcP, join(appMacOS, name))
        spawnSync(['chmod', '+x', join(appMacOS, name)])
        console.log(`  embed launcher ${name} → .app/Contents/MacOS/`)
      }
    }
  }

  // 11. Generate update manifest + component zips (only with --release <version>)
  if (RELEASE_VER) {
  console.log(`${step(11)} Generating update manifest...`)
  generateRelease({
    dist: DIST,
    version: RELEASE_VER,
    notes: NOTES,
    platform: PLATFORM,
    componentSet: COMPONENT_SET,
    expectPrev: EXPECT_PREV,
    componentSources: buildComponentSources(),
    beforeManifest: PLATFORM === 'macos' ? embedIntoAppBundle : undefined,
  })
  } // end --release block

  // 12. macOS: 打 DMG（拖进「应用程序」即安装）
  //
  // 必须放在 embed **之后**（generateRelease 里通过 beforeManifest 调用了
  // embedIntoAppBundle）——在那之前 .app 里还没有 claude / python / 工具链。
  // 脚本自己也会校验核心组件存在，打空壳会直接失败而不是产出一个
  // 「能装、但用不了」的镜像。
  if (PLATFORM === 'macos' && RELEASE_VER) {
    console.log(`${step(12)} Creating DMG...`)
    const dmgOut = join(DIST, 'release', RELEASE_VER, 'lumen-agent-desktop.dmg')
    const args = [
      'bash', join(ROOT, 'scripts', 'macos', 'build-dmg.sh'),
      '--app', join(DIST, 'Claude Code.app'),
      '--out', dmgOut,
    ]
    // 未签名 / 未公证时 Gatekeeper 会拦；镜像里放一张「右键→打开」说明。
    // 签名接上之后（阶段 1）这里会自动不加，不需要改调用方。
    if (!process.env.APPLE_SIGNING_IDENTITY && !process.env.APPLE_CERTIFICATE) {
      args.push('--first-run-note')
    }
    const r = spawnSync(args, { cwd: ROOT, timeout: 900000 })
    if (r.exitCode !== 0) {
      console.error('[Error] DMG 失败:', (r.stderr ?? '').toString())
      process.exit(1)
    }
    // 转发脚本输出（它会打印 staging / verify / 最终大小）
    const out = (r.stdout ?? '').toString().trimEnd()
    if (out) console.log(out.split('\n').map((l) => '  ' + l).join('\n'))
  } // end macOS DMG

  // Summary
  let totalSize = 0
  function calcSize(dir: string) {
    if (!existsSync(dir)) return
    const entries = readdirSync(dir, { recursive: true })
    for (const e of entries) {
      const p = join(dir, e.toString())
      try { totalSize += statSync(p).size } catch {}
    }
  }
  calcSize(DIST)
  const sizeMB = Math.round(totalSize / 1024 / 1024)

  console.log()
  console.log('='.repeat(50))
  console.log('  Build complete!')
  console.log(`  Total size: ~${sizeMB} MB`)
  console.log()
  // 按平台列产物。以前这里写死了 Windows 的全部条目（.exe/.cmd/git/python+pywin32），
  // mac 构建也会照打一遍 —— CI 排障时看到「dist/*.exe」会以为构建没走 mac 分支。
  if (PLATFORM === 'windows') {
    console.log(`  dist/*.exe                   — claude-code-gui.exe, claude.exe, Update.exe, bun.exe`)
    console.log(`  dist/*.cmd                   — Launcher scripts`)
    console.log(`  dist/bin/                    — CLI tools (rg, fd, jq, yq, shellcheck)`)
    console.log(`  dist/python/                 — Python 3.12 (full) + pywin32`)
    console.log(`  dist/git/                    — Git Bash + Git repo tools`)
    console.log(`  dist/extensions/             — IDE plugins (VS Code, VS, IntelliJ, CDP) + COM bridge`)
  } else {
    console.log(`  dist/Claude Code.app/        — 完整 .app（含 claude / server / python / 工具链 / 扩展）`)
    console.log(`  dist/bin/                    — CLI tools (rg, fd, jq, yq, shellcheck)`)
    console.log(`  dist/python/                 — python-build-standalone (aarch64) + mcp`)
    console.log(`  dist/extensions/             — IDE plugins（git 用系统自带，不打包）`)
  }
  if (RELEASE_VER) console.log(`  dist/release/${RELEASE_VER}/    — Update manifest + component zips`
    + (PLATFORM === 'macos' ? ' + lumen-agent-desktop.dmg' : ''))
  console.log(`  dist/scripts/                — TypeScript tools`)
  console.log('='.repeat(50))
  console.log()
  console.log('  Test:', claudeBin, '--version')

  try {
    const ver = spawnSync([claudeBin, '--version'], { cwd: DIST })
    console.log('  →', ver.stdout.toString().trim())
  } catch {
    console.log('  [Skip] claude 二进制还没有构建')
  }
}

main().catch(e => { console.error('Build failed:', e); process.exit(1) })
