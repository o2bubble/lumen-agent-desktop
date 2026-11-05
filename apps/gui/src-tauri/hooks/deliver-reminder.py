"""Stop hook: 本轮改过文件但没调 deliver → block，提示补交。

**该文件编译期嵌入 claude-code-gui.exe**（settings.rs 的 include_str!），
GUI 每次启动写到 ~/.claude/hooks/ 并在 ~/.claude/settings.json 注册 Stop hook。
改这里不需要动安装器；发一版 GUI 即自动同步到所有用户。

为什么需要：deliver 的使用时机写在 MCP instructions 里，但那是提示词，
实测不可靠（2026-11-05 连续几轮都没调）。改用 Stop hook 强制。

判据：
  本轮（最后一条真实用户消息之后）有 Edit/Write/NotebookEdit，
  且最后一次编辑之后没有 mcp__super-desktop__deliver → block。

fail-open：任何异常、解析失败、超时都放行。宁可漏提醒，也不能把会话卡住。
loop guard：stop_hook_active 为真时直接放行（引擎用它防死循环）。
纯 CLI 会话没有 super-desktop MCP → 工作区 .mcp.json 里找不到就跳过。

⚠️ **todo 收尾检查不在这里**。那是引擎自己的行为、与 GUI 无关，
内置在 CLI 的 `src/query/todoStopCheck.ts`（跟着二进制分发）。
放在 GUI 钩子里会导致纯命令行用户拿不到。
"""

import json
import os
import sys

EDIT_TOOLS = {"Edit", "Write", "NotebookEdit"}
DELIVER = "deliver"


def is_real_user_prompt(obj: dict) -> bool:
    """真实的用户输入（不是 tool_result 载体，也不是注入的 system-reminder）。"""
    if obj.get("type") != "user":
        return False
    if obj.get("isMeta"):
        return False
    msg = obj.get("message") or {}
    content = msg.get("content")
    if isinstance(content, str):
        return bool(content.strip()) and not content.lstrip().startswith("<system-reminder>")
    if isinstance(content, list):
        return not any(
            isinstance(b, dict) and b.get("type") == "tool_result" for b in content
        )
    return False


def tool_names(obj: dict):
    """一条记录里所有 tool_use 的名字。"""
    msg = obj.get("message") or {}
    content = msg.get("content")
    if not isinstance(content, list):
        return
    for block in content:
        if isinstance(block, dict) and block.get("type") == "tool_use":
            name = block.get("name")
            if isinstance(name, str):
                yield name


def is_deliver(name: str) -> bool:
    return name == DELIVER or name.endswith("__" + DELIVER)


def gui_present(cwd: str) -> bool:
    """工作区有没有挂 super-desktop MCP —— 没有就说明是纯 CLI 会话。"""
    path = os.path.join(cwd, ".mcp.json")
    try:
        with open(path, encoding="utf-8") as f:
            return "super-desktop" in f.read()
    except Exception:
        return False


def edited_without_deliver(lines) -> bool:
    """本轮（最后一条真实用户消息之后）改过文件但没交付。"""
    seen_deliver = False
    for line in reversed(lines):
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except Exception:
            continue
        if is_real_user_prompt(obj):
            return False  # 本轮结束，没出现"编辑后未交付"
        for name in tool_names(obj):
            if is_deliver(name):
                seen_deliver = True
            elif name in EDIT_TOOLS and not seen_deliver:
                # 这次编辑之后没有 deliver（更晚的 deliver 会被先扫到）
                return True
    return False


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    if payload.get("stop_hook_active"):
        return 0

    transcript = payload.get("transcript_path")
    if not transcript or not os.path.isfile(transcript):
        return 0

    try:
        with open(transcript, encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
    except Exception:
        return 0

    cwd = payload.get("cwd") or os.getcwd()

    # 只有挂了 super-desktop 的会话才有 deliver 工具
    if not (gui_present(cwd) and edited_without_deliver(lines)):
        return 0

    # ensure_ascii=True：Windows 控制台默认 GBK，中文直出会让
    # 读 stdout 的那一端按 UTF-8 解码失败 → 整条输出被丢弃。
    # \uXXXX 转义是纯 ASCII，JSON 解析端会自动还原。
    print(json.dumps({
        "decision": "block",
        "reason": (
            "本轮用 Edit/Write/NotebookEdit 改过文件，但还没调用 "
            "mcp__super-desktop__deliver。请在回复前调用它一次，"
            "把这次创建/修改/删除的文件列出来。"
            "（这是 Stop hook 的强制检查，不是建议）"
        ),
    }, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)  # fail-open
