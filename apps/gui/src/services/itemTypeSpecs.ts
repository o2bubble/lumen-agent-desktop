// ── Item 类型的「AI 契约」──
//
// 这一份是**给 AI 看的规格**：MCP 工具描述、入参校验、技能文档都从这里取。
//
// ## 为什么需要它
//
// 在它之前，同一件事有四份说法：工具描述（2000+ 字符）、handler 分支、
// itemTypeRegistry、以及各 Item 组件里的兜底。四份谁也不管谁，
// 于是出现了 `filegroup` / `file-group` 这种静默降级 —— 描述说能建，
// 实际建出来是 text，没有任何报错。
//
// ## 和 types/desktop.ts 的分工
//
// **不重复 TypeScript 已经能表达的东西**（字段名、类型、可选性）。
// 这里只补类型系统说不出来的部分：
//   · `canonical` / `aliases` —— AI 可能用的各种写法
//   · `required` / `shape`    —— 运行时校验要知道的
//   · `example`               —— 给 AI 的最小可用样例
//   · `pitfalls`              —— AI 最常搞错的地方（TS 类型里写不下的）

import type { ItemContentType } from "../types/desktop";

export interface ItemTypeSpec {
  /** 规范名 = `ItemContentType` 的成员 */
  canonical: ItemContentType;
  /** AI 可能传的其它写法，会被规范化成 canonical */
  aliases: string[];
  /** 一句话说明，进 MCP 描述 */
  summary: string;
  /** 必填字段（content 对象的顶层键） */
  required: string[];
  /** 字段 → 期望的运行时类型。只列需要校验的，不追求完整 */
  shape: Record<string, "string" | "number" | "array" | "object" | "boolean">;
  /** 机器可生成、缺了可以自动补的字段 */
  autoFill?: Record<string, unknown>;
  /** 最小可用样例，进 MCP 描述 */
  example: string;
  /** AI 常犯的错，进 MCP 描述（这些是类型系统表达不出来的） */
  pitfalls?: string[];
}

export const ITEM_TYPE_SPECS: ItemTypeSpec[] = [
  {
    canonical: "text",
    aliases: ["note", "markdown"],
    summary: "markdown note",
    // text 不列为 required：空便签是合法的，autoFill 会补成 ""
    required: [],
    shape: { text: "string", format: "string" },
    autoFill: { format: "plain", text: "" },
    example: `{type:'text',format:'markdown',text:'# 标题\\n正文'}`,
  },
  {
    canonical: "table",
    aliases: ["spreadsheet", "grid"],
    summary: "editable spreadsheet",
    required: ["columns", "rows"],
    shape: {
      columns: "array",
      rows: "array",
      cellStyles: "object",
      formats: "object",
    },
    autoFill: { columns: [], rows: [] },
    example: `{type:'table',
  columns:[{id:'a',name:'项目'},{id:'b',name:'金额',pinned:'left'}],
  rows:[{id:'r1',cells:{a:'服务器',b:'12000'}}],
  formats:{b:'0,0.00'}}`,
    pitfalls: [
      "multi-level header: groups use children[]; only leaf columns hold data",
      "column merge: cellStyles['rowId:colId'].colSpan=N",
      "NO rowSpan / conditional formatting / formulas — precompute the values",
    ],
  },
  {
    canonical: "chart",
    aliases: ["echart", "graph"],
    summary: "data visualization (ECharts)",
    required: [],
    shape: { option: "object", series: "array", data: "object", title: "string" },
    example: `{type:'chart',title:'月度销量',
  data:{labels:['一月','二月'],datasets:[{label:'销量',data:[120,150]}]},
  chartType:'bar'}`,
    pitfalls: [
      "three data channels, priority: option > series > data+chartType",
      "use data+chartType for simple charts, option for composite/map/3D",
    ],
  },
  {
    canonical: "graphic",
    aliases: ["mermaid", "diagram", "flowchart"],
    summary: "Mermaid diagram",
    required: [],
    shape: { mermaid: "string", subType: "string", nodes: "array", edges: "array" },
    autoFill: { mermaid: "graph TD;\n  A-->B;" },
    example: `{type:'graphic',mermaid:'graph TD;\\n  A[开始]-->B[结束]'}`,
    pitfalls: [
      "prefer mermaid over legacy nodes/edges (latter only does flowchart/mindmap)",
      "escape CJK punctuation in mermaid code or it fails to parse",
    ],
  },
  {
    canonical: "ref",
    aliases: ["reference", "link"],
    summary: "@ref links",
    required: ["references"],
    shape: { references: "array", note: "string" },
    example: `{type:'ref',references:[{type:'file',path:'src/main.ts',label:'入口'}]}`,
  },
  {
    canonical: "file-group",
    aliases: ["filegroup", "files"],
    summary: "file list",
    required: ["files"],
    shape: { files: "array" },
    example: `{type:'file-group',files:[{type:'file',path:'README.md'}]}`,
  },
  {
    canonical: "image",
    aliases: ["picture", "img"],
    summary: "image display",
    required: ["path"],
    shape: { path: "string", width: "number", height: "number" },
    example: `{type:'image',path:'assets/logo.png'}`,
  },
  {
    canonical: "form",
    aliases: ["fields", "input"],
    summary: "editable form",
    required: ["fields"],
    shape: { fields: "array" },
    example: `{type:'form',fields:[
  {id:'name',name:'姓名',type:'text',value:''},
  {id:'level',name:'等级',type:'select',value:'A',options:['A','B']}]}`,
    pitfalls: [
      "each field needs id + type (id auto-generated, type required)",
      "type ∈ text/textarea/number/checkbox/select/date/switch/radio/color/slider",
    ],
  },
  {
    canonical: "drawing",
    aliases: ["draw", "vector", "svg"],
    summary: "vector art",
    required: ["svg"],
    shape: { svg: "string", width: "number", height: "number", elements: "array" },
    example: `{type:'drawing',width:400,height:300,
  svg:'<svg ...>...</svg>',
  elements:[{id:'e1',type:'rect',x:10,y:10,w:100,h:60,color:'#333',strokeWidth:2,fillColor:null,opacity:1}]}`,
    pitfalls: [
      "svg is for display; elements[] makes it editable (optional)",
      "each element needs id+type; shapes: rect/circle/line/arrow/text/freehand",
    ],
  },
];

// ── 索引 ──

const byType = new Map<string, ItemTypeSpec>();
for (const spec of ITEM_TYPE_SPECS) {
  byType.set(spec.canonical, spec);
  for (const a of spec.aliases) byType.set(a, spec);
}

/** AI 传进来的任意写法 → 规范名。未知返回 undefined。 */
export function resolveTypeName(raw: string): ItemContentType | undefined {
  return byType.get(String(raw).trim().toLowerCase())?.canonical;
}

export function getSpec(canonical: ItemContentType): ItemTypeSpec | undefined {
  return byType.get(canonical);
}

/** MCP schema 的 enum —— 规范名 + 别名，让 AI 怎么写都能过 schema。 */
export function allAcceptedTypeNames(): string[] {
  return ITEM_TYPE_SPECS.flatMap((s) => [s.canonical, ...s.aliases]);
}

// ── 校验 ──

export interface ValidationResult {
  ok: boolean;
  /** 规范化后的 content（含自动补齐字段）。ok=false 时等于入参。 */
  content: Record<string, unknown>;
  /** 错误信息，直接回给 AI */
  errors: string[];
}

/**
 * 校验并规范化 item content。
 *
 * 两种待遇（对应设计决策）：
 *   · **结构错**（字段类型不对、必填缺失）→ 拒绝，报错带正确样例
 *   · **缺省**（可自动生成的字段）→ 补齐，不打扰 AI
 *
 * 不校验的类型直接放行 —— 宁可少管，不要因为规格表没跟上就挡住新类型。
 */
export function validateContent(
  rawType: string,
  rawContent: unknown,
): ValidationResult {
  const canonical = resolveTypeName(rawType);
  if (!canonical) {
    return {
      ok: false,
      content: {},
      errors: [
        `Unknown item type "${rawType}". ` +
          `Valid types: ${ITEM_TYPE_SPECS.map((s) => s.canonical).join(", ")}`,
      ],
    };
  }

  const spec = getSpec(canonical);
  const input =
    rawContent && typeof rawContent === "object"
      ? { ...(rawContent as Record<string, unknown>) }
      : {};

  // type 判别符永远以规范名为准 —— 这是 filegroup 那类别名 bug 的根治点
  input.type = canonical;

  const errors: string[] = [];

  for (const key of spec?.required ?? []) {
    const v = input[key];
    if (v === undefined || v === null) {
      errors.push(`Missing required field "${key}"`);
    }
  }

  for (const [key, want] of Object.entries(spec?.shape ?? {})) {
    const v = input[key];
    if (v === undefined || v === null) continue; // 可选字段不填不算错
    const actual = Array.isArray(v) ? "array" : typeof v;
    if (actual !== want) {
      errors.push(`Field "${key}" should be ${want}, got ${actual}`);
    }
  }

  if (errors.length) {
    return {
      ok: false,
      content: input,
      errors: [
        ...errors,
        `Expected shape: ${spec?.example ?? "(no example)"}`,
      ],
    };
  }

  // 补默认值（只补缺的，不覆盖 AI 给的）
  for (const [key, def] of Object.entries(spec?.autoFill ?? {})) {
    if (input[key] === undefined || input[key] === null) input[key] = def;
  }

  // form 的 field.id 机器可生成
  if (canonical === "form" && Array.isArray(input.fields)) {
    input.fields = (input.fields as any[]).map((f, i) => {
      if (!f || typeof f !== "object") return f;
      return f.id ? f : { ...f, id: f.id ?? `f${i + 1}` };
    });
    const bad = (input.fields as any[]).findIndex((f) => f && !f.type);
    if (bad >= 0) {
      return {
        ok: false,
        content: input,
        errors: [
          `fields[${bad}] is missing "type". ` +
            `Valid: text/textarea/number/checkbox/select/date/switch/radio/color/slider`,
          `Expected shape: ${spec?.example ?? ""}`,
        ],
      };
    }
  }

  return { ok: true, content: input, errors: [] };
}

// ── 生成 MCP 工具描述 ──

/**
 * 从规格表生成 `desktop_create_item` 的类型说明部分。
 *
 * **只给字段名和一句话**，不给样例、不给易错点 —— 那些在
 * `super-desktop` 技能的 `references/item-types.md` 里。
 *
 * 为什么这样分：工具描述是**每轮对话都在占上下文**的常驻内容，
 * 而具体字段怎么写只在**真的要创建**时才需要。AI 读到这里的
 * 「必需字段」就知道该去技能里查细节了。
 *
 * 但校验仍然严格 —— 描述薄不代表契约松，错了照样报错并给出正确样例。
 */
export function describeTypesForMcp(): string {
  const lines: string[] = ["Type choices (full field docs: load the `super-desktop` skill):"];
  for (const s of ITEM_TYPE_SPECS) {
    const alias = s.aliases.length ? ` (aliases: ${s.aliases.join(", ")})` : "";
    const req = s.required.length ? ` — required: ${s.required.join(", ")}` : "";
    lines.push(`- ${s.canonical}${alias}: ${s.summary}${req}`);
  }
  lines.push("");
  lines.push(
    "IMPORTANT: content.type must match the `type` argument — " +
      "the server normalizes it and rejects mismatched structure.",
  );
  return lines.join("\n");
}

// ── desktop_create_item 的完整工具描述 ──

/**
 * 结构部分由 `describeTypesForMcp()` 生成（和校验同源），
 * 「不支持什么」是手写的判断性内容 —— 机器生成不出来，也不该丢。
 *
 * 详细的布局技巧、坐标计算、避让规则不在工具描述里，而在
 * `super-desktop` 技能中（AI 需要时自己加载），避免每轮都占上下文。
 */
export function describeCreateItemTool(): string {
  return [
    "Create an item on a desktop.",
    "",
    describeTypesForMcp(),
    "",
    "NOT supported (compute these yourself and write the result):",
    "- table: rowSpan, conditional formatting, formulas",
    "- chart: 3D series, data-driven animation",
    "",
    "For layout help — computing non-overlapping positions, measuring text,",
    "snapping to a grid — load the `super-desktop` skill, which ships helper scripts.",
  ].join("\n");
}
