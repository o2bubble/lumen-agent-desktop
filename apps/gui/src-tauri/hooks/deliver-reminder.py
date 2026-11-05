"""Stop hook: 回合收尾时的两项检查。

**该文件编译期嵌入 claude-code-gui.exe**（settings.rs 的 include_str!），
GUI 每次启动写到 ~/.claude/hooks/ 并在 ~/.claude/settings.json 注册 Stop hook。
改这里不需要动安装器；发一版 GUI 即自动同步到所有用户。

（文件名沿用 `deliver-reminder` —— 第一版只做交付检查。现在是一个
多规则的收尾检查器，改名会让已安装用户机器上的旧 hook 条目指向不存在的
文件，每次结束都报错，所以保留文件名、在内容上分节说明。）

## 检查 1：TodoWrite 还有没做完的（所有会话）

干到一半开始收尾、忘了把 todo 标完成，是常见的收尾遗漏。判据很硬：
**最后一次 TodoWrite 调用里还有 status != "completed" 的项**。
引擎在全部完成时会把列表清空（`TodoWriteTool.ts` 的 `allDone → []`），
所以「有未完成项」= 确实没收尾干净，不会误报已完成的场景。

## 检查 2：改过文件但没交付（仅 GUI 会话）

交付的调用时机只写在 MCP instructions 里，那是提示词，实测不可靠。
本轮有 Edit/Write/NotebookEdit 且其后没有 deliver → 提醒补交。

## 共同约定

fail-open：任何异常、解析失败、超时都放行。宁可漏提醒，也不能把会话卡住。
loop guard：stop_hook_active 为真时直接放行 —— 提醒**只拦一次**，
模型解释清楚（比如用户说剩下的不做了）后再结束就放行。
"""

import json
import os
import sys

EDIT_TOOLS = {"Edit", "Write", "NotebookEdit"}
DELIVER = "deliver"
TODO_TOOL = "TodoWrite"


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


def tool_uses(obj: dict):
    """一条记录里的全部 tool_use 块（拿得到 name 和 input）。"""
    msg = obj.get("message") or {}
    content = msg.get("content")
    if not isinstance(content, list):
        return
    for block in content:
        if isinstance(block, dict) and block.get("type") == "tool_use":
            yield block


def find_pending_todos(lines) -> list:
    """最后一次 TodoWrite 里没标完成的项。

    **扫整个 transcript，不是只扫本轮** —— todo 列表是会话级的，
    上一轮建的清单这一轮可能还没做完。从末尾往回找，碰到第一条就停：
    最近那次调用才是当前状态。
    """
    for line in reversed(lines):
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except Exception:
            continue
        for block in tool_uses(obj):
            if block.get("name") != TODO_TOOL:
                continue
            todos = block.get("input", {}).get("todos")
            if not isinstance(todos, list):
                return []
            pending = []
            for t in todos:
                if not isinstance(t, dict):
                    continue
                if t.get("status") == "completed":
                    continue
                content = str(t.get("content") or "").strip()
                if content:
                    pending.append(content)
            return pending  # 找到最近一次就够了
    return []


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
    problems = []

    # 检查 1：todo 没收尾干净（所有会话都查 —— 这不是 GUI 专属功能）
    pending = find_pending_todos(lines)
    if pending:
        listed = "；".join(pending[:5])
        more = f" 等 {len(pending)} 项" if len(pending) > 5 else ""
        problems.append(
            "TodoWrite 里还有没标完成的项："
            f"{listed}{more}。请确认这些是否真的做完了 —— "
            "做完了就更新 todo 状态，没做完就说明还剩什么。"
        )

    # 检查 2：改过文件但没交付（只有挂了 super-desktop 的会话才有这个工具）
    if gui_present(cwd) and edited_without_deliver(lines):
        problems.append(
            "本轮用 Edit/Write/NotebookEdit 改过文件，但还没调用 "
            "mcp__super-desktop__deliver。请在回复前调用它一次，"
            "把这次创建/修改/删除的文件列出来。"
        )

    if problems:
        # ensure_ascii=True：Windows 控制台默认 GBK，中文直出会让
        # 读 stdout 的那一端按 UTF-8 解码失败 → 整条输出被丢弃。
        # \uXXXX 转义是纯 ASCII，JSON 解析端会自动还原。
        print(json.dumps({
            "decision": "block",
            "reason": "（这是 Stop hook 的强制检查，不是建议）\n" + "\n".join(
                f"- {p}" for p in problems
            ),
        }, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)  # fail-open
