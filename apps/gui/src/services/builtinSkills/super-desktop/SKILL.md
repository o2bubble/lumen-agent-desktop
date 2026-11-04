---
name: super-desktop
description: "Practical habits for arranging content on the GUI's Super Desktop canvas — the infinite pan/zoom board where AI places text blocks, tables, charts, diagrams, forms and drawings. Covers: computing non-overlapping positions (items are absolutely positioned, nothing auto-lays-out), measuring how tall a block will render, choosing canvas regions that are actually free, and the coordinate conventions the canvas uses. Triggers when the user asks you to put something on a desktop, build a dashboard/diagram/briefing board, arrange blocks visually, or when an existing desktop needs items added without colliding with what is already there — and as a prerequisite before any multi-item desktop_create_item sequence."
---

# 超级桌面排版

超级桌面是无限画布。每个 item 有**绝对坐标**（`x`/`y`/`width`/`height`），
**没有任何自动布局** —— 放哪就是哪，压上了就是压上了。

所以「创建内容」不是难点，「放得好看、不重叠」才是。

---

## 一、先看，再放

**不要凭感觉给坐标。** 这是所有排版失败的头号来源。

```
① 看：desktop_summary —— 现有 item 的 id / 位置 / 尺寸 / 类型
② 算：用脚本算出空格在哪（别心算）
③ 放：desktop_create_item
```

`desktop_summary` 返回的是**当前真实状态**。不要用几轮之前的记忆去推 ——
用户可能自己拖过、删过。

---

## 二、坐标约定

| 概念 | 说明 |
|---|---|
| 坐标系 | 画布坐标，**左上角原点**，y 轴向下 |
| `x`/`y` | item 左上角 |
| `width`/`height` | item 尺寸（画布单位，和屏幕像素无关） |
| 缩放 | 用户可能缩放过画布，但**你给的永远是画布坐标**，不用管缩放 |

**常用尺寸参考**（不强制，但偏离太多会难看）：

| 类型 | 建议 width | 建议 height |
|---|---|---|
| text（短段落） | 320 | 120 起 |
| text（长文） | 480 | 按字数估 |
| table | 600 | 240 起 |
| chart | 520 | 360 |
| graphic（Mermaid） | 600 | 400 |
| form | 420 | 按字段数估 |
| drawing | 400 | 300 |

---

## 三、避让：用脚本，不要心算

`scripts/layout.py` 干三件事：

```bash
# 找一块放得下的空位
python scripts/layout.py find-slot --items items.json --w 520 --h 360

# 检查某个矩形会不会压到已有的
python scripts/layout.py overlaps --items items.json --x 100 --y 200 --w 520 --h 360

# 给一批新 item 排一列/一行
python scripts/layout.py arrange --items items.json --sizes '[["520","360"],["520","360"]]'
```

`items.json` 直接用 `desktop_summary` 的输出。

**为什么必须用脚本**：矩形重叠检测看着简单，实际要考虑间距、
要考虑「放得下」而不是「勉强塞进去」。心算几次就会出错，
而错一次用户就得手动挪一堆方块。

### Python 从哪来

按你环境里的 Python 约定执行（系统 python → 回退到 GUI 自带解释器）。
不要自己猜路径，先按约定探测。

---

## 四、排版习惯

**留白**：item 之间至少留 **40** 的间距。贴在一起看着像 bug，不像设计。

**分组**：相关的 block 放近，不相关的大间隔。用户一眼能看出结构，
比任何边框都有效。

**左对齐**：同列的 item 用同一个 `x`。参差的左边缘是"没做过设计"最明显的信号。

**从上到下读**：重要内容放上面。画布没有分页，用户先看到的是 y 小的。

**别铺满**：留出空白区域，用户自己还要放东西。

---

## 五、内容类型怎么选

工具描述里有每种类型的完整字段说明。这里只说**选择**：

| 你想表达 | 用 |
|---|---|
| 一段说明 / 结论 | `text`（markdown） |
| 结构化数据 | `table` |
| 趋势 / 对比 | `chart` |
| 流程 / 关系 / 结构 | `graphic`（Mermaid） |
| 可填的输入项 | `form` |
| 引用文件 / 笔记 | `ref` / `file-group` |
| 自由绘制的示意图 | `drawing` |

**能用 Mermaid 就别用 drawing**：Mermaid 是可维护的声明式结构，
drawing 是一堆绝对坐标的线条 —— 改一个字要重算全图。

**能用 table 就别用 text 排表格**：table 能排序、能编辑、能对齐。

---

## 六、更新而不是重建

改内容用 `desktop_update_item`，**不要删了重建** ——
重建会丢位置、丢用户的调整。

对 table：`partial.content` 要给**完整表格**（不是 diff）。

---

## 七、常见失败

| 现象 | 原因 |
|---|---|
| item 叠在一起 | 没用 `desktop_summary` 就给了坐标 |
| 报错 "Missing required field" | content 缺必填字段，错误信息里有正确样例 |
| 报错 "Field X should be array" | 字段类型不对，按样例改 |
| Mermaid 渲染不出来 | 代码里语法错，先在 skill 里核对写法 |
| text 显示不全 | height 给小了 |

---

## 参考

- `references/item-types.md` —— 9 种类型的**完整**字段说明（必填项、样例、易错点）。
  工具描述里只有精简版；要写具体 content 时读这个。
- `references/tool-cheatsheet.md` —— 15 个工具的速查（什么时候用哪个）
