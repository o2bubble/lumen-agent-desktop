var Se = Object.defineProperty, Ce = Object.defineProperties;
var ze = Object.getOwnPropertyDescriptors;
var pe = Object.getOwnPropertySymbols;
var Me = Object.prototype.hasOwnProperty, $e = Object.prototype.propertyIsEnumerable;
var H = (t, o, e) => o in t ? Se(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e, y = (t, o) => {
  for (var e in o || (o = {}))
    Me.call(o, e) && H(t, e, o[e]);
  if (pe)
    for (var e of pe(o))
      $e.call(o, e) && H(t, e, o[e]);
  return t;
}, $ = (t, o) => Ce(t, ze(o));
var C = (t, o, e) => H(t, typeof o != "symbol" ? o + "" : o, e);
import { L as ue, af as qe, D as N, ai as B, az as Ae, K as Le, t as xe, j as be, F as j, $ as _ } from "./index-B71UcaB7.js";
function Je(t, o) {
  var u;
  const e = o.sheets[0], l = t.sheets[0];
  if (!e) return t;
  if (!l)
    return {
      sheets: [Ee(e, e.name)],
      activeSheet: 0,
      themeColors: o.themeColors,
      date1904: t.date1904,
      cellImages: t.cellImages
    };
  const a = {
    name: l.name || e.name,
    index: 0,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: e.styles.map((c) => y({}, c)),
    merges: e.merges.map((c) => y({}, c)),
    columns: new Map(e.columns),
    rows: new Map(e.rows),
    defaultColWidth: e.defaultColWidth,
    defaultRowHeight: e.defaultRowHeight,
    freeze: y({}, e.freeze),
    // 条件格式 / 数据验证 不带过来 —— 数据可能不在模板的目标列上, 套规则会误命中
    conditional: [],
    dataValidations: [],
    // 模板的图 / 图表 / 形状 全部不带 —— 模板是"样式骨架", 不是内容
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: e.showGridLines
  };
  let n = 0, r = 0;
  for (const c of l.cells.values()) {
    const h = e.cells.get(ue(c.row, c.col));
    a.cells.set(ue(c.row, c.col), {
      row: c.row,
      col: c.col,
      type: c.type,
      raw: c.raw,
      rich: c.rich,
      formula: c.formula,
      hyperlink: c.hyperlink,
      comment: c.comment,
      styleId: (u = h == null ? void 0 : h.styleId) != null ? u : 0,
      dispImgId: c.dispImgId
    }), c.row > n && (n = c.row), c.col > r && (r = c.col);
  }
  const f = e.columns.size ? Math.max(...e.columns.keys()) + 1 : 0, p = e.rows.size ? Math.max(...e.rows.keys()) + 1 : 0;
  return a.dimension = {
    rows: Math.max(l.dimension.rows, n + 1, p),
    cols: Math.max(l.dimension.cols, r + 1, f)
  }, {
    sheets: [a],
    activeSheet: 0,
    themeColors: o.themeColors,
    date1904: t.date1904,
    cellImages: t.cellImages
  };
}
function Ee(t, o) {
  return {
    name: o,
    index: 0,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: t.styles.map((e) => y({}, e)),
    merges: t.merges.map((e) => y({}, e)),
    columns: new Map(t.columns),
    rows: new Map(t.rows),
    defaultColWidth: t.defaultColWidth,
    defaultRowHeight: t.defaultRowHeight,
    freeze: y({}, t.freeze),
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: t.showGridLines
  };
}
function Xe(t, o) {
  return qe(t, o);
}
const Ie = {
  // 放大镜
  find: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  // 漏斗
  filter: '<path d="M3 5h18l-7 8.5V20l-4-2.2V13.5z"/>',
  // 漏斗 + 斜杠(清除筛选)
  "clear-filter": '<path d="M3 5h18l-7 8.5V20l-4-2.2V13.5z"/><line x1="3" y1="3" x2="21" y2="21"/>',
  // 上下箭头(排序)
  sort: '<path d="M7 16l3 3 3-3"/><line x1="10" y1="19" x2="10" y2="5"/><path d="M17 8l-3-3-3 3"/><line x1="14" y1="5" x2="14" y2="19"/>',
  // 透视表: 小表格 + 汇总箭头
  "pivot-table": '<rect x="3" y="4" width="13" height="13" rx="1.5"/><line x1="3" y1="8" x2="16" y2="8"/><line x1="7" y1="4" x2="7" y2="17"/><path d="M14 14h7"/><path d="M18 11l3 3-3 3"/>',
  // 条件格式: 渐变色块 + 小滴
  "conditional-format": '<rect x="3" y="4" width="13" height="13" rx="1.5"/><path d="M3 9h13"/><path d="M3 13h13"/><circle cx="18.5" cy="15" r="3"/><path d="M18.5 9.5c1.2 1.4 2 2.7 2 3.8a2 2 0 0 1-4 0c0-1.1.8-2.4 2-3.8z"/>',
  // 数字格式: 百分号 + 小数点(123)
  "number-format": '<text x="2" y="11" font-size="9" font-family="sans-serif" fill="currentColor" stroke="none">123</text><circle cx="5" cy="17" r="1" fill="currentColor" stroke="none"/><path d="M21 6l-7 12"/><circle cx="14.5" cy="8" r="2"/><circle cx="20.5" cy="16" r="2"/>',
  // 格式刷: 刷子
  "format-painter": '<path d="M3 4h12v5H3z"/><path d="M13 6h5v4a2 2 0 0 1-2 2h-5"/><path d="M11 12v3a2 2 0 0 1-2 2H8v3h3v-3"/>',
  // 下载(导出)
  export: '<line x1="12" y1="3" x2="12" y2="15"/><path d="M8 11l4 4 4-4"/><path d="M4 19h16"/>',
  // 放大镜带 +
  zoom: '<circle cx="10" cy="10" r="6"/><line x1="20" y1="20" x2="14.5" y2="14.5"/><line x1="10" y1="7.5" x2="10" y2="12.5"/><line x1="7.5" y1="10" x2="12.5" y2="10"/>',
  // 两个叠框(复制)
  copy: '<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15H4V5a1 1 0 0 1 1-1h10v1"/>',
  // 十字线(冻结行列)
  freeze: '<line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/>',
  // 自动换行:两条文本线 + 折回箭头
  "wrap-text": '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="10" y2="18"/><path d="M3 12h15a3 3 0 0 1 0 6h-3"/><polyline points="17 15 14 18 17 21"/>',
  // 模板:文档 + 排版网格
  template: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><line x1="4" y1="8" x2="20" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/>',
  // 图片工具:山+太阳的图片框 + 小齿轮(批量转换)
  "image-tools": '<rect x="3" y="4" width="14" height="14" rx="1.5"/><circle cx="8" cy="9" r="1.5"/><polyline points="3 16 7 12 11 16 14 13 17 16"/><path d="M19 19l2 2M19 21l2-2"/>',
  // 图片(插入):山+太阳的图片框(WPS 图片)
  image: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="8.5" cy="9" r="1.5"/><polyline points="4 18 9 12 13 16 16 13 20 17"/>',
  // 三点(更多)
  more: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  // —— 1.16.0 开始板块新工具 ——
  // 粗体 B
  bold: '<path d="M7 5h6a3.3 3.3 0 0 1 0 6.5H7z"/><path d="M7 11.5h7a3.3 3.3 0 0 1 0 6.5H7z"/>',
  // 斜体 I
  italic: '<line x1="10" y1="4" x2="19" y2="4"/><line x1="5" y1="20" x2="14" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>',
  // 下划线 U
  underline: '<path d="M7 4v6a5 5 0 0 0 10 0V4"/><line x1="5" y1="20" x2="19" y2="20"/>',
  // 字体 A
  font: '<path d="M4 18L9 5l5 13"/><line x1="5.6" y1="14" x2="12.4" y2="14"/><path d="M17 18h4"/>',
  // 字号 A↕
  "font-size": '<path d="M3 17L7 6l4 11"/><line x1="4.3" y1="13.5" x2="9.7" y2="13.5"/><path d="M17 8l3-3 3 3"/><path d="M17 16l3 3 3-3"/><line x1="20" y1="5" x2="20" y2="19"/>',
  // 左对齐
  "align-left": '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="13" y2="10"/><line x1="4" y1="14" x2="17" y2="14"/><line x1="4" y1="18" x2="11" y2="18"/>',
  // 居中对齐
  "align-center": '<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="10" x2="17" y2="10"/><line x1="5" y1="14" x2="19" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/>',
  // 右对齐
  "align-right": '<line x1="4" y1="6" x2="20" y2="6"/><line x1="11" y1="10" x2="20" y2="10"/><line x1="7" y1="14" x2="20" y2="14"/><line x1="13" y1="18" x2="20" y2="18"/>',
  // 垂直对齐(上下)
  "align-middle": '<line x1="4" y1="12" x2="20" y2="12"/><path d="M9 8l3-4 3 4"/><path d="M9 16l3 4 3-4"/>',
  // 合并单元格
  merge: '<rect x="3" y="6" width="18" height="12" rx="1"/><line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="2 2"/>',
  // 框线(网格)
  borders: '<rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/>',
  // 增加缩进
  "indent-inc": '<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M3 9l4 3-4 3z" fill="currentColor" stroke="none"/>',
  // 减少缩进
  "indent-dec": '<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M7 9l-4 3 4 3z" fill="currentColor" stroke="none"/>',
  // 单元格(行列增删)
  cells: '<rect x="3" y="4" width="18" height="16" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>',
  // 增大字号 A▲
  "font-grow": '<path d="M3 17L7 7l4 10"/><line x1="4.3" y1="13.5" x2="9.7" y2="13.5"/><path d="M15 11l3-3 3 3"/><line x1="18" y1="8" x2="18" y2="17"/>',
  // 减小字号 A▼
  "font-shrink": '<path d="M3 17L7 7l4 10"/><line x1="4.3" y1="13.5" x2="9.7" y2="13.5"/><path d="M15 14l3 3 3-3"/><line x1="18" y1="8" x2="18" y2="17"/>',
  // 删除线 S̶
  strike: '<path d="M16 7a4 3 0 0 0-4-2c-2 0-4 1-4 3 0 1.5 1.5 2 4 2.5"/><path d="M8 16a4 3 0 0 0 4 2c2.5 0 4-1.2 4-3"/><line x1="4" y1="12" x2="20" y2="12"/>',
  // 填充色(油漆桶)
  "fill-color": '<path d="M4 12l7-7 7 7-6.5 6.5a1.5 1.5 0 0 1-2 0z"/><path d="M4 12l-1 4 4-1"/><path d="M18.5 15c1 1.3 1.7 2.2 1.7 3a1.7 1.7 0 0 1-3.4 0c0-.8.7-1.7 1.7-3z"/>',
  // 字体颜色(A + 色条)
  "font-color": '<path d="M4 15L8 6l4 9"/><line x1="5.4" y1="12" x2="10.6" y2="12"/><rect x="3" y="19" width="14" height="3" rx="1" fill="currentColor" stroke="none"/>',
  // 垂直对齐:上
  "align-top": '<line x1="4" y1="4" x2="20" y2="4"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/>',
  // 垂直对齐:中
  "align-vmiddle": '<line x1="4" y1="12" x2="20" y2="12"/><line x1="7" y1="7" x2="17" y2="7"/><line x1="7" y1="17" x2="13" y2="17"/>',
  // 垂直对齐:下
  "align-bottom": '<line x1="4" y1="20" x2="20" y2="20"/><line x1="7" y1="16" x2="17" y2="16"/><line x1="7" y1="12" x2="13" y2="12"/>',
  // 百分比 %
  percent: '<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><line x1="6" y1="18" x2="18" y2="6"/>',
  // 千分位(逗号样式)
  comma: '<path d="M7 13c1.6 0 2.6-1.1 2.6-2.6S8.4 8 7 8"/><path d="M13 13c1.6 0 2.6-1.1 2.6-2.6S14.4 8 13 8"/><path d="M7 13c0 1.5-.7 2.4-1.7 3M13 13c0 1.5-.7 2.4-1.7 3"/>',
  // 求和 Σ
  autosum: '<path d="M17 5H7l6 7-6 7h10"/>',
  // 粘贴(剪贴板)
  paste: '<rect x="6" y="4" width="12" height="17" rx="1.5"/><rect x="9" y="2.5" width="6" height="3.2" rx="1"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="17" x2="13" y2="17"/>',
  // 剪切(剪刀)
  cut: '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><line x1="8" y1="7.4" x2="20" y2="16"/><line x1="8" y1="16.6" x2="20" y2="8"/>',
  // 清除格式(橡皮)
  "clear-format": '<path d="M9 20l-5-5a1.5 1.5 0 0 1 0-2l7-7a1.5 1.5 0 0 1 2 0l4 4a1.5 1.5 0 0 1 0 2l-8 8z"/><line x1="9" y1="20" x2="20" y2="20"/><line x1="7" y1="11" x2="14" y2="18"/>',
  // 货币 ¥
  currency: '<path d="M7 5l5 6 5-6"/><line x1="12" y1="11" x2="12" y2="20"/><line x1="8" y1="13.5" x2="16" y2="13.5"/><line x1="8" y1="16.5" x2="16" y2="16.5"/>',
  // 增加小数位 .00↑
  "decimal-inc": '<circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none"/><line x1="8" y1="20" x2="8" y2="12"/><path d="M6 14l2-2 2 2"/><circle cx="14" cy="18" r="1.2" fill="currentColor" stroke="none"/><circle cx="19" cy="18" r="1.2" fill="currentColor" stroke="none"/>',
  // 减少小数位 .0↓
  "decimal-dec": '<circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none"/><line x1="8" y1="12" x2="8" y2="20"/><path d="M6 18l2 2 2-2"/><circle cx="14" cy="18" r="1.2" fill="currentColor" stroke="none"/>',
  // 批注(对话气泡)
  comment: '<path d="M4 5h16v11H10l-4 4v-4H4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12.5" x2="13" y2="12.5"/>',
  // 新建批注(气泡 + 加号)
  "comment-new": '<path d="M3 5h13v9H8l-3 3v-3H3z"/><path d="M19 3v6M22 6h-6"/>',
  // 删除批注(气泡 + 叉)
  "comment-delete": '<path d="M3 5h13v9H8l-3 3v-3H3z"/><path d="M18 4l4 4m0-4l-4 4"/>',
  // 上一条(气泡 + 左箭头)
  "comment-prev": '<path d="M5 5h14v9h-8l-4 4v-4H5z"/><path d="M14 9.5H9m2.5-2.5L9 9.5l2.5 2.5"/>',
  // 下一条(气泡 + 右箭头)
  "comment-next": '<path d="M5 5h14v9h-8l-4 4v-4H5z"/><path d="M9 9.5h5M11.5 7l2.5 2.5-2.5 2.5"/>',
  // 显示批注(气泡 + 眼睛)
  "comment-show": '<path d="M4 4h16v10H9l-4 4v-4H4z"/><path d="M6 8.5s2-2.5 6-2.5 6 2.5 6 2.5-2 2.5-6 2.5-6-2.5-6-2.5z"/><circle cx="12" cy="8.5" r="1"/>',
  // 锁定单元格(格 + 挂锁)
  "cell-lock": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><rect x="9" y="12" width="6" height="5" rx="0.6"/><path d="M10.2 12v-1.6a1.8 1.8 0 0 1 3.6 0V12"/>',
  // 允许编辑区域(格 + 铅笔)
  "allow-edit-ranges": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M8 15l1-3 6-6 2 2-6 6z"/><path d="M14 8l2 2"/>',
  // 保护工作表(盾 + 表格)
  "protect-sheet": '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M8.5 11.5l2.5 2.5 4.5-4.5"/>',
  // 保护工作簿(盾 + 书页)
  "protect-workbook": '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 8h6M9 11h6M9 14h4"/>',
  // 共享工作簿(三点连线)
  "share-workbook": '<circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 11l8-4M8 13l8 4"/>',
  // 编辑栏(fx + 输入条)
  "view-formula-bar": '<rect x="3" y="7" width="18" height="6" rx="1"/><text x="5" y="12" font-size="5" font-style="italic" font-family="Georgia,serif" fill="currentColor" stroke="none">fx</text><path d="M11 10h8"/>',
  // 行号列标(表格左上角标)
  "view-headers": '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 8h18M9 4v16"/><rect x="3" y="4" width="6" height="4" fill="currentColor" stroke="none" opacity="0.75"/><rect x="3" y="8" width="6" height="12" fill="currentColor" stroke="none" opacity="0.2"/>',
  // 网格线(九宫格)
  "view-gridlines": '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
  // 任务窗格(主区 + 右侧栏)
  "view-taskpane": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M15 4v16"/><path d="M17 8h2M17 11h2M17 14h2"/>',
  // 填充(向下箭头 + 底条)
  fill: '<line x1="12" y1="3" x2="12" y2="13"/><path d="M8 9l4 4 4-4"/><rect x="4" y="17" width="16" height="3" rx="1"/>',
  // 快速填充(闪电)
  "flash-fill": '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
  // 单元格样式(格 + 样式点)
  "cell-styles": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 9h7M7 13h4"/><circle cx="16.5" cy="14" r="2.2"/>',
  // 表格样式(隔行表)
  "table-styles": '<rect x="3" y="4" width="18" height="16" rx="1"/><rect x="3" y="4" width="18" height="4" fill="currentColor" stroke="none" opacity="0.85"/><rect x="3" y="12" width="18" height="4" fill="currentColor" stroke="none" opacity="0.2"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>',
  // 转换(双向箭头)
  convert: '<path d="M4 8h13"/><path d="M14 5l3 3-3 3"/><path d="M20 16H7"/><path d="M10 13l-3 3 3 3"/>',
  // 重新应用(漏斗 + 循环箭头)
  reapply: '<path d="M3 5h13l-5 6v5l-3-1.5V11z"/><path d="M19 14a3.5 3.5 0 0 1-5.5 2.9"/><path d="M19 11v3h-3"/>',
  // 数据有效性(框 + 对勾)
  "data-validation": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M8 12.5l2.5 2.5L16 9"/>',
  // 下拉列表(框 + 列表 + 下拉角标)
  "dropdown-list": '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 10h6M7 14h6"/><path d="M15.5 9.5l2 2 2-2"/>',
  // 删除重复项(行 + 叉)
  "remove-duplicates": '<rect x="3" y="4" width="12" height="15" rx="1"/><path d="M6 8h6M6 11.5h6M6 15h4"/><path d="M16 15l5 5m0-5l-5 5"/>',
  // 文本分列(一列拆两列 + 分隔箭头)
  "text-to-columns": '<path d="M3 5h6v14H3z"/><path d="M15 5h6v14h-6z"/><path d="M10.5 12h3"/><path d="M12.5 10l1.5 2-1.5 2M11.5 10l-1.5 2 1.5 2"/>',
  // 插入函数(fx)
  fx: '<text x="2" y="17" font-size="14" font-style="italic" font-family="Georgia,serif" fill="currentColor" stroke="none">fx</text>',
  // 函数库(花括号)
  function: '<path d="M8 4c-2 0-3 1-3 4v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 3 1 4 3 4"/><path d="M16 4c2 0 3 1 3 4v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 3-1 4-3 4"/>',
  // 计算选项(计算器)
  "calc-options": '<rect x="4" y="3" width="16" height="18" rx="1.5"/><rect x="7" y="6" width="10" height="3" rx="0.5"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>',
  // 重算(双向循环箭头)
  recalc: '<path d="M20 11a8 8 0 0 0-14-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  // 打印预览(纸 + 放大镜)
  "print-preview": '<path d="M5 3h9l4 4v6" fill="none"/><path d="M14 3v4h4"/><path d="M5 3v18h6"/><circle cx="16" cy="17" r="3.2"/><line x1="18.4" y1="19.4" x2="21" y2="22"/>',
  // 页面设置(纸 + 页边距框)
  "page-setup": '<rect x="5" y="3" width="14" height="18" rx="1"/><rect x="8" y="6.5" width="8" height="11" stroke-dasharray="2 2"/>',
  // 页边距(纸 + 内框 + 四向边距箭头)
  "page-margins": '<rect x="4" y="3" width="16" height="18" rx="1"/><rect x="8" y="7" width="8" height="10" stroke-dasharray="2 2"/><path d="M12 3v4M12 17v4M4 12h4M16 12h4"/>',
  // 纸张方向(横向纸 + 旋转箭头)
  "page-orientation": '<rect x="3" y="7" width="13" height="10" rx="1"/><path d="M18.5 8.5a4 4 0 0 1 1.5 3.5"/><path d="M20.5 9l-.5 3-2.5-1"/>',
  // 纸张大小(纸 + 折角)
  "paper-size": '<path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/>',
  // 打印缩放(纸 + 内外向箭头)
  "print-scale": '<rect x="5" y="4" width="14" height="16" rx="1"/><path d="M8 9l2 2-2 2M16 9l-2 2 2 2"/><path d="M10 11h4"/>',
  // 打印标题(表格 + 顶行左列加重)
  "print-titles": '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16" stroke-width="2"/><path d="M9 4v16" stroke-width="2"/>',
  // 打印网格线(满格网格)
  "print-gridlines": '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16M15 4v16M3 9.3h18M3 14.6h18"/>',
  // 打印行号列标(表格 + 顶行/左列浅色底=行列头)
  "print-headings": '<rect x="3" y="4" width="18" height="16" rx="1" fill="none"/><rect x="3" y="4" width="18" height="3.6" fill="currentColor" opacity="0.22" stroke="none"/><rect x="3" y="4" width="4" height="16" fill="currentColor" opacity="0.22" stroke="none"/><path d="M7 4v16M3 7.6h18"/>',
  // 打印区域(虚线框 + 十字)
  "print-area": '<rect x="3" y="5" width="18" height="14" rx="1" stroke-dasharray="3 2"/><path d="M9 12h6M12 9v6"/>',
  // 分页符(左右页边 + 中间断线)
  "page-breaks": '<line x1="3" y1="4" x2="3" y2="20"/><line x1="21" y1="4" x2="21" y2="20"/><line x1="7" y1="12" x2="17" y2="12" stroke-dasharray="2.5 2"/>',
  // 背景/水印(带斜纹的页 + 图片角)
  background: '<rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="8" cy="9" r="1.5"/><path d="M4 17l4-4 3 3 4-4 5 5"/>',
  // 齿轮(设置)
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  // 下拉小箭头
  caret: '<path d="M6 9l6 6 6-6"/>'
};
function Ze(t) {
  return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + t + "</svg>";
}
function Fe(t) {
  const o = [[]];
  for (const e of t)
    e.type === "rowbreak" ? o.push([]) : o[o.length - 1].push(e);
  return o.filter((e) => e.length);
}
function Qe(t) {
  const o = [];
  let e = [];
  const l = () => {
    e.length && (o.push({ kind: "smalls", rows: Fe(e) }), e = []);
  };
  for (const a of t) {
    if (a.type === "separator") {
      l(), o.push({ kind: "smalls", rows: [[a]] });
      continue;
    }
    a.size === "large" ? (l(), o.push({ kind: "large", item: a })) : e.push(a);
  }
  return l(), o;
}
function ei(t) {
  var o;
  return t.groups && t.groups.length ? t.groups : [{ id: t.id + "__g", name: "", tools: (o = t.tools) != null ? o : [] }];
}
const Re = [
  // —— 剪贴板 ——
  { id: "paste", label: "粘贴", icon: "paste", group: "剪贴板", size: "large", requires: "editable" },
  { id: "format-painter", label: "格式刷", icon: "format-painter", group: "剪贴板", size: "small", requires: "editable" },
  { id: "copy", label: "复制", icon: "copy", group: "剪贴板", size: "small" },
  { id: "cut", label: "剪切", icon: "cut", group: "剪贴板", size: "small", requires: "editable" },
  // —— 字体(小按钮,排两行)——
  { id: "font-name", label: "字体", icon: "font", group: "字体", size: "small", requires: "editable" },
  { id: "font-size", label: "字号", icon: "font-size", group: "字体", size: "small", requires: "editable" },
  { id: "font-grow", label: "增大字号", icon: "font-grow", group: "字体", size: "small", requires: "editable" },
  { id: "font-shrink", label: "减小字号", icon: "font-shrink", group: "字体", size: "small", requires: "editable" },
  { id: "bold", label: "加粗", icon: "bold", group: "字体", size: "small", requires: "editable" },
  { id: "italic", label: "斜体", icon: "italic", group: "字体", size: "small", requires: "editable" },
  { id: "underline", label: "下划线", icon: "underline", group: "字体", size: "small", requires: "editable" },
  { id: "strike", label: "删除线", icon: "strike", group: "字体", size: "small", requires: "editable" },
  { id: "borders", label: "框线", icon: "borders", group: "字体", size: "small", requires: "editable" },
  { id: "fill-color", label: "填充色", icon: "fill-color", group: "字体", size: "small", requires: "editable" },
  { id: "font-color", label: "字体颜色", icon: "font-color", group: "字体", size: "small", requires: "editable" },
  { id: "clear-format", label: "清除格式", icon: "clear-format", group: "字体", size: "small", requires: "editable" },
  { id: "clear", label: "清除", icon: "clear-format", group: "编辑", size: "small", requires: "editable" },
  // —— 对齐 ——
  { id: "align-top", label: "顶端对齐", icon: "align-top", group: "对齐", size: "small", requires: "editable" },
  { id: "align-middle", label: "垂直居中", icon: "align-vmiddle", group: "对齐", size: "small", requires: "editable" },
  { id: "align-bottom", label: "底端对齐", icon: "align-bottom", group: "对齐", size: "small", requires: "editable" },
  { id: "valign", label: "垂直对齐", icon: "align-vmiddle", group: "对齐", size: "small", requires: "editable" },
  { id: "indent-dec", label: "减少缩进", icon: "indent-dec", group: "对齐", size: "small", requires: "editable" },
  { id: "indent-inc", label: "增加缩进", icon: "indent-inc", group: "对齐", size: "small", requires: "editable" },
  { id: "wrap-text", label: "自动换行", icon: "wrap-text", group: "对齐", size: "small", requires: "editable" },
  { id: "align-left", label: "左对齐", icon: "align-left", group: "对齐", size: "small", requires: "editable" },
  { id: "align-center", label: "居中对齐", icon: "align-center", group: "对齐", size: "small", requires: "editable" },
  { id: "align-right", label: "右对齐", icon: "align-right", group: "对齐", size: "small", requires: "editable" },
  { id: "merge-cells", label: "合并", icon: "merge", group: "对齐", size: "small", requires: "editable" },
  // —— 数字 ——
  { id: "number-format", label: "数字格式", icon: "number-format", group: "数字", size: "small", requires: "editable" },
  { id: "currency", label: "货币", icon: "currency", group: "数字", size: "small", requires: "editable" },
  { id: "percent", label: "百分比", icon: "percent", group: "数字", size: "small", requires: "editable" },
  { id: "comma", label: "千分位", icon: "comma", group: "数字", size: "small", requires: "editable" },
  { id: "decimal-inc", label: "增加小数位", icon: "decimal-inc", group: "数字", size: "small", requires: "editable" },
  { id: "decimal-dec", label: "减少小数位", icon: "decimal-dec", group: "数字", size: "small", requires: "editable" },
  // —— 数字(转换)——
  { id: "convert", label: "转换", icon: "convert", group: "数字", size: "small", requires: "editable" },
  // —— 样式 ——
  { id: "conditional-format", label: "条件格式", icon: "conditional-format", group: "样式", size: "large", requires: "conditionalFormat" },
  { id: "table-styles", label: "表格样式", icon: "table-styles", group: "样式", size: "large", requires: "editable" },
  { id: "cell-styles", label: "单元格样式", icon: "cell-styles", group: "样式", size: "large", requires: "editable" },
  // —— 单元格 ——
  { id: "cells", label: "行和列", icon: "cells", group: "单元格", size: "large", requires: "editable" },
  { id: "fill", label: "填充", icon: "fill", group: "编辑", size: "large", requires: "editable" },
  { id: "flash-fill", label: "快速填充", icon: "flash-fill", group: "编辑", size: "small", requires: "editable" },
  // —— 编辑 / 工具 ——
  { id: "autosum", label: "求和", icon: "autosum", group: "编辑", size: "large", requires: "editable" },
  { id: "sort", label: "排序", icon: "sort", group: "编辑", size: "large" },
  { id: "filter", label: "筛选", icon: "filter", group: "编辑", size: "large" },
  { id: "clear-filter", label: "清除筛选", icon: "clear-filter", group: "编辑", size: "small" },
  { id: "freeze", label: "冻结", icon: "freeze", group: "编辑", size: "large" },
  { id: "find", label: "查找", icon: "find", group: "编辑", size: "large" },
  // —— 插入 ——
  { id: "pivot-table", label: "透视表", icon: "pivot-table", group: "插入", size: "large", requires: "pivotTable" },
  { id: "image", label: "图片", icon: "image", group: "插入", size: "large", requires: "editable" },
  { id: "image-tools", label: "图片工具", icon: "image-tools", group: "插入", size: "large", requires: "editable" },
  // —— 页面 ——
  { id: "print-preview", label: "打印预览", icon: "print-preview", group: "页面", size: "large" },
  { id: "page-setup", label: "页面设置", icon: "page-setup", group: "页面", size: "large", requires: "editable" },
  { id: "page-margins", label: "页边距", icon: "page-margins", group: "页面", size: "large", requires: "editable" },
  { id: "page-orientation", label: "纸张方向", icon: "page-orientation", group: "页面", size: "large", requires: "editable" },
  { id: "paper-size", label: "纸张大小", icon: "paper-size", group: "页面", size: "large", requires: "editable" },
  { id: "print-scale", label: "打印缩放", icon: "print-scale", group: "页面", size: "large", requires: "editable" },
  { id: "print-titles", label: "打印标题", icon: "print-titles", group: "页面", size: "small", requires: "editable" },
  { id: "print-gridlines", label: "打印网格线", icon: "print-gridlines", group: "页面", size: "small", requires: "editable" },
  { id: "print-headings", label: "打印行号列标", icon: "print-headings", group: "页面", size: "small", requires: "editable" },
  { id: "print-area", label: "打印区域", icon: "print-area", group: "页面", size: "small", requires: "editable" },
  { id: "page-breaks", label: "分页符", icon: "page-breaks", group: "页面", size: "small", requires: "editable" },
  { id: "background", label: "背景图片", icon: "background", group: "页面", size: "large", requires: "editable" },
  // —— 公式 ——
  { id: "fn-insert", label: "插入函数", icon: "fx", group: "公式", size: "large", requires: "editable" },
  { id: "fn-common", label: "常用", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-logical", label: "逻辑", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-text", label: "文本", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-datetime", label: "时间", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-lookup", label: "查找与引用", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-math", label: "数学和三角", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "fn-more", label: "其他函数", icon: "function", group: "公式", size: "large", requires: "editable" },
  { id: "calc-options", label: "计算选项", icon: "calc-options", group: "公式", size: "small", requires: "editable" },
  { id: "recalc-workbook", label: "重算工作簿", icon: "recalc", group: "公式", size: "small", requires: "editable" },
  { id: "recalc-sheet", label: "计算工作表", icon: "recalc", group: "公式", size: "small", requires: "editable" },
  // —— 数据 ——
  { id: "reapply", label: "重新应用", icon: "reapply", group: "数据", size: "small" },
  { id: "remove-duplicates", label: "重复项", icon: "remove-duplicates", group: "数据", size: "large", requires: "editable" },
  { id: "data-validation", label: "有效性", icon: "data-validation", group: "数据", size: "large", requires: "editable" },
  { id: "dropdown-list", label: "下拉列表", icon: "dropdown-list", group: "数据", size: "large", requires: "editable" },
  { id: "text-to-columns", label: "分列", icon: "text-to-columns", group: "数据", size: "large", requires: "editable" },
  // —— 审阅 ——
  { id: "comment", label: "批注", icon: "comment", group: "审阅", size: "large", requires: "editable" },
  { id: "comment-new", label: "新建批注", icon: "comment-new", group: "审阅", size: "large", requires: "editable" },
  { id: "comment-delete", label: "删除批注", icon: "comment-delete", group: "审阅", size: "large", requires: "editable" },
  { id: "comment-prev", label: "上一条", icon: "comment-prev", group: "审阅", size: "small" },
  { id: "comment-next", label: "下一条", icon: "comment-next", group: "审阅", size: "small" },
  { id: "comment-show", label: "显示", icon: "comment-show", group: "审阅", size: "small" },
  { id: "cell-lock", label: "锁定单元格", icon: "cell-lock", group: "审阅", size: "large", requires: "editable" },
  { id: "allow-edit-ranges", label: "允许编辑区域", icon: "allow-edit-ranges", group: "审阅", size: "large", requires: "editable" },
  { id: "protect-sheet", label: "保护工作表", icon: "protect-sheet", group: "审阅", size: "large", requires: "editable" },
  { id: "protect-workbook", label: "保护工作簿", icon: "protect-workbook", group: "审阅", size: "large", requires: "editable" },
  { id: "share-workbook", label: "共享工作簿", icon: "share-workbook", group: "审阅", size: "large" },
  // —— 视图 ——
  { id: "view-formula-bar", label: "编辑栏", icon: "view-formula-bar", group: "视图", size: "small" },
  { id: "view-headers", label: "行号列标", icon: "view-headers", group: "视图", size: "small" },
  { id: "view-gridlines", label: "网格线", icon: "view-gridlines", group: "视图", size: "small" },
  { id: "view-taskpane", label: "任务窗格", icon: "view-taskpane", group: "视图", size: "small" },
  { id: "zoom", label: "缩放", icon: "zoom", group: "视图", size: "small" },
  { id: "template", label: "模板", icon: "template", group: "视图", size: "small" },
  { id: "export", label: "导出", icon: "export", group: "视图", size: "large" }
], Te = Object.fromEntries(
  Re.map((t) => [t.id, t])
);
function O(t) {
  return t === "separator" || t === "|";
}
function ii(t) {
  return t === "/" || t === "rowbreak";
}
const ge = {
  sections: [
    { id: "home", name: "开始", editable: !0, groups: [
      { id: "clip", name: "剪贴板", tools: ["paste", "format-painter", "copy", "/", "cut"] },
      { id: "font", name: "字体", tools: ["font-name", "font-size", "font-grow", "font-shrink", "/", "bold", "italic", "underline", "strike", "borders", "fill-color", "font-color", "clear-format"] },
      { id: "align", name: "对齐方式", tools: ["align-top", "align-middle", "align-bottom", "indent-dec", "indent-inc", "wrap-text", "/", "align-left", "align-center", "align-right", "merge-cells"] },
      { id: "num", name: "数字", tools: ["number-format", "convert", "/", "currency", "percent", "comma", "decimal-inc", "decimal-dec"] },
      { id: "style", name: "样式", tools: ["conditional-format", "table-styles", "cell-styles"] },
      { id: "cell", name: "单元格", tools: ["cells"] },
      { id: "edit", name: "编辑", tools: ["fill", "flash-fill", "autosum", "sort", "filter", "freeze", "clear", "find"] }
    ] },
    { id: "insert", name: "插入", editable: !0, groups: [
      { id: "table", name: "表格", tools: ["pivot-table"] },
      { id: "illus", name: "插图", tools: ["image", "image-tools"] }
    ] },
    { id: "page", name: "页面", editable: !0, groups: [
      { id: "printgrp", name: "打印", tools: ["print-preview"] },
      { id: "pagesetup", name: "页面设置", tools: ["page-margins", "page-orientation", "paper-size", "print-scale", "/", "print-area", "print-titles", "page-setup"] },
      { id: "printopts", name: "打印选项", tools: ["print-gridlines", "/", "print-headings"] },
      { id: "pagebreak", name: "分页", tools: ["page-breaks"] },
      { id: "pagebg", name: "背景", tools: ["background"] },
      { id: "pagebeautify", name: "美化", tools: ["table-styles"] },
      { id: "pageout", name: "输出", tools: ["export"] }
    ] },
    { id: "formula", name: "公式", editable: !0, groups: [
      { id: "func", name: "函数库", tools: ["fn-insert", "autosum", "fn-common", "fn-logical", "fn-text", "fn-datetime", "fn-lookup", "fn-math", "fn-more"] },
      { id: "calc", name: "计算", tools: ["calc-options", "/", "recalc-workbook", "recalc-sheet"] }
    ] },
    { id: "data", name: "数据", editable: !0, groups: [
      { id: "pivot", name: "数据透视表", tools: ["pivot-table"] },
      { id: "sortfilter", name: "排序和筛选", tools: ["sort", "filter", "/", "clear-filter", "reapply"] },
      { id: "datatools", name: "数据工具", tools: ["remove-duplicates", "data-validation", "dropdown-list", "/", "text-to-columns", "fill"] }
    ] },
    { id: "review", name: "审阅", editable: !0, groups: [
      { id: "rev", name: "批注", tools: ["comment-new", "comment-delete", "comment-prev", "comment-next", "/", "comment-show"] },
      { id: "protect", name: "保护", tools: ["cell-lock", "/", "allow-edit-ranges", "protect-sheet", "protect-workbook", "share-workbook"] }
    ] },
    { id: "view", name: "视图", editable: !0, groups: [
      { id: "show", name: "显示", tools: ["view-formula-bar", "view-headers", "/", "view-gridlines", "view-taskpane"] },
      { id: "window", name: "窗口", tools: ["freeze"] },
      { id: "zoomg", name: "显示比例", tools: ["zoom"] },
      { id: "misc", name: "其它", tools: ["template"] }
    ] }
  ],
  defaultSectionId: "home"
};
function ti(t, o) {
  return t === !1 || o === !1 ? !1 : t && typeof t == "object" ? !0 : !Array.isArray(o);
}
function me(t, o) {
  return O(t) || t in Te || !!(o != null && o.has(t));
}
function Pe(t) {
  const o = [], e = {};
  let l = 0;
  for (const a of t)
    if (typeof a == "string")
      o.push(a);
    else {
      const n = a.id && !(a.id in e) ? a.id : `__custom_${l++}`;
      e[n] = a, o.push(n);
    }
  return { tools: o, customItems: e };
}
function He(t, o, e) {
  if (!o || !Array.isArray(o.sections) || o.sections.length === 0)
    return { sections: t };
  const l = o.sections.map((n) => y(y(y({}, n), n.tools ? { tools: n.tools.filter((r) => me(r, e)) } : {}), n.groups ? { groups: n.groups.map((r) => $(y({}, r), { tools: r.tools.filter((f) => me(f, e)) })) } : {})), a = new Set(l.map((n) => n.id));
  for (const n of t)
    !n.editable && !a.has(n.id) && l.push(n);
  return { sections: l, activeSectionId: o.activeSectionId };
}
function oi(t) {
  const { ribbon: o, toolbar: e, userState: l } = t;
  if (o === !1 || e === !1)
    return { sections: null, activeSectionId: "", customItems: {}, singleSection: !0, ribbonMode: !1 };
  let a, n = {}, r;
  if (o && typeof o == "object")
    a = o.sections, r = o.defaultSectionId;
  else if (Array.isArray(e)) {
    const m = Pe(e);
    return n = m.customItems, a = [{ id: "__legacy", name: "工具", editable: !1, tools: m.tools }], { sections: a, activeSectionId: "__legacy", customItems: n, singleSection: !0, ribbonMode: !1 };
  } else
    a = ge.sections, r = ge.defaultSectionId;
  if (a.length === 0)
    return { sections: null, activeSectionId: "", customItems: n, singleSection: !0, ribbonMode: !1 };
  const f = new Set(Object.keys(n)), p = He(a, l, f), u = p.sections, c = (m) => !!m && u.some((k) => k.id === m), h = c(p.activeSectionId) ? p.activeSectionId : c(r) ? r : u[0].id;
  return { sections: u, activeSectionId: h, customItems: n, singleSection: u.length <= 1, ribbonMode: !0 };
}
const li = "ooxml-excel-editor.ribbon";
function D() {
  try {
    return typeof window == "undefined" || !window.localStorage ? null : window.localStorage;
  } catch (t) {
    return null;
  }
}
function ai(t) {
  const o = D();
  if (!o || !t) return null;
  try {
    const e = o.getItem(t);
    if (!e) return null;
    const l = JSON.parse(e);
    return !l || l.v !== 1 || !Array.isArray(l.sections) ? null : l;
  } catch (e) {
    return null;
  }
}
function ni(t, o) {
  const e = D();
  if (!(!e || !t))
    try {
      e.setItem(t, JSON.stringify(o));
    } catch (l) {
    }
}
function si(t) {
  const o = D();
  if (!(!o || !t))
    try {
      o.removeItem(t);
    } catch (e) {
    }
}
const ve = "height:28px;padding:0 12px;border-radius:5px;cursor:pointer;font:inherit", Be = `${ve};border:1px solid #1b7f4d;background:#21a366;color:#fff`, q = `${ve};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, z = "width:24px;height:24px;border:1px solid #d0d5dd;background:#fff;border-radius:4px;cursor:pointer;font:inherit;color:#475467;line-height:1";
function w(t) {
  return t.replace(/[&<>"]/g, (o) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[o]);
}
class ri {
  constructor() {
    C(this, "el", null);
    C(this, "cleanup", null);
    C(this, "tab", "ribbon");
    C(this, "sections", []);
    C(this, "activeId", "");
    C(this, "selSectionId", "");
    // 板块管理里当前选中的板块
    C(this, "catalog", []);
    C(this, "zoom", 1);
    C(this, "editable", !1);
    C(this, "cellImageFit", "fill");
    C(this, "pasteBehavior", N);
    C(this, "o");
  }
  show(o) {
    var n, r;
    if (typeof document == "undefined") return;
    this.close(), this.o = o, this.sections = o.sections.map((f) => y(y(y({}, f), f.tools ? { tools: [...f.tools] } : {}), f.groups ? { groups: f.groups.map((p) => $(y({}, p), { tools: [...p.tools] })) } : {})), this.activeId = o.activeSectionId, this.selSectionId = o.activeSectionId || ((r = (n = this.sections[0]) == null ? void 0 : n.id) != null ? r : ""), this.catalog = o.catalog, this.zoom = o.zoom, this.editable = o.editable, this.cellImageFit = o.cellImageFit, this.pasteBehavior = B(o.pasteBehavior), this.tab = "ribbon";
    const e = document.createElement("div");
    e.className = "ooxml-settings-mask", e.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const l = document.createElement("div");
    l.className = "ooxml-settings-card", l.style.cssText = "width:720px;max-width:96vw;height:520px;max-height:92vh;display:flex;flex-direction:column;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", e.appendChild(l), document.body.appendChild(e), this.el = e;
    const a = (f) => {
      f.key === "Escape" && this.close();
    };
    e.addEventListener("mousedown", (f) => {
      f.target === e && this.close();
    }), document.addEventListener("keydown", a, !0), this.cleanup = () => document.removeEventListener("keydown", a, !0), this.render(l);
  }
  /** 应用板块工作副本到外部(持久化 + 重渲)。 */
  emitRibbon() {
    var o, e;
    this.sections.some((l) => l.id === this.activeId) || (this.activeId = (e = (o = this.sections[0]) == null ? void 0 : o.id) != null ? e : ""), this.o.onRibbonChange(this.sections.map((l) => y(y(y({}, l), l.tools ? { tools: [...l.tools] } : {}), l.groups ? { groups: l.groups.map((a) => $(y({}, a), { tools: [...a.tools] })) } : {})), this.activeId);
  }
  newSectionId() {
    let o = 1;
    for (; this.sections.some((e) => e.id === "sec-" + o); ) o++;
    return "sec-" + o;
  }
  render(o) {
    var l, a, n;
    o.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>设置</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="flex:1;display:flex;min-height:0">',
      // 左 tab rail
      '<div style="flex:0 0 130px;border-right:1px solid #eef0f2;padding:10px 8px;display:flex;flex-direction:column;gap:4px">',
      this.tabBtn("ribbon", "工具板块"),
      this.tabBtn("view", "常规"),
      this.tabBtn("paste", "粘贴"),
      this.tabBtn("shortcuts", "快捷键"),
      "</div>",
      // 右 body
      '<div data-body style="flex:1;overflow:auto;padding:14px 16px"></div>',
      "</div>",
      '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;border-top:1px solid #eef0f2;background:#fafbfc">',
      `<button data-reset style="${q}">重置板块布局</button>`,
      `<button data-done style="${Be}">完成</button>`,
      "</div>"
    ].join("");
    const e = o.querySelector("[data-body]");
    this.tab === "ribbon" ? this.renderRibbonTab(e) : this.tab === "paste" ? this.renderPasteTab(e) : this.tab === "shortcuts" ? this.renderShortcutsTab(e) : this.renderViewTab(e), o.querySelectorAll("[data-tab]").forEach((r) => r.addEventListener("click", () => {
      this.tab = r.dataset.tab, this.render(o);
    })), (l = o.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = o.querySelector("[data-done]")) == null || a.addEventListener("click", () => this.close()), (n = o.querySelector("[data-reset]")) == null || n.addEventListener("click", () => {
      this.o.onReset(), this.close();
    });
  }
  tabBtn(o, e) {
    const l = this.tab === o;
    return `<button data-tab="${o}" style="text-align:left;padding:7px 10px;border:0;border-radius:6px;cursor:pointer;font:inherit;background:${l ? "#e8f0fe" : "transparent"};color:${l ? "#1a73e8" : "#1f2329"};font-weight:${l ? 600 : 400}">${e}</button>`;
  }
  // ---- 工具板块 tab ----
  renderRibbonTab(o) {
    var l, a;
    const e = (l = this.sections.find((n) => n.id === this.selSectionId)) != null ? l : this.sections[0];
    o.innerHTML = [
      '<div style="display:flex;gap:14px;height:100%">',
      // 板块列表
      '<div style="flex:0 0 200px;display:flex;flex-direction:column">',
      '<div style="font-weight:600;margin-bottom:6px">板块</div>',
      '<div data-seclist style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px"></div>',
      `<button data-newsec style="${q};margin-top:8px">＋ 新建板块</button>`,
      "</div>",
      // 选中板块的工具分配
      '<div style="flex:1;display:flex;flex-direction:column;min-width:0">',
      `<div style="font-weight:600;margin-bottom:6px">${e ? w(e.name) : "(无板块)"} · 工具</div>`,
      '<div data-assign style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px;padding:8px"></div>',
      "</div>",
      "</div>"
    ].join(""), this.renderSecList(o.querySelector("[data-seclist]")), e && this.renderAssign(o.querySelector("[data-assign]"), e), (a = o.querySelector("[data-newsec]")) == null || a.addEventListener("click", () => {
      const n = this.newSectionId();
      this.sections.push({ id: n, name: "新板块", editable: !0, tools: [] }), this.selSectionId = n, this.emitRibbon(), this.renderRibbonTab(o);
    });
  }
  renderSecList(o) {
    o.innerHTML = this.sections.map((e, l) => {
      const a = e.id === this.selSectionId, n = e.editable ? `<input data-rename="${e.id}" value="${w(e.name)}" style="border:0;background:transparent;font:inherit;color:inherit;width:100%;padding:0" />` : `<span title="内置板块(不可改名/删除)">${w(e.name)} 🔒</span>`;
      return [
        `<div data-secrow="${e.id}" style="display:flex;align-items:center;gap:4px;padding:6px 8px;cursor:pointer;background:${a ? "#e8f0fe" : "transparent"};border-bottom:1px solid #f2f3f5">`,
        `<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${n}</span>`,
        `<button data-up="${l}" title="上移" style="${z}"${l === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-down="${l}" title="下移" style="${z}"${l === this.sections.length - 1 ? " disabled" : ""}>↓</button>`,
        e.editable ? `<button data-del="${e.id}" title="删除板块" style="${z};color:#d92d20">✕</button>` : "",
        "</div>"
      ].join("");
    }).join("") || '<div style="padding:10px;color:#98a2b3">暂无板块</div>', o.querySelectorAll("[data-secrow]").forEach((e) => e.addEventListener("click", (l) => {
      l.target.closest("button,input") || (this.selSectionId = e.dataset.secrow, this.renderRibbonTab(o.closest("[data-body]")));
    })), o.querySelectorAll("[data-rename]").forEach((e) => e.addEventListener("change", () => {
      const l = e, a = this.sections.find((n) => n.id === l.dataset.rename);
      a && (a.name = l.value.trim() || a.name, this.emitRibbon());
    })), o.querySelectorAll("[data-up],[data-down]").forEach((e) => e.addEventListener("click", () => {
      var r;
      const l = e, a = Number((r = l.dataset.up) != null ? r : l.dataset.down), n = l.dataset.up != null ? a - 1 : a + 1;
      n < 0 || n >= this.sections.length || ([this.sections[a], this.sections[n]] = [this.sections[n], this.sections[a]], this.emitRibbon(), this.renderRibbonTab(o.closest("[data-body]")));
    })), o.querySelectorAll("[data-del]").forEach((e) => e.addEventListener("click", () => {
      var a, n;
      const l = e.dataset.del;
      this.sections = this.sections.filter((r) => r.id !== l), this.selSectionId === l && (this.selSectionId = (n = (a = this.sections[0]) == null ? void 0 : a.id) != null ? n : ""), this.emitRibbon(), this.renderRibbonTab(o.closest("[data-body]"));
    }));
  }
  renderAssign(o, e) {
    var u;
    if (e.groups && e.groups.length) {
      this.renderAssignGrouped(o, e);
      return;
    }
    e.tools || (e.tools = []);
    const l = e.tools, a = l.map((c, h) => {
      var M;
      const m = this.catalog.find((S) => S.id === c), k = O(c) ? "— 分隔线 —" : (M = m == null ? void 0 : m.label) != null ? M : c;
      return [
        '<div style="display:flex;align-items:center;gap:4px;padding:4px 6px;background:#f7f8fa;border:1px solid #eef0f2;border-radius:5px;margin-bottom:4px">',
        `<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${w(k)}</span>`,
        `<button data-tup="${h}" title="上移" style="${z}"${h === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-tdown="${h}" title="下移" style="${z}"${h === l.length - 1 ? " disabled" : ""}>↓</button>`,
        `<button data-trem="${h}" title="移除" style="${z};color:#d92d20">✕</button>`,
        "</div>"
      ].join("");
    }).join("") || '<div style="color:#98a2b3;padding:6px">未分配工具;从下方勾选加入。</div>', n = /* @__PURE__ */ new Map();
    for (const c of this.catalog)
      n.has(c.group) || n.set(c.group, []), n.get(c.group).push(c);
    const r = new Set(l), f = [...n.entries()].map(([c, h]) => [
      `<div style="margin:8px 0 4px;color:#475467;font-weight:600">${w(c)}</div>`,
      '<div style="display:flex;flex-wrap:wrap;gap:6px">',
      ...h.map((m) => `<label style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid ${r.has(m.id) ? "#21a366" : "#e5e7eb"};border-radius:14px;cursor:pointer;background:${r.has(m.id) ? "#eafaf1" : "#fff"}"><input type="checkbox" data-pick="${m.id}"${r.has(m.id) ? " checked" : ""} style="margin:0"> ${w(m.label)}</label>`),
      "</div>"
    ].join("")).join("");
    o.innerHTML = [
      '<div style="font-weight:600;margin-bottom:4px">已分配</div>',
      a,
      `<div style="margin-top:6px"><button data-addsep style="${q};height:24px;padding:0 10px">＋ 加分隔线</button></div>`,
      '<div style="font-weight:600;margin:12px 0 2px">可选工具</div>',
      f
    ].join("");
    const p = () => this.renderRibbonTab(o.closest("[data-body]"));
    o.querySelectorAll("[data-tup],[data-tdown]").forEach((c) => c.addEventListener("click", () => {
      var M;
      const h = c, m = Number((M = h.dataset.tup) != null ? M : h.dataset.tdown), k = h.dataset.tup != null ? m - 1 : m + 1;
      k < 0 || k >= l.length || ([l[m], l[k]] = [l[k], l[m]], this.emitRibbon(), p());
    })), o.querySelectorAll("[data-trem]").forEach((c) => c.addEventListener("click", () => {
      l.splice(Number(c.dataset.trem), 1), this.emitRibbon(), p();
    })), (u = o.querySelector("[data-addsep]")) == null || u.addEventListener("click", () => {
      l.push("separator"), this.emitRibbon(), p();
    }), o.querySelectorAll("[data-pick]").forEach((c) => c.addEventListener("change", () => {
      const h = c, m = h.dataset.pick;
      h.checked ? l.includes(m) || l.push(m) : e.tools = l.filter((k) => k !== m), this.emitRibbon(), p();
    }));
  }
  /** 分组板块(WPS 式)的工具分配:按命名组管理 —— 新建/改名/删组、组内勾选分配 + ↑↓ 重排。 */
  renderAssignGrouped(o, e) {
    var f;
    const l = e.groups, a = () => this.renderRibbonTab(o.closest("[data-body]")), n = /* @__PURE__ */ new Map();
    for (const p of this.catalog)
      n.has(p.group) || n.set(p.group, []), n.get(p.group).push(p);
    o.innerHTML = l.map((p, u) => {
      var M;
      const c = new Set(p.tools), h = p.tools.map((S, A) => {
        var F, R;
        const T = O(S) ? "｜" : (R = (F = this.catalog.find((P) => P.id === S)) == null ? void 0 : F.label) != null ? R : S;
        return `<span style="display:inline-flex;align-items:center;gap:2px;padding:2px 6px;background:#f2f4f7;border-radius:12px;margin:0 4px 4px 0"><button data-gtup="${u}:${A}" style="${z};width:18px;height:18px"${A === 0 ? " disabled" : ""}>↑</button>${w(T)}<button data-gtrem="${u}:${A}" style="${z};width:18px;height:18px;color:#d92d20">✕</button></span>`;
      }).join("") || '<span style="color:#98a2b3">（空组）</span>', k = ((M = n.get(p.name)) != null ? M : this.catalog).filter((S) => !c.has(S.id)).map((S) => `<label style="display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border:1px solid #e5e7eb;border-radius:12px;cursor:pointer;margin:0 4px 4px 0"><input type="checkbox" data-gpick="${u}:${S.id}" style="margin:0"> ${w(S.label)}</label>`).join("");
      return [
        '<div style="border:1px solid #eef0f2;border-radius:7px;padding:8px 10px;margin-bottom:8px">',
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">',
        `<input data-grename="${u}" value="${w(p.name)}" style="font-weight:600;border:0;border-bottom:1px dashed #d0d5dd;background:transparent;font:inherit;color:inherit;flex:1" />`,
        `<button data-gup="${u}" style="${z}"${u === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-gdown="${u}" style="${z}"${u === l.length - 1 ? " disabled" : ""}>↓</button>`,
        `<button data-gdel="${u}" style="${z};color:#d92d20">✕</button>`,
        "</div>",
        `<div style="margin-bottom:6px">${h}<button data-gsep="${u}" style="${z};width:auto;padding:0 6px">＋分隔</button></div>`,
        `<div style="font-size:12px;color:#98a2b3;margin-bottom:2px">添加工具:</div><div>${k}</div>`,
        "</div>"
      ].join("");
    }).join("") + `<button data-gnew style="${q}">＋ 新建组</button>`;
    const r = (p) => {
      const [u, c] = p.split(":");
      return [Number(u), c];
    };
    o.querySelectorAll("[data-grename]").forEach((p) => p.addEventListener("change", () => {
      const u = p, c = l[Number(u.dataset.grename)];
      c && (c.name = u.value.trim() || c.name, this.emitRibbon());
    })), o.querySelectorAll("[data-gup],[data-gdown]").forEach((p) => p.addEventListener("click", () => {
      var m;
      const u = p, c = Number((m = u.dataset.gup) != null ? m : u.dataset.gdown), h = u.dataset.gup != null ? c - 1 : c + 1;
      h < 0 || h >= l.length || ([l[c], l[h]] = [l[h], l[c]], this.emitRibbon(), a());
    })), o.querySelectorAll("[data-gdel]").forEach((p) => p.addEventListener("click", () => {
      l.splice(Number(p.dataset.gdel), 1), this.emitRibbon(), a();
    })), o.querySelectorAll("[data-gtup]").forEach((p) => p.addEventListener("click", () => {
      const [u, c] = r(p.dataset.gtup), h = Number(c), m = l[u].tools;
      h <= 0 || ([m[h], m[h - 1]] = [m[h - 1], m[h]], this.emitRibbon(), a());
    })), o.querySelectorAll("[data-gtrem]").forEach((p) => p.addEventListener("click", () => {
      const [u, c] = r(p.dataset.gtrem);
      l[u].tools.splice(Number(c), 1), this.emitRibbon(), a();
    })), o.querySelectorAll("[data-gsep]").forEach((p) => p.addEventListener("click", () => {
      l[Number(p.dataset.gsep)].tools.push("separator"), this.emitRibbon(), a();
    })), o.querySelectorAll("[data-gpick]").forEach((p) => p.addEventListener("change", () => {
      const [u, c] = r(p.dataset.gpick);
      l[u].tools.includes(c) || l[u].tools.push(c), this.emitRibbon(), a();
    })), (f = o.querySelector("[data-gnew]")) == null || f.addEventListener("click", () => {
      let p = 1;
      for (; l.some((u) => u.id === "g" + p); ) p++;
      l.push({ id: "g" + p, name: "新组", tools: [] }), this.emitRibbon(), a();
    });
  }
  // ---- 常规 tab(运行时设置:编辑模式 / 缩放)----
  renderViewTab(o) {
    var l, a, n;
    const e = [0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => `<option value="${r}"${Math.abs(r - this.zoom) < 1e-3 ? " selected" : ""}>${Math.round(r * 100)}%</option>`).join("");
    o.innerHTML = [
      // 编辑模式
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;cursor:pointer">',
      `<input type="checkbox" data-editable${this.editable ? " checked" : ""} style="width:16px;height:16px;margin:0">`,
      '<span style="font-weight:500">编辑模式</span>',
      '<span style="color:#98a2b3">开启后可改值 / 样式 / 列宽行高 / 增删行列(默认只读)</span>',
      "</label>",
      // 缩放
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">',
      '<span style="flex:0 0 80px;color:#475467">缩放</span>',
      `<select data-zoom style="${q};height:30px">${e}</select>`,
      "</div>",
      // WPS 内嵌图贴合方式
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">',
      '<span style="flex:0 0 80px;color:#475467">内嵌图贴合</span>',
      `<select data-cellimgfit style="${q};height:30px">`,
      ...["fill", "contain", "cover"].map((r) => `<option value="${r}"${this.cellImageFit === r ? " selected" : ""}>${{ fill: "拉伸铺满(fill,同 WPS)", contain: "等比留白(contain)", cover: "等比裁剪(cover)" }[r]}</option>`),
      "</select>",
      "</div>",
      '<div style="color:#98a2b3">数据透视表 / 条件格式 由组件 props 开启(<code>pivotTable</code> / <code>conditionalFormat</code>)。</div>'
    ].join(""), (l = o.querySelector("[data-editable]")) == null || l.addEventListener("change", (r) => {
      const f = r.target.checked;
      this.editable = f, this.o.onRuntimeChange({ editable: f });
    }), (a = o.querySelector("[data-zoom]")) == null || a.addEventListener("change", (r) => {
      const f = parseFloat(r.target.value);
      this.zoom = f, this.o.onRuntimeChange({ zoom: f });
    }), (n = o.querySelector("[data-cellimgfit]")) == null || n.addEventListener("change", (r) => {
      const f = r.target.value;
      this.cellImageFit = f, this.o.onRuntimeChange({ cellImageFit: f });
    });
  }
  // ---- 粘贴 tab(粘贴行为配置,原独立「⚙ 粘贴配置」并入此处;字段与 paste-config-host 同源)----
  renderPasteTab(o) {
    var f, p;
    const e = B(this.pasteBehavior), l = (u) => {
      const c = String(e[u.key]), h = u.opts.map(([m, k]) => `<option value="${m}"${m === c ? " selected" : ""}>${w(k)}</option>`).join("");
      return [
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed #eef0f2">',
        `<div style="min-width:0"><div style="font-weight:500">${w(u.label)}</div><div style="color:#98a2b3;font-size:12px">${w(u.hint)}</div></div>`,
        `<select data-pkey="${u.key}" style="flex:0 0 132px;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 6px;background:#fff;cursor:pointer">${h}</select>`,
        "</div>"
      ].join("");
    };
    o.innerHTML = [
      '<div style="color:#475467;margin-bottom:8px">控制 Ctrl+V / 右键粘贴时,源内容各方面如何落到目标(覆盖 / 合并 / 仅值)。改动即生效。</div>',
      '<div style="display:flex;gap:8px;margin-bottom:8px">',
      `<button data-preset-overwrite style="${q};flex:1">覆盖式 1:1(默认)</button>`,
      `<button data-preset-values style="${q};flex:1">仅值(保留目标)</button>`,
      "</div>",
      Ae.map(l).join("")
    ].join("");
    const a = () => Array.from(o.querySelectorAll("select[data-pkey]")), n = () => {
      const u = {};
      for (const c of a()) u[c.dataset.pkey] = c.value;
      return B(u);
    }, r = (u) => {
      this.pasteBehavior = u, this.o.onRuntimeChange({ pasteBehavior: u }), this.renderPasteTab(o);
    };
    for (const u of a()) u.addEventListener("change", () => r(n()));
    (f = o.querySelector("[data-preset-overwrite]")) == null || f.addEventListener("click", () => r(N)), (p = o.querySelector("[data-preset-values]")) == null || p.addEventListener("click", () => r(xe));
  }
  // ---- 快捷键 tab(只读清单;单一真相源 = core KEYBOARD_SHORTCUTS)----
  renderShortcutsTab(o) {
    const e = (a) => a.split(" / ").map(
      (n) => n.trim().split(/\s*\+\s*/).map((r) => `<kbd style="display:inline-block;min-width:16px;text-align:center;padding:1px 6px;margin:0 1px;border:1px solid #d0d5dd;border-bottom-width:2px;border-radius:4px;background:#f9fafb;font:11px/1.6 ui-monospace,Consolas,monospace;color:#344054">${w(r)}</kbd>`).join('<span style="color:#98a2b3">+</span>')
    ).join('<span style="color:#98a2b3;margin:0 4px">/</span>'), l = (a) => [
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px dashed #eef0f2">',
      `<span style="flex:0 0 auto">${e(a.keys)}</span>`,
      `<span style="flex:1;text-align:right;color:#475467">${w(a.desc)}${a.requiresEdit ? ' <span style="color:#98a2b3;font-size:11px">(编辑模式)</span>' : ""}</span>`,
      "</div>"
    ].join("");
    o.innerHTML = [
      '<div style="color:#475467;margin-bottom:10px">当前支持的键盘快捷键(标「编辑模式」的项需开启 <b>editable</b> 后可用)。</div>',
      Le.map((a) => [
        `<div style="font-weight:600;margin:12px 0 2px;color:#344054">${w(a.title)}</div>`,
        a.items.map(l).join("")
      ].join("")).join("")
    ].join("");
  }
  close() {
    var o, e;
    (o = this.cleanup) == null || o.call(this), this.cleanup = null, (e = this.el) == null || e.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const je = N, _e = xe, Ne = {
  cellStyle: "merge",
  fill: "merge",
  rowHeight: "keep",
  colWidth: "keep",
  sourceMerges: "skip",
  targetMerges: "keep",
  images: "skip"
}, d = (t) => Ie[t], i = (t) => y({ kind: "builtin" }, t), Oe = ["宋体", "微软雅黑", "黑体", "楷体", "Arial", "Calibri", "Times New Roman", "Consolas"], De = [9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36], Ve = /* @__PURE__ */ new Set([
  "paste",
  "cut",
  "clear-format",
  "bold",
  "italic",
  "underline",
  "strike",
  "font-name",
  "font-size",
  "font-grow",
  "font-shrink",
  "borders",
  "fill-color",
  "font-color",
  "align-left",
  "align-center",
  "align-right",
  "valign",
  "align-top",
  "align-middle",
  "align-bottom",
  "merge-cells",
  "indent-inc",
  "indent-dec",
  "cells",
  "percent",
  "comma",
  "currency",
  "decimal-inc",
  "decimal-dec",
  "autosum",
  "comment",
  "fn-insert",
  "fn-common",
  "fn-logical",
  "fn-text",
  "fn-datetime",
  "fn-lookup",
  "fn-math",
  "fn-more",
  "calc-options",
  "recalc-workbook",
  "recalc-sheet",
  "reapply",
  "data-validation",
  "dropdown-list",
  "remove-duplicates",
  "text-to-columns",
  "comment-new",
  "comment-delete",
  "comment-prev",
  "comment-next",
  "comment-show",
  "cell-lock",
  "allow-edit-ranges",
  "protect-sheet",
  "protect-workbook",
  "share-workbook",
  "view-formula-bar",
  "view-headers",
  "view-gridlines",
  "view-taskpane",
  "fill",
  "flash-fill",
  "cell-styles",
  "table-styles",
  "convert",
  "image",
  "print-preview",
  "page-setup",
  "page-margins",
  "page-orientation",
  "paper-size",
  "print-scale",
  "print-titles",
  "print-gridlines",
  "print-headings",
  "print-area",
  "page-breaks",
  "background",
  "freeze",
  "clear"
]), he = {
  normal: { top: 19, bottom: 19, left: 18, right: 18, header: 8, footer: 8 },
  narrow: { top: 19, bottom: 19, left: 6, right: 6, header: 8, footer: 8 },
  wide: { top: 25, bottom: 25, left: 25, right: 25, header: 13, footer: 13 }
}, I = (t) => ({ font: { bold: !0, color: "#ffffff" }, fill: { type: "solid", fgColor: t } }), Ge = [
  ["好、差和适中", [
    ["常规", "norm", { font: { bold: !1, italic: !1, underline: !1, strike: !1, color: "#1f2329" }, fill: { type: "none" } }],
    ["好", "good", { font: { color: "#0a7d3c" }, fill: { type: "solid", fgColor: "#e2efe6" } }],
    ["差", "bad", { font: { color: "#b42318" }, fill: { type: "solid", fgColor: "#fde8e8" } }],
    ["适中", "neutral", { font: { color: "#9a6a00" }, fill: { type: "solid", fgColor: "#fff4ce" } }]
  ]],
  ["数据和模型", [
    ["计算", "calc", { font: { bold: !0, color: "#b45309" }, fill: { type: "solid", fgColor: "#f2efe9" } }],
    ["检查单元格", "check", { font: { bold: !0, color: "#ffffff" }, fill: { type: "solid", fgColor: "#8a8a8a" } }],
    ["解释性文本", "explain", { font: { italic: !0, color: "#6b7280" } }],
    ["警告文本", "warntext", { font: { color: "#b42318" } }],
    ["链接单元格", "link", { font: { color: "#0563c1", underline: !0 } }],
    ["输入", "input", { font: { color: "#7f6000" }, fill: { type: "solid", fgColor: "#ffe9b0" } }],
    ["注释", "note", { fill: { type: "solid", fgColor: "#fffbe6" } }],
    ["输出", "output", { font: { bold: !0, color: "#3f3f3f" }, fill: { type: "solid", fgColor: "#efefef" } }]
  ]],
  ["标题", [
    ["标题", "title", { font: { bold: !0, size: 18, color: "#1f4e79" } }],
    ["标题 1", "h1", { font: { bold: !0, size: 15, color: "#1f4e79" }, borders: { bottom: { style: "medium", color: "#4472c4" } } }],
    ["标题 2", "h2", { font: { bold: !0, size: 13, color: "#1f4e79" }, borders: { bottom: { style: "thin", color: "#4472c4" } } }],
    ["标题 3", "h3", { font: { bold: !0, size: 12, color: "#2e75b6" } }],
    ["标题 4", "h4", { font: { bold: !0, color: "#2e75b6" } }],
    ["汇总", "total", { font: { bold: !0, color: "#1f2329" }, borders: { top: { style: "thin", color: "#808080" }, bottom: { style: "double", color: "#808080" } } }]
  ]],
  ["主题单元格样式", [
    ["强调 1", "accent1", I("#4472c4")],
    ["强调 2", "accent2", I("#ed7d31")],
    ["强调 3", "accent3", I("#a5a5a5")],
    ["强调 4", "accent4", I("#ffc000")],
    ["强调 5", "accent5", I("#5b9bd5")],
    ["强调 6", "accent6", I("#70ad47")]
  ]],
  ["数字格式", [
    ["货币", "cur", { numFmt: "¥#,##0.00" }],
    ["货币[0]", "cur0", { numFmt: "¥#,##0" }],
    ["百分比", "pct", { numFmt: "0.00%" }],
    ["千位分隔", "comma", { numFmt: "#,##0.00" }],
    ["千位分隔[0]", "comma0", { numFmt: "#,##0" }]
  ]]
], Ue = [["light", "浅色"], ["medium", "中等深浅"], ["dark", "深色"]], Ye = [
  ["blue", "蓝色", "#2b6cb0"],
  ["green", "绿色", "#217346"],
  ["orange", "橙色", "#c05621"],
  ["red", "红色", "#b42318"],
  ["purple", "紫色", "#7030a0"],
  ["teal", "青色", "#0e7c86"],
  ["gray", "灰色", "#6b7280"]
], fe = [
  ["#000000", "黑色"],
  ["#404040", "深灰"],
  ["#808080", "灰色"],
  ["#BFBFBF", "浅灰"],
  ["#FFFFFF", "白色"],
  ["#C00000", "深红"],
  ["#FF0000", "红色"],
  ["#FFC000", "橙色"],
  ["#FFFF00", "黄色"],
  ["#92D050", "浅绿"],
  ["#00B050", "绿色"],
  ["#00B0F0", "浅蓝"],
  ["#0070C0", "蓝色"],
  ["#002060", "深蓝"],
  ["#7030A0", "紫色"]
];
function ye(t) {
  const o = t.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(o)) return o[0] === "#" ? o : "#" + o;
  if (/^#?[0-9a-fA-F]{3}$/.test(o)) {
    const e = o.replace("#", "");
    return "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2];
  }
  return o;
}
function di(t, o) {
  var f, p, u, c, h, m, k, M, S, A, T, F, R, P, V, G, U, Y, W, K, J, X, Z, Q, ee, ie, te, oe, le, ae, ne, se, re, de;
  if (!Ve.has(t)) return null;
  const e = o.controller, l = !o.editable || !o.hasSelection, a = !o.editable, n = e == null ? void 0 : e.getSelectionFontState(), r = e == null ? void 0 : e.getSelectionAlignState();
  switch (t) {
    case "paste":
      return i({
        id: t,
        iconSvg: d("paste"),
        label: "粘贴",
        title: "粘贴(点=默认;▾ 选择性粘贴)",
        disabled: a,
        onClick: () => void (e == null ? void 0 : e.pasteFromClipboard()),
        items: [
          i({ id: "paste-all", label: "粘贴(全部)", title: "覆盖式 1:1(贴近源)", onClick: () => void (e == null ? void 0 : e.pasteFromClipboard(je)) }),
          i({ id: "paste-values", label: "仅值", title: "只落值,样式/结构不动", onClick: () => void (e == null ? void 0 : e.pasteFromClipboard(_e)) }),
          i({ id: "paste-vf", label: "值和格式", title: "合并式:源没写的保留目标", onClick: () => void (e == null ? void 0 : e.pasteFromClipboard(Ne)) }),
          i({ id: "paste-sep", type: "separator" }),
          i({ id: "paste-cfg", label: "粘贴行为…", title: "打开粘贴行为配置", onClick: () => e == null ? void 0 : e.openPasteConfigDialog() })
        ]
      });
    case "cut":
      return i({ id: t, iconSvg: d("cut"), label: "剪切", title: "剪切 (Ctrl+X)", disabled: l, onClick: () => void (e == null ? void 0 : e.cutSelection()) });
    case "clear-format":
      return i({ id: t, iconSvg: d("clear-format"), label: "清除格式", title: "清除选区格式(不删值)", disabled: l, onClick: () => e == null ? void 0 : e.clearSelectionFormat() });
    case "bold":
      return i({ id: t, iconSvg: d("bold"), label: "加粗", title: "加粗 (选区)", active: !!(n != null && n.bold), disabled: l, onClick: () => e == null ? void 0 : e.toggleSelectionFont("bold") });
    case "italic":
      return i({ id: t, iconSvg: d("italic"), label: "斜体", title: "斜体 (选区)", active: !!(n != null && n.italic), disabled: l, onClick: () => e == null ? void 0 : e.toggleSelectionFont("italic") });
    case "underline":
      return i({
        id: t,
        iconSvg: d("underline"),
        label: "下划线",
        title: "下划线(点=单;▾ 双下划线)",
        active: !!(n != null && n.underline),
        disabled: l,
        onClick: () => e == null ? void 0 : e.toggleSelectionFont("underline"),
        items: [
          i({ id: "ul-single", label: "单下划线", active: !!(n != null && n.underline) && (n == null ? void 0 : n.underlineStyle) !== "double", onClick: () => e == null ? void 0 : e.setSelectionUnderline("single") }),
          i({ id: "ul-double", label: "双下划线", active: (n == null ? void 0 : n.underlineStyle) === "double", onClick: () => e == null ? void 0 : e.setSelectionUnderline("double") }),
          i({ id: "ul-sep", type: "separator" }),
          i({ id: "ul-none", label: "无下划线", onClick: () => e == null ? void 0 : e.setSelectionUnderline("none") })
        ]
      });
    case "strike":
      return i({ id: t, iconSvg: d("strike"), label: "删除线", title: "删除线 (选区)", disabled: l, onClick: () => e == null ? void 0 : e.toggleSelectionFont("strike") });
    case "font-grow":
      return i({ id: t, iconSvg: d("font-grow"), label: "增大字号", title: "增大字号", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionFontSize(1) });
    case "font-shrink":
      return i({ id: t, iconSvg: d("font-shrink"), label: "减小字号", title: "减小字号", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionFontSize(-1) });
    case "fill-color":
      return i({
        id: t,
        iconSvg: d("fill-color"),
        label: "填充色",
        title: "填充色",
        disabled: l,
        items: [
          i({ id: "fill-none", label: "无填充", onClick: () => e == null ? void 0 : e.setSelectionFill(null) }),
          ...fe.map(([s, b]) => i({ id: "fill-" + s, label: b, swatch: s, onClick: () => e == null ? void 0 : e.setSelectionFill(s) })),
          i({ id: "fill-sep", type: "separator" }),
          i({ id: "fill-custom", input: { placeholder: "其他颜色 #RRGGBB", onCommit: (s) => {
            const b = ye(s);
            b && (e == null || e.setSelectionFill(b));
          } } })
        ]
      });
    case "font-color":
      return i({
        id: t,
        iconSvg: d("font-color"),
        label: "字体颜色",
        title: "字体颜色",
        disabled: l,
        items: [
          ...fe.map(([s, b]) => i({ id: "fc-" + s, label: b, swatch: s, onClick: () => e == null ? void 0 : e.setSelectionFontColor(s) })),
          i({ id: "fc-sep", type: "separator" }),
          i({ id: "fc-custom", input: { placeholder: "其他颜色 #RRGGBB", onCommit: (s) => {
            const b = ye(s);
            b && (e == null || e.setSelectionFontColor(b));
          } } })
        ]
      });
    case "align-top":
      return i({ id: t, iconSvg: d("align-top"), label: "顶端对齐", title: "顶端对齐", active: (r == null ? void 0 : r.vAlign) === "top", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionVAlign("top") });
    case "align-middle":
      return i({ id: t, iconSvg: d("align-vmiddle"), label: "垂直居中", title: "垂直居中", active: (r == null ? void 0 : r.vAlign) === "middle", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionVAlign("middle") });
    case "align-bottom":
      return i({ id: t, iconSvg: d("align-bottom"), label: "底端对齐", title: "底端对齐", active: (r == null ? void 0 : r.vAlign) === "bottom", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionVAlign("bottom") });
    case "percent":
      return i({ id: t, iconSvg: d("percent"), label: "百分比", title: "百分比样式 (0%)", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionNumberFormat("0%") });
    case "comma":
      return i({ id: t, iconSvg: d("comma"), label: "千分位", title: "千分位样式 (#,##0.00)", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionNumberFormat("#,##0.00") });
    case "currency":
      return i({ id: t, iconSvg: d("currency"), label: "货币", title: "货币样式 (¥#,##0.00)", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionNumberFormat("¥#,##0.00") });
    case "decimal-inc":
      return i({ id: t, iconSvg: d("decimal-inc"), label: "增加小数位", title: "增加小数位", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionDecimals(1) });
    case "decimal-dec":
      return i({ id: t, iconSvg: d("decimal-dec"), label: "减少小数位", title: "减少小数位", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionDecimals(-1) });
    case "autosum":
      return i({
        id: t,
        iconSvg: d("autosum"),
        label: "求和",
        title: "自动求和(点=SUM;▾ 选其它)",
        disabled: l,
        onClick: () => e == null ? void 0 : e.autoSumSelection("sum"),
        items: [
          i({ id: "sum-sum", label: "求和", onClick: () => e == null ? void 0 : e.autoSumSelection("sum") }),
          i({ id: "sum-avg", label: "平均值", onClick: () => e == null ? void 0 : e.autoSumSelection("average") }),
          i({ id: "sum-count", label: "计数", onClick: () => e == null ? void 0 : e.autoSumSelection("count") }),
          i({ id: "sum-max", label: "最大值", onClick: () => e == null ? void 0 : e.autoSumSelection("max") }),
          i({ id: "sum-min", label: "最小值", onClick: () => e == null ? void 0 : e.autoSumSelection("min") })
        ]
      });
    // ---- 公式选项卡:函数库(点函数 → 插入函数对话框)----
    case "fn-insert":
      return i({ id: t, iconSvg: d("fx"), label: "插入函数", title: "插入函数(选函数 + 逐参填写 + 结果预览)", disabled: a, onClick: () => e == null ? void 0 : e.openInsertFunctionDialog() });
    case "fn-common":
    case "fn-logical":
    case "fn-text":
    case "fn-datetime":
    case "fn-lookup":
    case "fn-math": {
      const s = t.slice(3), b = j.find((g) => g.key === s);
      return i({
        id: t,
        iconSvg: d("function"),
        label: (f = b == null ? void 0 : b.name) != null ? f : t,
        title: `${(p = b == null ? void 0 : b.name) != null ? p : ""} 函数`,
        disabled: a,
        items: ((u = b == null ? void 0 : b.fns) != null ? u : []).map((g) => i({ id: `${s}-${g}`, label: g, title: _(g).signature, onClick: () => e == null ? void 0 : e.openInsertFunctionDialog(g) }))
      });
    }
    case "fn-more": {
      const s = j.find((g) => g.key === "stat"), b = j.find((g) => g.key === "info");
      return i({
        id: t,
        iconSvg: d("function"),
        label: "其他函数",
        title: "统计 / 信息 函数",
        disabled: a,
        items: [
          i({ id: "more-hdr-stat", label: "统计", disabled: !0 }),
          ...((c = s == null ? void 0 : s.fns) != null ? c : []).map((g) => i({ id: `stat-${g}`, label: g, title: _(g).signature, onClick: () => e == null ? void 0 : e.openInsertFunctionDialog(g) })),
          i({ id: "more-sep", type: "separator" }),
          i({ id: "more-hdr-info", label: "信息", disabled: !0 }),
          ...((h = b == null ? void 0 : b.fns) != null ? h : []).map((g) => i({ id: `info-${g}`, label: g, title: _(g).signature, onClick: () => e == null ? void 0 : e.openInsertFunctionDialog(g) }))
        ]
      });
    }
    // ---- 公式选项卡:计算 ----
    case "calc-options": {
      const s = (m = e == null ? void 0 : e.getCalcMode()) != null ? m : "auto";
      return i({
        id: t,
        iconSvg: d("calc-options"),
        label: "计算选项",
        title: "自动 / 手动 计算",
        disabled: a,
        showLabel: !0,
        items: [
          i({ id: "calc-auto", label: "自动", active: s === "auto", onClick: () => e == null ? void 0 : e.setCalcMode("auto") }),
          i({ id: "calc-manual", label: "手动(编辑后需手动重算)", active: s === "manual", onClick: () => e == null ? void 0 : e.setCalcMode("manual") })
        ]
      });
    }
    case "recalc-workbook":
      return i({ id: t, iconSvg: d("recalc"), label: "重算工作簿", title: "重算所有公式(需开启公式重算)", disabled: a, showLabel: !0, onClick: () => e == null ? void 0 : e.recalcAll() });
    case "recalc-sheet":
      return i({ id: t, iconSvg: d("recalc"), label: "计算工作表", title: "只重算当前工作表", disabled: a, showLabel: !0, onClick: () => e == null ? void 0 : e.recalcActiveSheet() });
    // ---- 数据选项卡 ----
    case "reapply":
      return i({ id: t, iconSvg: d("reapply"), label: "重新应用", title: "重新应用当前筛选", showLabel: !0, disabled: !((k = e == null ? void 0 : e.hasFilters) != null && k.call(e)), onClick: () => e == null ? void 0 : e.reapplyFilters() });
    case "data-validation":
      return i({ id: t, iconSvg: d("data-validation"), label: "有效性", title: "数据有效性(建/改验证规则)", disabled: a, onClick: () => e == null ? void 0 : e.openDataValidationDialog() });
    case "dropdown-list":
      return i({ id: t, iconSvg: d("dropdown-list"), label: "下拉列表", title: "设置下拉列表(列表型数据有效性)", disabled: a, onClick: () => e == null ? void 0 : e.openDataValidationDialog("list") });
    case "remove-duplicates":
      return i({ id: t, iconSvg: d("remove-duplicates"), label: "重复项", title: "删除重复项", disabled: l, onClick: () => e == null ? void 0 : e.openRemoveDuplicatesDialog() });
    case "text-to-columns":
      return i({ id: t, iconSvg: d("text-to-columns"), label: "分列", title: "文本分列(按分隔符拆当前列)", disabled: l, onClick: () => e == null ? void 0 : e.openTextToColumnsDialog() });
    case "freeze": {
      const s = (M = e == null ? void 0 : e.getFreezeState) == null ? void 0 : M.call(e), b = !!(s && (s.frozenRows || s.frozenCols)), g = (S = e == null ? void 0 : e.getActiveCell) == null ? void 0 : S.call(e), x = (A = g == null ? void 0 : g.row) != null ? A : 0, v = (T = g == null ? void 0 : g.col) != null ? T : 0, L = `第${x}行`, ce = `第${be(Math.max(0, v - 1))}列`, ke = x > 0 && v > 0 ? `冻结至第${x}行${be(v - 1)}列` : x > 0 ? `冻结至${L}` : v > 0 ? `冻结至${ce}` : "冻结至活动格", E = (we) => ({
        onHover: () => e == null ? void 0 : e.previewFreezeMode(we),
        onHoverEnd: () => e == null ? void 0 : e.clearFreezePreview()
      });
      return i({
        id: t,
        iconSvg: d("freeze"),
        label: "冻结",
        title: "冻结窗格(WPS 冻结 ▾)",
        active: b,
        items: [
          i(y({ id: "fz-panes", label: ke, title: "冻结活动格上方所有行 + 左侧所有列", disabled: x === 0 && v === 0, onClick: () => e == null ? void 0 : e.freezePanes("active") }, E("active"))),
          i(y({ id: "fz-active-row", label: `冻结至${L}`, title: "只冻结活动格上方的行", disabled: x === 0, onClick: () => e == null ? void 0 : e.freezePanes("activeRow") }, E("activeRow"))),
          i(y({ id: "fz-active-col", label: `冻结至${ce}`, title: "只冻结活动格左侧的列", disabled: v === 0, onClick: () => e == null ? void 0 : e.freezePanes("activeCol") }, E("activeCol"))),
          i(y({ id: "fz-header", label: "冻结表头", title: "智能识别表头行并冻结(含上方标题行)", onClick: () => e == null ? void 0 : e.freezePanes("header") }, E("header"))),
          i(y({ id: "fz-row", label: "冻结首行", onClick: () => e == null ? void 0 : e.freezePanes("firstRow") }, E("firstRow"))),
          i(y({ id: "fz-col", label: "冻结首列", onClick: () => e == null ? void 0 : e.freezePanes("firstCol") }, E("firstCol"))),
          ...b ? [i({ id: "fz-sep", type: "separator" }), i({ id: "fz-none", label: "取消冻结", onClick: () => e == null ? void 0 : e.freezePanes("none") })] : []
        ]
      });
    }
    case "clear":
      return i({
        id: t,
        iconSvg: d("clear-format"),
        label: "清除",
        title: "清除(全部/格式/内容/批注)",
        disabled: l,
        items: [
          i({ id: "clr-all", label: "全部清除", onClick: () => e == null ? void 0 : e.clearSelectionCells("all") }),
          i({ id: "clr-fmt", label: "清除格式", onClick: () => e == null ? void 0 : e.clearSelectionCells("formats") }),
          i({ id: "clr-content", label: "清除内容", onClick: () => e == null ? void 0 : e.clearSelectionCells("content") }),
          i({ id: "clr-comment", label: "清除批注", onClick: () => e == null ? void 0 : e.clearSelectionCells("comments") })
        ]
      });
    case "print-preview":
      return i({ id: t, iconSvg: d("print-preview"), label: "打印预览", title: "打印预览(分页 + 打印)", onClick: () => void (e == null ? void 0 : e.openPrintPreview()) });
    case "page-setup":
      return i({ id: t, iconSvg: d("page-setup"), label: "页面设置", title: "方向/纸张/缩放/页边距/打印区域/打印标题", disabled: a, onClick: () => e == null ? void 0 : e.openPageSetupDialog() });
    case "page-margins": {
      const s = (F = e == null ? void 0 : e.getPageSetup()) == null ? void 0 : F.margins, b = (x) => {
        const v = he[x];
        return !!s && s.top === v.top && s.bottom === v.bottom && s.left === v.left && s.right === v.right;
      }, g = (x) => {
        var v;
        return e == null ? void 0 : e.setPageSetup($(y({}, (v = e == null ? void 0 : e.getPageSetup()) != null ? v : {}), { margins: y({}, he[x]) }));
      };
      return i({
        id: t,
        iconSvg: d("page-margins"),
        label: "页边距",
        title: "页边距(预设 / 自定义)",
        disabled: a,
        items: [
          i({ id: "mg-normal", label: "普通", title: "上下19 左右18 页眉页脚8 (mm)", active: b("normal"), onClick: () => g("normal") }),
          i({ id: "mg-narrow", label: "窄", title: "左右6 (mm)", active: b("narrow"), onClick: () => g("narrow") }),
          i({ id: "mg-wide", label: "宽", title: "四周25 (mm)", active: b("wide"), onClick: () => g("wide") }),
          i({ id: "mg-sep", type: "separator" }),
          i({ id: "mg-custom", label: "自定义页边距…", onClick: () => e == null ? void 0 : e.openPageSetupDialog() })
        ]
      });
    }
    case "page-orientation": {
      const s = (P = (R = e == null ? void 0 : e.getPageSetup()) == null ? void 0 : R.orientation) != null ? P : "portrait", b = (g) => {
        var x;
        return e == null ? void 0 : e.setPageSetup($(y({}, (x = e == null ? void 0 : e.getPageSetup()) != null ? x : {}), { orientation: g }));
      };
      return i({
        id: t,
        iconSvg: d("page-orientation"),
        label: "纸张方向",
        title: "纸张方向",
        disabled: a,
        items: [
          i({ id: "ori-portrait", label: "纵向", active: s !== "landscape", onClick: () => b("portrait") }),
          i({ id: "ori-landscape", label: "横向", active: s === "landscape", onClick: () => b("landscape") })
        ]
      });
    }
    case "paper-size": {
      const s = (V = e == null ? void 0 : e.getPageSetup()) == null ? void 0 : V.paperFormat, b = Array.isArray(s) ? "" : s != null ? s : "a4", g = (x) => {
        var v;
        return e == null ? void 0 : e.setPageSetup($(y({}, (v = e == null ? void 0 : e.getPageSetup()) != null ? v : {}), { paperFormat: x }));
      };
      return i({
        id: t,
        iconSvg: d("paper-size"),
        label: "纸张大小",
        title: "纸张大小",
        disabled: a,
        items: [
          i({ id: "ps-a4", label: "A4", active: b === "a4", onClick: () => g("a4") }),
          i({ id: "ps-a3", label: "A3", active: b === "a3", onClick: () => g("a3") }),
          i({ id: "ps-letter", label: "Letter", active: b === "letter", onClick: () => g("letter") })
        ]
      });
    }
    case "print-scale": {
      const s = (G = e == null ? void 0 : e.getPageSetup()) != null ? G : {}, b = (g) => {
        var x;
        return e == null ? void 0 : e.setPageSetup(y(y({}, (x = e == null ? void 0 : e.getPageSetup()) != null ? x : {}), g));
      };
      return i({
        id: t,
        iconSvg: d("print-scale"),
        label: "打印缩放",
        title: "打印缩放",
        disabled: a,
        items: [
          i({ id: "sc-100", label: "无缩放(100%)", active: !s.fitToPage && ((U = s.scale) != null ? U : 100) === 100, onClick: () => b({ fitToPage: !1, scale: 100 }) }),
          i({ id: "sc-fit", label: "将整个工作表打印在一页", active: !!s.fitToPage, onClick: () => b({ fitToPage: !0 }) }),
          i({ id: "sc-sep", type: "separator" }),
          i({ id: "sc-custom", label: "自定义缩放…", onClick: () => e == null ? void 0 : e.openPageSetupDialog() })
        ]
      });
    }
    case "print-titles":
      return i({ id: t, iconSvg: d("print-titles"), label: "打印标题", title: "设置顶端标题行 / 左侧标题列(每页重复)", disabled: a, onClick: () => e == null ? void 0 : e.openPageSetupDialog() });
    case "print-gridlines": {
      const s = !!((Y = e == null ? void 0 : e.getPageSetup()) != null && Y.printGridLines);
      return i({ id: t, iconSvg: d("print-gridlines"), label: "打印网格线", title: "打印/导出时输出网格线", active: s, showLabel: !0, disabled: a, onClick: () => {
        var b;
        return e == null ? void 0 : e.setPageSetup($(y({}, (b = e == null ? void 0 : e.getPageSetup()) != null ? b : {}), { printGridLines: !s }));
      } });
    }
    case "print-headings": {
      const s = !!((W = e == null ? void 0 : e.getPageSetup()) != null && W.printHeadings);
      return i({ id: t, iconSvg: d("print-headings"), label: "打印行号列标", title: "打印时输出行号与列标(.xlsx 往返;我方 PDF/打印底图暂不画头)", active: s, showLabel: !0, disabled: a, onClick: () => {
        var b;
        return e == null ? void 0 : e.setPageSetup($(y({}, (b = e == null ? void 0 : e.getPageSetup()) != null ? b : {}), { printHeadings: !s }));
      } });
    }
    case "print-area":
      return i({
        id: t,
        iconSvg: d("print-area"),
        label: "打印区域",
        title: "设置打印区域",
        disabled: a,
        items: [
          i({ id: "pa-set", label: "设为打印区域(选区)", disabled: !o.hasSelection, onClick: () => e == null ? void 0 : e.setPrintAreaFromSelection() }),
          i({ id: "pa-clr", label: "取消打印区域", onClick: () => {
            var s;
            return e == null ? void 0 : e.setPageSetup($(y({}, (s = e == null ? void 0 : e.getPageSetup()) != null ? s : {}), { printArea: void 0 }));
          } })
        ]
      });
    case "page-breaks":
      return i({
        id: t,
        iconSvg: d("page-breaks"),
        label: "分页符",
        title: "插入/删除分页符(在活动单元格)",
        disabled: a,
        items: [
          i({ id: "pb-row", label: "插入/删除 行分页符", onClick: () => e == null ? void 0 : e.togglePageBreakAt("row") }),
          i({ id: "pb-col", label: "插入/删除 列分页符", onClick: () => e == null ? void 0 : e.togglePageBreakAt("col") }),
          i({ id: "pb-sep", type: "separator" }),
          i({ id: "pb-clr", label: "全部清除", onClick: () => e == null ? void 0 : e.clearPageBreaks() })
        ]
      });
    case "background":
      return i({ id: t, iconSvg: d("background"), label: "背景图片", title: "工作表背景图片 / 文字水印", disabled: a, onClick: () => e == null ? void 0 : e.openBackgroundDialog() });
    case "comment":
      return i({ id: t, iconSvg: d("comment"), label: "批注", title: "插入/编辑批注(活动格)", disabled: a, onClick: () => e == null ? void 0 : e.openCommentEditor() });
    // ---- 审阅选项卡:批注 ----
    case "comment-new":
      return i({ id: t, iconSvg: d("comment-new"), label: "新建批注", title: "在活动格新建/编辑批注", disabled: a, onClick: () => e == null ? void 0 : e.openCommentEditor() });
    case "comment-delete":
      return i({ id: t, iconSvg: d("comment-delete"), label: "删除批注", title: "删除活动格批注", disabled: a || !((K = e == null ? void 0 : e.activeHasComment) != null && K.call(e)), onClick: () => e == null ? void 0 : e.deleteActiveComment() });
    case "comment-prev":
      return i({ id: t, iconSvg: d("comment-prev"), label: "上一条", title: "上一条批注", disabled: !((J = e == null ? void 0 : e.hasAnyComment) != null && J.call(e)), onClick: () => e == null ? void 0 : e.gotoComment(-1) });
    case "comment-next":
      return i({ id: t, iconSvg: d("comment-next"), label: "下一条", title: "下一条批注", disabled: !((X = e == null ? void 0 : e.hasAnyComment) != null && X.call(e)), onClick: () => e == null ? void 0 : e.gotoComment(1) });
    case "comment-show":
      return i({ id: t, iconSvg: d("comment-show"), label: "显示", title: "显示/隐藏所有批注", active: !!((Z = e == null ? void 0 : e.isShowAllComments) != null && Z.call(e)), onClick: () => e == null ? void 0 : e.toggleShowAllComments() });
    // ---- 审阅选项卡:保护 ----
    case "cell-lock":
      return i({ id: t, iconSvg: d("cell-lock"), label: "锁定单元格", title: "锁定/解锁选区(仅在保护工作表时生效)", disabled: a, active: !!((Q = e == null ? void 0 : e.isSelectionLocked) != null && Q.call(e)), onClick: () => e == null ? void 0 : e.toggleCellLock() });
    case "allow-edit-ranges":
      return i({ id: t, iconSvg: d("allow-edit-ranges"), label: "允许编辑区域", title: "设置保护时仍可编辑的区域", disabled: a, onClick: () => e == null ? void 0 : e.openAllowEditRangesDialog() });
    case "protect-sheet":
      return i({ id: t, iconSvg: d("protect-sheet"), label: "保护工作表", title: "保护 / 撤销保护当前工作表", disabled: a, active: !!((ee = e == null ? void 0 : e.isSheetProtected) != null && ee.call(e)), onClick: () => e == null ? void 0 : e.openProtectSheetDialog() });
    case "protect-workbook":
      return i({ id: t, iconSvg: d("protect-workbook"), label: "保护工作簿", title: "保护 / 撤销保护工作簿结构", disabled: a, active: !!((ie = e == null ? void 0 : e.isWorkbookProtected) != null && ie.call(e)), onClick: () => e == null ? void 0 : e.openProtectWorkbookDialog() });
    case "share-workbook":
      return i({ id: t, iconSvg: d("share-workbook"), label: "共享工作簿", title: "该特性已被官方弃用", onClick: () => e == null ? void 0 : e.shareWorkbookNotice() });
    // ---- 视图选项卡:显示开关(WPS 复选样式;active 反映开/关)----
    case "view-formula-bar":
      return i({ id: t, iconSvg: d("view-formula-bar"), label: "编辑栏", title: "显示/隐藏编辑栏", showLabel: !0, active: (oe = (te = e == null ? void 0 : e.isFormulaBarVisible) == null ? void 0 : te.call(e)) != null ? oe : !0, onClick: () => e == null ? void 0 : e.toggleFormulaBar() });
    case "view-headers":
      return i({ id: t, iconSvg: d("view-headers"), label: "行号列标", title: "显示/隐藏行号列标", showLabel: !0, active: (ae = (le = e == null ? void 0 : e.areHeadersVisible) == null ? void 0 : le.call(e)) != null ? ae : !0, onClick: () => e == null ? void 0 : e.toggleHeaders() });
    case "view-gridlines":
      return i({ id: t, iconSvg: d("view-gridlines"), label: "网格线", title: "显示/隐藏网格线", showLabel: !0, active: (se = (ne = e == null ? void 0 : e.isGridLinesVisible) == null ? void 0 : ne.call(e)) != null ? se : !0, onClick: () => e == null ? void 0 : e.toggleGridLines() });
    case "view-taskpane":
      return i({ id: t, iconSvg: d("view-taskpane"), label: "任务窗格", title: "显示/隐藏任务窗格", showLabel: !0, active: !!((re = e == null ? void 0 : e.isTaskPaneOpen) != null && re.call(e)), onClick: () => e == null ? void 0 : e.toggleTaskPane() });
    case "fill":
      return i({
        id: t,
        iconSvg: d("fill"),
        label: "填充",
        title: "填充(值+格式;公式自动改相对引用)",
        disabled: l,
        items: [
          i({ id: "fill-down", label: "向下填充", title: "向下填充 (Ctrl+D)", onClick: () => e == null ? void 0 : e.fillSelection("down") }),
          i({ id: "fill-right", label: "向右填充", title: "向右填充 (Ctrl+R)", onClick: () => e == null ? void 0 : e.fillSelection("right") }),
          i({ id: "fill-up", label: "向上填充", onClick: () => e == null ? void 0 : e.fillSelection("up") }),
          i({ id: "fill-left", label: "向左填充", onClick: () => e == null ? void 0 : e.fillSelection("left") }),
          i({ id: "fill-sep1", type: "separator" }),
          i({ id: "fill-series", label: "序列…", title: "等差/等比/日期序列", onClick: () => e == null ? void 0 : e.openFillSeriesDialog() }),
          i({ id: "fill-sep2", type: "separator" }),
          i({ id: "fill-fmt", label: "仅填充格式(向下)", onClick: () => e == null ? void 0 : e.fillSelection("down", "formats") }),
          i({ id: "fill-noval", label: "不带格式填充(向下)", onClick: () => e == null ? void 0 : e.fillSelection("down", "values") })
        ]
      });
    case "flash-fill":
      return i({ id: t, iconSvg: d("flash-fill"), label: "快速填充", title: "快速填充(Ctrl+E:按样例推断左侧源列变换)", disabled: l, onClick: () => e == null ? void 0 : e.flashFill() });
    case "image": {
      const s = (de = e == null ? void 0 : e.getImageInsertMode()) != null ? de : "float";
      return i({
        id: t,
        iconSvg: d("image"),
        label: "图片",
        title: "插入图片(浮动式 / 嵌入到单元格)",
        disabled: a,
        onClick: () => void (e == null ? void 0 : e.openImagePicker(s)),
        // 点主按钮 = 本地图片(当前模式)
        items: [
          i({ id: "img-mode-float", label: "浮动式图片", active: s === "float", keepOpen: !0, onClick: () => e == null ? void 0 : e.setImageInsertMode("float") }),
          i({ id: "img-mode-cell", label: "嵌入到单元格", active: s === "cell", keepOpen: !0, onClick: () => e == null ? void 0 : e.setImageInsertMode("cell") }),
          i({ id: "img-msep", type: "separator" }),
          i({ id: "img-local", label: "本地图片(P)", onClick: () => void (e == null ? void 0 : e.openImagePicker(s)) }),
          i({ id: "img-batch", label: "批量插图(B)", onClick: () => void (e == null ? void 0 : e.openImagePicker(s, { multiple: !0 })) }),
          i({ id: "img-psep", type: "separator" }),
          i({ id: "img-phone", label: "手机图片/拍照", disabled: !0 })
        ]
      });
    }
    case "cell-styles":
      return i({
        id: t,
        iconSvg: d("cell-styles"),
        label: "单元格样式",
        title: "套用单元格样式画廊",
        disabled: l,
        items: Ge.flatMap(([s, b], g) => [
          ...g > 0 ? [i({ id: "csg-sep-" + g, type: "separator" })] : [],
          i({ id: "csg-hdr-" + g, label: s, disabled: !0 }),
          ...b.map(([x, v, L]) => i({ id: "cs-" + v, label: x, onClick: () => e == null ? void 0 : e.applySelectionStyle(L) }))
        ])
      });
    case "table-styles":
      return i({
        id: t,
        iconSvg: d("table-styles"),
        label: "表格样式",
        title: "套用表格样式画廊(表头+隔行+边框)",
        disabled: l,
        items: Ue.flatMap(([s, b], g) => [
          ...g > 0 ? [i({ id: "tsg-sep-" + g, type: "separator" })] : [],
          i({ id: "tsg-hdr-" + s, label: b, disabled: !0 }),
          ...Ye.map(([x, v, L]) => i({ id: `ts-${x}-${s}`, label: v, swatch: L, onClick: () => e == null ? void 0 : e.applyTableStyle(`${x}-${s}`) }))
        ])
      });
    case "convert":
      return i({
        id: t,
        iconSvg: d("convert"),
        label: "转换",
        title: "文本 ↔ 数值 转换",
        disabled: l,
        items: [
          i({ id: "cv-t2n", label: "文本 → 数值", onClick: () => e == null ? void 0 : e.convertSelection("text-to-number") }),
          i({ id: "cv-n2t", label: "数值 → 文本", onClick: () => e == null ? void 0 : e.convertSelection("number-to-text") })
        ]
      });
    case "font-name":
      return i({
        id: t,
        iconSvg: d("font"),
        label: (n == null ? void 0 : n.name) || "字体",
        title: "字体",
        disabled: l,
        items: [
          i({ id: "font-input", input: { placeholder: "字体名", value: n == null ? void 0 : n.name, onCommit: (s) => {
            s.trim() && (e == null || e.setSelectionFontName(s.trim()));
          } } }),
          i({ id: "font-isep", type: "separator" }),
          ...Oe.map((s) => i({ id: "font-" + s, label: s, active: (n == null ? void 0 : n.name) === s, onClick: () => e == null ? void 0 : e.setSelectionFontName(s) }))
        ]
      });
    case "font-size":
      return i({
        id: t,
        iconSvg: d("font-size"),
        label: (n == null ? void 0 : n.size) != null ? String(n.size) : "字号",
        title: "字号",
        disabled: l,
        items: [
          i({ id: "fs-input", input: { placeholder: "字号", value: (n == null ? void 0 : n.size) != null ? String(n.size) : "", onCommit: (s) => {
            const b = parseFloat(s);
            b > 0 && (e == null || e.setSelectionFontSize(b));
          } } }),
          i({ id: "fs-isep", type: "separator" }),
          ...De.map((s) => i({ id: "fs-" + s, label: String(s), active: (n == null ? void 0 : n.size) === s, onClick: () => e == null ? void 0 : e.setSelectionFontSize(s) }))
        ]
      });
    case "borders":
      return i({
        id: t,
        iconSvg: d("borders"),
        label: "框线",
        title: "框线",
        disabled: l,
        items: [
          i({ id: "border-all", label: "所有框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("all") }),
          i({ id: "border-outer", label: "外侧框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("outer") }),
          i({ id: "border-sep1", type: "separator" }),
          i({ id: "border-top", label: "上框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("top") }),
          i({ id: "border-bottom", label: "下框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("bottom") }),
          i({ id: "border-left", label: "左框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("left") }),
          i({ id: "border-right", label: "右框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("right") }),
          i({ id: "border-sep2", type: "separator" }),
          i({ id: "border-none", label: "无框线", onClick: () => e == null ? void 0 : e.setSelectionBorders("none") })
        ]
      });
    case "align-left":
      return i({ id: t, iconSvg: d("align-left"), label: "左对齐", title: "左对齐", active: (r == null ? void 0 : r.hAlign) === "left", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionHAlign("left") });
    case "align-center":
      return i({ id: t, iconSvg: d("align-center"), label: "居中", title: "水平居中", active: (r == null ? void 0 : r.hAlign) === "center", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionHAlign("center") });
    case "align-right":
      return i({ id: t, iconSvg: d("align-right"), label: "右对齐", title: "右对齐", active: (r == null ? void 0 : r.hAlign) === "right", disabled: l, onClick: () => e == null ? void 0 : e.setSelectionHAlign("right") });
    case "valign":
      return i({
        id: t,
        iconSvg: d("align-middle"),
        label: "垂直对齐",
        title: "垂直对齐",
        disabled: l,
        items: [
          i({ id: "valign-top", label: "顶端对齐", active: (r == null ? void 0 : r.vAlign) === "top", onClick: () => e == null ? void 0 : e.setSelectionVAlign("top") }),
          i({ id: "valign-middle", label: "垂直居中", active: (r == null ? void 0 : r.vAlign) === "middle", onClick: () => e == null ? void 0 : e.setSelectionVAlign("middle") }),
          i({ id: "valign-bottom", label: "底端对齐", active: (r == null ? void 0 : r.vAlign) === "bottom", onClick: () => e == null ? void 0 : e.setSelectionVAlign("bottom") })
        ]
      });
    case "merge-cells":
      return i({
        id: t,
        iconSvg: d("merge"),
        label: "合并",
        title: "合并居中 / 合并 / 取消合并",
        disabled: l,
        items: [
          i({ id: "merge-center", label: "合并居中", onClick: () => e == null ? void 0 : e.mergeCenterSelection() }),
          i({ id: "merge-do", label: "合并单元格", onClick: () => {
            const s = e == null ? void 0 : e.getSelection();
            s && (e == null || e.mergeCells(s));
          } }),
          i({ id: "merge-undo", label: "取消合并", onClick: () => {
            const s = e == null ? void 0 : e.getSelection();
            s && (e == null || e.unmergeCells(s));
          } })
        ]
      });
    case "indent-inc":
      return i({ id: t, iconSvg: d("indent-inc"), label: "增加缩进", title: "增加缩进", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionIndent(1) });
    case "indent-dec":
      return i({ id: t, iconSvg: d("indent-dec"), label: "减少缩进", title: "减少缩进", disabled: l, onClick: () => e == null ? void 0 : e.adjustSelectionIndent(-1) });
    case "cells": {
      const s = e == null ? void 0 : e.getActiveCell(), b = !o.editable || !s;
      return i({
        id: t,
        iconSvg: d("cells"),
        label: "行和列",
        title: "插入/删除/隐藏/最适合 行列",
        disabled: b,
        items: [
          i({ id: "ins-row", label: "在上方插入行", disabled: !s, onClick: () => s && (e == null ? void 0 : e.insertRows(s.row, 1)) }),
          i({ id: "ins-col", label: "在左侧插入列", disabled: !s, onClick: () => s && (e == null ? void 0 : e.insertCols(s.col, 1)) }),
          i({ id: "cells-sep1", type: "separator" }),
          i({ id: "del-row", label: "删除整行", disabled: !s, onClick: () => s && (e == null ? void 0 : e.deleteRows(s.row, 1)) }),
          i({ id: "del-col", label: "删除整列", disabled: !s, onClick: () => s && (e == null ? void 0 : e.deleteCols(s.col, 1)) }),
          i({ id: "cells-sep2", type: "separator" }),
          i({ id: "fit-row", label: "最适合的行高", onClick: () => e == null ? void 0 : e.autoFitSelection("row") }),
          i({ id: "fit-col", label: "最适合的列宽", onClick: () => e == null ? void 0 : e.autoFitSelection("col") }),
          i({ id: "cells-sep3", type: "separator" }),
          i({ id: "hide-row", label: "隐藏行", onClick: () => e == null ? void 0 : e.setSelectionRowsHidden(!0) }),
          i({ id: "hide-col", label: "隐藏列", onClick: () => e == null ? void 0 : e.setSelectionColsHidden(!0) }),
          i({ id: "show-row", label: "显示行", onClick: () => e == null ? void 0 : e.setSelectionRowsHidden(!1) }),
          i({ id: "show-col", label: "显示列", onClick: () => e == null ? void 0 : e.setSelectionColsHidden(!1) })
        ]
      });
    }
  }
  return null;
}
export {
  li as R,
  ri as S,
  Te as T,
  Ze as a,
  Qe as b,
  Je as c,
  ii as d,
  O as e,
  Re as f,
  si as g,
  ni as h,
  ti as i,
  Ie as j,
  di as k,
  ai as l,
  Xe as p,
  oi as r,
  ei as s
};
