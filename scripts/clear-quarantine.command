#!/bin/bash
# 解除 macOS 的「已损坏，无法打开」拦截
#
# 用法：先把 Claude Code 拖进「应用程序」，再双击本文件。
#
# 为什么需要它：应用未签名未公证，从浏览器下载后会被打上隔离标记，
# macOS 就拒绝启动并说「已损坏」。这一步只是把那个标记去掉，不碰你的任何数据。

echo
echo "  Claude Code —— 解除启动拦截"
echo "  ────────────────────────────"
echo

# 常见安装位置，按优先级。用户可能装在任意一个。
CANDIDATES=(
  "/Applications/Claude Code.app"
  "$HOME/Applications/Claude Code.app"
)

FOUND=""
for p in "${CANDIDATES[@]}"; do
  if [ -d "$p" ]; then
    if [ -n "$FOUND" ]; then
      # 两个都装了：两个都处理，但只打开用户级那个（通常是后装的）
      xattr -cr "$p" 2>/dev/null || true
      echo "  已解除: $p"
    else
      FOUND="$p"
    fi
  fi
done

# 标准位置没有，再扫一遍家目录（有人放在 ~/Downloads 直接运行）
if [ -z "$FOUND" ]; then
  FOUND=$(find /Applications "$HOME" -maxdepth 3 -name "Claude Code.app" -type d 2>/dev/null | head -1)
fi

if [ -z "$FOUND" ]; then
  echo "  没有找到 Claude Code.app"
  echo
  echo "  请先把 DMG 里的「Claude Code」拖进「应用程序」文件夹，再运行本脚本。"
  echo
  printf "  按回车关闭…"
  read -r _
  exit 1
fi

echo "  找到: $FOUND"
xattr -cr "$FOUND" || {
  echo
  echo "  解除失败——可能需要管理员权限。请在终端手动执行："
  echo "    sudo xattr -cr \"$FOUND\""
  echo
  printf "  按回车关闭…"
  read -r _
  exit 1
}
echo "  已解除隔离标记"

echo
echo "  正在启动…"
open "$FOUND"

echo
echo "  ✓ 完成。以后可以直接双击打开，不用再运行这个脚本。"
echo "    （装了新版本后需要再运行一次）"
echo
printf "  按回车关闭…"
read -r _
