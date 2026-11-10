#!/usr/bin/env bash
# 把 Claude Code.app 打成 DMG（拖进 Applications 即安装）。
#
#   bash scripts/macos/build-dmg.sh \
#     --app "dist/Claude Code.app" \
#     --out "dist/release/2026.11.10.1/lumen-agent-desktop.dmg" \
#     --first-run-note
#
# ## 为什么不用 `cargo tauri build --bundles dmg`
#
# Tauri 的 dmg bundler 会**打开 Finder、用 AppleScript 摆图标位置**。
# 无头 CI 上没有可用的 Finder 会话，这一步经常挂到超时；而它做的事
# 只是「把 .app 和一个 Applications 软链放进一个磁盘镜像」——
# hdiutil 一条命令就够，且完全非交互。
#
# ## 为什么必须在 embed 之后调用
#
# `build.ts` 是先用 cargo 产出 .app，再把 claude / python / bin / extensions
# **塞进 Contents/MacOS/**。在 embed 之前打包，用户装到的是个空壳
# （能启动、没有聊天后端、没有工具链）。
#
# ## 为什么用 ditto 而不是 cp -R
#
# .app 里有符号链接（python 的 bin/python3 → ../lib/...），cp -R 会解引用
# 或丢失；ditto 保留 symlink / 权限位 / 扩展属性。CI 上解压后运行失败
# 的经典原因就是这一步用错。
set -euo pipefail

# 依赖 ditto / hdiutil（都是 macOS 自带）。在别的平台上早失败、给一句能看懂
# 的话，而不是走到一半报 "ditto: command not found"。
if [ "$(uname -s)" != "Darwin" ]; then
    echo "只能在 macOS 上运行（需要 ditto / hdiutil），当前是 $(uname -s)" >&2
    exit 1
fi

APP=""
OUT=""
VOLNAME="Claude Code"
FIRST_RUN_NOTE=0

usage() {
    sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
    exit 2
}

while [ $# -gt 0 ]; do
    case "$1" in
        --app)            APP="$2"; shift 2 ;;
        --out)            OUT="$2"; shift 2 ;;
        --volname)        VOLNAME="$2"; shift 2 ;;
        --first-run-note) FIRST_RUN_NOTE=1; shift ;;
        -h|--help)        usage ;;
        *) echo "未知参数: $1" >&2; usage ;;
    esac
done

[ -n "$APP" ] || { echo "缺少 --app" >&2; exit 2; }
[ -n "$OUT" ] || { echo "缺少 --out" >&2; exit 2; }
[ -d "$APP" ] || { echo "不是目录: $APP" >&2; exit 1; }
# .app 是目录 bundle，路径必须以 .app 结尾（ditto 会把整个目录搬进去）
case "$APP" in
    *.app) ;;
    *) echo "警告: $APP 不以 .app 结尾，确认传的是 bundle 而不是 Contents/MacOS" >&2 ;;
esac

APP_NAME=$(basename "$APP")

# 打包前的硬校验：核心组件不在这儿就白打一个 137MB 的镜像
missing=""
for f in claude claude-gui-server claude-code-gui; do
    [ -f "$APP/Contents/MacOS/$f" ] || missing="$missing $f"
done
if [ -n "$missing" ]; then
    echo "!! .app 缺少核心组件:$missing" >&2
    echo "   通常意味着 DMG 打在了 embed 之前（见脚本头注释）。" >&2
    exit 1
fi

STAGING=$(mktemp -d "${TMPDIR:-/tmp}/lumen-dmg.XXXXXX")
cleanup() { rm -rf "$STAGING"; }
trap cleanup EXIT

echo "  staging → $STAGING"
ditto "$APP" "$STAGING/$APP_NAME"
# 软链指向 /Applications：用户在 DMG 窗口里把 app 拖过去即完成安装。
# 这是 macOS 上唯一被普遍认得的「拖拽安装」约定，不放软链用户会双击
# 从 DMG 里运行（临时挂载点），退出后配置全丢。
ln -s /Applications "$STAGING/Applications"

if [ "$FIRST_RUN_NOTE" = "1" ]; then
    # 未签名 / 未公证时 Gatekeeper 会拦。右键→打开 是所有人都能照做的一步；
    # 不写这句话，用户看到的只是「已损坏，移到废纸篓」。
    cat > "$STAGING/首次打开请先读我.txt" <<'NOTE'
这个版本还没有做 Apple 签名与公证，macOS 第一次打开会拦一下。

第一次打开：
  1. 把 Claude Code 拖进「应用程序」
  2. 在「应用程序」里 **右键 → 打开**（不是双击）
  3. 弹窗里再点「打开」

之后就可以正常双击了。

如果还是被拦（提示「已损坏」），在终端执行一次：
  xattr -cr "/Applications/Claude Code.app"
NOTE
fi

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"

echo "  hdiutil create → $OUT"
# UDZO = 压缩只读；HFS+ 是为了兼容性（APFS 镜像在旧系统上读不了）。
# -ov 覆盖已存在的文件；中途失败不会留下半成品（hdiutil 自己会清理）。
hdiutil create \
    -volname "$VOLNAME" \
    -srcfolder "$STAGING" \
    -fs HFS+ \
    -format UDZO \
    -ov \
    -quiet \
    "$OUT"

# 镜像能挂载 / 校验通过才算数——CI 上「文件存在」不等于「能装」
hdiutil verify -quiet "$OUT"

SIZE=$(du -h "$OUT" | cut -f1 | tr -d ' ')
echo "  OK  $OUT ($SIZE)"
