#!/usr/bin/env python3
"""超级桌面的布局计算。

三个子命令：

  find-slot  给一块指定尺寸的区域，找出画布上第一个放得下的位置
  overlaps   检查某个矩形会不会和已有的压上
  arrange    给一批 item 排成一列 / 一行

输入统一是 `desktop_summary` 的输出（JSON）。设计成无依赖、无副作用 ——
纯几何计算，输入输出都是 JSON，可以直接被管道串起来。

为什么要有这个脚本：矩形重叠「看着简单」，但真放到画布上要同时考虑
间距、"放得下"而不是"勉强塞进去"、以及找到的空位是不是一堆碎片。
心算几次就会错，错一次用户就要手动挪一堆方块。
"""

import argparse
import json
import math
import sys

# item 之间至少留这么多空白。贴着放看起来像 bug。
GAP = 40

# 找空位时，从画布当前内容的边界往外扫，不必扫负数区域。
SCAN_STEP = 20


def load_items(path):
    """读 desktop_summary 的输出，返回统一的矩形列表。"""
    if path == "-":
        data = json.load(sys.stdin)
    else:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)

    # desktop_summary 的形状可能是 {desktops:[{items:[...]}]} 或直接 [{...}]
    items = []
    if isinstance(data, dict):
        for d in data.get("desktops", []):
            items.extend(d.get("items", []))
        items.extend(data.get("items", []))
    elif isinstance(data, list):
        items = data

    rects = []
    for it in items:
        try:
            rects.append({
                "id": it.get("id", "?"),
                "label": it.get("label", ""),
                "x": float(it["x"]),
                "y": float(it["y"]),
                "w": float(it["width"]),
                "h": float(it["height"]),
            })
        except (KeyError, TypeError, ValueError):
            continue
    return rects


def rects_overlap(a, b, gap=0):
    """两个矩形（各加 gap 的呼吸空间）是否相交。"""
    return not (
        a["x"] + a["w"] + gap <= b["x"]
        or b["x"] + b["w"] + gap <= a["x"]
        or a["y"] + a["h"] + gap <= b["y"]
        or b["y"] + b["h"] + gap <= a["y"]
    )


def canvas_bounds(rects):
    """当前内容占用的边界。空画布返回全 0。"""
    if not rects:
        return {"min_x": 0, "min_y": 0, "max_x": 0, "max_y": 0}
    return {
        "min_x": min(r["x"] for r in rects),
        "min_y": min(r["y"] for r in rects),
        "max_x": max(r["x"] + r["w"] for r in rects),
        "max_y": max(r["y"] + r["h"] for r in rects),
    }


def find_slot(rects, w, h, gap=GAP):
    """从左上角开始扫，找第一个放得下且不压任何已有 item 的位置。

    扫描方式：逐列扫（先按 x 列推进，每列内按 y 行推进），
    保证结果"尽量靠上、尽量靠左"—— 符合阅读顺序。
    """
    bounds = canvas_bounds(rects)
    start_x = int(bounds["min_x"])
    start_y = int(bounds["min_y"])
    max_x = int(bounds["max_x"]) + int(w) + 2000
    max_y = int(bounds["max_y"]) + int(h) + 2000

    y = start_y
    while y <= max_y:
        x = start_x
        while x <= max_x:
            cand = {"x": x, "y": y, "w": w, "h": h}
            if not any(rects_overlap(cand, r, gap) for r in rects):
                return {"x": x, "y": y, "w": w, "h": h, "free": True}
            # 撞上了就跳到这个 item 的右边继续，不逐像素挪
            blockers = [r for r in rects if rects_overlap(cand, r, gap)]
            x = int(max(r["x"] + r["w"] for r in blockers)) + gap if blockers else x + SCAN_STEP
        y += SCAN_STEP
    return {"free": False, "reason": "no free slot found"}


def arrange(rects, sizes, gap=GAP, direction="column"):
    """把一批新 item 排成一列（或一行），从已有内容的下方/右方开始。"""
    bounds = canvas_bounds(rects)
    if direction == "column":
        x = int(bounds["min_x"])
        y = int(bounds["max_y"]) + gap if rects else 0
        out = []
        for w, h in sizes:
            out.append({"x": x, "y": y, "w": w, "h": h})
            y += int(h) + gap
        return out
    else:
        x = int(bounds["max_x"]) + gap if rects else 0
        y = int(bounds["min_y"])
        out = []
        for w, h in sizes:
            out.append({"x": x, "y": y, "w": w, "h": h})
            x += int(w) + gap
        return out


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p1 = sub.add_parser("find-slot", help="找一块放得下的空位")
    p1.add_argument("--items", required=True, help="desktop_summary 输出（- 表示 stdin）")
    p1.add_argument("--w", type=float, required=True)
    p1.add_argument("--h", type=float, required=True)
    p1.add_argument("--gap", type=float, default=GAP)

    p2 = sub.add_parser("overlaps", help="检查矩形是否与已有内容相交")
    p2.add_argument("--items", required=True)
    p2.add_argument("--x", type=float, required=True)
    p2.add_argument("--y", type=float, required=True)
    p2.add_argument("--w", type=float, required=True)
    p2.add_argument("--h", type=float, required=True)
    p2.add_argument("--gap", type=float, default=GAP)

    p3 = sub.add_parser("arrange", help="把一批 item 排列起来")
    p3.add_argument("--items", required=True)
    p3.add_argument("--sizes", required=True,
                    help='JSON 数组，如 [[520,360],[520,360]]')
    p3.add_argument("--gap", type=float, default=GAP)
    p3.add_argument("--direction", choices=["column", "row"], default="column")

    args = ap.parse_args()
    rects = load_items(args.items)

    if args.cmd == "find-slot":
        result = find_slot(rects, args.w, args.h, args.gap)
        result["existing_count"] = len(rects)
        print(json.dumps(result, ensure_ascii=False))

    elif args.cmd == "overlaps":
        cand = {"x": args.x, "y": args.y, "w": args.w, "h": args.h}
        hits = [r for r in rects if rects_overlap(cand, r, args.gap)]
        print(json.dumps({
            "overlaps": bool(hits),
            "conflicts": hits,
        }, ensure_ascii=False))

    elif args.cmd == "arrange":
        sizes = [(float(a), float(b)) for a, b in json.loads(args.sizes)]
        print(json.dumps(
            {"slots": arrange(rects, sizes, args.gap, args.direction)},
            ensure_ascii=False,
        ))

    return 0


if __name__ == "__main__":
    sys.exit(main())
