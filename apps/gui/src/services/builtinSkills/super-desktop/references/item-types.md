# Item 类型的完整字段说明

9 种类型，每种给出：字段、必填项、样例、易错点。
MCP 工具描述里有精简版；这里是**完整版**，读到这里就不用再翻工具描述了。

---

## text — markdown 便签

```js
{type:'text', format:'markdown', text:'# 标题
正文'}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `text` | string | 正文，可空 |
| `format` | string | `'plain'` 或 `'markdown'`，默认 plain |

---

## table — 可编辑表格

```js
{type:'table',
 columns:[{id:'a',name:'项目'},{id:'b',name:'金额',pinned:'left'}],
 rows:[{id:'r1',cells:{a:'服务器',b:'12000'}}],
 cellStyles:{'r1:a':{bold:true}},
 formats:{b:'0,0.00'}}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `columns` | array | **必填**。列定义 |
| `rows` | array | **必填**。行数据 |
| `cellStyles` | object | `{"行id:列id": {color, bgColor, bold, italic, align, colSpan}}` |
| `formats` | object | `{列id: '0,0.00' \| '0,0' \| '0%'}` |

**列定义**：
- 普通列：`{id, name, width?, pinned?: 'left'|'right'}`
- 列组（多级表头）：`{id, name, children:[...]}` —— 组不承载数据

**易错点**：
- 多级表头用 `children` 树，**只有叶子列是数据列**
- 列合并用 `cellStyles['行id:列id'].colSpan=N`（向右合并 N 列）
- **不支持**：行合并（rowSpan）、条件格式、公式 —— 都要自己先算好

---

## chart — 数据可视化（ECharts）

三级数据通道，**优先级从高到低**：

```js
// ① option —— 完整 ECharts 配置（复杂图表用这个）
{type:'chart', title:'...', option:{...}}

// ② series —— 裸 series 数组
{type:'chart', series:[{type:'bar', data:[1,2,3]}]}

// ③ data + chartType —— 简单形式（最省事）
{type:'chart', title:'销量',
 data:{labels:['一月','二月'], datasets:[{label:'销量',data:[120,150]}]},
 chartType:'bar'}
```

`chartType` 可选值：`bar` / `line` / `pie` / `scatter` / `area` / `radar` / `funnel` / `gauge`

**选择建议**：简单柱状/折线/饼图用 ③；组合图、地图、3D 用 ①。

---

## graphic — 图（推荐 Mermaid）

```js
{type:'graphic', mermaid:'graph TD;
  A[开始]-->B[结束]'}
```

支持全部 Mermaid 类型：flowchart / sequenceDiagram / mindmap / stateDiagram /
gantt / pie / classDiagram / erDiagram ...

旧的结构化方式（只支持 flowchart/mindmap，不推荐）：
```js
{type:'graphic', subType:'flowchart',
 nodes:[{id,label,x,y,width,height}],
 edges:[{id,from,to,label?}]}
```

**易错点**：Mermaid 代码里中文括号要转义，否则解析失败。

---

## ref — 引用链接

```js
{type:'ref', references:[{type:'file', path:'src/main.ts', label:'入口'}]}
```

`references` 必填。可选 `note` 字段加一句说明。

---

## file-group — 文件列表

```js
{type:'file-group', files:[{type:'file', path:'README.md'}]}
```

`files` 必填。

---

## image — 图片

```js
{type:'image', path:'assets/logo.png', width:400, height:300}
```

`path` 必填。

---

## form — 可填表单

```js
{type:'form', fields:[
  {id:'name', name:'姓名', type:'text', value:''},
  {id:'level', name:'等级', type:'select', value:'A', options:['A','B']}
]}
```

`fields` 必填。每个 field：

| 字段 | 说明 |
|---|---|
| `id` | 唯一标识，**缺失会自动生成** |
| `name` | 显示名 |
| `type` | **必填**，见下 |
| `value` | 当前值 |
| `options` | select/radio 的选项 |
| `placeholder` / `required` | 通用 |
| `min` / `max` / `step` | number/slider 专用 |
| `rows` | textarea 专用 |

`type` 可选值：`text` / `textarea` / `number` / `checkbox` / `select` /
`date` / `switch` / `radio` / `color` / `slider`

---

## drawing — 矢量图

```js
{type:'drawing', width:400, height:300,
 svg:'<svg>...</svg>',                    // 显示用，必填
 elements:[{id:'e1', type:'rect',         // 可编辑的矢量，可选
            x:10,y:10,w:100,h:60,
            color:'#333', strokeWidth:2, fillColor:null, opacity:1}]}
```

**元素类型**：

| type | 必需字段 |
|---|---|
| `rect` | x, y, w, h, color, strokeWidth, fillColor, opacity |
| `circle` | cx, cy, r, color, strokeWidth, fillColor, opacity |
| `line` / `arrow` | x1, y1, x2, y2, color, strokeWidth, opacity |
| `text` | x, y, text, color, fontSize, opacity |
| `freehand` | points:[{x,y}], color, strokeWidth, opacity |

每个元素都要有 `id` 和 `type`。

**能用 Mermaid 就别用 drawing** —— Mermaid 改一个字就行，drawing 要重算全图。

---

## 通用规则

- `content.type` 必须和 `type` 参数一致，服务端会规范化
- 缺省字段会自动补齐；**结构错误会直接报错**并给出正确样例
