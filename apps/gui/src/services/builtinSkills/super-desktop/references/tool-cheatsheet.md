# 超级桌面工具速查

15 个 MCP 工具，按「你想干什么」组织。参数的完整 schema 见工具本身 ——
这里只回答**什么时候用哪个**。

---

## 看

| 工具 | 什么时候用 |
|---|---|
| `desktop_list` | 只知道有桌面，不知道有哪些。**开局先调这个** |
| `desktop_summary` | 要看画布上有什么、在哪、多大。**排版前必调** |
| `desktop_get_items` | 要某个 item 的完整内容（summary 不含 content） |
| `desktop_search` | 知道内容但不知道在哪个 item 里 |

**别跳过 `desktop_summary`**。它给的坐标是排版计算的输入，
少了它就只能猜，猜了就会重叠。

---

## 建

| 工具 | 说明 |
|---|---|
| `desktop_create` | 新桌面。名字要能区分 —— "Desktop 1/2/3" 用户分不清 |
| `desktop_create_item` | 放一个内容块。**一次调一个**，别指望数组 |

批量创建时，每次都要给坐标。用 `scripts/layout.py arrange` 一次算好全部位置，
再逐个创建 —— 比建完再挪省事得多。

---

## 改

| 工具 | 说明 |
|---|---|
| `desktop_update_item` | 改内容或元数据。**不要删了重建**（丢位置） |
| `desktop_move_item` | 只挪位置 |
| `desktop_resize_item` | 只改尺寸 |

对 table 调 `update_item` 时，`partial.content` 要给**完整表格**——
它是浅合并，只给一部分会把另一半留成旧的。

---

## 连

| 工具 | 说明 |
|---|---|
| `desktop_connect` | 两个 item 的锚点之间连线（from/to 要带锚点方向） |
| `desktop_disconnect` | 断开一条连线 |

连线适合表达流程/依赖。**平面关系用 Mermaid 更省事** ——
Mermaid 自动排布，连线要自己算锚点。

---

## 删 / 回退

| 工具 | 说明 |
|---|---|
| `desktop_delete_items` | 批量删（接 id 数组） |
| `desktop_delete` | 删整个桌面。**先调 list 确认 id** |
| `desktop_undo` / `desktop_redo` | 按桌面回退 |

---

## 典型流程

**「做一页介绍」**

```
desktop_list                      → 有桌面吗
desktop_summary                   → 现在有什么
layout.py find-slot               → 新内容放哪
desktop_create_item × N           → 逐个创建
desktop_connect                   → 需要的话连起来
```

**「更新一个图表」**

```
desktop_summary                   → 找到那个 item 的 id
desktop_update_item               → 只改 content
```

**「整理一下」**

```
desktop_summary                   → 全量位置
（自己判断怎么排）
desktop_move_item × N
```
