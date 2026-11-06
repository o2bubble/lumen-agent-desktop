#!/usr/bin/env python3
"""解压备份包（.tar.gz），或只取其中几个文件。

## 为什么用 Python 而不是纯 Node

插件原本自己实现了一套 tar 解析（`tar-writer.cjs`），为了绕开
「Windows 自带的 tar 是 bsdtar、不认 --force-local」这个问题。

但手写解析在真实备份上遇到了 O(n²)：包里有个 130MB 的单文件，
旧实现每次 chunk 到达都 `Buffer.concat([pending, chunk])`，
把整个 130MB 重拷一遍 —— 45981 个 chunk 下来，实测 **164 秒**。

改过两版（只留尾部、状态机流式写）仍然 180 秒，因为在 Node 里
逐块同步写 29000 个小文件的系统调用开销太大。

Python 标准库的 `tarfile` 是 C 实现的，同样的包 **27 秒**。

## 用法

    # 全解
    python extract.py <包路径> <目标目录>

    # 只取指定文件（看包信息时用这个，不用解 29000 个文件）
    python extract.py <包路径> <目标目录> --only manifest.json IMPORT_GUIDE.md

退出码 0 = 成功；非 0 = 失败（stderr 有原因）。

输出一行 JSON 到 stdout：{"files": N, "dirs": M}
"""

import json
import os
import sys
import tarfile

# 目标目录允许的最大文件数。防止解一个恶意包把磁盘写满。
MAX_ENTRIES = 200_000


def _safe_member(member: tarfile.TarInfo, dest_abs: str) -> bool:
    """member 解出来之后是否仍在 dest 内（挡住 ../ 和绝对路径）。"""
    target = os.path.realpath(os.path.join(dest_abs, member.name))
    return target == dest_abs or target.startswith(dest_abs + os.sep)


def main() -> int:
    args = sys.argv[1:]
    only = None
    if "--only" in args:
        i = args.index("--only")
        only = set(args[i + 1:])
        args = args[:i]

    if len(args) != 2:
        print(
            "用法: extract.py <包路径> <目标目录> [--only 文件1 文件2 ...]",
            file=sys.stderr,
        )
        return 2

    pkg, dest = args
    if not os.path.isfile(pkg):
        print(f"包不存在：{pkg}", file=sys.stderr)
        return 3

    os.makedirs(dest, exist_ok=True)
    dest_abs = os.path.realpath(dest)

    files = 0
    dirs = 0
    try:
        with tarfile.open(pkg, "r:gz") as tf:
            for member in tf:
                # --only 模式：只解指定的那几个，其余只推进读取游标
                # （tarfile 迭代时本来就会跳过数据，不需要手工 seek）
                if only is not None:
                    name = member.name.lstrip("./")
                    if name not in only:
                        continue

                if files + dirs > MAX_ENTRIES:
                    print(f"包内条目超过 {MAX_ENTRIES}，拒绝解压", file=sys.stderr)
                    return 4

                if not _safe_member(member, dest_abs):
                    print(f"包内含越界路径，拒绝解压：{member.name}", file=sys.stderr)
                    return 5

                # filter='data' 会再挡一遍绝对路径/链接穿越（Python 3.12+）
                tf.extract(member, dest, filter="data")
                if member.isdir():
                    dirs += 1
                elif member.isfile():
                    files += 1
    except tarfile.TarError as e:
        print(f"不是有效的 tar.gz：{e}", file=sys.stderr)
        return 6
    except OSError as e:
        print(f"写入失败：{e}", file=sys.stderr)
        return 7

    print(json.dumps({"files": files, "dirs": dirs}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
