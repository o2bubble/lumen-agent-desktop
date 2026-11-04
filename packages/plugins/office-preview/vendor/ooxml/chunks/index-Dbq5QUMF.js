var Vd = Object.defineProperty, Yd = Object.defineProperties;
var Gd = Object.getOwnPropertyDescriptors;
var Yo = Object.getOwnPropertySymbols;
var Js = Object.prototype.hasOwnProperty, Zs = Object.prototype.propertyIsEnumerable;
var Qn = (n, e, t) => e in n ? Vd(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, R = (n, e) => {
  for (var t in e || (e = {}))
    Js.call(e, t) && Qn(n, t, e[t]);
  if (Yo)
    for (var t of Yo(e))
      Zs.call(e, t) && Qn(n, t, e[t]);
  return n;
}, K = (n, e) => Yd(n, Gd(e));
var Qs = (n, e) => {
  var t = {};
  for (var o in n)
    Js.call(n, o) && e.indexOf(o) < 0 && (t[o] = n[o]);
  if (n != null && Yo)
    for (var o of Yo(n))
      e.indexOf(o) < 0 && Zs.call(n, o) && (t[o] = n[o]);
  return t;
};
var T = (n, e, t) => Qn(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as be, defineComponent as Xd, getCurrentInstance as Kd, computed as me, watch as ke, reactive as Jd, shallowRef as Zd, onMounted as Qd, nextTick as ho, onBeforeUnmount as eu, h as U } from "@vue/composition-api";
const Ma = {
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
function Wt(n) {
  return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + n + "</svg>";
}
function tu(n) {
  const e = [[]];
  for (const t of n)
    t.type === "rowbreak" ? e.push([]) : e[e.length - 1].push(t);
  return e.filter((t) => t.length);
}
function ou(n) {
  const e = [];
  let t = [];
  const o = () => {
    t.length && (e.push({ kind: "smalls", rows: tu(t) }), t = []);
  };
  for (const i of n) {
    if (i.type === "separator") {
      o(), e.push({ kind: "smalls", rows: [[i]] });
      continue;
    }
    i.size === "large" ? (o(), e.push({ kind: "large", item: i })) : t.push(i);
  }
  return o(), e;
}
function er(n) {
  var e;
  return n.groups && n.groups.length ? n.groups : [{ id: n.id + "__g", name: "", tools: (e = n.tools) != null ? e : [] }];
}
const Ia = [
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
], $a = Object.fromEntries(
  Ia.map((n) => [n.id, n])
);
function vn(n) {
  return n === "separator" || n === "|";
}
function nu(n) {
  return n === "/" || n === "rowbreak";
}
const tr = {
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
function iu(n, e) {
  return n === !1 || e === !1 ? !1 : n && typeof n == "object" ? !0 : !Array.isArray(e);
}
function or(n, e) {
  return vn(n) || n in $a || !!(e != null && e.has(n));
}
function su(n) {
  const e = [], t = {};
  let o = 0;
  for (const i of n)
    if (typeof i == "string")
      e.push(i);
    else {
      const s = i.id && !(i.id in t) ? i.id : `__custom_${o++}`;
      t[s] = i, e.push(s);
    }
  return { tools: e, customItems: t };
}
function ru(n, e, t) {
  if (!e || !Array.isArray(e.sections) || e.sections.length === 0)
    return { sections: n };
  const o = e.sections.map((s) => R(R(R({}, s), s.tools ? { tools: s.tools.filter((r) => or(r, t)) } : {}), s.groups ? { groups: s.groups.map((r) => K(R({}, r), { tools: r.tools.filter((l) => or(l, t)) })) } : {})), i = new Set(o.map((s) => s.id));
  for (const s of n)
    !s.editable && !i.has(s.id) && o.push(s);
  return { sections: o, activeSectionId: e.activeSectionId };
}
function nr(n) {
  const { ribbon: e, toolbar: t, userState: o } = n;
  if (e === !1 || t === !1)
    return { sections: null, activeSectionId: "", customItems: {}, singleSection: !0, ribbonMode: !1 };
  let i, s = {}, r;
  if (e && typeof e == "object")
    i = e.sections, r = e.defaultSectionId;
  else if (Array.isArray(t)) {
    const h = su(t);
    return s = h.customItems, i = [{ id: "__legacy", name: "工具", editable: !1, tools: h.tools }], { sections: i, activeSectionId: "__legacy", customItems: s, singleSection: !0, ribbonMode: !1 };
  } else
    i = tr.sections, r = tr.defaultSectionId;
  if (i.length === 0)
    return { sections: null, activeSectionId: "", customItems: s, singleSection: !0, ribbonMode: !1 };
  const l = new Set(Object.keys(s)), a = ru(i, o, l), c = a.sections, d = (h) => !!h && c.some((p) => p.id === h), u = d(a.activeSectionId) ? a.activeSectionId : d(r) ? r : c[0].id;
  return { sections: c, activeSectionId: u, customItems: s, singleSection: c.length <= 1, ribbonMode: !0 };
}
const lu = "ooxml-excel-editor.ribbon";
function fs() {
  try {
    return typeof window == "undefined" || !window.localStorage ? null : window.localStorage;
  } catch (n) {
    return null;
  }
}
function au(n) {
  const e = fs();
  if (!e || !n) return null;
  try {
    const t = e.getItem(n);
    if (!t) return null;
    const o = JSON.parse(t);
    return !o || o.v !== 1 || !Array.isArray(o.sections) ? null : o;
  } catch (t) {
    return null;
  }
}
function cu(n, e) {
  const t = fs();
  if (!(!t || !n))
    try {
      t.setItem(n, JSON.stringify(e));
    } catch (o) {
    }
}
function du(n) {
  const e = fs();
  if (!(!e || !n))
    try {
      e.removeItem(n);
    } catch (t) {
    }
}
const rt = {
  cellStyle: "overwrite",
  fill: "overwrite",
  rowHeight: "source",
  colWidth: "firstRowOnly",
  sourceMerges: "apply",
  targetMerges: "clear",
  images: "apply"
}, Rn = {
  cellStyle: "skip",
  fill: "skip",
  rowHeight: "keep",
  colWidth: "keep",
  sourceMerges: "skip",
  targetMerges: "keep",
  images: "skip"
};
function St(n) {
  return R(R({}, rt), n != null ? n : {});
}
function ir(n, e) {
  return n.colWidth === "source" || n.colWidth === "firstRowOnly" && e === 0;
}
function sr(n, e, t, o, i) {
  if (o === "skip" && i === "skip") return null;
  const c = t, { fill: s } = c, r = Qs(c, ["fill"]), l = o === "overwrite" ? e : n, a = R({}, l);
  return o !== "skip" ? (Object.assign(a, r), r.font && (a.font = R(R({}, l.font), r.font)), r.borders && (a.borders = R(R({}, l.borders), r.borders))) : (a.font = R({}, l.font), a.borders = R({}, l.borders)), i === "skip" ? a.fill = n.fill : s ? a.fill = R({}, s) : a.fill = i === "overwrite" ? { type: "none" } : n.fill, a;
}
const Aa = [
  { key: "cellStyle", label: "字体/对齐/换行/边框/数字格式", hint: "覆盖=只留源;合并=源没写的留目标;不粘=保留目标", opts: [["overwrite", "覆盖"], ["merge", "合并"], ["skip", "不粘(留目标)"]] },
  { key: "fill", label: "填充底色", hint: "覆盖=源没写则无填充;合并=源没写则留目标底色;不粘=保留目标", opts: [["overwrite", "覆盖"], ["merge", "合并"], ["skip", "不粘(留目标)"]] },
  { key: "rowHeight", label: "行高", hint: "逐行,只影响被粘的行", opts: [["source", "搬源"], ["keep", "不动"]] },
  { key: "colWidth", label: "列宽", hint: "整列共享,搬到中间会动上方表头", opts: [["firstRowOnly", "仅首行搬源"], ["source", "总搬源"], ["keep", "不动"]] },
  { key: "targetMerges", label: "目标原有合并(粘贴区内)", hint: "不清的话旧合并会吞列致数据错位", opts: [["clear", "清掉"], ["keep", "保留"]] },
  { key: "sourceMerges", label: "源自带的合并", hint: "应用源里的合并区", opts: [["apply", "应用"], ["skip", "不应用"]] },
  { key: "images", label: "图片(内嵌/浮动)", hint: "把源的图落到目标格", opts: [["apply", "落格"], ["skip", "不粘"]] }
];
function ei(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class uu {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  show(e) {
    var u, h, p, m, b, v;
    if (typeof document == "undefined") return;
    this.close();
    const t = St(e.current), o = document.createElement("div");
    o.className = "ooxml-paste-config-mask", o.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const i = document.createElement("div");
    i.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;";
    const s = (y) => {
      const w = String(t[y.key]), S = y.opts.map(([k, C]) => `<option value="${k}"${k === w ? " selected" : ""}>${ei(C)}</option>`).join("");
      return [
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed #eef0f2">',
        `<div style="min-width:0"><div style="font-weight:500">${ei(y.label)}</div><div style="color:#98a2b3;font-size:12px">${ei(y.hint)}</div></div>`,
        `<select data-key="${y.key}" style="flex:0 0 132px;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 6px;background:#fff;cursor:pointer">${S}</select>`,
        "</div>"
      ].join("");
    };
    i.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>粘贴行为配置</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:10px 16px">',
      '<div style="display:flex;gap:8px;margin-bottom:8px">',
      '<button data-preset-overwrite style="flex:1;height:30px;border:1px solid #d0d5dd;border-radius:5px;background:#f5f7fa;cursor:pointer">覆盖式 1:1(默认)</button>',
      '<button data-preset-values style="flex:1;height:30px;border:1px solid #d0d5dd;border-radius:5px;background:#f5f7fa;cursor:pointer">仅值(保留目标)</button>',
      "</div>",
      '<div style="color:#98a2b3;font-size:12px;margin-bottom:4px">逐项自由定制(列宽默认「仅首行搬源」:粘到首行=新表头取源宽,粘到中间=不动上方表头)。</div>',
      Aa.map(s).join(""),
      "</div>",
      '<div style="display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      '<button data-reset style="height:30px;padding:0 12px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">恢复默认</button>',
      '<button data-cancel style="height:30px;padding:0 14px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">取消</button>',
      '<button data-ok style="height:30px;padding:0 14px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">应用</button>',
      "</div>"
    ].join(""), o.appendChild(i), document.body.appendChild(o), this.el = o;
    const r = () => Array.from(i.querySelectorAll("select[data-key]")), l = (y) => {
      for (const w of r()) w.value = String(y[w.dataset.key]);
    }, a = () => {
      const y = {};
      for (const w of r()) y[w.dataset.key] = w.value;
      return St(y);
    }, c = () => {
      const y = a();
      this.close(), e.onSubmit(y);
    };
    (u = i.querySelector("[data-preset-overwrite]")) == null || u.addEventListener("click", () => l(rt)), (h = i.querySelector("[data-preset-values]")) == null || h.addEventListener("click", () => l(Rn)), (p = i.querySelector("[data-reset]")) == null || p.addEventListener("click", () => l(rt)), (m = i.querySelector("[data-close]")) == null || m.addEventListener("click", () => this.close()), (b = i.querySelector("[data-cancel]")) == null || b.addEventListener("click", () => this.close()), (v = i.querySelector("[data-ok]")) == null || v.addEventListener("click", c), o.addEventListener("mousedown", (y) => {
      y.target === o && this.close();
    });
    const d = (y) => {
      y.key === "Escape" && this.close();
    };
    document.addEventListener("keydown", d, !0), this.cleanup = () => document.removeEventListener("keydown", d, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const hu = [
  {
    title: "导航",
    items: [
      { keys: "↑ ↓ ← →", desc: "移动活动单元格" },
      { keys: "Ctrl + 方向键", desc: "跳到数据区边界" },
      { keys: "Shift + 方向键", desc: "扩展选区" },
      { keys: "Home", desc: "移到本行首列" },
      { keys: "Ctrl + Home", desc: "移到 A1" },
      { keys: "End", desc: "移到本行末列" },
      { keys: "Ctrl + End", desc: "移到数据右下角" },
      { keys: "PageUp / PageDown", desc: "上 / 下翻一屏" },
      { keys: "Enter", desc: "下移一格" },
      { keys: "Tab / Shift + Tab", desc: "右 / 左移一格" }
    ]
  },
  {
    title: "选择",
    items: [
      { keys: "Ctrl + A", desc: "全选" },
      { keys: "Ctrl + 单击", desc: "多区域加选(不连续选区)" }
    ]
  },
  {
    title: "编辑",
    items: [
      { keys: "F2", desc: "进入单元格编辑", requiresEdit: !0 },
      { keys: "任意字符", desc: "直接输入覆盖当前格", requiresEdit: !0 },
      { keys: "Delete / Backspace", desc: "清除内容", requiresEdit: !0 },
      { keys: "Ctrl + Z", desc: "撤销", requiresEdit: !0 },
      { keys: "Ctrl + Y / Ctrl + Shift + Z", desc: "重做", requiresEdit: !0 },
      { keys: "Ctrl + E", desc: "快速填充(Flash Fill)", requiresEdit: !0 },
      { keys: "Esc", desc: "取消编辑 / 退出格式刷 / 取消选中图片" }
    ]
  },
  {
    title: "剪贴板",
    items: [
      { keys: "Ctrl + C", desc: "复制选区" },
      { keys: "Ctrl + V", desc: "粘贴(保留格式)", requiresEdit: !0 }
    ]
  },
  {
    title: "图片(选中浮动图,编辑模式)",
    items: [
      { keys: "Delete / Backspace", desc: "删除选中图片", requiresEdit: !0 },
      { keys: "Esc", desc: "取消选中 / 退出裁剪", requiresEdit: !0 }
    ]
  }
], Fa = "height:28px;padding:0 12px;border-radius:5px;cursor:pointer;font:inherit", fu = `${Fa};border:1px solid #1b7f4d;background:#21a366;color:#fff`, bt = `${Fa};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Ue = "width:24px;height:24px;border:1px solid #d0d5dd;background:#fff;border-radius:4px;cursor:pointer;font:inherit;color:#475467;line-height:1";
function Ne(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class pu {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "tab", "ribbon");
    T(this, "sections", []);
    T(this, "activeId", "");
    T(this, "selSectionId", "");
    // 板块管理里当前选中的板块
    T(this, "catalog", []);
    T(this, "zoom", 1);
    T(this, "editable", !1);
    T(this, "cellImageFit", "fill");
    T(this, "pasteBehavior", rt);
    T(this, "o");
  }
  show(e) {
    var s, r;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.sections = e.sections.map((l) => R(R(R({}, l), l.tools ? { tools: [...l.tools] } : {}), l.groups ? { groups: l.groups.map((a) => K(R({}, a), { tools: [...a.tools] })) } : {})), this.activeId = e.activeSectionId, this.selSectionId = e.activeSectionId || ((r = (s = this.sections[0]) == null ? void 0 : s.id) != null ? r : ""), this.catalog = e.catalog, this.zoom = e.zoom, this.editable = e.editable, this.cellImageFit = e.cellImageFit, this.pasteBehavior = St(e.pasteBehavior), this.tab = "ribbon";
    const t = document.createElement("div");
    t.className = "ooxml-settings-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-settings-card", o.style.cssText = "width:720px;max-width:96vw;height:520px;max-height:92vh;display:flex;flex-direction:column;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (l) => {
      l.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (l) => {
      l.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(o);
  }
  /** 应用板块工作副本到外部(持久化 + 重渲)。 */
  emitRibbon() {
    var e, t;
    this.sections.some((o) => o.id === this.activeId) || (this.activeId = (t = (e = this.sections[0]) == null ? void 0 : e.id) != null ? t : ""), this.o.onRibbonChange(this.sections.map((o) => R(R(R({}, o), o.tools ? { tools: [...o.tools] } : {}), o.groups ? { groups: o.groups.map((i) => K(R({}, i), { tools: [...i.tools] })) } : {})), this.activeId);
  }
  newSectionId() {
    let e = 1;
    for (; this.sections.some((t) => t.id === "sec-" + e); ) e++;
    return "sec-" + e;
  }
  render(e) {
    var o, i, s;
    e.innerHTML = [
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
      `<button data-reset style="${bt}">重置板块布局</button>`,
      `<button data-done style="${fu}">完成</button>`,
      "</div>"
    ].join("");
    const t = e.querySelector("[data-body]");
    this.tab === "ribbon" ? this.renderRibbonTab(t) : this.tab === "paste" ? this.renderPasteTab(t) : this.tab === "shortcuts" ? this.renderShortcutsTab(t) : this.renderViewTab(t), e.querySelectorAll("[data-tab]").forEach((r) => r.addEventListener("click", () => {
      this.tab = r.dataset.tab, this.render(e);
    })), (o = e.querySelector("[data-close]")) == null || o.addEventListener("click", () => this.close()), (i = e.querySelector("[data-done]")) == null || i.addEventListener("click", () => this.close()), (s = e.querySelector("[data-reset]")) == null || s.addEventListener("click", () => {
      this.o.onReset(), this.close();
    });
  }
  tabBtn(e, t) {
    const o = this.tab === e;
    return `<button data-tab="${e}" style="text-align:left;padding:7px 10px;border:0;border-radius:6px;cursor:pointer;font:inherit;background:${o ? "#e8f0fe" : "transparent"};color:${o ? "#1a73e8" : "#1f2329"};font-weight:${o ? 600 : 400}">${t}</button>`;
  }
  // ---- 工具板块 tab ----
  renderRibbonTab(e) {
    var o, i;
    const t = (o = this.sections.find((s) => s.id === this.selSectionId)) != null ? o : this.sections[0];
    e.innerHTML = [
      '<div style="display:flex;gap:14px;height:100%">',
      // 板块列表
      '<div style="flex:0 0 200px;display:flex;flex-direction:column">',
      '<div style="font-weight:600;margin-bottom:6px">板块</div>',
      '<div data-seclist style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px"></div>',
      `<button data-newsec style="${bt};margin-top:8px">＋ 新建板块</button>`,
      "</div>",
      // 选中板块的工具分配
      '<div style="flex:1;display:flex;flex-direction:column;min-width:0">',
      `<div style="font-weight:600;margin-bottom:6px">${t ? Ne(t.name) : "(无板块)"} · 工具</div>`,
      '<div data-assign style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px;padding:8px"></div>',
      "</div>",
      "</div>"
    ].join(""), this.renderSecList(e.querySelector("[data-seclist]")), t && this.renderAssign(e.querySelector("[data-assign]"), t), (i = e.querySelector("[data-newsec]")) == null || i.addEventListener("click", () => {
      const s = this.newSectionId();
      this.sections.push({ id: s, name: "新板块", editable: !0, tools: [] }), this.selSectionId = s, this.emitRibbon(), this.renderRibbonTab(e);
    });
  }
  renderSecList(e) {
    e.innerHTML = this.sections.map((t, o) => {
      const i = t.id === this.selSectionId, s = t.editable ? `<input data-rename="${t.id}" value="${Ne(t.name)}" style="border:0;background:transparent;font:inherit;color:inherit;width:100%;padding:0" />` : `<span title="内置板块(不可改名/删除)">${Ne(t.name)} 🔒</span>`;
      return [
        `<div data-secrow="${t.id}" style="display:flex;align-items:center;gap:4px;padding:6px 8px;cursor:pointer;background:${i ? "#e8f0fe" : "transparent"};border-bottom:1px solid #f2f3f5">`,
        `<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${s}</span>`,
        `<button data-up="${o}" title="上移" style="${Ue}"${o === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-down="${o}" title="下移" style="${Ue}"${o === this.sections.length - 1 ? " disabled" : ""}>↓</button>`,
        t.editable ? `<button data-del="${t.id}" title="删除板块" style="${Ue};color:#d92d20">✕</button>` : "",
        "</div>"
      ].join("");
    }).join("") || '<div style="padding:10px;color:#98a2b3">暂无板块</div>', e.querySelectorAll("[data-secrow]").forEach((t) => t.addEventListener("click", (o) => {
      o.target.closest("button,input") || (this.selSectionId = t.dataset.secrow, this.renderRibbonTab(e.closest("[data-body]")));
    })), e.querySelectorAll("[data-rename]").forEach((t) => t.addEventListener("change", () => {
      const o = t, i = this.sections.find((s) => s.id === o.dataset.rename);
      i && (i.name = o.value.trim() || i.name, this.emitRibbon());
    })), e.querySelectorAll("[data-up],[data-down]").forEach((t) => t.addEventListener("click", () => {
      var r;
      const o = t, i = Number((r = o.dataset.up) != null ? r : o.dataset.down), s = o.dataset.up != null ? i - 1 : i + 1;
      s < 0 || s >= this.sections.length || ([this.sections[i], this.sections[s]] = [this.sections[s], this.sections[i]], this.emitRibbon(), this.renderRibbonTab(e.closest("[data-body]")));
    })), e.querySelectorAll("[data-del]").forEach((t) => t.addEventListener("click", () => {
      var i, s;
      const o = t.dataset.del;
      this.sections = this.sections.filter((r) => r.id !== o), this.selSectionId === o && (this.selSectionId = (s = (i = this.sections[0]) == null ? void 0 : i.id) != null ? s : ""), this.emitRibbon(), this.renderRibbonTab(e.closest("[data-body]"));
    }));
  }
  renderAssign(e, t) {
    var c;
    if (t.groups && t.groups.length) {
      this.renderAssignGrouped(e, t);
      return;
    }
    t.tools || (t.tools = []);
    const o = t.tools, i = o.map((d, u) => {
      var m;
      const h = this.catalog.find((b) => b.id === d), p = vn(d) ? "— 分隔线 —" : (m = h == null ? void 0 : h.label) != null ? m : d;
      return [
        '<div style="display:flex;align-items:center;gap:4px;padding:4px 6px;background:#f7f8fa;border:1px solid #eef0f2;border-radius:5px;margin-bottom:4px">',
        `<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${Ne(p)}</span>`,
        `<button data-tup="${u}" title="上移" style="${Ue}"${u === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-tdown="${u}" title="下移" style="${Ue}"${u === o.length - 1 ? " disabled" : ""}>↓</button>`,
        `<button data-trem="${u}" title="移除" style="${Ue};color:#d92d20">✕</button>`,
        "</div>"
      ].join("");
    }).join("") || '<div style="color:#98a2b3;padding:6px">未分配工具;从下方勾选加入。</div>', s = /* @__PURE__ */ new Map();
    for (const d of this.catalog)
      s.has(d.group) || s.set(d.group, []), s.get(d.group).push(d);
    const r = new Set(o), l = [...s.entries()].map(([d, u]) => [
      `<div style="margin:8px 0 4px;color:#475467;font-weight:600">${Ne(d)}</div>`,
      '<div style="display:flex;flex-wrap:wrap;gap:6px">',
      ...u.map((h) => `<label style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid ${r.has(h.id) ? "#21a366" : "#e5e7eb"};border-radius:14px;cursor:pointer;background:${r.has(h.id) ? "#eafaf1" : "#fff"}"><input type="checkbox" data-pick="${h.id}"${r.has(h.id) ? " checked" : ""} style="margin:0"> ${Ne(h.label)}</label>`),
      "</div>"
    ].join("")).join("");
    e.innerHTML = [
      '<div style="font-weight:600;margin-bottom:4px">已分配</div>',
      i,
      `<div style="margin-top:6px"><button data-addsep style="${bt};height:24px;padding:0 10px">＋ 加分隔线</button></div>`,
      '<div style="font-weight:600;margin:12px 0 2px">可选工具</div>',
      l
    ].join("");
    const a = () => this.renderRibbonTab(e.closest("[data-body]"));
    e.querySelectorAll("[data-tup],[data-tdown]").forEach((d) => d.addEventListener("click", () => {
      var m;
      const u = d, h = Number((m = u.dataset.tup) != null ? m : u.dataset.tdown), p = u.dataset.tup != null ? h - 1 : h + 1;
      p < 0 || p >= o.length || ([o[h], o[p]] = [o[p], o[h]], this.emitRibbon(), a());
    })), e.querySelectorAll("[data-trem]").forEach((d) => d.addEventListener("click", () => {
      o.splice(Number(d.dataset.trem), 1), this.emitRibbon(), a();
    })), (c = e.querySelector("[data-addsep]")) == null || c.addEventListener("click", () => {
      o.push("separator"), this.emitRibbon(), a();
    }), e.querySelectorAll("[data-pick]").forEach((d) => d.addEventListener("change", () => {
      const u = d, h = u.dataset.pick;
      u.checked ? o.includes(h) || o.push(h) : t.tools = o.filter((p) => p !== h), this.emitRibbon(), a();
    }));
  }
  /** 分组板块(WPS 式)的工具分配:按命名组管理 —— 新建/改名/删组、组内勾选分配 + ↑↓ 重排。 */
  renderAssignGrouped(e, t) {
    var l;
    const o = t.groups, i = () => this.renderRibbonTab(e.closest("[data-body]")), s = /* @__PURE__ */ new Map();
    for (const a of this.catalog)
      s.has(a.group) || s.set(a.group, []), s.get(a.group).push(a);
    e.innerHTML = o.map((a, c) => {
      var m;
      const d = new Set(a.tools), u = a.tools.map((b, v) => {
        var w, S;
        const y = vn(b) ? "｜" : (S = (w = this.catalog.find((k) => k.id === b)) == null ? void 0 : w.label) != null ? S : b;
        return `<span style="display:inline-flex;align-items:center;gap:2px;padding:2px 6px;background:#f2f4f7;border-radius:12px;margin:0 4px 4px 0"><button data-gtup="${c}:${v}" style="${Ue};width:18px;height:18px"${v === 0 ? " disabled" : ""}>↑</button>${Ne(y)}<button data-gtrem="${c}:${v}" style="${Ue};width:18px;height:18px;color:#d92d20">✕</button></span>`;
      }).join("") || '<span style="color:#98a2b3">（空组）</span>', p = ((m = s.get(a.name)) != null ? m : this.catalog).filter((b) => !d.has(b.id)).map((b) => `<label style="display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border:1px solid #e5e7eb;border-radius:12px;cursor:pointer;margin:0 4px 4px 0"><input type="checkbox" data-gpick="${c}:${b.id}" style="margin:0"> ${Ne(b.label)}</label>`).join("");
      return [
        '<div style="border:1px solid #eef0f2;border-radius:7px;padding:8px 10px;margin-bottom:8px">',
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">',
        `<input data-grename="${c}" value="${Ne(a.name)}" style="font-weight:600;border:0;border-bottom:1px dashed #d0d5dd;background:transparent;font:inherit;color:inherit;flex:1" />`,
        `<button data-gup="${c}" style="${Ue}"${c === 0 ? " disabled" : ""}>↑</button>`,
        `<button data-gdown="${c}" style="${Ue}"${c === o.length - 1 ? " disabled" : ""}>↓</button>`,
        `<button data-gdel="${c}" style="${Ue};color:#d92d20">✕</button>`,
        "</div>",
        `<div style="margin-bottom:6px">${u}<button data-gsep="${c}" style="${Ue};width:auto;padding:0 6px">＋分隔</button></div>`,
        `<div style="font-size:12px;color:#98a2b3;margin-bottom:2px">添加工具:</div><div>${p}</div>`,
        "</div>"
      ].join("");
    }).join("") + `<button data-gnew style="${bt}">＋ 新建组</button>`;
    const r = (a) => {
      const [c, d] = a.split(":");
      return [Number(c), d];
    };
    e.querySelectorAll("[data-grename]").forEach((a) => a.addEventListener("change", () => {
      const c = a, d = o[Number(c.dataset.grename)];
      d && (d.name = c.value.trim() || d.name, this.emitRibbon());
    })), e.querySelectorAll("[data-gup],[data-gdown]").forEach((a) => a.addEventListener("click", () => {
      var h;
      const c = a, d = Number((h = c.dataset.gup) != null ? h : c.dataset.gdown), u = c.dataset.gup != null ? d - 1 : d + 1;
      u < 0 || u >= o.length || ([o[d], o[u]] = [o[u], o[d]], this.emitRibbon(), i());
    })), e.querySelectorAll("[data-gdel]").forEach((a) => a.addEventListener("click", () => {
      o.splice(Number(a.dataset.gdel), 1), this.emitRibbon(), i();
    })), e.querySelectorAll("[data-gtup]").forEach((a) => a.addEventListener("click", () => {
      const [c, d] = r(a.dataset.gtup), u = Number(d), h = o[c].tools;
      u <= 0 || ([h[u], h[u - 1]] = [h[u - 1], h[u]], this.emitRibbon(), i());
    })), e.querySelectorAll("[data-gtrem]").forEach((a) => a.addEventListener("click", () => {
      const [c, d] = r(a.dataset.gtrem);
      o[c].tools.splice(Number(d), 1), this.emitRibbon(), i();
    })), e.querySelectorAll("[data-gsep]").forEach((a) => a.addEventListener("click", () => {
      o[Number(a.dataset.gsep)].tools.push("separator"), this.emitRibbon(), i();
    })), e.querySelectorAll("[data-gpick]").forEach((a) => a.addEventListener("change", () => {
      const [c, d] = r(a.dataset.gpick);
      o[c].tools.includes(d) || o[c].tools.push(d), this.emitRibbon(), i();
    })), (l = e.querySelector("[data-gnew]")) == null || l.addEventListener("click", () => {
      let a = 1;
      for (; o.some((c) => c.id === "g" + a); ) a++;
      o.push({ id: "g" + a, name: "新组", tools: [] }), this.emitRibbon(), i();
    });
  }
  // ---- 常规 tab(运行时设置:编辑模式 / 缩放)----
  renderViewTab(e) {
    var o, i, s;
    const t = [0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => `<option value="${r}"${Math.abs(r - this.zoom) < 1e-3 ? " selected" : ""}>${Math.round(r * 100)}%</option>`).join("");
    e.innerHTML = [
      // 编辑模式
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;cursor:pointer">',
      `<input type="checkbox" data-editable${this.editable ? " checked" : ""} style="width:16px;height:16px;margin:0">`,
      '<span style="font-weight:500">编辑模式</span>',
      '<span style="color:#98a2b3">开启后可改值 / 样式 / 列宽行高 / 增删行列(默认只读)</span>',
      "</label>",
      // 缩放
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">',
      '<span style="flex:0 0 80px;color:#475467">缩放</span>',
      `<select data-zoom style="${bt};height:30px">${t}</select>`,
      "</div>",
      // WPS 内嵌图贴合方式
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">',
      '<span style="flex:0 0 80px;color:#475467">内嵌图贴合</span>',
      `<select data-cellimgfit style="${bt};height:30px">`,
      ...["fill", "contain", "cover"].map((r) => `<option value="${r}"${this.cellImageFit === r ? " selected" : ""}>${{ fill: "拉伸铺满(fill,同 WPS)", contain: "等比留白(contain)", cover: "等比裁剪(cover)" }[r]}</option>`),
      "</select>",
      "</div>",
      '<div style="color:#98a2b3">数据透视表 / 条件格式 由组件 props 开启(<code>pivotTable</code> / <code>conditionalFormat</code>)。</div>'
    ].join(""), (o = e.querySelector("[data-editable]")) == null || o.addEventListener("change", (r) => {
      const l = r.target.checked;
      this.editable = l, this.o.onRuntimeChange({ editable: l });
    }), (i = e.querySelector("[data-zoom]")) == null || i.addEventListener("change", (r) => {
      const l = parseFloat(r.target.value);
      this.zoom = l, this.o.onRuntimeChange({ zoom: l });
    }), (s = e.querySelector("[data-cellimgfit]")) == null || s.addEventListener("change", (r) => {
      const l = r.target.value;
      this.cellImageFit = l, this.o.onRuntimeChange({ cellImageFit: l });
    });
  }
  // ---- 粘贴 tab(粘贴行为配置,原独立「⚙ 粘贴配置」并入此处;字段与 paste-config-host 同源)----
  renderPasteTab(e) {
    var l, a;
    const t = St(this.pasteBehavior), o = (c) => {
      const d = String(t[c.key]), u = c.opts.map(([h, p]) => `<option value="${h}"${h === d ? " selected" : ""}>${Ne(p)}</option>`).join("");
      return [
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed #eef0f2">',
        `<div style="min-width:0"><div style="font-weight:500">${Ne(c.label)}</div><div style="color:#98a2b3;font-size:12px">${Ne(c.hint)}</div></div>`,
        `<select data-pkey="${c.key}" style="flex:0 0 132px;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 6px;background:#fff;cursor:pointer">${u}</select>`,
        "</div>"
      ].join("");
    };
    e.innerHTML = [
      '<div style="color:#475467;margin-bottom:8px">控制 Ctrl+V / 右键粘贴时,源内容各方面如何落到目标(覆盖 / 合并 / 仅值)。改动即生效。</div>',
      '<div style="display:flex;gap:8px;margin-bottom:8px">',
      `<button data-preset-overwrite style="${bt};flex:1">覆盖式 1:1(默认)</button>`,
      `<button data-preset-values style="${bt};flex:1">仅值(保留目标)</button>`,
      "</div>",
      Aa.map(o).join("")
    ].join("");
    const i = () => Array.from(e.querySelectorAll("select[data-pkey]")), s = () => {
      const c = {};
      for (const d of i()) c[d.dataset.pkey] = d.value;
      return St(c);
    }, r = (c) => {
      this.pasteBehavior = c, this.o.onRuntimeChange({ pasteBehavior: c }), this.renderPasteTab(e);
    };
    for (const c of i()) c.addEventListener("change", () => r(s()));
    (l = e.querySelector("[data-preset-overwrite]")) == null || l.addEventListener("click", () => r(rt)), (a = e.querySelector("[data-preset-values]")) == null || a.addEventListener("click", () => r(Rn));
  }
  // ---- 快捷键 tab(只读清单;单一真相源 = core KEYBOARD_SHORTCUTS)----
  renderShortcutsTab(e) {
    const t = (i) => i.split(" / ").map(
      (s) => s.trim().split(/\s*\+\s*/).map((r) => `<kbd style="display:inline-block;min-width:16px;text-align:center;padding:1px 6px;margin:0 1px;border:1px solid #d0d5dd;border-bottom-width:2px;border-radius:4px;background:#f9fafb;font:11px/1.6 ui-monospace,Consolas,monospace;color:#344054">${Ne(r)}</kbd>`).join('<span style="color:#98a2b3">+</span>')
    ).join('<span style="color:#98a2b3;margin:0 4px">/</span>'), o = (i) => [
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px dashed #eef0f2">',
      `<span style="flex:0 0 auto">${t(i.keys)}</span>`,
      `<span style="flex:1;text-align:right;color:#475467">${Ne(i.desc)}${i.requiresEdit ? ' <span style="color:#98a2b3;font-size:11px">(编辑模式)</span>' : ""}</span>`,
      "</div>"
    ].join("");
    e.innerHTML = [
      '<div style="color:#475467;margin-bottom:10px">当前支持的键盘快捷键(标「编辑模式」的项需开启 <b>editable</b> 后可用)。</div>',
      hu.map((i) => [
        `<div style="font-weight:600;margin:12px 0 2px;color:#344054">${Ne(i.title)}</div>`,
        i.items.map(o).join("")
      ].join("")).join("")
    ].join("");
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const $o = 1048576, Zt = 16384;
class kt {
  constructor(e, t = 1, o = 0, i = 0, s = !0) {
    T(this, "cols");
    T(this, "rows");
    /**
     * 虚拟行/列上限(≥ dimension,≤ Excel 上限)。**仅**用于"滚动出空行"的 spacer 尺寸 /
     * 可视区范围 / 命中夹取 / 表头;**不**改 totalWidth/Height(导出与 data-access 仍按 dimension)。
     */
    T(this, "vRows");
    T(this, "vCols");
    /** 行表头(显示行号)宽度 px */
    T(this, "rowHeaderWidth");
    /** 列表头(显示列字母)高度 px */
    T(this, "colHeaderHeight");
    T(this, "colLefts");
    // 长度 cols+1，colLefts[c] = 第 c 列左边缘(相对网格原点)
    T(this, "rowTops");
    // 长度 rows+1
    T(this, "colWidths");
    T(this, "rowHeights");
    /** 当前缩放比例(几何与字体同步按它缩放，保证缩放后排版一致) */
    T(this, "zoom");
    var r, l;
    this.sheet = e, this.zoom = t, this.cols = Math.max(e.dimension.cols, 1), this.rows = Math.max(e.dimension.rows, 1), this.vRows = Math.min(Math.max(this.rows, o), $o), this.vCols = Math.min(Math.max(this.cols, i), Zt), this.colHeaderHeight = s ? Math.round(22 * t) : 0, this.rowHeaderWidth = s ? Math.round(Math.max(40, String(this.vRows).length * 8 + 16) * t) : 0, this.colWidths = new Array(this.cols), this.colLefts = new Array(this.cols + 1), this.colLefts[0] = 0;
    for (let a = 0; a < this.cols; a++) {
      const c = e.columns.get(a), d = (c != null && c.hidden ? 0 : (r = c == null ? void 0 : c.width) != null ? r : e.defaultColWidth) * t;
      this.colWidths[a] = d, this.colLefts[a + 1] = this.colLefts[a] + d;
    }
    this.rowHeights = new Array(this.rows), this.rowTops = new Array(this.rows + 1), this.rowTops[0] = 0;
    for (let a = 0; a < this.rows; a++) {
      const c = e.rows.get(a), d = (c != null && c.hidden ? 0 : (l = c == null ? void 0 : c.height) != null ? l : e.defaultRowHeight) * t;
      this.rowHeights[a] = d, this.rowTops[a + 1] = this.rowTops[a] + d;
    }
  }
  colWidth(e) {
    return e >= 0 && e < this.cols ? this.colWidths[e] : this.sheet.defaultColWidth * this.zoom;
  }
  rowHeight(e) {
    return e >= 0 && e < this.rows ? this.rowHeights[e] : this.sheet.defaultRowHeight * this.zoom;
  }
  get dcw() {
    return this.sheet.defaultColWidth * this.zoom;
  }
  get drh() {
    return this.sheet.defaultRowHeight * this.zoom;
  }
  /** 第 c 列左边缘(网格坐标，不含表头)。超出数据范围按默认列宽外推(模拟 Excel 无限网格)。 */
  colLeft(e) {
    return e <= 0 ? 0 : e >= this.cols ? this.colLefts[this.cols] + (e - this.cols) * this.dcw : this.colLefts[e];
  }
  rowTop(e) {
    return e <= 0 ? 0 : e >= this.rows ? this.rowTops[this.rows] + (e - this.rows) * this.drh : this.rowTops[e];
  }
  get totalWidth() {
    return this.colLefts[this.cols];
  }
  get totalHeight() {
    return this.rowTops[this.rows];
  }
  /** 含虚拟外推的总宽/高(spacer 尺寸用;= totalWidth + 虚拟列外推) */
  get virtualWidth() {
    return this.colLeft(this.vCols);
  }
  get virtualHeight() {
    return this.rowTop(this.vRows);
  }
  /** 给定网格 x 坐标，返回所在列。超出数据范围按默认列宽外推。 */
  colAt(e) {
    return e >= this.totalWidth ? this.cols + Math.floor((e - this.totalWidth) / this.dcw) : rr(this.colLefts, e, this.cols);
  }
  rowAt(e) {
    return e >= this.totalHeight ? this.rows + Math.floor((e - this.totalHeight) / this.drh) : rr(this.rowTops, e, this.rows);
  }
  /** 数据单元格的可视区列区间(end 夹到虚拟范围 vCols-1,允许滚动出空列;空格 paint 为 no-op) */
  visibleColRange(e, t) {
    const o = this.colAt(e), i = this.colAt(e + t);
    return [Math.min(o, this.vCols - 1), Math.min(i + 1, this.vCols - 1)];
  }
  visibleRowRange(e, t) {
    const o = this.rowAt(e), i = this.rowAt(e + t);
    return [Math.min(o, this.vRows - 1), Math.min(i + 1, this.vRows - 1)];
  }
  /** 网格线/表头的可视区列区间(可超出数据范围，铺满视口，模拟 Excel) */
  gridColRange(e, t) {
    return [Math.max(0, this.colAt(e)), this.colAt(e + t) + 1];
  }
  gridRowRange(e, t) {
    return [Math.max(0, this.rowAt(e)), this.rowAt(e + t) + 1];
  }
}
function rr(n, e, t) {
  if (e <= 0) return 0;
  if (e >= n[t]) return t - 1;
  let o = 0, i = t;
  for (; o < i; ) {
    const s = o + i >> 1;
    n[s] <= e ? o = s + 1 : i = s;
  }
  return Math.max(0, o - 1);
}
function Pe(n) {
  let e = n + 1, t = "";
  for (; e > 0; ) {
    const o = (e - 1) % 26;
    t = String.fromCharCode(65 + o) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
class Ke {
  constructor(e) {
    this.code = e;
  }
}
const ue = {
  div0: () => new Ke("#DIV/0!"),
  na: () => new Ke("#N/A"),
  name: () => new Ke("#NAME?"),
  num: () => new Ke("#NUM!"),
  ref: () => new Ke("#REF!"),
  value: () => new Ke("#VALUE!")
};
function G(n) {
  return n instanceof Ke;
}
function ps(n) {
  return !!n && typeof n == "object" && n.__m === !0;
}
function fe(n) {
  if (ps(n)) {
    const e = n.rows;
    return e.length && e[0].length ? e[0][0] : ue.value();
  }
  return n;
}
function Ze(n) {
  if (ps(n)) {
    const e = [];
    for (const t of n.rows) for (const o of t) e.push(o);
    return e;
  }
  return [n];
}
function xn(n) {
  if (G(n) || typeof n == "number") return n;
  if (typeof n == "boolean") return n ? 1 : 0;
  if (n == null) return 0;
  const e = n.trim();
  if (e === "") return 0;
  const t = Number(e);
  return isNaN(t) ? ue.value() : t;
}
function wn(n) {
  return G(n) ? n : n == null ? "" : typeof n == "boolean" ? n ? "TRUE" : "FALSE" : typeof n == "number" ? gu(n) : n;
}
function Nt(n) {
  if (G(n) || typeof n == "boolean") return n;
  if (typeof n == "number") return n !== 0;
  if (n == null) return !1;
  const e = n.trim().toUpperCase();
  return e === "TRUE" ? !0 : e === "FALSE" || e === "" ? !1 : ue.value();
}
function gu(n) {
  return isFinite(n) ? Number.isInteger(n) ? String(n) : String(Number(n.toPrecision(15))) : "#NUM!";
}
function Ct(n) {
  const e = [];
  for (const t of n) for (const o of Ze(t)) {
    if (G(o)) return o;
    typeof o == "number" && e.push(o);
  }
  return e;
}
function ae(n) {
  return xn(fe(n));
}
function Te(n) {
  return wn(fe(n));
}
function Ra(n) {
  const e = ae(n);
  return G(e) ? e : Math.trunc(e);
}
const mu = (n) => {
  const e = Ct(n);
  return G(e) ? e : e.reduce((t, o) => t + o, 0);
}, bu = (n) => {
  const e = Ct(n);
  return G(e) ? e : e.reduce((t, o) => t * o, 1);
}, yu = (n) => {
  const e = Ct(n);
  return G(e) ? e : e.length ? e.reduce((t, o) => t + o, 0) / e.length : ue.div0();
}, vu = (n) => {
  const e = Ct(n);
  return G(e) ? e : e.length ? Math.max(...e) : 0;
}, xu = (n) => {
  const e = Ct(n);
  return G(e) ? e : e.length ? Math.min(...e) : 0;
}, wu = (n) => Ct(n) instanceof Ke ? Ct(n) : Ct(n).length, ku = (n) => {
  let e = 0;
  for (const t of n) for (const o of Ze(t)) o !== null && o !== "" && e++;
  return e;
}, Su = (n) => {
  let e = 0;
  for (const t of n) for (const o of Ze(t)) (o === null || o === "") && e++;
  return e;
}, Go = (n) => (e) => {
  const t = ae(e[0]);
  if (G(t)) return t;
  const o = e[1] != null ? ae(e[1]) : 0;
  if (G(o)) return o;
  const i = Math.pow(10, o);
  return n(t * i) / i;
}, Cu = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Math.abs(e);
}, Eu = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Math.floor(e);
}, Tu = (n) => {
  const e = ae(n[0]), t = ae(n[1]);
  return G(e) ? e : G(t) ? t : t === 0 ? ue.div0() : e - Math.floor(e / t) * t;
}, Mu = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : e < 0 ? ue.num() : Math.sqrt(e);
}, Iu = (n) => {
  const e = ae(n[0]), t = ae(n[1]);
  return G(e) ? e : G(t) ? t : Math.pow(e, t);
}, $u = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Math.sign(e);
}, Au = (n) => {
  const e = ae(n[0]);
  if (G(e)) return e;
  const t = n[1] != null ? ae(n[1]) : 1;
  return G(t) ? t : t === 0 ? 0 : Math.ceil(e / t) * t;
}, Fu = (n) => {
  const e = ae(n[0]);
  if (G(e)) return e;
  const t = n[1] != null ? ae(n[1]) : 1;
  return G(t) ? t : t === 0 ? ue.div0() : Math.floor(e / t) * t;
}, Ru = (n) => {
  var i, s;
  const e = n.map((r) => Ze(r).map((l) => typeof l == "number" || G(l) ? l : 0)), t = (s = (i = e[0]) == null ? void 0 : i.length) != null ? s : 0;
  let o = 0;
  for (let r = 0; r < t; r++) {
    let l = 1;
    for (const a of e) {
      const c = a[r];
      if (G(c)) return c;
      l *= c;
    }
    o += l;
  }
  return o;
}, Lu = (n) => {
  var t, o;
  const e = Nt(fe(n[0]));
  return G(e) ? e : fe(e ? (t = n[1]) != null ? t : !1 : (o = n[2]) != null ? o : !1);
}, Pu = (n) => {
  var t;
  const e = fe(n[0]);
  return G(e) ? fe((t = n[1]) != null ? t : "") : e;
}, Nu = (n) => {
  var t;
  const e = fe(n[0]);
  return G(e) && e.code === "#N/A" ? fe((t = n[1]) != null ? t : "") : e;
}, Ou = (n) => {
  let e = !0;
  for (const t of n) for (const o of Ze(t)) {
    if (G(o)) return o;
    if (o == null) continue;
    const i = Nt(o);
    if (G(i)) return i;
    e = e && i;
  }
  return e;
}, zu = (n) => {
  let e = !1;
  for (const t of n) for (const o of Ze(t)) {
    if (G(o)) return o;
    if (o == null) continue;
    const i = Nt(o);
    if (G(i)) return i;
    e = e || i;
  }
  return e;
}, Hu = (n) => {
  const e = Nt(fe(n[0]));
  return G(e) ? e : !e;
}, Du = (n) => {
  let e = 0;
  for (const t of n) for (const o of Ze(t)) {
    if (G(o)) return o;
    if (o == null) continue;
    const i = Nt(o);
    if (G(i)) return i;
    i && e++;
  }
  return e % 2 === 1;
}, Bu = (n) => {
  for (let e = 0; e + 1 < n.length; e += 2) {
    const t = Nt(fe(n[e]));
    if (G(t)) return t;
    if (t) return fe(n[e + 1]);
  }
  return ue.na();
}, lr = (n) => {
  let e = "";
  for (const t of n) for (const o of Ze(t)) {
    const i = wn(o);
    if (G(i)) return i;
    e += i;
  }
  return e;
}, Wu = (n) => {
  const e = Te(n[0]);
  return G(e) ? e : e.length;
}, qu = (n) => {
  const e = Te(n[0]);
  if (G(e)) return e;
  const t = n[1] != null ? ae(n[1]) : 1;
  return G(t) ? t : e.slice(0, Math.max(0, t));
}, Uu = (n) => {
  const e = Te(n[0]);
  if (G(e)) return e;
  const t = n[1] != null ? ae(n[1]) : 1;
  return G(t) ? t : t <= 0 ? "" : e.slice(-t);
}, _u = (n) => {
  const e = Te(n[0]);
  if (G(e)) return e;
  const t = ae(n[1]), o = ae(n[2]);
  return G(t) ? t : G(o) ? o : e.substr(Math.max(0, t - 1), Math.max(0, o));
}, ju = (n) => {
  const e = Te(n[0]);
  return G(e) ? e : e.toLowerCase();
}, Vu = (n) => {
  const e = Te(n[0]);
  return G(e) ? e : e.toUpperCase();
}, Yu = (n) => {
  const e = Te(n[0]);
  return G(e) ? e : e.replace(/\s+/g, " ").trim();
}, Gu = (n) => {
  const e = Te(n[0]);
  return G(e) ? e : e.replace(/\b\w/g, (t) => t.toUpperCase()).replace(/\B\w/g, (t) => t.toLowerCase());
}, Xu = (n) => {
  const e = Te(n[0]);
  if (G(e)) return e;
  const t = ae(n[1]);
  return G(t) ? t : t <= 0 ? "" : e.repeat(Math.floor(t));
}, Ku = (n) => {
  const e = Te(n[0]), t = Te(n[1]);
  return G(e) ? e : G(t) ? t : e === t;
}, Ju = (n) => {
  const e = Te(n[0]), t = Te(n[1]), o = Te(n[2]);
  return G(e) ? e : G(t) ? t : G(o) ? o : t === "" ? e : e.split(t).join(o);
}, Zu = (n) => {
  const e = Te(n[0]), t = Te(n[1]);
  if (G(e)) return e;
  if (G(t)) return t;
  const o = n[2] != null ? ae(n[2]) : 1;
  if (G(o)) return o;
  const i = t.indexOf(e, o - 1);
  return i < 0 ? ue.value() : i + 1;
}, Qu = (n) => {
  const e = Te(n[0]), t = Te(n[1]);
  if (G(e)) return e;
  if (G(t)) return t;
  const o = n[2] != null ? ae(n[2]) : 1;
  if (G(o)) return o;
  const i = t.toLowerCase().indexOf(e.toLowerCase(), o - 1);
  return i < 0 ? ue.value() : i + 1;
}, eh = (n) => ae(n[0]), th = (n) => {
  const e = Te(n[0]);
  return G(e), e;
}, oh = (n) => typeof fe(n[0]) == "number", nh = (n) => typeof fe(n[0]) == "string", ih = (n) => fe(n[0]) === null, sh = (n) => typeof fe(n[0]) == "boolean", rh = (n) => G(fe(n[0])), lh = (n) => {
  const e = fe(n[0]);
  return G(e) && e.code === "#N/A";
}, ah = (n) => {
  const e = Ra(n[0]);
  return G(e) ? e : e % 2 === 0;
}, ch = (n) => {
  const e = Ra(n[0]);
  return G(e) ? e : Math.abs(e % 2) === 1;
}, dh = () => ue.na();
function Po(n) {
  return ps(n) ? n.rows : [[n]];
}
const Ln = (n, e) => typeof n == "number" && typeof e == "number" ? n === e : String(n != null ? n : "").toLowerCase() === String(e != null ? e : "").toLowerCase(), uh = (n) => {
  const e = fe(n[0]);
  if (G(e)) return e;
  const t = Po(n[1]), o = ae(n[2]);
  if (G(o)) return o;
  const i = n[3] != null ? Nt(fe(n[3])) : !0;
  if (G(i)) return i;
  if (!i) {
    for (const l of t) if (Ln(e, l[0])) {
      const a = l[o - 1];
      return a === void 0 ? ue.ref() : a;
    }
    return ue.na();
  }
  let s = null;
  for (const l of t) {
    const a = l[0];
    (typeof e == "number" && typeof a == "number" && a <= e || typeof e != "number" && String(a != null ? a : "") <= String(e != null ? e : "")) && (s = l);
  }
  if (!s) return ue.na();
  const r = s[o - 1];
  return r === void 0 ? ue.ref() : r;
}, hh = (n) => {
  var s, r;
  const e = fe(n[0]);
  if (G(e)) return e;
  const t = Po(n[1]), o = ae(n[2]);
  if (G(o)) return o;
  const i = (s = t[0]) != null ? s : [];
  for (let l = 0; l < i.length; l++) if (Ln(e, i[l])) {
    const a = (r = t[o - 1]) == null ? void 0 : r[l];
    return a === void 0 ? ue.ref() : a;
  }
  return ue.na();
}, fh = (n) => {
  var s, r, l, a;
  const e = Po(n[0]), t = n[1] != null ? ae(n[1]) : 0;
  if (G(t)) return t;
  const o = n[2] != null ? ae(n[2]) : 0;
  if (G(o)) return o;
  if (t === 0 && e.length === 1) {
    const c = e[0][o - 1];
    return c === void 0 ? ue.ref() : c;
  }
  if (o === 0 && ((r = (s = e[0]) == null ? void 0 : s.length) != null ? r : 0) === 1) {
    const c = (l = e[t - 1]) == null ? void 0 : l[0];
    return c === void 0 ? ue.ref() : c;
  }
  const i = (a = e[t - 1]) == null ? void 0 : a[o - 1];
  return i === void 0 ? ue.ref() : i;
}, ph = (n) => {
  const e = fe(n[0]);
  if (G(e)) return e;
  const t = Ze(n[1]), o = n[2] != null ? ae(n[2]) : 1;
  if (G(o)) return o;
  if (o === 0) {
    for (let s = 0; s < t.length; s++) if (Ln(e, t[s])) return s + 1;
    return ue.na();
  }
  let i = -1;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    typeof r != "number" || typeof e != "number" || (o === 1 ? r <= e : r >= e) && (i = s);
  }
  return i < 0 ? ue.na() : i + 1;
}, gh = (n) => {
  const e = ae(n[0]);
  if (G(e)) return e;
  const t = n[e];
  return t === void 0 ? ue.value() : fe(t);
}, mh = (n) => Po(n[0]).length, bh = (n) => {
  var e, t;
  return (t = (e = Po(n[0])[0]) == null ? void 0 : e.length) != null ? t : 0;
};
function yh(n) {
  if (typeof n == "string") {
    const e = /^(<=|>=|<>|<|>|=)(.*)$/.exec(n);
    if (e) {
      const t = e[1], o = e[2], i = Number(o), s = o.trim() !== "" && !isNaN(i);
      return (r) => {
        if (s && typeof r == "number")
          switch (t) {
            case "<":
              return r < i;
            case ">":
              return r > i;
            case "<=":
              return r <= i;
            case ">=":
              return r >= i;
            case "<>":
              return r !== i;
            default:
              return r === i;
          }
        const l = String(r != null ? r : "").toLowerCase(), a = o.toLowerCase();
        return t === "<>" ? l !== a : t === "=" ? l === a : !1;
      };
    }
  }
  return (e) => Ln(n, e);
}
function gs(n, e) {
  const t = Ze(n[0]), o = yh(fe(n[1])), i = n[2] != null ? Ze(n[2]) : t;
  let s = 0, r = 0;
  for (let l = 0; l < t.length; l++) {
    if (G(t[l])) return t[l];
    if (!o(t[l])) continue;
    r++;
    const a = i[l];
    typeof a == "number" && (s += a);
  }
  return e === "count" ? r : e === "avg" ? r ? s / r : ue.div0() : s;
}
const vh = (n) => gs(n, "sum"), xh = (n) => gs([n[0], n[1], n[0]], "count"), wh = (n) => gs(n, "avg"), La = Date.UTC(1899, 11, 30), Pa = 864e5;
function Na(n, e, t) {
  return Math.round((Date.UTC(n, e - 1, t) - La) / Pa);
}
function Pn(n) {
  return new Date(La + Math.round(n) * Pa);
}
function Oa() {
  const n = /* @__PURE__ */ new Date();
  return Na(n.getFullYear(), n.getMonth() + 1, n.getDate());
}
const kh = () => Oa(), Sh = () => {
  const n = /* @__PURE__ */ new Date();
  return Oa() + (n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds()) / 86400;
}, Ch = (n) => {
  const e = ae(n[0]), t = ae(n[1]), o = ae(n[2]);
  return G(e) ? e : G(t) ? t : G(o) ? o : Na(e, t, o);
}, Eh = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Pn(e).getUTCFullYear();
}, Th = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Pn(e).getUTCMonth() + 1;
}, Mh = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Pn(e).getUTCDate();
}, Ih = (n) => {
  const e = ae(n[0]);
  return G(e) ? e : Pn(e).getUTCDay() + 1;
}, $h = (n) => {
  const e = ae(n[0]), t = ae(n[1]);
  return G(e) ? e : G(t) ? t : Math.round(e - t);
}, za = {
  SUM: mu,
  PRODUCT: bu,
  AVERAGE: yu,
  MAX: vu,
  MIN: xu,
  COUNT: wu,
  COUNTA: ku,
  COUNTBLANK: Su,
  ROUND: Go(Math.round),
  ROUNDUP: Go((n) => n >= 0 ? Math.ceil(n) : Math.floor(n)),
  ROUNDDOWN: Go(Math.trunc),
  TRUNC: Go(Math.trunc),
  ABS: Cu,
  INT: Eu,
  MOD: Tu,
  SQRT: Mu,
  POWER: Iu,
  SIGN: $u,
  CEILING: Au,
  FLOOR: Fu,
  SUMPRODUCT: Ru,
  IF: Lu,
  IFERROR: Pu,
  IFNA: Nu,
  AND: Ou,
  OR: zu,
  NOT: Hu,
  XOR: Du,
  IFS: Bu,
  CONCAT: lr,
  CONCATENATE: lr,
  LEN: Wu,
  LEFT: qu,
  RIGHT: Uu,
  MID: _u,
  LOWER: ju,
  UPPER: Vu,
  TRIM: Yu,
  PROPER: Gu,
  REPT: Xu,
  EXACT: Ku,
  SUBSTITUTE: Ju,
  FIND: Zu,
  SEARCH: Qu,
  VALUE: eh,
  TEXT: th,
  ISNUMBER: oh,
  ISTEXT: nh,
  ISBLANK: ih,
  ISLOGICAL: sh,
  ISERROR: rh,
  ISNA: lh,
  ISEVEN: ah,
  ISODD: ch,
  NA: dh,
  TRUE: () => !0,
  FALSE: () => !1,
  VLOOKUP: uh,
  HLOOKUP: hh,
  INDEX: fh,
  MATCH: ph,
  CHOOSE: gh,
  ROWS: mh,
  COLUMNS: bh,
  SUMIF: vh,
  COUNTIF: xh,
  AVERAGEIF: wh,
  TODAY: kh,
  NOW: Sh,
  DATE: Ch,
  YEAR: Eh,
  MONTH: Th,
  DAY: Mh,
  WEEKDAY: Ih,
  DAYS: $h
}, Xi = Object.keys(za).sort(), ms = {
  SUM: "SUM(数值1, 数值2, …)",
  AVERAGE: "AVERAGE(数值1, …)",
  COUNT: "COUNT(值1, …)",
  COUNTA: "COUNTA(值1, …)",
  MAX: "MAX(数值1, …)",
  MIN: "MIN(数值1, …)",
  PRODUCT: "PRODUCT(数值1, …)",
  SUMPRODUCT: "SUMPRODUCT(数组1, 数组2, …)",
  IF: "IF(条件, 真值, 假值)",
  IFERROR: "IFERROR(值, 出错时值)",
  IFNA: "IFNA(值, NA时值)",
  IFS: "IFS(条件1, 值1, …)",
  AND: "AND(逻辑1, …)",
  OR: "OR(逻辑1, …)",
  NOT: "NOT(逻辑)",
  ROUND: "ROUND(数值, 位数)",
  ROUNDUP: "ROUNDUP(数值, 位数)",
  ROUNDDOWN: "ROUNDDOWN(数值, 位数)",
  ABS: "ABS(数值)",
  INT: "INT(数值)",
  MOD: "MOD(数值, 除数)",
  SQRT: "SQRT(数值)",
  POWER: "POWER(底, 指数)",
  CEILING: "CEILING(数值, [基数])",
  FLOOR: "FLOOR(数值, [基数])",
  VLOOKUP: "VLOOKUP(查找值, 表区域, 列号, [精确])",
  HLOOKUP: "HLOOKUP(查找值, 表区域, 行号)",
  INDEX: "INDEX(区域, 行号, [列号])",
  MATCH: "MATCH(查找值, 区域, [类型])",
  CHOOSE: "CHOOSE(序号, 值1, …)",
  SUMIF: "SUMIF(区域, 条件, [求和区域])",
  COUNTIF: "COUNTIF(区域, 条件)",
  AVERAGEIF: "AVERAGEIF(区域, 条件, [平均区域])",
  LEFT: "LEFT(文本, [字数])",
  RIGHT: "RIGHT(文本, [字数])",
  MID: "MID(文本, 起始, 字数)",
  LEN: "LEN(文本)",
  CONCAT: "CONCAT(文本1, …)",
  CONCATENATE: "CONCATENATE(文本1, …)",
  UPPER: "UPPER(文本)",
  LOWER: "LOWER(文本)",
  TRIM: "TRIM(文本)",
  SUBSTITUTE: "SUBSTITUTE(文本, 旧, 新)",
  FIND: "FIND(子串, 文本, [起始])",
  SEARCH: "SEARCH(子串, 文本, [起始])",
  DATE: "DATE(年, 月, 日)",
  YEAR: "YEAR(序列值)",
  MONTH: "MONTH(序列值)",
  DAY: "DAY(序列值)",
  TODAY: "TODAY()",
  NOW: "NOW()",
  WEEKDAY: "WEEKDAY(序列值)",
  DAYS: "DAYS(结束, 开始)",
  ISNUMBER: "ISNUMBER(值)",
  ISTEXT: "ISTEXT(值)",
  ISBLANK: "ISBLANK(值)",
  ISERROR: "ISERROR(值)",
  ISNA: "ISNA(值)",
  // 补全其余(插入函数对话框逐参渲染用):
  SIGN: "SIGN(数值)",
  XOR: "XOR(逻辑1, …)",
  VALUE: "VALUE(文本)",
  PROPER: "PROPER(文本)",
  REPT: "REPT(文本, 次数)",
  EXACT: "EXACT(文本1, 文本2)",
  TEXT: "TEXT(值, 格式)",
  ISLOGICAL: "ISLOGICAL(值)",
  ISEVEN: "ISEVEN(数值)",
  ISODD: "ISODD(数值)",
  NA: "NA()",
  TRUE: "TRUE()",
  FALSE: "FALSE()",
  ROWS: "ROWS(数组)",
  COLUMNS: "COLUMNS(数组)",
  COUNTBLANK: "COUNTBLANK(区域)"
}, Pt = [
  { key: "common", name: "常用", fns: ["SUM", "AVERAGE", "COUNT", "IF", "MAX", "MIN", "VLOOKUP", "ROUND", "CONCAT", "TODAY", "LEN", "IFERROR"] },
  { key: "logical", name: "逻辑", fns: ["IF", "IFS", "IFERROR", "IFNA", "AND", "OR", "NOT", "XOR", "TRUE", "FALSE"] },
  { key: "text", name: "文本", fns: ["CONCAT", "CONCATENATE", "TEXT", "LEN", "LEFT", "RIGHT", "MID", "UPPER", "LOWER", "PROPER", "TRIM", "REPT", "EXACT", "SUBSTITUTE", "FIND", "SEARCH", "VALUE"] },
  { key: "datetime", name: "日期与时间", fns: ["TODAY", "NOW", "DATE", "YEAR", "MONTH", "DAY", "WEEKDAY", "DAYS"] },
  { key: "lookup", name: "查找与引用", fns: ["VLOOKUP", "HLOOKUP", "INDEX", "MATCH", "CHOOSE", "ROWS", "COLUMNS"] },
  { key: "math", name: "数学和三角", fns: ["SUM", "PRODUCT", "SUMPRODUCT", "SUMIF", "ROUND", "ROUNDUP", "ROUNDDOWN", "TRUNC", "ABS", "INT", "MOD", "SQRT", "POWER", "SIGN", "CEILING", "FLOOR"] },
  { key: "stat", name: "统计", fns: ["AVERAGE", "AVERAGEIF", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "MAX", "MIN"] },
  { key: "info", name: "信息", fns: ["ISNUMBER", "ISTEXT", "ISBLANK", "ISLOGICAL", "ISERROR", "ISNA", "ISEVEN", "ISODD", "NA"] }
];
Array.from(
  new Set(Pt.filter((n) => n.key !== "common").flatMap((n) => n.fns))
).sort();
function Ah(n) {
  const e = ms[n];
  if (!e) return { args: [{ label: "参数1", optional: !1 }], variadic: !0 };
  const t = e.indexOf("("), o = e.lastIndexOf(")"), i = t >= 0 && o > t ? e.slice(t + 1, o).trim() : "";
  if (!i) return { args: [], variadic: !1 };
  const s = i.split(",").map((a) => a.trim()).filter(Boolean), r = [];
  let l = !1;
  for (const a of s) {
    if (a === "…" || a === "...") {
      l = !0;
      continue;
    }
    const c = a.startsWith("[") && a.endsWith("]");
    r.push({ label: c ? a.slice(1, -1) : a, optional: c });
  }
  return { args: r, variadic: l };
}
function Ao(n) {
  var o;
  const { args: e, variadic: t } = Ah(n);
  return { name: n, signature: (o = ms[n]) != null ? o : `${n}(…)`, args: e, variadic: t };
}
const Fh = rt, Rh = Rn, Lh = {
  cellStyle: "merge",
  fill: "merge",
  rowHeight: "keep",
  colWidth: "keep",
  sourceMerges: "skip",
  targetMerges: "keep",
  images: "skip"
}, J = (n) => Ma[n], z = (n) => R({ kind: "builtin" }, n), Ph = ["宋体", "微软雅黑", "黑体", "楷体", "Arial", "Calibri", "Times New Roman", "Consolas"], Nh = [9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36], Oh = /* @__PURE__ */ new Set([
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
]), ar = {
  normal: { top: 19, bottom: 19, left: 18, right: 18, header: 8, footer: 8 },
  narrow: { top: 19, bottom: 19, left: 6, right: 6, header: 8, footer: 8 },
  wide: { top: 25, bottom: 25, left: 25, right: 25, header: 13, footer: 13 }
}, qt = (n) => ({ font: { bold: !0, color: "#ffffff" }, fill: { type: "solid", fgColor: n } }), zh = [
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
    ["强调 1", "accent1", qt("#4472c4")],
    ["强调 2", "accent2", qt("#ed7d31")],
    ["强调 3", "accent3", qt("#a5a5a5")],
    ["强调 4", "accent4", qt("#ffc000")],
    ["强调 5", "accent5", qt("#5b9bd5")],
    ["强调 6", "accent6", qt("#70ad47")]
  ]],
  ["数字格式", [
    ["货币", "cur", { numFmt: "¥#,##0.00" }],
    ["货币[0]", "cur0", { numFmt: "¥#,##0" }],
    ["百分比", "pct", { numFmt: "0.00%" }],
    ["千位分隔", "comma", { numFmt: "#,##0.00" }],
    ["千位分隔[0]", "comma0", { numFmt: "#,##0" }]
  ]]
], Hh = [["light", "浅色"], ["medium", "中等深浅"], ["dark", "深色"]], Dh = [
  ["blue", "蓝色", "#2b6cb0"],
  ["green", "绿色", "#217346"],
  ["orange", "橙色", "#c05621"],
  ["red", "红色", "#b42318"],
  ["purple", "紫色", "#7030a0"],
  ["teal", "青色", "#0e7c86"],
  ["gray", "灰色", "#6b7280"]
], cr = [
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
function dr(n) {
  const e = n.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(e)) return e[0] === "#" ? e : "#" + e;
  if (/^#?[0-9a-fA-F]{3}$/.test(e)) {
    const t = e.replace("#", "");
    return "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2];
  }
  return e;
}
function Bh(n, e) {
  var l, a, c, d, u, h, p, m, b, v, y, w, S, k, C, M, E, P, I, L, F, N, O, D, W, H, V, Y, ee, ce, le, ge, se, de;
  if (!Oh.has(n)) return null;
  const t = e.controller, o = !e.editable || !e.hasSelection, i = !e.editable, s = t == null ? void 0 : t.getSelectionFontState(), r = t == null ? void 0 : t.getSelectionAlignState();
  switch (n) {
    case "paste":
      return z({
        id: n,
        iconSvg: J("paste"),
        label: "粘贴",
        title: "粘贴(点=默认;▾ 选择性粘贴)",
        disabled: i,
        onClick: () => void (t == null ? void 0 : t.pasteFromClipboard()),
        items: [
          z({ id: "paste-all", label: "粘贴(全部)", title: "覆盖式 1:1(贴近源)", onClick: () => void (t == null ? void 0 : t.pasteFromClipboard(Fh)) }),
          z({ id: "paste-values", label: "仅值", title: "只落值,样式/结构不动", onClick: () => void (t == null ? void 0 : t.pasteFromClipboard(Rh)) }),
          z({ id: "paste-vf", label: "值和格式", title: "合并式:源没写的保留目标", onClick: () => void (t == null ? void 0 : t.pasteFromClipboard(Lh)) }),
          z({ id: "paste-sep", type: "separator" }),
          z({ id: "paste-cfg", label: "粘贴行为…", title: "打开粘贴行为配置", onClick: () => t == null ? void 0 : t.openPasteConfigDialog() })
        ]
      });
    case "cut":
      return z({ id: n, iconSvg: J("cut"), label: "剪切", title: "剪切 (Ctrl+X)", disabled: o, onClick: () => void (t == null ? void 0 : t.cutSelection()) });
    case "clear-format":
      return z({ id: n, iconSvg: J("clear-format"), label: "清除格式", title: "清除选区格式(不删值)", disabled: o, onClick: () => t == null ? void 0 : t.clearSelectionFormat() });
    case "bold":
      return z({ id: n, iconSvg: J("bold"), label: "加粗", title: "加粗 (选区)", active: !!(s != null && s.bold), disabled: o, onClick: () => t == null ? void 0 : t.toggleSelectionFont("bold") });
    case "italic":
      return z({ id: n, iconSvg: J("italic"), label: "斜体", title: "斜体 (选区)", active: !!(s != null && s.italic), disabled: o, onClick: () => t == null ? void 0 : t.toggleSelectionFont("italic") });
    case "underline":
      return z({
        id: n,
        iconSvg: J("underline"),
        label: "下划线",
        title: "下划线(点=单;▾ 双下划线)",
        active: !!(s != null && s.underline),
        disabled: o,
        onClick: () => t == null ? void 0 : t.toggleSelectionFont("underline"),
        items: [
          z({ id: "ul-single", label: "单下划线", active: !!(s != null && s.underline) && (s == null ? void 0 : s.underlineStyle) !== "double", onClick: () => t == null ? void 0 : t.setSelectionUnderline("single") }),
          z({ id: "ul-double", label: "双下划线", active: (s == null ? void 0 : s.underlineStyle) === "double", onClick: () => t == null ? void 0 : t.setSelectionUnderline("double") }),
          z({ id: "ul-sep", type: "separator" }),
          z({ id: "ul-none", label: "无下划线", onClick: () => t == null ? void 0 : t.setSelectionUnderline("none") })
        ]
      });
    case "strike":
      return z({ id: n, iconSvg: J("strike"), label: "删除线", title: "删除线 (选区)", disabled: o, onClick: () => t == null ? void 0 : t.toggleSelectionFont("strike") });
    case "font-grow":
      return z({ id: n, iconSvg: J("font-grow"), label: "增大字号", title: "增大字号", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionFontSize(1) });
    case "font-shrink":
      return z({ id: n, iconSvg: J("font-shrink"), label: "减小字号", title: "减小字号", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionFontSize(-1) });
    case "fill-color":
      return z({
        id: n,
        iconSvg: J("fill-color"),
        label: "填充色",
        title: "填充色",
        disabled: o,
        items: [
          z({ id: "fill-none", label: "无填充", onClick: () => t == null ? void 0 : t.setSelectionFill(null) }),
          ...cr.map(([q, Z]) => z({ id: "fill-" + q, label: Z, swatch: q, onClick: () => t == null ? void 0 : t.setSelectionFill(q) })),
          z({ id: "fill-sep", type: "separator" }),
          z({ id: "fill-custom", input: { placeholder: "其他颜色 #RRGGBB", onCommit: (q) => {
            const Z = dr(q);
            Z && (t == null || t.setSelectionFill(Z));
          } } })
        ]
      });
    case "font-color":
      return z({
        id: n,
        iconSvg: J("font-color"),
        label: "字体颜色",
        title: "字体颜色",
        disabled: o,
        items: [
          ...cr.map(([q, Z]) => z({ id: "fc-" + q, label: Z, swatch: q, onClick: () => t == null ? void 0 : t.setSelectionFontColor(q) })),
          z({ id: "fc-sep", type: "separator" }),
          z({ id: "fc-custom", input: { placeholder: "其他颜色 #RRGGBB", onCommit: (q) => {
            const Z = dr(q);
            Z && (t == null || t.setSelectionFontColor(Z));
          } } })
        ]
      });
    case "align-top":
      return z({ id: n, iconSvg: J("align-top"), label: "顶端对齐", title: "顶端对齐", active: (r == null ? void 0 : r.vAlign) === "top", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionVAlign("top") });
    case "align-middle":
      return z({ id: n, iconSvg: J("align-vmiddle"), label: "垂直居中", title: "垂直居中", active: (r == null ? void 0 : r.vAlign) === "middle", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionVAlign("middle") });
    case "align-bottom":
      return z({ id: n, iconSvg: J("align-bottom"), label: "底端对齐", title: "底端对齐", active: (r == null ? void 0 : r.vAlign) === "bottom", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionVAlign("bottom") });
    case "percent":
      return z({ id: n, iconSvg: J("percent"), label: "百分比", title: "百分比样式 (0%)", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionNumberFormat("0%") });
    case "comma":
      return z({ id: n, iconSvg: J("comma"), label: "千分位", title: "千分位样式 (#,##0.00)", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionNumberFormat("#,##0.00") });
    case "currency":
      return z({ id: n, iconSvg: J("currency"), label: "货币", title: "货币样式 (¥#,##0.00)", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionNumberFormat("¥#,##0.00") });
    case "decimal-inc":
      return z({ id: n, iconSvg: J("decimal-inc"), label: "增加小数位", title: "增加小数位", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionDecimals(1) });
    case "decimal-dec":
      return z({ id: n, iconSvg: J("decimal-dec"), label: "减少小数位", title: "减少小数位", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionDecimals(-1) });
    case "autosum":
      return z({
        id: n,
        iconSvg: J("autosum"),
        label: "求和",
        title: "自动求和(点=SUM;▾ 选其它)",
        disabled: o,
        onClick: () => t == null ? void 0 : t.autoSumSelection("sum"),
        items: [
          z({ id: "sum-sum", label: "求和", onClick: () => t == null ? void 0 : t.autoSumSelection("sum") }),
          z({ id: "sum-avg", label: "平均值", onClick: () => t == null ? void 0 : t.autoSumSelection("average") }),
          z({ id: "sum-count", label: "计数", onClick: () => t == null ? void 0 : t.autoSumSelection("count") }),
          z({ id: "sum-max", label: "最大值", onClick: () => t == null ? void 0 : t.autoSumSelection("max") }),
          z({ id: "sum-min", label: "最小值", onClick: () => t == null ? void 0 : t.autoSumSelection("min") })
        ]
      });
    // ---- 公式选项卡:函数库(点函数 → 插入函数对话框)----
    case "fn-insert":
      return z({ id: n, iconSvg: J("fx"), label: "插入函数", title: "插入函数(选函数 + 逐参填写 + 结果预览)", disabled: i, onClick: () => t == null ? void 0 : t.openInsertFunctionDialog() });
    case "fn-common":
    case "fn-logical":
    case "fn-text":
    case "fn-datetime":
    case "fn-lookup":
    case "fn-math": {
      const q = n.slice(3), Z = Pt.find((te) => te.key === q);
      return z({
        id: n,
        iconSvg: J("function"),
        label: (l = Z == null ? void 0 : Z.name) != null ? l : n,
        title: `${(a = Z == null ? void 0 : Z.name) != null ? a : ""} 函数`,
        disabled: i,
        items: ((c = Z == null ? void 0 : Z.fns) != null ? c : []).map((te) => z({ id: `${q}-${te}`, label: te, title: Ao(te).signature, onClick: () => t == null ? void 0 : t.openInsertFunctionDialog(te) }))
      });
    }
    case "fn-more": {
      const q = Pt.find((te) => te.key === "stat"), Z = Pt.find((te) => te.key === "info");
      return z({
        id: n,
        iconSvg: J("function"),
        label: "其他函数",
        title: "统计 / 信息 函数",
        disabled: i,
        items: [
          z({ id: "more-hdr-stat", label: "统计", disabled: !0 }),
          ...((d = q == null ? void 0 : q.fns) != null ? d : []).map((te) => z({ id: `stat-${te}`, label: te, title: Ao(te).signature, onClick: () => t == null ? void 0 : t.openInsertFunctionDialog(te) })),
          z({ id: "more-sep", type: "separator" }),
          z({ id: "more-hdr-info", label: "信息", disabled: !0 }),
          ...((u = Z == null ? void 0 : Z.fns) != null ? u : []).map((te) => z({ id: `info-${te}`, label: te, title: Ao(te).signature, onClick: () => t == null ? void 0 : t.openInsertFunctionDialog(te) }))
        ]
      });
    }
    // ---- 公式选项卡:计算 ----
    case "calc-options": {
      const q = (h = t == null ? void 0 : t.getCalcMode()) != null ? h : "auto";
      return z({
        id: n,
        iconSvg: J("calc-options"),
        label: "计算选项",
        title: "自动 / 手动 计算",
        disabled: i,
        showLabel: !0,
        items: [
          z({ id: "calc-auto", label: "自动", active: q === "auto", onClick: () => t == null ? void 0 : t.setCalcMode("auto") }),
          z({ id: "calc-manual", label: "手动(编辑后需手动重算)", active: q === "manual", onClick: () => t == null ? void 0 : t.setCalcMode("manual") })
        ]
      });
    }
    case "recalc-workbook":
      return z({ id: n, iconSvg: J("recalc"), label: "重算工作簿", title: "重算所有公式(需开启公式重算)", disabled: i, showLabel: !0, onClick: () => t == null ? void 0 : t.recalcAll() });
    case "recalc-sheet":
      return z({ id: n, iconSvg: J("recalc"), label: "计算工作表", title: "只重算当前工作表", disabled: i, showLabel: !0, onClick: () => t == null ? void 0 : t.recalcActiveSheet() });
    // ---- 数据选项卡 ----
    case "reapply":
      return z({ id: n, iconSvg: J("reapply"), label: "重新应用", title: "重新应用当前筛选", showLabel: !0, disabled: !((p = t == null ? void 0 : t.hasFilters) != null && p.call(t)), onClick: () => t == null ? void 0 : t.reapplyFilters() });
    case "data-validation":
      return z({ id: n, iconSvg: J("data-validation"), label: "有效性", title: "数据有效性(建/改验证规则)", disabled: i, onClick: () => t == null ? void 0 : t.openDataValidationDialog() });
    case "dropdown-list":
      return z({ id: n, iconSvg: J("dropdown-list"), label: "下拉列表", title: "设置下拉列表(列表型数据有效性)", disabled: i, onClick: () => t == null ? void 0 : t.openDataValidationDialog("list") });
    case "remove-duplicates":
      return z({ id: n, iconSvg: J("remove-duplicates"), label: "重复项", title: "删除重复项", disabled: o, onClick: () => t == null ? void 0 : t.openRemoveDuplicatesDialog() });
    case "text-to-columns":
      return z({ id: n, iconSvg: J("text-to-columns"), label: "分列", title: "文本分列(按分隔符拆当前列)", disabled: o, onClick: () => t == null ? void 0 : t.openTextToColumnsDialog() });
    case "freeze": {
      const q = (m = t == null ? void 0 : t.getFreezeState) == null ? void 0 : m.call(t), Z = !!(q && (q.frozenRows || q.frozenCols)), te = (b = t == null ? void 0 : t.getActiveCell) == null ? void 0 : b.call(t), oe = (v = te == null ? void 0 : te.row) != null ? v : 0, ne = (y = te == null ? void 0 : te.col) != null ? y : 0, ye = `第${oe}行`, $e = `第${Pe(Math.max(0, ne - 1))}列`, et = oe > 0 && ne > 0 ? `冻结至第${oe}行${Pe(ne - 1)}列` : oe > 0 ? `冻结至${ye}` : ne > 0 ? `冻结至${$e}` : "冻结至活动格", Ae = (It) => ({
        onHover: () => t == null ? void 0 : t.previewFreezeMode(It),
        onHoverEnd: () => t == null ? void 0 : t.clearFreezePreview()
      });
      return z({
        id: n,
        iconSvg: J("freeze"),
        label: "冻结",
        title: "冻结窗格(WPS 冻结 ▾)",
        active: Z,
        items: [
          z(R({ id: "fz-panes", label: et, title: "冻结活动格上方所有行 + 左侧所有列", disabled: oe === 0 && ne === 0, onClick: () => t == null ? void 0 : t.freezePanes("active") }, Ae("active"))),
          z(R({ id: "fz-active-row", label: `冻结至${ye}`, title: "只冻结活动格上方的行", disabled: oe === 0, onClick: () => t == null ? void 0 : t.freezePanes("activeRow") }, Ae("activeRow"))),
          z(R({ id: "fz-active-col", label: `冻结至${$e}`, title: "只冻结活动格左侧的列", disabled: ne === 0, onClick: () => t == null ? void 0 : t.freezePanes("activeCol") }, Ae("activeCol"))),
          z(R({ id: "fz-header", label: "冻结表头", title: "智能识别表头行并冻结(含上方标题行)", onClick: () => t == null ? void 0 : t.freezePanes("header") }, Ae("header"))),
          z(R({ id: "fz-row", label: "冻结首行", onClick: () => t == null ? void 0 : t.freezePanes("firstRow") }, Ae("firstRow"))),
          z(R({ id: "fz-col", label: "冻结首列", onClick: () => t == null ? void 0 : t.freezePanes("firstCol") }, Ae("firstCol"))),
          ...Z ? [z({ id: "fz-sep", type: "separator" }), z({ id: "fz-none", label: "取消冻结", onClick: () => t == null ? void 0 : t.freezePanes("none") })] : []
        ]
      });
    }
    case "clear":
      return z({
        id: n,
        iconSvg: J("clear-format"),
        label: "清除",
        title: "清除(全部/格式/内容/批注)",
        disabled: o,
        items: [
          z({ id: "clr-all", label: "全部清除", onClick: () => t == null ? void 0 : t.clearSelectionCells("all") }),
          z({ id: "clr-fmt", label: "清除格式", onClick: () => t == null ? void 0 : t.clearSelectionCells("formats") }),
          z({ id: "clr-content", label: "清除内容", onClick: () => t == null ? void 0 : t.clearSelectionCells("content") }),
          z({ id: "clr-comment", label: "清除批注", onClick: () => t == null ? void 0 : t.clearSelectionCells("comments") })
        ]
      });
    case "print-preview":
      return z({ id: n, iconSvg: J("print-preview"), label: "打印预览", title: "打印预览(分页 + 打印)", onClick: () => void (t == null ? void 0 : t.openPrintPreview()) });
    case "page-setup":
      return z({ id: n, iconSvg: J("page-setup"), label: "页面设置", title: "方向/纸张/缩放/页边距/打印区域/打印标题", disabled: i, onClick: () => t == null ? void 0 : t.openPageSetupDialog() });
    case "page-margins": {
      const q = (w = t == null ? void 0 : t.getPageSetup()) == null ? void 0 : w.margins, Z = (oe) => {
        const ne = ar[oe];
        return !!q && q.top === ne.top && q.bottom === ne.bottom && q.left === ne.left && q.right === ne.right;
      }, te = (oe) => {
        var ne;
        return t == null ? void 0 : t.setPageSetup(K(R({}, (ne = t == null ? void 0 : t.getPageSetup()) != null ? ne : {}), { margins: R({}, ar[oe]) }));
      };
      return z({
        id: n,
        iconSvg: J("page-margins"),
        label: "页边距",
        title: "页边距(预设 / 自定义)",
        disabled: i,
        items: [
          z({ id: "mg-normal", label: "普通", title: "上下19 左右18 页眉页脚8 (mm)", active: Z("normal"), onClick: () => te("normal") }),
          z({ id: "mg-narrow", label: "窄", title: "左右6 (mm)", active: Z("narrow"), onClick: () => te("narrow") }),
          z({ id: "mg-wide", label: "宽", title: "四周25 (mm)", active: Z("wide"), onClick: () => te("wide") }),
          z({ id: "mg-sep", type: "separator" }),
          z({ id: "mg-custom", label: "自定义页边距…", onClick: () => t == null ? void 0 : t.openPageSetupDialog() })
        ]
      });
    }
    case "page-orientation": {
      const q = (k = (S = t == null ? void 0 : t.getPageSetup()) == null ? void 0 : S.orientation) != null ? k : "portrait", Z = (te) => {
        var oe;
        return t == null ? void 0 : t.setPageSetup(K(R({}, (oe = t == null ? void 0 : t.getPageSetup()) != null ? oe : {}), { orientation: te }));
      };
      return z({
        id: n,
        iconSvg: J("page-orientation"),
        label: "纸张方向",
        title: "纸张方向",
        disabled: i,
        items: [
          z({ id: "ori-portrait", label: "纵向", active: q !== "landscape", onClick: () => Z("portrait") }),
          z({ id: "ori-landscape", label: "横向", active: q === "landscape", onClick: () => Z("landscape") })
        ]
      });
    }
    case "paper-size": {
      const q = (C = t == null ? void 0 : t.getPageSetup()) == null ? void 0 : C.paperFormat, Z = Array.isArray(q) ? "" : q != null ? q : "a4", te = (oe) => {
        var ne;
        return t == null ? void 0 : t.setPageSetup(K(R({}, (ne = t == null ? void 0 : t.getPageSetup()) != null ? ne : {}), { paperFormat: oe }));
      };
      return z({
        id: n,
        iconSvg: J("paper-size"),
        label: "纸张大小",
        title: "纸张大小",
        disabled: i,
        items: [
          z({ id: "ps-a4", label: "A4", active: Z === "a4", onClick: () => te("a4") }),
          z({ id: "ps-a3", label: "A3", active: Z === "a3", onClick: () => te("a3") }),
          z({ id: "ps-letter", label: "Letter", active: Z === "letter", onClick: () => te("letter") })
        ]
      });
    }
    case "print-scale": {
      const q = (M = t == null ? void 0 : t.getPageSetup()) != null ? M : {}, Z = (te) => {
        var oe;
        return t == null ? void 0 : t.setPageSetup(R(R({}, (oe = t == null ? void 0 : t.getPageSetup()) != null ? oe : {}), te));
      };
      return z({
        id: n,
        iconSvg: J("print-scale"),
        label: "打印缩放",
        title: "打印缩放",
        disabled: i,
        items: [
          z({ id: "sc-100", label: "无缩放(100%)", active: !q.fitToPage && ((E = q.scale) != null ? E : 100) === 100, onClick: () => Z({ fitToPage: !1, scale: 100 }) }),
          z({ id: "sc-fit", label: "将整个工作表打印在一页", active: !!q.fitToPage, onClick: () => Z({ fitToPage: !0 }) }),
          z({ id: "sc-sep", type: "separator" }),
          z({ id: "sc-custom", label: "自定义缩放…", onClick: () => t == null ? void 0 : t.openPageSetupDialog() })
        ]
      });
    }
    case "print-titles":
      return z({ id: n, iconSvg: J("print-titles"), label: "打印标题", title: "设置顶端标题行 / 左侧标题列(每页重复)", disabled: i, onClick: () => t == null ? void 0 : t.openPageSetupDialog() });
    case "print-gridlines": {
      const q = !!((P = t == null ? void 0 : t.getPageSetup()) != null && P.printGridLines);
      return z({ id: n, iconSvg: J("print-gridlines"), label: "打印网格线", title: "打印/导出时输出网格线", active: q, showLabel: !0, disabled: i, onClick: () => {
        var Z;
        return t == null ? void 0 : t.setPageSetup(K(R({}, (Z = t == null ? void 0 : t.getPageSetup()) != null ? Z : {}), { printGridLines: !q }));
      } });
    }
    case "print-headings": {
      const q = !!((I = t == null ? void 0 : t.getPageSetup()) != null && I.printHeadings);
      return z({ id: n, iconSvg: J("print-headings"), label: "打印行号列标", title: "打印时输出行号与列标(.xlsx 往返;我方 PDF/打印底图暂不画头)", active: q, showLabel: !0, disabled: i, onClick: () => {
        var Z;
        return t == null ? void 0 : t.setPageSetup(K(R({}, (Z = t == null ? void 0 : t.getPageSetup()) != null ? Z : {}), { printHeadings: !q }));
      } });
    }
    case "print-area":
      return z({
        id: n,
        iconSvg: J("print-area"),
        label: "打印区域",
        title: "设置打印区域",
        disabled: i,
        items: [
          z({ id: "pa-set", label: "设为打印区域(选区)", disabled: !e.hasSelection, onClick: () => t == null ? void 0 : t.setPrintAreaFromSelection() }),
          z({ id: "pa-clr", label: "取消打印区域", onClick: () => {
            var q;
            return t == null ? void 0 : t.setPageSetup(K(R({}, (q = t == null ? void 0 : t.getPageSetup()) != null ? q : {}), { printArea: void 0 }));
          } })
        ]
      });
    case "page-breaks":
      return z({
        id: n,
        iconSvg: J("page-breaks"),
        label: "分页符",
        title: "插入/删除分页符(在活动单元格)",
        disabled: i,
        items: [
          z({ id: "pb-row", label: "插入/删除 行分页符", onClick: () => t == null ? void 0 : t.togglePageBreakAt("row") }),
          z({ id: "pb-col", label: "插入/删除 列分页符", onClick: () => t == null ? void 0 : t.togglePageBreakAt("col") }),
          z({ id: "pb-sep", type: "separator" }),
          z({ id: "pb-clr", label: "全部清除", onClick: () => t == null ? void 0 : t.clearPageBreaks() })
        ]
      });
    case "background":
      return z({ id: n, iconSvg: J("background"), label: "背景图片", title: "工作表背景图片 / 文字水印", disabled: i, onClick: () => t == null ? void 0 : t.openBackgroundDialog() });
    case "comment":
      return z({ id: n, iconSvg: J("comment"), label: "批注", title: "插入/编辑批注(活动格)", disabled: i, onClick: () => t == null ? void 0 : t.openCommentEditor() });
    // ---- 审阅选项卡:批注 ----
    case "comment-new":
      return z({ id: n, iconSvg: J("comment-new"), label: "新建批注", title: "在活动格新建/编辑批注", disabled: i, onClick: () => t == null ? void 0 : t.openCommentEditor() });
    case "comment-delete":
      return z({ id: n, iconSvg: J("comment-delete"), label: "删除批注", title: "删除活动格批注", disabled: i || !((L = t == null ? void 0 : t.activeHasComment) != null && L.call(t)), onClick: () => t == null ? void 0 : t.deleteActiveComment() });
    case "comment-prev":
      return z({ id: n, iconSvg: J("comment-prev"), label: "上一条", title: "上一条批注", disabled: !((F = t == null ? void 0 : t.hasAnyComment) != null && F.call(t)), onClick: () => t == null ? void 0 : t.gotoComment(-1) });
    case "comment-next":
      return z({ id: n, iconSvg: J("comment-next"), label: "下一条", title: "下一条批注", disabled: !((N = t == null ? void 0 : t.hasAnyComment) != null && N.call(t)), onClick: () => t == null ? void 0 : t.gotoComment(1) });
    case "comment-show":
      return z({ id: n, iconSvg: J("comment-show"), label: "显示", title: "显示/隐藏所有批注", active: !!((O = t == null ? void 0 : t.isShowAllComments) != null && O.call(t)), onClick: () => t == null ? void 0 : t.toggleShowAllComments() });
    // ---- 审阅选项卡:保护 ----
    case "cell-lock":
      return z({ id: n, iconSvg: J("cell-lock"), label: "锁定单元格", title: "锁定/解锁选区(仅在保护工作表时生效)", disabled: i, active: !!((D = t == null ? void 0 : t.isSelectionLocked) != null && D.call(t)), onClick: () => t == null ? void 0 : t.toggleCellLock() });
    case "allow-edit-ranges":
      return z({ id: n, iconSvg: J("allow-edit-ranges"), label: "允许编辑区域", title: "设置保护时仍可编辑的区域", disabled: i, onClick: () => t == null ? void 0 : t.openAllowEditRangesDialog() });
    case "protect-sheet":
      return z({ id: n, iconSvg: J("protect-sheet"), label: "保护工作表", title: "保护 / 撤销保护当前工作表", disabled: i, active: !!((W = t == null ? void 0 : t.isSheetProtected) != null && W.call(t)), onClick: () => t == null ? void 0 : t.openProtectSheetDialog() });
    case "protect-workbook":
      return z({ id: n, iconSvg: J("protect-workbook"), label: "保护工作簿", title: "保护 / 撤销保护工作簿结构", disabled: i, active: !!((H = t == null ? void 0 : t.isWorkbookProtected) != null && H.call(t)), onClick: () => t == null ? void 0 : t.openProtectWorkbookDialog() });
    case "share-workbook":
      return z({ id: n, iconSvg: J("share-workbook"), label: "共享工作簿", title: "该特性已被官方弃用", onClick: () => t == null ? void 0 : t.shareWorkbookNotice() });
    // ---- 视图选项卡:显示开关(WPS 复选样式;active 反映开/关)----
    case "view-formula-bar":
      return z({ id: n, iconSvg: J("view-formula-bar"), label: "编辑栏", title: "显示/隐藏编辑栏", showLabel: !0, active: (Y = (V = t == null ? void 0 : t.isFormulaBarVisible) == null ? void 0 : V.call(t)) != null ? Y : !0, onClick: () => t == null ? void 0 : t.toggleFormulaBar() });
    case "view-headers":
      return z({ id: n, iconSvg: J("view-headers"), label: "行号列标", title: "显示/隐藏行号列标", showLabel: !0, active: (ce = (ee = t == null ? void 0 : t.areHeadersVisible) == null ? void 0 : ee.call(t)) != null ? ce : !0, onClick: () => t == null ? void 0 : t.toggleHeaders() });
    case "view-gridlines":
      return z({ id: n, iconSvg: J("view-gridlines"), label: "网格线", title: "显示/隐藏网格线", showLabel: !0, active: (ge = (le = t == null ? void 0 : t.isGridLinesVisible) == null ? void 0 : le.call(t)) != null ? ge : !0, onClick: () => t == null ? void 0 : t.toggleGridLines() });
    case "view-taskpane":
      return z({ id: n, iconSvg: J("view-taskpane"), label: "任务窗格", title: "显示/隐藏任务窗格", showLabel: !0, active: !!((se = t == null ? void 0 : t.isTaskPaneOpen) != null && se.call(t)), onClick: () => t == null ? void 0 : t.toggleTaskPane() });
    case "fill":
      return z({
        id: n,
        iconSvg: J("fill"),
        label: "填充",
        title: "填充(值+格式;公式自动改相对引用)",
        disabled: o,
        items: [
          z({ id: "fill-down", label: "向下填充", title: "向下填充 (Ctrl+D)", onClick: () => t == null ? void 0 : t.fillSelection("down") }),
          z({ id: "fill-right", label: "向右填充", title: "向右填充 (Ctrl+R)", onClick: () => t == null ? void 0 : t.fillSelection("right") }),
          z({ id: "fill-up", label: "向上填充", onClick: () => t == null ? void 0 : t.fillSelection("up") }),
          z({ id: "fill-left", label: "向左填充", onClick: () => t == null ? void 0 : t.fillSelection("left") }),
          z({ id: "fill-sep1", type: "separator" }),
          z({ id: "fill-series", label: "序列…", title: "等差/等比/日期序列", onClick: () => t == null ? void 0 : t.openFillSeriesDialog() }),
          z({ id: "fill-sep2", type: "separator" }),
          z({ id: "fill-fmt", label: "仅填充格式(向下)", onClick: () => t == null ? void 0 : t.fillSelection("down", "formats") }),
          z({ id: "fill-noval", label: "不带格式填充(向下)", onClick: () => t == null ? void 0 : t.fillSelection("down", "values") })
        ]
      });
    case "flash-fill":
      return z({ id: n, iconSvg: J("flash-fill"), label: "快速填充", title: "快速填充(Ctrl+E:按样例推断左侧源列变换)", disabled: o, onClick: () => t == null ? void 0 : t.flashFill() });
    case "image": {
      const q = (de = t == null ? void 0 : t.getImageInsertMode()) != null ? de : "float";
      return z({
        id: n,
        iconSvg: J("image"),
        label: "图片",
        title: "插入图片(浮动式 / 嵌入到单元格)",
        disabled: i,
        onClick: () => void (t == null ? void 0 : t.openImagePicker(q)),
        // 点主按钮 = 本地图片(当前模式)
        items: [
          z({ id: "img-mode-float", label: "浮动式图片", active: q === "float", keepOpen: !0, onClick: () => t == null ? void 0 : t.setImageInsertMode("float") }),
          z({ id: "img-mode-cell", label: "嵌入到单元格", active: q === "cell", keepOpen: !0, onClick: () => t == null ? void 0 : t.setImageInsertMode("cell") }),
          z({ id: "img-msep", type: "separator" }),
          z({ id: "img-local", label: "本地图片(P)", onClick: () => void (t == null ? void 0 : t.openImagePicker(q)) }),
          z({ id: "img-batch", label: "批量插图(B)", onClick: () => void (t == null ? void 0 : t.openImagePicker(q, { multiple: !0 })) }),
          z({ id: "img-psep", type: "separator" }),
          z({ id: "img-phone", label: "手机图片/拍照", disabled: !0 })
        ]
      });
    }
    case "cell-styles":
      return z({
        id: n,
        iconSvg: J("cell-styles"),
        label: "单元格样式",
        title: "套用单元格样式画廊",
        disabled: o,
        items: zh.flatMap(([q, Z], te) => [
          ...te > 0 ? [z({ id: "csg-sep-" + te, type: "separator" })] : [],
          z({ id: "csg-hdr-" + te, label: q, disabled: !0 }),
          ...Z.map(([oe, ne, ye]) => z({ id: "cs-" + ne, label: oe, onClick: () => t == null ? void 0 : t.applySelectionStyle(ye) }))
        ])
      });
    case "table-styles":
      return z({
        id: n,
        iconSvg: J("table-styles"),
        label: "表格样式",
        title: "套用表格样式画廊(表头+隔行+边框)",
        disabled: o,
        items: Hh.flatMap(([q, Z], te) => [
          ...te > 0 ? [z({ id: "tsg-sep-" + te, type: "separator" })] : [],
          z({ id: "tsg-hdr-" + q, label: Z, disabled: !0 }),
          ...Dh.map(([oe, ne, ye]) => z({ id: `ts-${oe}-${q}`, label: ne, swatch: ye, onClick: () => t == null ? void 0 : t.applyTableStyle(`${oe}-${q}`) }))
        ])
      });
    case "convert":
      return z({
        id: n,
        iconSvg: J("convert"),
        label: "转换",
        title: "文本 ↔ 数值 转换",
        disabled: o,
        items: [
          z({ id: "cv-t2n", label: "文本 → 数值", onClick: () => t == null ? void 0 : t.convertSelection("text-to-number") }),
          z({ id: "cv-n2t", label: "数值 → 文本", onClick: () => t == null ? void 0 : t.convertSelection("number-to-text") })
        ]
      });
    case "font-name":
      return z({
        id: n,
        iconSvg: J("font"),
        label: (s == null ? void 0 : s.name) || "字体",
        title: "字体",
        disabled: o,
        items: [
          z({ id: "font-input", input: { placeholder: "字体名", value: s == null ? void 0 : s.name, onCommit: (q) => {
            q.trim() && (t == null || t.setSelectionFontName(q.trim()));
          } } }),
          z({ id: "font-isep", type: "separator" }),
          ...Ph.map((q) => z({ id: "font-" + q, label: q, active: (s == null ? void 0 : s.name) === q, onClick: () => t == null ? void 0 : t.setSelectionFontName(q) }))
        ]
      });
    case "font-size":
      return z({
        id: n,
        iconSvg: J("font-size"),
        label: (s == null ? void 0 : s.size) != null ? String(s.size) : "字号",
        title: "字号",
        disabled: o,
        items: [
          z({ id: "fs-input", input: { placeholder: "字号", value: (s == null ? void 0 : s.size) != null ? String(s.size) : "", onCommit: (q) => {
            const Z = parseFloat(q);
            Z > 0 && (t == null || t.setSelectionFontSize(Z));
          } } }),
          z({ id: "fs-isep", type: "separator" }),
          ...Nh.map((q) => z({ id: "fs-" + q, label: String(q), active: (s == null ? void 0 : s.size) === q, onClick: () => t == null ? void 0 : t.setSelectionFontSize(q) }))
        ]
      });
    case "borders":
      return z({
        id: n,
        iconSvg: J("borders"),
        label: "框线",
        title: "框线",
        disabled: o,
        items: [
          z({ id: "border-all", label: "所有框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("all") }),
          z({ id: "border-outer", label: "外侧框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("outer") }),
          z({ id: "border-sep1", type: "separator" }),
          z({ id: "border-top", label: "上框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("top") }),
          z({ id: "border-bottom", label: "下框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("bottom") }),
          z({ id: "border-left", label: "左框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("left") }),
          z({ id: "border-right", label: "右框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("right") }),
          z({ id: "border-sep2", type: "separator" }),
          z({ id: "border-none", label: "无框线", onClick: () => t == null ? void 0 : t.setSelectionBorders("none") })
        ]
      });
    case "align-left":
      return z({ id: n, iconSvg: J("align-left"), label: "左对齐", title: "左对齐", active: (r == null ? void 0 : r.hAlign) === "left", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionHAlign("left") });
    case "align-center":
      return z({ id: n, iconSvg: J("align-center"), label: "居中", title: "水平居中", active: (r == null ? void 0 : r.hAlign) === "center", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionHAlign("center") });
    case "align-right":
      return z({ id: n, iconSvg: J("align-right"), label: "右对齐", title: "右对齐", active: (r == null ? void 0 : r.hAlign) === "right", disabled: o, onClick: () => t == null ? void 0 : t.setSelectionHAlign("right") });
    case "valign":
      return z({
        id: n,
        iconSvg: J("align-middle"),
        label: "垂直对齐",
        title: "垂直对齐",
        disabled: o,
        items: [
          z({ id: "valign-top", label: "顶端对齐", active: (r == null ? void 0 : r.vAlign) === "top", onClick: () => t == null ? void 0 : t.setSelectionVAlign("top") }),
          z({ id: "valign-middle", label: "垂直居中", active: (r == null ? void 0 : r.vAlign) === "middle", onClick: () => t == null ? void 0 : t.setSelectionVAlign("middle") }),
          z({ id: "valign-bottom", label: "底端对齐", active: (r == null ? void 0 : r.vAlign) === "bottom", onClick: () => t == null ? void 0 : t.setSelectionVAlign("bottom") })
        ]
      });
    case "merge-cells":
      return z({
        id: n,
        iconSvg: J("merge"),
        label: "合并",
        title: "合并居中 / 合并 / 取消合并",
        disabled: o,
        items: [
          z({ id: "merge-center", label: "合并居中", onClick: () => t == null ? void 0 : t.mergeCenterSelection() }),
          z({ id: "merge-do", label: "合并单元格", onClick: () => {
            const q = t == null ? void 0 : t.getSelection();
            q && (t == null || t.mergeCells(q));
          } }),
          z({ id: "merge-undo", label: "取消合并", onClick: () => {
            const q = t == null ? void 0 : t.getSelection();
            q && (t == null || t.unmergeCells(q));
          } })
        ]
      });
    case "indent-inc":
      return z({ id: n, iconSvg: J("indent-inc"), label: "增加缩进", title: "增加缩进", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionIndent(1) });
    case "indent-dec":
      return z({ id: n, iconSvg: J("indent-dec"), label: "减少缩进", title: "减少缩进", disabled: o, onClick: () => t == null ? void 0 : t.adjustSelectionIndent(-1) });
    case "cells": {
      const q = t == null ? void 0 : t.getActiveCell(), Z = !e.editable || !q;
      return z({
        id: n,
        iconSvg: J("cells"),
        label: "行和列",
        title: "插入/删除/隐藏/最适合 行列",
        disabled: Z,
        items: [
          z({ id: "ins-row", label: "在上方插入行", disabled: !q, onClick: () => q && (t == null ? void 0 : t.insertRows(q.row, 1)) }),
          z({ id: "ins-col", label: "在左侧插入列", disabled: !q, onClick: () => q && (t == null ? void 0 : t.insertCols(q.col, 1)) }),
          z({ id: "cells-sep1", type: "separator" }),
          z({ id: "del-row", label: "删除整行", disabled: !q, onClick: () => q && (t == null ? void 0 : t.deleteRows(q.row, 1)) }),
          z({ id: "del-col", label: "删除整列", disabled: !q, onClick: () => q && (t == null ? void 0 : t.deleteCols(q.col, 1)) }),
          z({ id: "cells-sep2", type: "separator" }),
          z({ id: "fit-row", label: "最适合的行高", onClick: () => t == null ? void 0 : t.autoFitSelection("row") }),
          z({ id: "fit-col", label: "最适合的列宽", onClick: () => t == null ? void 0 : t.autoFitSelection("col") }),
          z({ id: "cells-sep3", type: "separator" }),
          z({ id: "hide-row", label: "隐藏行", onClick: () => t == null ? void 0 : t.setSelectionRowsHidden(!0) }),
          z({ id: "hide-col", label: "隐藏列", onClick: () => t == null ? void 0 : t.setSelectionColsHidden(!0) }),
          z({ id: "show-row", label: "显示行", onClick: () => t == null ? void 0 : t.setSelectionRowsHidden(!1) }),
          z({ id: "show-col", label: "显示列", onClick: () => t == null ? void 0 : t.setSelectionColsHidden(!1) })
        ]
      });
    }
  }
  return null;
}
function Wh(n) {
  return n ? Array.isArray(n) ? n.filter(Boolean) : [n] : [];
}
class qh {
  constructor(e) {
    this.container = e;
  }
  /** 重渲所有插件的 overlay:依次调 overlay(ctx),把返回的 DOM 节点替换进容器。 */
  render(e, t) {
    const o = [];
    for (const i of e)
      if (i.overlay)
        try {
          o.push(...Wh(i.overlay(t)));
        } catch (s) {
          console.warn("[ooxml-preview] 插件 overlay 渲染失败:", i.name, s);
        }
    this.container.replaceChildren(...o);
  }
  dispose() {
    this.container.replaceChildren();
  }
}
async function bs(n, e) {
  if (n instanceof ArrayBuffer)
    return e == null || e(n.byteLength, n.byteLength), n;
  if (n instanceof Uint8Array)
    return e == null || e(n.byteLength, n.byteLength), n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength);
  if (typeof Blob != "undefined" && n instanceof Blob)
    return await Uh(n, e);
  if (typeof n == "string")
    return await _h(n, e);
  throw new Error("不支持的输入类型，期望 File/Blob/ArrayBuffer/Uint8Array/URL 字符串");
}
function Uh(n, e) {
  return !e || typeof FileReader == "undefined" ? n.arrayBuffer() : new Promise((t, o) => {
    const i = new FileReader();
    i.onprogress = (s) => {
      s.lengthComputable && e(s.loaded, s.total);
    }, i.onload = () => {
      e(n.size, n.size), t(i.result);
    }, i.onerror = () => {
      var s;
      return o((s = i.error) != null ? s : new Error("文件读取失败"));
    }, i.readAsArrayBuffer(n);
  });
}
async function _h(n, e) {
  const t = await fetch(n);
  if (!t.ok) throw new Error(`加载文件失败: ${t.status} ${t.statusText}`);
  const o = Number(t.headers.get("content-length") || 0);
  if (!e || !t.body) return await t.arrayBuffer();
  const i = t.body.getReader(), s = [];
  let r = 0;
  for (; ; ) {
    const { done: c, value: d } = await i.read();
    if (c) break;
    s.push(d), r += d.byteLength, e(r, o);
  }
  const l = new Uint8Array(r);
  let a = 0;
  for (const c of s)
    l.set(c, a), a += c.byteLength;
  return e(r, o || r), l.buffer;
}
const X = (n, e) => `${n}:${e}`;
function ys() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
const jh = Array(17).fill("#000000");
function ur(n, e) {
  return {
    name: n,
    index: e,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: [ys()],
    merges: [],
    columns: /* @__PURE__ */ new Map(),
    rows: /* @__PURE__ */ new Map(),
    defaultColWidth: 64,
    defaultRowHeight: 20,
    freeze: { frozenRows: 0, frozenCols: 0 },
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: !0
  };
}
function Vh(n, e) {
  if (n == null || n === "") return { raw: null, type: "empty" };
  if (typeof n == "number") return { raw: n, type: "number" };
  if (typeof n == "boolean") return { raw: n, type: "boolean" };
  if (n instanceof Date) return { raw: n, type: "date" };
  if (typeof n != "string") return { raw: String(n), type: "string" };
  if (!e) return { raw: n, type: "string" };
  const t = n.trim();
  if (/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(t)) {
    const o = Number(t);
    if (Number.isFinite(o)) return { raw: o, type: "number" };
  }
  if (/^(TRUE|FALSE)$/i.test(t)) return { raw: /^TRUE$/i.test(t), type: "boolean" };
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(t)) {
    const o = new Date(t);
    if (!isNaN(o.getTime())) return { raw: o, type: "date" };
  }
  return { raw: n, type: "string" };
}
function Yh(n, e) {
  return e.map((t) => n[t]);
}
function hr(n, e, t = {}) {
  var p, m, b, v, y, w;
  const o = (p = t.startRow) != null ? p : 0, i = (m = t.startCol) != null ? m : 0, s = (b = t.autoInfer) != null ? b : !0;
  let r = 0, l = 0, a = !1;
  if (!e.length) return { lastRow: 0, lastCol: 0, wrote: !1 };
  const c = e[0], d = c !== null && typeof c == "object" && !Array.isArray(c), u = d ? (v = t.columns) != null ? v : Object.keys(c) : [];
  let h = o;
  if (d && ((y = t.headerRow) == null || y)) {
    for (let S = 0; S < u.length; S++) {
      const k = h, C = i + S;
      n.cells.set(X(k, C), { row: k, col: C, type: "string", raw: u[S], styleId: 0 }), r = Math.max(r, k), l = Math.max(l, C), a = !0;
    }
    h++;
  }
  for (let S = 0; S < e.length; S++) {
    const k = e[S], C = Array.isArray(k) ? k : Yh(k, u);
    for (let M = 0; M < C.length; M++) {
      const E = h + S - (d && ((w = t.headerRow) == null || w), 0), P = i + M, I = Vh(C[M], s);
      I.type !== "empty" && (n.cells.set(X(E, P), { row: E, col: P, type: I.type, raw: I.raw, styleId: 0 }), r = Math.max(r, E), l = Math.max(l, P), a = !0);
    }
  }
  return { lastRow: r, lastCol: l, wrote: a };
}
function Gh(n, e = {}) {
  var d, u;
  const t = e.themeColors && e.themeColors.length === 17 ? e.themeColors : jh, o = (d = e.autoInfer) != null ? d : !0, i = (u = e.headerRow) != null ? u : !0;
  if (n && typeof n == "object" && !Array.isArray(n) && Array.isArray(n.sheets))
    return { sheets: n.sheets.map((m, b) => {
      var k;
      const v = ur(m.name || `Sheet${b + 1}`, b), { lastRow: y, lastCol: w, wrote: S } = hr(v, (k = m.rows) != null ? k : [], { headerRow: i, autoInfer: o });
      return v.dimension = S ? { rows: y + 1, cols: w + 1 } : { rows: 0, cols: 0 }, v;
    }), activeSheet: 0, themeColors: t, date1904: !1 };
  const s = ur(e.sheetName || "Sheet1", 0), r = n != null ? n : [], { lastRow: l, lastCol: a, wrote: c } = hr(s, r, { headerRow: i, autoInfer: o });
  return s.dimension = c ? { rows: l + 1, cols: a + 1 } : { rows: 0, cols: 0 }, { sheets: [s], activeSheet: 0, themeColors: t, date1904: !1 };
}
function Xh(n) {
  return !!n && typeof n == "object" && Array.isArray(n.sheets) && typeof n.activeSheet == "number" && Array.isArray(n.themeColors);
}
function Kh(n, e) {
  var c;
  const t = e.sheets[0], o = n.sheets[0];
  if (!t) return n;
  if (!o)
    return {
      sheets: [Jh(t, t.name)],
      activeSheet: 0,
      themeColors: e.themeColors,
      date1904: n.date1904,
      cellImages: n.cellImages
    };
  const i = {
    name: o.name || t.name,
    index: 0,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: t.styles.map((d) => R({}, d)),
    merges: t.merges.map((d) => R({}, d)),
    columns: new Map(t.columns),
    rows: new Map(t.rows),
    defaultColWidth: t.defaultColWidth,
    defaultRowHeight: t.defaultRowHeight,
    freeze: R({}, t.freeze),
    // 条件格式 / 数据验证 不带过来 —— 数据可能不在模板的目标列上, 套规则会误命中
    conditional: [],
    dataValidations: [],
    // 模板的图 / 图表 / 形状 全部不带 —— 模板是"样式骨架", 不是内容
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: t.showGridLines
  };
  let s = 0, r = 0;
  for (const d of o.cells.values()) {
    const u = t.cells.get(X(d.row, d.col));
    i.cells.set(X(d.row, d.col), {
      row: d.row,
      col: d.col,
      type: d.type,
      raw: d.raw,
      rich: d.rich,
      formula: d.formula,
      hyperlink: d.hyperlink,
      comment: d.comment,
      styleId: (c = u == null ? void 0 : u.styleId) != null ? c : 0,
      dispImgId: d.dispImgId
    }), d.row > s && (s = d.row), d.col > r && (r = d.col);
  }
  const l = t.columns.size ? Math.max(...t.columns.keys()) + 1 : 0, a = t.rows.size ? Math.max(...t.rows.keys()) + 1 : 0;
  return i.dimension = {
    rows: Math.max(o.dimension.rows, s + 1, a),
    cols: Math.max(o.dimension.cols, r + 1, l)
  }, {
    sheets: [i],
    activeSheet: 0,
    themeColors: e.themeColors,
    date1904: n.date1904,
    cellImages: n.cellImages
  };
}
function Jh(n, e) {
  return {
    name: e,
    index: 0,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: n.styles.map((t) => R({}, t)),
    merges: n.merges.map((t) => R({}, t)),
    columns: new Map(n.columns),
    rows: new Map(n.rows),
    defaultColWidth: n.defaultColWidth,
    defaultRowHeight: n.defaultRowHeight,
    freeze: R({}, n.freeze),
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: n.showGridLines
  };
}
function Ha(n) {
  if (!(typeof URL == "undefined" || !URL.createObjectURL)) {
    for (const e of n.sheets)
      for (const t of e.images)
        t.bytes && t.mime && !t.src && (t.src = URL.createObjectURL(new Blob([t.bytes], { type: t.mime })));
    if (n.cellImages)
      for (const e of n.cellImages.values())
        e.bytes && e.mime && !e.src && (e.src = URL.createObjectURL(new Blob([e.bytes], { type: e.mime })));
  }
}
function Ki(n) {
  var e, t;
  if (!(typeof URL == "undefined" || !URL.revokeObjectURL)) {
    for (const o of n.sheets)
      for (const i of o.images)
        (e = i.src) != null && e.startsWith("blob:") && URL.revokeObjectURL(i.src);
    if (n.cellImages)
      for (const o of n.cellImages.values())
        (t = o.src) != null && t.startsWith("blob:") && URL.revokeObjectURL(o.src);
  }
}
function Da(n) {
  const e = new Uint8Array(n);
  return e.length < 4 ? "empty" : e[0] === 208 && e[1] === 207 && e[2] === 17 && e[3] === 224 ? "xls" : e[0] === 80 && e[1] === 75 ? "xlsx" : "not-zip";
}
function Zh(n) {
  const e = (n == null ? void 0 : n.message) || String(n);
  return /encrypt|password|protected/i.test(e) ? "文件已加密或受密码保护，暂不支持预览。" : /zip|signature|central directory|invalid|corrupt|unexpected end/i.test(e) ? "文件无法解析：可能不是有效的 .xlsx，或文件已损坏。" : "解析失败：" + e;
}
var Se = Uint8Array, We = Uint16Array, vs = Int32Array, Nn = new Se([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), On = new Se([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Ji = new Se([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Ba = function(n, e) {
  for (var t = new We(31), o = 0; o < 31; ++o)
    t[o] = e += 1 << n[o - 1];
  for (var i = new vs(t[30]), o = 1; o < 30; ++o)
    for (var s = t[o]; s < t[o + 1]; ++s)
      i[s] = s - t[o] << 5 | o;
  return { b: t, r: i };
}, Wa = Ba(Nn, 2), qa = Wa.b, Zi = Wa.r;
qa[28] = 258, Zi[258] = 28;
var Ua = Ba(On, 0), Qh = Ua.b, fr = Ua.r, Qi = new We(32768);
for (var ve = 0; ve < 32768; ++ve) {
  var yt = (ve & 43690) >> 1 | (ve & 21845) << 1;
  yt = (yt & 52428) >> 2 | (yt & 13107) << 2, yt = (yt & 61680) >> 4 | (yt & 3855) << 4, Qi[ve] = ((yt & 65280) >> 8 | (yt & 255) << 8) >> 1;
}
var st = (function(n, e, t) {
  for (var o = n.length, i = 0, s = new We(e); i < o; ++i)
    n[i] && ++s[n[i] - 1];
  var r = new We(e);
  for (i = 1; i < e; ++i)
    r[i] = r[i - 1] + s[i - 1] << 1;
  var l;
  if (t) {
    l = new We(1 << e);
    var a = 15 - e;
    for (i = 0; i < o; ++i)
      if (n[i])
        for (var c = i << 4 | n[i], d = e - n[i], u = r[n[i] - 1]++ << d, h = u | (1 << d) - 1; u <= h; ++u)
          l[Qi[u] >> a] = c;
  } else
    for (l = new We(o), i = 0; i < o; ++i)
      n[i] && (l[i] = Qi[r[n[i] - 1]++] >> 15 - n[i]);
  return l;
}), Tt = new Se(288);
for (var ve = 0; ve < 144; ++ve)
  Tt[ve] = 8;
for (var ve = 144; ve < 256; ++ve)
  Tt[ve] = 9;
for (var ve = 256; ve < 280; ++ve)
  Tt[ve] = 7;
for (var ve = 280; ve < 288; ++ve)
  Tt[ve] = 8;
var Fo = new Se(32);
for (var ve = 0; ve < 32; ++ve)
  Fo[ve] = 5;
var ef = /* @__PURE__ */ st(Tt, 9, 0), tf = /* @__PURE__ */ st(Tt, 9, 1), of = /* @__PURE__ */ st(Fo, 5, 0), nf = /* @__PURE__ */ st(Fo, 5, 1), ti = function(n) {
  for (var e = n[0], t = 1; t < n.length; ++t)
    n[t] > e && (e = n[t]);
  return e;
}, Ge = function(n, e, t) {
  var o = e / 8 | 0;
  return (n[o] | n[o + 1] << 8) >> (e & 7) & t;
}, oi = function(n, e) {
  var t = e / 8 | 0;
  return (n[t] | n[t + 1] << 8 | n[t + 2] << 16) >> (e & 7);
}, xs = function(n) {
  return (n + 7) / 8 | 0;
}, No = function(n, e, t) {
  return (e == null || e < 0) && (e = 0), (t == null || t > n.length) && (t = n.length), new Se(n.subarray(e, t));
}, sf = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], Le = function(n, e, t) {
  var o = new Error(e || sf[n]);
  if (o.code = n, Error.captureStackTrace && Error.captureStackTrace(o, Le), !t)
    throw o;
  return o;
}, rf = function(n, e, t, o) {
  var i = n.length, s = o ? o.length : 0;
  if (!i || e.f && !e.l)
    return t || new Se(0);
  var r = !t, l = r || e.i != 2, a = e.i;
  r && (t = new Se(i * 3));
  var c = function($e) {
    var et = t.length;
    if ($e > et) {
      var Ae = new Se(Math.max(et * 2, $e));
      Ae.set(t), t = Ae;
    }
  }, d = e.f || 0, u = e.p || 0, h = e.b || 0, p = e.l, m = e.d, b = e.m, v = e.n, y = i * 8;
  do {
    if (!p) {
      d = Ge(n, u, 1);
      var w = Ge(n, u + 1, 3);
      if (u += 3, w)
        if (w == 1)
          p = tf, m = nf, b = 9, v = 5;
        else if (w == 2) {
          var M = Ge(n, u, 31) + 257, E = Ge(n, u + 10, 15) + 4, P = M + Ge(n, u + 5, 31) + 1;
          u += 14;
          for (var I = new Se(P), L = new Se(19), F = 0; F < E; ++F)
            L[Ji[F]] = Ge(n, u + F * 3, 7);
          u += E * 3;
          for (var N = ti(L), O = (1 << N) - 1, D = st(L, N, 1), F = 0; F < P; ) {
            var W = D[Ge(n, u, O)];
            u += W & 15;
            var S = W >> 4;
            if (S < 16)
              I[F++] = S;
            else {
              var H = 0, V = 0;
              for (S == 16 ? (V = 3 + Ge(n, u, 3), u += 2, H = I[F - 1]) : S == 17 ? (V = 3 + Ge(n, u, 7), u += 3) : S == 18 && (V = 11 + Ge(n, u, 127), u += 7); V--; )
                I[F++] = H;
            }
          }
          var Y = I.subarray(0, M), ee = I.subarray(M);
          b = ti(Y), v = ti(ee), p = st(Y, b, 1), m = st(ee, v, 1);
        } else
          Le(1);
      else {
        var S = xs(u) + 4, k = n[S - 4] | n[S - 3] << 8, C = S + k;
        if (C > i) {
          a && Le(0);
          break;
        }
        l && c(h + k), t.set(n.subarray(S, C), h), e.b = h += k, e.p = u = C * 8, e.f = d;
        continue;
      }
      if (u > y) {
        a && Le(0);
        break;
      }
    }
    l && c(h + 131072);
    for (var ce = (1 << b) - 1, le = (1 << v) - 1, ge = u; ; ge = u) {
      var H = p[oi(n, u) & ce], se = H >> 4;
      if (u += H & 15, u > y) {
        a && Le(0);
        break;
      }
      if (H || Le(2), se < 256)
        t[h++] = se;
      else if (se == 256) {
        ge = u, p = null;
        break;
      } else {
        var de = se - 254;
        if (se > 264) {
          var F = se - 257, q = Nn[F];
          de = Ge(n, u, (1 << q) - 1) + qa[F], u += q;
        }
        var Z = m[oi(n, u) & le], te = Z >> 4;
        Z || Le(3), u += Z & 15;
        var ee = Qh[te];
        if (te > 3) {
          var q = On[te];
          ee += oi(n, u) & (1 << q) - 1, u += q;
        }
        if (u > y) {
          a && Le(0);
          break;
        }
        l && c(h + 131072);
        var oe = h + de;
        if (h < ee) {
          var ne = s - ee, ye = Math.min(ee, oe);
          for (ne + h < 0 && Le(3); h < ye; ++h)
            t[h] = o[ne + h];
        }
        for (; h < oe; ++h)
          t[h] = t[h - ee];
      }
    }
    e.l = p, e.p = ge, e.b = h, e.f = d, p && (d = 1, e.m = b, e.d = m, e.n = v);
  } while (!d);
  return h != t.length && r ? No(t, 0, h) : t.subarray(0, h);
}, at = function(n, e, t) {
  t <<= e & 7;
  var o = e / 8 | 0;
  n[o] |= t, n[o + 1] |= t >> 8;
}, fo = function(n, e, t) {
  t <<= e & 7;
  var o = e / 8 | 0;
  n[o] |= t, n[o + 1] |= t >> 8, n[o + 2] |= t >> 16;
}, ni = function(n, e) {
  for (var t = [], o = 0; o < n.length; ++o)
    n[o] && t.push({ s: o, f: n[o] });
  var i = t.length, s = t.slice();
  if (!i)
    return { t: ja, l: 0 };
  if (i == 1) {
    var r = new Se(t[0].s + 1);
    return r[t[0].s] = 1, { t: r, l: 1 };
  }
  t.sort(function(C, M) {
    return C.f - M.f;
  }), t.push({ s: -1, f: 25001 });
  var l = t[0], a = t[1], c = 0, d = 1, u = 2;
  for (t[0] = { s: -1, f: l.f + a.f, l, r: a }; d != i - 1; )
    l = t[t[c].f < t[u].f ? c++ : u++], a = t[c != d && t[c].f < t[u].f ? c++ : u++], t[d++] = { s: -1, f: l.f + a.f, l, r: a };
  for (var h = s[0].s, o = 1; o < i; ++o)
    s[o].s > h && (h = s[o].s);
  var p = new We(h + 1), m = es(t[d - 1], p, 0);
  if (m > e) {
    var o = 0, b = 0, v = m - e, y = 1 << v;
    for (s.sort(function(M, E) {
      return p[E.s] - p[M.s] || M.f - E.f;
    }); o < i; ++o) {
      var w = s[o].s;
      if (p[w] > e)
        b += y - (1 << m - p[w]), p[w] = e;
      else
        break;
    }
    for (b >>= v; b > 0; ) {
      var S = s[o].s;
      p[S] < e ? b -= 1 << e - p[S]++ - 1 : ++o;
    }
    for (; o >= 0 && b; --o) {
      var k = s[o].s;
      p[k] == e && (--p[k], ++b);
    }
    m = e;
  }
  return { t: new Se(p), l: m };
}, es = function(n, e, t) {
  return n.s == -1 ? Math.max(es(n.l, e, t + 1), es(n.r, e, t + 1)) : e[n.s] = t;
}, pr = function(n) {
  for (var e = n.length; e && !n[--e]; )
    ;
  for (var t = new We(++e), o = 0, i = n[0], s = 1, r = function(a) {
    t[o++] = a;
  }, l = 1; l <= e; ++l)
    if (n[l] == i && l != e)
      ++s;
    else {
      if (!i && s > 2) {
        for (; s > 138; s -= 138)
          r(32754);
        s > 2 && (r(s > 10 ? s - 11 << 5 | 28690 : s - 3 << 5 | 12305), s = 0);
      } else if (s > 3) {
        for (r(i), --s; s > 6; s -= 6)
          r(8304);
        s > 2 && (r(s - 3 << 5 | 8208), s = 0);
      }
      for (; s--; )
        r(i);
      s = 1, i = n[l];
    }
  return { c: t.subarray(0, o), n: e };
}, po = function(n, e) {
  for (var t = 0, o = 0; o < e.length; ++o)
    t += n[o] * e[o];
  return t;
}, _a = function(n, e, t) {
  var o = t.length, i = xs(e + 2);
  n[i] = o & 255, n[i + 1] = o >> 8, n[i + 2] = n[i] ^ 255, n[i + 3] = n[i + 1] ^ 255;
  for (var s = 0; s < o; ++s)
    n[i + s + 4] = t[s];
  return (i + 4 + o) * 8;
}, gr = function(n, e, t, o, i, s, r, l, a, c, d) {
  at(e, d++, t), ++i[256];
  for (var u = ni(i, 15), h = u.t, p = u.l, m = ni(s, 15), b = m.t, v = m.l, y = pr(h), w = y.c, S = y.n, k = pr(b), C = k.c, M = k.n, E = new We(19), P = 0; P < w.length; ++P)
    ++E[w[P] & 31];
  for (var P = 0; P < C.length; ++P)
    ++E[C[P] & 31];
  for (var I = ni(E, 7), L = I.t, F = I.l, N = 19; N > 4 && !L[Ji[N - 1]]; --N)
    ;
  var O = c + 5 << 3, D = po(i, Tt) + po(s, Fo) + r, W = po(i, h) + po(s, b) + r + 14 + 3 * N + po(E, L) + 2 * E[16] + 3 * E[17] + 7 * E[18];
  if (a >= 0 && O <= D && O <= W)
    return _a(e, d, n.subarray(a, a + c));
  var H, V, Y, ee;
  if (at(e, d, 1 + (W < D)), d += 2, W < D) {
    H = st(h, p, 0), V = h, Y = st(b, v, 0), ee = b;
    var ce = st(L, F, 0);
    at(e, d, S - 257), at(e, d + 5, M - 1), at(e, d + 10, N - 4), d += 14;
    for (var P = 0; P < N; ++P)
      at(e, d + 3 * P, L[Ji[P]]);
    d += 3 * N;
    for (var le = [w, C], ge = 0; ge < 2; ++ge)
      for (var se = le[ge], P = 0; P < se.length; ++P) {
        var de = se[P] & 31;
        at(e, d, ce[de]), d += L[de], de > 15 && (at(e, d, se[P] >> 5 & 127), d += se[P] >> 12);
      }
  } else
    H = ef, V = Tt, Y = of, ee = Fo;
  for (var P = 0; P < l; ++P) {
    var q = o[P];
    if (q > 255) {
      var de = q >> 18 & 31;
      fo(e, d, H[de + 257]), d += V[de + 257], de > 7 && (at(e, d, q >> 23 & 31), d += Nn[de]);
      var Z = q & 31;
      fo(e, d, Y[Z]), d += ee[Z], Z > 3 && (fo(e, d, q >> 5 & 8191), d += On[Z]);
    } else
      fo(e, d, H[q]), d += V[q];
  }
  return fo(e, d, H[256]), d + V[256];
}, lf = /* @__PURE__ */ new vs([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ja = /* @__PURE__ */ new Se(0), af = function(n, e, t, o, i, s) {
  var r = s.z || n.length, l = new Se(o + r + 5 * (1 + Math.ceil(r / 7e3)) + i), a = l.subarray(o, l.length - i), c = s.l, d = (s.r || 0) & 7;
  if (e) {
    d && (a[0] = s.r >> 3);
    for (var u = lf[e - 1], h = u >> 13, p = u & 8191, m = (1 << t) - 1, b = s.p || new We(32768), v = s.h || new We(m + 1), y = Math.ceil(t / 3), w = 2 * y, S = function(It) {
      return (n[It] ^ n[It + 1] << y ^ n[It + 2] << w) & m;
    }, k = new vs(25e3), C = new We(288), M = new We(32), E = 0, P = 0, I = s.i || 0, L = 0, F = s.w || 0, N = 0; I + 2 < r; ++I) {
      var O = S(I), D = I & 32767, W = v[O];
      if (b[D] = W, v[O] = D, F <= I) {
        var H = r - I;
        if ((E > 7e3 || L > 24576) && (H > 423 || !c)) {
          d = gr(n, a, 0, k, C, M, P, L, N, I - N, d), L = E = P = 0, N = I;
          for (var V = 0; V < 286; ++V)
            C[V] = 0;
          for (var V = 0; V < 30; ++V)
            M[V] = 0;
        }
        var Y = 2, ee = 0, ce = p, le = D - W & 32767;
        if (H > 2 && O == S(I - le))
          for (var ge = Math.min(h, H) - 1, se = Math.min(32767, I), de = Math.min(258, H); le <= se && --ce && D != W; ) {
            if (n[I + Y] == n[I + Y - le]) {
              for (var q = 0; q < de && n[I + q] == n[I + q - le]; ++q)
                ;
              if (q > Y) {
                if (Y = q, ee = le, q > ge)
                  break;
                for (var Z = Math.min(le, q - 2), te = 0, V = 0; V < Z; ++V) {
                  var oe = I - le + V & 32767, ne = b[oe], ye = oe - ne & 32767;
                  ye > te && (te = ye, W = oe);
                }
              }
            }
            D = W, W = b[D], le += D - W & 32767;
          }
        if (ee) {
          k[L++] = 268435456 | Zi[Y] << 18 | fr[ee];
          var $e = Zi[Y] & 31, et = fr[ee] & 31;
          P += Nn[$e] + On[et], ++C[257 + $e], ++M[et], F = I + Y, ++E;
        } else
          k[L++] = n[I], ++C[n[I]];
      }
    }
    for (I = Math.max(I, F); I < r; ++I)
      k[L++] = n[I], ++C[n[I]];
    d = gr(n, a, c, k, C, M, P, L, N, I - N, d), c || (s.r = d & 7 | a[d / 8 | 0] << 3, d -= 7, s.h = v, s.p = b, s.i = I, s.w = F);
  } else {
    for (var I = s.w || 0; I < r + c; I += 65535) {
      var Ae = I + 65535;
      Ae >= r && (a[d / 8 | 0] = c, Ae = r), d = _a(a, d + 1, n.subarray(I, Ae));
    }
    s.i = r;
  }
  return No(l, 0, o + xs(d) + i);
}, cf = /* @__PURE__ */ (function() {
  for (var n = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var t = e, o = 9; --o; )
      t = (t & 1 && -306674912) ^ t >>> 1;
    n[e] = t;
  }
  return n;
})(), df = function() {
  var n = -1;
  return {
    p: function(e) {
      for (var t = n, o = 0; o < e.length; ++o)
        t = cf[t & 255 ^ e[o]] ^ t >>> 8;
      n = t;
    },
    d: function() {
      return ~n;
    }
  };
}, Va = function() {
  var n = 1, e = 0;
  return {
    p: function(t) {
      for (var o = n, i = e, s = t.length | 0, r = 0; r != s; ) {
        for (var l = Math.min(r + 2655, s); r < l; ++r)
          i += o += t[r];
        o = (o & 65535) + 15 * (o >> 16), i = (i & 65535) + 15 * (i >> 16);
      }
      n = o, e = i;
    },
    d: function() {
      return n %= 65521, e %= 65521, (n & 255) << 24 | (n & 65280) << 8 | (e & 255) << 8 | e >> 8;
    }
  };
}, Ya = function(n, e, t, o, i) {
  if (!i && (i = { l: 1 }, e.dictionary)) {
    var s = e.dictionary.subarray(-32768), r = new Se(s.length + n.length);
    r.set(s), r.set(n, s.length), n = r, i.w = s.length;
  }
  return af(n, e.level == null ? 6 : e.level, e.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5) : 20 : 12 + e.mem, t, o, i);
}, Ga = function(n, e) {
  var t = {};
  for (var o in n)
    t[o] = n[o];
  for (var o in e)
    t[o] = e[o];
  return t;
}, nt = function(n, e) {
  return n[e] | n[e + 1] << 8;
}, je = function(n, e) {
  return (n[e] | n[e + 1] << 8 | n[e + 2] << 16 | n[e + 3] << 24) >>> 0;
}, ii = function(n, e) {
  return je(n, e) + je(n, e + 4) * 4294967296;
}, Ce = function(n, e, t) {
  for (; t; ++e)
    n[e] = t, t >>>= 8;
}, uf = function(n, e) {
  var t = e.level, o = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
  if (n[0] = 120, n[1] = o << 6 | (e.dictionary && 32), n[1] |= 31 - (n[0] << 8 | n[1]) % 31, e.dictionary) {
    var i = Va();
    i.p(e.dictionary), Ce(n, 2, i.d());
  }
};
function hf(n, e) {
  return Ya(n, e || {}, 0, 0);
}
function ff(n, e) {
  return rf(n, { i: 2 }, e && e.out, e && e.dictionary);
}
function vv(n, e) {
  e || (e = {});
  var t = Va();
  t.p(n);
  var o = Ya(n, e, e.dictionary ? 6 : 2, 4);
  return uf(o, e), Ce(o, o.length - 4, t.d()), o;
}
var Xa = function(n, e, t, o) {
  for (var i in n) {
    var s = n[i], r = e + i, l = o;
    Array.isArray(s) && (l = Ga(o, s[1]), s = s[0]), ArrayBuffer.isView(s) ? t[r] = [s, l] : (t[r += "/"] = [new Se(0), l], Xa(s, r, t, o));
  }
}, mr = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder(), ts = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder(), pf = 0;
try {
  ts.decode(ja, { stream: !0 }), pf = 1;
} catch (n) {
}
var gf = function(n) {
  for (var e = "", t = 0; ; ) {
    var o = n[t++], i = (o > 127) + (o > 223) + (o > 239);
    if (t + i > n.length)
      return { s: e, r: No(n, t - 1) };
    i ? i == 3 ? (o = ((o & 15) << 18 | (n[t++] & 63) << 12 | (n[t++] & 63) << 6 | n[t++] & 63) - 65536, e += String.fromCharCode(55296 | o >> 10, 56320 | o & 1023)) : i & 1 ? e += String.fromCharCode((o & 31) << 6 | n[t++] & 63) : e += String.fromCharCode((o & 15) << 12 | (n[t++] & 63) << 6 | n[t++] & 63) : e += String.fromCharCode(o);
  }
};
function Je(n, e) {
  var t;
  if (mr)
    return mr.encode(n);
  for (var o = n.length, i = new Se(n.length + (n.length >> 1)), s = 0, r = function(c) {
    i[s++] = c;
  }, t = 0; t < o; ++t) {
    if (s + 5 > i.length) {
      var l = new Se(s + 8 + (o - t << 1));
      l.set(i), i = l;
    }
    var a = n.charCodeAt(t);
    a < 128 || e ? r(a) : a < 2048 ? (r(192 | a >> 6), r(128 | a & 63)) : a > 55295 && a < 57344 ? (a = 65536 + (a & 1047552) | n.charCodeAt(++t) & 1023, r(240 | a >> 18), r(128 | a >> 12 & 63), r(128 | a >> 6 & 63), r(128 | a & 63)) : (r(224 | a >> 12), r(128 | a >> 6 & 63), r(128 | a & 63));
  }
  return No(i, 0, s);
}
function xe(n, e) {
  if (e) {
    for (var t = "", o = 0; o < n.length; o += 16384)
      t += String.fromCharCode.apply(null, n.subarray(o, o + 16384));
    return t;
  } else {
    if (ts)
      return ts.decode(n);
    var i = gf(n), s = i.s, t = i.r;
    return t.length && Le(8), s;
  }
}
var mf = function(n, e) {
  return e + 30 + nt(n, e + 26) + nt(n, e + 28);
}, bf = function(n, e, t) {
  var o = nt(n, e + 28), i = nt(n, e + 30), s = xe(n.subarray(e + 46, e + 46 + o), !(nt(n, e + 8) & 2048)), r = e + 46 + o, l = yf(n, r, i, t, je(n, e + 20), je(n, e + 24), je(n, e + 42)), a = l[0], c = l[1], d = l[2];
  return [nt(n, e + 10), a, c, s, r + i + nt(n, e + 32), d];
}, yf = function(n, e, t, o, i, s, r) {
  var l = i == 4294967295, a = s == 4294967295, c = r == 4294967295, d = e + t, u = l + a + c;
  if (o && u) {
    for (; e + 4 < d; e += 4 + nt(n, e + 2))
      if (nt(n, e) == 1)
        return [
          l ? ii(n, e + 4 + 8 * a) : i,
          a ? ii(n, e + 4) : s,
          c ? ii(n, e + 4 + 8 * (a + l)) : r,
          1
        ];
    o < 2 && Le(13);
  }
  return [i, s, r, 0];
}, os = function(n) {
  var e = 0;
  if (n)
    for (var t in n) {
      var o = n[t].length;
      o > 65535 && Le(9), e += o + 4;
    }
  return e;
}, br = function(n, e, t, o, i, s, r, l) {
  var a = o.length, c = t.extra, d = l && l.length, u = os(c);
  Ce(n, e, r != null ? 33639248 : 67324752), e += 4, r != null && (n[e++] = 20, n[e++] = t.os), n[e] = 20, e += 2, n[e++] = t.flag << 1 | (s < 0 && 8), n[e++] = i && 8, n[e++] = t.compression & 255, n[e++] = t.compression >> 8;
  var h = new Date(t.mtime == null ? Date.now() : t.mtime), p = h.getFullYear() - 1980;
  if ((p < 0 || p > 119) && Le(10), Ce(n, e, p << 25 | h.getMonth() + 1 << 21 | h.getDate() << 16 | h.getHours() << 11 | h.getMinutes() << 5 | h.getSeconds() >> 1), e += 4, s != -1 && (Ce(n, e, t.crc), Ce(n, e + 4, s < 0 ? -s - 2 : s), Ce(n, e + 8, t.size)), Ce(n, e + 12, a), Ce(n, e + 14, u), e += 16, r != null && (Ce(n, e, d), Ce(n, e + 6, t.attrs), Ce(n, e + 10, r), e += 14), n.set(o, e), e += a, u)
    for (var m in c) {
      var b = c[m], v = b.length;
      Ce(n, e, +m), Ce(n, e + 2, v), n.set(b, e + 4), e += 4 + v;
    }
  return d && (n.set(l, e), e += d), e;
}, vf = function(n, e, t, o, i) {
  Ce(n, e, 101010256), Ce(n, e + 8, t), Ce(n, e + 10, t), Ce(n, e + 12, o), Ce(n, e + 16, i);
};
function Oo(n, e) {
  e || (e = {});
  var t = {}, o = [];
  Xa(n, "", t, e);
  var i = 0, s = 0;
  for (var r in t) {
    var l = t[r], a = l[0], c = l[1], d = c.level == 0 ? 0 : 8, u = Je(r), h = u.length, p = c.comment, m = p && Je(p), b = m && m.length, v = os(c.extra);
    h > 65535 && Le(11);
    var y = d ? hf(a, c) : a, w = y.length, S = df();
    S.p(a), o.push(Ga(c, {
      size: a.length,
      crc: S.d(),
      c: y,
      f: u,
      m,
      u: h != r.length || m && p.length != b,
      o: i,
      compression: d
    })), i += 30 + h + v + w, s += 76 + 2 * (h + v) + (b || 0) + w;
  }
  for (var k = new Se(s + 22), C = i, M = s - i, E = 0; E < o.length; ++E) {
    var u = o[E];
    br(k, u.o, u, u.f, u.u, u.c.length);
    var P = 30 + u.f.length + os(u.extra);
    k.set(u.c, u.o + P), br(k, i, u, u.f, u.u, u.c.length, u.o, u.m), i += 16 + P + (u.m ? u.m.length : 0);
  }
  return vf(k, i, o.length, M, C), k;
}
function Mt(n, e) {
  for (var t = {}, o = n.length - 22; je(n, o) != 101010256; --o)
    (!o || n.length - o > 65558) && Le(13);
  var i = nt(n, o + 8);
  if (!i)
    return {};
  var s = je(n, o + 16), r = je(n, o - 20) == 117853008;
  if (r) {
    var l = je(n, o - 12);
    r = je(n, l) == 101075792, r && (i = je(n, l + 32), s = je(n, l + 48));
  }
  for (var a = 0; a < i; ++a) {
    var c = bf(n, s, r), d = c[0], u = c[1], h = c[2], p = c[3], m = c[4], b = c[5], v = mf(n, b);
    s = m, d ? d == 8 ? t[p] = ff(n.subarray(v, v + u), { out: new Se(h) }) : Le(14, "unknown compression type " + d) : t[p] = No(n, v, v + u);
  }
  return t;
}
var si = {}, ri = {}, yr;
function zn() {
  return yr || (yr = 1, (function(n) {
    const e = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", t = e + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", o = "[" + e + "][" + t + "]*", i = new RegExp("^" + o + "$"), s = function(c, d) {
      const u = [];
      let h = d.exec(c);
      for (; h; ) {
        const p = [];
        p.startIndex = d.lastIndex - h[0].length;
        const m = h.length;
        for (let b = 0; b < m; b++)
          p.push(h[b]);
        u.push(p), h = d.exec(c);
      }
      return u;
    }, r = function(c) {
      const d = i.exec(c);
      return !(d === null || typeof d == "undefined");
    };
    n.isExist = function(c) {
      return typeof c != "undefined";
    }, n.isEmptyObject = function(c) {
      return Object.keys(c).length === 0;
    }, n.merge = function(c, d, u) {
      if (d) {
        const h = Object.keys(d), p = h.length;
        for (let m = 0; m < p; m++)
          u === "strict" ? c[h[m]] = [d[h[m]]] : c[h[m]] = d[h[m]];
      }
    }, n.getValue = function(c) {
      return n.isExist(c) ? c : "";
    };
    const l = [
      // '__proto__',
      // 'constructor',
      // 'prototype',
      "hasOwnProperty",
      "toString",
      "valueOf",
      "__defineGetter__",
      "__defineSetter__",
      "__lookupGetter__",
      "__lookupSetter__"
    ], a = ["__proto__", "constructor", "prototype"];
    n.isName = r, n.getAllMatches = s, n.nameRegexp = o, n.DANGEROUS_PROPERTY_NAMES = l, n.criticalProperties = a;
  })(ri)), ri;
}
var vr;
function Ka() {
  if (vr) return si;
  vr = 1;
  const n = zn(), e = {
    allowBooleanAttributes: !1,
    //A tag can have attributes without any value
    unpairedTags: []
  };
  si.validate = function(y, w) {
    w = Object.assign({}, e, w);
    const S = [];
    let k = !1, C = !1;
    y[0] === "\uFEFF" && (y = y.substr(1));
    for (let M = 0; M < y.length; M++)
      if (y[M] === "<" && y[M + 1] === "?") {
        if (M += 2, M = o(y, M), M.err) return M;
      } else if (y[M] === "<") {
        let E = M;
        if (M++, y[M] === "!") {
          M = i(y, M);
          continue;
        } else {
          let P = !1;
          y[M] === "/" && (P = !0, M++);
          let I = "";
          for (; M < y.length && y[M] !== ">" && y[M] !== " " && y[M] !== "	" && y[M] !== `
` && y[M] !== "\r"; M++)
            I += y[M];
          if (I = I.trim(), I[I.length - 1] === "/" && (I = I.substring(0, I.length - 1), M--), !m(I)) {
            let N;
            return I.trim().length === 0 ? N = "Invalid space after '<'." : N = "Tag '" + I + "' is an invalid name.", h("InvalidTag", N, b(y, M));
          }
          const L = l(y, M);
          if (L === !1)
            return h("InvalidAttr", "Attributes for '" + I + "' have open quote.", b(y, M));
          let F = L.value;
          if (M = L.index, F[F.length - 1] === "/") {
            const N = M - F.length;
            F = F.substring(0, F.length - 1);
            const O = c(F, w);
            if (O === !0)
              k = !0;
            else
              return h(O.err.code, O.err.msg, b(y, N + O.err.line));
          } else if (P)
            if (L.tagClosed) {
              if (F.trim().length > 0)
                return h("InvalidTag", "Closing tag '" + I + "' can't have attributes or invalid starting.", b(y, E));
              if (S.length === 0)
                return h("InvalidTag", "Closing tag '" + I + "' has not been opened.", b(y, E));
              {
                const N = S.pop();
                if (I !== N.tagName) {
                  let O = b(y, N.tagStartPos);
                  return h(
                    "InvalidTag",
                    "Expected closing tag '" + N.tagName + "' (opened in line " + O.line + ", col " + O.col + ") instead of closing tag '" + I + "'.",
                    b(y, E)
                  );
                }
                S.length == 0 && (C = !0);
              }
            } else return h("InvalidTag", "Closing tag '" + I + "' doesn't have proper closing.", b(y, M));
          else {
            const N = c(F, w);
            if (N !== !0)
              return h(N.err.code, N.err.msg, b(y, M - F.length + N.err.line));
            if (C === !0)
              return h("InvalidXml", "Multiple possible root nodes found.", b(y, M));
            w.unpairedTags.indexOf(I) !== -1 || S.push({ tagName: I, tagStartPos: E }), k = !0;
          }
          for (M++; M < y.length; M++)
            if (y[M] === "<")
              if (y[M + 1] === "!") {
                M++, M = i(y, M);
                continue;
              } else if (y[M + 1] === "?") {
                if (M = o(y, ++M), M.err) return M;
              } else
                break;
            else if (y[M] === "&") {
              const N = u(y, M);
              if (N == -1)
                return h("InvalidChar", "char '&' is not expected.", b(y, M));
              M = N;
            } else if (C === !0 && !t(y[M]))
              return h("InvalidXml", "Extra text at the end", b(y, M));
          y[M] === "<" && M--;
        }
      } else {
        if (t(y[M]))
          continue;
        return h("InvalidChar", "char '" + y[M] + "' is not expected.", b(y, M));
      }
    if (k) {
      if (S.length == 1)
        return h("InvalidTag", "Unclosed tag '" + S[0].tagName + "'.", b(y, S[0].tagStartPos));
      if (S.length > 0)
        return h("InvalidXml", "Invalid '" + JSON.stringify(S.map((M) => M.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
    } else return h("InvalidXml", "Start tag expected.", 1);
    return !0;
  };
  function t(y) {
    return y === " " || y === "	" || y === `
` || y === "\r";
  }
  function o(y, w) {
    const S = w;
    for (; w < y.length; w++)
      if (y[w] == "?" || y[w] == " ") {
        const k = y.substr(S, w - S);
        if (w > 5 && k === "xml")
          return h("InvalidXml", "XML declaration allowed only at the start of the document.", b(y, w));
        if (y[w] == "?" && y[w + 1] == ">") {
          w++;
          break;
        } else
          continue;
      }
    return w;
  }
  function i(y, w) {
    if (y.length > w + 5 && y[w + 1] === "-" && y[w + 2] === "-") {
      for (w += 3; w < y.length; w++)
        if (y[w] === "-" && y[w + 1] === "-" && y[w + 2] === ">") {
          w += 2;
          break;
        }
    } else if (y.length > w + 8 && y[w + 1] === "D" && y[w + 2] === "O" && y[w + 3] === "C" && y[w + 4] === "T" && y[w + 5] === "Y" && y[w + 6] === "P" && y[w + 7] === "E") {
      let S = 1;
      for (w += 8; w < y.length; w++)
        if (y[w] === "<")
          S++;
        else if (y[w] === ">" && (S--, S === 0))
          break;
    } else if (y.length > w + 9 && y[w + 1] === "[" && y[w + 2] === "C" && y[w + 3] === "D" && y[w + 4] === "A" && y[w + 5] === "T" && y[w + 6] === "A" && y[w + 7] === "[") {
      for (w += 8; w < y.length; w++)
        if (y[w] === "]" && y[w + 1] === "]" && y[w + 2] === ">") {
          w += 2;
          break;
        }
    }
    return w;
  }
  const s = '"', r = "'";
  function l(y, w) {
    let S = "", k = "", C = !1;
    for (; w < y.length; w++) {
      if (y[w] === s || y[w] === r)
        k === "" ? k = y[w] : k !== y[w] || (k = "");
      else if (y[w] === ">" && k === "") {
        C = !0;
        break;
      }
      S += y[w];
    }
    return k !== "" ? !1 : {
      value: S,
      index: w,
      tagClosed: C
    };
  }
  const a = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function c(y, w) {
    const S = n.getAllMatches(y, a), k = {};
    for (let C = 0; C < S.length; C++) {
      if (S[C][1].length === 0)
        return h("InvalidAttr", "Attribute '" + S[C][2] + "' has no space in starting.", v(S[C]));
      if (S[C][3] !== void 0 && S[C][4] === void 0)
        return h("InvalidAttr", "Attribute '" + S[C][2] + "' is without value.", v(S[C]));
      if (S[C][3] === void 0 && !w.allowBooleanAttributes)
        return h("InvalidAttr", "boolean attribute '" + S[C][2] + "' is not allowed.", v(S[C]));
      const M = S[C][2];
      if (!p(M))
        return h("InvalidAttr", "Attribute '" + M + "' is an invalid name.", v(S[C]));
      if (!k.hasOwnProperty(M))
        k[M] = 1;
      else
        return h("InvalidAttr", "Attribute '" + M + "' is repeated.", v(S[C]));
    }
    return !0;
  }
  function d(y, w) {
    let S = /\d/;
    for (y[w] === "x" && (w++, S = /[\da-fA-F]/); w < y.length; w++) {
      if (y[w] === ";")
        return w;
      if (!y[w].match(S))
        break;
    }
    return -1;
  }
  function u(y, w) {
    if (w++, y[w] === ";")
      return -1;
    if (y[w] === "#")
      return w++, d(y, w);
    let S = 0;
    for (; w < y.length; w++, S++)
      if (!(y[w].match(/\w/) && S < 20)) {
        if (y[w] === ";")
          break;
        return -1;
      }
    return w;
  }
  function h(y, w, S) {
    return {
      err: {
        code: y,
        msg: w,
        line: S.line || S,
        col: S.col
      }
    };
  }
  function p(y) {
    return n.isName(y);
  }
  function m(y) {
    return n.isName(y);
  }
  function b(y, w) {
    const S = y.substring(0, w).split(/\r?\n/);
    return {
      line: S.length,
      // column number is last line's length + 1, because column numbering starts at 1:
      col: S[S.length - 1].length + 1
    };
  }
  function v(y) {
    return y.startIndex + y[1].length;
  }
  return si;
}
var Xo = {}, xr;
function xf() {
  if (xr) return Xo;
  xr = 1;
  const { DANGEROUS_PROPERTY_NAMES: n, criticalProperties: e } = zn(), t = (l) => n.includes(l) ? "__" + l : l, o = {
    preserveOrder: !1,
    attributeNamePrefix: "@_",
    attributesGroupName: !1,
    textNodeName: "#text",
    ignoreAttributes: !0,
    removeNSPrefix: !1,
    // remove NS from tag name or attribute name if true
    allowBooleanAttributes: !1,
    //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseTagValue: !0,
    parseAttributeValue: !1,
    trimValues: !0,
    //Trim string values of tag and attributes
    cdataPropName: !1,
    numberParseOptions: {
      hex: !0,
      leadingZeros: !0,
      eNotation: !0
    },
    tagValueProcessor: function(l, a) {
      return a;
    },
    attributeValueProcessor: function(l, a) {
      return a;
    },
    stopNodes: [],
    //nested tags will not be parsed even for errors
    alwaysCreateTextNode: !1,
    isArray: () => !1,
    commentPropName: !1,
    unpairedTags: [],
    processEntities: !0,
    htmlEntities: !1,
    ignoreDeclaration: !1,
    ignorePiTags: !1,
    transformTagName: !1,
    transformAttributeName: !1,
    updateTag: function(l, a, c) {
      return l;
    },
    // skipEmptyListItem: false
    captureMetaData: !1,
    maxNestedTags: 100,
    strictReservedNames: !0,
    onDangerousProperty: t
  };
  function i(l, a) {
    if (typeof l != "string")
      return;
    const c = l.toLowerCase();
    if (n.some((d) => c === d.toLowerCase()))
      throw new Error(
        `[SECURITY] Invalid ${a}: "${l}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
    if (e.some((d) => c === d.toLowerCase()))
      throw new Error(
        `[SECURITY] Invalid ${a}: "${l}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
  }
  function s(l) {
    var a, c, d, u, h, p, m;
    return typeof l == "boolean" ? {
      enabled: l,
      // true or false
      maxEntitySize: 1e4,
      maxExpansionDepth: 10,
      maxTotalExpansions: 1e3,
      maxExpandedLength: 1e5,
      allowedTags: null,
      tagFilter: null
    } : typeof l == "object" && l !== null ? {
      enabled: l.enabled !== !1,
      maxEntitySize: Math.max(1, (a = l.maxEntitySize) != null ? a : 1e4),
      maxExpansionDepth: Math.max(1, (c = l.maxExpansionDepth) != null ? c : 1e4),
      maxTotalExpansions: Math.max(1, (d = l.maxTotalExpansions) != null ? d : 1 / 0),
      maxExpandedLength: Math.max(1, (u = l.maxExpandedLength) != null ? u : 1e5),
      maxEntityCount: Math.max(1, (h = l.maxEntityCount) != null ? h : 1e3),
      allowedTags: (p = l.allowedTags) != null ? p : null,
      tagFilter: (m = l.tagFilter) != null ? m : null
    } : s(!0);
  }
  const r = function(l) {
    const a = Object.assign({}, o, l), c = [
      { value: a.attributeNamePrefix, name: "attributeNamePrefix" },
      { value: a.attributesGroupName, name: "attributesGroupName" },
      { value: a.textNodeName, name: "textNodeName" },
      { value: a.cdataPropName, name: "cdataPropName" },
      { value: a.commentPropName, name: "commentPropName" }
    ];
    for (const { value: d, name: u } of c)
      d && i(d, u);
    return a.onDangerousProperty === null && (a.onDangerousProperty = t), a.processEntities = s(a.processEntities), a;
  };
  return Xo.buildOptions = r, Xo.defaultOptions = o, Xo;
}
var li, wr;
function wf() {
  if (wr) return li;
  wr = 1;
  class n {
    constructor(t) {
      this.tagname = t, this.child = [], this[":@"] = {};
    }
    add(t, o) {
      t === "__proto__" && (t = "#__proto__"), this.child.push({ [t]: o });
    }
    addChild(t) {
      t.tagname === "__proto__" && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push({ [t.tagname]: t.child, ":@": t[":@"] }) : this.child.push({ [t.tagname]: t.child });
    }
  }
  return li = n, li;
}
var ai, kr;
function kf() {
  if (kr) return ai;
  kr = 1;
  const n = zn();
  class e {
    constructor(r) {
      this.suppressValidationErr = !r, this.options = r || {};
    }
    readDocType(r, l) {
      const a = /* @__PURE__ */ Object.create(null);
      let c = 0;
      if (r[l + 3] === "O" && r[l + 4] === "C" && r[l + 5] === "T" && r[l + 6] === "Y" && r[l + 7] === "P" && r[l + 8] === "E") {
        l = l + 9;
        let d = 1, u = !1, h = !1, p = "";
        for (; l < r.length; l++)
          if (r[l] === "<" && !h) {
            if (u && o(r, "!ENTITY", l)) {
              l += 7;
              let m, b;
              if ([m, b, l] = this.readEntityExp(r, l + 1, this.suppressValidationErr), b.indexOf("&") === -1) {
                if (this.options.enabled !== !1 && this.options.maxEntityCount != null && c >= this.options.maxEntityCount)
                  throw new Error(
                    `Entity count (${c + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`
                  );
                const v = m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                a[m] = {
                  regx: RegExp(`&${v};`, "g"),
                  val: b
                }, c++;
              }
            } else if (u && o(r, "!ELEMENT", l)) {
              l += 8;
              const { index: m } = this.readElementExp(r, l + 1);
              l = m;
            } else if (u && o(r, "!ATTLIST", l))
              l += 8;
            else if (u && o(r, "!NOTATION", l)) {
              l += 9;
              const { index: m } = this.readNotationExp(r, l + 1, this.suppressValidationErr);
              l = m;
            } else if (o(r, "!--", l))
              h = !0;
            else
              throw new Error("Invalid DOCTYPE");
            d++, p = "";
          } else if (r[l] === ">") {
            if (h ? r[l - 1] === "-" && r[l - 2] === "-" && (h = !1, d--) : d--, d === 0)
              break;
          } else r[l] === "[" ? u = !0 : p += r[l];
        if (d !== 0)
          throw new Error("Unclosed DOCTYPE");
      } else
        throw new Error("Invalid Tag instead of DOCTYPE");
      return { entities: a, i: l };
    }
    readEntityExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]) && r[l] !== '"' && r[l] !== "'"; )
        a += r[l], l++;
      if (i(a), l = t(r, l), !this.suppressValidationErr) {
        if (r.substring(l, l + 6).toUpperCase() === "SYSTEM")
          throw new Error("External entities are not supported");
        if (r[l] === "%")
          throw new Error("Parameter entities are not supported");
      }
      let c = "";
      if ([l, c] = this.readIdentifierVal(r, l, "entity"), this.options.enabled !== !1 && this.options.maxEntitySize != null && c.length > this.options.maxEntitySize)
        throw new Error(
          `Entity "${a}" size (${c.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`
        );
      return l--, [a, c, l];
    }
    readNotationExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      !this.suppressValidationErr && i(a), l = t(r, l);
      const c = r.substring(l, l + 6).toUpperCase();
      if (!this.suppressValidationErr && c !== "SYSTEM" && c !== "PUBLIC")
        throw new Error(`Expected SYSTEM or PUBLIC, found "${c}"`);
      l += c.length, l = t(r, l);
      let d = null, u = null;
      if (c === "PUBLIC")
        [l, d] = this.readIdentifierVal(r, l, "publicIdentifier"), l = t(r, l), (r[l] === '"' || r[l] === "'") && ([l, u] = this.readIdentifierVal(r, l, "systemIdentifier"));
      else if (c === "SYSTEM" && ([l, u] = this.readIdentifierVal(r, l, "systemIdentifier"), !this.suppressValidationErr && !u))
        throw new Error("Missing mandatory system identifier for SYSTEM notation");
      return { notationName: a, publicIdentifier: d, systemIdentifier: u, index: --l };
    }
    readIdentifierVal(r, l, a) {
      let c = "";
      const d = r[l];
      if (d !== '"' && d !== "'")
        throw new Error(`Expected quoted string, found "${d}"`);
      for (l++; l < r.length && r[l] !== d; )
        c += r[l], l++;
      if (r[l] !== d)
        throw new Error(`Unterminated ${a} value`);
      return l++, [l, c];
    }
    readElementExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      if (!this.suppressValidationErr && !n.isName(a))
        throw new Error(`Invalid element name: "${a}"`);
      l = t(r, l);
      let c = "";
      if (r[l] === "E" && o(r, "MPTY", l))
        l += 4;
      else if (r[l] === "A" && o(r, "NY", l))
        l += 2;
      else if (r[l] === "(") {
        for (l++; l < r.length && r[l] !== ")"; )
          c += r[l], l++;
        if (r[l] !== ")")
          throw new Error("Unterminated content model");
      } else if (!this.suppressValidationErr)
        throw new Error(`Invalid Element Expression, found "${r[l]}"`);
      return {
        elementName: a,
        contentModel: c.trim(),
        index: l
      };
    }
    readAttlistExp(r, l) {
      l = t(r, l);
      let a = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        a += r[l], l++;
      i(a), l = t(r, l);
      let c = "";
      for (; l < r.length && !/\s/.test(r[l]); )
        c += r[l], l++;
      if (!i(c))
        throw new Error(`Invalid attribute name: "${c}"`);
      l = t(r, l);
      let d = "";
      if (r.substring(l, l + 8).toUpperCase() === "NOTATION") {
        if (d = "NOTATION", l += 8, l = t(r, l), r[l] !== "(")
          throw new Error(`Expected '(', found "${r[l]}"`);
        l++;
        let h = [];
        for (; l < r.length && r[l] !== ")"; ) {
          let p = "";
          for (; l < r.length && r[l] !== "|" && r[l] !== ")"; )
            p += r[l], l++;
          if (p = p.trim(), !i(p))
            throw new Error(`Invalid notation name: "${p}"`);
          h.push(p), r[l] === "|" && (l++, l = t(r, l));
        }
        if (r[l] !== ")")
          throw new Error("Unterminated list of notations");
        l++, d += " (" + h.join("|") + ")";
      } else {
        for (; l < r.length && !/\s/.test(r[l]); )
          d += r[l], l++;
        const h = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
        if (!this.suppressValidationErr && !h.includes(d.toUpperCase()))
          throw new Error(`Invalid attribute type: "${d}"`);
      }
      l = t(r, l);
      let u = "";
      return r.substring(l, l + 8).toUpperCase() === "#REQUIRED" ? (u = "#REQUIRED", l += 8) : r.substring(l, l + 7).toUpperCase() === "#IMPLIED" ? (u = "#IMPLIED", l += 7) : [l, u] = this.readIdentifierVal(r, l, "ATTLIST"), {
        elementName: a,
        attributeName: c,
        attributeType: d,
        defaultValue: u,
        index: l
      };
    }
  }
  const t = (s, r) => {
    for (; r < s.length && /\s/.test(s[r]); )
      r++;
    return r;
  };
  function o(s, r, l) {
    for (let a = 0; a < r.length; a++)
      if (r[a] !== s[l + a + 1]) return !1;
    return !0;
  }
  function i(s) {
    if (n.isName(s))
      return s;
    throw new Error(`Invalid entity name ${s}`);
  }
  return ai = e, ai;
}
var ci, Sr;
function Sf() {
  if (Sr) return ci;
  Sr = 1;
  const n = /^[-+]?0x[a-fA-F0-9]+$/, e = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, t = {
    hex: !0,
    // oct: false,
    leadingZeros: !0,
    decimalPoint: ".",
    eNotation: !0
    //skipLike: /regex/
  };
  function o(r, l = {}) {
    if (l = Object.assign({}, t, l), !r || typeof r != "string") return r;
    let a = r.trim();
    if (l.skipLike !== void 0 && l.skipLike.test(a)) return r;
    if (r === "0") return 0;
    if (l.hex && n.test(a))
      return s(a, 16);
    if (a.search(/[eE]/) !== -1) {
      const c = a.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
      if (c) {
        if (l.leadingZeros)
          a = (c[1] || "") + c[3];
        else if (!(c[2] === "0" && c[3][0] === ".")) return r;
        return l.eNotation ? Number(a) : r;
      } else
        return r;
    } else {
      const c = e.exec(a);
      if (c) {
        const d = c[1], u = c[2];
        let h = i(c[3]);
        if (!l.leadingZeros && u.length > 0 && d && a[2] !== ".") return r;
        if (!l.leadingZeros && u.length > 0 && !d && a[1] !== ".") return r;
        if (l.leadingZeros && u === r) return 0;
        {
          const p = Number(a), m = "" + p;
          return m.search(/[eE]/) !== -1 ? l.eNotation ? p : r : a.indexOf(".") !== -1 ? m === "0" && h === "" || m === h || d && m === "-" + h ? p : r : u ? h === m || d + h === m ? p : r : a === m || a === d + m ? p : r;
        }
      } else
        return r;
    }
  }
  function i(r) {
    return r && r.indexOf(".") !== -1 && (r = r.replace(/0+$/, ""), r === "." ? r = "0" : r[0] === "." ? r = "0" + r : r[r.length - 1] === "." && (r = r.substr(0, r.length - 1))), r;
  }
  function s(r, l) {
    if (parseInt) return parseInt(r, l);
    if (Number.parseInt) return Number.parseInt(r, l);
    if (window && window.parseInt) return window.parseInt(r, l);
    throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
  }
  return ci = o, ci;
}
var di, Cr;
function Ja() {
  if (Cr) return di;
  Cr = 1;
  function n(e) {
    return typeof e == "function" ? e : Array.isArray(e) ? (t) => {
      for (const o of e)
        if (typeof o == "string" && t === o || o instanceof RegExp && o.test(t))
          return !0;
    } : () => !1;
  }
  return di = n, di;
}
var ui, Er;
function Cf() {
  if (Er) return ui;
  Er = 1;
  const n = zn(), e = wf(), t = kf(), o = Sf(), i = Ja();
  class s {
    constructor(P) {
      if (this.options = P, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
        apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
        gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
        lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
        quot: { regex: /&(quot|#34|#x22);/g, val: '"' }
      }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = {
        space: { regex: /&(nbsp|#160);/g, val: " " },
        // "lt" : { regex: /&(lt|#60);/g, val: "<" },
        // "gt" : { regex: /&(gt|#62);/g, val: ">" },
        // "amp" : { regex: /&(amp|#38);/g, val: "&" },
        // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
        // "apos" : { regex: /&(apos|#39);/g, val: "'" },
        cent: { regex: /&(cent|#162);/g, val: "¢" },
        pound: { regex: /&(pound|#163);/g, val: "£" },
        yen: { regex: /&(yen|#165);/g, val: "¥" },
        euro: { regex: /&(euro|#8364);/g, val: "€" },
        copyright: { regex: /&(copy|#169);/g, val: "©" },
        reg: { regex: /&(reg|#174);/g, val: "®" },
        inr: { regex: /&(inr|#8377);/g, val: "₹" },
        num_dec: { regex: /&#([0-9]{1,7});/g, val: (I, L) => C(L, 10, "&#") },
        num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (I, L) => C(L, 16, "&#x") }
      }, this.addExternalEntities = r, this.parseXml = u, this.parseTextData = l, this.resolveNameSpace = a, this.buildAttributesMap = d, this.isItStopNode = b, this.replaceEntitiesValue = p, this.readStopNodeData = S, this.saveTextToParentTag = m, this.addChild = h, this.ignoreAttributesFn = i(this.options.ignoreAttributes), this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.options.stopNodes && this.options.stopNodes.length > 0) {
        this.stopNodesExact = /* @__PURE__ */ new Set(), this.stopNodesWildcard = /* @__PURE__ */ new Set();
        for (let I = 0; I < this.options.stopNodes.length; I++) {
          const L = this.options.stopNodes[I];
          typeof L == "string" && (L.startsWith("*.") ? this.stopNodesWildcard.add(L.substring(2)) : this.stopNodesExact.add(L));
        }
      }
    }
  }
  function r(E) {
    const P = Object.keys(E);
    for (let I = 0; I < P.length; I++) {
      const L = P[I], F = L.replace(/[.\-+*:]/g, "\\.");
      this.lastEntities[L] = {
        regex: new RegExp("&" + F + ";", "g"),
        val: E[L]
      };
    }
  }
  function l(E, P, I, L, F, N, O) {
    if (E !== void 0 && (this.options.trimValues && !L && (E = E.trim()), E.length > 0)) {
      O || (E = this.replaceEntitiesValue(E, P, I));
      const D = this.options.tagValueProcessor(P, E, I, F, N);
      return D == null ? E : typeof D != typeof E || D !== E ? D : this.options.trimValues ? k(E, this.options.parseTagValue, this.options.numberParseOptions) : E.trim() === E ? k(E, this.options.parseTagValue, this.options.numberParseOptions) : E;
    }
  }
  function a(E) {
    if (this.options.removeNSPrefix) {
      const P = E.split(":"), I = E.charAt(0) === "/" ? "/" : "";
      if (P[0] === "xmlns")
        return "";
      P.length === 2 && (E = I + P[1]);
    }
    return E;
  }
  const c = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function d(E, P, I) {
    if (this.options.ignoreAttributes !== !0 && typeof E == "string") {
      const L = n.getAllMatches(E, c), F = L.length, N = {};
      for (let O = 0; O < F; O++) {
        const D = this.resolveNameSpace(L[O][1]);
        if (this.ignoreAttributesFn(D, P))
          continue;
        let W = L[O][4], H = this.options.attributeNamePrefix + D;
        if (D.length)
          if (this.options.transformAttributeName && (H = this.options.transformAttributeName(H)), H = M(H, this.options), W !== void 0) {
            this.options.trimValues && (W = W.trim()), W = this.replaceEntitiesValue(W, I, P);
            const V = this.options.attributeValueProcessor(D, W, P);
            V == null ? N[H] = W : typeof V != typeof W || V !== W ? N[H] = V : N[H] = k(
              W,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          } else this.options.allowBooleanAttributes && (N[H] = !0);
      }
      if (!Object.keys(N).length)
        return;
      if (this.options.attributesGroupName) {
        const O = {};
        return O[this.options.attributesGroupName] = N, O;
      }
      return N;
    }
  }
  const u = function(E) {
    E = E.replace(/\r\n?/g, `
`);
    const P = new e("!xml");
    let I = P, L = "", F = "";
    this.entityExpansionCount = 0, this.currentExpandedLength = 0;
    const N = new t(this.options.processEntities);
    for (let O = 0; O < E.length; O++)
      if (E[O] === "<")
        if (E[O + 1] === "/") {
          const W = y(E, ">", O, "Closing Tag is not closed.");
          let H = E.substring(O + 2, W).trim();
          if (this.options.removeNSPrefix) {
            const ee = H.indexOf(":");
            ee !== -1 && (H = H.substr(ee + 1));
          }
          this.options.transformTagName && (H = this.options.transformTagName(H)), I && (L = this.saveTextToParentTag(L, I, F));
          const V = F.substring(F.lastIndexOf(".") + 1);
          if (H && this.options.unpairedTags.indexOf(H) !== -1)
            throw new Error(`Unpaired tag can not be used as closing tag: </${H}>`);
          let Y = 0;
          V && this.options.unpairedTags.indexOf(V) !== -1 ? (Y = F.lastIndexOf(".", F.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : Y = F.lastIndexOf("."), F = F.substring(0, Y), I = this.tagsNodeStack.pop(), L = "", O = W;
        } else if (E[O + 1] === "?") {
          let W = w(E, O, !1, "?>");
          if (!W) throw new Error("Pi Tag is not closed.");
          if (L = this.saveTextToParentTag(L, I, F), !(this.options.ignoreDeclaration && W.tagName === "?xml" || this.options.ignorePiTags)) {
            const H = new e(W.tagName);
            H.add(this.options.textNodeName, ""), W.tagName !== W.tagExp && W.attrExpPresent && (H[":@"] = this.buildAttributesMap(W.tagExp, F, W.tagName)), this.addChild(I, H, F, O);
          }
          O = W.closeIndex + 1;
        } else if (E.substr(O + 1, 3) === "!--") {
          const W = y(E, "-->", O + 4, "Comment is not closed.");
          if (this.options.commentPropName) {
            const H = E.substring(O + 4, W - 2);
            L = this.saveTextToParentTag(L, I, F), I.add(this.options.commentPropName, [{ [this.options.textNodeName]: H }]);
          }
          O = W;
        } else if (E.substr(O + 1, 2) === "!D") {
          const W = N.readDocType(E, O);
          this.docTypeEntities = W.entities, O = W.i;
        } else if (E.substr(O + 1, 2) === "![") {
          const W = y(E, "]]>", O, "CDATA is not closed.") - 2, H = E.substring(O + 9, W);
          L = this.saveTextToParentTag(L, I, F);
          let V = this.parseTextData(H, I.tagname, F, !0, !1, !0, !0);
          V == null && (V = ""), this.options.cdataPropName ? I.add(this.options.cdataPropName, [{ [this.options.textNodeName]: H }]) : I.add(this.options.textNodeName, V), O = W + 2;
        } else {
          let W = w(E, O, this.options.removeNSPrefix), H = W.tagName;
          const V = W.rawTagName;
          let Y = W.tagExp, ee = W.attrExpPresent, ce = W.closeIndex;
          if (this.options.transformTagName) {
            const se = this.options.transformTagName(H);
            Y === H && (Y = se), H = se;
          }
          if (this.options.strictReservedNames && (H === this.options.commentPropName || H === this.options.cdataPropName || H === this.options.textNodeName || H === this.options.attributesGroupName))
            throw new Error(`Invalid tag name: ${H}`);
          I && L && I.tagname !== "!xml" && (L = this.saveTextToParentTag(L, I, F, !1));
          const le = I;
          le && this.options.unpairedTags.indexOf(le.tagname) !== -1 && (I = this.tagsNodeStack.pop(), F = F.substring(0, F.lastIndexOf("."))), H !== P.tagname && (F += F ? "." + H : H);
          const ge = O;
          if (this.isItStopNode(this.stopNodesExact, this.stopNodesWildcard, F, H)) {
            let se = "";
            if (Y.length > 0 && Y.lastIndexOf("/") === Y.length - 1)
              H[H.length - 1] === "/" ? (H = H.substr(0, H.length - 1), F = F.substr(0, F.length - 1), Y = H) : Y = Y.substr(0, Y.length - 1), O = W.closeIndex;
            else if (this.options.unpairedTags.indexOf(H) !== -1)
              O = W.closeIndex;
            else {
              const q = this.readStopNodeData(E, V, ce + 1);
              if (!q) throw new Error(`Unexpected end of ${V}`);
              O = q.i, se = q.tagContent;
            }
            const de = new e(H);
            H !== Y && ee && (de[":@"] = this.buildAttributesMap(Y, F, H)), se && (se = this.parseTextData(se, H, F, !0, ee, !0, !0)), F = F.substr(0, F.lastIndexOf(".")), de.add(this.options.textNodeName, se), this.addChild(I, de, F, ge);
          } else {
            if (Y.length > 0 && Y.lastIndexOf("/") === Y.length - 1) {
              if (H[H.length - 1] === "/" ? (H = H.substr(0, H.length - 1), F = F.substr(0, F.length - 1), Y = H) : Y = Y.substr(0, Y.length - 1), this.options.transformTagName) {
                const de = this.options.transformTagName(H);
                Y === H && (Y = de), H = de;
              }
              const se = new e(H);
              H !== Y && ee && (se[":@"] = this.buildAttributesMap(Y, F, H)), this.addChild(I, se, F, ge), F = F.substr(0, F.lastIndexOf("."));
            } else if (this.options.unpairedTags.indexOf(H) !== -1) {
              const se = new e(H);
              H !== Y && ee && (se[":@"] = this.buildAttributesMap(Y, F)), this.addChild(I, se, F, ge), F = F.substr(0, F.lastIndexOf(".")), O = W.closeIndex;
              continue;
            } else {
              const se = new e(H);
              if (this.tagsNodeStack.length > this.options.maxNestedTags)
                throw new Error("Maximum nested tags exceeded");
              this.tagsNodeStack.push(I), H !== Y && ee && (se[":@"] = this.buildAttributesMap(Y, F, H)), this.addChild(I, se, F), I = se;
            }
            L = "", O = ce;
          }
        }
      else
        L += E[O];
    return P.child;
  };
  function h(E, P, I, L) {
    this.options.captureMetaData || (L = void 0);
    const F = this.options.updateTag(P.tagname, I, P[":@"]);
    F === !1 || (typeof F == "string" && (P.tagname = F), E.addChild(P, L));
  }
  const p = function(E, P, I) {
    if (E.indexOf("&") === -1)
      return E;
    const L = this.options.processEntities;
    if (!L.enabled || L.allowedTags && !L.allowedTags.includes(P) || L.tagFilter && !L.tagFilter(P, I))
      return E;
    for (let F in this.docTypeEntities) {
      const N = this.docTypeEntities[F], O = E.match(N.regx);
      if (O) {
        if (this.entityExpansionCount += O.length, L.maxTotalExpansions && this.entityExpansionCount > L.maxTotalExpansions)
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${L.maxTotalExpansions}`
          );
        const D = E.length;
        if (E = E.replace(N.regx, N.val), L.maxExpandedLength && (this.currentExpandedLength += E.length - D, this.currentExpandedLength > L.maxExpandedLength))
          throw new Error(
            `Total expanded content size exceeded: ${this.currentExpandedLength} > ${L.maxExpandedLength}`
          );
      }
    }
    if (E.indexOf("&") === -1) return E;
    for (const F of Object.keys(this.lastEntities)) {
      const N = this.lastEntities[F], O = E.match(N.regex);
      if (O && (this.entityExpansionCount += O.length, L.maxTotalExpansions && this.entityExpansionCount > L.maxTotalExpansions))
        throw new Error(
          `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${L.maxTotalExpansions}`
        );
      E = E.replace(N.regex, N.val);
    }
    if (E.indexOf("&") === -1) return E;
    if (this.options.htmlEntities)
      for (const F of Object.keys(this.htmlEntities)) {
        const N = this.htmlEntities[F], O = E.match(N.regex);
        if (O && (this.entityExpansionCount += O.length, L.maxTotalExpansions && this.entityExpansionCount > L.maxTotalExpansions))
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${L.maxTotalExpansions}`
          );
        E = E.replace(N.regex, N.val);
      }
    return E = E.replace(this.ampEntity.regex, this.ampEntity.val), E;
  };
  function m(E, P, I, L) {
    return E && (L === void 0 && (L = P.child.length === 0), E = this.parseTextData(
      E,
      P.tagname,
      I,
      !1,
      P[":@"] ? Object.keys(P[":@"]).length !== 0 : !1,
      L
    ), E !== void 0 && E !== "" && P.add(this.options.textNodeName, E), E = ""), E;
  }
  function b(E, P, I, L) {
    return !!(P && P.has(L) || E && E.has(I));
  }
  function v(E, P, I = ">") {
    let L, F = "";
    for (let N = P; N < E.length; N++) {
      let O = E[N];
      if (L)
        O === L && (L = "");
      else if (O === '"' || O === "'")
        L = O;
      else if (O === I[0])
        if (I[1]) {
          if (E[N + 1] === I[1])
            return {
              data: F,
              index: N
            };
        } else
          return {
            data: F,
            index: N
          };
      else O === "	" && (O = " ");
      F += O;
    }
  }
  function y(E, P, I, L) {
    const F = E.indexOf(P, I);
    if (F === -1)
      throw new Error(L);
    return F + P.length - 1;
  }
  function w(E, P, I, L = ">") {
    const F = v(E, P + 1, L);
    if (!F) return;
    let N = F.data;
    const O = F.index, D = N.search(/\s/);
    let W = N, H = !0;
    D !== -1 && (W = N.substring(0, D), N = N.substring(D + 1).trimStart());
    const V = W;
    if (I) {
      const Y = W.indexOf(":");
      Y !== -1 && (W = W.substr(Y + 1), H = W !== F.data.substr(Y + 1));
    }
    return {
      tagName: W,
      tagExp: N,
      closeIndex: O,
      attrExpPresent: H,
      rawTagName: V
    };
  }
  function S(E, P, I) {
    const L = I;
    let F = 1;
    for (; I < E.length; I++)
      if (E[I] === "<")
        if (E[I + 1] === "/") {
          const N = y(E, ">", I, `${P} is not closed`);
          if (E.substring(I + 2, N).trim() === P && (F--, F === 0))
            return {
              tagContent: E.substring(L, I),
              i: N
            };
          I = N;
        } else if (E[I + 1] === "?")
          I = y(E, "?>", I + 1, "StopNode is not closed.");
        else if (E.substr(I + 1, 3) === "!--")
          I = y(E, "-->", I + 3, "StopNode is not closed.");
        else if (E.substr(I + 1, 2) === "![")
          I = y(E, "]]>", I, "StopNode is not closed.") - 2;
        else {
          const N = w(E, I, ">");
          N && ((N && N.tagName) === P && N.tagExp[N.tagExp.length - 1] !== "/" && F++, I = N.closeIndex);
        }
  }
  function k(E, P, I) {
    if (P && typeof E == "string") {
      const L = E.trim();
      return L === "true" ? !0 : L === "false" ? !1 : o(E, I);
    } else
      return n.isExist(E) ? E : "";
  }
  function C(E, P, I) {
    const L = Number.parseInt(E, P);
    return L >= 0 && L <= 1114111 ? String.fromCodePoint(L) : I + E + ";";
  }
  function M(E, P) {
    if (n.criticalProperties.includes(E))
      throw new Error(`[SECURITY] Invalid name: "${E}" is a reserved JavaScript keyword that could cause prototype pollution`);
    return n.DANGEROUS_PROPERTY_NAMES.includes(E) ? P.onDangerousProperty(E) : E;
  }
  return ui = s, ui;
}
var hi = {}, Tr;
function Ef() {
  if (Tr) return hi;
  Tr = 1;
  function n(s, r) {
    return e(s, r);
  }
  function e(s, r, l) {
    let a;
    const c = {};
    for (let d = 0; d < s.length; d++) {
      const u = s[d], h = t(u);
      let p = "";
      if (l === void 0 ? p = h : p = l + "." + h, h === r.textNodeName)
        a === void 0 ? a = u[h] : a += "" + u[h];
      else {
        if (h === void 0)
          continue;
        if (u[h]) {
          let m = e(u[h], r, p);
          const b = i(m, r);
          u[":@"] ? o(m, u[":@"], p, r) : Object.keys(m).length === 1 && m[r.textNodeName] !== void 0 && !r.alwaysCreateTextNode ? m = m[r.textNodeName] : Object.keys(m).length === 0 && (r.alwaysCreateTextNode ? m[r.textNodeName] = "" : m = ""), c[h] !== void 0 && c.hasOwnProperty(h) ? (Array.isArray(c[h]) || (c[h] = [c[h]]), c[h].push(m)) : r.isArray(h, p, b) ? c[h] = [m] : c[h] = m;
        }
      }
    }
    return typeof a == "string" ? a.length > 0 && (c[r.textNodeName] = a) : a !== void 0 && (c[r.textNodeName] = a), c;
  }
  function t(s) {
    const r = Object.keys(s);
    for (let l = 0; l < r.length; l++) {
      const a = r[l];
      if (a !== ":@") return a;
    }
  }
  function o(s, r, l, a) {
    if (r) {
      const c = Object.keys(r), d = c.length;
      for (let u = 0; u < d; u++) {
        const h = c[u];
        a.isArray(h, l + "." + h, !0, !0) ? s[h] = [r[h]] : s[h] = r[h];
      }
    }
  }
  function i(s, r) {
    const { textNodeName: l } = r, a = Object.keys(s).length;
    return !!(a === 0 || a === 1 && (s[l] || typeof s[l] == "boolean" || s[l] === 0));
  }
  return hi.prettify = n, hi;
}
var fi, Mr;
function Tf() {
  if (Mr) return fi;
  Mr = 1;
  const { buildOptions: n } = xf(), e = Cf(), { prettify: t } = Ef(), o = Ka();
  class i {
    constructor(r) {
      this.externalEntities = {}, this.options = n(r);
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(r, l) {
      if (typeof r != "string") if (r.toString)
        r = r.toString();
      else
        throw new Error("XML data is accepted in String or Bytes[] form.");
      if (l) {
        l === !0 && (l = {});
        const d = o.validate(r, l);
        if (d !== !0)
          throw Error(`${d.err.msg}:${d.err.line}:${d.err.col}`);
      }
      const a = new e(this.options);
      a.addExternalEntities(this.externalEntities);
      const c = a.parseXml(r);
      return this.options.preserveOrder || c === void 0 ? c : t(c, this.options);
    }
    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(r, l) {
      if (l.indexOf("&") !== -1)
        throw new Error("Entity value can't have '&'");
      if (r.indexOf("&") !== -1 || r.indexOf(";") !== -1)
        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      if (l === "&")
        throw new Error("An entity with value '&' is not permitted");
      this.externalEntities[r] = l;
    }
  }
  return fi = i, fi;
}
var pi, Ir;
function Mf() {
  if (Ir) return pi;
  Ir = 1;
  const n = `
`;
  function e(l, a) {
    let c = "";
    return a.format && a.indentBy.length > 0 && (c = n), t(l, a, "", c);
  }
  function t(l, a, c, d) {
    let u = "", h = !1;
    if (!Array.isArray(l)) {
      if (l != null) {
        let p = l.toString();
        return p = r(p, a), p;
      }
      return "";
    }
    for (let p = 0; p < l.length; p++) {
      const m = l[p], b = o(m);
      if (b === void 0) continue;
      let v = "";
      if (c.length === 0 ? v = b : v = `${c}.${b}`, b === a.textNodeName) {
        let C = m[b];
        s(v, a) || (C = a.tagValueProcessor(b, C), C = r(C, a)), h && (u += d), u += C, h = !1;
        continue;
      } else if (b === a.cdataPropName) {
        h && (u += d), u += `<![CDATA[${m[b][0][a.textNodeName]}]]>`, h = !1;
        continue;
      } else if (b === a.commentPropName) {
        u += d + `<!--${m[b][0][a.textNodeName]}-->`, h = !0;
        continue;
      } else if (b[0] === "?") {
        const C = i(m[":@"], a), M = b === "?xml" ? "" : d;
        let E = m[b][0][a.textNodeName];
        E = E.length !== 0 ? " " + E : "", u += M + `<${b}${E}${C}?>`, h = !0;
        continue;
      }
      let y = d;
      y !== "" && (y += a.indentBy);
      const w = i(m[":@"], a), S = d + `<${b}${w}`, k = t(m[b], a, v, y);
      a.unpairedTags.indexOf(b) !== -1 ? a.suppressUnpairedNode ? u += S + ">" : u += S + "/>" : (!k || k.length === 0) && a.suppressEmptyNode ? u += S + "/>" : k && k.endsWith(">") ? u += S + `>${k}${d}</${b}>` : (u += S + ">", k && d !== "" && (k.includes("/>") || k.includes("</")) ? u += d + a.indentBy + k + d : u += k, u += `</${b}>`), h = !0;
    }
    return u;
  }
  function o(l) {
    const a = Object.keys(l);
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      if (Object.prototype.hasOwnProperty.call(l, d) && d !== ":@")
        return d;
    }
  }
  function i(l, a) {
    let c = "";
    if (l && !a.ignoreAttributes)
      for (let d in l) {
        if (!Object.prototype.hasOwnProperty.call(l, d)) continue;
        let u = a.attributeValueProcessor(d, l[d]);
        u = r(u, a), u === !0 && a.suppressBooleanAttributes ? c += ` ${d.substr(a.attributeNamePrefix.length)}` : c += ` ${d.substr(a.attributeNamePrefix.length)}="${u}"`;
      }
    return c;
  }
  function s(l, a) {
    l = l.substr(0, l.length - a.textNodeName.length - 1);
    let c = l.substr(l.lastIndexOf(".") + 1);
    for (let d in a.stopNodes)
      if (a.stopNodes[d] === l || a.stopNodes[d] === "*." + c) return !0;
    return !1;
  }
  function r(l, a) {
    if (l && l.length > 0 && a.processEntities)
      for (let c = 0; c < a.entities.length; c++) {
        const d = a.entities[c];
        l = l.replace(d.regex, d.val);
      }
    return l;
  }
  return pi = e, pi;
}
var gi, $r;
function If() {
  if ($r) return gi;
  $r = 1;
  const n = Mf(), e = Ja(), t = {
    attributeNamePrefix: "@_",
    attributesGroupName: !1,
    textNodeName: "#text",
    ignoreAttributes: !0,
    cdataPropName: !1,
    format: !1,
    indentBy: "  ",
    suppressEmptyNode: !1,
    suppressUnpairedNode: !0,
    suppressBooleanAttributes: !0,
    tagValueProcessor: function(l, a) {
      return a;
    },
    attributeValueProcessor: function(l, a) {
      return a;
    },
    preserveOrder: !1,
    commentPropName: !1,
    unpairedTags: [],
    entities: [
      { regex: new RegExp("&", "g"), val: "&amp;" },
      //it must be on top
      { regex: new RegExp(">", "g"), val: "&gt;" },
      { regex: new RegExp("<", "g"), val: "&lt;" },
      { regex: new RegExp("'", "g"), val: "&apos;" },
      { regex: new RegExp('"', "g"), val: "&quot;" }
    ],
    processEntities: !0,
    stopNodes: [],
    // transformTagName: false,
    // transformAttributeName: false,
    oneListGroup: !1
  };
  function o(l) {
    this.options = Object.assign({}, t, l), this.options.ignoreAttributes === !0 || this.options.attributesGroupName ? this.isAttribute = function() {
      return !1;
    } : (this.ignoreAttributesFn = e(this.options.ignoreAttributes), this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = r), this.processTextOrObjNode = i, this.options.format ? (this.indentate = s, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
      return "";
    }, this.tagEndChar = ">", this.newLine = "");
  }
  o.prototype.build = function(l) {
    return this.options.preserveOrder ? n(l, this.options) : (Array.isArray(l) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (l = {
      [this.options.arrayNodeName]: l
    }), this.j2x(l, 0, []).val);
  }, o.prototype.j2x = function(l, a, c) {
    let d = "", u = "";
    const h = c.join(".");
    for (let p in l)
      if (Object.prototype.hasOwnProperty.call(l, p))
        if (typeof l[p] == "undefined")
          this.isAttribute(p) && (u += "");
        else if (l[p] === null)
          this.isAttribute(p) || p === this.options.cdataPropName ? u += "" : p[0] === "?" ? u += this.indentate(a) + "<" + p + "?" + this.tagEndChar : u += this.indentate(a) + "<" + p + "/" + this.tagEndChar;
        else if (l[p] instanceof Date)
          u += this.buildTextValNode(l[p], p, "", a);
        else if (typeof l[p] != "object") {
          const m = this.isAttribute(p);
          if (m && !this.ignoreAttributesFn(m, h))
            d += this.buildAttrPairStr(m, "" + l[p]);
          else if (!m)
            if (p === this.options.textNodeName) {
              let b = this.options.tagValueProcessor(p, "" + l[p]);
              u += this.replaceEntitiesValue(b);
            } else
              u += this.buildTextValNode(l[p], p, "", a);
        } else if (Array.isArray(l[p])) {
          const m = l[p].length;
          let b = "", v = "";
          for (let y = 0; y < m; y++) {
            const w = l[p][y];
            if (typeof w != "undefined") if (w === null)
              p[0] === "?" ? u += this.indentate(a) + "<" + p + "?" + this.tagEndChar : u += this.indentate(a) + "<" + p + "/" + this.tagEndChar;
            else if (typeof w == "object")
              if (this.options.oneListGroup) {
                const S = this.j2x(w, a + 1, c.concat(p));
                b += S.val, this.options.attributesGroupName && w.hasOwnProperty(this.options.attributesGroupName) && (v += S.attrStr);
              } else
                b += this.processTextOrObjNode(w, p, a, c);
            else if (this.options.oneListGroup) {
              let S = this.options.tagValueProcessor(p, w);
              S = this.replaceEntitiesValue(S), b += S;
            } else
              b += this.buildTextValNode(w, p, "", a);
          }
          this.options.oneListGroup && (b = this.buildObjectNode(b, p, v, a)), u += b;
        } else if (this.options.attributesGroupName && p === this.options.attributesGroupName) {
          const m = Object.keys(l[p]), b = m.length;
          for (let v = 0; v < b; v++)
            d += this.buildAttrPairStr(m[v], "" + l[p][m[v]]);
        } else
          u += this.processTextOrObjNode(l[p], p, a, c);
    return { attrStr: d, val: u };
  }, o.prototype.buildAttrPairStr = function(l, a) {
    return a = this.options.attributeValueProcessor(l, "" + a), a = this.replaceEntitiesValue(a), this.options.suppressBooleanAttributes && a === "true" ? " " + l : " " + l + '="' + a + '"';
  };
  function i(l, a, c, d) {
    const u = this.j2x(l, c + 1, d.concat(a));
    return l[this.options.textNodeName] !== void 0 && Object.keys(l).length === 1 ? this.buildTextValNode(l[this.options.textNodeName], a, u.attrStr, c) : this.buildObjectNode(u.val, a, u.attrStr, c);
  }
  o.prototype.buildObjectNode = function(l, a, c, d) {
    if (l === "")
      return a[0] === "?" ? this.indentate(d) + "<" + a + c + "?" + this.tagEndChar : this.indentate(d) + "<" + a + c + this.closeTag(a) + this.tagEndChar;
    {
      let u = "</" + a + this.tagEndChar, h = "";
      return a[0] === "?" && (h = "?", u = ""), (c || c === "") && l.indexOf("<") === -1 ? this.indentate(d) + "<" + a + c + h + ">" + l + u : this.options.commentPropName !== !1 && a === this.options.commentPropName && h.length === 0 ? this.indentate(d) + `<!--${l}-->` + this.newLine : this.indentate(d) + "<" + a + c + h + this.tagEndChar + l + this.indentate(d) + u;
    }
  }, o.prototype.closeTag = function(l) {
    let a = "";
    return this.options.unpairedTags.indexOf(l) !== -1 ? this.options.suppressUnpairedNode || (a = "/") : this.options.suppressEmptyNode ? a = "/" : a = `></${l}`, a;
  }, o.prototype.buildTextValNode = function(l, a, c, d) {
    if (this.options.cdataPropName !== !1 && a === this.options.cdataPropName)
      return this.indentate(d) + `<![CDATA[${l}]]>` + this.newLine;
    if (this.options.commentPropName !== !1 && a === this.options.commentPropName)
      return this.indentate(d) + `<!--${l}-->` + this.newLine;
    if (a[0] === "?")
      return this.indentate(d) + "<" + a + c + "?" + this.tagEndChar;
    {
      let u = this.options.tagValueProcessor(a, l);
      return u = this.replaceEntitiesValue(u), u === "" ? this.indentate(d) + "<" + a + c + this.closeTag(a) + this.tagEndChar : this.indentate(d) + "<" + a + c + ">" + u + "</" + a + this.tagEndChar;
    }
  }, o.prototype.replaceEntitiesValue = function(l) {
    if (l && l.length > 0 && this.options.processEntities)
      for (let a = 0; a < this.options.entities.length; a++) {
        const c = this.options.entities[a];
        l = l.replace(c.regex, c.val);
      }
    return l;
  };
  function s(l) {
    return this.options.indentBy.repeat(l);
  }
  function r(l) {
    return l.startsWith(this.options.attributeNamePrefix) && l !== this.options.textNodeName ? l.substr(this.attrPrefixLen) : !1;
  }
  return gi = o, gi;
}
var mi, Ar;
function $f() {
  if (Ar) return mi;
  Ar = 1;
  const n = Ka(), e = Tf(), t = If();
  return mi = {
    XMLParser: e,
    XMLValidator: n,
    XMLBuilder: t
  }, mi;
}
var Af = $f();
const Ff = new Af.XMLParser({
  ignoreAttributes: !1,
  attributeNamePrefix: "@_",
  removeNSPrefix: !0,
  // 去掉命名空间前缀(a: / c: / xdr:)，统一节点名
  allowBooleanAttributes: !0,
  parseAttributeValue: !0,
  trimValues: !0,
  // 放宽实体展开上限:大表(几百个 DISPIMG 格,每个含 &quot;)会超 fxp 默认 1000 上限而抛错,
  // 导致 drawing-parser / row-meta 在大表上静默失败。本地解析可信 xlsx,放宽到足够大。
  processEntities: {
    enabled: !0,
    maxEntitySize: 1e7,
    maxTotalExpansions: 1e8,
    maxExpandedLength: 1e8,
    maxEntityCount: 1e7
  }
});
function Rf(n) {
  const e = Mt(new Uint8Array(n)), t = /* @__PURE__ */ new Map(), o = (i) => i.replace(/^\//, "");
  return {
    files: e,
    bytes(i) {
      return e[o(i)];
    },
    text(i) {
      const s = e[o(i)];
      return s ? xe(s) : void 0;
    },
    parse(i) {
      const s = o(i);
      if (t.has(s)) return t.get(s);
      const r = e[s];
      if (!r) return;
      const l = Ff.parse(xe(r));
      return t.set(s, l), l;
    },
    list(i) {
      const s = o(i);
      return Object.keys(e).filter((r) => r.startsWith(s));
    }
  };
}
function Qe(n, e) {
  var l;
  const t = e.includes("/") ? e.slice(0, e.lastIndexOf("/")) : "", o = t ? `${t}/_rels/${kn(e)}.rels` : `_rels/${kn(e)}.rels`, i = n.parse(o), s = {};
  if (!((l = i == null ? void 0 : i.Relationships) != null && l.Relationship)) return s;
  const r = pe(i.Relationships.Relationship);
  for (const a of r) {
    const c = a["@_Id"];
    let d = a["@_Target"];
    !c || !d || (a["@_TargetMode"] === "External" ? s[c] = d : s[c] = Lf(t, d));
  }
  return s;
}
function kn(n) {
  return n.slice(n.lastIndexOf("/") + 1);
}
function Lf(n, e) {
  if (e.startsWith("/")) return e.slice(1);
  const t = n ? n.split("/") : [];
  for (const o of e.split("/"))
    if (o === "..") t.pop();
    else {
      if (o === "." || o === "") continue;
      t.push(o);
    }
  return t.join("/");
}
function pe(n) {
  return n == null ? [] : Array.isArray(n) ? n : [n];
}
const bi = [
  "#FFFFFF",
  // 0 lt1 (bg1)
  "#000000",
  // 1 dk1 (tx1)
  "#E7E6E6",
  // 2 lt2 (bg2)
  "#44546A",
  // 3 dk2 (tx2)
  "#4472C4",
  // 4 accent1
  "#ED7D31",
  // 5 accent2
  "#A5A5A5",
  // 6 accent3
  "#FFC000",
  // 7 accent4
  "#5B9BD5",
  // 8 accent5
  "#70AD47",
  // 9 accent6
  "#0563C1",
  // 10 hlink
  "#954F72"
  // 11 folHlink
];
function Pf(n) {
  var e, t;
  try {
    const o = n.parse("xl/theme/theme1.xml"), i = (t = (e = o == null ? void 0 : o.theme) == null ? void 0 : e.themeElements) == null ? void 0 : t.clrScheme;
    if (!i) return [...bi];
    const s = (m) => {
      if (m) {
        if (m.srgbClr) return "#" + String(m.srgbClr["@_val"]).toUpperCase();
        if (m.sysClr) {
          const b = m.sysClr["@_lastClr"];
          if (b) return "#" + String(b).toUpperCase();
        }
      }
    }, r = s(i.dk1), l = s(i.lt1), a = s(i.dk2), c = s(i.lt2), d = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"].map(
      (m) => s(i[m])
    ), u = s(i.hlink), h = s(i.folHlink);
    return [l, r, c, a, ...d, u, h].map((m, b) => {
      var v;
      return (v = m != null ? m : bi[b]) != null ? v : "#000000";
    });
  } catch (o) {
    return [...bi];
  }
}
const Fr = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
  "#9999FF",
  "#993366",
  "#FFFFCC",
  "#CCFFFF",
  "#660066",
  "#FF8080",
  "#0066CC",
  "#CCCCFF",
  "#000080",
  "#FF00FF",
  "#FFFF00",
  "#00FFFF",
  "#800080",
  "#800000",
  "#008080",
  "#0000FF",
  "#00CCFF",
  "#CCFFFF",
  "#CCFFCC",
  "#FFFF99",
  "#99CCFF",
  "#FF99CC",
  "#CC99FF",
  "#FFCC99",
  "#3366FF",
  "#33CCCC",
  "#99CC00",
  "#FFCC00",
  "#FF9900",
  "#FF6600",
  "#666699",
  "#969696",
  "#003366",
  "#339966",
  "#003300",
  "#333300",
  "#993300",
  "#993366",
  "#333399",
  "#333333"
];
function Rr(n) {
  if (!n) return;
  let e = n.replace(/^#/, "");
  if (e.length === 8) {
    const t = parseInt(e.slice(0, 2), 16) / 255, o = parseInt(e.slice(2, 4), 16), i = parseInt(e.slice(4, 6), 16), s = parseInt(e.slice(6, 8), 16);
    return t >= 1 ? `#${e.slice(2)}` : `rgba(${o},${i},${s},${+t.toFixed(3)})`;
  }
  if (e.length === 6) return `#${e}`;
}
function Ro(n) {
  if (!n) return "";
  const e = n.trim();
  let t = /^#([0-9a-f]{3})$/i.exec(e);
  if (t) return ("#" + t[1].split("").map((i) => i + i).join("")).toUpperCase();
  if (t = /^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i.exec(e), t) return "#" + t[1].toUpperCase();
  const o = /rgba?\(([^)]+)\)/i.exec(e);
  if (o) {
    const i = o[1].split(",").map((s) => parseInt(s.trim(), 10));
    if (i.length >= 3 && i.slice(0, 3).every((s) => Number.isFinite(s))) {
      const s = (r) => Math.max(0, Math.min(255, r)).toString(16).padStart(2, "0");
      return ("#" + s(i[0]) + s(i[1]) + s(i[2])).toUpperCase();
    }
  }
  return "";
}
function Nf(n) {
  if (n >= 0 && n < Fr.length) return Fr[n];
}
function Of(n, e, t = 0) {
  const o = n[e];
  if (o)
    return t ? zf(o, t) : o;
}
function zf(n, e) {
  const t = Df(n);
  if (!t) return n;
  const o = Wf(t.r, t.g, t.b);
  let i = o.l;
  e < 0 ? i = i * (1 + e) : i = i * (1 - e) + e;
  const s = qf(o.h, o.s, Hf(i));
  return Bf(s.r, s.g, s.b);
}
function ut(n, e) {
  var t;
  if (n) {
    if (typeof n == "string") return Rr(n);
    if (typeof n.argb == "string") return Rr(n.argb);
    if (typeof n.theme == "number") return Of(e, n.theme, (t = n.tint) != null ? t : 0);
    if (typeof n.indexed == "number") return Nf(n.indexed);
  }
}
function Hf(n) {
  return Math.min(1, Math.max(0, n));
}
function Df(n) {
  const e = /^#?([0-9a-f]{6})$/i.exec(n);
  if (!e) return null;
  const t = parseInt(e[1], 16);
  return { r: t >> 16 & 255, g: t >> 8 & 255, b: t & 255 };
}
function Bf(n, e, t) {
  const o = (i) => Math.round(i).toString(16).padStart(2, "0");
  return `#${o(n)}${o(e)}${o(t)}`;
}
function Wf(n, e, t) {
  n /= 255, e /= 255, t /= 255;
  const o = Math.max(n, e, t), i = Math.min(n, e, t);
  let s = 0, r = 0;
  const l = (o + i) / 2;
  if (o !== i) {
    const a = o - i;
    switch (r = l > 0.5 ? a / (2 - o - i) : a / (o + i), o) {
      case n:
        s = (e - t) / a + (e < t ? 6 : 0);
        break;
      case e:
        s = (t - n) / a + 2;
        break;
      default:
        s = (n - e) / a + 4;
    }
    s /= 6;
  }
  return { h: s, s: r, l };
}
function qf(n, e, t) {
  let o, i, s;
  if (e === 0)
    o = i = s = t;
  else {
    const r = (c, d, u) => (u < 0 && (u += 1), u > 1 && (u -= 1), u < 0.16666666666666666 ? c + (d - c) * 6 * u : u < 0.5 ? d : u < 0.6666666666666666 ? c + (d - c) * (0.6666666666666666 - u) * 6 : c), l = t < 0.5 ? t * (1 + e) : t + e - t * e, a = 2 * t - l;
    o = r(a, l, n + 1 / 3), i = r(a, l, n), s = r(a, l, n - 1 / 3);
  }
  return { r: o * 255, g: i * 255, b: s * 255 };
}
const ws = 7, Hn = 96 / 72, Za = 9525, Qa = 8.43, ec = 15;
function Lr(n, e = ws) {
  return n == null && (n = Qa), n <= 0 ? 0 : Math.floor(n * e + 0.5) + 5;
}
function Pr(n) {
  return Math.round((n != null ? n : ec) * Hn);
}
function Lo(n) {
  return n / Za;
}
function ft(n) {
  return Math.round(n * Za);
}
const yi = {
  name: "Calibri",
  size: 11,
  bold: !1,
  italic: !1,
  underline: !1,
  strike: !1,
  color: "#000000"
};
function Uf(n, e, t) {
  const o = n.worksheets.reduce((l, a) => l + (a.rowCount || 0), 0) || 1;
  let i = 0;
  const s = t ? () => {
    i++, i % 1e3 === 0 && t({ stage: "build", ratio: Math.min(1, i / o) });
  } : void 0, r = [];
  return n.worksheets.forEach((l, a) => {
    r.push(_f(l, a, e, s));
  }), t == null || t({ stage: "build", ratio: 1 }), r;
}
function _f(n, e, t, o) {
  var N, O, D, W;
  const i = [ys()], s = /* @__PURE__ */ new Map([[JSON.stringify(i[0]), 0]]), r = /* @__PURE__ */ new Map(), l = (H) => {
    const V = JSON.stringify(H), Y = s.get(V);
    if (Y !== void 0) return Y;
    const ee = i.length;
    return i.push(H), s.set(V, ee), ee;
  };
  let a = 0, c = 0;
  n.eachRow({ includeEmpty: !0 }, (H, V) => {
    H.eachCell({ includeEmpty: !0 }, (Y, ee) => {
      const ce = V - 1, le = ee - 1, ge = tp(Y, ce, le, t, l);
      ge && (r.set(X(ce, le), ge), ce > a && (a = ce), le > c && (c = le));
    }), o == null || o();
  });
  const d = ip(n);
  for (const H of d)
    a = Math.max(a, H.bottom), c = Math.max(c, H.right);
  const u = /* @__PURE__ */ new Map(), h = n.properties || {}, p = Lr((N = h.defaultColWidth) != null ? N : Qa), m = Pr((O = h.defaultRowHeight) != null ? O : ec);
  for (let H = 1; H <= n.columnCount; H++) {
    const V = n.getColumn(H);
    V && (V.width != null || V.hidden) && u.set(H - 1, {
      width: V.width != null ? Lr(V.width) : p,
      hidden: !!V.hidden
    });
  }
  const b = /* @__PURE__ */ new Map();
  n.eachRow({ includeEmpty: !0 }, (H, V) => {
    (H.height != null || H.hidden) && b.set(V - 1, {
      height: H.height != null ? Pr(H.height) : m,
      hidden: !!H.hidden
    });
  });
  const v = n.views && n.views[0], y = {
    frozenRows: (v == null ? void 0 : v.state) === "frozen" && (D = v.ySplit) != null ? D : 0,
    frozenCols: (v == null ? void 0 : v.state) === "frozen" && (W = v.xSplit) != null ? W : 0
  }, w = (v == null ? void 0 : v.showGridLines) !== !1, S = sp(n, t), k = rp(n), { ranges: C, lists: M, rules: E } = Zf(n), P = Gf(n), I = jf(n), L = Vf(n), F = n.state === "hidden" ? "hidden" : n.state === "veryHidden" ? "veryHidden" : "visible";
  return K(R(R({
    name: n.name,
    index: e,
    state: F,
    dimension: { rows: a + 1, cols: c + 1 },
    cells: r,
    styles: i,
    merges: d,
    columns: u,
    rows: b,
    defaultColWidth: p,
    defaultRowHeight: m,
    freeze: y,
    conditional: S,
    autoFilterRange: k,
    dataValidations: C,
    dataValidationLists: M,
    dataValidationRules: E,
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    pageSetup: P
  }, I ? { sheetProtection: I } : {}), L.length ? { protectedRanges: L } : {}), {
    showGridLines: w
  });
}
function jf(n) {
  const e = n.sheetProtection;
  if (!e || !e.sheet) return;
  const t = ["selectLockedCells", "selectUnlockedCells", "formatCells", "formatColumns", "formatRows", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"], o = {};
  for (const i of t) e[i] === !0 && (o[i] = !0);
  return R({ protected: !0, raw: R({}, e) }, Object.keys(o).length ? { allow: o } : {});
}
function Vf(n) {
  var o;
  const e = n.protectedRanges || ((o = n.model) == null ? void 0 : o.protectedRanges) || [], t = [];
  for (const i of e) {
    const s = i.ref || i.sqref, r = s ? Yf(s) : void 0;
    r && t.push({ name: i.name || "区域", range: r });
  }
  return t;
}
function Yf(n) {
  const e = n.split(/\s+/)[0], t = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(e.toUpperCase());
  if (!t) return;
  const o = (a) => {
    let c = 0;
    for (const d of a) c = c * 26 + (d.charCodeAt(0) - 64);
    return c - 1;
  }, i = o(t[1]), s = parseInt(t[2], 10) - 1, r = t[3] ? o(t[3]) : i, l = t[4] ? parseInt(t[4], 10) - 1 : s;
  return { top: Math.min(s, l), left: Math.min(i, r), bottom: Math.max(s, l), right: Math.max(i, r) };
}
const Nr = {
  1: "letter",
  // Letter 8.5x11
  8: "a3",
  // A3 297x420
  9: "a4",
  // A4 210x297
  70: "a4"
  // ISO A4 (部分写法)
}, Ut = 25.4;
function Gf(n) {
  var r, l, a, c, d, u;
  const e = n.pageSetup;
  if (!e) return;
  const t = {};
  (e.orientation === "portrait" || e.orientation === "landscape") && (t.orientation = e.orientation), typeof e.paperSize == "number" && Nr[e.paperSize] && (t.paperFormat = Nr[e.paperSize]), typeof e.scale == "number" && e.scale > 0 && (t.scale = e.scale), e.fitToPage && (t.fitToPage = !0), typeof e.fitToWidth == "number" && (t.fitToWidth = e.fitToWidth), typeof e.fitToHeight == "number" && (t.fitToHeight = e.fitToHeight);
  const o = e.margins;
  if (o && typeof o == "object" && (t.margins = {
    top: ((r = o.top) != null ? r : 0.75) * Ut,
    bottom: ((l = o.bottom) != null ? l : 0.75) * Ut,
    left: ((a = o.left) != null ? a : 0.7) * Ut,
    right: ((c = o.right) != null ? c : 0.7) * Ut,
    header: ((d = o.header) != null ? d : 0.3) * Ut,
    footer: ((u = o.footer) != null ? u : 0.3) * Ut
  }), typeof e.printArea == "string" && e.printArea.trim()) {
    const h = e.printArea.split(",")[0], p = gt(ks(h));
    p && (t.printArea = p);
  }
  const i = Xf(e.printTitlesRow);
  i && (t.printTitleRows = i);
  const s = Kf(e.printTitlesColumn);
  return s && (t.printTitleCols = s), e.showGridLines === !0 && (t.printGridLines = !0), e.showRowColHeaders === !0 && (t.printHeadings = !0), Object.keys(t).length ? t : void 0;
}
function ks(n) {
  const e = n.lastIndexOf("!");
  return (e >= 0 ? n.slice(e + 1) : n).trim();
}
function Xf(n) {
  if (typeof n != "string" || !n.trim()) return;
  const e = ks(n).replace(/\$/g, ""), t = /^(\d+):(\d+)$/.exec(e);
  if (!t) return;
  const o = parseInt(t[1], 10) - 1, i = parseInt(t[2], 10) - 1;
  if (!(!Number.isFinite(o) || !Number.isFinite(i)))
    return [Math.min(o, i), Math.max(o, i)];
}
function Kf(n) {
  if (typeof n != "string" || !n.trim()) return;
  const e = ks(n).replace(/\$/g, ""), t = /^([A-Z]+):([A-Z]+)$/i.exec(e);
  if (!t) return;
  const o = ns(t[1].toUpperCase()), i = ns(t[2].toUpperCase());
  return [Math.min(o, i), Math.max(o, i)];
}
const Jf = /* @__PURE__ */ new Set(["list", "whole", "decimal", "date", "time", "textLength", "custom"]);
function Zf(n) {
  var s, r;
  const e = (s = n.dataValidations) == null ? void 0 : s.model, t = [], o = [], i = [];
  if (!e) return { ranges: t, lists: o, rules: i };
  for (const [l, a] of Object.entries(e)) {
    const c = a == null ? void 0 : a.type;
    if (!Jf.has(c)) continue;
    const d = c === "list" ? ep(a.formulae, n) : [], u = ((r = a.formulae) != null ? r : []).map(Qf);
    for (const h of l.split(/\s+/)) {
      const p = gt(h);
      p && (c === "list" && (t.push(p), d.length && o.push({ range: p, options: d })), i.push({
        range: p,
        type: c,
        operator: a.operator,
        formulae: u,
        allowBlank: !!a.allowBlank,
        // OOXML 默认 false;ExcelJS writer 仅 truthy 时写 allowBlank="1"
        options: d.length ? d : void 0,
        showErrorMessage: a.showErrorMessage,
        errorStyle: a.errorStyle,
        errorTitle: a.errorTitle,
        error: a.error,
        showInputMessage: a.showInputMessage,
        promptTitle: a.promptTitle,
        prompt: a.prompt
      }));
    }
  }
  return { ranges: t, lists: o, rules: i };
}
function Qf(n) {
  return n instanceof Date ? n.toISOString() : typeof n == "number" ? n : String(n != null ? n : "");
}
function ep(n, e) {
  var l, a;
  const t = Array.isArray(n) ? n[0] : n;
  if (typeof t != "string" || !t) return [];
  const o = t.match(new RegExp('^\\s*"(.*)"\\s*$', "s"));
  if (o) return o[1].split(",").map((c) => c.trim()).filter((c) => c !== "");
  const i = t.replace(/^=/, "").replace(/^[^!]+!/, ""), s = gt(i);
  if (!s) return [];
  const r = [];
  for (let c = s.top; c <= s.bottom; c++)
    for (let d = s.left; d <= s.right; d++) {
      const u = e.getCell(c + 1, d + 1).value;
      if (u == null) continue;
      const h = typeof u == "object" ? (a = (l = u.text) != null ? l : u.result) != null ? a : "" : u, p = String(h).trim();
      p !== "" && r.push(p);
    }
  return r;
}
function tp(n, e, t, o, i) {
  var p, m;
  const s = n.value;
  if (s == null) {
    const b = zr(n, o), v = !!(b.borders.top || b.borders.bottom || b.borders.left || b.borders.right || b.borders.diagonal), y = b.fill.type !== "none", w = Or(n.note);
    return !v && !y && !w ? null : { row: e, col: t, type: "empty", raw: null, comment: w, styleId: i(b) };
  }
  let r = "string", l = null, a, c, d;
  if (typeof s == "number")
    r = "number", l = s;
  else if (typeof s == "boolean")
    r = "boolean", l = s;
  else if (s instanceof Date)
    r = "date", l = s;
  else if (typeof s == "string")
    r = "string", l = s;
  else if (typeof s == "object") {
    const b = s;
    if (b.richText)
      r = "richtext", a = b.richText.map((v) => {
        var y;
        return {
          text: (y = v.text) != null ? y : "",
          font: v.font ? Ss(v.font, o) : void 0
        };
      }), l = a.map((v) => v.text).join("");
    else if (b.formula !== void 0 || b.sharedFormula !== void 0) {
      r = "formula", c = (p = b.formula) != null ? p : b.sharedFormula;
      const v = b.result;
      v instanceof Date ? l = v : v && typeof v == "object" && "error" in v ? l = v.error : l = v != null ? v : null;
    } else b.hyperlink !== void 0 ? (r = "hyperlink", d = b.hyperlink, l = (m = b.text) != null ? m : b.hyperlink) : b.error !== void 0 ? (r = "error", l = b.error) : l = String(b);
  }
  const u = zr(n, o), h = Or(n.note);
  return { row: e, col: t, type: r, raw: l, rich: a, formula: c, hyperlink: d, comment: h, styleId: i(u) };
}
function Or(n) {
  if (n) {
    if (typeof n == "string") return n;
    if (Array.isArray(n.texts))
      return n.texts.map((t) => {
        var o;
        return (o = t == null ? void 0 : t.text) != null ? o : "";
      }).join("") || void 0;
    if (typeof n.text == "string") return n.text;
  }
}
const op = {
  "mm-dd-yy": "yyyy/m/d",
  // 内置 14 短日期
  "m/d/yy h:mm": "yyyy/m/d h:mm"
  // 内置 22 日期+时间
};
function zr(n, e) {
  var l;
  const t = n.style || {}, o = t.alignment || {}, i = t.numFmt || "General", s = {
    font: Ss(t.font, e),
    fill: tc(t.fill, e),
    borders: oc(t.border, e),
    hAlign: o.horizontal || "general",
    vAlign: np(o.vertical),
    wrapText: !!o.wrapText,
    shrinkToFit: !!o.shrinkToFit,
    // ExcelJS: 竖排返回 'vertical' → 255(渲染器据此走竖排堆叠);其余是 -90..90
    textRotation: o.textRotation === "vertical" ? 255 : typeof o.textRotation == "number" ? o.textRotation : 0,
    indent: o.indent || 0,
    numFmt: (l = op[i]) != null ? l : i
    // 内置短日期 locale 重映射(见上)
  }, r = t.protection;
  return r && (r.locked === !1 || r.hidden === !0) && (s.protection = { locked: r.locked !== !1, hidden: !!r.hidden }), s;
}
function Ss(n, e) {
  return n ? {
    name: n.name || yi.name,
    size: n.size || yi.size,
    bold: !!n.bold,
    italic: !!n.italic,
    underline: !!n.underline,
    underlineStyle: n.underline === "double" || n.underline === "doubleAccounting" ? "double" : void 0,
    strike: !!n.strike,
    color: ut(n.color, e) || "#000000"
  } : R({}, yi);
}
function tc(n, e) {
  var t;
  if (!n || n.type === "none") return { type: "none" };
  if (n.type === "pattern") {
    const o = n.pattern;
    return o === "none" ? { type: "none" } : o === "solid" ? {
      type: "solid",
      fgColor: ut(n.fgColor, e) || ut(n.bgColor, e)
    } : {
      type: "pattern",
      pattern: o,
      fgColor: ut(n.fgColor, e),
      bgColor: ut(n.bgColor, e)
    };
  }
  if (n.type === "gradient") {
    const o = (n.stops || []).map((s) => {
      var r;
      return {
        position: (r = s.position) != null ? r : 0,
        color: ut(s.color, e) || "#FFFFFF"
      };
    }), i = typeof n.degree == "number" ? n.degree : void 0;
    return { type: "gradient", gradientStops: o, gradientAngle: i, fgColor: (t = o[0]) == null ? void 0 : t.color };
  }
  return { type: "none" };
}
function oc(n, e) {
  if (!n) return {};
  const t = (i) => i && i.style ? { style: i.style, color: ut(i.color, e) || "#000000" } : void 0, o = n.diagonal;
  return {
    top: t(n.top),
    bottom: t(n.bottom),
    left: t(n.left),
    right: t(n.right),
    diagonal: t(o),
    diagonalUp: !!(o != null && o.up),
    diagonalDown: !!(o != null && o.down)
  };
}
function np(n) {
  return n === "top" ? "top" : n === "middle" ? "middle" : "bottom";
}
function ip(n) {
  const e = n.model, t = (e == null ? void 0 : e.merges) || [], o = [];
  for (const i of t) {
    const s = gt(i);
    s && o.push(s);
  }
  return o;
}
function sp(n, e) {
  var s, r;
  const t = n.conditionalFormattings || [], o = [];
  let i = 0;
  for (const l of t) {
    const a = lp(l.ref);
    for (const c of l.rules || []) {
      const d = {
        id: `cf-p${i++}`,
        origin: "parsed",
        raw: c,
        // 原始 ExcelJS rule:overlay 未编辑时原样回写保真(含 cfvo 阈值)
        ranges: a,
        priority: (s = c.priority) != null ? s : 0,
        type: "unsupported"
      };
      switch (c.type) {
        case "cellIs":
          d.type = "cellIs", d.operator = c.operator, d.formulae = c.formulae, d.style = c.style ? vi(c.style, e) : void 0;
          break;
        case "expression":
          d.type = "expression", d.formulae = c.formulae, d.style = c.style ? vi(c.style, e) : void 0;
          break;
        case "colorScale": {
          d.type = "colorScale";
          const u = (c.color || []).map((h) => ut(h, e) || "#FFFFFF");
          u.length === 3 ? d.colorScale = { min: u[0], mid: u[1], max: u[2] } : u.length === 2 && (d.colorScale = { min: u[0], max: u[1] });
          break;
        }
        case "dataBar":
          d.type = "dataBar", d.dataBar = {
            color: ut(c.color, e) || "#638EC6",
            gradient: c.gradient !== !1
          };
          break;
        case "iconSet":
          d.type = "iconSet", d.iconSet = { name: c.iconSet || "3TrafficLights1", reverse: !!c.reverse };
          break;
        case "top10":
          d.type = "top10", d.top10 = { rank: (r = c.rank) != null ? r : 10, percent: !!c.percent, bottom: !!c.bottom }, d.style = c.style ? vi(c.style, e) : void 0;
          break;
      }
      o.push(d);
    }
  }
  return o.sort((l, a) => l.priority - a.priority);
}
function vi(n, e) {
  const t = {};
  return n.font && (t.font = Ss(n.font, e)), n.fill && (t.fill = tc(n.fill, e)), n.border && (t.borders = oc(n.border, e)), t;
}
function rp(n) {
  const e = n.autoFilter;
  if (e) {
    if (typeof e == "string") return gt(e) || void 0;
    if (e.from && e.to) {
      const t = typeof e.from == "string" ? Sn(e.from) : { row: e.from.row - 1, col: e.from.column - 1 }, o = typeof e.to == "string" ? Sn(e.to) : { row: e.to.row - 1, col: e.to.column - 1 };
      if (t && o) return { top: t.row, left: t.col, bottom: o.row, right: o.col };
    }
  }
}
function ns(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++)
    e = e * 26 + (n.charCodeAt(t) - 64);
  return e - 1;
}
function Sn(n) {
  const e = /^\$?([A-Z]+)\$?(\d+)$/.exec(n.trim());
  return e ? { col: ns(e[1]), row: parseInt(e[2], 10) - 1 } : null;
}
function gt(n) {
  const e = n.split(":"), t = Sn(e[0]), o = e[1] ? Sn(e[1]) : t;
  return !t || !o ? null : {
    top: Math.min(t.row, o.row),
    left: Math.min(t.col, o.col),
    bottom: Math.max(t.row, o.row),
    right: Math.max(t.col, o.col)
  };
}
function lp(n) {
  return n ? n.split(/\s+/).map((e) => gt(e)).filter((e) => !!e) : [];
}
function ap(n, e) {
  var a, c;
  const t = n.parse(e), o = (a = t == null ? void 0 : t.chartSpace) == null ? void 0 : a.chart;
  if (!o) return;
  const i = o.plotArea;
  if (!i) return;
  const s = cp(o), r = !!o.legend, l = [
    { key: "barChart", type: "bar" },
    { key: "bar3DChart", type: "bar" },
    { key: "lineChart", type: "line" },
    { key: "line3DChart", type: "line" },
    { key: "pieChart", type: "pie" },
    { key: "pie3DChart", type: "pie" },
    { key: "doughnutChart", type: "doughnut" },
    { key: "areaChart", type: "area" },
    { key: "area3DChart", type: "area" },
    { key: "scatterChart", type: "scatter" },
    { key: "radarChart", type: "radar" }
  ];
  for (const d of l) {
    const u = i[d.key];
    if (!u) continue;
    const h = Array.isArray(u) ? u[0] : u;
    let p = d.type, m;
    d.key.startsWith("bar") && (m = ((c = h.barDir) == null ? void 0 : c["@_val"]) === "bar" ? "bar" : "col");
    const { categories: b, series: v } = dp(h, p);
    return { type: p, title: s, showLegend: r, barDirection: m, categories: b, series: v };
  }
  return { type: "unsupported", title: s, showLegend: r, categories: [], series: [] };
}
function cp(n) {
  var i, s, r;
  const e = (s = (i = n.title) == null ? void 0 : i.tx) == null ? void 0 : s.rich;
  if (!e) return;
  const t = pe(e.p), o = [];
  for (const l of t)
    for (const a of pe(l.r))
      a.t != null && o.push(typeof a.t == "object" ? (r = a.t["#text"]) != null ? r : "" : String(a.t));
  return o.join("") || void 0;
}
function dp(n, e) {
  const t = pe(n.ser), o = [];
  let i = [];
  return t.forEach((s, r) => {
    var u, h, p, m, b, v, y, w, S, k, C, M;
    let l;
    const a = (m = (h = (u = s.tx) == null ? void 0 : u.strRef) == null ? void 0 : h.strCache) != null ? m : (p = s.tx) == null ? void 0 : p.v;
    if ((v = (b = s.tx) == null ? void 0 : b.strRef) != null && v.strCache ? l = Hr(s.tx.strRef.strCache)[0] : typeof a == "string" && (l = a), r === 0) {
      const E = s.cat;
      if (E) {
        const P = (y = E.strRef) != null && y.strCache ? Hr(E.strRef.strCache) : null, I = (w = E.numRef) != null && w.numCache ? xi(E.numRef.numCache) : null;
        i = P != null ? P : (I != null ? I : []).map((L) => L != null ? L : "");
      }
    }
    let c = [];
    if (e === "scatter") {
      const E = (k = (S = s.yVal) == null ? void 0 : S.numRef) == null ? void 0 : k.numCache;
      c = E ? xi(E) : [];
    } else {
      const E = (M = (C = s.val) == null ? void 0 : C.numRef) == null ? void 0 : M.numCache;
      c = E ? xi(E) : [];
    }
    const d = up(s);
    o.push({ name: l, values: c, color: d });
  }), { categories: i, series: o };
}
function Hr(n) {
  var o, i;
  const e = pe(n.pt), t = [];
  for (const s of e) {
    const r = Number((o = s["@_idx"]) != null ? o : t.length);
    t[r] = s.v != null ? typeof s.v == "object" ? (i = s.v["#text"]) != null ? i : "" : String(s.v) : "";
  }
  return Array.from(t, (s) => s != null ? s : "");
}
function xi(n) {
  var i, s;
  const e = pe(n.pt), t = Number((i = n["@_count"]) != null ? i : e.length), o = new Array(t).fill(null);
  for (const r of e) {
    const l = Number((s = r["@_idx"]) != null ? s : 0), a = r.v;
    o[l] = a == null || a === "" ? null : Number(a);
  }
  return o;
}
function up(n) {
  var t, o;
  const e = (t = n.spPr) == null ? void 0 : t.solidFill;
  if ((o = e == null ? void 0 : e.srgbClr) != null && o["@_val"]) return "#" + String(e.srgbClr["@_val"]).toUpperCase();
}
const hp = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function fp(n, e) {
  var r, l, a, c;
  const t = n.parse("xl/workbook.xml"), o = pe((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), i = Qe(n, "xl/workbook.xml"), s = /* @__PURE__ */ new Map();
  for (const d of o) {
    const u = d["@_name"], h = d["@_id"];
    u && h && i[h] && s.set(String(u), i[h]);
  }
  for (const d of e) {
    const u = s.get(d.name);
    if (!u) continue;
    const h = Qe(n, u), p = n.parse(u), m = (a = p == null ? void 0 : p.worksheet) == null ? void 0 : a.drawing, b = Array.isArray(m) ? (c = m[0]) == null ? void 0 : c["@_id"] : m == null ? void 0 : m["@_id"];
    if (!b || !h[b]) continue;
    const v = h[b];
    pp(n, v, d);
  }
}
function pp(n, e, t) {
  var l, a, c, d, u, h, p, m;
  const o = n.parse(e), i = o == null ? void 0 : o.wsDr;
  if (!i) return;
  const s = Qe(n, e), r = [
    ...pe(i.twoCellAnchor).map((b) => ({ a: b, kind: "two" })),
    ...pe(i.oneCellAnchor).map((b) => ({ a: b, kind: "one" }))
  ];
  for (const { a: b, kind: v } of r) {
    const y = Dr(b.from), w = v === "two" && (l = Dr(b.to)) != null ? l : void 0;
    let S, k;
    if (v === "one" && b.ext && (S = Number(b.ext["@_cx"]), k = Number(b.ext["@_cy"])), !y) continue;
    const C = { src: "", from: y, to: w, extWidthEmu: S, extHeightEmu: k }, M = b.pic;
    if (M) {
      const I = (h = (c = (a = M.blipFill) == null ? void 0 : a.blip) == null ? void 0 : c["@_embed"]) != null ? h : (u = (d = M.blipFill) == null ? void 0 : d.blip) == null ? void 0 : u["@_link"], L = I ? s[I] : void 0;
      if (L) {
        const F = mp(n, L);
        F && t.images.push(K(R({}, C), { src: "", bytes: F.bytes, mime: F.mime }));
      }
      continue;
    }
    const E = b.graphicFrame;
    if (E) {
      const I = (m = (p = E.graphic) == null ? void 0 : p.graphicData) == null ? void 0 : m.chart, L = I == null ? void 0 : I["@_id"], F = L ? s[L] : void 0;
      if (F) {
        const N = ap(n, F);
        if (N && N.type !== "unsupported") {
          const O = K(R({}, N), { anchor: C });
          t.charts.push(O);
        }
      }
      continue;
    }
    const P = b.sp;
    P && t.shapes.push(gp(P, C));
  }
}
function gp(n, e) {
  var p, m, b, v, y, w, S, k, C, M, E, P, I, L, F, N;
  const t = n.spPr || {}, o = String((m = (p = t.prstGeom) == null ? void 0 : p["@_prst"]) != null ? m : "rect"), i = o === "roundRect" ? "roundRect" : o === "ellipse" || o === "circle" ? "ellipse" : o === "rect" ? "rect" : "other", s = wi((v = (b = t.solidFill) == null ? void 0 : b.srgbClr) == null ? void 0 : v["@_val"]), r = wi((S = (w = (y = t.ln) == null ? void 0 : y.solidFill) == null ? void 0 : w.srgbClr) == null ? void 0 : S["@_val"]);
  let l = "", a, c = !1;
  const d = pe((k = n.txBody) == null ? void 0 : k.p);
  for (const O of d) {
    for (const D of pe(O.r)) {
      const W = D.t;
      l += W == null ? "" : typeof W == "object" ? (C = W["#text"]) != null ? C : "" : String(W), a || (a = wi((P = (E = (M = D.rPr) == null ? void 0 : M.solidFill) == null ? void 0 : E.srgbClr) == null ? void 0 : P["@_val"])), (((I = D.rPr) == null ? void 0 : I["@_b"]) === 1 || ((L = D.rPr) == null ? void 0 : L["@_b"]) === "1") && (c = !0);
    }
    l += `
`;
  }
  l = l.trim();
  const u = (N = (F = d[0]) == null ? void 0 : F.pPr) == null ? void 0 : N["@_algn"];
  return { anchor: e, geom: i, text: l || void 0, fillColor: s, lineColor: r, textColor: a, bold: c, align: u === "ctr" ? "center" : u === "r" ? "right" : "left" };
}
function wi(n) {
  if (n)
    return "#" + String(n).toUpperCase();
}
function Dr(n) {
  var e, t, o, i;
  return n ? {
    col: Number((e = n.col) != null ? e : 0),
    colOffEmu: Number((t = n.colOff) != null ? t : 0),
    row: Number((o = n.row) != null ? o : 0),
    rowOffEmu: Number((i = n.rowOff) != null ? i : 0)
  } : null;
}
function mp(n, e) {
  var s;
  const t = n.bytes(e);
  if (!t) return;
  const o = ((s = kn(e).split(".").pop()) == null ? void 0 : s.toLowerCase()) || "png", i = hp[o];
  if (i)
    return { bytes: t, mime: i };
}
function nc(n) {
  if (!n || n.indexOf("DISPIMG") < 0) return;
  const e = /DISPIMG\s*\(\s*"([^"]+)"/i.exec(n);
  return e ? e[1] : void 0;
}
const bp = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function yp(n, e) {
  const t = vp(n);
  let o = !1;
  for (const i of e)
    for (const s of i.cells.values()) {
      if (s.type !== "formula") continue;
      const r = nc(s.formula);
      r && (s.dispImgId = r, o = !0);
    }
  if (!(!t && !o))
    return t != null ? t : /* @__PURE__ */ new Map();
}
function vp(n) {
  var s, r, l, a, c, d, u;
  const e = n.parse("xl/cellimages.xml"), t = e == null ? void 0 : e.cellImages;
  if (!t) return;
  const o = Qe(n, "xl/cellimages.xml"), i = /* @__PURE__ */ new Map();
  for (const h of pe(t.cellImage)) {
    const p = h == null ? void 0 : h.pic;
    if (!p) continue;
    const m = (r = (s = p.nvPicPr) == null ? void 0 : s.cNvPr) == null ? void 0 : r["@_name"], b = (u = (a = (l = p.blipFill) == null ? void 0 : l.blip) == null ? void 0 : a["@_embed"]) != null ? u : (d = (c = p.blipFill) == null ? void 0 : c.blip) == null ? void 0 : d["@_link"];
    if (!m || !b) continue;
    const v = o[b];
    if (!v) continue;
    const y = xp(n, v);
    y && i.set(String(m), { id: String(m), bytes: y.bytes, mime: y.mime, src: "" });
  }
  return i.size ? i : void 0;
}
function xp(n, e) {
  var s;
  const t = n.bytes(e);
  if (!t) return;
  const o = ((s = kn(e).split(".").pop()) == null ? void 0 : s.toLowerCase()) || "png", i = bp[o];
  if (i)
    return { bytes: t, mime: i };
}
function wp(n, e) {
  var r, l, a, c;
  const t = n.parse("xl/workbook.xml"), o = pe((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), i = Qe(n, "xl/workbook.xml"), s = /* @__PURE__ */ new Map();
  for (const d of o) {
    const u = d["@_name"], h = d["@_id"];
    u && h && i[h] && s.set(String(u), i[h]);
  }
  for (const d of e) {
    const u = s.get(d.name);
    if (!u) continue;
    const h = n.parse(u), p = pe((c = (a = h == null ? void 0 : h.worksheet) == null ? void 0 : a.sheetData) == null ? void 0 : c.row);
    for (const m of p) {
      const b = m["@_customHeight"];
      if (b === 1 || b === "1" || b === !0) {
        const v = Number(m["@_r"]) - 1;
        if (!Number.isFinite(v) || v < 0) continue;
        const y = d.rows.get(v);
        y && (y.customHeight = !0);
      }
    }
  }
}
function kp(n, e) {
  var r, l;
  const t = n.parse("xl/workbook.xml"), o = pe((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), i = Qe(n, "xl/workbook.xml"), s = /* @__PURE__ */ new Map();
  for (const a of o) {
    const c = a["@_name"], d = a["@_id"];
    c && d && i[d] && s.set(String(c), i[d]);
  }
  for (const a of e) {
    const c = s.get(a.name);
    if (c)
      try {
        Sp(n, c, a);
      } catch (d) {
      }
  }
}
function Sp(n, e, t) {
  var s, r, l, a, c;
  const o = n.parse(e), i = pe((r = (s = o == null ? void 0 : o.worksheet) == null ? void 0 : s.extLst) == null ? void 0 : r.ext);
  for (const d of i) {
    const u = pe((l = d.sparklineGroups) == null ? void 0 : l.sparklineGroup);
    for (const h of u) {
      const p = String((a = h["@_type"]) != null ? a : "line"), m = p === "column" ? "column" : p === "stacked" ? "winloss" : "line", b = Wr(h.colorSeries), v = Wr(h.colorNegative);
      for (const y of pe((c = h.sparklines) == null ? void 0 : c.sparkline)) {
        const w = Br(y.f), S = Br(y.sqref);
        if (!w || !S) continue;
        const k = Ep(S);
        if (!k) continue;
        const C = Cp(t, w);
        C.length && t.sparklines.push({ row: k.row, col: k.col, type: m, values: C, color: b, negativeColor: v });
      }
    }
  }
}
function Cp(n, e) {
  const t = e.includes("!") ? e.slice(e.indexOf("!") + 1) : e, o = gt(t.replace(/\$/g, ""));
  if (!o) return [];
  const i = [];
  for (let s = o.top; s <= o.bottom; s++)
    for (let r = o.left; r <= o.right; r++) {
      const l = n.cells.get(X(s, r));
      i.push(l && typeof l.raw == "number" ? l.raw : null);
    }
  return i;
}
function Ep(n) {
  const e = n.trim().split(/\s+/)[0], t = gt(e);
  return t ? { row: t.top, col: t.left } : null;
}
function Br(n) {
  if (n != null) {
    if (typeof n == "string" || typeof n == "number") return String(n);
    if (typeof n == "object" && n["#text"] != null) return String(n["#text"]);
  }
}
function Wr(n) {
  const e = n == null ? void 0 : n["@_rgb"];
  if (!e) return;
  const t = String(e);
  return "#" + (t.length === 8 ? t.slice(2) : t).toUpperCase();
}
function Tp(n, e) {
  var r, l, a, c, d;
  const t = n.parse("xl/workbook.xml"), o = pe((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), i = Qe(n, "xl/workbook.xml"), s = /* @__PURE__ */ new Map();
  for (const u of o) {
    const h = u["@_name"], p = u["@_id"];
    h && p && i[p] && s.set(String(h), i[p]);
  }
  for (const u of e) {
    const h = s.get(u.name);
    if (h)
      try {
        const p = (a = n.parse(h)) == null ? void 0 : a.worksheet, m = pe((c = p == null ? void 0 : p.rowBreaks) == null ? void 0 : c.brk).map((v) => Number(v["@_id"])).filter((v) => Number.isFinite(v) && v > 0), b = pe((d = p == null ? void 0 : p.colBreaks) == null ? void 0 : d.brk).map((v) => Number(v["@_id"])).filter((v) => Number.isFinite(v) && v > 0);
        (m.length || b.length) && (u.pageBreaks = { rows: m, cols: b });
      } catch (p) {
      }
  }
}
function Mp(n, e) {
  var r, l;
  const t = n.parse("xl/workbook.xml"), o = pe((l = (r = t == null ? void 0 : t.workbook) == null ? void 0 : r.sheets) == null ? void 0 : l.sheet), i = Qe(n, "xl/workbook.xml"), s = /* @__PURE__ */ new Map();
  for (const a of o) {
    const c = a["@_name"], d = a["@_id"];
    c && d && i[d] && s.set(String(c), i[d]);
  }
  for (const a of e) {
    const c = s.get(a.name);
    if (c)
      try {
        Ip(n, c, a);
      } catch (d) {
      }
  }
}
function Ip(n, e, t) {
  var r;
  const o = Qe(n, e), i = /* @__PURE__ */ new Set();
  for (const l of Object.values(o))
    /pivotTables\/pivotTable\d*\.xml$/i.test(l) && i.add(l);
  const s = (r = n.parse(e)) == null ? void 0 : r.worksheet;
  for (const l of pe(s == null ? void 0 : s.pivotTableDefinition)) {
    const a = l["@_id"];
    a && o[a] && i.add(o[a]);
  }
  for (const l of i) {
    const a = $p(n, l, t);
    a && t.pivotTables.push(a);
  }
}
function $p(n, e, t) {
  var d, u, h, p;
  const o = (d = n.parse(e)) == null ? void 0 : d.pivotTableDefinition;
  if (!o) return null;
  const i = Ap(o.location);
  if (!i) return null;
  const s = Qe(n, e), r = o["@_cacheId"] != null ? Rp(n, String(o["@_cacheId"])) : void 0, l = Object.values(s).find((m) => /pivotCache\/pivotCacheDefinition\d+\.xml$/i.test(m)), a = Fp(n, l != null ? l : r), c = Lp(o, i, a, t);
  return {
    name: String((p = (h = o["@_name"]) != null ? h : (u = o["@_pivotTableStyleInfo"]) == null ? void 0 : u["@_name"]) != null ? p : "PivotTable"),
    range: i,
    fields: a,
    buttons: c
  };
}
function Ap(n) {
  const e = n == null ? void 0 : n["@_ref"];
  return e ? gt(String(e).replace(/\$/g, "")) : null;
}
function Fp(n, e) {
  var o, i, s;
  return e ? pe((s = (i = (o = n.parse(e)) == null ? void 0 : o.pivotCacheDefinition) == null ? void 0 : i.cacheFields) == null ? void 0 : s.cacheField).map((r, l) => {
    var a;
    return String((a = r == null ? void 0 : r["@_name"]) != null ? a : `字段${l + 1}`);
  }) : [];
}
function Rp(n, e) {
  var r, l;
  const t = (r = n.parse("xl/workbook.xml")) == null ? void 0 : r.workbook, i = pe((l = t == null ? void 0 : t.pivotCaches) == null ? void 0 : l.pivotCache).find((a) => String(a == null ? void 0 : a["@_cacheId"]) === e), s = i == null ? void 0 : i["@_id"];
  if (s)
    return Qe(n, "xl/workbook.xml")[s];
}
function Lp(n, e, t, o) {
  var b, v, y, w, S, k, C, M, E, P;
  const i = [], s = /* @__PURE__ */ new Set(), r = (I, L, F, N) => {
    if (I < 0 || L < 0 || I < e.top || I > e.bottom || L < e.left || L > e.right) return;
    const O = `${I}:${L}:${F}:${N}`;
    s.has(O) || (s.add(O), i.push({ row: I, col: L, label: F, kind: N }));
  };
  ki((b = n.pageFields) == null ? void 0 : b.pageField, t, "@_fld").forEach((I, L) => r(e.top + L, e.left, I, "page"));
  const a = ki((v = n.colFields) == null ? void 0 : v.field, t, "@_x"), c = ki((y = n.rowFields) == null ? void 0 : y.field, t, "@_x"), d = pe((w = n.dataFields) == null ? void 0 : w.dataField).map((I, L) => {
    var F, N;
    return String((N = (F = I == null ? void 0 : I["@_name"]) != null ? F : t[Number(I == null ? void 0 : I["@_fld"])]) != null ? N : `值${L + 1}`);
  }), u = Ko(e.top + Number((k = (S = n.location) == null ? void 0 : S["@_firstHeaderRow"]) != null ? k : 0), e.top, e.bottom), h = Ko(e.left + Number((M = (C = n.location) == null ? void 0 : C["@_firstDataCol"]) != null ? M : c.length), e.left, e.right), p = Ko(e.top + Number((P = (E = n.location) == null ? void 0 : E["@_firstDataRow"]) != null ? P : a.length + 1), e.top, e.bottom), m = Ko(p - 1, e.top, e.bottom);
  if (a.forEach((I, L) => r(u + L, h, I, "col")), c.forEach((I, L) => r(m, e.left + L, I, "row")), d.forEach((I, L) => r(m, Math.min(e.right, h + L), I, "data")), !i.length)
    for (let I = e.left; I <= e.right; I++) {
      const L = Pp(o, e.top, I);
      L && r(e.top, I, L, "field");
    }
  return i;
}
function ki(n, e, t) {
  return pe(n).map((o) => Number(o == null ? void 0 : o[t])).filter((o) => Number.isFinite(o) && o >= 0).map((o) => {
    var i;
    return (i = e[o]) != null ? i : `字段${o + 1}`;
  });
}
function Pp(n, e, t) {
  var i;
  const o = (i = n.cells.get(`${e}:${t}`)) == null ? void 0 : i.raw;
  return o == null ? "" : String(o);
}
function Ko(n, e, t) {
  return Number.isFinite(n) ? Math.max(e, Math.min(t, n)) : e;
}
async function ic(n, e) {
  var d;
  const t = n instanceof Uint8Array ? n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength) : n, o = Rf(t.slice(0)), i = Pf(o);
  e == null || e({ stage: "parse" });
  const s = (await import("./exceljs.min-Bo1tFAdV.js").then((u) => u.e)).default, r = new s.Workbook();
  await r.xlsx.load(t);
  const l = Uf(r, i, e);
  try {
    fp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] drawings 解析失败，跳过图片/图表:", u);
  }
  let a;
  try {
    a = yp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] WPS 单元格内嵌图(DISPIMG)解析失败，跳过:", u);
  }
  try {
    kp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] sparklines 解析失败，跳过迷你图:", u);
  }
  try {
    Mp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] 透视表 UI 元数据解析失败，跳过:", u);
  }
  try {
    Tp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] 分页符解析失败，跳过:", u);
  }
  try {
    wp(o, l);
  } catch (u) {
    console.warn("[ooxml-preview] 行高标记解析失败，跳过:", u);
  }
  const c = !!((d = r.properties) != null && d.date1904);
  return {
    sheets: l,
    activeSheet: 0,
    themeColors: i,
    date1904: c,
    cellImages: a
  };
}
function sc(n, e) {
  return ic(n, e);
}
function Np(n, e, t, o) {
  if (t == null || t === "") return null;
  if (typeof t == "number") return { row: n, col: e, type: "number", raw: t, styleId: o };
  if (typeof t == "boolean") return { row: n, col: e, type: "boolean", raw: t, styleId: o };
  if (t instanceof Date) return { row: n, col: e, type: "date", raw: t, styleId: o };
  const i = t;
  if (i[0] === "=") {
    const s = nc(i);
    return R({ row: n, col: e, type: "formula", raw: null, formula: i, styleId: o }, s ? { dispImgId: s } : {});
  }
  return i.trim() !== "" && !isNaN(Number(i)) ? { row: n, col: e, type: "number", raw: Number(i), styleId: o } : { row: n, col: e, type: "string", raw: i, styleId: o };
}
function io(n, e, t) {
  e + 1 > n.dimension.rows && (n.dimension.rows = e + 1), t + 1 > n.dimension.cols && (n.dimension.cols = t + 1);
}
function Et(n, e, t, o) {
  var a;
  const i = X(e, t), s = n.cells.get(i), r = (a = s == null ? void 0 : s.styleId) != null ? a : 0, l = Np(e, t, o, r);
  l ? (n.cells.set(i, l), io(n, e, t)) : n.cells.delete(i);
}
function xv(n, e, t) {
  n.cells.delete(X(e, t));
}
function Op(n, e, t, o) {
  const i = X(e, t), s = n.cells.get(i), r = o.trim();
  s ? r ? s.comment = r : (delete s.comment, s.type === "empty" && !s.comment && n.cells.delete(i)) : r && (n.cells.set(i, { row: e, col: t, type: "empty", raw: null, comment: r, styleId: 0 }), io(n, e, t));
}
function wv(n, e, t) {
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    for (let s = 0; s < i.length; s++)
      Et(n, e.top + o, e.left + s, i[s]);
  }
}
function zp(n, e, t, o) {
  const i = n.cells.get(X(e, t));
  i && (i.raw = o);
}
function qr(n, e, t, o) {
  const i = X(e, t);
  o ? (n.cells.set(i, o), io(n, e, t)) : n.cells.delete(i);
}
function Hp(n, e, t) {
  var i;
  const o = n.columns.get(e);
  n.columns.set(e, { width: Math.max(8, t), hidden: (i = o == null ? void 0 : o.hidden) != null ? i : !1 });
}
function Dp(n, e, t) {
  var i;
  const o = n.rows.get(e);
  n.rows.set(e, { height: Math.max(6, t), hidden: (i = o == null ? void 0 : o.hidden) != null ? i : !1 });
}
function Ee(n) {
  return K(R({}, n), { from: R({}, n.from), to: n.to ? R({}, n.to) : void 0, crop: n.crop ? R({}, n.crop) : void 0 });
}
function is(n, e, t) {
  const o = t != null ? t : n.images.length;
  return n.images.splice(o, 0, e), o;
}
function Bp(n, e) {
  n.images.splice(e, 1);
}
function Ur(n, e) {
  n.cells.set(X(e.row, e.col), e), io(n, e.row, e.col);
}
function Wp(n) {
  let e = n.size, t = `ID_cell_${e}`;
  for (; n.has(t); ) t = `ID_cell_${++e}`;
  return t;
}
function qp(n, e) {
  for (const t of n.sheets) for (const o of t.cells.values()) if (o.dispImgId === e) return !0;
  return !1;
}
function Si(n, e, t, o, i) {
  var a;
  const s = e.images[t];
  if (!s || !s.bytes || !s.mime) return null;
  n.cellImages || (n.cellImages = /* @__PURE__ */ new Map());
  const r = Wp(n.cellImages);
  n.cellImages.set(r, { id: r, bytes: s.bytes, mime: s.mime, src: s.src || "" });
  const l = e.cells.get(X(o, i));
  return e.cells.set(X(o, i), {
    row: o,
    col: i,
    type: "formula",
    raw: null,
    formula: `_xlfn.DISPIMG("${r}",1)`,
    dispImgId: r,
    styleId: (a = l == null ? void 0 : l.styleId) != null ? a : 0
  }), io(e, o, i), e.images.splice(t, 1), l || Cn(e, o, i, { fill: { type: "none" } }), r;
}
function _r(n, e, t, o, i = { width: 96, height: 96 }) {
  var u, h, p;
  const s = X(t, o), r = e.cells.get(s), l = r == null ? void 0 : r.dispImgId;
  if (!l) return -1;
  const a = (u = n.cellImages) == null ? void 0 : u.get(l), c = {
    src: (h = a == null ? void 0 : a.src) != null ? h : "",
    bytes: a == null ? void 0 : a.bytes,
    mime: a == null ? void 0 : a.mime,
    from: { col: o, row: t, colOffEmu: 0, rowOffEmu: 0 },
    extWidthEmu: ft(i.width),
    extHeightEmu: ft(i.height),
    editAs: "oneCell"
  };
  e.cells.delete(s);
  const d = e.images.length;
  return e.images.push(c), qp(n, l) || (p = n.cellImages) == null || p.delete(l), d;
}
function Ci(n, e, t, o) {
  const i = n.images[e];
  if (!i) return;
  const s = (r) => ft(r / o);
  i.from = { col: 0, row: 0, colOffEmu: s(t.left), rowOffEmu: s(t.top) }, i.to = void 0, i.extWidthEmu = s(t.width), i.extHeightEmu = s(t.height);
}
function Mo(n, e, t, o) {
  const i = e === "col" ? n.columns : n.rows;
  o ? i.set(t, o) : i.delete(t);
}
function ss(n, e) {
  const t = JSON.stringify(e);
  for (let o = 0; o < n.styles.length; o++) if (JSON.stringify(n.styles[o]) === t) return o;
  return n.styles.push(e), n.styles.length - 1;
}
function rs(n, e) {
  return K(R(R({}, n), e), {
    font: e.font ? R(R({}, n.font), e.font) : n.font,
    fill: e.fill ? R(R({}, n.fill), e.fill) : n.fill,
    borders: e.borders ? R(R({}, n.borders), e.borders) : n.borders,
    protection: e.protection ? R(R({}, n.protection), e.protection) : n.protection
  });
}
function Cn(n, e, t, o) {
  var a;
  const i = X(e, t), s = n.cells.get(i), r = (a = s ? n.styles[s.styleId] : n.styles[0]) != null ? a : n.styles[0];
  if (!r) return;
  const l = ss(n, rs(r, o));
  s ? s.styleId = l : (n.cells.set(i, { row: e, col: t, type: "empty", raw: null, styleId: l }), io(n, e, t));
}
const jr = 86400 * 1e3, Up = Date.UTC(1899, 11, 31), _p = Date.UTC(1904, 0, 1);
function jp(n, e = !1) {
  if (e)
    return new Date(_p + n * jr);
  let t = n;
  return t >= 60 && (t -= 1), new Date(Up + t * jr);
}
const Ei = {
  black: "#000000",
  blue: "#0000FF",
  cyan: "#00FFFF",
  green: "#008000",
  magenta: "#FF00FF",
  red: "#FF0000",
  white: "#FFFFFF",
  yellow: "#FFFF00"
}, Vp = {
  1: "#000000",
  2: "#FFFFFF",
  3: "#FF0000",
  4: "#00FF00",
  5: "#0000FF",
  6: "#FFFF00",
  7: "#FF00FF",
  8: "#00FFFF",
  10: "#008000",
  12: "#000080"
}, Vr = /* @__PURE__ */ new Map();
function to(n, e, t = !1) {
  if (n == null) return { text: "" };
  if (!e || e === "General" || e === "@" && typeof n != "string")
    return e === "@" ? { text: String(n) } : { text: Xr(n) };
  if (typeof n == "string") {
    const a = Yr(e), c = a[3] && /@/.test(a[3].raw) ? a[3] : a.find((d) => /@/.test(d.raw));
    return c ? ag(c, n) : { text: n };
  }
  if (typeof n == "boolean") return { text: n ? "TRUE" : "FALSE" };
  let o;
  n instanceof Date ? o = gg(n, t) : o = n;
  const i = Yr(e), s = Jp(i, o);
  if (!s) return { text: Xr(o) };
  if (s.hasDateTime) {
    const a = n instanceof Date ? n : jp(o, t);
    return { text: sg(s.raw, a, o), color: s.color };
  }
  const r = o < 0, l = Qp(s.raw, Math.abs(o));
  return r && !Yp(s.raw) ? { text: "-" + l, color: s.color } : { text: l, color: s.color };
}
function Yp(n) {
  return /[()-]/.test(cg(n));
}
function Yr(n) {
  const e = Vr.get(n);
  if (e) return e;
  const o = Gp(n, ";").map(Xp);
  return Vr.set(n, o), o;
}
function Gp(n, e) {
  var r;
  const t = [];
  let o = "", i = !1, s = !1;
  for (let l = 0; l < n.length; l++) {
    const a = n[l];
    if (a === "\\") {
      o += a + ((r = n[l + 1]) != null ? r : ""), l++;
      continue;
    }
    if (a === '"') {
      i = !i, o += a;
      continue;
    }
    if (!i && a === "[" && (s = !0), !i && a === "]" && (s = !1), a === e && !i && !s) {
      t.push(o), o = "";
      continue;
    }
    o += a;
  }
  return t.push(o), t;
}
function Xp(n) {
  let e, t;
  const o = n.replace(/\[([^\]]+)\]/g, (i, s) => {
    var c;
    const r = s.toLowerCase().trim();
    if (/^(h+|m+|s+)$/.test(r)) return i;
    if (Ei[r])
      return e = Ei[r], "";
    const l = /^color(\d+)$/.exec(r);
    if (l)
      return e = (c = Vp[+l[1]]) != null ? c : "#000000", "";
    const a = /^(<=|>=|<>|<|>|=)\s*(-?\d+(?:\.\d+)?)$/.exec(r);
    return a ? (t = { op: a[1], value: parseFloat(a[2]) }, "") : ((r === "red" || r === "blue") && (e = Ei[r]), "");
  });
  return {
    raw: o,
    color: e,
    condition: t,
    hasDateTime: Kp(o)
  };
}
function Kp(n) {
  const e = oo(n);
  return /(\[?[hms]+\]?|y+|d+|am\/pm|a\/p)/i.test(e) && !/E[+-]/.test(e);
}
function Jp(n, e) {
  var o, i;
  if (n.filter((s) => s.condition).length) {
    for (const s of n)
      if (s.condition && Zp(s.condition, e) || !s.condition)
        return s;
  }
  return e > 0 ? n[0] : e < 0 ? (o = n[1]) != null ? o : n[0] : (i = n[2]) != null ? i : n[0];
}
function Zp(n, e) {
  switch (n.op) {
    case "<":
      return e < n.value;
    case ">":
      return e > n.value;
    case "<=":
      return e <= n.value;
    case ">=":
      return e >= n.value;
    case "=":
      return e === n.value;
    case "<>":
      return e !== n.value;
    default:
      return !1;
  }
}
function Qp(n, e) {
  let t = e;
  const o = dg(n, "%");
  o > 0 && (t *= Math.pow(100, o));
  const i = ug(n);
  return i > 0 && (t /= Math.pow(1e3, i)), /[eE][+-]?0+/.test(oo(n)) ? og(n, t) : /[#0]*\s*[?#]+\/[?#0]+/.test(oo(n)) ? ng(n, t) : eg(n, t);
}
function eg(n, e) {
  var b;
  const t = Cs(n), o = t.indexOf("."), i = o >= 0 ? t.slice(0, o) : t, s = o >= 0 ? t.slice(o + 1) : "", r = i.includes(","), l = (s.match(/[0#?]/g) || []).length, a = hg(e, l), c = a < 0, d = Math.abs(a);
  let u = Math.floor(d).toString(), h = "";
  l > 0 && (h = (b = d.toFixed(l).split(".")[1]) != null ? b : "", h = fg(h, s));
  const p = (i.match(/0/g) || []).length;
  return u.length < p && (u = u.padStart(p, "0")), u === "0" && (i.match(/[0#]/g) || []).length === 0 && (u = ""), r && (u = pg(u)), tg(n, (c ? "-" : "") + u + (h ? "." + h : ""));
}
function tg(n, e) {
  var r;
  const t = /[0#?]/.test(Cs(n));
  let o = "", i = !t, s = 0;
  for (; s < n.length; ) {
    const l = n[s];
    if (l === "\\") {
      o += (r = n[s + 1]) != null ? r : "", s += 2;
      continue;
    }
    if (l === '"') {
      const a = n.indexOf('"', s + 1);
      o += n.slice(s + 1, a < 0 ? n.length : a), s = a < 0 ? n.length : a + 1;
      continue;
    }
    if (l === "_") {
      o += " ", s += 2;
      continue;
    }
    if (l === "*") {
      s += 2;
      continue;
    }
    if (l === "[") {
      const a = n.indexOf("]", s);
      s = a < 0 ? n.length : a + 1;
      continue;
    }
    if (l === "%" || l === ",") {
      l === "%" && (o += "%"), s++;
      continue;
    }
    if (l === "0" || l === "#" || l === "?" || l === ".") {
      for (i || (o += e, i = !0); s < n.length && "0#?.,".includes(n[s]); ) s++;
      continue;
    }
    o += l, s++;
  }
  return i || (o += e), o;
}
function og(n, e) {
  const t = /([0#.,]+)[eE]([+-]?)(0+)/.exec(oo(n)), o = t ? ((t[1].split(".")[1] || "").match(/[0#]/g) || []).length : 2, i = t ? t[2] : "+";
  let s = e.toExponential(o);
  return s = s.replace("e", "E"), i === "+" && (s = s.replace("E", "E+").replace("E+-", "E-").replace("E++", "E+")), s.replace(/E([+-])(\d+)/, (r, l, a) => `E${l}${a.padStart(t ? t[3].length : 2, "0")}`);
}
function ng(n, e) {
  const t = e < 0, o = Math.abs(e), i = Math.floor(o), s = o - i;
  if (s < 1e-9) return (t ? "-" : "") + i.toString();
  const [r, l] = ig(s, 99), a = t ? "-" : "";
  return i > 0 ? `${a}${i} ${r}/${l}` : `${a}${r}/${l}`;
}
function ig(n, e) {
  let t = 0, o = 1, i = Math.abs(n);
  for (let s = 1; s <= e; s++) {
    const r = Math.round(n * s), l = Math.abs(n - r / s);
    if (l < i && (i = l, t = r, o = s, l < 1e-9))
      break;
  }
  return [t, o];
}
const Ti = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Gr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function sg(n, e, t) {
  const o = lg(n), i = e.getUTCFullYear(), s = e.getUTCMonth() + 1, r = e.getUTCDate(), l = e.getUTCHours(), a = e.getUTCMinutes(), c = e.getUTCSeconds(), d = e.getUTCDay(), u = o.some((b) => /am\/pm|a\/p/i.test(b)), h = l % 12 || 12;
  let p = "", m = !1;
  for (let b = 0; b < o.length; b++) {
    const v = o[b], y = v.toLowerCase(), w = rg(o, b), S = /^[a-z[]/.test(y);
    switch (!0) {
      case y === "yyyy":
        p += String(i).padStart(4, "0");
        break;
      case y === "yy":
        p += String(i % 100).padStart(2, "0");
        break;
      case y === "mmmm":
        p += Ti[s - 1];
        break;
      case y === "mmm":
        p += Ti[s - 1].slice(0, 3);
        break;
      case y === "mmmmm":
        p += Ti[s - 1][0];
        break;
      case (y === "mm" && !m && !w):
        p += String(s).padStart(2, "0");
        break;
      case (y === "m" && !m && !w):
        p += String(s);
        break;
      case y === "mm":
        p += String(a).padStart(2, "0");
        break;
      // 跟在小时/秒前 → 分钟
      case y === "m":
        p += String(a);
        break;
      case y === "dddd":
        p += Gr[d];
        break;
      case y === "ddd":
        p += Gr[d].slice(0, 3);
        break;
      case y === "dd":
        p += String(r).padStart(2, "0");
        break;
      case y === "d":
        p += String(r);
        break;
      case y === "hh":
        p += String(u ? h : l).padStart(2, "0");
        break;
      case y === "h":
        p += String(u ? h : l);
        break;
      case /^\[h+\]$/.test(y):
        p += String(Math.floor(t * 24));
        break;
      case /^\[m+\]$/.test(y):
        p += String(Math.floor(t * 24 * 60));
        break;
      case /^\[s+\]$/.test(y):
        p += String(Math.floor(t * 86400));
        break;
      case y === "ss":
        p += String(c).padStart(2, "0");
        break;
      case y === "s":
        p += String(c);
        break;
      case /am\/pm/i.test(y):
        p += l < 12 ? "AM" : "PM";
        break;
      case /a\/p/i.test(y):
        p += l < 12 ? "A" : "P";
        break;
      default:
        p += v;
    }
    S && (m = /^h+$/.test(y) || /^\[h+\]$/.test(y));
  }
  return p;
}
function rg(n, e) {
  for (let t = e + 1; t < n.length; t++) {
    const o = n[t].toLowerCase();
    if (/^[a-z[]/.test(o)) return /^s+$/.test(o) || /^\[s+\]$/.test(o);
  }
  return !1;
}
function lg(n) {
  var o;
  const e = [];
  let t = 0;
  for (; t < n.length; ) {
    const i = n[t];
    if (i === "\\") {
      e.push((o = n[t + 1]) != null ? o : ""), t += 2;
      continue;
    }
    if (i === '"') {
      const s = n.indexOf('"', t + 1);
      e.push(n.slice(t + 1, s < 0 ? n.length : s)), t = s < 0 ? n.length : s + 1;
      continue;
    }
    if (i === "[") {
      const s = n.indexOf("]", t);
      e.push(n.slice(t, s < 0 ? n.length : s + 1)), t = s < 0 ? n.length : s + 1;
      continue;
    }
    if (/[a-z]/i.test(i)) {
      if (n.slice(t, t + 5).toLowerCase() === "am/pm") {
        e.push(n.slice(t, t + 5)), t += 5;
        continue;
      }
      if (n.slice(t, t + 3).toLowerCase() === "a/p") {
        e.push(n.slice(t, t + 3)), t += 3;
        continue;
      }
      let s = t;
      for (; s < n.length && n[s].toLowerCase() === i.toLowerCase(); ) s++;
      e.push(n.slice(t, s)), t = s;
      continue;
    }
    e.push(i), t++;
  }
  return e;
}
function ag(n, e) {
  var i;
  let t = "";
  const o = n.raw;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (r === "@")
      t += e;
    else if (r === '"') {
      const l = o.indexOf('"', s + 1);
      t += o.slice(s + 1, l < 0 ? o.length : l), s = l < 0 ? o.length : l;
    } else r === "\\" ? (t += (i = o[s + 1]) != null ? i : "", s++) : t += r;
  }
  return { text: t, color: n.color };
}
function Xr(n) {
  if (typeof n == "number") {
    if (Number.isInteger(n)) return String(n);
    let e = n.toPrecision(11);
    return e.includes(".") && (e = e.replace(/0+$/, "").replace(/\.$/, "")), (Math.abs(n) >= 1e11 || Math.abs(n) < 1e-4 && n !== 0) && (e = n.toExponential()), e;
  }
  return n instanceof Date ? n.toISOString() : String(n);
}
function oo(n) {
  return n.replace(/"[^"]*"/g, "").replace(/\\./g, "");
}
function cg(n) {
  return oo(n).replace(/\[[^\]]*\]/g, "");
}
function Cs(n) {
  let e = "";
  for (let t = 0; t < n.length; t++) {
    const o = n[t];
    if (o === "\\") {
      t++;
      continue;
    }
    if (o === '"') {
      const i = n.indexOf('"', t + 1);
      t = i < 0 ? n.length : i;
      continue;
    }
    if (o === "[") {
      const i = n.indexOf("]", t);
      t = i < 0 ? n.length : i;
      continue;
    }
    if (o === "_" || o === "*") {
      t++;
      continue;
    }
    "0#?.,".includes(o) && (e += o);
  }
  return e;
}
function dg(n, e) {
  return (oo(n).match(new RegExp("\\" + e, "g")) || []).length;
}
function ug(n) {
  const e = Cs(n), t = /[0#?](,+)$/.exec(e);
  return t ? t[1].length : 0;
}
function hg(n, e) {
  const t = Math.pow(10, e);
  return Math.round((n + Number.EPSILON) * t) / t;
}
function fg(n, e) {
  const t = e.match(/[0#?]/g) || [];
  let o = n.split("");
  for (let i = o.length - 1; i >= 0 && (t[i] === "#" && o[i] === "0"); i--)
    o.pop();
  return o.join("");
}
function pg(n) {
  const e = n.startsWith("-"), o = (e ? n.slice(1) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (e ? "-" : "") + o;
}
function gg(n, e) {
  const o = e ? Date.UTC(1904, 0, 1) : Date.UTC(1899, 11, 31);
  let i = (n.getTime() - o) / 864e5;
  return !e && i >= 60 && (i += 1), i;
}
function Es(n, e, t) {
  return !n || n.type === "empty" ? "" : n.type === "richtext" && n.rich ? n.rich.map((o) => o.text).join("") : to(n.raw, e == null ? void 0 : e.numFmt, t).text;
}
function Ts(n, e, t) {
  return n.cells.get(X(e, t));
}
function ct(n, e, t) {
  const o = Ts(n, e, t);
  return !o || o.type === "empty" ? null : o.raw;
}
function mg(n, e, t) {
  const o = Ts(n, e, t);
  if (o)
    return n.styles[o.styleId];
}
function De(n, e, t, o = !1) {
  const i = Ts(n, e, t);
  return Es(i, i ? n.styles[i.styleId] : void 0, o);
}
function Ms(n) {
  const e = /* @__PURE__ */ new Set();
  for (const t of n)
    for (let o = t.top; o <= t.bottom; o++)
      for (let i = t.left; i <= t.right; i++)
        o === t.top && i === t.left || e.add(X(o, i));
  return e;
}
function En(n, e, t, o, i, s) {
  return s && s.has(X(e, t)) ? o ? "" : null : o ? De(n, e, t, i) : ct(n, e, t);
}
function rc(n, e = {}) {
  var r, l;
  const t = (r = e.format) != null ? r : !0, o = (l = e.date1904) != null ? l : !1, i = Ms(n.merges), s = [];
  for (let a = 0; a < n.dimension.rows; a++) {
    const c = [];
    for (let d = 0; d < n.dimension.cols; d++) c.push(En(n, a, d, t, o, i));
    s.push(c);
  }
  return s;
}
function bg(n, e, t = {}) {
  var l, a;
  const o = (l = t.format) != null ? l : !0, i = (a = t.date1904) != null ? a : !1, s = Ms(n.merges), r = [];
  for (let c = e.top; c <= e.bottom; c++) {
    const d = [];
    for (let u = e.left; u <= e.right; u++) d.push(En(n, c, u, o, i, s));
    r.push(d);
  }
  return r;
}
function lc(n, e = {}) {
  var c, d, u;
  const t = (c = e.format) != null ? c : !0, o = (d = e.date1904) != null ? d : !1, i = (u = e.headerRow) != null ? u : 0, s = n.dimension.cols, r = Ms(n.merges), l = [];
  for (let h = 0; h < s; h++) {
    const p = En(n, i, h, !0, o, r);
    l.push(p || Pe(h));
  }
  const a = [];
  for (let h = i + 1; h < n.dimension.rows; h++) {
    let p = !0;
    const m = {};
    for (let b = 0; b < s; b++) {
      const v = En(n, h, b, t, o, r);
      v !== null && v !== "" && (p = !1), m[l[b]] = v;
    }
    p || a.push(m);
  }
  return a;
}
function yg(n, e = {}) {
  const t = {};
  for (const o of n.sheets)
    o.state === "visible" && (t[o.name] = lc(o, K(R({}, e), { date1904: n.date1904 })));
  return t;
}
function zo(n) {
  return K(R({}, n), {
    raw: n.raw instanceof Date ? new Date(n.raw.getTime()) : n.raw,
    rich: n.rich ? n.rich.map((e) => K(R({}, e), { font: e.font ? R({}, e.font) : void 0 })) : void 0
  });
}
function ze(n, e, t, o) {
  const i = n.cells.get(X(e, t)), s = mg(n, e, t), r = i && i.type !== "empty" ? i.raw : null, l = Es(i, s, o), a = i != null && i.formula ? i.formula[0] === "=" ? i.formula : "=" + i.formula : typeof r == "number" ? String(r) : typeof r == "boolean" ? r ? "TRUE" : "FALSE" : l;
  return {
    row: e,
    col: t,
    cell: i ? zo(i) : null,
    style: s,
    raw: r,
    computed: r,
    // 当前 = raw;E4 引擎结果也写回 raw,语义不变
    text: l,
    editText: a
  };
}
function kv(n) {
  return {
    cells: new Map([...n.cells].map(([e, t]) => [e, zo(t)])),
    merges: n.merges.map((e) => R({}, e)),
    rows: new Map([...n.rows].map(([e, t]) => [e, R({}, t)])),
    columns: new Map([...n.columns].map(([e, t]) => [e, R({}, t)])),
    images: n.images.map(Ee),
    dimension: R({}, n.dimension)
  };
}
function Sv(n, e) {
  n.cells = new Map([...e.cells].map(([t, o]) => [t, zo(o)])), n.merges = e.merges.map((t) => R({}, t)), n.rows = new Map([...e.rows].map(([t, o]) => [t, R({}, o)])), n.columns = new Map([...e.columns].map(([t, o]) => [t, R({}, o)])), n.images = e.images.map(Ee), n.dimension = R({}, e.dimension);
}
function Dn(n, e, t, o) {
  const i = /* @__PURE__ */ new Map();
  for (const [s, r] of n)
    if (o === "insert")
      i.set(s >= e ? s + t : s, r);
    else {
      if (s >= e && s < e + t) continue;
      i.set(s >= e + t ? s - t : s, r);
    }
  return i;
}
function vg(n, e, t) {
  if (t <= 0) return;
  const o = /* @__PURE__ */ new Map();
  for (const i of n.cells.values())
    i.row >= e && (i.row += t), o.set(X(i.row, i.col), i);
  n.cells = o;
  for (const i of n.merges)
    i.top >= e ? (i.top += t, i.bottom += t) : i.bottom >= e && (i.bottom += t);
  n.rows = Dn(n.rows, e, t, "insert");
  for (const i of n.images)
    i.from.row >= e && (i.from.row += t), i.to && i.to.row >= e && (i.to.row += t);
  n.dimension.rows += t;
}
function ac(n, e, t) {
  if (t <= 0) return;
  const o = e + t, i = /* @__PURE__ */ new Map();
  for (const s of n.cells.values())
    s.row >= e && s.row < o || (s.row >= o && (s.row -= t), i.set(X(s.row, s.col), s));
  n.cells = i, n.merges = n.merges.filter((s) => s.bottom < e ? !0 : s.top >= o ? (s.top -= t, s.bottom -= t, !0) : !1), n.rows = Dn(n.rows, e, t, "delete");
  for (const s of n.images)
    s.from.row >= o ? s.from.row -= t : s.from.row >= e && (s.from.row = e), s.to && (s.to.row >= o ? s.to.row -= t : s.to.row >= e && (s.to.row = e));
  n.dimension.rows = Math.max(0, n.dimension.rows - t);
}
function xg(n, e, t) {
  if (t <= 0) return;
  const o = /* @__PURE__ */ new Map();
  for (const i of n.cells.values())
    i.col >= e && (i.col += t), o.set(X(i.row, i.col), i);
  n.cells = o;
  for (const i of n.merges)
    i.left >= e ? (i.left += t, i.right += t) : i.right >= e && (i.right += t);
  n.columns = Dn(n.columns, e, t, "insert");
  for (const i of n.images)
    i.from.col >= e && (i.from.col += t), i.to && i.to.col >= e && (i.to.col += t);
  n.dimension.cols += t;
}
function wg(n, e, t) {
  if (t <= 0) return;
  const o = e + t, i = /* @__PURE__ */ new Map();
  for (const s of n.cells.values())
    s.col >= e && s.col < o || (s.col >= o && (s.col -= t), i.set(X(s.row, s.col), s));
  n.cells = i, n.merges = n.merges.filter((s) => s.right < e ? !0 : s.left >= o ? (s.left -= t, s.right -= t, !0) : !1), n.columns = Dn(n.columns, e, t, "delete");
  for (const s of n.images)
    s.from.col >= o ? s.from.col -= t : s.from.col >= e && (s.from.col = e), s.to && (s.to.col >= o ? s.to.col -= t : s.to.col >= e && (s.to.col = e));
  n.dimension.cols = Math.max(0, n.dimension.cols - t);
}
function kg(n, e, t, o) {
  e === "insert-rows" ? vg(n, t, o) : e === "delete-rows" ? ac(n, t, o) : e === "insert-cols" ? xg(n, t, o) : wg(n, t, o);
}
function Kr(n, e, t, o) {
  const i = t + o;
  return n.merges.some(
    (s) => e === "delete-rows" ? s.top < i && s.bottom >= t && (s.top < t || s.bottom >= i) : s.left < i && s.right >= t && (s.left < t || s.right >= i)
  );
}
const Sg = 50, Cg = 100;
function Eg(n) {
  var r;
  const e = Math.min(n.dimension.rows, Sg), t = Math.min(n.dimension.cols, Cg);
  if (e <= 0 || t <= 0) return 1;
  const o = /* @__PURE__ */ new Set();
  for (const l of (r = n.merges) != null ? r : [])
    for (let a = l.top; a <= l.bottom; a++)
      for (let c = l.left; c <= l.right; c++)
        (a !== l.top || c !== l.left) && o.add(X(a, c));
  const i = new Array(e).fill(0);
  let s = 0;
  for (let l = 0; l < e; l++) {
    let a = 0;
    for (let c = 0; c < t; c++) {
      if (o.has(X(l, c))) continue;
      const d = n.cells.get(X(l, c));
      d && d.type !== "empty" && a++;
    }
    i[l] = a, a > s && (s = a);
  }
  if (s === 0) return 1;
  for (let l = 0; l < e; l++)
    if (i[l] >= s) return l + 1;
  return 1;
}
function Ie(n, e) {
  var a, c;
  const t = n.zoom, o = (d) => Lo(d) * t, i = n.colLeft(e.from.col) + o(e.from.colOffEmu), s = n.rowTop(e.from.row) + o(e.from.rowOffEmu);
  let r, l;
  if (e.to) {
    const d = n.colLeft(e.to.col) + o(e.to.colOffEmu), u = n.rowTop(e.to.row) + o(e.to.rowOffEmu);
    r = Math.max(1, d - i), l = Math.max(1, u - s);
  } else
    r = o((a = e.extWidthEmu) != null ? a : 0) || 120 * t, l = o((c = e.extHeightEmu) != null ? c : 0) || 90 * t;
  return { left: i, top: s, width: r, height: l };
}
function _t(n) {
  if (typeof n == "number") return [n];
  if (Array.isArray(n)) return n.slice();
  const e = Math.min(n.from, n.to), t = Math.max(n.from, n.to), o = [];
  for (let i = e; i <= t; i++) o.push(i);
  return o;
}
function vt(n, e, t, o) {
  if (!o.editable) return !1;
  if (!o.strictDimensions || o.editableTargets === void 0) return !0;
  const i = n.dimension;
  if (e === "col") {
    for (let s = 0; s < i.rows; s++)
      if (ls(n, s, t, o)) return !0;
    return !1;
  } else {
    for (let s = 0; s < i.cols; s++)
      if (ls(n, t, s, o)) return !0;
    return !1;
  }
}
function Is(n, e, t) {
  return n >= t.top && n <= t.bottom && e >= t.left && e <= t.right;
}
function cc(n, e, t) {
  var s;
  const o = n.cells.get(X(e, t)), i = o ? n.styles[o.styleId] : n.styles[0];
  return ((s = i == null ? void 0 : i.protection) == null ? void 0 : s.locked) !== !1;
}
function Tg(n, e, t) {
  var i;
  if (!((i = n.sheetProtection) != null && i.protected)) return !1;
  const o = n.protectedRanges;
  if (o) {
    for (const s of o) if (Is(e, t, s.range)) return !1;
  }
  return cc(n, e, t);
}
function Mg(n, e, t) {
  if ("top" in t && "left" in t && "bottom" in t && "right" in t)
    return Is(n, e, t);
  const o = "row" in t && typeof t.row == "number", i = "col" in t && typeof t.col == "number";
  if (o && i) {
    const s = t;
    return n === s.row && e === s.col;
  }
  return o ? n === t.row : i ? e === t.col : !1;
}
function ls(n, e, t, o) {
  var i;
  if (!o.editable) return !1;
  if (o.editableTargets !== void 0) {
    const s = Array.isArray(o.editableTargets) ? o.editableTargets : [o.editableTargets];
    let r = !1;
    for (const l of s)
      if (Mg(e, t, l)) {
        r = !0;
        break;
      }
    if (!r) return !1;
  }
  if (o.readOnlyRanges) {
    for (const s of o.readOnlyRanges) if (Is(e, t, s)) return !1;
  }
  if (o.cellReadOnly) {
    const s = (i = n.cells.get(X(e, t))) != null ? i : null;
    if (o.cellReadOnly(s, { row: e, col: t })) return !1;
  }
  return !Tg(n, e, t);
}
function Ig(n) {
  var e;
  return K(R({}, n), {
    // 共享不可变重负载:charts/shapes/sparklines/conditional/dataValidations/pageSetup/name…
    cells: new Map(Array.from(n.cells, ([t, o]) => [t, zo(o)])),
    merges: n.merges.map((t) => R({}, t)),
    rows: new Map(Array.from(n.rows, ([t, o]) => [t, R({}, o)])),
    columns: new Map(Array.from(n.columns, ([t, o]) => [t, R({}, o)])),
    images: n.images.map(Ee),
    // 新锚点对象、共享 bytes(不可变)
    dimension: R({}, n.dimension),
    freeze: R({}, n.freeze),
    // 保护(审阅选项卡):显式列出这两键(即便 undefined),让 restoreWorkbookInto 的 Object.assign
    // 能在 undo「已保护 → 未保护」时清掉 live 上的键(缺键 spread 不产生键 → 无法清除)
    sheetProtection: n.sheetProtection ? K(R({}, n.sheetProtection), { allow: n.sheetProtection.allow ? R({}, n.sheetProtection.allow) : void 0, raw: n.sheetProtection.raw }) : void 0,
    protectedRanges: n.protectedRanges ? n.protectedRanges.map((t) => K(R({}, t), { range: R({}, t.range) })) : void 0,
    styles: n.styles.slice(),
    // 新数组(防 internStyle 追加污染快照);style 对象共享(编辑不原地改)
    pivotTables: ((e = n.pivotTables) != null ? e : []).map((t) => {
      var o, i;
      return K(R({}, t), {
        range: R({}, t.range),
        fields: t.fields.slice(),
        buttons: t.buttons.map((s) => R({}, s)),
        source: t.source ? { sheetIndex: t.source.sheetIndex, range: R({}, t.source.range) } : void 0,
        layout: t.layout ? {
          filters: t.layout.filters.map((s) => {
            var r;
            return K(R({}, s), { values: (r = s.values) == null ? void 0 : r.slice() });
          }),
          columns: t.layout.columns.slice(),
          rows: t.layout.rows.slice(),
          values: t.layout.values.map((s) => R({}, s))
        } : void 0,
        collapsed: (o = t.collapsed) == null ? void 0 : o.slice(),
        rowGroups: (i = t.rowGroups) == null ? void 0 : i.map((s) => R({}, s))
      });
    })
  });
}
function we(n) {
  return K(R({}, n), {
    sheets: n.sheets.map(Ig),
    themeColors: n.themeColors.slice(),
    // WPS 内嵌图登记表:新 Map(防转换增删污染快照),CellImage 不可变 → 按引用共享
    cellImages: n.cellImages ? new Map(n.cellImages) : void 0,
    // 工作簿保护(审阅选项卡):新对象供 undo 独立还原(缺省 undefined)
    protection: n.protection ? R({}, n.protection) : void 0
  });
}
function Jr(n, e) {
  const t = we(e);
  for (let o = 0; o < n.sheets.length && o < t.sheets.length; o++)
    Object.assign(n.sheets[o], t.sheets[o]);
  n.sheets.splice(t.sheets.length);
  for (let o = n.sheets.length; o < t.sheets.length; o++) n.sheets.push(t.sheets[o]);
  n.activeSheet = t.activeSheet, n.date1904 = t.date1904, n.themeColors = t.themeColors, n.cellImages = t.cellImages, n.protection = t.protection;
}
const $g = 6 * 1024 * 1024;
function Ag(n, e, t, o = {}) {
  var v, y, w, S;
  const i = o.withImageBytes !== !1, s = t.right - t.left + 1, r = [], l = /* @__PURE__ */ new Map();
  for (let k = t.top; k <= t.bottom; k++)
    o.rowVisible && !o.rowVisible(k) || (l.set(k, r.length), r.push(k));
  const a = r.length, c = [], d = /* @__PURE__ */ new Set();
  for (const k of r) {
    const C = l.get(k);
    for (let M = 0; M < s; M++) {
      const E = n.cells.get(X(k, t.left + M));
      if (!E) continue;
      const P = (y = (v = n.styles[E.styleId]) != null ? v : n.styles[0]) != null ? y : ys(), I = {
        r: C,
        c: M,
        type: E.type,
        raw: E.raw instanceof Date ? { __d: E.raw.getTime() } : E.raw,
        style: P
      };
      E.formula && (I.formula = E.formula), E.hyperlink && (I.hyperlink = E.hyperlink), E.comment && (I.comment = E.comment), E.rich && (I.rich = E.rich), E.dispImgId && (I.dispImgId = E.dispImgId, d.add(E.dispImgId)), c.push(I);
    }
  }
  const u = [];
  for (const k of n.merges) {
    if (k.top < t.top || k.left < t.left || k.bottom > t.bottom || k.right > t.right) continue;
    let C = !0;
    for (let M = k.top; M <= k.bottom; M++) if (!l.has(M)) {
      C = !1;
      break;
    }
    C && u.push({ top: l.get(k.top), left: k.left - t.left, bottom: l.get(k.bottom), right: k.right - t.left });
  }
  const h = [];
  for (const k of n.images)
    k.from.row < t.top || k.from.row > t.bottom || k.from.col < t.left || k.from.col > t.right || l.has(k.from.row) && (!k.bytes || !k.mime || h.push({
      from: { col: k.from.col - t.left, row: l.get(k.from.row), colOffEmu: k.from.colOffEmu, rowOffEmu: k.from.rowOffEmu },
      to: k.to ? { col: k.to.col - t.left, row: (w = l.get(k.to.row)) != null ? w : k.to.row - t.top, colOffEmu: k.to.colOffEmu, rowOffEmu: k.to.rowOffEmu } : void 0,
      extWidthEmu: k.extWidthEmu,
      extHeightEmu: k.extHeightEmu,
      editAs: k.editAs,
      mime: k.mime,
      b64: i ? no(k.bytes) : ""
    }));
  const p = [];
  for (const k of d) {
    const C = (S = e.cellImages) == null ? void 0 : S.get(k);
    C != null && C.bytes && C.mime && p.push({ id: k, mime: C.mime, b64: i ? no(C.bytes) : "" });
  }
  const m = [];
  for (const k of r) {
    const C = n.rows.get(k);
    C && m.push({ i: l.get(k), height: C.height, hidden: C.hidden || void 0, custom: C.customHeight || void 0 });
  }
  const b = [];
  for (let k = 0; k < s; k++) {
    const C = n.columns.get(t.left + k);
    C && b.push({ i: k, width: C.width, hidden: C.hidden || void 0 });
  }
  return { v: 1, rows: a, cols: s, cells: c, merges: u, images: h, cellImages: p, rowHeights: m, colWidths: b };
}
function Fg(n) {
  return n && typeof n == "object" && "__d" in n ? new Date(n.__d) : n;
}
function Rg(n) {
  return zg(JSON.stringify(n));
}
function Lg(n) {
  if (!n) return null;
  try {
    const e = JSON.parse(Hg(n));
    return e && e.v === 1 && Array.isArray(e.cells) ? e : null;
  } catch (e) {
    return null;
  }
}
function Pg(n, e) {
  return n ? K(R({}, n), {
    cellImages: n.cellImages.map((t) => K(R({}, t), { b64: t.b64 || e.get(`c:${t.id}`) || "" })),
    images: n.images.map((t, o) => K(R({}, t), { b64: t.b64 || e.get(`f:${o}`) || "" }))
  }) : null;
}
function Ng(n) {
  return K(R({}, n), {
    cells: n.cells.map((e) => e.dispImgId ? K(R({}, e), { type: "empty", raw: null, formula: void 0, dispImgId: void 0 }) : e),
    images: [],
    cellImages: []
  });
}
function Og(n) {
  var e;
  if (typeof DOMParser == "undefined" || !n) return null;
  try {
    const t = new DOMParser().parseFromString(n, "text/html"), o = Lg((e = t.querySelector("table")) == null ? void 0 : e.getAttribute("data-ooxml-clip"));
    if (!o) return null;
    const i = /* @__PURE__ */ new Map();
    return t.querySelectorAll("img[data-clip-img]").forEach((s) => {
      const r = s.getAttribute("data-clip-img"), l = s.getAttribute("src") || "", a = l.indexOf(",");
      r && l.startsWith("data:") && a > 0 && i.set(r, l.slice(a + 1));
    }), Pg(o, i);
  } catch (t) {
    return null;
  }
}
function no(n) {
  let e = "";
  for (let o = 0; o < n.length; o += 32768) e += String.fromCharCode(...n.subarray(o, o + 32768));
  return btoa(e);
}
function Tn(n) {
  const e = atob(n), t = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) t[o] = e.charCodeAt(o);
  return t;
}
function zg(n) {
  return no(new TextEncoder().encode(n));
}
function Hg(n) {
  return new TextDecoder().decode(Tn(n));
}
function Dg(n) {
  return n.kind === "set-dim" || n.kind === "restore-dim";
}
function Bg(n) {
  return n.kind === "image-set" || n.kind === "image-add" || n.kind === "image-remove";
}
function Wg(n) {
  return n.kind === "struct-edit" || n.kind === "restore-wb";
}
function dc(n) {
  switch (n.kind) {
    case "set-value":
      return [{ row: n.row, col: n.col }];
    case "set-cells":
      return n.cells.map((e) => ({ row: e.row, col: e.col }));
    case "restore-cells":
      return n.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-style":
      return n.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-comment":
      return [{ row: n.row, col: n.col }];
    case "merge-cells":
      return uc(n.range);
    // 合并清空的被覆盖格 → 发 cell-change
    case "restore-merges":
      return n.cells.map((e) => ({ row: e.row, col: e.col }));
    case "set-dim":
    case "restore-dim":
    case "image-set":
    case "image-add":
    case "image-remove":
    case "struct-edit":
    case "restore-wb":
    case "unmerge-cells":
    case "set-conditional":
    case "set-page-config":
    case "convert-to-cell":
    case "convert-to-cells":
    case "convert-to-float":
    case "convert-to-floats":
      return [];
  }
}
function uc(n) {
  const e = [];
  for (let t = n.top; t <= n.bottom; t++)
    for (let o = n.left; o <= n.right; o++) t === n.top && o === n.left || e.push({ row: t, col: o });
  return e;
}
function Zr(n, e) {
  return !(n.bottom < e.top || n.top > e.bottom || n.right < e.left || n.left > e.right);
}
function qg(n, e, t) {
  const o = (e === "col" ? n.columns : n.rows).get(t);
  return o ? R({}, o) : null;
}
function Jo(n, e) {
  return e.map((t) => {
    const o = n.cells.get(X(t.row, t.col));
    return { row: t.row, col: t.col, cell: o ? zo(o) : null };
  });
}
function go(n, e) {
  const t = dc(e);
  if (e.kind === "set-dim" || e.kind === "restore-dim") {
    const i = qg(n, e.axis, e.index);
    return e.kind === "set-dim" ? e.axis === "col" ? Hp(n, e.index, e.size) : Dp(n, e.index, e.size) : Mo(n, e.axis, e.index, e.info), { inverse: { kind: "restore-dim", axis: e.axis, index: e.index, info: i }, affected: t };
  }
  if (e.kind === "image-set") {
    const i = Ee(n.images[e.index]);
    return n.images[e.index] = Ee(e.anchor), { inverse: { kind: "image-set", index: e.index, anchor: i }, affected: t };
  }
  if (e.kind === "image-add")
    return { inverse: { kind: "image-remove", index: is(n, Ee(e.anchor), e.index) }, affected: t };
  if (e.kind === "image-remove") {
    const i = Ee(n.images[e.index]);
    return Bp(n, e.index), { inverse: { kind: "image-add", anchor: i, index: e.index }, affected: t };
  }
  if (e.kind === "merge-cells") {
    const i = n.merges.map((l) => R({}, l)), s = uc(e.range), r = Jo(n, s);
    n.merges = n.merges.filter((l) => !Zr(l, e.range));
    for (const l of s) n.cells.delete(X(l.row, l.col));
    return n.merges.push(R({}, e.range)), { inverse: { kind: "restore-merges", merges: i, cells: r }, affected: t };
  }
  if (e.kind === "unmerge-cells") {
    const i = n.merges.map((s) => R({}, s));
    return n.merges = n.merges.filter((s) => !Zr(s, e.range)), { inverse: { kind: "restore-merges", merges: i, cells: [] }, affected: t };
  }
  if (e.kind === "restore-merges") {
    const i = n.merges.map((r) => R({}, r)), s = Jo(n, e.cells.map((r) => ({ row: r.row, col: r.col })));
    n.merges = e.merges.map((r) => R({}, r));
    for (const { row: r, col: l, cell: a } of e.cells) qr(n, r, l, a);
    return { inverse: { kind: "restore-merges", merges: i, cells: s }, affected: t };
  }
  if (e.kind === "set-conditional") {
    const i = n.conditional;
    return n.conditional = e.rules, { inverse: { kind: "set-conditional", rules: i }, affected: t };
  }
  if (e.kind === "set-page-config") {
    const i = { kind: "set-page-config" };
    return "pageSetup" in e && (i.pageSetup = n.pageSetup, n.pageSetup = e.pageSetup), "pageBreaks" in e && (i.pageBreaks = n.pageBreaks, n.pageBreaks = e.pageBreaks), "background" in e && (i.background = n.background, n.background = e.background), "watermark" in e && (i.watermark = n.watermark, n.watermark = e.watermark), { inverse: i, affected: t };
  }
  if (e.kind === "set-comment") {
    const i = Jo(n, [{ row: e.row, col: e.col }]);
    return Op(n, e.row, e.col, e.comment), { inverse: { kind: "restore-cells", cells: i }, affected: t };
  }
  const o = Jo(n, t);
  switch (e.kind) {
    case "set-value":
      Et(n, e.row, e.col, e.value);
      break;
    case "set-cells":
      for (const { row: i, col: s, value: r } of e.cells) Et(n, i, s, r);
      break;
    case "restore-cells":
      for (const { row: i, col: s, cell: r } of e.cells) qr(n, i, s, r);
      break;
    case "set-style":
      for (const { row: i, col: s } of e.cells) Cn(n, i, s, e.patch);
      break;
  }
  return { inverse: { kind: "restore-cells", cells: o }, affected: t };
}
const Ug = Number.NaN;
function hc(n) {
  let e = 0;
  const t = n.toUpperCase();
  for (let o = 0; o < t.length; o++) e = e * 26 + (t.charCodeAt(o) - 64);
  return e - 1;
}
function Qr(n, e) {
  return e.mode === "insert" ? n >= e.at ? n + e.count : n : n >= e.at + e.count ? n - e.count : n >= e.at ? Ug : n;
}
function mo(n, e, t) {
  let o = hc(n.col), i = parseInt(n.row, 10) - 1;
  if (e.axis === "row") {
    const s = Qr(i, e);
    if (Number.isNaN(s)) {
      if (!t) return null;
      i = e.at;
    } else i = s;
  } else {
    const s = Qr(o, e);
    if (Number.isNaN(s)) {
      if (!t) return null;
      o = e.at;
    } else o = s;
  }
  return i < 0 || o < 0 ? null : { colAbs: n.colAbs, col: Pe(o), rowAbs: n.rowAbs, row: String(i + 1) };
}
const Mi = (n) => `${n.colAbs}${n.col}${n.rowAbs}${n.row}`, el = "(\\$?)([A-Za-z]{1,3})(\\$?)(\\d+)", fc = new RegExp(`(?:('[^']+'|[A-Za-z_\\u4e00-\\u9fff][\\w.\\u4e00-\\u9fff]*)!)?${el}(?::${el})?`, "g");
function _g(n) {
  return n.startsWith("'") ? n.slice(1, -1).replace(/''/g, "'") : n;
}
function jg(n, e) {
  const t = n.split(/("(?:[^"]|"")*")/);
  for (let o = 0; o < t.length; o += 2) {
    const i = t[o];
    t[o] = i.replace(fc, (s, r, l, a, c, d, u, h, p, m, b) => {
      const v = i[b + s.length];
      if (!h && v === "(") return s;
      const y = i[b - 1];
      if (!r && y && /[A-Za-z0-9_$.]/.test(y) || (r ? _g(r) : e.formulaSheet).toLowerCase() !== e.targetSheet.toLowerCase()) return s;
      const S = r ? r + "!" : "";
      if (!h) {
        const P = mo({ colAbs: l, col: a, rowAbs: c, row: d }, e, !1);
        return P ? S + Mi(P) : "#REF!";
      }
      const k = mo({ colAbs: l, col: a, rowAbs: c, row: d }, e, !0), C = mo({ colAbs: u, col: h, rowAbs: p, row: m }, e, !0), M = !mo({ colAbs: l, col: a, rowAbs: c, row: d }, e, !1), E = !mo({ colAbs: u, col: h, rowAbs: p, row: m }, e, !1);
      return M && E ? S + "#REF!" : S + Mi(k) + ":" + Mi(C);
    });
  }
  return t.join("");
}
function tl(n, e, t, o, i, s) {
  let r = hc(e), l = parseInt(o, 10) - 1;
  return n !== "$" && (r += s), t !== "$" && (l += i), r < 0 || l < 0 ? null : `${n}${Pe(r)}${t}${l + 1}`;
}
function Vg(n, e, t) {
  if (!e && !t) return n;
  const o = n.split(/("(?:[^"]|"")*")/);
  for (let i = 0; i < o.length; i += 2) {
    const s = o[i];
    o[i] = s.replace(fc, (r, l, a, c, d, u, h, p, m, b, v) => {
      const y = s[v + r.length];
      if (!p && y === "(") return r;
      const w = s[v - 1];
      if (!l && w && /[A-Za-z0-9_$.]/.test(w)) return r;
      const S = l ? l + "!" : "", k = tl(a, c, d, u, e, t);
      if (!p) return k ? S + k : "#REF!";
      const C = tl(h, p, m, b, e, t);
      return k && C ? S + k + ":" + C : S + "#REF!";
    });
  }
  return o.join("");
}
function Yg(n, e, t, o, i) {
  const s = n.sheets[e];
  if (!s) return;
  const r = t === "insert-rows" || t === "delete-rows" ? "row" : "col", l = t.startsWith("insert") ? "insert" : "delete";
  for (const a of n.sheets)
    for (const c of a.cells.values())
      c.type === "formula" && c.formula && (c.formula = jg(c.formula, { axis: r, at: o, count: i, mode: l, targetSheet: s.name, formulaSheet: a.name }));
}
function pc(n) {
  if (!n || n.type === "empty") return null;
  if (n.type === "formula") {
    const t = n.formula;
    return t == null || t === "" ? null : t[0] === "=" ? t : "=" + t;
  }
  const e = n.raw;
  return typeof e == "number" || typeof e == "boolean" || typeof e == "string" ? e : null;
}
function Gg(n, e, t, o) {
  var r;
  const i = e.sheets[t], s = /* @__PURE__ */ new Map();
  for (const l of o) {
    const a = (r = i == null ? void 0 : i.cells.get(X(l.row, l.col))) != null ? r : null;
    for (const c of n.setCell(t, l.row, l.col, pc(a)))
      s.set(`${c.sheet}:${c.row}:${c.col}`, c);
  }
  return [...s.values()];
}
function Xg(n, e) {
  for (const t of e) {
    const o = n.sheets[t.sheet];
    o && zp(o, t.row, t.col, t.value);
  }
}
function Kg(n, e, t) {
  const o = new Set(t.map((i) => X(i.row, i.col)));
  return n.filter((i) => i.sheet === e && !o.has(X(i.row, i.col))).map((i) => ({ row: i.row, col: i.col }));
}
function ol(n, e) {
  for (let t = e.top; t <= e.bottom; t++)
    for (let o = e.left; o <= e.right; o++)
      if (!n.isEditable(t, o)) return !1;
  return !0;
}
function Zo(n, e) {
  const t = [];
  for (let o = e.top; o <= e.bottom; o++)
    for (let i = e.left; i <= e.right; i++)
      n.isEditable(o, i) || t.push({ row: o, col: i });
  return t;
}
function Qo(n, e, t) {
  var o, i, s, r;
  return e === "col" ? (i = (o = n.columns.get(t)) == null ? void 0 : o.width) != null ? i : n.defaultColWidth : (r = (s = n.rows.get(t)) == null ? void 0 : s.height) != null ? r : n.defaultRowHeight;
}
function Jg(n) {
  const e = new RegExp("^data:([^;,]+)(;base64)?,(.*)$", "s").exec(n);
  if (!e || typeof atob == "undefined") return null;
  try {
    const t = atob(e[3]), o = new Uint8Array(t.length);
    for (let i = 0; i < t.length; i++) o[i] = t.charCodeAt(i);
    return { bytes: o, mime: e[1] || "image/png" };
  } catch (t) {
    return null;
  }
}
class Zg {
  constructor(e) {
    T(this, "undoStack", []);
    T(this, "redoStack", []);
    T(this, "editing", null);
    T(this, "limit", 200);
    // 脏状态 + 原件 baseline(均 workbook 级;editable 时懒捕获,读层零成本)
    // dirty = 最近一次发出的脏态(emit 去重缓存);真值恒由 isDirty() 现算(见其定义)。
    T(this, "dirty", !1);
    // 跨会话脏:undo 栈按"会话"(切表/换簿)清空,故切表前累积的未保存编辑单独记,保证换表后仍显示 *。
    T(this, "priorSessionDirty", !1);
    T(this, "baseline", null);
    T(this, "baselineFor", null);
    // 公式引擎(E4;可选,异步懒初始化;未就绪时编辑不重算)
    T(this, "engine", null);
    T(this, "engineFor", null);
    // 引擎对应哪个 workbook
    T(this, "warming", !1);
    /** 计算模式(公式选项卡「计算选项」):auto=编辑即级联重算;manual=编辑不重算,待「重算工作簿/工作表」。 */
    T(this, "calcMode", "auto");
    // 粘贴行为(默认覆盖式 1:1;经 setPasteBehavior / :paste-behavior prop 改;右键选择性粘贴逐次覆盖)
    T(this, "pasteBehavior", rt);
    this.host = e;
  }
  /** 读当前粘贴行为(完整配置)。 */
  getPasteBehavior() {
    return this.pasteBehavior;
  }
  /** 设粘贴行为默认(缺项回落默认);影响 Ctrl+V / 右键「粘贴」。 */
  setPasteBehavior(e) {
    this.pasteBehavior = St(e);
  }
  // ---- 公式引擎生命周期(E4) ----
  /** 异步懒初始化引擎(开重算 + 有工厂 + 尚未为当前簿建好)。返回的 Promise 供测试 await;生产 fire-and-forget。 */
  warmEngine() {
    if (this.warming || !this.host.isRecalcEnabled()) return Promise.resolve();
    const e = this.host.getEngineFactory(), t = this.host.getWorkbook();
    return !e || !t || this.engineFor === t ? Promise.resolve() : (this.warming = !0, (async () => {
      var o;
      try {
        const i = await e();
        if (this.host.getWorkbook() !== t) {
          i.destroy();
          return;
        }
        i.setSheets(t), (o = this.engine) == null || o.destroy(), this.engine = i, this.engineFor = t;
      } catch (i) {
        console.warn("[ooxml-preview] 公式引擎初始化失败(重算已跳过):", i);
      } finally {
        this.warming = !1;
      }
    })());
  }
  /** 释放引擎(切簿/关重算/dispose)。 */
  disposeEngine() {
    var e;
    (e = this.engine) == null || e.destroy(), this.engine = null, this.engineFor = null;
  }
  /** 配置变化(recalc/factory)或换新簿:重置引擎并按需重新点火。 */
  refreshEngine() {
    this.disposeEngine(), this.warmEngine();
  }
  engineReady() {
    return !!this.engine && this.host.isRecalcEnabled() && this.engineFor === this.host.getWorkbook();
  }
  /** 公式引擎是否已就绪(异步 warm 完成且对应当前簿);未开重算恒 false。 */
  isRecalcReady() {
    return this.engineReady();
  }
  /** 计算模式:auto / manual(公式选项卡「计算选项」)。 */
  getCalcMode() {
    return this.calcMode;
  }
  setCalcMode(e) {
    this.calcMode = e;
  }
  /**
   * 全量重算(公式选项卡「重算工作簿」)：引擎重灌整簿 → 把每个公式格算出的值写回模型。
   * `onlySheet` 给定则只写回该表(仍全簿求值以保跨表引用)。未开重算/引擎未就绪 → 返 false。
   */
  recalcAll(e) {
    if (!this.engineReady()) return !1;
    const t = this.host.getWorkbook(), o = this.host.getDate1904();
    this.engine.setSheets(t);
    for (let i = 0; i < t.sheets.length; i++) {
      if (e != null && i !== e) continue;
      const s = t.sheets[i];
      for (const r of s.cells.values()) {
        if (r.type !== "formula") continue;
        const l = this.engine.getValue(i, r.row, r.col);
        if (r.raw === l) continue;
        const a = i === this.host.getActiveSheetIndex() ? ze(s, r.row, r.col, o) : null;
        r.raw = l, a && this.host.emit("cell-change", { before: a, after: ze(s, r.row, r.col, o), source: "api" });
      }
    }
    return this.host.onModelChange(), !0;
  }
  /** 只重算当前活动表(「计算工作表」)。 */
  recalcActiveSheet() {
    return this.recalcAll(this.host.getActiveSheetIndex());
  }
  // ---- 状态查询 ----
  getEditingCell() {
    return this.editing;
  }
  setEditing(e) {
    this.editing = e;
  }
  canUndo() {
    return this.undoStack.length > 0;
  }
  canRedo() {
    return this.redoStack.length > 0;
  }
  /** 查询任意格的完整快照(要求 5:事件之外也有查询 API) */
  getCellSnapshot(e, t) {
    const o = this.host.getSheet();
    return o ? ze(o, e, t, this.host.getDate1904()) : null;
  }
  /** 切表/换簿时清空(交互态 + 命令栈作废)。切表前若有可撤销编辑,并入跨会话脏(换表后仍显示 *)。 */
  reset() {
    this.undoStack.length && (this.priorSessionDirty = !0), this.undoStack = [], this.redoStack = [], this.editing = null;
  }
  // ---- 命令式编辑 API(要求 3:直接编辑哪行哪列) ----
  /** 编辑单格;只读则不动,返回是否生效 */
  editCell(e, t, o) {
    if (!this.host.isEditable(e, t)) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "set-value", row: e, col: t, value: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /** 区域批量设值(2D,左上对齐 range.top/left);跳过只读格,返回是否有改动 */
  editRange(e, t) {
    const o = this.collectEditable(e, t);
    if (!o.length) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "set-cells", cells: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /** 设/清单元格批注(1.11.0,单次撤销)。 */
  setCellComment(e, t, o) {
    if (!this.host.isEditable(e, t)) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "set-comment", row: e, col: t, comment: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /** 批量设一组散列格(自动填充用,1.10.0):跳过只读格,整体单次撤销。 */
  setCellsBatch(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = e.filter((i) => this.host.isEditable(i.row, i.col));
    if (!t.length) return !1;
    this.ensureBaseline();
    const o = this.exec({ kind: "set-cells", cells: t }, "api");
    return o && (this.pushUndo(o), this.markDirty()), !!o;
  }
  /** 替换整张表的条件格式规则集(1.9.0,整体单次撤销)。规则对象不可变 → 直接换数组。 */
  setConditionalRules(e) {
    if (!this.host.isEditingEnabled() || !this.host.getSheet()) return !1;
    this.ensureBaseline();
    const t = this.exec({ kind: "set-conditional", rules: e }, "api");
    return t && (this.pushUndo(t), this.markDirty()), !!t;
  }
  /** 改页面设置 / 分页符 / 背景 / 水印(替换式,单次撤销);cfg 里给了哪个键就改哪个。1.16.0 页面选项卡 */
  setPageConfig(e) {
    if (!this.host.isEditingEnabled() || !this.host.getSheet()) return !1;
    this.ensureBaseline();
    const t = this.exec(R({ kind: "set-page-config" }, e), "api");
    return t && (this.pushUndo(t), this.markDirty(), this.host.onModelChange()), !!t;
  }
  /** 合并区 m 是否与矩形 [top,left]-[bottom,right] 有交叠(用于清粘贴区内的目标原有合并)。 */
  _mergeOverlaps(e, t, o, i, s) {
    return !(e.bottom < t || e.top > i || e.right < o || e.left > s);
  }
  /**
   * 富粘贴(Excel/WPS 复制的 HTML 解析后):值 + 样式 + 合并 + 图片,**整体单次撤销**。
   * start = 落点左上角。跳过只读格。一次 cloneWorkbook 快照 → 应用全部 → 压一条 restore-wb 逆。
   * behaviorOverride = 右键「选择性粘贴」逐次预设(覆盖 this.pasteBehavior;缺省走默认配置)。
   */
  pasteRich(e, t, o) {
    var k;
    if (!this.host.isEditingEnabled()) return !1;
    const i = this.host.getSheet(), s = this.host.getWorkbook();
    if (!i || !s) return !1;
    const { values: r, styles: l, merges: a, images: c } = t;
    if (!r.length && !l.length && !a.length && !c.length) return !1;
    const d = o ? St(R(R({}, this.pasteBehavior), o)) : this.pasteBehavior;
    this.ensureBaseline();
    const u = this.host.getDate1904(), h = we(s), p = /* @__PURE__ */ new Set(), m = [], b = (C, M) => {
      const E = `${C}:${M}`;
      p.has(E) || (p.add(E), m.push({ row: C, col: M }));
    };
    for (let C = 0; C < r.length; C++)
      for (let M = 0; M < r[C].length; M++) {
        const E = e.row + C, P = e.col + M;
        this.host.isEditable(E, P) && b(E, P);
      }
    for (const C of l) {
      const M = e.row + C.row, E = e.col + C.col;
      this.host.isEditable(M, E) && b(M, E);
    }
    const v = m.map((C) => ze(i, C.row, C.col, u)), y = e.row + Math.max(0, r.length - 1), w = e.col + Math.max(0, r.reduce((C, M) => Math.max(C, M.length), 0) - 1), S = [];
    d.targetMerges === "clear" && (i.merges = i.merges.filter((C) => !this._mergeOverlaps(C, e.row, e.col, y, w)));
    for (let C = 0; C < r.length; C++)
      for (let M = 0; M < r[C].length; M++) {
        const E = e.row + C, P = e.col + M;
        this.host.isEditable(E, P) ? Et(i, E, P, r[C][M]) : r[C][M] != null && S.push({ row: E, col: P });
      }
    if (d.cellStyle !== "skip" || d.fill !== "skip") {
      const C = i.styles[0];
      for (const M of l) {
        const E = e.row + M.row, P = e.col + M.col;
        if (!this.host.isEditable(E, P)) continue;
        const I = i.cells.get(X(E, P)), L = (k = I ? i.styles[I.styleId] : C) != null ? k : C, F = sr(L, C, M.patch, d.cellStyle, d.fill);
        if (!F) continue;
        const N = ss(i, F);
        I ? I.styleId = N : Ur(i, { row: E, col: P, type: "empty", raw: null, styleId: N });
      }
    }
    if (d.sourceMerges === "apply")
      for (const C of a) {
        const M = { top: e.row + C.top, left: e.col + C.left, bottom: e.row + C.bottom, right: e.col + C.right };
        if (!(M.top === M.bottom && M.left === M.right)) {
          if (!ol(this.host, M)) {
            S.push(...Zo(this.host, M));
            continue;
          }
          go(i, { kind: "merge-cells", range: M });
        }
      }
    if (d.images === "apply")
      for (const C of c) {
        const M = e.row + C.row, E = e.col + C.col;
        if (!this.host.isEditable(M, E)) {
          S.push({ row: M, col: E });
          continue;
        }
        const P = Jg(C.dataUrl);
        if (!P) continue;
        const I = is(i, { src: C.dataUrl, bytes: P.bytes, mime: P.mime, from: { col: E, row: M, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: ft(96), extHeightEmu: ft(96) });
        Si(s, i, I, M, E);
      }
    return d.rowHeight === "source" && t.rowHeights.forEach((C, M) => {
      C > 0 && Mo(i, "row", e.row + M, { height: C, hidden: !1 });
    }), ir(d, e.row) && t.colWidths.forEach((C, M) => {
      C > 0 && Mo(i, "col", e.col + M, { width: C, hidden: !1 });
    }), this.pushUndo({ kind: "restore-wb", snapshot: h }), this.markDirty(), this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine(), m.forEach(
      (C, M) => this.host.emit("cell-change", { before: v[M], after: ze(i, C.row, C.col, u), source: "api" })
    ), this._emitPasteDenied(S), !0;
  }
  /** 去重后发一次 paste 的 permission-denied(没只读格则不发)。 */
  _emitPasteDenied(e) {
    if (!e.length) return;
    const t = /* @__PURE__ */ new Set(), o = e.filter((i) => {
      const s = `${i.row}:${i.col}`;
      return t.has(s) ? !1 : (t.add(s), !0);
    });
    this.host.emit("permission-denied", { reason: "paste", cells: o, message: `粘贴撞 ${o.length} 个只读格,已跳过(只读区不会被覆盖)` });
  }
  /**
   * 1:1 保真粘贴:用复制时序列化进剪贴板的完整模型快照(本组件自己复制的,跨实例 Vue3/Vue2/React 通用)
   * 覆盖式落到目标区 —— 完整还原 值/原始类型/数字格式/全部样式(含边框)/合并/图片(浮动 + DISPIMG)/行高列宽。
   * 跟 pasteRich(外部 HTML 近似)同走命令栈(整体单次撤销)+ 前后快照 cell-change + 只读 permission-denied。
   */
  pasteSnapshot(e, t, o) {
    var v, y, w, S, k;
    if (!this.host.isEditingEnabled()) return !1;
    const i = this.host.getSheet(), s = this.host.getWorkbook();
    if (!i || !s || !t.cells.length && !t.merges.length && !t.images.length && !t.rowHeights.length && !t.colWidths.length) return !1;
    const r = o ? St(R(R({}, this.pasteBehavior), o)) : this.pasteBehavior;
    this.ensureBaseline();
    const l = this.host.getDate1904(), a = we(s), c = [];
    for (let C = 0; C < t.rows; C++)
      for (let M = 0; M < t.cols; M++) {
        const E = e.row + C, P = e.col + M;
        this.host.isEditable(E, P) && c.push({ row: E, col: P });
      }
    const d = c.map((C) => ze(i, C.row, C.col, l)), u = [], h = /* @__PURE__ */ new Map();
    for (const C of c) {
      const M = i.cells.get(X(C.row, C.col));
      M && h.set(X(C.row, C.col), { id: M.styleId, style: (v = i.styles[M.styleId]) != null ? v : i.styles[0] });
    }
    if (r.cellStyle === "overwrite" && r.fill === "overwrite") for (const C of c) i.cells.delete(X(C.row, C.col));
    if (r.images === "apply" && t.cellImages.length) {
      s.cellImages || (s.cellImages = /* @__PURE__ */ new Map());
      for (const C of t.cellImages)
        s.cellImages.has(C.id) || s.cellImages.set(C.id, { id: C.id, bytes: Tn(C.b64), mime: C.mime, src: `data:${C.mime};base64,${C.b64}` });
    }
    const m = i.styles[0];
    for (const C of t.cells) {
      const M = e.row + C.r, E = e.col + C.c;
      if (!this.host.isEditable(M, E)) {
        u.push({ row: M, col: E });
        continue;
      }
      const P = h.get(X(M, E)), I = sr((y = P == null ? void 0 : P.style) != null ? y : m, m, C.style, r.cellStyle, r.fill), L = I ? ss(i, I) : (w = P == null ? void 0 : P.id) != null ? w : 0, F = { row: M, col: E, type: C.type, raw: Fg(C.raw), styleId: L };
      C.formula && (F.formula = C.formula), C.hyperlink && (F.hyperlink = C.hyperlink), C.comment && (F.comment = C.comment), C.rich && (F.rich = C.rich), C.dispImgId && r.images === "apply" && (F.dispImgId = C.dispImgId), Ur(i, F);
    }
    const b = { top: e.row, left: e.col, bottom: e.row + t.rows - 1, right: e.col + t.cols - 1 };
    if (r.targetMerges === "clear" && (i.merges = i.merges.filter((C) => !this._mergeOverlaps(C, b.top, b.left, b.bottom, b.right))), r.sourceMerges === "apply") for (const C of t.merges) {
      const M = { top: e.row + C.top, left: e.col + C.left, bottom: e.row + C.bottom, right: e.col + C.right };
      if (!(M.top === M.bottom && M.left === M.right)) {
        if (!ol(this.host, M)) {
          u.push(...Zo(this.host, M));
          continue;
        }
        go(i, { kind: "merge-cells", range: M });
      }
    }
    if (r.images === "apply") for (const C of t.images) {
      const M = e.row + C.from.row, E = e.col + C.from.col;
      if (!this.host.isEditable(M, E)) {
        u.push({ row: M, col: E });
        continue;
      }
      is(i, {
        src: `data:${C.mime};base64,${C.b64}`,
        bytes: Tn(C.b64),
        mime: C.mime,
        from: { col: E, row: M, colOffEmu: C.from.colOffEmu, rowOffEmu: C.from.rowOffEmu },
        to: C.to ? { col: e.col + C.to.col, row: e.row + C.to.row, colOffEmu: C.to.colOffEmu, rowOffEmu: C.to.rowOffEmu } : void 0,
        extWidthEmu: C.extWidthEmu,
        extHeightEmu: C.extHeightEmu,
        editAs: C.editAs
      });
    }
    if (r.rowHeight === "source") for (const C of t.rowHeights) Mo(i, "row", e.row + C.i, { height: (S = C.height) != null ? S : i.defaultRowHeight, hidden: !!C.hidden, customHeight: !!C.custom });
    if (ir(r, e.row)) for (const C of t.colWidths) Mo(i, "col", e.col + C.i, { width: (k = C.width) != null ? k : i.defaultColWidth, hidden: !!C.hidden });
    return this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine(), c.forEach(
      (C, M) => this.host.emit("cell-change", { before: d[M], after: ze(i, C.row, C.col, l), source: "api" })
    ), this._emitPasteDenied(u), !0;
  }
  /** 清空区域(跳过只读) */
  clearRange(e) {
    const t = [];
    for (let i = e.top; i <= e.bottom; i++)
      for (let s = e.left; s <= e.right; s++) this.host.isEditable(i, s) && t.push({ row: i, col: s, value: null });
    if (!t.length) return !1;
    this.ensureBaseline();
    const o = this.exec({ kind: "set-cells", cells: t }, "api");
    return o && (this.pushUndo(o), this.markDirty()), !!o;
  }
  // ---- 数据选项卡:数据有效性 authoring / 删除重复项 / 文本分列(均 cloneWorkbook 单次撤销)----
  /** 从 dataValidationRules 派生渲染用的 dataValidations(list 型 range)+ dataValidationLists。 */
  syncValidationDerived(e) {
    var o;
    const t = (o = e.dataValidationRules) != null ? o : [];
    e.dataValidations = t.filter((i) => i.type === "list").map((i) => R({}, i.range)), e.dataValidationLists = t.filter((i) => {
      var s;
      return i.type === "list" && (((s = i.options) == null ? void 0 : s.length) || 0) > 0;
    }).map((i) => {
      var s;
      return { range: R({}, i.range), options: [...(s = i.options) != null ? s : []] };
    });
  }
  /** 设/清区域数据有效性(rule=null 清除)。移除与 range 完全相同的旧规则,加新规则。单次撤销。 */
  setDataValidation(e, t) {
    var a;
    if (!this.host.isEditingEnabled()) return !1;
    const o = this.host.getWorkbook(), i = this.host.getSheet();
    if (!o || !i) return !1;
    this.ensureBaseline();
    const s = we(o), r = (c, d) => c.top === d.top && c.left === d.left && c.bottom === d.bottom && c.right === d.right, l = ((a = i.dataValidationRules) != null ? a : []).filter((c) => !r(c.range, t));
    return e && l.push(K(R({}, e), { range: R({}, t) })), i.dataValidationRules = l, this.syncValidationDerived(i), this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 删除重复行:按 keyCols 组合判重,保留首次,删重复行(降序 deleteRows)。返回删除行数;单次撤销。 */
  removeDuplicates(e, t, o) {
    if (!this.host.isEditingEnabled()) return 0;
    const i = this.host.getWorkbook(), s = this.host.getSheet();
    if (!i || !s) return 0;
    const r = this.host.getDate1904(), l = t.length ? t : Array.from({ length: e.right - e.left + 1 }, (h, p) => e.left + p), a = o ? e.top + 1 : e.top, c = /* @__PURE__ */ new Set(), d = [];
    for (let h = a; h <= e.bottom; h++) {
      const p = l.map((m) => De(s, h, m, r)).join("");
      c.has(p) ? d.push(h) : c.add(p);
    }
    if (!d.length) return 0;
    this.ensureBaseline();
    const u = we(i);
    for (let h = d.length - 1; h >= 0; h--) ac(s, d[h], 1);
    return this.pushUndo({ kind: "restore-wb", snapshot: u }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), d.length;
  }
  /** 文本分列:把 range 单列每格按 delimiter 拆分,写入本行 col、col+1…(向右覆盖)。单次撤销。 */
  textToColumns(e, t) {
    if (!this.host.isEditingEnabled() || !t) return !1;
    const o = this.host.getWorkbook(), i = this.host.getSheet();
    if (!o || !i) return !1;
    const s = e.left, r = this.host.getDate1904();
    let l = !1;
    this.ensureBaseline();
    const a = we(o);
    for (let c = e.top; c <= e.bottom; c++) {
      const d = De(i, c, s, r);
      if (d === "") continue;
      const u = d.split(t);
      u.length <= 1 || (u.forEach((h, p) => Et(i, c, s + p, h)), l = !0);
    }
    return l ? (this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  // ---- 审阅选项卡:单元格锁定 / 工作表保护 / 工作簿保护(均 cloneWorkbook 单次撤销)----
  /**
   * 设区域单元格「锁定」态(审阅选项卡「锁定单元格」;locked 缺省 true,仅保护工作表时生效)。
   * 属保护授权动作 —— **不走 isEditable 闸门**(否则表已保护时锁定格自身是只读、永远解不开),
   * 只要求 editing 开启。单次撤销。
   */
  setCellsLocked(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const o = this.host.getWorkbook(), i = this.host.getSheet();
    if (!o || !i) return !1;
    this.ensureBaseline();
    const s = we(o);
    for (let r = e.top; r <= e.bottom; r++)
      for (let l = e.left; l <= e.right; l++)
        Cn(i, r, l, { protection: { locked: t } });
    return this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设/清工作表保护(审阅选项卡「保护工作表」;null=解除)。改可编辑闸门 → onModelChange 重绘。单次撤销。 */
  setSheetProtection(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), o = this.host.getSheet();
    if (!t || !o) return !1;
    this.ensureBaseline();
    const i = we(t);
    return e ? o.sheetProtection = R({}, e) : delete o.sheetProtection, this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设允许编辑区域(审阅选项卡「允许编辑区域」;替换整表列表)。单次撤销。 */
  setProtectedRanges(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), o = this.host.getSheet();
    if (!t || !o) return !1;
    this.ensureBaseline();
    const i = we(t);
    return o.protectedRanges = e.map((s) => K(R({}, s), { range: R({}, s.range) })), this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 设/清工作簿保护(审阅选项卡「保护工作簿」;null=解除)。单次撤销。 */
  setWorkbookProtection(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook();
    if (!t) return !1;
    this.ensureBaseline();
    const o = we(t);
    return e ? t.protection = R({}, e) : delete t.protection, this.pushUndo({ kind: "restore-wb", snapshot: o }), this.markDirty(), this.host.onModelChange(), !0;
  }
  /** 给区域套样式覆盖(E5;跳过只读格)。返回是否有改动。前后 style 不同 → 发 cell-change。 */
  setStyle(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const o = [];
    for (let s = e.top; s <= e.bottom; s++)
      for (let r = e.left; r <= e.right; r++) this.host.isEditable(s, r) && o.push({ row: s, col: r });
    if (!o.length) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "set-style", cells: o, patch: t }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /** 批量套多段样式(每段 cells+patch,按序 merge),一次工作簿快照 → 单次撤销。用于表格样式(表头/隔行/边框)。 */
  setStyleRegions(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), o = this.host.getSheet();
    if (!t || !o) return !1;
    this.ensureBaseline();
    const i = we(t);
    let s = !1;
    for (const r of e)
      for (const l of r.cells)
        this.host.isEditable(l.row, l.col) && (Cn(o, l.row, l.col, r.patch), s = !0);
    return s ? (this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  /** 填充:一批格设值(可为公式串)+ 可选从某格复制样式(共享 styleId),一次快照单次撤销。1.16.0 */
  fillCells(e) {
    var r, l;
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getWorkbook(), o = this.host.getSheet();
    if (!t || !o) return !1;
    this.ensureBaseline();
    const i = we(t);
    let s = !1;
    for (const a of e)
      if (this.host.isEditable(a.row, a.col)) {
        if (a.value !== void 0 && Et(o, a.row, a.col, a.value), a.styleFrom) {
          const c = (l = (r = o.cells.get(X(a.styleFrom.row, a.styleFrom.col))) == null ? void 0 : r.styleId) != null ? l : 0, d = X(a.row, a.col), u = o.cells.get(d);
          u ? u.styleId = c : o.cells.set(d, { row: a.row, col: a.col, type: "empty", raw: null, styleId: c });
        }
        s = !0;
      }
    return s ? (this.pushUndo({ kind: "restore-wb", snapshot: i }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  /** 清除格(all=删格 / comments=清批注),一次快照单次撤销。1.16.0 */
  clearCellsSnapshot(e, t) {
    if (!this.host.isEditingEnabled()) return !1;
    const o = this.host.getWorkbook(), i = this.host.getSheet();
    if (!o || !i) return !1;
    this.ensureBaseline();
    const s = we(o);
    let r = !1;
    for (let l = e.top; l <= e.bottom; l++)
      for (let a = e.left; a <= e.right; a++) {
        if (!this.host.isEditable(l, a)) continue;
        const c = X(l, a), d = i.cells.get(c);
        d && (t === "all" ? (i.cells.delete(c), r = !0) : d.comment && (d.comment = void 0, r = !0));
      }
    return r ? (this.pushUndo({ kind: "restore-wb", snapshot: s }), this.markDirty(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), !0) : !1;
  }
  // ---- 行列结构编辑(E7;增删行列,快照逆) ----
  insertRows(e, t = 1) {
    return this.structEdit("insert-rows", e, t);
  }
  deleteRows(e, t = 1) {
    return this.structEdit("delete-rows", e, t);
  }
  insertCols(e, t = 1) {
    return this.structEdit("insert-cols", e, t);
  }
  deleteCols(e, t = 1) {
    return this.structEdit("delete-cols", e, t);
  }
  structEdit(e, t, o) {
    if (!this.host.isEditingEnabled() || t < 0 || o <= 0) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "struct-edit", op: e, at: t, count: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  // ---- 合并单元格(G1) ----
  /** 合并区域(吸收相交旧合并,清空被覆盖格只留左上锚点)。单格不合并。
   *  Phase A 补漏 (2026-06-08): 区域内任一格只读 → 拒绝整次合并 + emit permission-denied. */
  mergeCells(e) {
    if (!this.host.isEditingEnabled() || e.top === e.bottom && e.left === e.right) return !1;
    const t = Zo(this.host, e);
    if (t.length)
      return this.host.emit("permission-denied", { reason: "merge", cells: t, message: `合并区域内有 ${t.length} 个只读格,已拒绝` }), !1;
    this.ensureBaseline();
    const o = this.exec({ kind: "merge-cells", range: e }, "api");
    return o && (this.pushUndo(o), this.markDirty()), !!o;
  }
  /** 拆分:移除与区域相交的所有合并。
   *  Phase A 补漏 (2026-06-08): 区域内任一格只读 → 拒绝整次拆分 + emit permission-denied. */
  unmergeCells(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = Zo(this.host, e);
    if (t.length)
      return this.host.emit("permission-denied", { reason: "unmerge", cells: t, message: `拆分区域内有 ${t.length} 个只读格,已拒绝` }), !1;
    this.ensureBaseline();
    const o = this.exec({ kind: "unmerge-cells", range: e }, "api");
    return o && (this.pushUndo(o), this.markDirty()), !!o;
  }
  // ---- 图片编辑(浮动/嵌入;E6) ----
  /** 读当前表全部图片锚点(克隆,防外部改)。 */
  getImages() {
    const e = this.host.getSheet();
    return e ? e.images.map(Ee) : [];
  }
  /** 加一张图,返回插入索引(失败 -1)。 */
  addImage(e) {
    if (!this.host.isEditingEnabled()) return -1;
    this.ensureBaseline();
    const t = this.exec({ kind: "image-add", anchor: e }, "api");
    return t && t.kind === "image-remove" ? (this.pushUndo(t), this.markDirty(), t.index) : -1;
  }
  /** 删一张图。 */
  removeImage(e) {
    if (!this.host.isEditingEnabled()) return !1;
    const t = this.host.getSheet();
    if (!t || !t.images[e]) return !1;
    this.ensureBaseline();
    const o = this.exec({ kind: "image-remove", index: e }, "api");
    return o && (this.pushUndo(o), this.markDirty()), !!o;
  }
  /**
   * 补登一次图片移动/缩放(拖拽/programmatic:模型已被 setImageRect 改完,这里只补 undo + 发 image-change)。
   * baseline 须在变更前由调用方 ensureBaseline() 捕获。
   */
  recordImageEdit(e, t, o) {
    this.pushUndo({ kind: "image-set", index: e, anchor: t }), this.markDirty(), this.host.emit("image-change", { index: e, before: t, after: o, source: "ui" });
  }
  // ---- WPS 内嵌图 ⇄ 浮动图互转(第二期) ----
  /**
   * 浮动图 → 单元格内嵌图(DISPIMG):把第 imageIndex 张浮动图塞进 (row,col) 格。
   * 图缺字节不可转 → 返 false。入命令栈(undo 走整簿快照还原)。
   */
  convertImageToCell(e, t, o) {
    if (!this.host.isEditingEnabled()) return !1;
    if (!this.host.isEditable(t, o))
      return this.host.emit("permission-denied", { reason: "image-convert", cells: [{ row: t, col: o }], message: "目标格只读,无法嵌入图片" }), !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "convert-to-cell", imageIndex: e, row: t, col: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /**
   * 批量把多张浮动图嵌入各自的目标格(整表/整列);一次进撤销栈。返回成功嵌入的张数。
   * targets 的 imageIndex 是调用前的浮动图索引(内部按降序 splice,索引互不干扰)。
   * Phase A 补漏: 过滤掉目标格只读的 targets, denied 一次性 emit.
   */
  convertImagesToCells(e) {
    var a, c, d;
    if (!this.host.isEditingEnabled() || !e.length) return 0;
    const t = [], o = [];
    for (const u of e)
      this.host.isEditable(u.row, u.col) ? o.push(u) : t.push({ row: u.row, col: u.col });
    if (t.length && this.host.emit("permission-denied", { reason: "image-convert", cells: t, message: `${t.length} 个目标格只读,已跳过` }), !o.length) return 0;
    const i = this.host.getSheet(), s = (a = i == null ? void 0 : i.images.length) != null ? a : 0;
    this.ensureBaseline();
    const r = this.exec({ kind: "convert-to-cells", targets: o }, "api");
    r && (this.pushUndo(r), this.markDirty());
    const l = (d = (c = this.host.getSheet()) == null ? void 0 : c.images.length) != null ? d : s;
    return Math.max(0, s - l);
  }
  /**
   * 单元格内嵌图 → 浮动图:把 (row,col) 的 DISPIMG 拎出来变成浮动图(默认 96×96px)。
   * 非内嵌图格 → 返 false。入命令栈。
   * Phase A 补漏: 源格只读 → 拒绝 (拎出来意味着该格内容变了,属于修改).
   */
  convertCellImageToFloat(e, t, o) {
    if (!this.host.isEditingEnabled()) return !1;
    if (!this.host.isEditable(e, t))
      return this.host.emit("permission-denied", { reason: "image-convert", cells: [{ row: e, col: t }], message: "源格只读,无法转浮动图" }), !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "convert-to-float", row: e, col: t, size: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /**
   * 批量把多格 DISPIMG 拎成浮动图(选区批量反向);非内嵌图格自动跳过;一次进撤销栈。
   * 返回成功转换的张数。
   * Phase A 补漏: 过滤掉源格只读的, denied 一次性 emit.
   */
  convertCellImagesToFloats(e) {
    var a, c, d;
    if (!this.host.isEditingEnabled() || !e.length) return 0;
    const t = [], o = [];
    for (const u of e)
      this.host.isEditable(u.row, u.col) ? o.push(u) : t.push({ row: u.row, col: u.col });
    if (t.length && this.host.emit("permission-denied", { reason: "image-convert", cells: t, message: `${t.length} 个源格只读,已跳过` }), !o.length) return 0;
    const i = this.host.getSheet(), s = (a = i == null ? void 0 : i.images.length) != null ? a : 0;
    this.ensureBaseline();
    const r = this.exec({ kind: "convert-to-floats", cells: o }, "api");
    r && (this.pushUndo(r), this.markDirty());
    const l = (d = (c = this.host.getSheet()) == null ? void 0 : c.images.length) != null ? d : s;
    return Math.max(0, l - s);
  }
  // ---- 维度编辑(列宽/行高;E3.5:resize 入命令栈) ----
  /** 程序化设列宽/行高(API 路径:apply-via-command)。返回是否生效。 */
  setDimension(e, t, o) {
    if (!this.host.isEditingEnabled()) return !1;
    this.ensureBaseline();
    const i = this.exec({ kind: "set-dim", axis: e, index: t, size: o }, "api");
    return i && (this.pushUndo(i), this.markDirty()), !!i;
  }
  /**
   * 批量设维度尺寸 (Phase B, 2026-06-08). target 接 number | number[] | {from,to}.
   * 多 index 时聚合成单次 restore-wb undo (跟 convertImagesToCells 范式一致).
   * strictDimensions=true + 白名单未覆盖某 index → skip 那个 + 累计 deniedDims; 整次结束 emit 一次 permission-denied.
   * 返回成功条数 (0 = 全 skip / editable=false).
   */
  setDimensions(e, t, o, i) {
    var u, h;
    if (!this.host.isEditingEnabled() || !t.length) return 0;
    const s = this.host.getSheet(), r = this.host.getWorkbook();
    if (!s || !r) return 0;
    const l = [], a = [];
    for (const p of t)
      p < 0 || (i(p) ? l.push(p) : a.push(p));
    if (a.length && this.host.emit("permission-denied", { reason: "dimension", cells: [], dims: { axis: e, indices: a }, message: `${a.length} 个 ${e} 未覆盖白名单,已跳过` }), !l.length) return 0;
    if (l.length === 1)
      return this.setDimension(e, l[0], o) ? 1 : 0;
    this.ensureBaseline();
    const c = we(r);
    let d = 0;
    for (const p of l) {
      const m = Qo(s, e, p);
      if (e === "col") {
        const b = s.columns.get(p);
        s.columns.set(p, { width: o, hidden: (u = b == null ? void 0 : b.hidden) != null ? u : !1 });
      } else {
        const b = s.rows.get(p);
        s.rows.set(p, { height: o, hidden: (h = b == null ? void 0 : b.hidden) != null ? h : !1 });
      }
      d++, this.host.emit("dim-change", { axis: e, index: p, before: m, after: o, source: "api" });
    }
    return this.pushUndo({ kind: "restore-wb", snapshot: c }), this.markDirty(), this.host.onModelChange(), d;
  }
  /**
   * 重置某些列宽/行高到默认 (Phase B, 2026-06-08) — 移除 columns/rows Map 条目, 渲染回落 defaultColWidth/Height.
   * 多 index 时单次 restore-wb undo.
   */
  resetDimensions(e, t, o) {
    if (!this.host.isEditingEnabled() || !t.length) return 0;
    const i = this.host.getSheet(), s = this.host.getWorkbook();
    if (!i || !s) return 0;
    const r = [], l = [];
    for (const u of t)
      u < 0 || (o(u) ? r.push(u) : l.push(u));
    if (l.length && this.host.emit("permission-denied", { reason: "dimension", cells: [], dims: { axis: e, indices: l }, message: `${l.length} 个 ${e} 未覆盖白名单,已跳过 reset` }), !r.length) return 0;
    this.ensureBaseline();
    const a = we(s);
    let c = 0;
    const d = e === "col" ? i.defaultColWidth : i.defaultRowHeight;
    for (const u of r) {
      const h = Qo(i, e, u);
      e === "col" ? i.columns.delete(u) : i.rows.delete(u), c++, h !== d && this.host.emit("dim-change", { axis: e, index: u, before: h, after: d, source: "api" });
    }
    return this.pushUndo({ kind: "restore-wb", snapshot: a }), this.markDirty(), this.host.onModelChange(), c;
  }
  /**
   * 补登一次维度变更(拖拽/autofit 路径:模型已被 renderer 改完,这里只补 undo 项 + 发事件)。
   * baseline 须在变更前(拖拽起始/autofit 前)由调用方 ensureBaseline() 捕获。
   */
  recordDimEdit(e, t, o, i, s) {
    i !== s && (this.pushUndo({ kind: "restore-dim", axis: e, index: t, info: o }), this.markDirty(), this.host.emit("dim-change", { axis: e, index: t, before: i, after: s, source: "ui" }));
  }
  // ---- 脏状态 + 原件还原(E3.5) ----
  /** editable 时懒捕获 baseline(首次编辑/resize 前调,模型仍原始);幂等。 */
  ensureBaseline() {
    if (!this.host.isEditingEnabled()) return;
    const e = this.host.getWorkbook();
    !e || this.baselineFor === e || (this.baseline = we(e), this.baselineFor = e);
  }
  /**
   * 是否有未保存修改(WPS `*`):当前会话有可撤销编辑,**或**切表前已累积编辑。
   * **彻底撤回(undo 栈清空且无跨会话脏)→ 视为未改动**(同 WPS)。
   */
  isDirty() {
    return this.undoStack.length > 0 || this.priorSessionDirty;
  }
  /** 按真值现算脏态,仅在翻转时发 dirty-change(去重)。 */
  syncDirty() {
    const e = this.isDirty();
    e !== this.dirty && (this.dirty = e, this.host.emit("dirty-change", { dirty: e }));
  }
  markDirty() {
    this.syncDirty();
  }
  /** 换新工作簿(非切表)时:作废 baseline + 命令栈 + 清脏(新簿旧历史无意义;切表保留见 controller 判定)。 */
  resetDirtyBaseline() {
    this.baseline = null, this.baselineFor = null, this.priorSessionDirty = !1, this.undoStack = [], this.redoStack = [], this.syncDirty();
  }
  /** 放弃全部修改,还原到刚加载的原件。返回是否还原(无 baseline → false)。 */
  resetToOriginal() {
    const e = this.host.getWorkbook();
    return !e || !this.baseline ? !1 : (Jr(e, this.baseline), this.undoStack = [], this.redoStack = [], this.priorSessionDirty = !1, this.editing = null, this.host.onModelChange(), this.syncDirty(), !0);
  }
  undo() {
    const e = this.undoStack.pop();
    if (!e) return;
    const t = this.exec(e, "undo");
    t && this.redoStack.push(t), this.syncDirty();
  }
  redo() {
    const e = this.redoStack.pop();
    if (!e) return;
    const t = this.exec(e, "redo");
    t && this.undoStack.push(t), this.syncDirty();
  }
  // ---- 内部 ----
  collectEditable(e, t) {
    const o = [];
    for (let i = 0; i < t.length; i++)
      for (let s = 0; s < t[i].length; s++) {
        const r = e.top + i, l = e.left + s;
        this.host.isEditable(r, l) && o.push({ row: r, col: l, value: t[i][s] });
      }
    return o;
  }
  pushUndo(e) {
    this.undoStack.push(e), this.undoStack.length > this.limit && this.undoStack.shift(), this.redoStack = [];
  }
  /** 公开版 pushUndo (Phase B 2026-06-08): 给 controller 的批量 autoFit 用. 一般业务不要直调. */
  pushUndoExternal(e) {
    this.pushUndo(e);
  }
  /** 公开版 markDirty: 给 controller 的批量 autoFit 用. 一般业务不要直调. */
  markDirtyExternal() {
    this.markDirty();
  }
  /** 应用一条命令:建前快照 → apply → 重绘 → 发事件(cell 族 cell-change / dim 族 dim-change)。返回逆命令。 */
  exec(e, t) {
    var d;
    const o = this.host.getSheet();
    if (!o) return null;
    if (Dg(e)) {
      const u = Qo(o, e.axis, e.index), { inverse: h } = go(o, e);
      this.host.onModelChange();
      const p = Qo(o, e.axis, e.index);
      return this.host.emit("dim-change", { axis: e.axis, index: e.index, before: u, after: p, source: t }), h;
    }
    if (Bg(e)) {
      const u = e.kind === "image-add" ? (d = e.index) != null ? d : o.images.length : e.index, h = e.kind === "image-add" ? null : o.images[e.index] ? Ee(o.images[e.index]) : null, { inverse: p } = go(o, e), m = e.kind === "image-remove" ? null : o.images[u] ? Ee(o.images[u]) : null;
      return e.kind === "image-set" ? this.host.onModelChange() : this.host.rebuildOverlays(), this.host.emit("image-change", { index: u, before: h, after: m, source: t }), p;
    }
    if (e.kind === "convert-to-cell" || e.kind === "convert-to-cells" || e.kind === "convert-to-float" || e.kind === "convert-to-floats") {
      const u = this.host.getWorkbook();
      if (!u) return null;
      const h = this.host.getDate1904(), p = e.kind === "convert-to-cells" ? e.targets.map((y) => ({ row: y.row, col: y.col })) : e.kind === "convert-to-floats" ? e.cells.map((y) => ({ row: y.row, col: y.col })) : [{ row: e.row, col: e.col }], m = p.map((y) => ze(o, y.row, y.col, h)), b = we(u);
      let v = !1;
      if (e.kind === "convert-to-cell")
        v = Si(u, o, e.imageIndex, e.row, e.col) !== null;
      else if (e.kind === "convert-to-float")
        v = _r(u, o, e.row, e.col, e.size) !== -1;
      else if (e.kind === "convert-to-floats")
        for (const y of e.cells) _r(u, o, y.row, y.col, y.size) !== -1 && (v = !0);
      else {
        const y = [...e.targets].sort((w, S) => S.imageIndex - w.imageIndex);
        for (const w of y) Si(u, o, w.imageIndex, w.row, w.col) !== null && (v = !0);
      }
      return v ? (this.host.rebuildOverlays(), this.host.onModelChange(), this.host.isRecalcEnabled() && this.refreshEngine(), p.forEach(
        (y, w) => this.host.emit("cell-change", { before: m[w], after: ze(o, y.row, y.col, h), source: t })
      ), this.host.emit("image-change", { index: -1, before: null, after: null, source: t }), { kind: "restore-wb", snapshot: b }) : null;
    }
    if (Wg(e)) {
      const u = this.host.getWorkbook();
      if (!u) return null;
      const h = this.host.getActiveSheetIndex();
      let p;
      if (e.kind === "struct-edit") {
        const b = we(u);
        kg(u.sheets[h], e.op, e.at, e.count), Yg(u, h, e.op, e.at, e.count), p = { kind: "restore-wb", snapshot: b };
      } else {
        const b = we(u);
        Jr(u, e.snapshot), p = { kind: "restore-wb", snapshot: b };
      }
      this.host.onModelChange(), this.host.rebuildOverlays(), this.host.isRecalcEnabled() && this.refreshEngine();
      const m = e.kind === "struct-edit" ? { op: e.op, at: e.at, count: e.count, source: t } : { op: "restore", source: t };
      return this.host.emit("struct-change", m), p;
    }
    const i = this.host.getDate1904(), s = dc(e), r = s.map((u) => ze(o, u.row, u.col, i)), { inverse: l } = go(o, e);
    let a = [], c = [];
    if (e.kind !== "set-style" && this.engineReady() && this.calcMode === "auto") {
      const u = this.host.getWorkbook(), h = this.host.getActiveSheetIndex(), p = Gg(this.engine, u, h, s);
      a = Kg(p, h, s), c = a.map((m) => ze(o, m.row, m.col, i)), Xg(u, p);
    }
    return this.host.onModelChange(), s.forEach((u, h) => {
      const p = ze(o, u.row, u.col, i);
      this.host.emit("cell-change", { before: r[h], after: p, source: t });
    }), a.forEach((u, h) => {
      const p = ze(o, u.row, u.col, i);
      this.host.emit("cell-change", { before: c[h], after: p, source: t });
    }), l;
  }
}
const Qg = ["#DIV/0!", "#N/A", "#NAME?", "#NULL!", "#NUM!", "#REF!", "#VALUE!", "#SPILL!"], gc = /^(\$?)([A-Za-z]{1,3})(\$?)(\d+)/, mc = /^(?:'((?:[^']|'')*)'|([A-Za-z_一-龥][A-Za-z0-9_.一-龥]*))!/;
function em(n) {
  const e = [];
  let t = 0;
  const o = n, i = o.length;
  for (; t < i; ) {
    const s = o[t];
    if (s === " " || s === "	" || s === `
` || s === "\r") {
      t++;
      continue;
    }
    if (s === '"') {
      let h = t + 1, p = "";
      for (; h < i; ) {
        if (o[h] === '"') {
          if (o[h + 1] === '"') {
            p += '"', h += 2;
            continue;
          }
          break;
        }
        p += o[h], h++;
      }
      e.push({ k: "str", v: p }), t = h + 1;
      continue;
    }
    if (s === "#") {
      const h = Qg.find((p) => o.startsWith(p, t));
      if (h) {
        e.push({ k: "err", v: h }), t += h.length;
        continue;
      }
    }
    if (s === "(") {
      e.push({ k: "lparen" }), t++;
      continue;
    }
    if (s === ")") {
      e.push({ k: "rparen" }), t++;
      continue;
    }
    if (s === ",") {
      e.push({ k: "comma" }), t++;
      continue;
    }
    if (s === "<" && o[t + 1] === ">") {
      e.push({ k: "op", v: "<>" }), t += 2;
      continue;
    }
    if (s === "<" && o[t + 1] === "=") {
      e.push({ k: "op", v: "<=" }), t += 2;
      continue;
    }
    if (s === ">" && o[t + 1] === "=") {
      e.push({ k: "op", v: ">=" }), t += 2;
      continue;
    }
    if ("+-*/^&=<>%:".includes(s)) {
      e.push({ k: "op", v: s }), t++;
      continue;
    }
    if (/[0-9]/.test(s) || s === "." && /[0-9]/.test(o[t + 1] || "")) {
      const h = /^[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(o.slice(t));
      e.push({ k: "num", v: parseFloat(h[0]) }), t += h[0].length;
      continue;
    }
    const r = o.slice(t), l = mc.exec(r);
    let a = "", c = 0;
    l && (a = r.slice(0, l[0].length), c = l[0].length);
    const d = gc.exec(r.slice(c));
    if (d && !/[A-Za-z0-9_]/.test(r[c + d[0].length] || "")) {
      e.push({ k: "ref", v: a + d[0] }), t += c + d[0].length;
      continue;
    }
    const u = /^[A-Za-z_一-龥][A-Za-z0-9_.一-龥]*/.exec(r);
    if (u) {
      e.push({ k: "name", v: u[0] }), t += u[0].length;
      continue;
    }
    throw new Error("formula: unexpected char " + s);
  }
  return e;
}
function nl(n) {
  let e = null, t = n;
  const o = mc.exec(n);
  o && (e = o[1] != null ? o[1].replace(/''/g, "'") : o[2], t = n.slice(o[0].length));
  const i = gc.exec(t), s = i[1] === "$", r = tm(i[2].toUpperCase()), l = i[3] === "$", a = parseInt(i[4], 10) - 1;
  return { t: "ref", sheet: e, row: a, col: r, absRow: l, absCol: s };
}
function tm(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++) e = e * 26 + (n.charCodeAt(t) - 64);
  return e - 1;
}
class om {
  constructor(e) {
    T(this, "p", 0);
    this.toks = e;
  }
  peek() {
    return this.toks[this.p];
  }
  next() {
    return this.toks[this.p++];
  }
  eat(e) {
    const t = this.next();
    if (!t || t.k !== e) throw new Error("formula: expected " + e);
    return t;
  }
  parse() {
    const e = this.parseCompare();
    if (this.p < this.toks.length) throw new Error("formula: trailing tokens");
    return e;
  }
  isOp(...e) {
    const t = this.peek();
    return !!t && t.k === "op" && e.includes(t.v);
  }
  parseCompare() {
    let e = this.parseConcat();
    for (; this.isOp("=", "<>", "<", ">", "<=", ">="); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parseConcat() };
    return e;
  }
  parseConcat() {
    let e = this.parseAdd();
    for (; this.isOp("&"); )
      this.next(), e = { t: "bin", op: "&", l: e, r: this.parseAdd() };
    return e;
  }
  parseAdd() {
    let e = this.parseMul();
    for (; this.isOp("+", "-"); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parseMul() };
    return e;
  }
  parseMul() {
    let e = this.parsePow();
    for (; this.isOp("*", "/"); )
      e = { t: "bin", op: this.next().v, l: e, r: this.parsePow() };
    return e;
  }
  parsePow() {
    const e = this.parseUnary();
    return this.isOp("^") ? (this.next(), { t: "bin", op: "^", l: e, r: this.parsePow() }) : e;
  }
  parseUnary() {
    return this.isOp("-", "+") ? { t: "unary", op: this.next().v, x: this.parseUnary() } : this.parsePostfix();
  }
  parsePostfix() {
    let e = this.parsePrimary();
    for (; this.isOp("%"); )
      this.next(), e = { t: "unary", op: "%", x: e };
    return e;
  }
  parsePrimary() {
    var t;
    const e = this.next();
    if (!e) throw new Error("formula: unexpected end");
    if (e.k === "num") return { t: "num", v: e.v };
    if (e.k === "str") return { t: "str", v: e.v };
    if (e.k === "err") return { t: "err", v: e.v };
    if (e.k === "lparen") {
      const o = this.parseCompare();
      return this.eat("rparen"), o;
    }
    if (e.k === "ref") {
      const o = nl(e.v);
      if (this.isOp(":")) {
        this.next();
        const i = this.eat("ref");
        return { t: "range", a: o, b: nl(i.v) };
      }
      return o;
    }
    if (e.k === "name") {
      const o = e.v.toUpperCase();
      if (((t = this.peek()) == null ? void 0 : t.k) === "lparen") {
        this.next();
        const i = this.parseArgs();
        return this.eat("rparen"), { t: "func", name: o, args: i };
      }
      return o === "TRUE" ? { t: "bool", v: !0 } : o === "FALSE" ? { t: "bool", v: !1 } : { t: "err", v: "#NAME?" };
    }
    throw new Error("formula: unexpected token");
  }
  parseArgs() {
    var t, o;
    const e = [];
    if (((t = this.peek()) == null ? void 0 : t.k) === "rparen") return e;
    for (e.push(this.parseCompare()); ((o = this.peek()) == null ? void 0 : o.k) === "comma"; )
      this.next(), e.push(this.parseCompare());
    return e;
  }
}
function bc(n) {
  const e = n[0] === "=" ? n.slice(1) : n;
  return new om(em(e)).parse();
}
function Qt(n, e) {
  switch (n.t) {
    case "num":
      return n.v;
    case "str":
      return n.v;
    case "bool":
      return n.v;
    case "err":
      return new Ke(n.v);
    case "ref":
      return e.getCell(n.sheet, n.row, n.col);
    case "range": {
      const t = Math.min(n.a.row, n.b.row), o = Math.max(n.a.row, n.b.row), i = Math.min(n.a.col, n.b.col), s = Math.max(n.a.col, n.b.col), r = [];
      for (let l = t; l <= o; l++) {
        const a = [];
        for (let c = i; c <= s; c++) a.push(e.getCell(n.a.sheet, l, c));
        r.push(a);
      }
      return { __m: !0, rows: r };
    }
    case "unary": {
      const t = xn(fe(Qt(n.x, e)));
      return G(t) ? t : n.op === "%" ? t / 100 : n.op === "-" ? -t : t;
    }
    case "bin":
      return nm(n.op, Qt(n.l, e), Qt(n.r, e));
    case "func": {
      const t = za[n.name];
      if (!t) return ue.name();
      const o = n.args.map((i) => Qt(i, e));
      try {
        return t(o);
      } catch (i) {
        return ue.value();
      }
    }
  }
}
function nm(n, e, t) {
  const o = fe(e), i = fe(t);
  if (G(o)) return o;
  if (G(i)) return i;
  if (n === "&") {
    const l = wn(o), a = wn(i);
    return G(l) ? l : G(a) ? a : l + a;
  }
  if (n === "=" || n === "<>" || n === "<" || n === ">" || n === "<=" || n === ">=") return im(n, o, i);
  const s = xn(o), r = xn(i);
  if (G(s)) return s;
  if (G(r)) return r;
  switch (n) {
    case "+":
      return s + r;
    case "-":
      return s - r;
    case "*":
      return s * r;
    case "/":
      return r === 0 ? ue.div0() : s / r;
    case "^": {
      const l = Math.pow(s, r);
      return isNaN(l) ? ue.num() : l;
    }
  }
}
function im(n, e, t) {
  let o;
  if (typeof e == "number" && typeof t == "number") o = e === t ? 0 : e < t ? -1 : 1;
  else if (typeof e == "boolean" || typeof t == "boolean")
    o = (e === !0 ? 1 : 0) - (t === !0 ? 1 : 0);
  else {
    const i = String(e != null ? e : "").toLowerCase(), s = String(t != null ? t : "").toLowerCase();
    o = i === s ? 0 : i < s ? -1 : 1;
  }
  switch (n) {
    case "=":
      return o === 0;
    case "<>":
      return o !== 0;
    case "<":
      return o < 0;
    case ">":
      return o > 0;
    case "<=":
      return o <= 0;
    case ">=":
      return o >= 0;
    default:
      return !1;
  }
}
const sm = async () => new lm(), bo = (n, e, t) => `${n}:${e}:${t}`, rm = 1e5;
class lm {
  constructor() {
    T(this, "sheets", []);
    T(this, "nameToIndex", /* @__PURE__ */ new Map());
    T(this, "dependents", /* @__PURE__ */ new Map());
  }
  // 前驱格 key → 依赖它的公式格 key 集合
  setSheets(e) {
    this.sheets = [], this.nameToIndex.clear(), this.dependents.clear();
    for (let o = 0; o < e.sheets.length; o++) this.nameToIndex.set(e.sheets[o].name || `Sheet${o + 1}`, o);
    for (let o = 0; o < e.sheets.length; o++) {
      const i = e.sheets[o], s = /* @__PURE__ */ new Map();
      for (const r of i.cells.values()) {
        const l = am(r);
        l != null && s.set(bo(o, r.row, r.col), this.makeCell(o, r.row, r.col, l, !1));
      }
      this.sheets.push({ name: e.sheets[o].name || `Sheet${o + 1}`, cells: s, rows: Math.max(i.dimension.rows, 1), cols: Math.max(i.dimension.cols, 1) });
    }
    const t = [];
    for (let o = 0; o < this.sheets.length; o++) for (const [i, s] of this.sheets[o].cells) s.ast !== void 0 && (this.addDeps(i, s.prec), t.push(i));
    this.recompute(t);
  }
  setCell(e, t, o, i) {
    var u, h, p, m, b, v, y;
    const s = this.sheets[e];
    if (!s) return [];
    const r = bo(e, t, o), l = s.cells.get(r);
    if (l != null && l.prec && this.removeDeps(r, l.prec), i == null || i === "")
      s.cells.delete(r);
    else {
      const w = this.makeCell(e, t, o, i, !0);
      s.cells.set(r, w), w.ast !== void 0 && this.addDeps(r, w.prec);
    }
    const a = this.closure(r), c = /* @__PURE__ */ new Map();
    for (const w of a) c.set(w, (h = (u = this.cellAt(w)) == null ? void 0 : u.value) != null ? h : null);
    this.recompute([...a]);
    const d = [];
    for (const w of a) {
      const S = (m = (p = this.cellAt(w)) == null ? void 0 : p.value) != null ? m : null;
      if (!um((b = c.get(w)) != null ? b : null, S)) {
        const [k, C, M] = w.split(":").map(Number);
        d.push({ sheet: k, row: C, col: M, value: Ii(S) });
      }
    }
    if (!a.has(r)) {
      const w = (y = (v = this.cellAt(r)) == null ? void 0 : v.value) != null ? y : null;
      d.push({ sheet: e, row: t, col: o, value: Ii(w) });
    }
    return d;
  }
  getValue(e, t, o) {
    var i, s, r;
    return Ii((r = (s = (i = this.sheets[e]) == null ? void 0 : i.cells.get(bo(e, t, o))) == null ? void 0 : s.value) != null ? r : null);
  }
  destroy() {
    this.sheets = [], this.nameToIndex.clear(), this.dependents.clear();
  }
  // ---------------- 内部 ----------------
  makeCell(e, t, o, i, s) {
    if (typeof i == "string" && i[0] === "=")
      try {
        const r = bc(i);
        return { formula: i, ast: r, value: null, prec: cm(r, e, this.nameToIndex) };
      } catch (r) {
        return { formula: i, ast: null, value: ue.name(), prec: [] };
      }
    return { value: i };
  }
  cellAt(e) {
    var o;
    const t = e.indexOf(":");
    return (o = this.sheets[Number(e.slice(0, t))]) == null ? void 0 : o.cells.get(e);
  }
  addDeps(e, t) {
    for (const o of t != null ? t : []) this.eachPrecCell(o, (i) => {
      let s = this.dependents.get(i);
      s || this.dependents.set(i, s = /* @__PURE__ */ new Set()), s.add(e);
    });
  }
  removeDeps(e, t) {
    for (const o of t) this.eachPrecCell(o, (i) => {
      var s;
      (s = this.dependents.get(i)) == null || s.delete(e);
    });
  }
  eachPrecCell(e, t) {
    let o = e.r1, i = e.c1;
    for (; (o - e.r0 + 1) * (i - e.c0 + 1) > rm && (o - e.r0 > i - e.c0 ? o-- : i--, !(o < e.r0 || i < e.c0)); )
      ;
    for (let s = e.r0; s <= o; s++) for (let r = e.c0; r <= i; r++) t(bo(e.sheet, s, r));
  }
  /** 传递闭包:start + 所有(直接/间接)依赖它的公式格。 */
  closure(e) {
    const t = /* @__PURE__ */ new Set([e]), o = [e];
    for (; o.length; ) {
      const i = o.pop(), s = this.dependents.get(i);
      if (s)
        for (const r of s) t.has(r) || (t.add(r), o.push(r));
    }
    return t;
  }
  /** 递归求值一组格(memo 保证拓扑序;computing 栈检测循环 → #REF!)。 */
  recompute(e) {
    const t = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), i = (s) => {
      const r = this.cellAt(s);
      if (!r) return null;
      if (r.ast === void 0 || t.has(s)) return r.value;
      if (o.has(s)) return ue.ref();
      if (r.ast === null)
        return t.add(s), r.value;
      o.add(s);
      const l = Number(s.slice(0, s.indexOf(":"))), a = {
        getCell: (d, u, h) => {
          var v;
          const p = d == null ? l : this.nameToIndex.get(d);
          if (p == null) return ue.ref();
          const m = bo(p, u, h), b = (v = this.sheets[p]) == null ? void 0 : v.cells.get(m);
          return b ? b.ast !== void 0 && !t.has(m) ? i(m) : b.value : null;
        }
      }, c = dm(Qt(r.ast, a));
      return o.delete(s), t.add(s), r.value = c, c;
    };
    for (const s of e) i(s);
  }
}
function am(n) {
  if (n.type === "formula") {
    const t = n.formula;
    return t ? t[0] === "=" ? t : "=" + t : null;
  }
  const e = n.raw;
  return typeof e == "number" || typeof e == "boolean" || typeof e == "string" ? e : null;
}
function cm(n, e, t) {
  const o = [], i = (s) => {
    switch (s.t) {
      case "ref": {
        const r = s.sheet == null ? e : t.get(s.sheet);
        r != null && o.push({ sheet: r, r0: s.row, c0: s.col, r1: s.row, c1: s.col });
        break;
      }
      case "range": {
        const r = s.a.sheet == null ? e : t.get(s.a.sheet);
        r != null && o.push({ sheet: r, r0: Math.min(s.a.row, s.b.row), c0: Math.min(s.a.col, s.b.col), r1: Math.max(s.a.row, s.b.row), c1: Math.max(s.a.col, s.b.col) });
        break;
      }
      case "unary":
        i(s.x);
        break;
      case "bin":
        i(s.l), i(s.r);
        break;
      case "func":
        s.args.forEach(i);
        break;
    }
  };
  return i(n), o;
}
function dm(n) {
  if (n && typeof n == "object" && "__m" in n) {
    const e = n.rows;
    return e.length && e[0].length ? e[0][0] : ue.value();
  }
  return n;
}
function Ii(n) {
  return G(n) ? n.code : n;
}
function um(n, e) {
  return n instanceof Ke && e instanceof Ke ? n.code === e.code : n === e;
}
const hm = 864e5, fm = [
  ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
];
function il(n, e, t = !1) {
  if (e <= 0) return [];
  const o = n.length ? n : [null], i = () => Array.from({ length: e }, (l, a) => o[a % o.length]);
  if (o.every((l) => typeof l == "number")) {
    const l = o;
    if (!(l.length >= 2 !== t)) return i();
    const c = l.length >= 2 ? Mn(l) : 1, d = l[l.length - 1];
    return Array.from({ length: e }, (u, h) => d + c * (h + 1));
  }
  if (o.every((l) => l instanceof Date)) {
    if (t) return i();
    const l = o.map((d) => d.getTime()), a = l.length >= 2 ? Mn(l) : hm, c = l[l.length - 1];
    return Array.from({ length: e }, (d, u) => new Date(c + a * (u + 1)));
  }
  const s = gm(o);
  if (s) {
    if (t) return i();
    const { list: l, lastIdx: a, step: c } = s;
    return Array.from({ length: e }, (d, u) => l[pm(a + c * (u + 1), l.length)]);
  }
  const r = bm(o);
  if (r) {
    if (t) return i();
    const { prefix: l, suffix: a, lastNum: c, step: d, pad: u } = r;
    return Array.from({ length: e }, (h, p) => `${l}${ym(c + d * (p + 1), u)}${a}`);
  }
  return i();
}
function Mn(n) {
  let e = 0;
  for (let t = 1; t < n.length; t++) e += n[t] - n[t - 1];
  return e / (n.length - 1);
}
function pm(n, e) {
  return (n % e + e) % e;
}
function gm(n) {
  if (!n.every((t) => typeof t == "string")) return null;
  const e = n;
  for (const t of fm) {
    const o = e.map((s) => t.indexOf(s));
    if (o.some((s) => s < 0)) continue;
    const i = o.length >= 2 && Math.round(Mn(o.map((s) => mm(s, o[0], t.length)))) || 1;
    return { list: t, lastIdx: o[o.length - 1], step: i };
  }
  return null;
}
function mm(n, e, t) {
  return n < e ? n + t : n;
}
function bm(n) {
  if (!n.every((u) => typeof u == "string")) return null;
  const e = n, t = /^(.*?)(\d+)(\D*)$/, o = e.map((u) => t.exec(u));
  if (o.some((u) => !u)) return null;
  const i = o, s = i[i.length - 1][1], r = i[i.length - 1][3];
  if (!i.every((u) => u[1] === s && u[3] === r)) return null;
  const l = i.map((u) => parseInt(u[2], 10)), a = l.length >= 2 && Math.round(Mn(l)) || 1, c = i[i.length - 1][2], d = c.length > 1 && c[0] === "0" ? c.length : 0;
  return { prefix: s, suffix: r, lastNum: l[l.length - 1], step: a, pad: d };
}
function ym(n, e) {
  const t = String(Math.abs(n)), o = e > 0 ? t.padStart(e, "0") : t;
  return n < 0 ? "-" + o : o;
}
function vm(n, e, t) {
  const o = new Date(n.getTime());
  if (e === "day") o.setDate(o.getDate() + t);
  else if (e === "month") o.setMonth(o.getMonth() + t);
  else if (e === "year") o.setFullYear(o.getFullYear() + t);
  else {
    let i = Math.abs(t);
    const s = t < 0 ? -1 : 1;
    for (; i > 0; ) {
      o.setDate(o.getDate() + s);
      const r = o.getDay();
      r !== 0 && r !== 6 && i--;
    }
  }
  return o;
}
function sl(n, e, t) {
  const o = [];
  if (t.type === "date") {
    let s = n instanceof Date ? new Date(n.getTime()) : /* @__PURE__ */ new Date();
    for (let r = 0; r < e; r++)
      s = vm(s, t.dateUnit || "day", t.step), o.push(new Date(s.getTime()));
    return o;
  }
  let i = typeof n == "number" ? n : 0;
  for (let s = 0; s < e && (i = t.type === "growth" ? i * t.step : i + t.step, !(t.stop != null && (t.step >= 0 && i > t.stop || t.step < 0 && i < t.stop))); s++)
    o.push(i);
  return o;
}
const xm = [" ", ",", "@", "/", "	", "-", "_", ".", ":", "|"], wm = 2;
function yc(n, e) {
  return n.split(e).filter((t) => t.length > 0);
}
function km(n, e, t) {
  const o = [];
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    if (r) {
      e.startsWith(r, t) && o.push({ part: { kind: "full", col: s }, len: r.length, generality: 3 });
      for (const l of xm) {
        if (r.indexOf(l) < 0) continue;
        const a = yc(r, l);
        for (let c = 0; c < a.length; c++)
          if (e.startsWith(a[c], t)) {
            const d = c === a.length - 1;
            o.push({ part: { kind: "token", col: s, index: d ? 0 : c, fromEnd: d, delim: l }, len: a[c].length, generality: 2 });
          }
      }
      for (let l = 0; l < r.length; l++) {
        let a = 0;
        for (; l + a < r.length && t + a < e.length && r[l + a] === e[t + a]; ) a++;
        a >= wm && o.push({ part: { kind: "substr", col: s, start: l, len: a }, len: a, generality: 1 });
      }
    }
  }
  let i;
  for (const s of o) (!i || s.len > i.len || s.len === i.len && s.generality > i.generality) && (i = s);
  return i ? { part: i.part, len: i.len } : null;
}
function rl(n, e) {
  if (!e) return null;
  const t = [], o = (s) => {
    const r = t[t.length - 1];
    r && r.kind === "lit" ? r.text += s : t.push({ kind: "lit", text: s });
  };
  let i = 0;
  for (; i < e.length; ) {
    const s = km(n, e, i);
    s ? (t.push(s.part), i += s.len) : (o(e[i]), i += 1);
  }
  return { parts: t };
}
function ll(n, e) {
  let t = "";
  for (const o of n.parts) {
    if (o.kind === "lit") {
      t += o.text;
      continue;
    }
    const i = e[o.col];
    if (i == null) return null;
    if (o.kind === "full") {
      t += i;
      continue;
    }
    if (o.kind === "token") {
      const s = yc(i, o.delim), r = o.fromEnd ? s.length - 1 - o.index : o.index;
      if (r < 0 || r >= s.length) return null;
      t += s[r];
      continue;
    }
    if (o.start >= i.length) return null;
    t += i.slice(o.start, o.start + o.len);
  }
  return t;
}
function Sm(n, e) {
  if (!e.length) return null;
  const t = (r) => e.every((l) => ll(r, n[l.row]) === l.output);
  let o = null;
  for (const r of e) {
    const l = rl(n[r.row], r.output);
    if (l && t(l)) {
      o = l;
      break;
    }
  }
  if (o || (o = rl(n[e[0].row], e[0].output)), !o || !o.parts.length) return null;
  const i = new Set(e.map((r) => r.row)), s = [];
  for (let r = 0; r < n.length; r++) {
    if (i.has(r) || n[r].every((a) => !a || !a.trim())) continue;
    const l = ll(o, n[r]);
    l != null && l !== "" && s.push({ row: r, value: l });
  }
  return s.length ? { program: o, outputs: s } : null;
}
function Cm(n) {
  if (n.length < 8) return null;
  const e = new DataView(n.buffer, n.byteOffset, n.byteLength);
  let t = 8;
  for (; t + 12 <= n.length; ) {
    const o = e.getUint32(t), i = String.fromCharCode(n[t + 4], n[t + 5], n[t + 6], n[t + 7]);
    if (i === "pHYs") {
      if (t + 8 + 9 > n.length) return null;
      const s = e.getUint32(t + 8);
      return n[t + 8 + 8] === 1 && s > 0 ? Math.round(s * 0.0254) : null;
    }
    if (i === "IDAT" || i === "IEND") return null;
    t += 12 + o;
  }
  return null;
}
function Em(n) {
  if (n.length < 4) return null;
  const e = new DataView(n.buffer, n.byteOffset, n.byteLength);
  if (e.getUint16(0) !== 65496) return null;
  let t = 2;
  for (; t + 4 <= n.length; ) {
    if (n[t] !== 255) return null;
    const o = n[t + 1];
    if (o === 218 || o === 217) return null;
    const i = e.getUint16(t + 2);
    if (o === 224 && t + 4 + 12 <= n.length) {
      if (n[t + 4] === 74 && n[t + 5] === 70 && n[t + 6] === 73 && n[t + 7] === 70 && n[t + 8] === 0) {
        const s = n[t + 11], r = e.getUint16(t + 12);
        if (s === 1 && r > 0) return r;
        if (s === 2 && r > 0) return Math.round(r * 2.54);
      }
      return null;
    }
    t += 2 + i;
  }
  return null;
}
function al(n, e) {
  try {
    const t = (e || "").toLowerCase();
    if (t.includes("png")) return Cm(n);
    if (t.includes("jpeg") || t.includes("jpg")) return Em(n);
  } catch (t) {
  }
  return null;
}
function cl(n, e, t = 600) {
  const i = 96 / (e && e > 0 ? e : 96);
  let s = Math.max(1, n.width) * i, r = Math.max(1, n.height) * i;
  const l = Math.min(1, t / Math.max(s, r));
  return s *= l, r *= l, { width: Math.max(1, Math.round(s)), height: Math.max(1, Math.round(r)) };
}
const dl = 1024 * 1024;
function Tm(n) {
  return new Promise((e) => {
    if (typeof Image == "undefined") {
      e(null);
      return;
    }
    const t = new Image();
    t.onload = () => e(t), t.onerror = () => e(null), t.src = n;
  });
}
function Mm(n) {
  return new Promise((e, t) => {
    const o = new FileReader();
    o.onload = () => e(String(o.result)), o.onerror = () => t(o.error), o.readAsDataURL(n);
  });
}
async function Im(n, e = 1600, t = 0.82) {
  try {
    if (typeof document == "undefined") return n;
    const o = await Mm(n), i = await Tm(o);
    if (!i || !i.naturalWidth) return n;
    const s = Math.min(1, e / Math.max(i.naturalWidth, i.naturalHeight)), r = Math.max(1, Math.round(i.naturalWidth * s)), l = Math.max(1, Math.round(i.naturalHeight * s)), a = document.createElement("canvas");
    a.width = r, a.height = l;
    const c = a.getContext("2d");
    if (!c) return n;
    c.drawImage(i, 0, 0, r, l);
    const d = await new Promise((u) => a.toBlob((h) => u(h), "image/jpeg", t));
    return d && d.size < n.size ? d : n;
  } catch (o) {
    return n;
  }
}
const vc = "height:32px;padding:0 16px;border-radius:6px;cursor:pointer;font:inherit", $m = `${vc};border:1px solid #1b7f4d;background:#21a366;color:#fff`, ul = `${vc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function Am(n) {
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}
class Fm {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  show(e) {
    var a, c, d;
    if (typeof document == "undefined") {
      e.onKeep();
      return;
    }
    this.close();
    let t = !1;
    const o = (u) => {
      t || (t = !0, this.close(), u());
    }, i = document.createElement("div");
    i.className = "ooxml-image-oversize-mask", i.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center";
    const s = document.createElement("div");
    s.className = "ooxml-image-oversize-card", s.style.cssText = "width:400px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden";
    const r = e.count > 1 ? `${e.count} 张图片共 ` : "图片";
    s.innerHTML = [
      '<div style="padding:16px 18px 8px;font-weight:600;font-size:15px">图片较大</div>',
      `<div style="padding:0 18px 16px;color:#475467">${r}<b>${Am(e.totalBytes)}</b>,是否压缩以减小体积?<div style="color:#98a2b3;font-size:12px;margin-top:6px">压缩:等比缩到最长边 ≤ 1600px、重编码;保持原图:按原始文件插入。</div></div>`,
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 18px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${ul}">取消</button>`,
      `<button data-keep style="${ul}">保持原图</button>`,
      `<button data-compress style="${$m}">压缩</button>`,
      "</div>"
    ].join(""), i.appendChild(s), document.body.appendChild(i), this.el = i, (a = s.querySelector("[data-compress]")) == null || a.addEventListener("click", () => o(e.onCompress)), (c = s.querySelector("[data-keep]")) == null || c.addEventListener("click", () => o(e.onKeep)), (d = s.querySelector("[data-cancel]")) == null || d.addEventListener("click", () => o(e.onCancel)), i.addEventListener("mousedown", (u) => {
      u.target === i && o(e.onCancel);
    });
    const l = (u) => {
      u.key === "Escape" && o(e.onCancel);
    };
    document.addEventListener("keydown", l, !0), this.cleanup = () => document.removeEventListener("keydown", l, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const xc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Rm = `${xc};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Lm = `${xc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, $i = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit;width:96px";
class Pm {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o");
    T(this, "spec", { type: "linear", step: 1, dateUnit: "day" });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.spec = { type: "linear", step: 1, dateUnit: "day" };
    const t = document.createElement("div");
    t.className = "ooxml-series-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-series-card", o.style.cssText = "width:380px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (s) => {
      s.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (s) => {
      s.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(o);
  }
  render(e) {
    var r, l, a, c, d;
    const t = this.spec, o = (u, h) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 64px;color:#475467">${u}</span>${h}</div>`, i = (u, h) => `<label style="margin-right:14px;cursor:pointer"><input type="radio" name="stype" data-type="${u}"${t.type === u ? " checked" : ""}> ${h}</label>`, s = (u, h) => `<option value="${u}"${t.dateUnit === u ? " selected" : ""}>${h}</option>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>序列</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      o("类型", i("linear", "等差序列") + i("growth", "等比序列") + i("date", "日期")),
      t.type === "date" ? o("日期单位", `<select data-unit style="${$i};width:110px">${s("day", "日")}${s("weekday", "工作日")}${s("month", "月")}${s("year", "年")}</select>`) : "",
      o("步长值", `<input data-step type="number" value="${t.step}" style="${$i}">`),
      o("终止值", `<input data-stop type="number" placeholder="可选" style="${$i}">`),
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Lm}">取消</button><button data-ok style="${Rm}">确定</button>`,
      "</div>"
    ].join(""), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), e.querySelectorAll("[data-type]").forEach((u) => u.addEventListener("change", () => {
      this.spec.type = u.dataset.type, this.render(e);
    })), (a = e.querySelector("[data-unit]")) == null || a.addEventListener("change", (u) => {
      this.spec.dateUnit = u.target.value;
    }), (c = e.querySelector("[data-step]")) == null || c.addEventListener("change", (u) => {
      this.spec.step = Number(u.target.value) || 1;
    }), (d = e.querySelector("[data-ok]")) == null || d.addEventListener("click", () => {
      const u = e.querySelector("[data-stop]").value.trim(), h = e.querySelector("[data-step]").value;
      this.spec.step = Number(h) || 1, this.spec.stop = u === "" ? void 0 : Number(u), this.o.onApply(this.spec), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
class wc {
  constructor(e) {
    T(this, "prepared", []);
    this.sheet = e;
    for (const t of e.conditional)
      this.prepared.push(this.prepare(t));
  }
  hasRules() {
    return this.prepared.length > 0;
  }
  numericValuesIn(e) {
    const t = [];
    for (const o of e)
      for (let i = o.top; i <= o.bottom; i++)
        for (let s = o.left; s <= o.right; s++) {
          const r = this.sheet.cells.get(X(i, s));
          r && typeof r.raw == "number" && t.push(r.raw);
        }
    return t;
  }
  prepare(e) {
    var l, a;
    const t = (c, d) => e.ranges.some((u) => c >= u.top && c <= u.bottom && d >= u.left && d <= u.right);
    let o = 0, i = 0, s = 0, r;
    if (e.type === "colorScale" || e.type === "dataBar" || e.type === "iconSet" || e.type === "top10") {
      const c = this.numericValuesIn(e.ranges);
      if (c.length && (o = Math.min(...c), i = Math.max(...c), s = o + (i - o) / 2, e.type === "top10")) {
        const d = Math.max(1, Math.round(Number((a = (l = e.formulae) == null ? void 0 : l[0]) != null ? a : 10))), u = [...c].sort((h, p) => p - h);
        r = u[Math.min(d, u.length) - 1];
      }
    }
    return { rule: e, min: o, max: i, mid: s, threshold: r, inRange: t };
  }
  /** 返回所有命中该格的规则索引 + 各自计算出的 effect(供 Cell Inspector 查询;不做"第一条赢"短路) */
  inspectHits(e, t, o) {
    const i = [];
    for (let s = 0; s < this.prepared.length; s++) {
      const r = this.prepared[s];
      if (!r.inRange(e, t)) continue;
      const l = this.evalRule(r, o);
      l && i.push({ ruleIndex: s, effect: l });
    }
    return i;
  }
  /** 单条规则在某格上的 effect(命中返 patch,不命中返 null);effectsFor 与 inspectHits 共用 */
  evalRule(e, t) {
    var s, r, l;
    const o = e.rule, i = typeof t == "number" ? t : null;
    switch (o.type) {
      case "cellIs":
      case "expression":
      case "top10": {
        if (!(o.type === "top10" ? i != null && e.threshold != null && i >= e.threshold : hl(o, i)) || !o.style) return null;
        const c = {};
        return (s = o.style.fill) != null && s.fgColor && (c.fillColor = o.style.fill.fgColor), (r = o.style.font) != null && r.color && (c.fontColor = o.style.font.color), (l = o.style.font) != null && l.bold && (c.bold = !0), Object.keys(c).length ? c : null;
      }
      case "colorScale":
        return i == null || !o.colorScale || e.max === e.min ? null : { fillColor: fl(o.colorScale, i, e.min, e.mid, e.max) };
      case "dataBar":
        return i == null || !o.dataBar ? null : { dataBar: { ratio: e.max === e.min ? 1 : Math.max(0, Math.min(1, (i - Math.min(0, e.min)) / (e.max - Math.min(0, e.min)))), color: o.dataBar.color, gradient: o.dataBar.gradient } };
      case "iconSet": {
        if (i == null || !o.iconSet) return null;
        const a = gl(o.iconSet.name), c = e.max === e.min ? 1 : (i - e.min) / (e.max - e.min), d = Math.min(a - 1, Math.floor(c * a));
        return { icon: { setName: o.iconSet.name, level: d, count: a } };
      }
    }
    return null;
  }
  effectsFor(e, t, o) {
    var r, l, a;
    let i = null;
    const s = (c) => {
      i = i ? R(R({}, c), i) : c;
    };
    for (const c of this.prepared) {
      if (!c.inRange(e, t)) continue;
      const d = c.rule, u = typeof o == "number" ? o : null;
      switch (d.type) {
        case "cellIs":
        case "expression":
        case "top10": {
          if ((d.type === "top10" ? u != null && c.threshold != null && u >= c.threshold : hl(d, u)) && d.style) {
            const p = {};
            (r = d.style.fill) != null && r.fgColor && (p.fillColor = d.style.fill.fgColor), (l = d.style.font) != null && l.color && (p.fontColor = d.style.font.color), (a = d.style.font) != null && a.bold && (p.bold = !0), s(p);
          }
          break;
        }
        case "colorScale": {
          if (u == null || !d.colorScale || c.max === c.min) break;
          s({ fillColor: fl(d.colorScale, u, c.min, c.mid, c.max) });
          break;
        }
        case "dataBar": {
          if (u == null || !d.dataBar) break;
          const h = c.max === c.min ? 1 : Math.max(0, Math.min(1, (u - Math.min(0, c.min)) / (c.max - Math.min(0, c.min))));
          s({ dataBar: { ratio: h, color: d.dataBar.color, gradient: d.dataBar.gradient } });
          break;
        }
        case "iconSet": {
          if (u == null || !d.iconSet) break;
          const h = gl(d.iconSet.name), p = c.max === c.min ? 1 : (u - c.min) / (c.max - c.min), m = Math.min(h - 1, Math.floor(p * h));
          s({ icon: { setName: d.iconSet.name, level: m, count: h } });
          break;
        }
      }
    }
    return i;
  }
}
function hl(n, e) {
  if (e == null || !n.formulae) return !1;
  const t = Number(n.formulae[0]), o = n.formulae[1] != null ? Number(n.formulae[1]) : void 0;
  switch (n.operator) {
    case "greaterThan":
      return e > t;
    case "greaterThanOrEqual":
      return e >= t;
    case "lessThan":
      return e < t;
    case "lessThanOrEqual":
      return e <= t;
    case "equal":
      return e === t;
    case "notEqual":
      return e !== t;
    case "between":
      return o != null && e >= t && e <= o;
    case "notBetween":
      return o != null && (e < t || e > o);
    default:
      return !1;
  }
}
function fl(n, e, t, o, i) {
  return n.mid ? e <= o ? Ai(n.min, n.mid, (e - t) / (o - t || 1)) : Ai(n.mid, n.max, (e - o) / (i - o || 1)) : Ai(n.min, n.max, (e - t) / (i - t || 1));
}
function Ai(n, e, t) {
  t = Math.max(0, Math.min(1, t));
  const o = pl(n), i = pl(e), s = Math.round(o.r + (i.r - o.r) * t), r = Math.round(o.g + (i.g - o.g) * t), l = Math.round(o.b + (i.b - o.b) * t);
  return `rgb(${s},${r},${l})`;
}
function pl(n) {
  const e = /^#?([0-9a-f]{6})$/i.exec(n);
  if (!e) return { r: 255, g: 255, b: 255 };
  const t = parseInt(e[1], 16);
  return { r: t >> 16 & 255, g: t >> 8 & 255, b: t & 255 };
}
function gl(n) {
  return n.startsWith("5") ? 5 : n.startsWith("4") ? 4 : 3;
}
function Nm(n, e, t) {
  for (const o of n.merges)
    if (e >= o.top && e <= o.bottom && t >= o.left && t <= o.right) return o;
  return null;
}
function Om(n, e, t) {
  const o = n.from;
  if (!o) return !1;
  if (n.to) {
    const i = n.to;
    return e >= o.row && e <= i.row && t >= o.col && t <= i.col;
  }
  return e === o.row && t === o.col;
}
function zm(n, e, t, o, i) {
  var y, w, S, k;
  const s = ze(n, t, o, i), r = n.cells.get(X(t, o)), l = Nm(n, t, o), a = !!l && l.top === t && l.left === o, c = [];
  for (let C = 0; C < n.images.length; C++) {
    const M = n.images[C];
    Om(M, t, o) && c.push({ index: C, anchor: R({}, M) });
  }
  const d = r == null ? void 0 : r.dispImgId, u = d ? (y = e.cellImages) == null ? void 0 : y.get(d) : void 0, h = u ? { id: d, src: u.src, mime: u.mime } : null, p = (w = n.dataValidations.find(
    (C) => t >= C.top && t <= C.bottom && o >= C.left && o <= C.right
  )) != null ? w : null, m = new wc(n), v = (m.hasRules() ? m.inspectHits(t, o, s.raw) : []).map((C) => ({
    ruleIndex: C.ruleIndex,
    style: Hm(C.effect)
  }));
  return K(R({}, s), {
    merge: l ? R({}, l) : null,
    isMergeAnchor: a,
    floatingImages: c,
    cellImage: h,
    dataValidation: p ? R({}, p) : null,
    conditional: v,
    hyperlink: (S = r == null ? void 0 : r.hyperlink) != null ? S : null,
    comment: (k = r == null ? void 0 : r.comment) != null ? k : null
  });
}
function Hm(n) {
  const e = {};
  return n.fillColor && (e.fill = { type: "solid", fgColor: n.fillColor }), (n.fontColor || n.bold) && (e.font = R(R({}, n.fontColor ? { color: n.fontColor } : {}), n.bold ? { bold: !0 } : {})), e;
}
class Dm {
  constructor(e, t) {
    T(this, "active", null);
    this.container = e, this.rectOf = t;
  }
  isActive() {
    return this.active !== null;
  }
  activeCell() {
    return this.active ? { row: this.active.row, col: this.active.col } : null;
  }
  /**
   * 挂载一个编辑器(先卸旧)。返回是否成功(工厂产出有效 DOM)。
   * rectOverride 给定时用它定位(合并单元格 → 整片合并区),否则按单格 rectOf。
   */
  mount(e, t, o, i, s) {
    this.unmount();
    let r, l, a;
    try {
      i.reposition = () => this.position();
      const c = o(i);
      c instanceof HTMLElement ? r = c : (r = c.el, l = c.destroy, a = c.getDesiredHeight);
    } catch (c) {
      return console.warn("[ooxml-preview] 单元格编辑器工厂出错:", c), !1;
    }
    return r.style.position = "absolute", r.style.boxSizing = "border-box", this.container.appendChild(r), this.active = { el: r, destroy: l, row: e, col: t, rectOverride: s, getDesiredHeight: a }, this.position(), !0;
  }
  /**
   * 按当前 rectOf 重定位活动编辑器(滚动/缩放后跟随).
   * Phase 1 长文本撑高 (2026-06-08): 若编辑器实现了 `getDesiredHeight`,
   * 最终高度 = max(单元格原高, 期望高度), 上限 viewport 一半防撑爆.
   * 宽度仍 = 列宽 (跟 WPS 一致, 仅向下溢出).
   */
  position() {
    var i;
    const e = this.active;
    if (!e) return;
    const t = e.rectOverride ? e.rectOverride() : this.rectOf(e.row, e.col);
    if (!t) return;
    e.el.style.left = t.x + "px", e.el.style.top = t.y + "px", e.el.style.width = t.w + "px";
    let o = t.h;
    if (e.getDesiredHeight)
      try {
        const s = e.getDesiredHeight(t.w);
        if (s > o) {
          const r = this.container.ownerDocument.defaultView, l = Math.max(120, ((i = r == null ? void 0 : r.innerHeight) != null ? i : 600) * 0.5);
          o = Math.min(s, l);
        }
      } catch (s) {
        console.warn("[ooxml-preview] 编辑器 getDesiredHeight 出错:", s);
      }
    e.el.style.height = o + "px";
  }
  /** 卸载活动编辑器 */
  unmount() {
    var t;
    const e = this.active;
    if (e) {
      this.active = null;
      try {
        (t = e.destroy) == null || t.call(e);
      } catch (o) {
        console.warn("[ooxml-preview] 编辑器 destroy 出错:", o);
      }
      e.el.remove();
    }
  }
  dispose() {
    this.unmount();
  }
}
const Bm = "position:fixed;z-index:9999;background:#fff;border:1px solid #d0d3d7;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.16);padding:4px 0;min-width:168px;font:13px/1.6 -apple-system,'Segoe UI',sans-serif;user-select:none;color:#1f2329;";
class Wm {
  constructor() {
    T(this, "el", null);
    T(this, "submenus", []);
    // 当前打开的子菜单(flyout),关闭时一并清掉
    T(this, "openSubRow", null);
    // 当前 flyout 所属的父行(避免重复打开)
    T(this, "subCloseTimer", null);
    // 延时关闭(给鼠标从父行移到 flyout 的缓冲)
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e, t, o) {
    this.close();
    const i = this.buildMenu(o);
    document.body.appendChild(i), this.el = i;
    const s = i.offsetWidth, r = i.offsetHeight, l = e + s > window.innerWidth ? Math.max(0, e - s) : e, a = t + r > window.innerHeight ? Math.max(0, t - r) : t;
    i.style.left = l + "px", i.style.top = a + "px";
    const c = (h) => {
      const p = h.target;
      this.el && !this.el.contains(p) && !this.submenus.some((m) => m.contains(p)) && this.close();
    }, d = (h) => {
      h.key === "Escape" && this.close();
    }, u = () => this.close();
    setTimeout(() => {
      document.addEventListener("mousedown", c, !0), document.addEventListener("keydown", d, !0), window.addEventListener("scroll", u, !0), this.cleanup = () => {
        document.removeEventListener("mousedown", c, !0), document.removeEventListener("keydown", d, !0), window.removeEventListener("scroll", u, !0);
      };
    }, 0);
  }
  /** 建一级菜单 DOM(不挂载、不定位);子菜单悬停时再建 flyout。 */
  buildMenu(e) {
    var o, i;
    const t = document.createElement("div");
    t.className = "ooxml-context-menu", t.style.cssText = Bm;
    for (const s of e) {
      if (s.separator) {
        const c = document.createElement("div");
        c.style.cssText = "height:1px;background:#eceef1;margin:4px 0;", t.appendChild(c);
        continue;
      }
      const r = document.createElement("div"), l = !!((o = s.children) != null && o.length);
      r.textContent = ((i = s.label) != null ? i : "") + (l ? "  ▸" : "");
      const a = !!s.disabled;
      r.style.cssText = `padding:5px 16px;cursor:${a ? "default" : "pointer"};color:${a ? "#b7bcc2" : "inherit"};white-space:nowrap;${l ? "display:flex;justify-content:space-between;gap:18px;" : ""}`, a || (r.addEventListener("mouseenter", () => {
        r.style.background = "#eef3fe", this.cancelSubClose(), l ? this.openSubRow !== r && (this.closeAllSubmenus(), this.openSubmenu(r, s.children)) : this.openSubRow && this.scheduleSubClose();
      }), r.addEventListener("mouseleave", () => {
        r.style.background = "", l && this.openSubRow === r && this.scheduleSubClose();
      }), l || r.addEventListener("mousedown", (c) => {
        var d;
        c.preventDefault(), c.stopPropagation(), this.close(), (d = s.action) == null || d.call(s);
      })), t.appendChild(r);
    }
    return t;
  }
  /** 在 row 右侧展开子菜单 flyout(贴边翻转到左侧);悬停 flyout 取消关闭,离开 flyout 延时关。 */
  openSubmenu(e, t) {
    const o = this.buildMenu(t);
    o.style.visibility = "hidden", document.body.appendChild(o);
    const i = e.getBoundingClientRect(), s = o.offsetWidth, r = o.offsetHeight, l = i.right + s > window.innerWidth ? Math.max(0, i.left - s + 2) : i.right - 2, a = i.top + r > window.innerHeight ? Math.max(0, window.innerHeight - r) : i.top;
    o.style.left = l + "px", o.style.top = a + "px", o.style.visibility = "visible", o.addEventListener("mouseenter", () => this.cancelSubClose()), o.addEventListener("mouseleave", () => this.scheduleSubClose()), this.submenus.push(o), this.openSubRow = e;
  }
  scheduleSubClose() {
    this.cancelSubClose(), this.subCloseTimer = setTimeout(() => this.closeAllSubmenus(), 260);
  }
  cancelSubClose() {
    this.subCloseTimer && (clearTimeout(this.subCloseTimer), this.subCloseTimer = null);
  }
  closeAllSubmenus() {
    this.cancelSubClose();
    for (const e of this.submenus) e.remove();
    this.submenus = [], this.openSubRow = null;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, this.closeAllSubmenus(), (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const qm = {
  filters: "筛选器:决定整张透视表只统计哪些数据。把字段拖进来后,点字段上的小按钮选「非空」或「多选某几个值」,表里就只算选中的部分;放进来默认是「全部」=不过滤(所以看不出变化,要点开选值才生效)。",
  columns: "列:把这个字段的每个不同值拆成一列(横向展开),和「行」交叉成二维汇总表。例:行放「物流商」、列放「账单月份」→ 行是每个物流商,每个月一列,格子里是该物流商该月的合计。",
  rows: "行:把这个字段的每个不同值列成一行(纵向分组),格子里是对应的汇总值。放 2 个及以上行字段时,外层分组可点行首的 − / + 折叠或展开下面的明细。",
  values: "值:要汇总的数字字段(放进来才会出数据)。点字段上的下拉可切换 求和 / 计数 / 平均 / 最大 / 最小;可以同时放多个值字段,各占一列。"
}, Um = {
  filters: "放字段并选值 → 只统计选中的数据",
  columns: "放字段 → 按它的值横向拆成多列"
};
class _m {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  show(e) {
    var c, d, u;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.style.cssText = "width:420px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden;", o.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>创建透视表</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px 8px">',
      `<div style="margin-bottom:10px;color:#667085">数据区域: <b style="color:#1f2329">${He(e.rangeLabel)}</b></div>`,
      '<div style="margin-bottom:8px;color:#667085">请选择透视表生成位置。字段布局将在右侧“数据透视表”面板中配置。</div>',
      '<label style="display:block;margin:12px 0 4px;color:#667085">生成位置</label>',
      '<label style="display:flex;align-items:center;gap:6px;margin:4px 0"><input data-output-current type="radio" name="pivot-output" checked> 现有工作表</label>',
      `<input data-cell value="${He(e.defaultOutputCell)}" style="width:100%;height:30px;border:1px solid #d0d5dd;border-radius:5px;padding:0 8px;box-sizing:border-box" />`,
      '<label style="display:flex;align-items:center;gap:6px;margin:8px 0 0"><input data-output-new type="radio" name="pivot-output"> 新建工作表</label>',
      '<div style="margin-top:10px;color:#98a2b3;font-size:12px">字段、筛选、折叠可在右侧面板调整;源数据改动后透视结果自动刷新。</div>',
      "</div>",
      '<div style="display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-cancel style="height:30px;padding:0 14px;border:1px solid #d0d5dd;border-radius:5px;background:#fff;cursor:pointer">取消</button>',
      '<button data-ok style="height:30px;padding:0 14px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">创建</button>',
      "</div>"
    ].join(""), t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = o.querySelector("[data-cell]"), s = o.querySelector("[data-output-current]"), r = o.querySelector("[data-output-new]"), l = () => {
      const h = r.checked ? { kind: "new-sheet" } : { kind: "current-sheet", cell: i.value.trim() };
      this.close(), e.onSubmit(h);
    };
    i.addEventListener("focus", () => {
      s.checked = !0;
    }), s.addEventListener("change", () => {
      s.checked && i.focus();
    }), r.addEventListener("change", () => {
      r.checked && i.blur();
    });
    const a = (h) => {
      h.key === "Escape" && this.close(), h.key === "Enter" && l();
    };
    (c = o.querySelector("[data-close]")) == null || c.addEventListener("click", () => this.close()), (d = o.querySelector("[data-cancel]")) == null || d.addEventListener("click", () => this.close()), (u = o.querySelector("[data-ok]")) == null || u.addEventListener("click", l), t.addEventListener("mousedown", (h) => {
      h.target === t && this.close();
    }), document.addEventListener("keydown", a, !0), this.cleanup = () => document.removeEventListener("keydown", a, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
class jm {
  constructor() {
    T(this, "el", null);
    T(this, "opts", null);
    /** 当前正在编辑筛选值的字段 index(null = 未展开筛选明细面板) */
    T(this, "activeFilterField", null);
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.opts = e, this.activeFilterField = null;
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;right:0;top:0;bottom:0;width:360px;z-index:9999;background:#e9eef4;border-left:1px solid #cfd6df;box-shadow:-4px 0 16px rgba(15,23,42,.12);font:13px/1.45 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#111827;padding:18px 16px;box-sizing:border-box;overflow:auto;", document.body.appendChild(t), this.el = t, this.render();
  }
  close() {
    var e;
    (e = this.el) == null || e.remove(), this.el = null, this.opts = null, this.activeFilterField = null;
  }
  dispose() {
    this.close();
  }
  render(e = "") {
    var l, a, c, d;
    const t = this.el, o = this.opts;
    if (!t || !o) return;
    const i = e.trim().toLowerCase(), s = i ? o.fields.filter((u) => u.label.toLowerCase().includes(i)) : o.fields;
    t.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">',
      '<div style="font-weight:600">数据透视表⌄</div><div style="display:flex;gap:12px;color:#374151"><span>⚙</span><span>⌖</span><button data-close style="border:0;background:none;font-size:18px;cursor:pointer;color:#374151">×</button></div></div>',
      '<details open><summary style="font-weight:600;cursor:pointer">字段列表</summary>',
      '<div style="margin:10px 0 6px">将字段添加至数据透视表区域</div>',
      `<input data-search value="${He(e)}" placeholder="  搜索字段" style="width:100%;height:32px;border:1px solid #c9d1db;border-radius:4px;background:#fff;box-sizing:border-box;margin-bottom:6px" />`,
      '<div style="height:270px;background:#fff;border:1px solid #c9d1db;border-radius:4px;overflow:auto;padding:8px 8px;box-sizing:border-box">',
      ...s.map((u) => this.fieldRow(u, o.layout)),
      "</div></details>",
      '<details open style="margin-top:18px"><summary style="font-weight:600;cursor:pointer">数据透视表区域</summary>',
      '<div style="margin:10px 0 8px">在下面区域中拖动字段</div>',
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">',
      this.area("筛选器", "filters", o),
      this.area("列", "columns", o),
      this.area("行", "rows", o),
      this.area("值", "values", o),
      "</div>",
      this.filterDetail(o),
      '<div data-drop-remove style="margin-top:10px;height:30px;border:1px dashed #9aa4b2;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#667085;background:#f7f9fb">拖到这里移出字段</div></details>'
    ].join(""), (l = t.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close());
    const r = t.querySelector("[data-search]");
    r == null || r.addEventListener("input", () => this.render(r.value)), r == null || r.focus(), r == null || r.setSelectionRange(r.value.length, r.value.length), t.querySelectorAll("[data-add]").forEach((u) => {
      u.addEventListener("click", () => {
        const h = Number(u.dataset.field), p = u.dataset.add;
        this.updateLayout((m) => Fi(m, p, h), e);
      });
    }), t.querySelectorAll("[data-toggle-field]").forEach((u) => {
      u.addEventListener("change", () => {
        var m, b, v;
        const h = Number(u.dataset.toggleField), p = (v = (b = (m = this.opts) == null ? void 0 : m.fields.find((y) => y.index === h)) == null ? void 0 : b.numeric) != null ? v : !1;
        this.updateLayout((y) => u.checked ? Fi(y, p ? "values" : "rows", h) : as(y, h), e);
      });
    }), t.querySelectorAll("[data-remove]").forEach((u) => {
      u.addEventListener("click", () => {
        const h = Number(u.dataset.field), p = u.dataset.remove;
        this.updateLayout((m) => p === "filters" ? K(R({}, m), { filters: m.filters.filter((b) => b.field !== h) }) : K(R({}, m), { [p]: m[p].filter((b) => b !== h) }), e);
      });
    }), t.querySelectorAll("[data-filter-edit]").forEach((u) => {
      u.addEventListener("click", () => {
        const h = Number(u.dataset.filterEdit);
        this.activeFilterField = this.activeFilterField === h ? null : h, this.render(e);
      });
    }), (a = t.querySelector("[data-filter-close]")) == null || a.addEventListener("click", () => {
      this.activeFilterField = null, this.render(e);
    }), t.querySelectorAll("[data-filter-mode]").forEach((u) => {
      u.addEventListener("change", () => {
        var b, v;
        const h = this.activeFilterField;
        if (h == null) return;
        const p = u.dataset.filterMode, m = (v = (b = this.opts) == null ? void 0 : b.filterValues[h]) != null ? v : [];
        this.updateLayout((y) => K(R({}, y), {
          filters: y.filters.map((w) => w.field === h ? Vm(h, p, m, w) : w)
        }), e);
      });
    }), t.querySelectorAll("[data-filter-check]").forEach((u) => {
      u.addEventListener("change", () => {
        var b, v, y;
        const h = this.activeFilterField;
        if (h == null) return;
        const p = (b = u.dataset.filterCheck) != null ? b : "", m = (y = (v = this.opts) == null ? void 0 : v.filterValues[h]) != null ? y : [];
        this.updateLayout((w) => K(R({}, w), {
          filters: w.filters.map((S) => {
            var C;
            if (S.field !== h) return S;
            const k = new Set(S.mode === "include" && (C = S.values) != null ? C : m);
            return u.checked ? k.add(p) : k.delete(p), { field: h, mode: "include", values: [...k] };
          })
        }), e);
      });
    }), (c = t.querySelector("[data-filter-all]")) == null || c.addEventListener("click", () => {
      var p, m;
      const u = this.activeFilterField;
      if (u == null) return;
      const h = (m = (p = this.opts) == null ? void 0 : p.filterValues[u]) != null ? m : [];
      this.updateLayout((b) => K(R({}, b), { filters: b.filters.map((v) => v.field === u ? { field: u, mode: "include", values: h.slice() } : v) }), e);
    }), (d = t.querySelector("[data-filter-none]")) == null || d.addEventListener("click", () => {
      const u = this.activeFilterField;
      u != null && this.updateLayout((h) => K(R({}, h), { filters: h.filters.map((p) => p.field === u ? { field: u, mode: "include", values: [] } : p) }), e);
    }), t.querySelectorAll("[data-summary-value]").forEach((u) => {
      u.addEventListener("change", () => {
        const h = Number(u.dataset.summaryValue);
        this.updateLayout((p) => K(R({}, p), {
          values: p.values.map((m) => m.field === h ? K(R({}, m), { summary: u.value }) : m)
        }), e);
      });
    }), t.querySelectorAll("[data-drag-field]").forEach((u) => {
      u.addEventListener("dragstart", (h) => {
        var p;
        (p = h.dataTransfer) == null || p.setData("application/x-ooxml-pivot-field", JSON.stringify({ field: Number(u.dataset.dragField), from: u.dataset.dragFrom || "" })), h.dataTransfer && (h.dataTransfer.effectAllowed = "move");
      });
    }), t.querySelectorAll("[data-drop-area]").forEach((u) => {
      u.addEventListener("dragover", (h) => {
        h.preventDefault(), u.style.outline = "2px solid #21a366";
      }), u.addEventListener("dragleave", () => {
        u.style.outline = "";
      }), u.addEventListener("drop", (h) => {
        var v;
        h.preventDefault(), u.style.outline = "";
        const p = (v = h.dataTransfer) == null ? void 0 : v.getData("application/x-ooxml-pivot-field");
        if (!p) return;
        const m = JSON.parse(p), b = u.dataset.dropArea;
        this.updateLayout((y) => Fi(y, b, m.field), e);
      });
    }), t.querySelectorAll("[data-drop-remove]").forEach((u) => {
      u.addEventListener("dragover", (h) => {
        h.preventDefault(), u.style.outline = "2px solid #ef4444";
      }), u.addEventListener("dragleave", () => {
        u.style.outline = "";
      }), u.addEventListener("drop", (h) => {
        var b;
        h.preventDefault(), u.style.outline = "";
        const p = (b = h.dataTransfer) == null ? void 0 : b.getData("application/x-ooxml-pivot-field");
        if (!p) return;
        const m = JSON.parse(p);
        this.updateLayout((v) => as(v, m.field), e);
      });
    });
  }
  fieldRow(e, t) {
    const o = t.filters.some((s) => s.field === e.index) || t.columns.includes(e.index) || t.rows.includes(e.index) || t.values.some((s) => s.field === e.index), i = e.numeric ? `<button data-add="values" data-field="${e.index}" title="加入值" style="border:0;background:none;cursor:pointer">Σ</button>` : "";
    return `<div data-drag-field="${e.index}" draggable="true" style="display:flex;align-items:center;gap:7px;min-height:30px;cursor:grab"><span style="color:#667085">⋮⋮</span><input type="checkbox" data-toggle-field="${e.index}" ${o ? "checked" : ""} title="勾选 = 加入透视表(数值→值,其它→行);取消 = 移出"> <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${He(e.label)}</span><button data-add="filters" data-field="${e.index}" title="加入筛选器" style="border:0;background:none;cursor:pointer">筛</button><button data-add="columns" data-field="${e.index}" title="加入列" style="border:0;background:none;cursor:pointer">列</button><button data-add="rows" data-field="${e.index}" title="加入行" style="border:0;background:none;cursor:pointer">行</button>${i}</div>`;
  }
  area(e, t, o) {
    const i = o.layout[t].map((l) => {
      var p;
      const a = typeof l == "number" ? l : ("summary" in l, l.field), c = o.fields.find((m) => m.index === a);
      if (!c) return "";
      const d = t === "values" ? `${ml(l.summary)}: ${c.label}` : c.label, u = t === "filters" ? this.filterSummaryBtn(l, (p = o.filterValues[c.index]) != null ? p : []) : "", h = t === "values" ? this.summarySelect(l) : "";
      return `<span data-drag-field="${c.index}" data-drag-from="${t}" draggable="true" style="display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:3px 6px;margin:0 4px 4px 0;border:1px solid #b8c2cc;border-radius:3px;background:#f7f9fb;cursor:grab"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${He(d)}</span>${u}${h}<button data-remove="${t}" data-field="${c.index}" style="border:0;background:none;cursor:pointer;color:#667085">×</button></span>`;
    }).join(""), s = qm[t], r = t === "filters" || t === "columns" ? `<div style="color:#9aa4ae;font-size:11px;padding:2px 0">${He(Um[t])}</div>` : "";
    return `<div title="${He(s)}"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px"><span title="${He(s)}" style="cursor:help">${He(e)} <span style="color:#9aa4ae;font-size:11px">ⓘ</span></span><span>＋</span></div><div data-drop-area="${t}" title="${He(s)}" style="height:88px;background:#fff;border:1px solid #c9d1db;border-radius:4px;padding:6px;box-sizing:border-box;overflow:auto">${i || r}</div></div>`;
  }
  updateLayout(e, t) {
    if (!this.opts) return;
    const o = e(this.opts.layout);
    this.opts.layout = o, this.opts.onChange(o), this.render(t);
  }
  /** 筛选 chip 上的小按钮:显示当前筛选状态(全部/非空/N 项),点开底部明细面板编辑。 */
  filterSummaryBtn(e, t) {
    var s, r, l;
    const o = e.mode === "all" ? "全部" : e.mode === "non-empty" ? "非空" : e.mode === "equals" ? (s = e.value) != null ? s : "" : `${(l = (r = e.values) == null ? void 0 : r.length) != null ? l : t.length}/${t.length} 项`, i = this.activeFilterField === e.field;
    return `<button data-filter-edit="${e.field}" title="设置筛选值" style="border:1px solid ${i ? "#21a366" : "#c9d1db"};background:#fff;border-radius:3px;height:22px;max-width:84px;padding:0 6px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${He(o)} ▾</button>`;
  }
  /** 底部筛选明细面板:全部/非空/多选 三模式 + 多选时的值复选框列表(WPS 风格勾选筛选)。 */
  filterDetail(e) {
    var d, u, h, p;
    const t = this.activeFilterField;
    if (t == null) return "";
    const o = e.layout.filters.find((m) => m.field === t);
    if (!o) return "";
    const i = (u = (d = e.fields.find((m) => m.index === t)) == null ? void 0 : d.label) != null ? u : `字段${t + 1}`, s = (h = e.filterValues[t]) != null ? h : [], r = o.mode === "include", l = new Set(r && (p = o.values) != null ? p : s), a = (m, b) => `<label style="display:inline-flex;align-items:center;gap:4px;margin-right:12px"><input type="radio" name="pivot-filter-mode" data-filter-mode="${m}" ${o.mode === m ? "checked" : ""}> ${b}</label>`, c = s.map((m) => `<label style="display:flex;align-items:center;gap:6px;min-height:24px"><input type="checkbox" data-filter-check="${He(m)}" ${l.has(m) ? "checked" : ""} ${r ? "" : "disabled"}> <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${He(m)}</span></label>`).join("");
    return [
      '<div style="margin-top:12px;border:1px solid #c9d1db;border-radius:4px;background:#fff;padding:8px">',
      `<div style="font-weight:600;margin-bottom:6px">筛选「${He(i)}」<button data-filter-close style="float:right;border:0;background:none;cursor:pointer;color:#667085">×</button></div>`,
      `<div style="margin-bottom:6px">${a("all", "全部")}${a("non-empty", "非空")}${a("include", "多选")}</div>`,
      r ? '<div style="margin-bottom:4px"><button data-filter-all style="border:0;background:none;color:#21a366;cursor:pointer;padding:0">全选</button> · <button data-filter-none style="border:0;background:none;color:#21a366;cursor:pointer;padding:0">清空</button></div>' : "",
      `<div style="max-height:140px;overflow:auto">${c}</div>`,
      "</div>"
    ].join("");
  }
  summarySelect(e) {
    const t = ["sum", "count", "avg", "max", "min"];
    return `<select data-summary-value="${e.field}" style="max-width:78px;height:22px;border:1px solid #c9d1db;border-radius:3px;background:#fff">${t.map((o) => `<option value="${o}" ${o === e.summary ? "selected" : ""}>${ml(o)}</option>`).join("")}</select>`;
  }
}
function Fi(n, e, t) {
  const o = as(n, t);
  return e === "filters" ? o.filters = [...o.filters, { field: t, mode: "all" }] : e === "values" ? o.values = [...o.values, { field: t, summary: "sum" }] : o[e] = [...o[e], t], o;
}
function as(n, e) {
  return {
    filters: n.filters.filter((t) => t.field !== e),
    columns: n.columns.filter((t) => t !== e),
    rows: n.rows.filter((t) => t !== e),
    values: n.values.filter((t) => t.field !== e)
  };
}
function ml(n) {
  return { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" }[n];
}
function Vm(n, e, t, o) {
  var i;
  return e === "include" ? { field: n, mode: "include", values: o.mode === "include" && (i = o.values) != null ? i : t.slice() } : e === "non-empty" ? { field: n, mode: "non-empty" } : { field: n, mode: "all" };
}
function He(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Ym(n) {
  let e = "", t = n;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
const Gm = (n) => `${Ym(n.col)}${n.row + 1}`;
class Xm {
  constructor() {
    T(this, "el", null);
    T(this, "toastEl", null);
    T(this, "toastTimer", null);
    T(this, "cleanup", null);
  }
  show(e, t, o) {
    typeof document == "undefined" || e === "none" || (e === "toast" ? this.showToast(t) : this.showDialog(t, o));
  }
  showToast(e) {
    this.closeToast();
    const t = document.createElement("div");
    t.className = "ooxml-readonly-toast", t.style.cssText = "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10001;background:#fff7e6;border:1px solid #ffd591;color:#874d00;border-radius:8px;padding:9px 16px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;max-width:80vw", t.textContent = "🔒 " + e, document.body.appendChild(t), this.toastEl = t, this.toastTimer = setTimeout(() => this.closeToast(), 3600);
  }
  closeToast() {
    var e;
    this.toastTimer && (clearTimeout(this.toastTimer), this.toastTimer = null), (e = this.toastEl) == null || e.remove(), this.toastEl = null;
  }
  showDialog(e, t) {
    var c;
    this.close();
    const o = t.map(Gm), i = o.slice(0, 60), s = o.length - i.length, r = document.createElement("div");
    r.className = "ooxml-readonly-mask", r.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const l = document.createElement("div");
    l.style.cssText = "width:420px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", l.innerHTML = [
      '<div style="display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">🔒 只读,操作已跳过</div>',
      '<div style="padding:14px 16px 6px">',
      `<div style="margin-bottom:10px;color:#475467">${Km(e)}</div>`,
      o.length ? `<div style="color:#667085;margin-bottom:4px">只读格(${o.length} 个):</div><div style="max-height:180px;overflow:auto;background:#f7f8fa;border:1px solid #eef0f2;border-radius:6px;padding:8px;line-height:1.9">${i.map((d) => `<span style="display:inline-block;background:#fff;border:1px solid #e4e7ec;border-radius:4px;padding:0 6px;margin:0 4px 4px 0">${d}</span>`).join("")}${s > 0 ? `<span style="color:#98a2b3">…另 ${s} 个</span>` : ""}</div>` : "",
      "</div>",
      '<div style="display:flex;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-ok style="height:30px;padding:0 16px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">知道了</button>',
      "</div>"
    ].join(""), r.appendChild(l), document.body.appendChild(r), this.el = r;
    const a = (d) => {
      (d.key === "Escape" || d.key === "Enter") && this.close();
    };
    (c = l.querySelector("[data-ok]")) == null || c.addEventListener("click", () => this.close()), r.addEventListener("mousedown", (d) => {
      d.target === r && this.close();
    }), document.addEventListener("keydown", a, !0), this.cleanup = () => document.removeEventListener("keydown", a, !0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close(), this.closeToast();
  }
}
function Km(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const Jm = { stop: "⛔", warning: "⚠️", information: "ℹ️" };
class Zm {
  constructor() {
    T(this, "el", null);
    T(this, "toastEl", null);
    T(this, "toastTimer", null);
    T(this, "bubbleEl", null);
    T(this, "cleanup", null);
    T(this, "prevFocus", null);
  }
  /** 非法输入提示。stop → 模态;warning/information → toast。 */
  showError(e, t, o) {
    typeof document != "undefined" && (e === "stop" ? this.showDialog(t, o) : this.showToast(e, t, o));
  }
  showToast(e, t, o) {
    this.closeToast();
    const i = document.createElement("div");
    i.className = "ooxml-validation-toast", i.style.cssText = "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10001;background:#fff7e6;border:1px solid #ffd591;color:#874d00;border-radius:8px;padding:9px 16px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;max-width:80vw", i.textContent = `${Jm[e]} ${o ? o + ":" : ""}${t}`, document.body.appendChild(i), this.toastEl = i, this.toastTimer = setTimeout(() => this.closeToast(), 3600);
  }
  closeToast() {
    var e;
    this.toastTimer && (clearTimeout(this.toastTimer), this.toastTimer = null), (e = this.toastEl) == null || e.remove(), this.toastEl = null;
  }
  showDialog(e, t) {
    var r, l;
    this.close(), this.prevFocus = (r = document.activeElement) != null ? r : null;
    const o = document.createElement("div");
    o.className = "ooxml-validation-mask", o.style.cssText = "position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const i = document.createElement("div");
    i.style.cssText = "width:380px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", i.innerHTML = [
      `<div style="display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">⛔ ${en(t || "输入不符合限制条件")}</div>`,
      `<div style="padding:16px;color:#475467">${en(e)}</div>`,
      '<div style="display:flex;justify-content:flex-end;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      '<button data-ok style="height:30px;padding:0 16px;border:1px solid #1b7f4d;border-radius:5px;background:#21a366;color:#fff;cursor:pointer">知道了</button>',
      "</div>"
    ].join(""), o.appendChild(i), document.body.appendChild(o), this.el = o;
    const s = (a) => {
      (a.key === "Escape" || a.key === "Enter") && (a.preventDefault(), a.stopPropagation(), this.close());
    };
    (l = i.querySelector("[data-ok]")) == null || l.addEventListener("click", () => this.close()), o.addEventListener("mousedown", (a) => {
      a.target === o && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0);
  }
  close() {
    var t, o;
    (t = this.cleanup) == null || t.call(this), this.cleanup = null, (o = this.el) == null || o.remove(), this.el = null;
    const e = this.prevFocus;
    this.prevFocus = null, e && typeof e.focus == "function" && setTimeout(() => e.focus(), 0);
  }
  /** 选中带输入提示的格时,在视口坐标 (x,y) 处弹黄色气泡(x,y = 该格右下角附近)。 */
  showInputBubble(e, t, o, i) {
    if (typeof document == "undefined") return;
    this.hideInputBubble();
    const s = document.createElement("div");
    s.className = "ooxml-validation-bubble", s.style.cssText = "position:fixed;z-index:9999;max-width:240px;background:#fffbe6;border:1px solid #ffe58f;color:#614700;border-radius:6px;padding:7px 10px;box-shadow:0 4px 16px rgba(0,0,0,.14);font:12px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;pointer-events:none;white-space:pre-wrap;word-break:break-word", s.innerHTML = (i ? `<div style="font-weight:600;margin-bottom:2px">${en(i)}</div>` : "") + en(o), document.body.appendChild(s);
    const r = window.innerWidth, l = window.innerHeight, a = s.getBoundingClientRect(), c = Math.min(Math.max(4, e), r - a.width - 4), d = Math.min(Math.max(4, t), l - a.height - 4);
    s.style.left = `${c}px`, s.style.top = `${d}px`, this.bubbleEl = s;
  }
  hideInputBubble() {
    var e;
    (e = this.bubbleEl) == null || e.remove(), this.bubbleEl = null;
  }
  dispose() {
    this.close(), this.closeToast(), this.hideInputBubble();
  }
}
function en(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Ri(n, e, t) {
  const o = n.dataValidationRules;
  if (o)
    return o.find((i) => e >= i.range.top && e <= i.range.bottom && t >= i.range.left && t <= i.range.right);
}
function Qm(n, e) {
  var r, l, a;
  if (eb(e) || n.type === "custom") return null;
  let t = !0, o = "";
  switch (n.type) {
    case "list": {
      const c = bl(e);
      t = ((r = n.options) != null ? r : []).includes(c), o = `只能从下拉列表中选择:${((l = n.options) != null ? l : []).join("、")}`;
      break;
    }
    case "whole": {
      const c = yl(e);
      c == null || !Number.isInteger(c) ? (t = !1, o = "请输入整数") : (t = tn(c, n), o = `请输入整数(${on(n)})`);
      break;
    }
    case "decimal": {
      const c = yl(e);
      c == null ? (t = !1, o = "请输入数值") : (t = tn(c, n), o = `请输入数值(${on(n)})`);
      break;
    }
    case "textLength": {
      const c = bl(e).length;
      t = tn(c, n), o = `文本长度需${on(n)}`;
      break;
    }
    case "date":
    case "time": {
      const c = $s(e);
      c == null ? (t = !1, o = n.type === "date" ? "请输入日期" : "请输入时间") : (t = tn(c, n, !0), o = `请输入合法的${n.type === "date" ? "日期" : "时间"}(${on(n, !0)})`);
      break;
    }
  }
  if (t) return null;
  const i = (a = n.errorStyle) != null ? a : "stop", s = n.showErrorMessage && n.error ? n.error : o;
  return { rule: n, errorStyle: i, title: n.errorTitle, message: s };
}
function eb(n) {
  return n == null || typeof n == "string" && n === "";
}
function bl(n) {
  return n instanceof Date ? n.toISOString() : String(n != null ? n : "");
}
function yl(n) {
  return typeof n == "number" ? Number.isFinite(n) ? n : null : typeof n == "string" && n.trim() !== "" && !isNaN(Number(n)) ? Number(n) : null;
}
const tb = Date.UTC(1899, 11, 30);
function $s(n) {
  if (n instanceof Date) return n.getTime();
  if (typeof n == "number") return Number.isFinite(n) ? tb + n * 864e5 : null;
  if (typeof n == "string" && n.trim() !== "") {
    const e = Date.parse(n);
    return isNaN(e) ? null : e;
  }
  return null;
}
function vl(n, e) {
  if (n === void 0 || typeof n == "string" && n.trim() === "") return null;
  if (e) return $s(n);
  const t = typeof n == "number" ? n : Number(n);
  return Number.isFinite(t) ? t : null;
}
function tn(n, e, t = !1) {
  var r;
  const o = vl(e.formulae[0], t), i = vl(e.formulae[1], t), s = (r = e.operator) != null ? r : "between";
  if (o == null) return !0;
  switch (s) {
    case "between":
      return i == null ? !0 : n >= o && n <= i;
    case "notBetween":
      return i == null ? !0 : n < o || n > i;
    case "equal":
      return n === o;
    case "notEqual":
      return n !== o;
    case "greaterThan":
      return n > o;
    case "lessThan":
      return n < o;
    case "greaterThanOrEqual":
      return n >= o;
    case "lessThanOrEqual":
      return n <= o;
    default:
      return !0;
  }
}
function on(n, e = !1) {
  var s;
  const t = (r) => {
    if (r === void 0) return "";
    if (e) {
      const l = $s(r);
      return l == null ? String(r) : new Date(l).toISOString().slice(0, 10);
    }
    return String(r);
  }, o = t(n.formulae[0]), i = t(n.formulae[1]);
  switch ((s = n.operator) != null ? s : "between") {
    case "between":
      return `介于 ${o} 和 ${i} 之间`;
    case "notBetween":
      return `不介于 ${o} 和 ${i} 之间`;
    case "equal":
      return `等于 ${o}`;
    case "notEqual":
      return `不等于 ${o}`;
    case "greaterThan":
      return `大于 ${o}`;
    case "lessThan":
      return `小于 ${o}`;
    case "greaterThanOrEqual":
      return `大于等于 ${o}`;
    case "lessThanOrEqual":
      return `小于等于 ${o}`;
    default:
      return "";
  }
}
const Li = {
  cellIs: "突出显示单元格",
  expression: "公式",
  colorScale: "色阶",
  dataBar: "数据条",
  iconSet: "图标集",
  top10: "项目选取(前/后 N)",
  unsupported: "未支持"
}, kc = [
  ["greaterThan", "大于"],
  ["lessThan", "小于"],
  ["between", "介于"],
  ["notBetween", "不介于"],
  ["equal", "等于"],
  ["notEqual", "不等于"],
  ["greaterThanOrEqual", "大于等于"],
  ["lessThanOrEqual", "小于等于"]
], Sc = [
  ["3TrafficLights1", "三色交通灯"],
  ["3Arrows", "三向箭头"],
  ["3Symbols", "三符号(圈)"],
  ["3Flags", "三色旗"],
  ["4Rating", "四等评级"],
  ["5Rating", "五等评级"],
  ["5Quarters", "五象限"]
];
function Fe(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function xl(n) {
  let e = "", t = n;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
const Cc = (n) => `${xl(n.left)}${n.top + 1}:${xl(n.right)}${n.bottom + 1}`, wl = (n) => (n || []).map(Cc).join(", ") || "—";
function ob(n) {
  var e, t, o, i;
  switch (n.type) {
    case "cellIs":
      return `${((e = kc.find((s) => s[0] === n.operator)) == null ? void 0 : e[1]) || n.operator || ""} ${(n.formulae || []).join(" , ")}`;
    case "expression":
      return (n.formulae || [])[0] || "";
    case "colorScale":
      return n.colorScale ? n.colorScale.mid ? "三色" : "双色" : "";
    case "dataBar":
      return ((t = n.dataBar) == null ? void 0 : t.color) || "";
    case "iconSet":
      return ((o = Sc.find((s) => {
        var r;
        return s[0] === ((r = n.iconSet) == null ? void 0 : r.name);
      })) == null ? void 0 : o[1]) || ((i = n.iconSet) == null ? void 0 : i.name) || "";
    case "top10":
      return n.top10 ? `${n.top10.bottom ? "后" : "前"} ${n.top10.rank}${n.top10.percent ? "%" : " 项"}` : "";
    default:
      return "";
  }
}
const Ec = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", kl = `${Ec};border:1px solid #1b7f4d;background:#21a366;color:#fff`, _e = `${Ec};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
class nb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "rules", []);
    T(this, "selection", null);
    T(this, "genId", () => "cf-u0");
    T(this, "onApply", () => {
    });
    T(this, "editing", null);
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.rules = e.rules.map((s) => R({}, s)), this.selection = e.selection, this.genId = e.genId, this.onApply = e.onApply, this.editing = null;
    const t = document.createElement("div");
    t.className = "ooxml-cf-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-cf-card", o.style.cssText = "width:520px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (s) => {
      s.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (s) => {
      s.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.renderList(o);
  }
  // ---------------- 列表视图 ----------------
  renderList(e) {
    var o, i, s, r;
    const t = this.rules.map((l, a) => [
      '<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px dashed #eef0f2">',
      `<span style="flex:0 0 96px;font-weight:500">${Fe(Li[l.type] || l.type)}</span>`,
      `<span style="flex:1;min-width:0;color:#667085;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${Fe(ob(l))} · <span style="color:#98a2b3">${Fe(wl(l.ranges))}</span></span>`,
      l.type === "unsupported" ? "" : `<button data-edit="${a}" style="${_e};height:26px;padding:0 10px">编辑</button>`,
      `<button data-del="${a}" style="${_e};height:26px;padding:0 10px;color:#d92d20;border-color:#fda29b">删除</button>`,
      "</div>"
    ].join("")).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>条件格式</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:10px 16px">',
      `<div style="color:#98a2b3;font-size:12px;margin-bottom:6px">当前选区:${Fe(this.selection ? Cc(this.selection) : "无(新建规则将套到全表 A1)")}</div>`,
      this.rules.length ? t : '<div style="color:#98a2b3;padding:16px 0;text-align:center">暂无条件格式规则</div>',
      '<div style="margin-top:12px"><button data-add style="' + _e + '">+ 新建规则</button></div>',
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-cancel style="${_e}">取消</button><button data-done style="${kl}">完成</button>`,
      "</div>"
    ].join(""), (o = e.querySelector("[data-close]")) == null || o.addEventListener("click", () => this.close()), (i = e.querySelector("[data-cancel]")) == null || i.addEventListener("click", () => this.close()), (s = e.querySelector("[data-done]")) == null || s.addEventListener("click", () => {
      this.onApply(this.rules), this.close();
    }), (r = e.querySelector("[data-add]")) == null || r.addEventListener("click", () => this.startEdit(e, -1)), e.querySelectorAll("[data-edit]").forEach((l) => l.addEventListener("click", () => this.startEdit(e, Number(l.dataset.edit)))), e.querySelectorAll("[data-del]").forEach((l) => l.addEventListener("click", () => {
      this.rules.splice(Number(l.dataset.del), 1), this.renderList(e);
    }));
  }
  // ---------------- 编辑视图 ----------------
  startEdit(e, t) {
    const o = t >= 0 ? this.rules[t] : null, i = o ? o.ranges : this.selection ? [this.selection] : [{ top: 0, left: 0, bottom: 0, right: 0 }], s = o ? R({}, o) : { id: this.genId(), origin: "user", ranges: i, priority: 0, type: "cellIs", operator: "greaterThan", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" }, font: { color: "#9C5700" } } };
    this.editing = { index: t, draft: s }, this.renderEditor(e);
  }
  renderEditor(e) {
    var r, l, a, c;
    const t = this.editing.draft, o = this.editing.index < 0, i = o ? `<select data-type style="${_e};height:30px;width:180px">${["cellIs", "colorScale", "dataBar", "iconSet", "top10", "expression"].map((d) => `<option value="${d}"${d === t.type ? " selected" : ""}>${Fe(Li[d])}</option>`).join("")}</select>` : `<b>${Fe(Li[t.type] || t.type)}</b>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      `<span>${o ? "新建规则" : "编辑规则"}</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>`,
      '<div style="padding:14px 16px">',
      `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><span style="flex:0 0 70px;color:#475467">规则类型</span>${i}</div>`,
      "<div data-fields></div>",
      `<div style="color:#98a2b3;font-size:12px;margin-top:12px">应用范围:${Fe(wl(t.ranges))}</div>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-back style="${_e}">返回</button><button data-save style="${kl}">保存</button>`,
      "</div>"
    ].join("");
    const s = e.querySelector("[data-fields]");
    this.renderFields(s, t), (r = e.querySelector("[data-type]")) == null || r.addEventListener("change", (d) => {
      var u;
      this.editing.draft = this.defaultForType(d.target.value, t.ranges, (u = t.id) != null ? u : this.genId()), this.renderEditor(e);
    }), (l = e.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-back]")) == null || a.addEventListener("click", () => this.renderList(e)), (c = e.querySelector("[data-save]")) == null || c.addEventListener("click", () => {
      this.collectFields(s, this.editing.draft);
      const { index: d, draft: u } = this.editing;
      d >= 0 ? this.rules[d] = K(R({}, u), { dirty: !0 }) : this.rules.push(u), this.editing = null, this.renderList(e);
    });
  }
  defaultForType(e, t, o) {
    const i = { id: o, origin: "user", ranges: t, priority: 0 };
    switch (e) {
      case "colorScale":
        return K(R({}, i), { type: "colorScale", colorScale: { min: "#F8696B", mid: "#FFEB84", max: "#63BE7B" } });
      case "dataBar":
        return K(R({}, i), { type: "dataBar", dataBar: { color: "#638EC6", gradient: !0 } });
      case "iconSet":
        return K(R({}, i), { type: "iconSet", iconSet: { name: "3TrafficLights1", reverse: !1 } });
      case "top10":
        return K(R({}, i), { type: "top10", top10: { rank: 10, percent: !1, bottom: !1 }, style: { fill: { type: "solid", fgColor: "#FFC7CE" }, font: { color: "#9C0006" } } });
      case "expression":
        return K(R({}, i), { type: "expression", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" } } });
      default:
        return K(R({}, i), { type: "cellIs", operator: "greaterThan", formulae: [""], style: { fill: { type: "solid", fgColor: "#FFEB9C" }, font: { color: "#9C5700" } } });
    }
  }
  /** 类型专属字段。 */
  renderFields(e, t) {
    var r, l, a, c, d, u, h;
    const o = (p, m) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 70px;color:#475467">${Fe(p)}</span>${m}</div>`, i = (p, m) => `<input type="color" data-f="${p}" value="${Fe(m || "#FFFFFF")}" style="width:42px;height:28px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`, s = [];
    if (t.type === "cellIs") {
      const p = t.operator || "greaterThan", m = p === "between" || p === "notBetween";
      s.push(o("条件", `<select data-f="operator" style="${_e};height:30px;width:140px">${kc.map(([b, v]) => `<option value="${b}"${b === p ? " selected" : ""}>${Fe(v)}</option>`).join("")}</select>`)), s.push(o("值", `<input data-f="v0" value="${Fe((r = (t.formulae || [])[0]) != null ? r : "")}" placeholder="数值/文本" style="${_e};height:30px;width:110px"> ${m ? `<input data-f="v1" value="${Fe((l = (t.formulae || [])[1]) != null ? l : "")}" placeholder="到" style="${_e};height:30px;width:110px">` : ""}`)), s.push(this.formatFields(t));
    } else if (t.type === "expression")
      s.push(o("公式", `<input data-f="v0" value="${Fe((a = (t.formulae || [])[0]) != null ? a : "")}" placeholder="=$A1>100" style="${_e};height:30px;flex:1">`)), s.push(this.formatFields(t));
    else if (t.type === "colorScale") {
      const p = t.colorScale || { min: "#F8696B", max: "#63BE7B" }, m = !!p.mid;
      s.push(o("色标数", `<label style="cursor:pointer"><input type="radio" name="csn" data-f="csn" value="2"${m ? "" : " checked"}> 双色</label> <label style="cursor:pointer;margin-left:12px"><input type="radio" name="csn" data-f="csn" value="3"${m ? " checked" : ""}> 三色</label>`)), s.push(o("最小", i("csmin", p.min))), m && s.push(o("中间", i("csmid", p.mid || "#FFEB84"))), s.push(o("最大", i("csmax", p.max)));
    } else if (t.type === "dataBar")
      s.push(o("条颜色", i("dbcolor", ((c = t.dataBar) == null ? void 0 : c.color) || "#638EC6"))), s.push(o("渐变", `<label style="cursor:pointer"><input type="checkbox" data-f="dbgrad"${((d = t.dataBar) == null ? void 0 : d.gradient) !== !1 ? " checked" : ""}> 渐变填充</label>`));
    else if (t.type === "iconSet") {
      const p = ((u = t.iconSet) == null ? void 0 : u.name) || "3TrafficLights1";
      s.push(o("图标集", `<select data-f="iconset" style="${_e};height:30px;width:160px">${Sc.map(([m, b]) => `<option value="${m}"${m === p ? " selected" : ""}>${Fe(b)}</option>`).join("")}</select>`)), s.push(o("反向", `<label style="cursor:pointer"><input type="checkbox" data-f="iconrev"${(h = t.iconSet) != null && h.reverse ? " checked" : ""}> 反转图标顺序</label>`));
    } else if (t.type === "top10") {
      const p = t.top10 || { rank: 10, percent: !1, bottom: !1 };
      s.push(o("选取", `<label style="cursor:pointer"><input type="radio" name="t10b" data-f="t10top" value="top"${p.bottom ? "" : " checked"}> 前</label> <label style="cursor:pointer;margin-left:12px"><input type="radio" name="t10b" data-f="t10top" value="bottom"${p.bottom ? " checked" : ""}> 后</label> <input data-f="t10rank" type="number" min="1" value="${p.rank}" style="${_e};height:30px;width:70px;margin-left:10px"> <label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="t10pct"${p.percent ? " checked" : ""}> 百分比</label>`)), s.push(this.formatFields(t));
    }
    e.innerHTML = s.join(""), e.querySelectorAll('[data-f="csn"]').forEach((p) => p.addEventListener("change", () => {
      var v;
      this.collectFields(e, this.editing.draft);
      const m = (v = e.querySelector('[data-f="csn"]:checked')) == null ? void 0 : v.value, b = this.editing.draft.colorScale || { min: "#F8696B", max: "#63BE7B" };
      this.editing.draft.colorScale = m === "3" ? { min: b.min, mid: b.mid || "#FFEB84", max: b.max } : { min: b.min, max: b.max }, this.renderFields(e, this.editing.draft);
    }));
  }
  /** 通用「格式」字段(填充色 + 字体色 + 加粗),cellIs/expression/top10 用。 */
  formatFields(e) {
    var s, r, l, a, c;
    const t = (s = e.style) != null && s.fill && e.style.fill.type !== "none" ? e.style.fill.fgColor || "#FFEB9C" : "", o = ((l = (r = e.style) == null ? void 0 : r.font) == null ? void 0 : l.color) || "", i = !!((c = (a = e.style) == null ? void 0 : a.font) != null && c.bold);
    return [
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">',
      '<span style="flex:0 0 70px;color:#475467">命中格式</span>',
      `<label style="cursor:pointer"><input type="checkbox" data-f="hasfill"${t ? " checked" : ""}> 填充</label> <input type="color" data-f="fillcolor" value="${Fe(t || "#FFEB9C")}" style="width:36px;height:26px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`,
      `<label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="hasfont"${o ? " checked" : ""}> 字体色</label> <input type="color" data-f="fontcolor" value="${Fe(o || "#9C0006")}" style="width:36px;height:26px;padding:0;border:1px solid #d0d5dd;border-radius:4px;cursor:pointer">`,
      `<label style="cursor:pointer;margin-left:8px"><input type="checkbox" data-f="bold"${i ? " checked" : ""}> 加粗</label>`,
      "</div>"
    ].join("");
  }
  /** 从 DOM 收集字段写回 draft。 */
  collectFields(e, t) {
    var s, r, l, a, c, d, u;
    const o = (h) => {
      var p;
      return (p = e.querySelector(`[data-f="${h}"]`)) == null ? void 0 : p.value;
    }, i = (h) => {
      var p;
      return (p = e.querySelector(`[data-f="${h}"]`)) == null ? void 0 : p.checked;
    };
    if (t.type === "cellIs") {
      t.operator = o("operator") || "greaterThan";
      const h = t.operator === "between" || t.operator === "notBetween";
      t.formulae = h ? [(s = o("v0")) != null ? s : "", (r = o("v1")) != null ? r : ""] : [(l = o("v0")) != null ? l : ""], this.collectFormat(e, t);
    } else if (t.type === "expression")
      t.formulae = [(a = o("v0")) != null ? a : ""], this.collectFormat(e, t);
    else if (t.type === "colorScale") {
      const h = ((c = e.querySelector('[data-f="csn"]:checked')) == null ? void 0 : c.value) || ((d = t.colorScale) != null && d.mid ? "3" : "2"), p = o("csmin") || "#F8696B", m = o("csmax") || "#63BE7B";
      t.colorScale = h === "3" ? { min: p, mid: o("csmid") || "#FFEB84", max: m } : { min: p, max: m };
    } else t.type === "dataBar" ? t.dataBar = { color: o("dbcolor") || "#638EC6", gradient: !!i("dbgrad") } : t.type === "iconSet" ? t.iconSet = { name: o("iconset") || "3TrafficLights1", reverse: !!i("iconrev") } : t.type === "top10" && (t.top10 = { rank: Math.max(1, Number(o("t10rank")) || 10), percent: !!i("t10pct"), bottom: ((u = e.querySelector('[data-f="t10top"]:checked')) == null ? void 0 : u.value) === "bottom" }, this.collectFormat(e, t));
  }
  collectFormat(e, t) {
    const o = (l) => {
      var a;
      return (a = e.querySelector(`[data-f="${l}"]`)) == null ? void 0 : a.value;
    }, i = (l) => {
      var a;
      return (a = e.querySelector(`[data-f="${l}"]`)) == null ? void 0 : a.checked;
    }, s = {};
    i("hasfill") ? s.fill = { type: "solid", fgColor: o("fillcolor") || "#FFEB9C" } : s.fill = { type: "none" };
    const r = {};
    i("hasfont") && (r.color = o("fontcolor") || "#9C0006"), i("bold") && (r.bold = !0), Object.keys(r).length && (s.font = r), t.style = s;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.editing = null;
  }
  dispose() {
    this.close();
  }
}
const Sl = { general: "常规", number: "数值", currency: "货币", percent: "百分比", date: "日期", time: "时间", text: "文本", custom: "自定义" }, Cl = [
  ["yyyy/m/d", "2026/4/1"],
  ["yyyy-mm-dd", "2026-04-01"],
  ["m月d日", "4月1日"],
  ["yyyy年m月d日", "2026年4月1日"],
  ["mm/dd/yy", "04/01/26"],
  ["yyyy/m/d h:mm", "2026/4/1 13:05"]
], El = [["h:mm", "13:05"], ["h:mm:ss", "13:05:09"], ["h:mm AM/PM", "1:05 PM"], ["[h]:mm:ss", "总时长"]], ib = [["¥", "¥ 人民币"], ["$", "$ 美元"], ["€", "€ 欧元"], ["£", "£ 英镑"], ["", "无符号"]];
function jt(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function sb(n, e) {
  const t = e.decimals > 0 ? "." + "0".repeat(e.decimals) : "";
  switch (n) {
    case "general":
      return "General";
    case "text":
      return "@";
    case "number": {
      const o = (e.thousands ? "#,##0" : "0") + t;
      return e.negRed ? `${o};[Red]-${o}` : o;
    }
    case "currency": {
      const o = `${e.symbol}#,##0${t}`;
      return e.negRed ? `${o};[Red]-${o}` : o;
    }
    case "percent":
      return "0" + t + "%";
    case "date":
    case "time":
      return e.preset;
    case "custom":
      return e.preset || "General";
  }
}
function rb(n) {
  return !n || n === "General" ? "general" : n === "@" ? "text" : /%/.test(n) ? "percent" : /[¥$€£]/.test(n) ? "currency" : /[yhsm]|AM\/PM|\[h\]/i.test(n) && /[ymdhs:]/.test(n) && !/#|0\.0/.test(n.replace(/\[.*?\]/g, "")) ? /[hs]|AM\/PM|\[h\]/i.test(n) && !/[ymd]/.test(n) ? "time" : "date" : /^[#0,.]+$/.test(n.split(";")[0]) ? "number" : "custom";
}
const Tc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Tl = `${Tc};border:1px solid #1b7f4d;background:#21a366;color:#fff`, yo = `${Tc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
class lb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "cat", "general");
    T(this, "opt", { decimals: 2, thousands: !0, negRed: !1, symbol: "¥", preset: "yyyy/m/d" });
    T(this, "sample", 1234.567);
    T(this, "date1904", !1);
    T(this, "onApply", () => {
    });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.sample = e.sampleValue, this.date1904 = e.date1904, this.onApply = e.onApply, this.cat = rb(e.currentCode);
    const t = /\.0+/.exec(e.currentCode);
    this.opt.decimals = t ? t[0].length - 1 : this.cat === "general" ? 2 : 0, this.opt.thousands = /#,##0/.test(e.currentCode), this.opt.negRed = /\[Red\]/i.test(e.currentCode);
    const o = /[¥$€£]/.exec(e.currentCode);
    o && (this.opt.symbol = o[0]), (this.cat === "date" || this.cat === "time" || this.cat === "custom") && (this.opt.preset = e.currentCode);
    const i = document.createElement("div");
    i.className = "ooxml-numfmt-mask", i.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const s = document.createElement("div");
    s.className = "ooxml-numfmt-card", s.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", i.appendChild(s), document.body.appendChild(i), this.el = i;
    const r = (l) => {
      l.key === "Escape" && this.close();
    };
    i.addEventListener("mousedown", (l) => {
      l.target === i && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), this.render(s);
  }
  currentCode() {
    return sb(this.cat, this.opt);
  }
  render(e) {
    var r, l, a;
    const t = this.currentCode(), o = to(this.previewValue(), t, this.date1904).text, i = Object.keys(Sl).map((c) => `<button data-cat="${c}" style="${this.cat === c ? Tl : yo};height:28px;padding:0 10px;margin:0 6px 6px 0">${Sl[c]}</button>`).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600;position:sticky;top:0;background:#fff">',
      '<span>设置单元格格式</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      `<div style="margin-bottom:10px">${i}</div>`,
      '<div data-opts style="min-height:40px"></div>',
      `<div style="margin-top:12px;display:flex;align-items:center;gap:8px"><span style="flex:0 0 64px;color:#475467">格式代码</span><input data-code value="${jt(t)}" style="${yo};height:30px;flex:1;font-family:Consolas,monospace"></div>`,
      `<div style="margin-top:10px;padding:10px 12px;background:#f7f8fa;border:1px solid #eef0f2;border-radius:6px"><span style="color:#98a2b3">预览:</span> <b data-preview style="font-size:15px">${jt(o)}</b></div>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2;position:sticky;bottom:0">',
      `<button data-cancel style="${yo}">取消</button><button data-ok style="${Tl}">确定</button>`,
      "</div>"
    ].join(""), this.renderOpts(e.querySelector("[data-opts]")), e.querySelectorAll("[data-cat]").forEach((c) => c.addEventListener("click", () => {
      this.cat = c.dataset.cat, this.cat === "date" && (this.opt.preset = Cl[0][0]), this.cat === "time" && (this.opt.preset = El[0][0]), this.render(e);
    })), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      const c = e.querySelector("[data-code]").value.trim();
      this.onApply(c || "General"), this.close();
    });
    const s = e.querySelector("[data-code]");
    s.addEventListener("input", () => {
      e.querySelector("[data-preview]").textContent = to(this.previewValue(), s.value, this.date1904).text;
    });
  }
  renderOpts(e) {
    const t = (i, s) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><span style="flex:0 0 64px;color:#475467">${i}</span>${s}</div>`, o = [];
    if ((this.cat === "number" || this.cat === "currency" || this.cat === "percent") && o.push(t("小数位数", `<input data-o="decimals" type="number" min="0" max="10" value="${this.opt.decimals}" style="${yo};height:28px;width:70px">`)), (this.cat === "number" || this.cat === "currency") && o.push(t("选项", `<label style="cursor:pointer"><input type="checkbox" data-o="thousands"${this.opt.thousands ? " checked" : ""}> 千分位</label> <label style="cursor:pointer;margin-left:14px"><input type="checkbox" data-o="negRed"${this.opt.negRed ? " checked" : ""}> 负数红色</label>`)), this.cat === "currency" && o.push(t("货币符号", `<select data-o="symbol" style="${yo};height:30px">${ib.map(([i, s]) => `<option value="${i}"${i === this.opt.symbol ? " selected" : ""}>${jt(s)}</option>`).join("")}</select>`)), this.cat === "date" || this.cat === "time") {
      const i = this.cat === "date" ? Cl : El;
      o.push(`<div style="display:flex;flex-direction:column;gap:4px">${i.map(([s, r]) => `<label style="cursor:pointer;padding:5px 8px;border:1px solid ${s === this.opt.preset ? "#21a366" : "#eef0f2"};border-radius:5px;display:flex;justify-content:space-between"><span><input type="radio" name="nfp" data-o="preset" value="${jt(s)}"${s === this.opt.preset ? " checked" : ""}> ${jt(s)}</span><span style="color:#98a2b3">${jt(r)}</span></label>`).join("")}</div>`);
    }
    this.cat === "general" && o.push('<div style="color:#98a2b3">不设特定格式,按内容自动显示。</div>'), this.cat === "text" && o.push('<div style="color:#98a2b3">按文本显示,数字也不参与计算格式。</div>'), this.cat === "custom" && o.push('<div style="color:#98a2b3">在下方「格式代码」里直接输入自定义格式(如 <code>0.00"元"</code>、<code>#,##0;[Red]-#,##0</code>)。</div>'), e.innerHTML = o.join(""), e.querySelectorAll("[data-o]").forEach((i) => i.addEventListener("change", () => {
      const s = i, r = s.dataset.o;
      r === "thousands" || r === "negRed" ? this.opt[r] = s.checked : r === "decimals" ? this.opt.decimals = Math.max(0, Math.min(10, Number(s.value) || 0)) : this.opt[r] = s.value;
      const l = e.closest(".ooxml-numfmt-card");
      l && this.render(l);
    }));
  }
  /** 预览取值:活动格有数值/日期就用它,否则按分类给个内置示例。 */
  previewValue() {
    const e = this.sample;
    return this.cat === "date" || this.cat === "time" ? e instanceof Date ? e : new Date(Date.UTC(2026, 3, 1, 13, 5, 9)) : this.cat === "text" ? typeof e == "string" ? e : String(e != null ? e : "示例文本") : typeof e == "number" ? e : 1234.567;
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Ml(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const Pi = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit";
class ab {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  show(e) {
    var l, a, c, d;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-comment-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-comment-card", o.style.cssText = "width:380px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;overflow:hidden", o.innerHTML = [
      `<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">${e.current ? "编辑" : "插入"}批注 · ${Ml(e.cellRef)}<button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>`,
      '<div style="padding:14px 16px">',
      `<textarea data-text rows="5" placeholder="输入批注…" style="width:100%;box-sizing:border-box;border:1px solid #d0d5dd;border-radius:6px;padding:8px;font:inherit;resize:vertical">${Ml(e.current)}</textarea>`,
      "</div>",
      '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-del style="${Pi};border:1px solid #fda29b;background:#fff;color:#d92d20"${e.current ? "" : ' disabled style="display:none"'}>删除批注</button>`,
      `<div style="display:flex;gap:8px;margin-left:auto"><button data-cancel style="${Pi};border:1px solid #d0d5dd;background:#fff;color:#1f2329">取消</button><button data-ok style="${Pi};border:1px solid #1b7f4d;background:#21a366;color:#fff">确定</button></div>`,
      "</div>"
    ].join(""), t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = o.querySelector("[data-text]"), s = (u) => {
      e.onApply(u), this.close();
    }, r = (u) => {
      u.key === "Escape" ? (u.preventDefault(), this.close()) : u.key === "Enter" && (u.ctrlKey || u.metaKey) && (u.preventDefault(), s(i.value));
    };
    (l = o.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = o.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), (c = o.querySelector("[data-ok]")) == null || c.addEventListener("click", () => s(i.value)), (d = o.querySelector("[data-del]")) == null || d.addEventListener("click", () => s("")), t.addEventListener("mousedown", (u) => {
      u.target === t && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), setTimeout(() => {
      i.focus(), i.setSelectionRange(i.value.length, i.value.length);
    }, 0);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Il(n) {
  let e = 0;
  for (const t of n) e = e * 26 + (t.charCodeAt(0) - 64);
  return e - 1;
}
const Mc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", cb = `${Mc};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Ni = `${Mc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, vo = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit;width:70px";
function db(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function ub(n) {
  return `${Pe(n.left)}${n.top + 1}:${Pe(n.right)}${n.bottom + 1}`;
}
function hb(n) {
  const e = /^\s*(\d+)\s*[:\-]?\s*(\d+)?\s*$/.exec(n);
  if (!e) return;
  const t = Number(e[1]) - 1, o = e[2] ? Number(e[2]) - 1 : t;
  return t >= 0 && o >= t ? [t, o] : void 0;
}
function fb(n) {
  const e = /^\s*([A-Za-z]+)\s*[:\-]?\s*([A-Za-z]+)?\s*$/.exec(n);
  if (!e) return;
  const t = Il(e[1].toUpperCase()), o = e[2] ? Il(e[2].toUpperCase()) : t;
  return t >= 0 && o >= t ? [t, o] : void 0;
}
class pb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "ps", {});
    T(this, "o");
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.ps = JSON.parse(JSON.stringify(e.current || {}));
    const t = document.createElement("div");
    t.className = "ooxml-pagesetup-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-pagesetup-card", o.style.cssText = "width:480px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (s) => {
      s.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (s) => {
      s.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(o);
  }
  render(e) {
    var r, l, a, c, d, u, h, p, m;
    const t = this.ps, o = t.margins || { top: 19, right: 18, bottom: 19, left: 18, header: 8, footer: 8 }, i = (b, v) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px"><span style="flex:0 0 74px;color:#475467">${b}</span>${v}</div>`, s = (b, v) => `<label style="display:inline-flex;align-items:center;gap:4px">${v}<input data-m="${b}" type="number" min="0" step="1" value="${o[b]}" style="${vo};width:56px"></label>`;
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>页面设置</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      i("方向", `<label style="margin-right:14px;cursor:pointer"><input type="radio" name="ori" data-ori="portrait"${t.orientation !== "landscape" ? " checked" : ""}> 纵向</label><label style="cursor:pointer"><input type="radio" name="ori" data-ori="landscape"${t.orientation === "landscape" ? " checked" : ""}> 横向</label>`),
      i("纸张", `<select data-paper style="${vo};width:120px">${["a4", "a3", "letter"].map((b) => `<option value="${b}"${(Array.isArray(t.paperFormat) ? "a4" : t.paperFormat || "a4") === b ? " selected" : ""}>${b.toUpperCase()}</option>`).join("")}</select>`),
      i("缩放", `<label style="display:inline-flex;align-items:center;gap:4px"><input data-scale type="number" min="10" max="400" value="${(r = t.scale) != null ? r : 100}" style="${vo};width:64px"${t.fitToPage ? " disabled" : ""}> %</label><label style="margin-left:14px;cursor:pointer"><input data-fit type="checkbox"${t.fitToPage ? " checked" : ""}> 适应一页宽</label>`),
      i("页边距", `<div style="display:flex;flex-wrap:wrap;gap:6px 10px">${s("top", "上")}${s("bottom", "下")}${s("left", "左")}${s("right", "右")}${s("header", "页眉")}${s("footer", "页脚")}<span style="color:#98a2b3;align-self:center">mm</span></div>`),
      i("打印区域", `<span data-pa style="flex:1;color:${t.printArea ? "#1f2329" : "#98a2b3"}">${t.printArea ? db(ub(t.printArea)) : "(整表)"}</span><button data-pa-sel style="${Ni};height:26px;padding:0 10px"${this.o.hasSelection ? "" : " disabled"}>设为当前选区</button>${t.printArea ? '<button data-pa-clr style="' + Ni + ';height:26px;padding:0 8px">清除</button>' : ""}`),
      i("打印标题", `<label style="display:inline-flex;align-items:center;gap:4px">顶端行<input data-tr value="${t.printTitleRows ? t.printTitleRows[0] + 1 + ":" + (t.printTitleRows[1] + 1) : ""}" placeholder="如 1:1" style="${vo};width:64px"></label><label style="display:inline-flex;align-items:center;gap:4px;margin-left:10px">左侧列<input data-tc value="${t.printTitleCols ? Pe(t.printTitleCols[0]) + ":" + Pe(t.printTitleCols[1]) : ""}" placeholder="如 A:A" style="${vo};width:64px"></label>`),
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Ni}">取消</button><button data-ok style="${cb}">确定</button>`,
      "</div>"
    ].join(""), (l = e.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), e.querySelectorAll("[data-ori]").forEach((b) => b.addEventListener("change", () => {
      this.ps.orientation = b.dataset.ori;
    })), (c = e.querySelector("[data-paper]")) == null || c.addEventListener("change", (b) => {
      this.ps.paperFormat = b.target.value;
    }), (d = e.querySelector("[data-scale]")) == null || d.addEventListener("change", (b) => {
      this.ps.scale = Math.max(10, Math.min(400, Number(b.target.value) || 100));
    }), (u = e.querySelector("[data-fit]")) == null || u.addEventListener("change", (b) => {
      this.ps.fitToPage = b.target.checked, this.render(e);
    }), e.querySelectorAll("[data-m]").forEach((b) => b.addEventListener("change", () => {
      const v = b, y = this.ps.margins || { top: 19, right: 18, bottom: 19, left: 18, header: 8, footer: 8 };
      this.ps.margins = K(R({}, y), { [v.dataset.m]: Math.max(0, Number(v.value) || 0) });
    })), (h = e.querySelector("[data-pa-sel]")) == null || h.addEventListener("click", () => {
      this.o.onPrintAreaFromSelection(), this.close();
    }), (p = e.querySelector("[data-pa-clr]")) == null || p.addEventListener("click", () => {
      delete this.ps.printArea, this.render(e);
    }), (m = e.querySelector("[data-ok]")) == null || m.addEventListener("click", () => {
      const b = e.querySelector("[data-tr]").value, v = e.querySelector("[data-tc]").value, y = hb(b), w = fb(v);
      y ? this.ps.printTitleRows = y : delete this.ps.printTitleRows, w ? this.ps.printTitleCols = w : delete this.ps.printTitleCols, this.o.onApply(this.ps), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Ic = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", gb = `${Ic};border:1px solid #1b7f4d;background:#21a366;color:#fff`, nn = `${Ic};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Oi = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit";
function $l(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class mb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o");
    T(this, "bg");
    T(this, "wm", { text: "", fontSize: 48, opacity: 0.12, color: "#888888", angle: -30 });
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.bg = e.background ? R({}, e.background) : void 0, this.wm = R({ text: "", fontSize: 48, opacity: 0.12, color: "#888888", angle: -30 }, e.watermark || {});
    const t = document.createElement("div");
    t.className = "ooxml-background-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-background-card", o.style.cssText = "width:440px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (s) => {
      s.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (s) => {
      s.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(o);
  }
  render(e) {
    var i, s, r, l, a, c, d, u, h, p, m, b, v;
    const t = this.wm, o = (i = this.bg) != null && i.src ? `<img src="${$l(this.bg.src)}" style="max-width:80px;max-height:44px;border:1px solid #eef0f2;border-radius:4px;vertical-align:middle">` : '<span style="color:#98a2b3">未设置</span>';
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>背景 / 水印</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      // 背景图片
      '<div style="font-weight:600;margin-bottom:6px">工作表背景图片</div>',
      `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">${o}<button data-bg-pick style="${nn};height:28px;padding:0 12px">选择图片…</button>${this.bg ? '<button data-bg-clr style="' + nn + ';height:28px;padding:0 10px">清除</button>' : ""}</div>`,
      '<div style="height:1px;background:#eef0f2;margin:6px 0 12px"></div>',
      // 水印
      '<div style="font-weight:600;margin-bottom:6px">文字水印 <span style="font-weight:400;color:#98a2b3;font-size:12px">(仅屏幕显示,不导出)</span></div>',
      `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="flex:0 0 48px;color:#475467">文字</span><input data-wm-text value="${$l(t.text || "")}" placeholder="如 机密 / DRAFT" style="${Oi};flex:1"></div>`,
      '<div style="display:flex;flex-wrap:wrap;gap:8px 14px;margin-bottom:6px">',
      `<label style="display:inline-flex;align-items:center;gap:4px">字号<input data-wm-size type="number" min="12" max="200" value="${t.fontSize}" style="${Oi};width:60px"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">角度<input data-wm-angle type="number" min="-90" max="90" value="${t.angle}" style="${Oi};width:56px"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">透明<input data-wm-op type="range" min="3" max="60" value="${Math.round(((s = t.opacity) != null ? s : 0.12) * 100)}"></label>`,
      `<label style="display:inline-flex;align-items:center;gap:4px">颜色<input data-wm-color type="color" value="${t.color || "#888888"}"></label>`,
      "</div>",
      "</div>",
      '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-wm-clr style="${nn}">清除水印</button><div style="display:flex;gap:8px"><button data-cancel style="${nn}">取消</button><button data-ok style="${gb}">确定</button></div>`,
      "</div>"
    ].join(""), (r = e.querySelector("[data-close]")) == null || r.addEventListener("click", () => this.close()), (l = e.querySelector("[data-cancel]")) == null || l.addEventListener("click", () => this.close()), (a = e.querySelector("[data-bg-pick]")) == null || a.addEventListener("click", () => {
      const y = document.createElement("input");
      y.type = "file", y.accept = "image/*", y.onchange = () => {
        var k;
        const w = (k = y.files) == null ? void 0 : k[0];
        if (!w) return;
        const S = new FileReader();
        S.onload = () => {
          this.bg = { src: String(S.result), mime: w.type }, this.render(e);
        }, S.readAsDataURL(w);
      }, y.click();
    }), (c = e.querySelector("[data-bg-clr]")) == null || c.addEventListener("click", () => {
      this.bg = void 0, this.render(e);
    }), (d = e.querySelector("[data-wm-text]")) == null || d.addEventListener("input", (y) => {
      this.wm.text = y.target.value;
    }), (u = e.querySelector("[data-wm-size]")) == null || u.addEventListener("change", (y) => {
      this.wm.fontSize = Math.max(12, Math.min(200, Number(y.target.value) || 48));
    }), (h = e.querySelector("[data-wm-angle]")) == null || h.addEventListener("change", (y) => {
      this.wm.angle = Math.max(-90, Math.min(90, Number(y.target.value) || 0));
    }), (p = e.querySelector("[data-wm-op]")) == null || p.addEventListener("input", (y) => {
      this.wm.opacity = Number(y.target.value) / 100;
    }), (m = e.querySelector("[data-wm-color]")) == null || m.addEventListener("input", (y) => {
      this.wm.color = y.target.value;
    }), (b = e.querySelector("[data-wm-clr]")) == null || b.addEventListener("click", () => {
      this.o.onApplyWatermark(void 0), this.wm.text = "", this.render(e);
    }), (v = e.querySelector("[data-ok]")) == null || v.addEventListener("click", () => {
      this.o.onApplyBackground(this.bg), this.o.onApplyWatermark(this.wm.text.trim() ? this.wm : void 0), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const $c = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", bb = `${$c};border:1px solid #1b7f4d;background:#21a366;color:#fff`, Al = `${$c};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Fl = "height:28px;border:1px solid #d0d5dd;border-radius:4px;padding:0 6px;font:inherit", yb = "width:26px;height:26px;border:1px solid #d0d5dd;background:#fff;border-radius:4px;cursor:pointer;font:inherit;color:#475467";
function vb(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class xb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o");
    T(this, "keys", []);
  }
  show(e) {
    if (typeof document == "undefined" || !e.columns.length) return;
    this.close(), this.o = e, this.keys = [{ col: e.columns[0].index, dir: "asc" }];
    const t = document.createElement("div");
    t.className = "ooxml-sort-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-sort-card", o.style.cssText = "width:460px;max-width:94vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (s) => {
      s.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (s) => {
      s.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.render(o);
  }
  render(e) {
    var i, s, r, l;
    const t = (a) => this.o.columns.map((c) => `<option value="${c.index}"${c.index === a ? " selected" : ""}>${vb(c.label)}</option>`).join(""), o = this.keys.map((a, c) => [
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">',
      `<span style="flex:0 0 52px;color:#475467">${c === 0 ? "主要" : "次要"}</span>`,
      `<select data-col="${c}" style="${Fl};flex:1">${t(a.col)}</select>`,
      `<select data-dir="${c}" style="${Fl};width:88px"><option value="asc"${a.dir === "asc" ? " selected" : ""}>升序</option><option value="desc"${a.dir === "desc" ? " selected" : ""}>降序</option></select>`,
      `<button data-del="${c}" style="${yb};color:#d92d20"${this.keys.length === 1 ? " disabled" : ""}>✕</button>`,
      "</div>"
    ].join("")).join("");
    e.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #eef0f2;font-weight:600">',
      '<span>排序</span><button data-close style="border:0;background:none;font-size:20px;line-height:1;color:#8a8f98;cursor:pointer">×</button></div>',
      '<div style="padding:14px 16px">',
      o,
      `<button data-add style="${Al};height:28px;padding:0 12px;margin-top:2px">＋ 添加条件</button>`,
      "</div>",
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#fafbfc;border-top:1px solid #eef0f2">',
      `<button data-cancel style="${Al}">取消</button><button data-ok style="${bb}">确定</button>`,
      "</div>"
    ].join(""), (i = e.querySelector("[data-close]")) == null || i.addEventListener("click", () => this.close()), (s = e.querySelector("[data-cancel]")) == null || s.addEventListener("click", () => this.close()), e.querySelectorAll("[data-col]").forEach((a) => a.addEventListener("change", (c) => {
      this.keys[Number(a.dataset.col)].col = Number(c.target.value);
    })), e.querySelectorAll("[data-dir]").forEach((a) => a.addEventListener("change", (c) => {
      this.keys[Number(a.dataset.dir)].dir = c.target.value;
    })), e.querySelectorAll("[data-del]").forEach((a) => a.addEventListener("click", () => {
      this.keys.splice(Number(a.dataset.del), 1), this.render(e);
    })), (r = e.querySelector("[data-add]")) == null || r.addEventListener("click", () => {
      var d;
      const a = new Set(this.keys.map((u) => u.col)), c = (d = this.o.columns.find((u) => !a.has(u.index))) != null ? d : this.o.columns[0];
      this.keys.push({ col: c.index, dir: "asc" }), this.render(e);
    }), (l = e.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      this.o.onApply(this.keys.slice()), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function wb(n) {
  switch (n) {
    case "solid":
      return "thin";
    case "dotted":
      return "dotted";
    case "dashed":
      return "dashed";
    case "double":
      return "double";
    case "none":
    case "hidden":
      return null;
    default:
      return "thin";
  }
}
function Rl(n) {
  if (!n) return;
  const e = /\b(solid|dotted|dashed|double|none|hidden)\b/i.exec(n), t = e ? wb(e[1].toLowerCase()) : null;
  if (!t) return;
  const o = /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)/i.exec(n);
  return { style: t, color: o && Ro(o[0]) || "#000000" };
}
function kb(n) {
  const e = /* @__PURE__ */ new Map();
  let t = "";
  return n.querySelectorAll("style").forEach((o) => {
    var l;
    const i = (o.textContent || "").replace(/<!--|-->/g, "").replace(/\/\*[\s\S]*?\*\//g, ""), s = /([^{}]+)\{([^{}]*)\}/g;
    let r;
    for (; r = s.exec(i); ) {
      const a = r[2].trim();
      if (a)
        for (const c of r[1].split(",")) {
          const d = c.trim(), u = (l = /\.([A-Za-z0-9_-]+)\s*$/.exec(d)) == null ? void 0 : l[1];
          u ? e.set(u, e.has(u) ? `${e.get(u)};${a}` : a) : /(^|\s)td$/i.test(d) && (t = t ? `${t};${a}` : a);
        }
    }
  }), { classes: e, tdDefault: t };
}
function Sb(n, e, t) {
  const o = (n.getAttribute("class") || "").split(/\s+/).filter(Boolean), i = e.size ? o.map((l) => e.get(l)).filter(Boolean).join(";") : "", s = n.getAttribute("style") || "", r = [t, i, s].filter(Boolean).join(";");
  return (t || i) && (n.style.cssText = r), r;
}
function Cb(n) {
  return n.trim().replace(/^"|"$/g, "").replace(/\\([0-9a-fA-F]{4})/g, (e, t) => String.fromCharCode(parseInt(t, 16))).replace(/\\(.)/g, "$1");
}
function Eb(n) {
  const e = /mso-number-format:\s*("(?:\\.|[^"\\])*"|[^;]+)/gi;
  let t, o;
  for (; o = e.exec(n); ) t = o[1];
  if (t === void 0) return;
  const i = Cb(t);
  return i && !/^general$/i.test(i) ? i : void 0;
}
function Tb(n) {
  var e, t;
  for (const o of Array.from(n.childNodes)) {
    if (o.nodeType !== 8) continue;
    const i = o.data, s = /o:gfxdata="([^"]+)"/.exec(i);
    if (s)
      try {
        const r = Mt(Tn(s[1].replace(/\s+/g, "")));
        for (const [l, a] of Object.entries(r)) {
          const c = (t = (e = /\.(png|jpe?g|gif|bmp)$/i.exec(l)) == null ? void 0 : e[1]) == null ? void 0 : t.toLowerCase();
          if (c && a.length)
            return `data:${c === "jpg" || c === "jpeg" ? "image/jpeg" : `image/${c}`};base64,${no(a)}`;
        }
      } catch (r) {
      }
  }
  return null;
}
function Mb(n) {
  var m;
  const e = n.style, t = {}, o = {}, i = e.fontWeight;
  (i === "bold" || i === "bolder" || i && Number(i) >= 600) && (o.bold = !0), n.querySelector("b,strong") && (o.bold = !0), (e.fontStyle === "italic" || n.querySelector("i,em")) && (o.italic = !0);
  const s = (e.textDecorationLine || e.textDecoration || "") + (n.querySelector("u") ? " underline" : "");
  /underline/.test(s) && (o.underline = !0), /line-through/.test(s) && (o.strike = !0);
  const r = Ro(e.color);
  if (r && (o.color = r), e.fontFamily && (o.name = e.fontFamily.split(",")[0].trim().replace(/['"]/g, "")), e.fontSize) {
    const b = parseFloat(e.fontSize);
    b > 0 && (o.size = /pt\b/i.test(e.fontSize) ? Math.round(b) : Math.round(b * 72 / 96));
  }
  Object.keys(o).length && (t.font = o);
  const l = Ro(e.backgroundColor);
  l && (t.fill = { type: "solid", fgColor: l }), (e.textAlign === "left" || e.textAlign === "center" || e.textAlign === "right") && (t.hAlign = e.textAlign);
  const a = e.verticalAlign;
  a === "top" ? t.vAlign = "top" : a === "middle" ? t.vAlign = "middle" : a === "bottom" && (t.vAlign = "bottom");
  const c = e.whiteSpace;
  (c === "normal" || c === "pre-wrap" || c === "pre-line") && (t.wrapText = !0);
  const d = {}, u = [
    ["top", e.borderTop],
    ["right", e.borderRight],
    ["bottom", e.borderBottom],
    ["left", e.borderLeft]
  ];
  let h = !1;
  const p = e.border ? Rl(e.border) : void 0;
  for (const [b, v] of u) {
    const y = (m = Rl(v)) != null ? m : p;
    y && (d[b] = y, h = !0);
  }
  return h && (t.borders = d), Object.keys(t).length ? t : null;
}
function Ib(n) {
  var i;
  const e = n.getAttribute("x:num");
  if (e != null && e !== "" && !isNaN(Number(e))) return Number(e);
  const t = n.getAttribute("x:fmla");
  if (t) return t[0] === "=" ? t : "=" + t;
  const o = ((i = n.textContent) != null ? i : "").replace(/ /g, " ").trim();
  return o === "" ? null : o;
}
function $b(n) {
  var b, v, y, w;
  if (typeof DOMParser == "undefined" || !n) return null;
  let e;
  try {
    e = new DOMParser().parseFromString(n, "text/html");
  } catch (S) {
    return null;
  }
  const t = e.querySelector("table");
  if (!t) return null;
  const { classes: o, tdDefault: i } = kb(e), s = [], r = [], l = [], a = [], c = [], d = [], u = /* @__PURE__ */ new Set();
  for (const S of Array.from(t.querySelectorAll("col"))) {
    const k = parseInt(S.getAttribute("width") || "", 10), C = Math.max(1, parseInt(S.getAttribute("span") || "1", 10) || 1);
    for (let M = 0; M < C; M++) c.push(Number.isFinite(k) && k > 0 ? k : 0);
  }
  const h = Array.from(t.querySelectorAll("tr"));
  let p = 0;
  for (const S of h) {
    const k = Array.from(S.children).filter((P) => P.tagName === "TD" || P.tagName === "TH");
    if (!k.length) continue;
    const C = parseInt(S.getAttribute("height") || k[0].getAttribute("height") || "", 10);
    Number.isFinite(C) && C > 0 && (d[p] = C);
    const M = (b = s[p]) != null ? b : s[p] = [];
    let E = 0;
    for (const P of k) {
      for (; u.has(`${p}:${E}`); )
        M[E] = (v = M[E]) != null ? v : null, E++;
      M[E] = Ib(P);
      const I = Sb(P, o, i), L = (y = Mb(P)) != null ? y : {}, F = Eb(I);
      F && (L.numFmt = F), Object.keys(L).length && r.push({ row: p, col: E, patch: L });
      const N = (w = P.querySelector("img")) == null ? void 0 : w.getAttribute("src"), O = N && N.startsWith("data:") ? N : Tb(P);
      O && a.push({ row: p, col: E, dataUrl: O });
      const D = Math.max(1, parseInt(P.getAttribute("rowspan") || "1", 10) || 1), W = Math.max(1, parseInt(P.getAttribute("colspan") || "1", 10) || 1);
      if (D > 1 || W > 1) {
        l.push({ top: p, left: E, bottom: p + D - 1, right: E + W - 1 });
        for (let H = 0; H < D; H++)
          for (let V = 0; V < W; V++) (H || V) && u.add(`${p + H}:${E + V}`);
      }
      E += W;
    }
    p++;
  }
  if (!s.length) return null;
  const m = s.reduce((S, k) => Math.max(S, k.length), 0);
  for (const S of s) for (let k = 0; k < m; k++) S[k] === void 0 && (S[k] = null);
  return { values: s, styles: r, merges: l, images: a, colWidths: c, rowHeights: d };
}
async function Ab(n, e) {
  var i;
  const t = (i = globalThis.navigator) == null ? void 0 : i.clipboard;
  if (!t) return !1;
  const o = globalThis.ClipboardItem;
  return o && t.write && e != null ? (await t.write([
    new o({
      "text/plain": new Blob([n], { type: "text/plain" }),
      "text/html": new Blob([e], { type: "text/html" })
    })
  ]), !0) : t.writeText ? (await t.writeText(n), !0) : !1;
}
function Fb(n, e) {
  var l;
  if (typeof document == "undefined") return !1;
  const t = (a) => {
    const c = a.clipboardData;
    c && (c.setData("text/plain", n), e != null && c.setData("text/html", e), a.preventDefault());
  }, o = typeof window != "undefined" ? (l = window.getSelection) == null ? void 0 : l.call(window) : null, i = [];
  if (o) for (let a = 0; a < o.rangeCount; a++) i.push(o.getRangeAt(a));
  const s = document.createElement("textarea");
  s.value = n, s.setAttribute("readonly", ""), s.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;pointer-events:none;", document.body.appendChild(s);
  let r = !1;
  try {
    document.addEventListener("copy", t), s.focus(), s.select(), s.setSelectionRange(0, s.value.length), r = document.execCommand("copy");
  } catch (a) {
    r = !1;
  } finally {
    if (document.removeEventListener("copy", t), s.remove(), o && i.length) {
      o.removeAllRanges();
      for (const a of i) o.addRange(a);
    }
  }
  return r;
}
async function Ll(n, e) {
  try {
    if (await Ab(n, e)) return !0;
  } catch (t) {
  }
  return Fb(n, e);
}
const Ac = { png: "image/png", jpeg: "image/jpeg", webp: "image/webp" };
function Rb(n, e = "png", t = 0.92) {
  var i;
  const o = (i = Ac[e]) != null ? i : "image/png";
  return new Promise((s, r) => {
    n.toBlob(
      (l) => l ? s(l) : r(new Error("canvas.toBlob 返回空")),
      o,
      o === "image/png" ? void 0 : t
    );
  });
}
function Cv(n, e = "png", t = 0.92) {
  var i;
  const o = (i = Ac[e]) != null ? i : "image/png";
  return n.toDataURL(o, o === "image/png" ? void 0 : t);
}
function Jt(n, e) {
  const t = URL.createObjectURL(n), o = document.createElement("a");
  o.href = t, o.download = e, document.body.appendChild(o), o.click(), o.remove(), setTimeout(() => URL.revokeObjectURL(t), 4e3);
}
function Pl(n) {
  return new Promise((e, t) => {
    const o = new Image();
    o.crossOrigin = "anonymous", o.onload = () => e(o), o.onerror = () => t(new Error("图片加载失败: " + n)), o.src = n;
  });
}
const Nl = {
  a4: [210, 297],
  a3: [297, 420],
  letter: [215.9, 279.4]
};
function Bn(n = "a4", e = "portrait") {
  var s;
  const t = Array.isArray(n) ? n : (s = Nl[n]) != null ? s : Nl.a4, [o, i] = t;
  return e === "landscape" ? [Math.max(o, i), Math.min(o, i)] : [Math.min(o, i), Math.max(o, i)];
}
function Wn(n) {
  var e, t, o, i;
  return typeof n == "number" ? { top: n, right: n, bottom: n, left: n } : { top: (e = n == null ? void 0 : n.top) != null ? e : 10, right: (t = n == null ? void 0 : n.right) != null ? t : 10, bottom: (o = n == null ? void 0 : n.bottom) != null ? o : 10, left: (i = n == null ? void 0 : n.left) != null ? i : 10 };
}
const pt = 25.4 / 96;
class Lb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-lightbox", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("img");
    o.src = e.src, o.draggable = !1, o.style.cssText = "max-width:88vw;max-height:82vh;object-fit:contain;background:#fff;box-shadow:0 8px 40px rgba(0,0,0,.5);", t.appendChild(o);
    const i = document.createElement("div");
    i.style.cssText = "position:fixed;top:16px;right:20px;display:flex;gap:10px;";
    const s = Ol("⬇ 下载原图");
    s.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), this.download(e);
    });
    const r = Ol("✕ 关闭");
    r.addEventListener("mousedown", (a) => {
      a.preventDefault(), a.stopPropagation(), this.close();
    }), i.append(s, r), t.appendChild(i), t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.body.appendChild(t), this.el = t;
    const l = (a) => {
      a.key === "Escape" && this.close();
    };
    document.addEventListener("keydown", l, !0), this.cleanup = () => document.removeEventListener("keydown", l, !0);
  }
  async download(e) {
    var t;
    try {
      const o = await (await fetch(e.src)).blob(), i = (((t = e.mime) == null ? void 0 : t.split("/")[1]) || "png").replace("jpeg", "jpg").replace("svg+xml", "svg");
      Jt(o, e.fileName || `image.${i}`);
    } catch (o) {
    }
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Ol(n) {
  const e = document.createElement("button");
  return e.textContent = n, e.style.cssText = "padding:6px 12px;border:none;border-radius:6px;background:rgba(255,255,255,.92);color:#1f2329;font:13px/1.4 -apple-system,'Segoe UI',sans-serif;cursor:pointer;", e;
}
class Pb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "stage", null);
    T(this, "label", null);
    /** 拍平成「表名 + 页 canvas」序列,跨表连续翻页 */
    T(this, "flat", []);
    T(this, "idx", 0);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined" || (this.close(), this.flat = e.sheets.flatMap((h) => h.pages.map((p) => ({ sheetName: h.sheetName, canvas: p }))), !this.flat.length)) return;
    this.idx = 0;
    const t = document.createElement("div");
    t.className = "ooxml-print-preview", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.62);display:flex;flex-direction:column;";
    const o = document.createElement("div");
    o.style.cssText = "flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:9px 16px;background:#2b2f33;color:#fff;";
    const i = sn("🖨 打印");
    i.setAttribute("data-print", ""), i.addEventListener("click", () => e.onPrint());
    const s = sn("‹ 上一页"), r = sn("下一页 ›"), l = document.createElement("span");
    l.style.cssText = "font:13px/1.4 -apple-system,'Segoe UI',sans-serif;min-width:130px;text-align:center;opacity:.92", this.label = l, s.addEventListener("click", () => this.go(-1)), r.addEventListener("click", () => this.go(1));
    const a = document.createElement("div");
    a.style.flex = "1";
    const c = sn("✕ 关闭");
    c.setAttribute("data-close", ""), c.addEventListener("click", () => this.close()), o.append(i, s, l, r, a, c);
    const d = document.createElement("div");
    d.className = "ooxml-print-preview-stage", d.style.cssText = "flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:22px;", this.stage = d, t.append(o, d), document.body.appendChild(t), this.el = t, this.render();
    const u = (h) => {
      h.key === "Escape" ? this.close() : h.key === "ArrowRight" || h.key === "PageDown" ? (h.preventDefault(), this.go(1)) : (h.key === "ArrowLeft" || h.key === "PageUp") && (h.preventDefault(), this.go(-1));
    };
    document.addEventListener("keydown", u, !0), this.cleanup = () => document.removeEventListener("keydown", u, !0);
  }
  go(e) {
    this.idx = Math.max(0, Math.min(this.flat.length - 1, this.idx + e)), this.render();
  }
  render() {
    if (!this.stage) return;
    const e = this.flat[this.idx];
    this.stage.innerHTML = "", e.canvas.style.cssText = "max-width:100%;height:auto;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.4);", this.stage.appendChild(e.canvas), this.label && (this.label.textContent = `${e.sheetName} · 第 ${this.idx + 1} / ${this.flat.length} 页`);
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.stage = null, this.label = null, this.flat = [];
  }
  dispose() {
    this.close();
  }
}
function sn(n) {
  const e = document.createElement("button");
  return e.type = "button", e.textContent = n, e.style.cssText = "padding:6px 12px;border:none;border-radius:6px;background:rgba(255,255,255,.92);color:#1f2329;font:13px/1.4 -apple-system,'Segoe UI',sans-serif;cursor:pointer;", e;
}
const zl = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", As = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Nb = `${As};border:none;background:#217346;color:#fff`, Ob = `${As};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function xo(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class zb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o", null);
    T(this, "search", "");
    T(this, "activeCat", "common");
    T(this, "selected", "");
    T(this, "argVals", []);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s, r;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.search = "", this.selected = e.presetName && Xi.includes(e.presetName) ? e.presetName : "", this.activeCat = this.selected && (r = (s = Pt.find((l) => l.key !== "common" && l.fns.includes(this.selected))) == null ? void 0 : s.key) != null ? r : "common", this.argVals = [];
    const t = document.createElement("div");
    t.className = "ooxml-insertfn-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-insertfn-card", o.style.cssText = "width:640px;max-width:95vw;max-height:90vh;overflow:hidden;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;display:flex;flex-direction:column", o.innerHTML = this.template(), t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (l) => {
      l.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (l) => {
      l.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), this.wire(o), this.renderList(o), this.renderArgs(o);
  }
  template() {
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">插入函数</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="display:flex;flex:1;min-height:340px"><div style="flex:0 0 230px;border-right:1px solid #eef0f2;display:flex;flex-direction:column;padding:10px"><input data-search placeholder="搜索函数…" style="${zl};margin-bottom:8px"><div data-cats style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px"></div><div data-fnlist style="flex:1;overflow:auto;border:1px solid #eef0f2;border-radius:6px"></div></div><div data-argpanel style="flex:1;overflow:auto;padding:14px 16px"></div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Ob}">取消</button><button data-ok style="${Nb}">确定</button></div>`;
  }
  wire(e) {
    var o, i, s;
    (o = e.querySelector("[data-close]")) == null || o.addEventListener("click", () => this.close()), (i = e.querySelector("[data-cancel]")) == null || i.addEventListener("click", () => this.close()), (s = e.querySelector("[data-ok]")) == null || s.addEventListener("click", () => {
      var r;
      this.selected && ((r = this.o) == null || r.onInsert(this.assembled()), this.close());
    });
    const t = e.querySelector("[data-search]");
    t == null || t.addEventListener("input", () => {
      this.search = t.value.trim(), this.renderCats(e), this.renderList(e);
    }), this.renderCats(e);
  }
  renderCats(e) {
    const t = e.querySelector("[data-cats]");
    if (t) {
      if (this.search) {
        t.style.display = "none";
        return;
      }
      t.style.display = "flex", t.innerHTML = Pt.map(
        (o) => `<button data-cat="${o.key}" style="${As};height:24px;padding:0 8px;font-size:12px;border:1px solid ${o.key === this.activeCat ? "#217346" : "#e2e4e7"};background:${o.key === this.activeCat ? "#e2efe6" : "#fff"};color:${o.key === this.activeCat ? "#217346" : "#475467"}">${o.name}</button>`
      ).join(""), t.querySelectorAll("[data-cat]").forEach((o) => o.addEventListener("click", () => {
        this.activeCat = o.dataset.cat, this.renderCats(e), this.renderList(e);
      }));
    }
  }
  currentFns() {
    var e, t;
    return this.search ? Xi.filter((o) => o.includes(this.search.toUpperCase())) : (t = (e = Pt.find((o) => o.key === this.activeCat)) == null ? void 0 : e.fns) != null ? t : [];
  }
  renderList(e) {
    const t = e.querySelector("[data-fnlist]");
    if (!t) return;
    const o = this.currentFns();
    t.innerHTML = o.length ? o.map((i) => {
      const s = Ao(i), r = i === this.selected;
      return `<button data-fn="${i}" title="${xo(s.signature)}" style="display:block;width:100%;text-align:left;border:none;border-bottom:1px solid #f4f5f6;background:${r ? "#e2efe6" : "#fff"};cursor:pointer;padding:6px 10px;font:inherit"><b style="color:${r ? "#217346" : "#1f2329"}">${i}</b> <span style="color:#98a2b3;font-size:11px">${xo(s.signature.replace(i, "").replace(/^\(|\)$/g, ""))}</span></button>`;
    }).join("") : '<div style="padding:14px;color:#98a2b3">无匹配函数</div>', t.querySelectorAll("[data-fn]").forEach((i) => i.addEventListener("click", () => {
      this.selected = i.dataset.fn, this.argVals = [], this.renderList(e), this.renderArgs(e);
    }));
  }
  renderArgs(e) {
    const t = e.querySelector("[data-argpanel]");
    if (!t) return;
    if (!this.selected) {
      t.innerHTML = '<div style="color:#98a2b3;padding-top:40px;text-align:center">← 从左侧选择一个函数</div>';
      return;
    }
    const o = Ao(this.selected), i = [...o.args.map((s) => ({ label: s.label, optional: s.optional }))];
    o.variadic && (i.push({ label: "值", optional: !0 }), i.push({ label: "值", optional: !0 })), t.innerHTML = `<div style="font-size:15px;font-weight:600">${this.selected}</div><div style="color:#667085;font-size:12px;margin:2px 0 12px">${xo(o.signature)}</div>` + (i.length ? i.map(
      (s, r) => {
        var l;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="flex:0 0 92px;color:${s.optional ? "#98a2b3" : "#475467"};text-align:right">${xo(s.label)}${s.optional ? "(可选)" : ""}</span><input data-arg="${r}" value="${xo((l = this.argVals[r]) != null ? l : "")}" placeholder="值 / 单元格 / 区域(如 A1:A9)" style="${zl};flex:1"></div>`;
      }
    ).join("") : '<div style="color:#98a2b3;margin-bottom:12px">此函数无参数</div>') + '<div style="margin-top:14px;padding-top:12px;border-top:1px solid #eef0f2"><div style="display:flex;gap:8px"><span style="flex:0 0 92px;text-align:right;color:#475467">计算结果 =</span><span data-preview style="font-weight:600;color:#217346"></span></div><div style="display:flex;gap:8px;margin-top:6px"><span style="flex:0 0 92px;text-align:right;color:#98a2b3">公式</span><code data-formula style="color:#1f2329;word-break:break-all"></code></div></div>', t.querySelectorAll("[data-arg]").forEach((s) => s.addEventListener("input", () => {
      const r = Number(s.dataset.arg);
      this.argVals[r] = s.value, this.updatePreview(e);
    })), this.updatePreview(e);
  }
  /** 拼出的公式:非空参数按序用逗号连接。 */
  assembled() {
    const e = this.argVals.map((t) => (t != null ? t : "").trim()).filter((t) => t !== "");
    return `=${this.selected}(${e.join(",")})`;
  }
  updatePreview(e) {
    var s, r;
    const t = this.assembled(), o = e.querySelector("[data-formula]"), i = e.querySelector("[data-preview]");
    if (o && (o.textContent = t), i) {
      let l = "";
      try {
        l = (r = (s = this.o) == null ? void 0 : s.preview(t)) != null ? r : "";
      } catch (a) {
        l = "#ERROR";
      }
      i.textContent = l || "(填入参数后预览)";
    }
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.o = null, this.selected = "", this.argVals = [];
  }
  dispose() {
    this.close();
  }
}
const Rt = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", Fc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Hb = `${Fc};border:none;background:#217346;color:#fff`, Hl = `${Fc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Db = [["list", "列表"], ["whole", "整数"], ["decimal", "小数"], ["date", "日期"], ["time", "时间"], ["textLength", "文本长度"], ["custom", "自定义"]], Bb = [["between", "介于"], ["notBetween", "未介于"], ["equal", "等于"], ["notEqual", "不等于"], ["greaterThan", "大于"], ["lessThan", "小于"], ["greaterThanOrEqual", "大于或等于"], ["lessThanOrEqual", "小于或等于"]], Dl = (n) => n === "between" || n === "notBetween";
function Vt(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class Wb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o", null);
    T(this, "type", "list");
    T(this, "op", "between");
    T(this, "f1", "");
    T(this, "f2", "");
    T(this, "listSrc", "");
    T(this, "custom", "");
    T(this, "allowBlank", !0);
    T(this, "showErr", !0);
    T(this, "errStyle", "stop");
    T(this, "errMsg", "");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var r, l, a, c, d, u, h, p, m, b, v, y, w, S;
    if (typeof document == "undefined") return;
    this.close(), this.o = e;
    const t = e.current;
    this.type = (l = (r = e.presetType) != null ? r : t == null ? void 0 : t.type) != null ? l : "list", this.op = (a = t == null ? void 0 : t.operator) != null ? a : "between", this.f1 = t ? String((d = (c = t.formulae) == null ? void 0 : c[0]) != null ? d : "") : "", this.f2 = t ? String((h = (u = t.formulae) == null ? void 0 : u[1]) != null ? h : "") : "", this.listSrc = (t == null ? void 0 : t.type) === "list" ? ((p = t.options) != null ? p : []).join(",") : "", this.custom = (t == null ? void 0 : t.type) === "custom" ? String((b = (m = t.formulae) == null ? void 0 : m[0]) != null ? b : "") : "", this.allowBlank = (v = t == null ? void 0 : t.allowBlank) != null ? v : !0, this.showErr = (y = t == null ? void 0 : t.showErrorMessage) != null ? y : !0, this.errStyle = (w = t == null ? void 0 : t.errorStyle) != null ? w : "stop", this.errMsg = (S = t == null ? void 0 : t.error) != null ? S : "";
    const o = document.createElement("div");
    o.className = "ooxml-datavalid-mask", o.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const i = document.createElement("div");
    i.className = "ooxml-datavalid-card", i.style.cssText = "width:460px;max-width:94vw;max-height:90vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", o.appendChild(i), document.body.appendChild(o), this.el = o;
    const s = (k) => {
      k.key === "Escape" && this.close();
    };
    o.addEventListener("mousedown", (k) => {
      k.target === o && this.close();
    }), document.addEventListener("keydown", s, !0), this.cleanup = () => document.removeEventListener("keydown", s, !0), this.render(i);
  }
  render(e) {
    var r, l, a, c, d, u, h, p, m, b, v, y, w, S;
    const t = (k, C) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="flex:0 0 72px;color:#475467">${k}</span><div style="flex:1">${C}</div></div>`, o = (k, C, M) => `<select ${M} style="${Rt};width:100%">${C.map(([E, P]) => `<option value="${E}"${E === k ? " selected" : ""}>${P}</option>`).join("")}</select>`;
    let i = "";
    this.type === "list" ? i = t("来源", `<input data-list value="${Vt(this.listSrc)}" placeholder="逗号分隔:苹果,香蕉,橙子" style="${Rt};width:100%">`) : this.type === "custom" ? i = t("公式", `<input data-custom value="${Vt(this.custom)}" placeholder="=A1>0" style="${Rt};width:100%">`) : i = t("数据", o(this.op, Bb, "data-op")) + (Dl(this.op) ? t("最小值", `<input data-f1 value="${Vt(this.f1)}" style="${Rt};width:100%">`) + t("最大值", `<input data-f2 value="${Vt(this.f2)}" style="${Rt};width:100%">`) : t("值", `<input data-f1 value="${Vt(this.f1)}" style="${Rt};width:100%">`)), e.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">数据有效性</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + t("允许", o(this.type, Db, "data-type")) + i + `<label style="display:flex;align-items:center;gap:6px;margin:4px 0 12px;cursor:pointer"><input type="checkbox" data-blank${this.allowBlank ? " checked" : ""}> 允许空值</label><div style="border-top:1px solid #eef0f2;padding-top:10px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:8px;cursor:pointer"><input type="checkbox" data-showerr${this.showErr ? " checked" : ""}> 输入无效数据时显示出错警告</label>` + t("样式", o(this.errStyle, [["stop", "停止"], ["warning", "警告"], ["information", "信息"]], "data-errstyle")) + t("错误信息", `<input data-errmsg value="${Vt(this.errMsg)}" placeholder="(可选)" style="${Rt};width:100%">`) + `</div></div><div style="display:flex;justify-content:space-between;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-clear style="${Hl}">全部清除</button><div style="display:flex;gap:10px"><button data-cancel style="${Hl}">取消</button><button data-ok style="${Hb}">确定</button></div></div>`;
    const s = (k) => e.querySelector(k);
    (r = s("[data-type]")) == null || r.addEventListener("change", (k) => {
      this.type = k.target.value, this.render(e);
    }), (l = s("[data-op]")) == null || l.addEventListener("change", (k) => {
      this.op = k.target.value, this.render(e);
    }), (a = s("[data-f1]")) == null || a.addEventListener("input", (k) => {
      this.f1 = k.target.value;
    }), (c = s("[data-f2]")) == null || c.addEventListener("input", (k) => {
      this.f2 = k.target.value;
    }), (d = s("[data-list]")) == null || d.addEventListener("input", (k) => {
      this.listSrc = k.target.value;
    }), (u = s("[data-custom]")) == null || u.addEventListener("input", (k) => {
      this.custom = k.target.value;
    }), (h = s("[data-blank]")) == null || h.addEventListener("change", (k) => {
      this.allowBlank = k.target.checked;
    }), (p = s("[data-showerr]")) == null || p.addEventListener("change", (k) => {
      this.showErr = k.target.checked;
    }), (m = s("[data-errstyle]")) == null || m.addEventListener("change", (k) => {
      this.errStyle = k.target.value;
    }), (b = s("[data-errmsg]")) == null || b.addEventListener("input", (k) => {
      this.errMsg = k.target.value;
    }), (v = e.querySelector("[data-close]")) == null || v.addEventListener("click", () => this.close()), (y = e.querySelector("[data-cancel]")) == null || y.addEventListener("click", () => this.close()), (w = e.querySelector("[data-clear]")) == null || w.addEventListener("click", () => {
      var k;
      (k = this.o) == null || k.onApply(null), this.close();
    }), (S = e.querySelector("[data-ok]")) == null || S.addEventListener("click", () => {
      var k;
      (k = this.o) == null || k.onApply(this.buildRule()), this.close();
    });
  }
  buildRule() {
    const e = this.type === "list" ? this.listSrc.split(/[,，]/).map((o) => o.trim()).filter(Boolean) : void 0, t = this.type === "list" ? [] : this.type === "custom" ? [this.custom] : Dl(this.op) ? [this.f1, this.f2] : [this.f1];
    return {
      type: this.type,
      operator: this.type === "list" || this.type === "custom" ? void 0 : this.op,
      formulae: t,
      options: e,
      allowBlank: this.allowBlank,
      showErrorMessage: this.showErr,
      errorStyle: this.showErr ? this.errStyle : void 0,
      error: this.showErr && this.errMsg ? this.errMsg : void 0
    };
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null, this.o = null;
  }
  dispose() {
    this.close();
  }
}
const Rc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", qb = `${Rc};border:none;background:#217346;color:#fff`, Ub = `${Rc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`;
function _b(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class jb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s, r, l;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-removedup-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-removedup-card", o.style.cssText = "width:360px;max-width:92vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", o.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">删除重复项</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:10px;cursor:pointer"><input type="checkbox" data-header checked> 数据包含标题</label><div style="color:#475467;margin-bottom:6px">按下列列判断重复:</div><div style="border:1px solid #eef0f2;border-radius:6px;max-height:220px;overflow:auto;padding:4px">' + e.columns.map((a) => `<label style="display:flex;align-items:center;gap:6px;padding:5px 8px;cursor:pointer"><input type="checkbox" data-col="${a.index}" checked> ${_b(a.label)}</label>`).join("") + `</div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Ub}">取消</button><button data-ok style="${qb}">确定</button></div>`, t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (a) => {
      a.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), (s = o.querySelector("[data-close]")) == null || s.addEventListener("click", () => this.close()), (r = o.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = o.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      const a = o.querySelector("[data-header]").checked, c = Array.from(o.querySelectorAll("[data-col]")).filter((d) => d.checked).map((d) => Number(d.dataset.col));
      e.onApply(c, a), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Vb = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:5px;font:inherit;outline:none;box-sizing:border-box", Lc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Yb = `${Lc};border:none;background:#217346;color:#fff`, Gb = `${Lc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Xb = [["	", "制表符 Tab"], [",", "逗号"], [";", "分号"], [" ", "空格"]];
class Kb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s, r, l;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-t2c-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-t2c-card", o.style.cssText = "width:340px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.7 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", o.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">文本分列(按分隔符)</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="color:#475467;margin-bottom:8px">分隔符:</div>' + Xb.map(([a, c], d) => `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-bottom:4px"><input type="radio" name="dv-delim" data-delim="${a === "	" ? "TAB" : a === " " ? "SPACE" : a}"${d === 1 ? " checked" : ""}> ${c}</label>`).join("") + `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:2px"><input type="radio" name="dv-delim" data-delim="CUSTOM"> 其他 <input data-custom placeholder="自定义" maxlength="4" style="${Vb};width:70px"></label></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Gb}">取消</button><button data-ok style="${Yb}">确定</button></div>`, t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (a) => {
      a.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (a) => {
      a.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), (s = o.querySelector("[data-close]")) == null || s.addEventListener("click", () => this.close()), (r = o.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = o.querySelector("[data-ok]")) == null || l.addEventListener("click", () => {
      var u;
      const a = o.querySelector('[name="dv-delim"]:checked'), c = (u = a == null ? void 0 : a.dataset.delim) != null ? u : ",", d = c === "TAB" ? "	" : c === "SPACE" ? " " : c === "CUSTOM" ? o.querySelector("[data-custom]").value || "" : c;
      d && e.onApply(d), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Pc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Bl = `${Pc};border:none;background:#217346;color:#fff`, Wl = `${Pc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, zi = "width:100%;box-sizing:border-box;height:30px;padding:0 10px;border:1px solid #d0d5dd;border-radius:5px;font:inherit", ql = [
  { key: "selectLockedCells", label: "选定锁定单元格", def: !0 },
  { key: "selectUnlockedCells", label: "选定未锁定的单元格", def: !0 },
  { key: "formatCells", label: "设置单元格格式", def: !1 },
  { key: "formatColumns", label: "设置列格式", def: !1 },
  { key: "formatRows", label: "设置行格式", def: !1 },
  { key: "insertColumns", label: "插入列", def: !1 },
  { key: "insertRows", label: "插入行", def: !1 },
  { key: "deleteColumns", label: "删除列", def: !1 },
  { key: "deleteRows", label: "删除行", def: !1 },
  { key: "sort", label: "排序", def: !1 },
  { key: "autoFilter", label: "使用自动筛选", def: !1 }
];
class Jb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s, r, l, a;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.className = "ooxml-protectsheet-mask", t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.className = "ooxml-protectsheet-card", o.style.cssText = "width:360px;max-width:92vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", e.mode === "unprotect" ? o.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">撤销工作表保护</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + (e.hasPassword ? `<div style="margin-bottom:6px;color:#475467">密码:</div><input type="password" data-pwd style="${zi}" autofocus>` : '<div style="color:#475467">确定要撤销对该工作表的保护吗?</div>') + `</div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Wl}">取消</button><button data-ok style="${Bl}">确定</button></div>` : o.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">保护工作表</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="margin-bottom:6px;color:#475467">取消工作表保护时使用的密码(可选):</div><input type="password" data-pwd style="${zi};margin-bottom:8px" placeholder="密码" autofocus><input type="password" data-pwd2 style="${zi}" placeholder="再次输入密码"><div data-err style="color:#d92d20;min-height:16px;margin-top:4px;font-size:12px"></div><div style="margin:6px 0;color:#475467">允许此工作表的所有用户进行:</div><div style="border:1px solid #eef0f2;border-radius:6px;max-height:200px;overflow:auto;padding:4px">` + ql.map((c) => `<label style="display:flex;align-items:center;gap:6px;padding:4px 8px;cursor:pointer"><input type="checkbox" data-allow="${c.key}"${c.def ? " checked" : ""}> ${c.label}</label>`).join("") + `</div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Wl}">取消</button><button data-ok style="${Bl}">确定</button></div>`, t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (c) => {
      c.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (c) => {
      c.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), (s = o.querySelector("[data-close]")) == null || s.addEventListener("click", () => this.close()), (r = o.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = o.querySelector("[data-pwd]")) == null || l.focus(), (a = o.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      var h, p, m, b;
      if (e.mode === "unprotect") {
        const v = (p = (h = o.querySelector("[data-pwd]")) == null ? void 0 : h.value) != null ? p : "";
        (m = e.onUnprotect) == null || m.call(e, v), this.close();
        return;
      }
      const c = o.querySelector("[data-pwd]").value, d = o.querySelector("[data-pwd2]").value;
      if (c !== d) {
        const v = o.querySelector("[data-err]");
        v && (v.textContent = "两次输入的密码不一致。");
        return;
      }
      const u = {};
      for (const v of ql) {
        const y = o.querySelector(`[data-allow="${v.key}"]`);
        y != null && y.checked && (u[v.key] = !0);
      }
      (b = e.onApply) == null || b.call(e, { password: c, allow: u }), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Nc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Ul = `${Nc};border:none;background:#217346;color:#fff`, _l = `${Nc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, jl = "width:100%;box-sizing:border-box;height:30px;padding:0 10px;border:1px solid #d0d5dd;border-radius:5px;font:inherit";
class Zb {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s, r, l, a;
    if (typeof document == "undefined") return;
    this.close();
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.style.cssText = "width:340px;max-width:92vw;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", e.mode === "unprotect" ? o.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">撤销工作簿保护</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:14px 16px">' + (e.hasPassword ? `<div style="margin-bottom:6px;color:#475467">密码:</div><input type="password" data-pwd style="${jl}" autofocus>` : '<div style="color:#475467">确定要撤销对该工作簿的保护吗?</div>') + `</div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${_l}">取消</button><button data-ok style="${Ul}">确定</button></div>` : o.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">保护工作簿结构</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><label style="display:flex;align-items:center;gap:6px;margin-bottom:10px;cursor:pointer"><input type="checkbox" data-struct checked> 结构(禁止增删、移动、重命名工作表)</label><div style="margin-bottom:6px;color:#475467">密码(可选):</div><input type="password" data-pwd style="${jl}" placeholder="密码" autofocus></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${_l}">取消</button><button data-ok style="${Ul}">确定</button></div>`, t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = (c) => {
      c.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (c) => {
      c.target === t && this.close();
    }), document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0), (s = o.querySelector("[data-close]")) == null || s.addEventListener("click", () => this.close()), (r = o.querySelector("[data-cancel]")) == null || r.addEventListener("click", () => this.close()), (l = o.querySelector("[data-pwd]")) == null || l.focus(), (a = o.querySelector("[data-ok]")) == null || a.addEventListener("click", () => {
      var u, h, p, m;
      if (e.mode === "unprotect") {
        const b = (h = (u = o.querySelector("[data-pwd]")) == null ? void 0 : u.value) != null ? h : "";
        (p = e.onUnprotect) == null || p.call(e, b), this.close();
        return;
      }
      const c = o.querySelector("[data-struct]").checked, d = o.querySelector("[data-pwd]").value;
      (m = e.onApply) == null || m.call(e, { lockStructure: c, password: d }), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const Oc = "height:30px;padding:0 14px;border-radius:5px;cursor:pointer;font:inherit", Qb = `${Oc};border:none;background:#217346;color:#fff`, Vl = `${Oc};border:1px solid #d0d5dd;background:#fff;color:#1f2329`, Hi = "height:26px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box";
function Di(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class e0 {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "rows", []);
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var l, a, c, d;
    if (typeof document == "undefined") return;
    this.close(), this.rows = e.ranges.map((u) => R({}, u));
    const t = document.createElement("div");
    t.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;";
    const o = document.createElement("div");
    o.style.cssText = "width:440px;max-width:94vw;max-height:88vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:13px/1.6 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", o.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eef0f2"><strong style="font-size:14px">允许用户编辑区域</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 16px"><div style="color:#475467;margin-bottom:6px">工作表受保护时,可编辑的区域:</div><div data-list style="border:1px solid #eef0f2;border-radius:6px;min-height:80px;max-height:220px;overflow:auto"></div><div style="display:flex;gap:6px;align-items:center;margin-top:10px;flex-wrap:wrap"><input data-name style="${Hi};flex:1;min-width:80px" placeholder="标题"><input data-ref style="${Hi};width:110px" placeholder="引用 A1:C3" value="${Di(e.defaultRef)}"><input data-pwd type="password" style="${Hi};width:90px" placeholder="密码(可选)"><button data-add style="${Vl};height:26px">添加</button></div></div><div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 16px;border-top:1px solid #eef0f2"><button data-cancel style="${Vl}">取消</button><button data-ok style="${Qb}">确定</button></div>`, t.appendChild(o), document.body.appendChild(t), this.el = t;
    const i = o.querySelector("[data-list]"), s = () => {
      i.innerHTML = this.rows.length ? this.rows.map((u, h) => `<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid #f2f4f7"><span style="flex:1;font-weight:500">${Di(u.name || "区域")}</span><span style="color:#475467">${Di(u.ref)}</span>${u.password ? '<span title="有密码" style="color:#98a2b3">🔒</span>' : ""}<button data-del="${h}" style="border:none;background:none;color:#d92d20;cursor:pointer">删除</button></div>`).join("") : '<div style="padding:16px;text-align:center;color:#98a2b3">暂无区域</div>', i.querySelectorAll("[data-del]").forEach((u) => u.addEventListener("click", () => {
        this.rows.splice(Number(u.dataset.del), 1), s();
      }));
    };
    s();
    const r = (u) => {
      u.key === "Escape" && this.close();
    };
    t.addEventListener("mousedown", (u) => {
      u.target === t && this.close();
    }), document.addEventListener("keydown", r, !0), this.cleanup = () => document.removeEventListener("keydown", r, !0), (l = o.querySelector("[data-close]")) == null || l.addEventListener("click", () => this.close()), (a = o.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.close()), (c = o.querySelector("[data-add]")) == null || c.addEventListener("click", () => {
      const u = o.querySelector("[data-ref]").value.trim();
      if (!u) return;
      const h = o.querySelector("[data-name]").value.trim() || `区域${this.rows.length + 1}`, p = o.querySelector("[data-pwd]").value;
      this.rows.push(R({ name: h, ref: u }, p ? { password: p } : {})), o.querySelector("[data-name]").value = "", o.querySelector("[data-pwd]").value = "", s();
    }), (d = o.querySelector("[data-ok]")) == null || d.addEventListener("click", () => {
      e.onApply(this.rows.map((u) => R({}, u))), this.close();
    });
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Yl(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Gl(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
class t0 {
  constructor() {
    T(this, "el", null);
    T(this, "opts", null);
    T(this, "sig", "");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    if (typeof document == "undefined") return;
    this.close(!1), this.opts = e;
    const t = document.createElement("div");
    t.className = "ooxml-taskpane", t.style.cssText = "position:fixed;right:0;top:0;bottom:0;width:280px;z-index:9998;background:#f5f7fa;border-left:1px solid #cfd6df;box-shadow:-4px 0 16px rgba(15,23,42,.10);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;box-sizing:border-box;overflow:auto;", document.body.appendChild(t), this.el = t, this.sig = "", this.renderInto();
  }
  /** 重拉数据重渲(签名相同则跳过,避免每帧重排)。 */
  refresh() {
    this.el && this.renderInto();
  }
  renderInto() {
    var a;
    const e = this.el, t = this.opts;
    if (!e || !t) return;
    const o = t.getData(), i = JSON.stringify(o);
    if (i === this.sig) return;
    this.sig = i;
    const s = o.sheets.map((c, d) => `<div style="padding:5px 10px;border-radius:5px;${d === o.activeSheet ? "background:#217346;color:#fff;font-weight:600" : "color:#1f2329"}">${Yl(c)}</div>`).join(""), r = (c, d, u) => `<label style="display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer"><input type="checkbox" data-toggle="${c}"${u ? " checked" : ""}> ${d}</label>`, l = (c, d) => `<div style="display:flex;justify-content:space-between;padding:3px 0"><span style="color:#667085">${c}</span><span>${Yl(d)}</span></div>`;
    e.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #e4e9f0;background:#fff"><strong style="font-size:14px">任务窗格</strong><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#98a2b3">✕</button></div><div style="padding:12px 14px"><div style="font-weight:600;margin-bottom:6px;color:#344054">工作表</div><div style="display:flex;flex-direction:column;gap:2px;margin-bottom:14px">${s}</div><div style="font-weight:600;margin-bottom:6px;color:#344054">当前选区</div>` + l("区域", o.selectionRef) + l("计数", String(o.count)) + (o.numCount > 0 ? l("求和", Gl(o.sum)) + l("平均值", Gl(o.average)) : "") + '<div style="font-weight:600;margin:14px 0 4px;color:#344054">显示</div>' + r("formulaBar", "编辑栏", o.formulaBar) + r("headers", "行号列标", o.headers) + r("gridlines", "网格线", o.gridlines) + "</div>", (a = e.querySelector("[data-close]")) == null || a.addEventListener("click", () => this.close(!0)), e.querySelectorAll("[data-toggle]").forEach((c) => c.addEventListener("change", () => {
      t.onToggle(c.dataset.toggle);
    }));
  }
  close(e = !0) {
    var o, i;
    const t = this.el;
    (o = this.el) == null || o.remove(), this.el = null, t && e && ((i = this.opts) == null || i.onClose());
  }
  dispose() {
    this.close(!1), this.opts = null;
  }
}
const o0 = {
  eq: "等于",
  ne: "不等于",
  gt: "大于",
  ge: "大于或等于",
  lt: "小于",
  le: "小于或等于",
  between: "介于",
  notBetween: "不介于"
}, n0 = {
  eq: "等于",
  ne: "不等于",
  contains: "包含",
  notContains: "不包含",
  startsWith: "开头是",
  endsWith: "结尾是"
}, i0 = {
  eq: "等于",
  before: "早于",
  after: "晚于",
  between: "介于"
}, s0 = /^-?\d+(\.\d+)?$/;
function r0(n) {
  let e = 0, t = 0, o = 0;
  for (const i of n) {
    const s = i.trim();
    !s || s === "(空白)" || (o++, s0.test(s.replace(/,/g, "")) ? e++ : isNaN(Date.parse(s)) || t++);
  }
  return o ? e / o >= 0.6 ? "number" : t / o >= 0.6 ? "date" : "text" : "text";
}
function l0(n, e) {
  if (n.type === "aboveAvg" || n.type === "belowAvg") {
    if (!e.length) return { type: "number", op: n.type === "aboveAvg" ? "gt" : "lt", a: 0 };
    const t = e.reduce((o, i) => o + i, 0) / e.length;
    return { type: "number", op: n.type === "aboveAvg" ? "gt" : "lt", a: t };
  }
  if (n.type === "top10") {
    if (!e.length) return { type: "number", op: "ge", a: 0 };
    const t = [...e].sort((s, r) => r - s), o = n.percent ? Math.max(1, Math.ceil(n.n / 100 * t.length)) : Math.min(n.n, t.length);
    return n.bottom ? { type: "number", op: "le", a: t[t.length - o] } : { type: "number", op: "ge", a: t[o - 1] };
  }
  return n;
}
function a0(n, e) {
  switch (n.type) {
    case "number": {
      const t = e.num;
      if (t === null) return !1;
      const { op: o, a: i, b: s } = n;
      switch (o) {
        case "eq":
          return t === i;
        case "ne":
          return t !== i;
        case "gt":
          return t > i;
        case "ge":
          return t >= i;
        case "lt":
          return t < i;
        case "le":
          return t <= i;
        case "between":
          return s !== void 0 && t >= Math.min(i, s) && t <= Math.max(i, s);
        case "notBetween":
          return s !== void 0 && (t < Math.min(i, s) || t > Math.max(i, s));
      }
      return !0;
    }
    case "text": {
      const t = e.text.toLowerCase(), o = n.s.toLowerCase();
      switch (n.op) {
        case "eq":
          return t === o;
        case "ne":
          return t !== o;
        case "contains":
          return t.includes(o);
        case "notContains":
          return !t.includes(o);
        case "startsWith":
          return t.startsWith(o);
        case "endsWith":
          return t.endsWith(o);
      }
      return !0;
    }
    case "date": {
      const t = e.dateMs;
      if (t === null) return !1;
      const { op: o, a: i, b: s } = n;
      switch (o) {
        case "eq":
          return c0(t, i);
        case "before":
          return t < i;
        case "after":
          return t > i;
        case "between":
          return s !== void 0 && t >= Math.min(i, s) && t <= Math.max(i, s);
      }
      return !0;
    }
    // 动态类型理论上已被 resolveDynamicCondition 折算掉;兜底放行
    default:
      return !0;
  }
}
function c0(n, e) {
  const t = new Date(n), o = new Date(e);
  return t.getFullYear() === o.getFullYear() && t.getMonth() === o.getMonth() && t.getDate() === o.getDate();
}
const rn = "height:27px;padding:0 12px;border:1px solid #d0d3d6;border-radius:5px;background:#fff;cursor:pointer;font:inherit;font-size:12px;color:#444", Xl = "height:27px;padding:0 12px;border:1px solid #21a366;border-radius:5px;background:#21a366;color:#fff;cursor:pointer;font:inherit;font-size:12px", wt = "height:26px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box", Yt = `${wt};background:#fff;cursor:pointer`;
function Gt(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
function Bi(n, e) {
  return Object.entries(n).map(([t, o]) => `<option value="${t}"${t === e ? " selected" : ""}>${o}</option>`).join("");
}
function Kl(n) {
  const e = new Date(n), t = (o) => String(o).padStart(2, "0");
  return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`;
}
class d0 {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "checked", /* @__PURE__ */ new Set());
    T(this, "search", "");
    T(this, "tab", "values");
    T(this, "o");
  }
  isOpen() {
    return this.el !== null;
  }
  show(e) {
    var s;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.checked = new Set(e.selected.length ? e.selected : e.values), this.search = "", this.tab = (s = e.initialTab) != null ? s : e.condActive ? "condition" : "values";
    const t = document.createElement("div");
    t.className = "ooxml-filterpop", t.style.cssText = `position:fixed;left:${e.x}px;top:${e.y}px;z-index:10000;width:270px;max-width:92vw;background:#fff;border:1px solid #cfd3d7;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.22);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329;display:flex;flex-direction:column`, document.body.appendChild(t), this.el = t, this.render();
    const o = (r) => {
      r.key === "Escape" && this.emitClose();
    }, i = (r) => {
      this.el && !this.el.contains(r.target) && this.emitClose();
    };
    setTimeout(() => document.addEventListener("mousedown", i), 0), document.addEventListener("keydown", o, !0), this.cleanup = () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("keydown", o, !0);
    };
  }
  condLabel() {
    return this.o.colType === "number" ? "数字筛选" : this.o.colType === "date" ? "日期筛选" : "文本筛选";
  }
  render() {
    var s;
    const e = this.el;
    if (!e) return;
    const t = this.o, o = (r, l) => `<button data-tab="${r}" style="border:none;background:none;padding:8px 10px;cursor:pointer;font:inherit;border-bottom:2px solid ${this.tab === r ? "#21a366" : "transparent"};color:${this.tab === r ? "#1b7a4d" : "#475467"};font-weight:${this.tab === r ? 600 : 400}">${l}</button>`;
    e.innerHTML = `<div style="display:flex;align-items:center;border-bottom:1px solid #eef0f2;padding:0 4px">${o("values", "按内容")}${o("condition", this.condLabel())}<span style="flex:1"></span><button data-clear style="border:none;background:none;color:#1a73e8;cursor:pointer;font:inherit;padding:8px 8px">清除筛选</button></div><div style="display:flex;gap:6px;padding:8px 8px 0"><button data-sort="asc" style="${rn};flex:1${t.sortDir === "asc" ? ";background:#d6e9d9;border-color:#21a366;color:#1b7a4d;font-weight:600" : ""}">↑ 升序</button><button data-sort="desc" style="${rn};flex:1${t.sortDir === "desc" ? ";background:#d6e9d9;border-color:#21a366;color:#1b7a4d;font-weight:600" : ""}">↓ 降序</button></div><div data-body style="padding:8px"></div>`;
    const i = e.querySelector("[data-body]");
    this.tab === "values" ? this.renderValues(i) : this.renderCondition(i), e.querySelectorAll("[data-tab]").forEach((r) => r.addEventListener("click", () => {
      this.tab = r.dataset.tab, this.render();
    })), e.querySelectorAll("[data-sort]").forEach((r) => r.addEventListener("click", () => {
      t.onSort(r.dataset.sort), this.close();
    })), (s = e.querySelector("[data-clear]")) == null || s.addEventListener("click", () => {
      t.onClear(), this.close();
    });
  }
  // ---- 按内容(值复选)----
  renderValues(e) {
    var a, c;
    e.innerHTML = `<input data-search style="${wt};width:100%;margin-bottom:6px" placeholder="搜索…" value="${Gt(this.search)}"><label style="display:flex;align-items:center;gap:6px;font-weight:600;padding:2px"><input type="checkbox" data-all> <span data-all-label>(全选)</span></label><div data-list style="max-height:220px;overflow:auto;border:1px solid #eceef0;border-radius:4px;padding:2px;margin:4px 0"></div><div style="display:flex;justify-content:flex-end;gap:8px"><button data-cancel style="${rn}">取消</button><button data-ok style="${Xl}">确定</button></div>`;
    const t = e.querySelector("[data-search]"), o = e.querySelector("[data-all]"), i = e.querySelector("[data-all-label]"), s = e.querySelector("[data-list]");
    let r = [];
    const l = () => {
      const d = this.search.trim().toLowerCase(), u = d.length > 0;
      r = u ? this.o.values.filter((h) => h.toLowerCase().includes(d)) : this.o.values, o.checked = r.length > 0 && r.every((h) => this.checked.has(h)), i.textContent = u ? "(全选搜索结果)" : "(全选)", s.innerHTML = r.length ? r.map((h) => `<label style="display:flex;align-items:center;gap:6px;padding:3px 4px;border-radius:3px;cursor:pointer;min-width:max-content;white-space:nowrap"><input type="checkbox" data-v="${Gt(h)}" ${this.checked.has(h) ? "checked" : ""}><span>${Gt(h)}</span></label>`).join("") : '<div style="color:#aaa;text-align:center;padding:10px">无匹配值</div>', s.querySelectorAll("[data-v]").forEach((h) => h.addEventListener("change", (p) => {
        const m = h.dataset.v;
        p.target.checked ? this.checked.add(m) : this.checked.delete(m), o.checked = r.length > 0 && r.every((b) => this.checked.has(b));
      }));
    };
    t.addEventListener("input", () => {
      this.search = t.value, l();
    }), o.addEventListener("change", (d) => {
      const u = d.target.checked;
      for (const h of r) u ? this.checked.add(h) : this.checked.delete(h);
      l();
    }), l(), (a = e.querySelector("[data-cancel]")) == null || a.addEventListener("click", () => this.emitClose()), (c = e.querySelector("[data-ok]")) == null || c.addEventListener("click", () => {
      const d = r.filter((u) => this.checked.has(u));
      this.o.onApplyValues(d), this.close();
    });
  }
  // ---- 条件筛选(数字/文本/日期)----
  renderCondition(e) {
    var i, s;
    const t = this.o.currentCond, o = `<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px"><button data-cancel style="${rn}">取消</button><button data-ok style="${Xl}">确定</button></div>`;
    if (this.o.colType === "text") {
      const r = (t == null ? void 0 : t.type) === "text" ? t.op : "contains", l = (t == null ? void 0 : t.type) === "text" ? t.s : "";
      e.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><select data-op style="${Yt};flex:0 0 110px">${Bi(n0, r)}</select><input data-s style="${wt};flex:1" value="${Gt(l)}" placeholder="值"></div>` + o;
    } else if (this.o.colType === "date") {
      const r = (t == null ? void 0 : t.type) === "date" ? t.op : "before", l = (t == null ? void 0 : t.type) === "date" ? Kl(t.a) : "", a = (t == null ? void 0 : t.type) === "date" && t.b !== void 0 ? Kl(t.b) : "";
      e.innerHTML = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><select data-op style="${Yt};flex:0 0 90px">${Bi(i0, r)}</select><input type="date" data-a style="${wt};flex:1" value="${l}"></div><div data-brow style="display:${r === "between" ? "flex" : "none"};gap:8px;align-items:center"><span style="flex:0 0 90px;text-align:center;color:#667085">到</span><input type="date" data-b style="${wt};flex:1" value="${a}"></div>` + o;
      const c = e.querySelector("[data-op]");
      c.addEventListener("change", () => {
        e.querySelector("[data-brow]").style.display = c.value === "between" ? "flex" : "none";
      });
    } else {
      const r = (t == null ? void 0 : t.type) === "top10" ? "top10" : (t == null ? void 0 : t.type) === "aboveAvg" ? "aboveAvg" : (t == null ? void 0 : t.type) === "belowAvg" ? "belowAvg" : "op", l = (t == null ? void 0 : t.type) === "number" ? t.op : "gt", a = (t == null ? void 0 : t.type) === "number" ? String(t.a) : "", c = (t == null ? void 0 : t.type) === "number" && t.b !== void 0 ? String(t.b) : "", d = (t == null ? void 0 : t.type) === "top10" ? t : { bottom: !1, percent: !1, n: 10 };
      e.innerHTML = `<select data-mode style="${Yt};width:100%;margin-bottom:8px"><option value="op"${r === "op" ? " selected" : ""}>按运算符</option><option value="top10"${r === "top10" ? " selected" : ""}>前十项</option><option value="aboveAvg"${r === "aboveAvg" ? " selected" : ""}>高于平均值</option><option value="belowAvg"${r === "belowAvg" ? " selected" : ""}>低于平均值</option></select><div data-op-form style="display:${r === "op" ? "block" : "none"}"><div style="display:flex;gap:8px;align-items:center"><select data-op style="${Yt};flex:0 0 110px">${Bi(o0, l)}</select><input data-a type="number" style="${wt};flex:1" value="${Gt(a)}"></div><div data-brow style="display:${l === "between" || l === "notBetween" ? "flex" : "none"};gap:8px;align-items:center;margin-top:8px"><span style="flex:0 0 110px;text-align:center;color:#667085">与</span><input data-b type="number" style="${wt};flex:1" value="${Gt(c)}"></div></div><div data-top-form style="display:${r === "top10" ? "flex" : "none"};gap:8px;align-items:center"><select data-bottom style="${Yt};flex:0 0 70px"><option value="0"${d.bottom ? "" : " selected"}>最大</option><option value="1"${d.bottom ? " selected" : ""}>最小</option></select><input data-n type="number" min="1" style="${wt};flex:1" value="${d.n}"><select data-percent style="${Yt};flex:0 0 76px"><option value="0"${d.percent ? "" : " selected"}>项</option><option value="1"${d.percent ? " selected" : ""}>百分比</option></select></div>` + o;
      const u = e.querySelector("[data-mode]");
      u.addEventListener("change", () => {
        e.querySelector("[data-op-form]").style.display = u.value === "op" ? "block" : "none", e.querySelector("[data-top-form]").style.display = u.value === "top10" ? "flex" : "none";
      });
      const h = e.querySelector("[data-op]");
      h.addEventListener("change", () => {
        e.querySelector("[data-brow]").style.display = h.value === "between" || h.value === "notBetween" ? "flex" : "none";
      });
    }
    (i = e.querySelector("[data-cancel]")) == null || i.addEventListener("click", () => this.emitClose()), (s = e.querySelector("[data-ok]")) == null || s.addEventListener("click", () => {
      const r = this.collectCondition(e);
      r && (this.o.onApplyCondition(r), this.close());
    });
  }
  collectCondition(e) {
    const t = (r) => {
      var l, a;
      return (a = (l = e.querySelector(r)) == null ? void 0 : l.value) != null ? a : "";
    };
    if (this.o.colType === "text") {
      const r = t("[data-s]");
      return r ? { type: "text", op: t("[data-op]"), s: r } : null;
    }
    if (this.o.colType === "date") {
      const r = t("[data-op]"), l = Date.parse(t("[data-a]"));
      if (isNaN(l)) return null;
      if (r === "between") {
        const a = Date.parse(t("[data-b]"));
        return isNaN(a) ? null : { type: "date", op: r, a: l, b: a };
      }
      return { type: "date", op: r, a: l };
    }
    const o = t("[data-mode]");
    if (o === "aboveAvg") return { type: "aboveAvg" };
    if (o === "belowAvg") return { type: "belowAvg" };
    if (o === "top10") {
      const r = Number(t("[data-n]"));
      return !Number.isFinite(r) || r <= 0 ? null : { type: "top10", bottom: t("[data-bottom]") === "1", percent: t("[data-percent]") === "1", n: r };
    }
    const i = t("[data-op]"), s = Number(t("[data-a]"));
    if (!Number.isFinite(s)) return null;
    if (i === "between" || i === "notBetween") {
      const r = Number(t("[data-b]"));
      return Number.isFinite(r) ? { type: "number", op: i, a: s, b: r } : null;
    }
    return { type: "number", op: i, a: s };
  }
  emitClose() {
    var t;
    const e = (t = this.o) == null ? void 0 : t.onClose;
    this.close(), e == null || e();
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
function Jl(n) {
  return /[.*+?^${}()|[\]\\]/.test(n) ? "\\" + n : n;
}
function u0(n) {
  let e = "";
  for (let t = 0; t < n.length; t++) {
    const o = n[t];
    if (o === "~" && t + 1 < n.length && (n[t + 1] === "*" || n[t + 1] === "?" || n[t + 1] === "~")) {
      e += Jl(n[++t]);
      continue;
    }
    if (o === "*") {
      e += ".*";
      continue;
    }
    if (o === "?") {
      e += ".";
      continue;
    }
    e += Jl(o);
  }
  return e;
}
function zc(n) {
  if (!n.query) return null;
  const e = n.matchCase ? "" : "i";
  if (n.wildcard) {
    const o = u0(n.query), i = new RegExp(n.wholeCell ? `^${o}$` : o, e);
    return (s) => i.test(s);
  }
  const t = n.matchCase ? n.query : n.query.toLowerCase();
  return n.wholeCell ? (o) => (n.matchCase ? o : o.toLowerCase()) === t : (o) => (n.matchCase ? o : o.toLowerCase()).includes(t);
}
function h0(n, e, t, o) {
  var i;
  return t === "comment" ? (i = e.comment) != null ? i : "" : t === "formula" && e.type === "formula" && e.formula ? "=" + e.formula : De(n, e.row, e.col, o);
}
function f0(n, e) {
  n.sort(
    (t, o) => t.sheet - o.sheet || (e === "col" ? t.col - o.col || t.row - o.row : t.row - o.row || t.col - o.col)
  );
}
function Zl(n, e, t) {
  var l;
  const o = zc(t);
  if (!o) return [];
  const i = (l = n.date1904) != null ? l : !1, s = t.scope === "workbook" ? n.sheets.map((a, c) => c) : [e], r = [];
  for (const a of s) {
    const c = n.sheets[a];
    if (c)
      for (const d of c.cells.values()) {
        if (d.type === "empty") continue;
        const u = h0(c, d, t.lookIn, i);
        u && o(u) && r.push({ sheet: a, row: d.row, col: d.col, value: De(c, d.row, d.col, i) });
      }
  }
  return f0(r, t.direction), r;
}
const ln = "height:28px;padding:0 12px;border:1px solid #d0d3d6;border-radius:5px;background:#fff;cursor:pointer;font:inherit;font-size:12px;color:#444", p0 = "height:28px;padding:0 12px;border:1px solid #21a366;border-radius:5px;background:#21a366;color:#fff;cursor:pointer;font:inherit;font-size:12px", cs = "height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:4px;font:inherit;box-sizing:border-box", Wi = `${cs};background:#fff;cursor:pointer`;
function g0(n) {
  let e = "", t = n;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
function wo(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
class m0 {
  constructor() {
    T(this, "el", null);
    T(this, "cleanup", null);
    T(this, "o");
    T(this, "tab", "find");
    // 持久 DOM 引用(避免整体重渲丢焦点)
    T(this, "qInput");
    T(this, "rInput");
    T(this, "replaceRow");
    T(this, "replaceBtns");
    T(this, "countEl");
    T(this, "tabFindBtn");
    T(this, "tabRepBtn");
    T(this, "resultsWrap");
  }
  isOpen() {
    return this.el !== null;
  }
  open(e) {
    var s;
    if (typeof document == "undefined") return;
    this.close(), this.o = e, this.tab = (s = e.initialTab) != null ? s : "find";
    const t = e.getState(), o = document.createElement("div");
    o.className = "ooxml-finddlg", o.style.cssText = "position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:10000;width:396px;max-width:96vw;background:#fff;border:1px solid #cfd3d7;border-radius:8px;box-shadow:0 10px 34px rgba(0,0,0,.24);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;color:#1f2329", o.innerHTML = this.template(t), document.body.appendChild(o), this.el = o, this.bind();
    const i = (r) => {
      var l;
      r.key === "Escape" && ((l = this.el) != null && l.contains(document.activeElement)) && this.emitClose();
    };
    document.addEventListener("keydown", i, !0), this.cleanup = () => document.removeEventListener("keydown", i, !0);
  }
  template(e) {
    const t = this.o.editable, o = (s, r, l) => `<button data-tab="${s}" style="border:none;background:none;padding:7px 14px;cursor:pointer;font:inherit;border-bottom:2px solid ${l ? "#21a366" : "transparent"};color:${l ? "#1b7a4d" : "#475467"};font-weight:${l ? 600 : 400}">${r}</button>`, i = (s, r, l) => `<option value="${s}"${s === l ? " selected" : ""}>${r}</option>`;
    return (
      // 标题栏(可拖动)
      `<div data-drag style="display:flex;align-items:center;padding:8px 10px;cursor:move;border-bottom:1px solid #eef0f2"><span style="font-weight:600">查找和替换</span><span style="flex:1"></span><button data-close style="border:none;background:none;font-size:16px;cursor:pointer;color:#667085;line-height:1">×</button></div><div style="display:flex;border-bottom:1px solid #eef0f2;padding:0 6px">${o("find", "查找", this.tab === "find")}${t ? o("replace", "替换", this.tab === "replace") : ""}</div><div style="padding:10px 12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><label style="flex:0 0 64px;color:#475467">查找内容</label><input data-q style="${cs};flex:1" value="${wo(e.query)}" placeholder="输入查找内容"></div><div data-rep-row style="display:${this.tab === "replace" ? "flex" : "none"};align-items:center;gap:8px;margin-bottom:8px"><label style="flex:0 0 64px;color:#475467">替换为</label><input data-r style="${cs};flex:1" value="${wo(e.replace)}" placeholder="输入替换内容"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:6px 0"><label style="display:flex;align-items:center;gap:6px;color:#475467">范围<select data-scope style="${Wi};flex:1">${i("sheet", "工作表", e.scope)}${i("workbook", "工作簿", e.scope)}</select></label><label style="display:flex;align-items:center;gap:6px;color:#475467">搜索<select data-dir style="${Wi};flex:1">${i("row", "按行", e.direction)}${i("col", "按列", e.direction)}</select></label><label style="display:flex;align-items:center;gap:6px;color:#475467">查找范围<select data-lookin style="${Wi};flex:1">${i("value", "值", e.lookIn)}${i("formula", "公式", e.lookIn)}${i("comment", "批注", e.lookIn)}</select></label><span></span></div><div style="display:flex;gap:14px;flex-wrap:wrap;margin:4px 0 8px"><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-case ${e.matchCase ? "checked" : ""}>区分大小写</label><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-whole ${e.wholeCell ? "checked" : ""}>单元格匹配</label><label style="display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox" data-wild ${e.wildcard ? "checked" : ""}>通配符</label></div><div data-count style="min-height:18px;color:#667085;font-size:12px;margin-bottom:6px">${this.countText(e)}</div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"><button data-findall style="${ln}">全部查找</button><button data-prev style="${ln}">查找上一个</button><button data-next style="${p0}">查找下一个</button><span data-rep-btns style="display:${this.tab === "replace" ? "contents" : "none"}"><button data-repone style="${ln}">替换</button><button data-repall style="${ln}">全部替换</button></span></div><div data-results style="display:none;margin-top:10px;border:1px solid #eceef0;border-radius:5px;overflow:hidden"></div></div>`
    );
  }
  countText(e) {
    return e.query ? e.count === 0 ? "无结果" : `第 ${e.index + 1} 个,共 ${e.count} 个` : "";
  }
  bind() {
    var o, i, s, r;
    const e = this.el, t = (l) => e.querySelector(l);
    this.qInput = t("[data-q]"), this.rInput = t("[data-r]"), this.replaceRow = t("[data-rep-row]"), this.replaceBtns = t("[data-rep-btns]"), this.countEl = t("[data-count]"), this.resultsWrap = t("[data-results]"), this.tabFindBtn = t('[data-tab="find"]'), this.tabRepBtn = e.querySelector('[data-tab="replace"]'), this.qInput.addEventListener("input", () => this.o.onQuery(this.qInput.value)), this.qInput.addEventListener("keydown", (l) => {
      l.key === "Enter" && (l.preventDefault(), l.shiftKey ? this.o.onFindPrev() : this.o.onFindNext());
    }), (o = this.rInput) == null || o.addEventListener("input", () => this.o.onReplace(this.rInput.value)), (i = this.rInput) == null || i.addEventListener("keydown", (l) => {
      l.key === "Enter" && (l.preventDefault(), this.o.onReplaceOne());
    }), t("[data-scope]").addEventListener("change", (l) => this.o.onScope(l.target.value)), t("[data-dir]").addEventListener("change", (l) => this.o.onDirection(l.target.value)), t("[data-lookin]").addEventListener("change", (l) => {
      this.o.onLookIn(l.target.value), this.syncReplaceEnabled();
    }), t("[data-case]").addEventListener("change", (l) => this.o.onMatchCase(l.target.checked)), t("[data-whole]").addEventListener("change", (l) => this.o.onWholeCell(l.target.checked)), t("[data-wild]").addEventListener("change", (l) => this.o.onWildcard(l.target.checked)), t("[data-findall]").addEventListener("click", () => this.renderResults(this.o.onFindAll())), t("[data-prev]").addEventListener("click", () => this.o.onFindPrev()), t("[data-next]").addEventListener("click", () => this.o.onFindNext()), (s = e.querySelector("[data-repone]")) == null || s.addEventListener("click", () => this.o.onReplaceOne()), (r = e.querySelector("[data-repall]")) == null || r.addEventListener("click", () => {
      this.o.onReplaceAll(), this.refresh();
    }), t("[data-close]").addEventListener("click", () => this.emitClose()), e.querySelectorAll("[data-tab]").forEach((l) => l.addEventListener("click", () => this.switchTab(l.dataset.tab))), this.enableDrag(t("[data-drag]")), this.syncReplaceEnabled(), setTimeout(() => {
      var l;
      return (l = this.qInput) == null ? void 0 : l.focus();
    }, 0);
  }
  switchTab(e) {
    if (!this.o.editable && e === "replace") return;
    this.tab = e;
    const t = (o, i) => {
      o && (o.style.borderBottom = `2px solid ${i ? "#21a366" : "transparent"}`, o.style.color = i ? "#1b7a4d" : "#475467", o.style.fontWeight = i ? "600" : "400");
    };
    t(this.tabFindBtn, e === "find"), t(this.tabRepBtn, e === "replace"), this.replaceRow && (this.replaceRow.style.display = e === "replace" ? "flex" : "none"), this.replaceBtns && (this.replaceBtns.style.display = e === "replace" ? "contents" : "none");
  }
  /** 批注 lookIn 只查不替:禁用替换按钮。 */
  syncReplaceEnabled() {
    var o;
    const t = this.o.getState().lookIn === "comment";
    (o = this.replaceBtns) == null || o.querySelectorAll("button").forEach((i) => {
      i.disabled = t, i.style.opacity = t ? "0.5" : "1", i.title = t ? "批注仅支持查找,不支持替换" : "";
    });
  }
  /** 计数/状态刷新(控制器 onFindChange 时调)。不重建 DOM,不丢焦点。 */
  refresh() {
    if (!this.el) return;
    const e = this.o.getState();
    this.countEl && (this.countEl.textContent = this.countText(e)), this.resultsWrap && this.resultsWrap.style.display !== "none" && this.renderResults(this.o.onFindAll());
  }
  renderResults(e) {
    const t = this.resultsWrap;
    if (!t) return;
    if (t.style.display = "block", !e.length) {
      t.innerHTML = '<div style="padding:10px;text-align:center;color:#98a2b3;font-size:12px">无匹配结果</div>';
      return;
    }
    const o = '<div style="display:grid;grid-template-columns:1fr 78px 1.4fr;background:#f6f7f9;font-size:12px;color:#667085;font-weight:600;border-bottom:1px solid #eceef0"><span style="padding:5px 8px">工作表</span><span style="padding:5px 8px">单元格</span><span style="padding:5px 8px">值</span></div>', i = e.map(
      (s, r) => `<div data-gi="${r}" style="display:grid;grid-template-columns:1fr 78px 1.4fr;font-size:12px;cursor:pointer;border-bottom:1px solid #f2f3f5"><span style="padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${wo(s.sheetName)}</span><span style="padding:5px 8px;color:#475467">${g0(s.col)}${s.row + 1}</span><span style="padding:5px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${wo(s.value)}">${wo(s.value)}</span></div>`
    ).join("");
    t.innerHTML = o + `<div style="max-height:180px;overflow:auto">${i}</div>`, t.querySelectorAll("[data-gi]").forEach((s) => {
      s.addEventListener("mouseenter", () => s.style.background = "#eef7f1"), s.addEventListener("mouseleave", () => s.style.background = ""), s.addEventListener("click", () => this.o.onGotoResult(Number(s.dataset.gi)));
    });
  }
  enableDrag(e) {
    let t = 0, o = 0, i = 0, s = 0, r = !1;
    const l = (c) => {
      !r || !this.el || (this.el.style.left = i + (c.clientX - t) + "px", this.el.style.top = s + (c.clientY - o) + "px", this.el.style.transform = "none");
    }, a = () => {
      r = !1, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", a);
    };
    e.addEventListener("mousedown", (c) => {
      if (c.target.dataset.close !== void 0) return;
      const d = this.el.getBoundingClientRect();
      i = d.left, s = d.top, t = c.clientX, o = c.clientY, r = !0, this.el.style.transform = "none", this.el.style.left = d.left + "px", this.el.style.top = d.top + "px", document.addEventListener("mousemove", l), document.addEventListener("mouseup", a);
    });
  }
  emitClose() {
    var t;
    const e = (t = this.o) == null ? void 0 : t.onClose;
    this.close(), e == null || e();
  }
  close() {
    var e, t;
    (e = this.cleanup) == null || e.call(this), this.cleanup = null, (t = this.el) == null || t.remove(), this.el = null;
  }
  dispose() {
    this.close();
  }
}
const eo = 1.18, dt = 3;
function Xe(n, e = 1) {
  const t = n.italic ? "italic " : "", o = n.bold ? "bold " : "", i = Math.max(1, n.size * e * (96 / 72));
  return `${t}${o}${i.toFixed(1)}px ${b0(n.name)}, sans-serif`;
}
function b0(n) {
  return /\s/.test(n) ? `"${n}"` : n;
}
const qi = /* @__PURE__ */ new Map();
function In(n, e, t) {
  const o = t + "\0" + e, i = qi.get(o);
  if (i !== void 0) return i;
  n.font = t;
  const s = n.measureText(e).width;
  return qi.size < 2e4 && qi.set(o, s), s;
}
function Ui(n, e) {
  return n === "general" ? e ? "right" : "left" : n;
}
function $n(n, e, t, o) {
  const i = e.split(`
`);
  if (o <= 0) return i;
  const s = [];
  for (const r of i) {
    let l = "";
    for (const a of r) {
      const c = l + a;
      In(n, c, t) > o && l ? (s.push(l), l = a) : l = c;
    }
    s.push(l);
  }
  return s;
}
function y0(n, e, t, o) {
  const i = In(n, e, t);
  return i <= o || i === 0 ? 1 : Math.max(0.3, o / i);
}
class v0 {
  // 当前 token 在 value 中的起始下标
  constructor(e, t = Xi) {
    T(this, "box", null);
    T(this, "items", []);
    T(this, "active", 0);
    T(this, "tokenStart", 0);
    this.ta = e, this.names = t;
  }
  /** 输入变化后调用:重算建议并显示/隐藏。 */
  update() {
    const e = this.currentToken();
    if (!e) return this.close();
    const t = e.text.toUpperCase(), o = this.names.filter((i) => i.startsWith(t));
    if (!o.length || o.length === 1 && o[0] === t) return this.close();
    this.tokenStart = e.start, this.items = o.slice(0, 8), this.active = 0, this.render();
  }
  isOpen() {
    return !!this.box;
  }
  /** 列表打开时拦截导航键;返回 true = 已处理(编辑器应跳过自己的处理)。 */
  onKeyDown(e) {
    return this.box ? e.key === "ArrowDown" ? (this.active = (this.active + 1) % this.items.length, this.render(), !0) : e.key === "ArrowUp" ? (this.active = (this.active - 1 + this.items.length) % this.items.length, this.render(), !0) : e.key === "Enter" || e.key === "Tab" ? (this.accept(this.items[this.active]), !0) : e.key === "Escape" ? (this.close(), !0) : !1 : !1;
  }
  close() {
    var e;
    (e = this.box) == null || e.remove(), this.box = null;
  }
  dispose() {
    this.close();
  }
  // ---------------- 内部 ----------------
  /** 光标前的"函数名 token":公式串里,光标紧邻一段字母,且其前是可起函数的位置(= ( , 运算符 空白 起始)。 */
  currentToken() {
    var s;
    const e = this.ta.value;
    if (e[0] !== "=") return null;
    const t = (s = this.ta.selectionStart) != null ? s : e.length;
    let o = t;
    for (; o > 0 && /[A-Za-z]/.test(e[o - 1]); ) o--;
    if (o === t) return null;
    const i = o > 0 ? e[o - 1] : "=";
    return !"=(,+-*/^&<>% ".includes(i) && o !== 1 ? null : { text: e.slice(o, t), start: o };
  }
  accept(e) {
    var r;
    const t = this.ta.value, o = (r = this.ta.selectionStart) != null ? r : t.length, i = t.slice(0, this.tokenStart) + e + "(" + t.slice(o), s = this.tokenStart + e.length + 1;
    this.ta.value = i, this.ta.setSelectionRange(s, s), this.close(), this.ta.dispatchEvent(new Event("input", { bubbles: !0 })), this.ta.focus();
  }
  render() {
    if (typeof document == "undefined") return;
    this.box || (this.box = document.createElement("div"), this.box.className = "ooxml-formula-ac", this.box.style.cssText = "position:fixed;z-index:10002;min-width:200px;max-width:360px;background:#fff;border:1px solid #d0d5dd;border-radius:6px;box-shadow:0 6px 24px rgba(0,0,0,.16);font:13px/1.5 -apple-system,'Segoe UI','Microsoft YaHei',monospace;overflow:hidden;max-height:240px;overflow-y:auto", document.body.appendChild(this.box)), this.box.innerHTML = this.items.map((i, s) => {
      const r = ms[i] || `${i}(…)`, l = s === this.active ? "background:#eef4ff;" : "";
      return `<div data-i="${s}" style="padding:5px 10px;cursor:pointer;${l}"><b style="color:#1a56db">${Ql(i)}</b> <span style="color:#98a2b3;font-size:12px">${Ql(r)}</span></div>`;
    }).join(""), this.box.querySelectorAll("[data-i]").forEach((i) => {
      i.addEventListener("mousedown", (s) => {
        s.preventDefault(), this.accept(this.items[Number(i.dataset.i)]);
      });
    });
    const e = this.ta.getBoundingClientRect(), t = window.innerHeight, o = t - e.bottom > 250 || e.top < 250;
    this.box.style.left = `${Math.min(e.left, window.innerWidth - 364)}px`, o ? (this.box.style.top = `${e.bottom + 2}px`, this.box.style.bottom = "") : (this.box.style.bottom = `${t - e.top + 2}px`, this.box.style.top = "");
  }
}
function Ql(n) {
  return n.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
}
const x0 = 96 / 72;
let an = null;
function w0() {
  if (an) return an;
  if (typeof document == "undefined") return null;
  const n = document.createElement("canvas");
  return n.width = 100, n.height = 100, an = n.getContext("2d"), an;
}
const k0 = (n) => {
  var h, p, m, b, v, y, w, S;
  const e = n.snapshot.style, t = e == null ? void 0 : e.fill, o = t && t.type !== "none" && (p = (h = t.fgColor) != null ? h : t.bgColor) != null ? p : "#fff", i = document.createElement("textarea");
  i.className = "ooxml-cell-editor", i.value = (b = (m = n.initialText) != null ? m : n.snapshot.editText) != null ? b : n.snapshot.text, i.rows = 1, i.style.cssText = "box-sizing:border-box;border:2px solid #21a366;outline:none;padding:0 3px;margin:0;font-family:sans-serif;resize:none;overflow:auto;white-space:pre-wrap;word-break:break-word;", i.style.background = o;
  const s = (v = e == null ? void 0 : e.font) != null && v.size ? e.font.size * x0 : 14;
  i.style.fontSize = s + "px", i.style.lineHeight = eo.toString(), (y = e == null ? void 0 : e.font) != null && y.bold && (i.style.fontWeight = "bold"), (w = e == null ? void 0 : e.font) != null && w.italic && (i.style.fontStyle = "italic"), (S = e == null ? void 0 : e.font) != null && S.color && (i.style.color = e.font.color), i.style.textAlign = (e == null ? void 0 : e.hAlign) === "center" ? "center" : (e == null ? void 0 : e.hAlign) === "right" ? "right" : "left";
  const r = new v0(i);
  let l = !1, a = null;
  const c = (k) => {
    l || i.value !== a && (l = !0, r.dispose(), n.commit(i.value, k) === !1 && (l = !1, a = i.value));
  }, d = () => {
    l || (l = !0, r.dispose(), n.cancel());
  };
  i.addEventListener("keydown", (k) => {
    if (r.onKeyDown(k)) {
      k.preventDefault(), k.stopPropagation();
      return;
    }
    k.key === "Enter" && !k.shiftKey ? (k.preventDefault(), c("down")) : k.key === "Tab" ? (k.preventDefault(), c("right")) : k.key === "Escape" && (k.preventDefault(), d()), k.stopPropagation();
  }), i.addEventListener("blur", () => c()), i.addEventListener("input", () => {
    var k;
    a = null, r.update(), (k = n.reposition) == null || k.call(n);
  });
  function u(k) {
    const C = w0();
    if (!C || k <= 0) return 0;
    const M = e != null && e.font ? Xe(e.font, 1) : `${s.toFixed(1)}px sans-serif`, E = Math.max(10, k - 2 * dt - 4), P = $n(C, i.value || " ", M, E), I = s * eo;
    return Math.ceil(P.length * I + 4 + 2);
  }
  return setTimeout(() => {
    var k;
    i.focus(), n.initialText != null ? i.setSelectionRange(i.value.length, i.value.length) : i.select(), (k = n.reposition) == null || k.call(n);
  }, 0), { el: i, getDesiredHeight: u };
}, S0 = {
  headerBg: "#F5F6F7",
  headerActiveBg: "#E1E6EB",
  headerText: "#4B4B4B",
  headerLine: "#C6CCD2",
  gridLine: "#E0E2E5",
  selBorder: "#1A73E8",
  selFill: "rgba(26,115,232,0.10)"
};
function C0(n) {
  return R(R({}, S0), n || {});
}
class ea {
  constructor(e) {
    /** key `${row}:${col}` → 该 cell 所属的合并区(任意成员都能查到) */
    T(this, "map", /* @__PURE__ */ new Map());
    /** 锚点(左上角) key 集合 */
    T(this, "anchors", /* @__PURE__ */ new Set());
    for (const t of e.merges) {
      this.anchors.add(`${t.top}:${t.left}`);
      for (let o = t.top; o <= t.bottom; o++)
        for (let i = t.left; i <= t.right; i++)
          this.map.set(`${o}:${i}`, t);
    }
  }
  /** 该 cell 所在的合并区(没有返回 undefined) */
  rangeOf(e, t) {
    return this.map.get(`${e}:${t}`);
  }
  /** 是否合并区锚点(左上角，渲染内容的那个) */
  isAnchor(e, t) {
    return this.anchors.has(`${e}:${t}`);
  }
  /** 是否被合并覆盖但不是锚点(渲染时跳过内容) */
  isCovered(e, t) {
    const o = this.map.get(`${e}:${t}`);
    return !!o && !(o.top === e && o.left === t);
  }
}
function ko(n, e) {
  const t = Math.min(n.freeze.frozenRows, e.rows), o = Math.min(n.freeze.frozenCols, e.cols);
  return {
    frozenRows: t,
    frozenCols: o,
    frozenWidth: e.colLeft(o),
    frozenHeight: e.rowTop(t)
  };
}
function E0(n, e, t, o, i, s) {
  const r = n.rowHeaderWidth, l = n.colHeaderHeight, a = e.frozenWidth, c = e.frozenHeight, d = r + a, u = l + c, h = Math.max(0, i - d), p = Math.max(0, s - u), [m, b] = n.visibleColRange(t + a, h), [v, y] = n.visibleRowRange(o + c, p), w = [];
  return w.push({
    clipX: d,
    clipY: u,
    clipW: h,
    clipH: p,
    offsetX: t,
    offsetY: o,
    colStart: Math.max(m, e.frozenCols),
    colEnd: b,
    rowStart: Math.max(v, e.frozenRows),
    rowEnd: y
  }), e.frozenCols > 0 && w.push({
    clipX: r,
    clipY: u,
    clipW: a,
    clipH: p,
    offsetX: 0,
    offsetY: o,
    colStart: 0,
    colEnd: e.frozenCols - 1,
    rowStart: Math.max(v, e.frozenRows),
    rowEnd: y
  }), e.frozenRows > 0 && w.push({
    clipX: d,
    clipY: l,
    clipW: h,
    clipH: c,
    offsetX: t,
    offsetY: 0,
    colStart: Math.max(m, e.frozenCols),
    colEnd: b,
    rowStart: 0,
    rowEnd: e.frozenRows - 1
  }), e.frozenRows > 0 && e.frozenCols > 0 && w.push({
    clipX: r,
    clipY: l,
    clipW: a,
    clipH: c,
    offsetX: 0,
    offsetY: 0,
    colStart: 0,
    colEnd: e.frozenCols - 1,
    rowStart: 0,
    rowEnd: e.frozenRows - 1
  }), { panes: w, rowHeaderWidth: r, colHeaderHeight: l };
}
function T0(n, e, t, o, i, s) {
  var r;
  if (!(!e || e.type === "none")) {
    if (e.type === "solid") {
      if (!e.fgColor) return;
      n.fillStyle = e.fgColor, n.fillRect(t, o, i, s);
      return;
    }
    if (e.type === "gradient") {
      const l = e.gradientStops || [];
      if (!l.length) return;
      const a = ((r = e.gradientAngle) != null ? r : 90) * Math.PI / 180, c = t + i / 2, d = o + s / 2, u = (Math.abs(i * Math.cos(a)) + Math.abs(s * Math.sin(a))) / 2, h = Math.cos(a) * u, p = Math.sin(a) * u, m = n.createLinearGradient(c - h, d - p, c + h, d + p);
      for (const b of l) m.addColorStop(Math.min(1, Math.max(0, b.position)), b.color);
      n.fillStyle = m, n.fillRect(t, o, i, s);
      return;
    }
    e.type === "pattern" && (e.bgColor && (n.fillStyle = e.bgColor, n.fillRect(t, o, i, s)), e.fgColor && M0(n, e.pattern || "gray125", e.fgColor, t, o, i, s));
  }
}
function M0(n, e, t, o, i, s, r) {
  n.save(), n.beginPath(), n.rect(o, i, s, r), n.clip(), n.fillStyle = t, n.strokeStyle = t;
  const l = {
    gray0625: 0.0625,
    gray125: 0.125,
    lightGray: 0.25,
    mediumGray: 0.5,
    gray: 0.5,
    darkGray: 0.75
  };
  if (e in l) {
    n.globalAlpha = l[e], n.fillRect(o, i, s, r), n.restore();
    return;
  }
  const a = e.toLowerCase(), c = a.startsWith("dark"), d = c ? 3 : 5;
  n.lineWidth = c ? 1.4 : 1;
  const u = () => {
    for (let b = i + 0.5; b < i + r; b += d) cn(n, o, b, o + s, b);
  }, h = () => {
    for (let b = o + 0.5; b < o + s; b += d) cn(n, b, i, b, i + r);
  }, p = () => {
    for (let b = -r; b < s; b += d) cn(n, o + b, i, o + b + r, i + r);
  }, m = () => {
    for (let b = -r; b < s; b += d) cn(n, o + b, i + r, o + b + r, i);
  };
  a.includes("horizontal") ? u() : a.includes("vertical") ? h() : a.includes("grid") ? (u(), h()) : a.includes("trellis") ? (p(), m()) : a.includes("down") ? p() : a.includes("up") ? m() : p(), n.restore();
}
function cn(n, e, t, o, i) {
  n.beginPath(), n.moveTo(e, t), n.lineTo(o, i), n.stroke();
}
const ta = {
  none: 0,
  hair: 1,
  dotted: 2,
  dashDotDot: 3,
  dashDot: 4,
  dashed: 5,
  thin: 6,
  mediumDashDotDot: 7,
  slantDashDot: 8,
  mediumDashDot: 9,
  mediumDashed: 10,
  medium: 11,
  thick: 12,
  double: 13
};
function dn(n, e) {
  const t = n ? ta[n.style] : 0;
  return (e ? ta[e.style] : 0) > t ? e : n;
}
function Hc(n) {
  switch (n) {
    case "hair":
      return { width: 0.5, dash: [], double: !1 };
    case "thin":
      return { width: 1, dash: [], double: !1 };
    case "medium":
      return { width: 2, dash: [], double: !1 };
    case "thick":
      return { width: 3, dash: [], double: !1 };
    case "double":
      return { width: 1, dash: [], double: !0 };
    case "dotted":
      return { width: 1, dash: [1, 1], double: !1 };
    case "dashed":
      return { width: 1, dash: [3, 2], double: !1 };
    case "mediumDashed":
      return { width: 2, dash: [4, 2], double: !1 };
    case "dashDot":
      return { width: 1, dash: [3, 2, 1, 2], double: !1 };
    case "mediumDashDot":
      return { width: 2, dash: [4, 2, 1, 2], double: !1 };
    case "dashDotDot":
      return { width: 1, dash: [3, 2, 1, 2, 1, 2], double: !1 };
    case "mediumDashDotDot":
      return { width: 2, dash: [4, 2, 1, 2, 1, 2], double: !1 };
    case "slantDashDot":
      return { width: 1, dash: [4, 2], double: !1 };
    default:
      return { width: 1, dash: [], double: !1 };
  }
}
function xt(n, e, t, o, i, s) {
  if (!e || e.style === "none") return;
  const r = Hc(e.style);
  n.save(), n.strokeStyle = e.color, n.lineWidth = r.width, n.setLineDash(r.dash);
  const l = o === s, a = (c) => Math.round(c) + (r.width % 2 === 1 ? 0.5 : 0);
  r.double ? l ? (Lt(n, t, a(o - 1), i, a(o - 1)), Lt(n, t, a(o + 1), i, a(o + 1))) : (Lt(n, a(t - 1), o, a(t - 1), s), Lt(n, a(t + 1), o, a(t + 1), s)) : l ? Lt(n, t, a(o), i, a(s)) : Lt(n, a(t), o, a(i), s), n.restore();
}
function Lt(n, e, t, o, i) {
  n.beginPath(), n.moveTo(e, t), n.lineTo(o, i), n.stroke();
}
function oa(n, e, t, o, i, s) {
  if (!e || e.style === "none") return;
  const r = Hc(e.style);
  n.save(), n.strokeStyle = e.color, n.lineWidth = r.width, n.setLineDash(r.dash), Lt(n, t, o, i, s), n.restore();
}
const ds = /* @__PURE__ */ new WeakSet();
function I0(n) {
  ds.delete(n);
}
function $0(n, e, t) {
  var l, a;
  if (ds.has(n)) return;
  const o = t != null ? t : F0();
  if (!o) return;
  ds.add(n), o.save();
  const i = /* @__PURE__ */ new Set();
  for (const c of n.merges)
    for (let d = c.top; d <= c.bottom; d++)
      for (let u = c.left; u <= c.right; u++) i.add(X(d, u));
  const s = (c) => {
    var u;
    const d = n.columns.get(c);
    return d != null && d.hidden ? 0 : (u = d == null ? void 0 : d.width) != null ? u : n.defaultColWidth;
  }, r = /* @__PURE__ */ new Map();
  for (const [c, d] of n.cells) {
    if (d.type === "empty" || i.has(c)) continue;
    const u = n.styles[d.styleId], h = A0(o, d, u, s(d.col), e);
    h > ((l = r.get(d.row)) != null ? l : 0) && r.set(d.row, h);
  }
  o.restore();
  for (const [c, d] of r) {
    if (d <= 0) continue;
    const u = n.rows.get(c);
    if (u != null && u.hidden || u != null && u.customHeight) continue;
    const h = (a = u == null ? void 0 : u.height) != null ? a : n.defaultRowHeight, p = Math.ceil(n.defaultRowHeight + d + dt);
    p > h && n.rows.set(c, { height: p, hidden: !1 });
  }
}
function A0(n, e, t, o, i) {
  if (!t.wrapText && e.type !== "string" && e.type !== "richtext") return 0;
  const s = e.type === "richtext" && e.rich ? e.rich.map((a) => a.text).join("") : to(e.raw, t.numFmt, i.date1904).text;
  if (!s) return 0;
  let r;
  if (t.wrapText) {
    const a = Xe(t.font, 1), c = o - dt * 2;
    r = $n(n, s, a, c).length;
  } else {
    if (!s.includes(`
`)) return 0;
    r = s.split(`
`).length;
  }
  if (r < 2) return 0;
  const l = t.font.size * Hn * eo;
  return (r - 1) * l;
}
function F0() {
  return typeof document == "undefined" ? null : document.createElement("canvas").getContext("2d");
}
const R0 = 16;
function L0(n, e, t) {
  return n ? e === n.top && t >= n.left && t <= n.right : !1;
}
function us(n, e, t, o) {
  const i = Math.min(R0, t - 2, o - 2);
  return i < 8 ? null : { x: n + t - i - 1, y: e + (o - i) / 2, size: i };
}
function na(n, e, t, o, i, s = !1) {
  const r = us(e, t, o, i);
  if (!r) return 0;
  const { x: l, y: a, size: c } = r;
  n.save(), n.fillStyle = s ? "#E3F0FF" : "#FFFFFF", n.strokeStyle = s ? "#1A73E8" : "#A0A0A0", n.lineWidth = 1, n.beginPath(), n.rect(Math.round(l) + 0.5, Math.round(a) + 0.5, c, c), n.fill(), n.stroke();
  const d = l + c / 2, u = a + c / 2;
  return s ? (n.fillStyle = "#1A73E8", n.beginPath(), n.moveTo(d - 3.5, u - 3), n.lineTo(d + 3.5, u - 3), n.lineTo(d + 1, u + 0.5), n.lineTo(d + 1, u + 3.5), n.lineTo(d - 1, u + 2.5), n.lineTo(d - 1, u + 0.5), n.closePath(), n.fill()) : (n.fillStyle = "#5B5B5B", n.beginPath(), n.moveTo(d - 3, u - 1.5), n.lineTo(d + 3, u - 1.5), n.lineTo(d, u + 2.5), n.closePath(), n.fill()), n.restore(), c + 2;
}
function ia(n, e, t, o) {
  const i = Math.min(13, t - 2, o - 2);
  return i < 8 ? null : { x: n + 1, y: e + (o - i) / 2, size: i };
}
function P0(n, e, t, o, i) {
  n.save(), n.fillStyle = "#ffffff", n.strokeStyle = "#7a8694", n.lineWidth = 1, n.fillRect(e + 0.5, t + 0.5, o - 1, o - 1), n.strokeRect(e + 0.5, t + 0.5, o - 1, o - 1), n.strokeStyle = "#1f2329", n.beginPath();
  const s = e + o / 2, r = t + o / 2, l = o / 2 - 3;
  n.moveTo(s - l, r), n.lineTo(s + l, r), i && (n.moveTo(s, r - l), n.lineTo(s, r + l)), n.stroke(), n.restore();
}
class Dc {
  constructor(e, t, o, i = 1, s) {
    T(this, "metrics");
    T(this, "merges");
    T(this, "freeze");
    /** 冻结预览(WPS 冻结 ▾ 悬停某项时高亮将冻结的区域:灰底 + 分割线加重);null=不画。 */
    T(this, "freezePreview", null);
    /** 「显示批注」(审阅选项卡):true=常驻画所有批注小黄框。 */
    T(this, "showAllComments", !1);
    /** 行号列标(视图选项卡):false=隐藏行/列表头(metrics 表头尺寸归 0)。 */
    T(this, "showHeaders", !0);
    T(this, "cond");
    T(this, "ctx");
    T(this, "dpr", 1);
    T(this, "sparklineIndex", /* @__PURE__ */ new Map());
    T(this, "theme");
    T(this, "cellStyleHook");
    T(this, "onNeedsRedraw");
    T(this, "cellImageFit");
    /** Phase C 2026-06-08: 只读视觉钩子, 渲染时按格套用 */
    T(this, "readOnlyStyleHook");
    /** Phase C 2026-06-08: 查询该格是否可编辑 (controller 注入). 默认全可编辑 (老行为) */
    T(this, "isEditableFn", () => !0);
    /** 虚拟外推行/列数(滚动出空行用;0 = 仅按 dimension)。透传给 GridMetrics,不影响导出。 */
    T(this, "virtualRows", 0);
    T(this, "virtualCols", 0);
    /** WPS 单元格内嵌图解码缓存: blob src → 已加载的 HTMLImageElement(complete 才画) */
    T(this, "cellImageCache", /* @__PURE__ */ new Map());
    // ---------------- 交互查询 ----------------
    T(this, "selection", null);
    /** 自动填充柄可见(= editable;1.10.0)。控制器创建后设置。 */
    T(this, "showFillHandle", !1);
    /** 自动填充拖拽预览区(目标范围;拖拽中由控制器设)。 */
    T(this, "fillPreview", null);
    /** 不连续多选的附加区域(1.13.0;不含 active 区,active 区仍走 setSelection)。 */
    T(this, "extraSelection", []);
    // ---------------- 查找 ----------------
    T(this, "findHits", []);
    T(this, "findCurrent", -1);
    // ---------------- 筛选 ----------------
    T(this, "filteredCols", /* @__PURE__ */ new Set());
    var l;
    this.canvas = e, this.sheet = t, this.workbook = o, this.theme = C0(s == null ? void 0 : s.theme), this.cellStyleHook = s == null ? void 0 : s.cellStyle, this.onNeedsRedraw = s == null ? void 0 : s.onNeedsRedraw, this.cellImageFit = (l = s == null ? void 0 : s.cellImageFit) != null ? l : "contain", this.readOnlyStyleHook = s == null ? void 0 : s.readOnlyCellStyle, s != null && s.isEditable && (this.isEditableFn = s.isEditable);
    const r = e.getContext("2d");
    if (!r) throw new Error("无法获取 canvas 2d context");
    this.ctx = r, $0(t, o, r), this.metrics = new kt(t, i, this.virtualRows, this.virtualCols, this.showHeaders), this.merges = new ea(t), this.freeze = ko(t, this.metrics), this.cond = new wc(t);
    for (const a of t.sparklines) this.sparklineIndex.set(X(a.row, a.col), a);
  }
  /** 改 WPS 单元格内嵌图贴合方式(fill/contain/cover);返回是否有变化(变了需重绘)。 */
  setCellImageFit(e) {
    return e === this.cellImageFit ? !1 : (this.cellImageFit = e, !0);
  }
  /** 改变缩放: 重建几何(列宽行高表头按 zoom 缩放)。合并/条件格式无需重建。 */
  setZoom(e) {
    e !== this.metrics.zoom && (this.metrics = new kt(this.sheet, e, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = ko(this.sheet, this.metrics));
  }
  /** 行号列标显隐(视图选项卡);变了重建几何。返回是否变化。 */
  setShowHeaders(e) {
    return e === this.showHeaders ? !1 : (this.showHeaders = e, this.metrics = new kt(this.sheet, this.metrics.zoom, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = ko(this.sheet, this.metrics), !0);
  }
  areHeadersVisible() {
    return this.showHeaders;
  }
  /**
   * 设虚拟外推行/列数(滚动出空行/空列);仅当变化时重建 GridMetrics,返回是否变了(变了需重绘 + 刷 spacer)。
   * 不影响 dimension / 导出 / data-access。
   */
  setVirtualExtent(e, t) {
    return e === this.virtualRows && t === this.virtualCols ? !1 : (this.virtualRows = e, this.virtualCols = t, this.metrics = new kt(this.sheet, this.metrics.zoom, e, t, this.showHeaders), this.freeze = ko(this.sheet, this.metrics), !0);
  }
  /** 内容总尺寸(含表头)，给外层滚动容器用(用虚拟范围 → 可滚动出空行/列) */
  get contentWidth() {
    return this.metrics.rowHeaderWidth + this.metrics.virtualWidth;
  }
  get contentHeight() {
    return this.metrics.colHeaderHeight + this.metrics.virtualHeight;
  }
  get freezeGeometry() {
    return this.freeze;
  }
  /** 默认行高(已含缩放),供翻页步长估算 */
  get defaultRowPx() {
    return this.sheet.defaultRowHeight * this.metrics.zoom;
  }
  /** 把行列号映射到当前视图的屏幕矩形(供叠加层定位) */
  screenRectOfCell(e, t, o) {
    const i = this.metrics.rowHeaderWidth + this.metrics.colLeft(o) - e.scrollX, s = this.metrics.colHeaderHeight + this.metrics.rowTop(t) - e.scrollY;
    return { x: i, y: s, w: this.metrics.colWidth(o), h: this.metrics.rowHeight(t) };
  }
  setSelection(e) {
    this.selection = e;
  }
  setFillPreview(e) {
    this.fillPreview = e;
  }
  setExtraSelection(e) {
    this.extraSelection = e;
  }
  // 查找匹配逻辑 1.16.1 起移到框架无关 find-engine.ts(支持范围/方向/查找范围/通配符);
  // 渲染器只保留高亮绘制(setFind + drawFind),控制器把当前表命中喂进来。
  /** 设置高亮命中集 + 当前项(供 drawFind 绘制) */
  setFind(e, t) {
    this.findHits = e, this.findCurrent = t;
  }
  /** 标记哪些列处于筛选态(下拉按钮画成蓝色漏斗) */
  setFilteredCols(e) {
    this.filteredCols = e;
  }
  /** 单元格的当前屏幕矩形(冻结感知: 冻结行/列不随滚动) */
  cellScreenRect(e, t, o) {
    const i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = i + this.metrics.colLeft(o) - (o < this.freeze.frozenCols ? 0 : e.scrollX), l = s + this.metrics.rowTop(t) - (t < this.freeze.frozenRows ? 0 : e.scrollY);
    return { x: r, y: l, w: this.metrics.colWidth(o), h: this.metrics.rowHeight(t) };
  }
  /** 屏幕坐标是否落在某个自动筛选表头的下拉按钮上;是则返回列号 */
  filterButtonAt(e, t, o) {
    const i = this.sheet.autoFilterRange;
    if (!i) return null;
    const s = this.cellAtScreen(e, t, o);
    if (!s || s.row !== i.top || s.col < i.left || s.col > i.right) return null;
    const r = this.cellScreenRect(e, i.top, s.col), l = us(r.x, r.y, r.w, r.h);
    return l && t >= l.x && t <= l.x + l.size && o >= l.y && o <= l.y + l.size ? s.col : null;
  }
  /** 点击是否落在"活动格的数据验证下拉箭头"上(箭头只画在选区左上的列表验证格);是则返回该格。 */
  dataValidationButtonAt(e, t, o) {
    const i = this.selection;
    if (!i) return null;
    const s = i.top, r = i.left;
    if (!this.inDataValidation(s, r)) return null;
    const l = this.cellAtScreen(e, t, o);
    if (!l || l.row !== s || l.col !== r) return null;
    const a = this.cellScreenRect(e, s, r), c = us(a.x, a.y, a.w, a.h);
    return c && t >= c.x && t <= c.x + c.size && o >= c.y && o <= c.y + c.size ? { row: s, col: r } : null;
  }
  /** 屏幕坐标 → 单元格(0-based)。落在表头或越界返回 null。 */
  cellAtScreen(e, t, o) {
    const i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight;
    if (t < i || o < s) return null;
    const r = this.freeze.frozenWidth, l = this.freeze.frozenHeight, a = t < i + r ? t - i : t - i + e.scrollX, c = o < s + l ? o - s : o - s + e.scrollY, d = Math.min(Math.max(this.metrics.colAt(a), 0), this.metrics.vCols - 1);
    return { row: Math.min(Math.max(this.metrics.rowAt(c), 0), this.metrics.vRows - 1), col: d };
  }
  /** 屏幕 y → 行(用于点行号选整行);落在列表头返回 -1 */
  rowAtScreen(e, t) {
    const o = this.metrics.colHeaderHeight;
    if (t < o) return -1;
    const i = this.freeze.frozenHeight, s = t < o + i ? t - o : t - o + e.scrollY;
    return Math.min(Math.max(this.metrics.rowAt(s), 0), this.metrics.vRows - 1);
  }
  /** 屏幕 x → 列(用于点列标选整列);落在行表头返回 -1 */
  colAtScreen(e, t) {
    const o = this.metrics.rowHeaderWidth;
    if (t < o) return -1;
    const i = this.freeze.frozenWidth, s = t < o + i ? t - o : t - o + e.scrollX;
    return Math.min(Math.max(this.metrics.colAt(s), 0), this.metrics.vCols - 1);
  }
  /** 该 cell 所属的合并区(用于选区/复制时按整块处理) */
  mergeAt(e, t) {
    var o;
    return (o = this.merges.rangeOf(e, t)) != null ? o : null;
  }
  /** 双击列边界: 把列宽自适应到该列内容最宽处 */
  autoFitColumn(e) {
    var l;
    const t = this.ctx, o = this.metrics.zoom;
    let i = 0;
    for (const a of this.sheet.cells.values()) {
      if (a.col !== e || a.type === "empty" || this.merges.rangeOf(a.row, e)) continue;
      const c = this.cellText(a.row, e);
      if (!c) continue;
      t.font = Xe(this.styleOf(a).font, o);
      const d = t.measureText(c).width;
      d > i && (i = d);
    }
    const s = i === 0 ? this.sheet.defaultColWidth : Math.max(16, Math.ceil(i / o) + dt * 2 + 3), r = this.sheet.columns.get(e);
    this.sheet.columns.set(e, { width: s, hidden: (l = r == null ? void 0 : r.hidden) != null ? l : !1 }), this.rebuildMetrics();
  }
  /** 双击行边界: 行高自适应到该行内容最高处 */
  autoFitRow(e) {
    var s;
    const t = this.ctx;
    let o = this.sheet.defaultRowHeight;
    for (const r of this.sheet.cells.values()) {
      if (r.row !== e || r.type === "empty" || this.merges.rangeOf(e, r.col)) continue;
      const l = this.styleOf(r), a = this.cellText(e, r.col);
      if (!a) continue;
      const c = l.font.size * (96 / 72) * eo;
      let d = 1;
      if (l.wrapText) {
        const h = this.metrics.zoom, p = this.metrics.colWidth(r.col) / h - dt * 2;
        t.font = Xe(l.font, 1), d = $n(t, a, Xe(l.font, 1), p).length;
      } else
        d = a.split(`
`).length;
      const u = d * c + dt * 2;
      u > o && (o = u);
    }
    const i = this.sheet.rows.get(e);
    this.sheet.rows.set(e, { height: Math.ceil(o), hidden: (s = i == null ? void 0 : i.hidden) != null ? s : !1 }), this.rebuildMetrics();
  }
  /** 拖拽改列宽(传入屏幕像素,内部换算为非缩放存储) */
  setColWidthPx(e, t) {
    var i;
    const o = this.sheet.columns.get(e);
    this.sheet.columns.set(e, { width: Math.max(8, t / this.metrics.zoom), hidden: (i = o == null ? void 0 : o.hidden) != null ? i : !1 }), this.rebuildMetrics();
  }
  /** 拖拽改行高 */
  setRowHeightPx(e, t) {
    var i;
    const o = this.sheet.rows.get(e);
    this.sheet.rows.set(e, { height: Math.max(6, t / this.metrics.zoom), hidden: (i = o == null ? void 0 : o.hidden) != null ? i : !1 }), this.rebuildMetrics();
  }
  /** 复制带格式用: 单元格的内联 CSS(粗体/斜体/色/底色/对齐) */
  cellInlineStyle(e, t) {
    const o = this.sheet.cells.get(X(e, t));
    if (!o) return "";
    const i = this.styleOf(o), s = [];
    return i.font.bold && s.push("font-weight:bold"), i.font.italic && s.push("font-style:italic"), i.font.color && i.font.color !== "#000000" && s.push("color:" + i.font.color), i.fill.type === "solid" && i.fill.fgColor && s.push("background:" + i.fill.fgColor), (i.hAlign === "center" || i.hAlign === "right") && s.push("text-align:" + i.hAlign), s.join(";");
  }
  /** 列宽/行高变化后重建几何 */
  rebuildMetrics() {
    this.metrics = new kt(this.sheet, this.metrics.zoom, this.virtualRows, this.virtualCols, this.showHeaders), this.freeze = ko(this.sheet, this.metrics), this.merges = new ea(this.sheet);
  }
  /** 选区统计: 遍历非空 cell(O(非空数),不随选区大小爆炸) */
  selectionStats(e) {
    var a;
    let t = 0, o = 0, i = 0, s = 1 / 0, r = -1 / 0;
    const l = this.filteredCols.size > 0;
    for (const c of this.sheet.cells.values())
      c.row < e.top || c.row > e.bottom || c.col < e.left || c.col > e.right || c.type !== "empty" && (l && ((a = this.sheet.rows.get(c.row)) != null && a.hidden) || (this.cellText(c.row, c.col) !== "" && t++, typeof c.raw == "number" && (o++, i += c.raw, c.raw < s && (s = c.raw), c.raw > r && (r = c.raw))));
    return { count: t, numCount: o, sum: i, avg: o ? i / o : 0, min: s, max: r };
  }
  /**
   * 矢量导出用: 解析一个单元格的绘制信息(样式 + 显示文本 + 有效字色/粗体 + 是否"复杂")。
   * complex = 含条件格式背景/数据条/图标、迷你图、旋转、富文本 —— 矢量层画不动,调用方应栅格兜底。
   * 返回 null 表示该格无任何可绘制内容(无填充/边框/文本)。
   */
  exportCellDraw(e, t) {
    var m;
    const o = this.sheet.cells.get(X(e, t));
    if (!o) return null;
    const i = this.styleOf(o), s = this.cellText(e, t), r = i.fill.type !== "none" || i.borders.top || i.borders.bottom || i.borders.left || i.borders.right;
    if (!s && !r) return null;
    const l = o.type === "richtext", a = i.textRotation, c = this.sparklineIndex.has(X(e, t)), d = this.cond.hasRules() ? this.cond.effectsFor(e, t, (m = o.raw) != null ? m : null) : null, u = l || !!a && a !== 0 || c;
    let h = i.font.color;
    if (!l) {
      const b = to(o.raw, i.numFmt, this.workbook.date1904);
      h = (d == null ? void 0 : d.fontColor) || b.color || (o.type === "hyperlink" ? this.workbook.themeColors[10] || "#0563C1" : i.font.color);
    }
    const p = d && (d.fillColor || d.dataBar || d.icon) ? { fillColor: d.fillColor, dataBar: d.dataBar, icon: d.icon } : void 0;
    return { style: i, text: s, color: h, bold: i.font.bold || !!(d != null && d.bold), effect: p, complex: u };
  }
  /** 单元格的显示文本(套数字格式后);空返回 '' */
  cellText(e, t) {
    const o = this.sheet.cells.get(X(e, t));
    return Es(o, o ? this.styleOf(o) : void 0, this.workbook.date1904);
  }
  /** 单元格的公式文本(无则 null),供公式栏显示 */
  cellFormula(e, t) {
    const o = this.sheet.cells.get(X(e, t));
    return o != null && o.formula ? "=" + o.formula : null;
  }
  /** 单元格原始数值(供状态栏统计);非数字返回 null */
  cellNumber(e, t) {
    const o = this.sheet.cells.get(X(e, t));
    return o && typeof o.raw == "number" ? o.raw : null;
  }
  cellHyperlink(e, t) {
    var i;
    const o = this.sheet.cells.get(X(e, t));
    return (i = o == null ? void 0 : o.hyperlink) != null ? i : null;
  }
  /** 单元格批注(无则 null) */
  commentAt(e, t) {
    var i;
    const o = this.sheet.cells.get(X(e, t));
    return (i = o == null ? void 0 : o.comment) != null ? i : null;
  }
  inDataValidation(e, t) {
    return this.sheet.dataValidations.some(
      (o) => e >= o.top && e <= o.bottom && t >= o.left && t <= o.right
    );
  }
  /** 若该 cell 文本被裁切(非换行、宽度不足、且溢出也放不下),返回完整文本供 tooltip;否则 null */
  overflowTextAt(e, t) {
    if (this.merges.rangeOf(e, t)) return null;
    const o = this.sheet.cells.get(X(e, t));
    if (!o || o.type === "empty") return null;
    const i = this.styleOf(o);
    if (i.wrapText) return null;
    const s = this.cellText(e, t);
    if (!s) return null;
    this.ctx.font = Xe(i.font, this.metrics.zoom);
    const r = this.ctx.measureText(s).width, l = dt * 2 * this.metrics.zoom, a = this.metrics.colWidth(t);
    if (r <= a - l) return null;
    const c = o.type === "number" || o.type === "formula" && typeof o.raw == "number", d = this.spillClip(e, t, 0, a, r - (a - l), Ui(i.hAlign, c));
    return r > d.w - l + 1 ? s : null;
  }
  render(e) {
    this.dpr = window.devicePixelRatio || 1;
    const t = e.width + "px", o = e.height + "px";
    this.canvas.style.width !== t && (this.canvas.style.width = t), this.canvas.style.height !== o && (this.canvas.style.height = o), this.paint(e, { headers: this.showHeaders, pageBreaks: !0, selection: !0 });
  }
  /**
   * 绘制核心: 被实时 render() 与导出 exportToCanvas() 共用。
   * 用 this.{canvas,ctx,metrics,freeze,selection,dpr} 当前值,flags 控制 UI 装饰是否绘制。
   */
  paint(e, t, o = "#FFFFFF") {
    const { width: i, height: s, zoom: r } = e, l = Math.round(i * this.dpr), a = Math.round(s * this.dpr);
    (this.canvas.width !== l || this.canvas.height !== a) && (this.canvas.width = l, this.canvas.height = a);
    const c = this.ctx;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), c.clearRect(0, 0, i, s), c.fillStyle = o, c.fillRect(0, 0, i, s), this.drawBackgroundImage(e);
    const d = E0(this.metrics, this.freeze, e.scrollX, e.scrollY, i, s);
    for (const u of d.panes)
      this.drawPane(u, r);
    this.drawWatermark(e), t.headers && this.drawHeaders(d.panes, e), this.drawFreezeLines(d), t.pageBreaks && this.drawPageBreaks(e), t.selection && this.drawPivotToggles(e), t.selection && this.findHits.length && this.drawFind(e), t.selection && this.drawSelection(e), t.selection && this.drawFillPreview(e), t.selection && this.freezePreview && this.drawFreezePreview(e), t.selection && this.showAllComments && this.drawAllComments(e);
  }
  /** 「显示批注」(审阅选项卡):常驻批注小黄框开关。调用方随后 render()。 */
  setShowAllComments(e) {
    this.showAllComments = e;
  }
  /** 常驻画出所有可见格的批注小黄框(锚在格右上,连一条引线到批注标记)。 */
  drawAllComments(e) {
    const t = this.ctx, o = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight;
    t.save(), t.beginPath(), t.rect(o, i, e.width - o, e.height - i), t.clip(), t.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif', t.textBaseline = "top";
    for (const s of this.sheet.cells.values()) {
      const r = s.comment;
      if (!r) continue;
      const l = this.cellScreenRect(e, s.row, s.col);
      if (l.x + l.w < o || l.y + l.h < i || l.x > e.width || l.y > e.height) continue;
      const a = l.x + l.w + 8, c = l.y, d = String(r).split(/\r?\n/);
      let u = 0;
      for (const b of d) u = Math.max(u, t.measureText(b).width);
      const h = Math.min(220, Math.max(60, u + 12)), p = 16, m = d.length * p + 8;
      t.strokeStyle = "rgba(120,120,120,0.7)", t.lineWidth = 1, t.beginPath(), t.moveTo(l.x + l.w, l.y), t.lineTo(a, c + 4), t.stroke(), t.fillStyle = "#FFFFE1", t.strokeStyle = "#C9C9A6", t.fillRect(a, c, h, m), t.strokeRect(a + 0.5, c + 0.5, h, m), t.fillStyle = "#333333", d.forEach((b, v) => {
        let y = b;
        for (; y.length && t.measureText(y).width > h - 12; ) y = y.slice(0, -1);
        t.fillText(y + (y.length < b.length ? "…" : ""), a + 6, c + 5 + v * p);
      });
    }
    t.restore();
  }
  /** 设/清冻结预览区(悬停冻结菜单项时高亮将冻结的行/列区域)。调用方随后 render()。 */
  setFreezePreview(e) {
    this.freezePreview = e;
  }
  /** 画冻结预览:将冻结的顶部 rows 行 + 左侧 cols 列铺灰底,分割线加重(对齐 WPS 悬停高亮)。 */
  drawFreezePreview(e) {
    const t = this.freezePreview;
    if (!t || t.rows <= 0 && t.cols <= 0) return;
    const o = this.ctx, i = this.metrics, s = i.rowHeaderWidth, r = i.colHeaderHeight, l = e.width, a = e.height, c = t.cols > 0 ? s + i.colLeft(t.cols) - e.scrollX : s, d = t.rows > 0 ? r + i.rowTop(t.rows) - e.scrollY : r;
    o.save(), o.fillStyle = "rgba(96,105,115,0.16)", t.rows > 0 && d > r && o.fillRect(s, r, l - s, Math.min(d, a) - r), t.cols > 0 && c > s && o.fillRect(s, r, Math.min(c, l) - s, a - r), o.strokeStyle = "#3c4149", o.lineWidth = 2, t.rows > 0 && d > r && d < a && (o.beginPath(), o.moveTo(s, Math.round(d) + 0.5), o.lineTo(l, Math.round(d) + 0.5), o.stroke()), t.cols > 0 && c > s && c < l && (o.beginPath(), o.moveTo(Math.round(c) + 0.5, r), o.lineTo(Math.round(c) + 0.5, a), o.stroke()), o.restore();
  }
  /** 画各透视表的行分组折叠/展开按钮(贴在分组表头格最左)。 */
  drawPivotToggles(e) {
    var r;
    const t = this.sheet.pivotTables;
    if (!(t != null && t.length)) return;
    const o = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight, s = this.ctx;
    s.save(), s.beginPath(), s.rect(o, i, e.width - o, e.height - i), s.clip();
    for (const l of t) {
      const a = l.rowGroups;
      if (!(a != null && a.length)) continue;
      const c = new Set((r = l.collapsed) != null ? r : []), d = l.range.left;
      for (const u of a) {
        const h = this.cellScreenRect(e, u.row, d);
        if (h.x + h.w < o || h.y + h.h < i || h.x > e.width || h.y > e.height) continue;
        const p = ia(h.x, h.y, h.w, h.h);
        p && P0(s, p.x, p.y, p.size, c.has(u.key));
      }
    }
    s.restore();
  }
  /** 屏幕坐标是否落在某透视表的折叠按钮上;是则返回 { tableIdx, key }。 */
  pivotToggleAt(e, t, o) {
    const i = this.sheet.pivotTables;
    if (!(i != null && i.length)) return null;
    const s = this.cellAtScreen(e, t, o);
    if (!s) return null;
    for (let r = 0; r < i.length; r++) {
      const l = i[r], a = l.rowGroups;
      if (!(!(a != null && a.length) || s.col !== l.range.left))
        for (const c of a) {
          if (c.row !== s.row) continue;
          const d = this.cellScreenRect(e, c.row, l.range.left), u = ia(d.x, d.y, d.w, d.h);
          if (u && t >= u.x && t <= u.x + u.size && o >= u.y && o <= u.y + u.size) return { tableIdx: r, key: c.key };
        }
    }
    return null;
  }
  /** 查找高亮: 所有命中淡黄,当前项橙色描边 */
  drawFind(e) {
    const t = this.ctx, o = this.metrics.rowHeaderWidth, i = this.metrics.colHeaderHeight;
    t.save(), t.beginPath(), t.rect(o, i, e.width - o, e.height - i), t.clip();
    for (let s = 0; s < this.findHits.length; s++) {
      const r = this.findHits[s], l = this.merges.rangeOf(r.row, r.col), a = l ? l.top : r.row, c = l ? l.left : r.col, d = this.screenRectOfCell(e, a, c), u = l ? this.metrics.colLeft(l.right + 1) - this.metrics.colLeft(l.left) : d.w, h = l ? this.metrics.rowTop(l.bottom + 1) - this.metrics.rowTop(l.top) : d.h;
      d.x + u < o || d.y + h < i || d.x > e.width || d.y > e.height || (t.fillStyle = s === this.findCurrent ? "rgba(255,145,0,0.40)" : "rgba(255,231,76,0.50)", t.fillRect(d.x, d.y, u, h), s === this.findCurrent && (t.strokeStyle = "#F57C00", t.lineWidth = 2, t.strokeRect(Math.round(d.x) + 1, Math.round(d.y) + 1, Math.round(u) - 2, Math.round(h) - 2)));
    }
    t.restore();
  }
  /**
   * 把整表(或指定区域)渲染到一张离屏 canvas: 无选区高亮/分页线/冻结分区,scale 可控。
   * 复用全部单元格绘制逻辑(填充/边框/条件格式/迷你图/文本)。图片/图表/形状是 DOM 叠加层,
   * 不在此绘制 —— 由调用方拿到 result.metrics/scale/origin 后合成到底图上。
   */
  exportToCanvas(e = {}) {
    var C, M, E, P, I;
    const t = this.sheet.dimension, o = (C = e.range) != null ? C : {
      top: 0,
      left: 0,
      bottom: Math.max(0, t.rows - 1),
      right: Math.max(0, t.cols - 1)
    }, i = (M = e.includeHeaders) != null ? M : !1, s = (E = e.background) != null ? E : "#FFFFFF", r = new kt(this.sheet, 1), l = r.rowHeaderWidth, a = r.colHeaderHeight, c = r.colLeft(o.left), d = r.rowTop(o.top), u = r.colLeft(o.right + 1) - c, h = r.rowTop(o.bottom + 1) - d, p = l + u, m = a + h, b = (P = e.maxPixels) != null ? P : 16384;
    let v = (I = e.scale) != null ? I : 2;
    v = Math.min(v, b / Math.max(1, p), b / Math.max(1, m)), v > 0 || (v = 1);
    const y = document.createElement("canvas"), w = {
      canvas: this.canvas,
      ctx: this.ctx,
      metrics: this.metrics,
      freeze: this.freeze,
      selection: this.selection,
      dpr: this.dpr,
      showGridLines: this.sheet.showGridLines
    };
    this.canvas = y, this.ctx = y.getContext("2d"), this.metrics = r, this.freeze = { frozenRows: 0, frozenCols: 0, frozenWidth: 0, frozenHeight: 0 }, this.selection = null, this.dpr = v, e.gridlines !== void 0 && (this.sheet.showGridLines = e.gridlines);
    try {
      this.paint(
        { scrollX: c, scrollY: d, width: p, height: m, zoom: 1 },
        { headers: i, pageBreaks: !1, selection: !1 },
        s
      );
    } finally {
      this.canvas = w.canvas, this.ctx = w.ctx, this.metrics = w.metrics, this.freeze = w.freeze, this.selection = w.selection, this.dpr = w.dpr, this.sheet.showGridLines = w.showGridLines;
    }
    if (i)
      return { canvas: y, scale: v, range: o, bodyW: u, bodyH: h, metrics: r, originX: l, originY: a, gridOriginX: c, gridOriginY: d };
    const S = document.createElement("canvas");
    S.width = Math.max(1, Math.round(u * v)), S.height = Math.max(1, Math.round(h * v));
    const k = S.getContext("2d");
    return k.fillStyle = s, k.fillRect(0, 0, S.width, S.height), k.drawImage(y, Math.round(l * v), Math.round(a * v), S.width, S.height, 0, 0, S.width, S.height), { canvas: S, scale: v, range: o, bodyW: u, bodyH: h, metrics: r, originX: 0, originY: 0, gridOriginX: c, gridOriginY: d };
  }
  /** 手动分页符: 蓝色虚线(在正文区内,随内容滚动) */
  drawPageBreaks(e) {
    const t = this.sheet.pageBreaks;
    if (!t || !t.rows.length && !t.cols.length) return;
    const o = this.ctx, i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight;
    o.save(), o.beginPath(), o.rect(i, s, e.width - i, e.height - s), o.clip(), o.strokeStyle = "#4472C4", o.lineWidth = 1, o.setLineDash([4, 3]);
    for (const r of t.cols) {
      const l = Math.round(i + this.metrics.colLeft(r) - e.scrollX) + 0.5;
      l <= i || (o.beginPath(), o.moveTo(l, s), o.lineTo(l, e.height), o.stroke());
    }
    for (const r of t.rows) {
      const l = Math.round(s + this.metrics.rowTop(r) - e.scrollY) + 0.5;
      l <= s || (o.beginPath(), o.moveTo(i, l), o.lineTo(e.width, l), o.stroke());
    }
    o.restore();
  }
  /** 选区高亮: 半透明填充 + 蓝色边框，裁到表头以下的正文区。 */
  drawSelection(e) {
    const t = this.selection;
    if (!t) return;
    const o = this.ctx, i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = this.screenRectOfCell(e, t.top, t.left), l = this.screenRectOfCell(e, t.bottom, t.right), a = r.x, c = r.y, d = l.x + l.w - r.x, u = l.y + l.h - r.y;
    o.save(), o.beginPath(), o.rect(i, s, e.width - i, e.height - s), o.clip();
    for (const p of this.extraSelection) {
      const m = this.screenRectOfCell(e, p.top, p.left), b = this.screenRectOfCell(e, p.bottom, p.right);
      o.fillStyle = this.theme.selFill, o.fillRect(m.x, m.y, b.x + b.w - m.x, b.y + b.h - m.y), o.strokeStyle = this.theme.selBorder, o.lineWidth = 2, o.strokeRect(Math.round(m.x) + 1, Math.round(m.y) + 1, Math.round(b.x + b.w - m.x) - 2, Math.round(b.y + b.h - m.y) - 2);
    }
    if (t.top === t.bottom && t.left === t.right && this.extraSelection.length === 0 || (o.fillStyle = this.theme.selFill, o.fillRect(a, c, d, u)), o.strokeStyle = this.theme.selBorder, o.lineWidth = 2, o.strokeRect(Math.round(a) + 1, Math.round(c) + 1, Math.round(d) - 2, Math.round(u) - 2), this.showFillHandle && this.extraSelection.length === 0) {
      const p = this.fillHandleRect(e);
      p && (o.fillStyle = this.theme.selBorder, o.strokeStyle = "#fff", o.lineWidth = 1, o.fillRect(p.x, p.y, p.w, p.h), o.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1));
    }
    o.restore();
  }
  /** 自动填充柄的屏幕矩形(选区右下角的小方块);选区不可见/无选区返 null。 */
  fillHandleRect(e) {
    const t = this.selection;
    if (!t) return null;
    const o = this.screenRectOfCell(e, t.bottom, t.right), i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = o.x + o.w, l = o.y + o.h;
    if (r < i || l < s || r > e.width || l > e.height) return null;
    const a = 7;
    return { x: Math.round(r - a / 2 - 1), y: Math.round(l - a / 2 - 1), w: a, h: a };
  }
  /** 点 (px,py) 是否落在填充柄上(命中区比绘制略大,好点中)。 */
  fillHandleAt(e, t, o) {
    if (!this.showFillHandle) return !1;
    const i = this.fillHandleRect(e);
    if (!i) return !1;
    const s = 3;
    return t >= i.x - s && t <= i.x + i.w + s && o >= i.y - s && o <= i.y + i.h + s;
  }
  /** 拖拽预览:目标范围的虚线框(超出源选区的部分)。 */
  drawFillPreview(e) {
    const t = this.fillPreview;
    if (!t) return;
    const o = this.ctx, i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = this.screenRectOfCell(e, t.top, t.left), l = this.screenRectOfCell(e, t.bottom, t.right);
    o.save(), o.beginPath(), o.rect(i, s, e.width - i, e.height - s), o.clip(), o.strokeStyle = this.theme.selBorder, o.lineWidth = 1, o.setLineDash([4, 3]), o.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(l.x + l.w - r.x) - 1, Math.round(l.y + l.h - r.y) - 1), o.restore();
  }
  // ---------------- pane 绘制 ----------------
  drawPane(e, t) {
    const o = this.ctx;
    if (e.clipW <= 0 || e.clipH <= 0) return;
    o.save(), o.beginPath(), o.rect(e.clipX, e.clipY, e.clipW, e.clipH), o.clip();
    const i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = (m) => i + this.metrics.colLeft(m) - e.offsetX, l = (m) => s + this.metrics.rowTop(m) - e.offsetY, a = this.metrics.colAt(e.clipX - i + e.offsetX), c = this.metrics.colAt(e.clipX + e.clipW - i + e.offsetX) + 1, d = this.metrics.rowAt(e.clipY - s + e.offsetY), u = this.metrics.rowAt(e.clipY + e.clipH - s + e.offsetY) + 1, h = this.sheet.merges.filter(
      (m) => !(m.bottom < e.rowStart || m.top > e.rowEnd || m.right < e.colStart || m.left > e.colEnd)
    );
    if (this.sheet.showGridLines) {
      o.strokeStyle = this.theme.gridLine, o.lineWidth = 1, o.beginPath();
      const m = e.clipY, b = e.clipY + e.clipH;
      for (let w = Math.max(0, a); w <= c; w++) {
        const S = Math.round(r(w)) + 0.5, k = [];
        for (const C of h) C.left < w && w <= C.right && k.push([l(C.top), l(C.bottom + 1)]);
        sa(o, S, m, b, k, !0);
      }
      const v = e.clipX, y = e.clipX + e.clipW;
      for (let w = Math.max(0, d); w <= u; w++) {
        const S = Math.round(l(w)) + 0.5, k = [];
        for (const C of h) C.top < w && w <= C.bottom && k.push([r(C.left), r(C.right + 1)]);
        sa(o, S, v, y, k, !1);
      }
      o.stroke();
    }
    const p = /* @__PURE__ */ new Set();
    for (const m of h) {
      const b = r(m.left), v = l(m.top), y = this.metrics.colLeft(m.right + 1) - this.metrics.colLeft(m.left), w = this.metrics.rowTop(m.bottom + 1) - this.metrics.rowTop(m.top), S = this.sheet.cells.get(X(m.top, m.left));
      this.paintCellBox(S, m.top, m.left, b, v, y, w, t, !0), p.add(X(m.top, m.left));
    }
    for (let m = e.rowStart; m <= e.rowEnd; m++)
      for (let b = e.colStart; b <= e.colEnd; b++) {
        if (this.merges.rangeOf(m, b)) continue;
        const v = this.sheet.cells.get(X(m, b)), y = r(b), w = l(m), S = this.metrics.colWidth(b), k = this.metrics.rowHeight(m);
        this.paintCellBox(v, m, b, y, w, S, k, t);
      }
    o.restore();
  }
  /** 取某格指定边的边框样式(供相邻共享边取较重者);越界/无格返回 undefined */
  borderEdgeOf(e, t, o) {
    if (e < 0 || t < 0 || e >= this.metrics.rows || t >= this.metrics.cols) return;
    const i = this.sheet.cells.get(X(e, t));
    if (i)
      return this.styleOf(i).borders[o];
  }
  /** 画单个 cell(或合并区)的: 填充 → 条件背景 → 数据条 → 边框 → 内容 → 图标 → 筛选按钮 */
  paintCellBox(e, t, o, i, s, r, l, a, c = !1) {
    var v;
    const d = this.ctx, u = e ? this.styleOf(e) : void 0;
    u && u.fill.type !== "none" && T0(d, u.fill, i, s, r, l);
    let h = null;
    if (this.cond.hasRules() && (h = this.cond.effectsFor(t, o, (v = e == null ? void 0 : e.raw) != null ? v : null), h != null && h.fillColor && (d.fillStyle = h.fillColor, d.fillRect(i, s, r, l)), h != null && h.dataBar)) {
      const y = Math.max(0, (r - 4) * h.dataBar.ratio);
      if (d.save(), h.dataBar.gradient) {
        const w = d.createLinearGradient(i, s, i + y, s);
        w.addColorStop(0, h.dataBar.color), w.addColorStop(1, O0(h.dataBar.color, 0.3)), d.fillStyle = w;
      } else
        d.fillStyle = h.dataBar.color;
      d.fillRect(i + 2, s + 2, y, l - 4), d.restore();
    }
    if (u) {
      const y = u.borders;
      c ? (xt(d, y.top, i, s, i + r, s), xt(d, y.bottom, i, s + l, i + r, s + l), xt(d, y.left, i, s, i, s + l), xt(d, y.right, i + r, s, i + r, s + l)) : (xt(d, dn(y.top, this.borderEdgeOf(t - 1, o, "bottom")), i, s, i + r, s), xt(d, dn(y.bottom, this.borderEdgeOf(t + 1, o, "top")), i, s + l, i + r, s + l), xt(d, dn(y.left, this.borderEdgeOf(t, o - 1, "right")), i, s, i, s + l), xt(d, dn(y.right, this.borderEdgeOf(t, o + 1, "left")), i + r, s, i + r, s + l)), y.diagonal && (y.diagonalDown || y.diagonalUp) && (y.diagonalDown && oa(d, y.diagonal, i, s, i + r, s + l), y.diagonalUp && oa(d, y.diagonal, i, s + l, i + r, s));
    }
    let p = i, m = r;
    h != null && h.icon && (D0(d, h.icon, i + 2, s, l), p += 18, m -= 18);
    const b = this.sparklineIndex.get(X(t, o));
    b && H0(d, b, i, s, r, l), e != null && e.dispImgId ? this.drawCellImage(e.dispImgId, i, s, r, l, a) : e && e.type !== "empty" && u && this.drawCellContent(e, u, t, o, p, s, m, l, a, h), L0(this.sheet.autoFilterRange, t, o) && na(d, i, s, r, l, this.filteredCols.has(o)), this.selection && t === this.selection.top && o === this.selection.left && this.inDataValidation(t, o) && na(d, i, s, r, l), e != null && e.comment && (d.fillStyle = "#E8453C", d.beginPath(), d.moveTo(i + r - 7, s), d.lineTo(i + r, s), d.lineTo(i + r, s + 7), d.closePath(), d.fill());
  }
  /**
   * 把 WPS 单元格内嵌图(DISPIMG)画进格内,贴合方式由 `cellImageFit` 决定(fill/contain/cover);
   * 始终裁剪到格内、随行高列宽变化。未解码完成/缺图时画淡占位。
   */
  drawCellImage(e, t, o, i, s, r) {
    var S;
    const l = this.ctx, a = i > 6 && s > 6 ? Math.min(1 * r, 1.5) : 0, c = t + a, d = o + a, u = Math.max(1, i - a * 2), h = Math.max(1, s - a * 2), p = (S = this.workbook.cellImages) == null ? void 0 : S.get(e), m = p != null && p.src ? this.getCellImageEl(p.src) : null;
    if (!m || !m.complete || m.naturalWidth === 0) {
      p != null && p.src || this.drawImagePlaceholder(c, d, u, h, r);
      return;
    }
    let b = c, v = d, y = u, w = h;
    if (this.cellImageFit !== "fill") {
      const k = m.naturalWidth, C = m.naturalHeight, M = this.cellImageFit === "cover" ? Math.max(u / k, h / C) : Math.min(u / k, h / C);
      y = k * M, w = C * M, b = c + (u - y) / 2, v = d + (h - w) / 2;
    }
    l.save(), l.beginPath(), l.rect(c, d, u, h), l.clip();
    try {
      l.drawImage(m, b, v, y, w);
    } catch (k) {
    }
    l.restore();
  }
  /** 工作表背景图(WPS 背景):在数据区(表头之后)平铺,固定不随滚动。1.16.0 */
  drawBackgroundImage(e) {
    const t = this.sheet.background;
    if (!(t != null && t.src)) return;
    const o = this.getCellImageEl(t.src);
    if (!o || !o.complete || !o.naturalWidth) return;
    const i = this.ctx, s = this.metrics.rowHeaderWidth, r = this.metrics.colHeaderHeight, l = o.naturalWidth, a = o.naturalHeight;
    i.save(), i.beginPath(), i.rect(s, r, e.width - s, e.height - r), i.clip();
    for (let c = r; c < e.height; c += a)
      for (let d = s; d < e.width; d += l) i.drawImage(o, d, c, l, a);
    i.restore();
  }
  /** 文字水印(WPS 水印,仅屏幕):数据区半透明旋转平铺。1.16.0 */
  drawWatermark(e) {
    var d, u, h, p;
    const t = this.sheet.watermark;
    if (!(t != null && t.text)) return;
    const o = this.ctx, i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = (d = t.fontSize) != null ? d : 48;
    o.save(), o.beginPath(), o.rect(i, s, e.width - i, e.height - s), o.clip(), o.globalAlpha = (u = t.opacity) != null ? u : 0.12, o.fillStyle = (h = t.color) != null ? h : "#888888", o.font = `bold ${r}px -apple-system,'Segoe UI','Microsoft YaHei',sans-serif`, o.textAlign = "center", o.textBaseline = "middle";
    const l = ((p = t.angle) != null ? p : -30) * Math.PI / 180, a = Math.max(240, o.measureText(t.text).width + 120), c = r * 4;
    for (let m = s + c / 2; m < e.height + c; m += c)
      for (let b = i + a / 2; b < e.width + a; b += a)
        o.save(), o.translate(b, m), o.rotate(l), o.fillText(t.text, 0, 0), o.restore();
    o.restore();
  }
  /** 取/起一张内嵌图的解码;未缓存则起加载,onload 请求重绘(无 DOM 环境返 null) */
  getCellImageEl(e) {
    const t = this.cellImageCache.get(e);
    if (t) return t;
    if (typeof Image == "undefined") return null;
    const o = new Image();
    return this.cellImageCache.set(e, o), o.onload = () => {
      var i;
      return (i = this.onNeedsRedraw) == null ? void 0 : i.call(this);
    }, o.src = e, o;
  }
  /** 缺图提示(仅画淡图标,**不盖底色** — 让单元格自身填充色透出来) */
  drawImagePlaceholder(e, t, o, i, s) {
    const r = this.ctx, l = Math.min(i * 0.5, 14 * s);
    l < 6 || (r.save(), r.fillStyle = "#c0c6cf", r.font = `${l}px sans-serif`, r.textAlign = "center", r.textBaseline = "middle", r.fillText("🖼", e + o / 2, t + i / 2), r.restore());
  }
  drawCellContent(e, t, o, i, s, r, l, a, c, d) {
    var W;
    const u = this.ctx, h = dt * c, p = e.type === "number" || e.type === "formula" && typeof e.raw == "number";
    if (e.type === "richtext" && e.rich) {
      this.drawRichText(e, t, s, r, l, a, c);
      return;
    }
    const m = to(e.raw, t.numFmt, this.workbook.date1904);
    let b = m.text;
    if (e.type === "hyperlink" && !b && (b = String((W = e.hyperlink) != null ? W : "")), !b) return;
    const v = (d == null ? void 0 : d.fontColor) || m.color || (e.type === "hyperlink" ? this.workbook.themeColors[10] || "#0563C1" : t.font.color);
    let y = Xe(t.font, c);
    d != null && d.bold && !t.font.bold && (y = Xe(K(R({}, t.font), { bold: !0 }), c)), u.font = y, u.fillStyle = v;
    const w = Ui(t.hAlign, p), S = t.textRotation, k = l - h * 2;
    if (S && S !== 0 && S !== 255) {
      this.drawRotatedText(b, t, v, y, s, r, l, a, c);
      return;
    }
    if (S === 255) {
      this.drawVerticalText(b, v, y, s, r, l, a, t);
      return;
    }
    let C = s, M = l;
    if (!t.wrapText && !t.shrinkToFit) {
      const H = In(u, b, y);
      if (H > k) {
        const V = this.spillClip(o, i, s, l, H - k, w);
        C = V.x, M = V.w;
      }
    }
    u.save(), u.beginPath(), u.rect(C, r, M, a), u.clip();
    let E, P = y;
    if (t.wrapText)
      E = $n(u, b, y, k);
    else if (t.shrinkToFit) {
      const H = y0(u, b, y, k);
      H < 1 && (P = Xe(K(R({}, t.font), { size: t.font.size * H }), c)), E = [b];
    } else
      E = [b];
    u.font = P;
    const I = t.font.size * c * (96 / 72) * eo, L = I * E.length, F = a - 2 * h, N = L > F;
    let O;
    t.vAlign === "top" || N ? O = r + h + I * 0.78 : t.vAlign === "middle" ? O = r + (a - L) / 2 + I * 0.78 : O = r + a - h - L + I * 0.78, u.textAlign = "left", u.textBaseline = "alphabetic";
    const D = t.indent * 8 * c;
    for (let H = 0; H < E.length; H++) {
      const V = E[H], Y = In(u, V, P);
      let ee = s + h + D;
      w === "center" ? ee = s + (l - Y) / 2 : w === "right" && (ee = s + l - h - Y);
      const ce = O + H * I;
      u.fillText(V, ee, ce), this.drawTextDecoration(t, v, ee, ce, Y);
    }
    u.restore();
  }
  /**
   * 文本溢出可用的裁剪范围: 从本格向对齐方向延伸，吞掉相邻"空白"格(无值且无填充)。
   * 返回扩展后的 clip x/w(对齐锚点仍用原格，只是裁剪放宽)。
   */
  spillClip(e, t, o, i, s, r) {
    if (this.merges.rangeOf(e, t)) return { x: o, w: i };
    const l = (d, u) => {
      if (u < 0 || u >= this.metrics.cols || this.merges.rangeOf(d, u)) return !1;
      const h = this.sheet.cells.get(X(d, u));
      if (!h) return !0;
      if (h.type !== "empty" && h.raw !== null && h.raw !== "") return !1;
      const p = this.sheet.styles[h.styleId];
      return !p || p.fill.type === "none";
    };
    let a = 0, c = 0;
    if (r === "right") {
      let d = t - 1;
      for (; a < s && l(e, d); )
        a += this.metrics.colWidth(d), d--;
    } else if (r === "center") {
      let d = t - 1, u = t + 1;
      for (; a + c < s; )
        if (c <= a && l(e, u)) c += this.metrics.colWidth(u++);
        else if (c > a && l(e, d)) a += this.metrics.colWidth(d--);
        else if (l(e, u)) c += this.metrics.colWidth(u++);
        else if (l(e, d)) a += this.metrics.colWidth(d--);
        else break;
    } else {
      let d = t + 1;
      for (; c < s && l(e, d); )
        c += this.metrics.colWidth(d), d++;
    }
    return { x: o - a, w: i + a + c };
  }
  drawRichText(e, t, o, i, s, r, l) {
    var F, N;
    const a = this.ctx, c = dt * l, d = e.rich || [], u = t.font, h = Ui(t.hAlign, !1), p = (t.indent || 0) * 8 * l, m = s - 2 * c - (h === "left" ? p : 0);
    let b = 1;
    if (t.shrinkToFit && !t.wrapText && m > 0) {
      let O = 0;
      for (let D = 0; D < d.length; D++)
        a.font = Xe(R(R({}, u), d[D].font), l), O += a.measureText(d[D].text).width;
      O > m && O > 0 && (b = Math.max(0.3, m / O));
    }
    const v = [], y = [], w = [], S = [], k = [];
    for (let O = 0; O < d.length; O++) {
      const D = R(R({}, u), d[O].font), W = ((F = D.size) != null ? F : u.size) * b;
      v[O] = Xe(K(R({}, D), { size: W }), l), y[O] = ((N = d[O].font) == null ? void 0 : N.color) || u.color, w[O] = !!D.underline, S[O] = !!D.strike, k[O] = W * l * (96 / 72);
    }
    const C = (O, D) => ({ text: O, fontCss: v[D], color: y[D], ul: w[D], st: S[D], szPx: k[D] }), M = [];
    if (t.wrapText && m > 0) {
      let O = [], D = 0;
      const W = () => {
        M.push(O), O = [], D = 0;
      };
      for (let H = 0; H < d.length; H++) {
        a.font = v[H];
        for (const V of d[H].text) {
          if (V === `
`) {
            W();
            continue;
          }
          const Y = a.measureText(V).width;
          D + Y > m && D > 0 && W();
          const ee = O[O.length - 1];
          ee && ee.fontCss === v[H] && ee.color === y[H] && ee.ul === w[H] && ee.st === S[H] ? ee.text += V : O.push(C(V, H)), D += Y;
        }
      }
      W();
    } else
      M.push(d.map((O, D) => R({}, C(d[D].text, D))));
    const E = u.size * b * l * (96 / 72) * eo, P = E * M.length, I = P > r - 2 * c;
    let L;
    t.vAlign === "top" || I ? L = i + c + E * 0.78 : t.vAlign === "middle" ? L = i + (r - P) / 2 + E * 0.78 : L = i + r - c - P + E * 0.78, a.save(), a.beginPath(), a.rect(o, i, s, r), a.clip(), a.textBaseline = "alphabetic", a.textAlign = "left";
    for (let O = 0; O < M.length; O++) {
      const D = M[O];
      let W = 0;
      for (const Y of D)
        a.font = Y.fontCss, W += a.measureText(Y.text).width;
      let H = o + c + p;
      h === "center" ? H = o + (s - W) / 2 : h === "right" && (H = o + s - c - W);
      const V = L + O * E;
      for (const Y of D) {
        a.font = Y.fontCss, a.fillStyle = Y.color, a.fillText(Y.text, H, V);
        const ee = a.measureText(Y.text).width;
        if ((Y.ul || Y.st) && (a.strokeStyle = Y.color, a.lineWidth = Math.max(1, Y.szPx / 14), Y.ul && (a.beginPath(), a.moveTo(H, V + 2), a.lineTo(H + ee, V + 2), a.stroke()), Y.st)) {
          const ce = V - Y.szPx * 0.3;
          a.beginPath(), a.moveTo(H, ce), a.lineTo(H + ee, ce), a.stroke();
        }
        if (H += ee, H > o + s + 50) break;
      }
    }
    a.restore();
  }
  drawRotatedText(e, t, o, i, s, r, l, a, c) {
    const d = this.ctx;
    d.save(), d.beginPath(), d.rect(s, r, l, a), d.clip(), d.translate(s + l / 2, r + a / 2), d.rotate(-t.textRotation * Math.PI / 180), d.font = i, d.fillStyle = o, d.textAlign = "center", d.textBaseline = "middle", d.fillText(e, 0, 0), d.restore();
  }
  drawVerticalText(e, t, o, i, s, r, l, a) {
    const c = this.ctx;
    c.save(), c.beginPath(), c.rect(i, s, r, l), c.clip(), c.font = o, c.fillStyle = t, c.textAlign = "center", c.textBaseline = "top";
    const d = [...e], u = parseFloat(o) * 1.05, h = d.length * u;
    let p = s + 3;
    h <= l - 6 && (a.vAlign === "middle" ? p = s + (l - h) / 2 : a.vAlign === "bottom" && (p = s + l - h - 3));
    for (const m of d)
      if (c.fillText(m, i + r / 2, p), p += u, p > s + l) break;
    c.restore();
  }
  drawTextDecoration(e, t, o, i, s) {
    const r = this.ctx;
    if (!(!e.font.underline && !e.font.strike)) {
      if (r.save(), r.strokeStyle = t, r.lineWidth = 1, e.font.underline) {
        const l = Math.round(i + 2) + 0.5;
        r.beginPath(), r.moveTo(o, l), r.lineTo(o + s, l), r.stroke(), e.font.underlineStyle === "double" && (r.beginPath(), r.moveTo(o, l + 2), r.lineTo(o + s, l + 2), r.stroke());
      }
      if (e.font.strike) {
        const l = Math.round(i - e.font.size * 0.35) + 0.5;
        r.beginPath(), r.moveTo(o, l), r.lineTo(o + s, l), r.stroke();
      }
      r.restore();
    }
  }
  // ---------------- 表头 ----------------
  drawHeaders(e, t) {
    const o = this.ctx, i = this.metrics.rowHeaderWidth, s = this.metrics.colHeaderHeight, r = this.freeze.frozenCols, l = this.freeze.frozenRows, a = this.freeze.frozenWidth, c = this.freeze.frozenHeight, d = Math.max(r, this.metrics.colAt(a + t.scrollX)), u = this.metrics.colAt(t.width - i + t.scrollX) + 1, h = Math.max(l, this.metrics.rowAt(c + t.scrollY)), p = this.metrics.rowAt(t.height - s + t.scrollY) + 1;
    o.save(), o.beginPath(), o.rect(i, 0, t.width - i, s), o.clip(), this.drawColHeaderRange(d, u, t.scrollX, i, s), o.restore(), r > 0 && (o.save(), o.beginPath(), o.rect(i, 0, this.freeze.frozenWidth, s), o.clip(), this.drawColHeaderRange(0, r - 1, 0, i, s), o.restore()), o.save(), o.beginPath(), o.rect(0, s, i, t.height - s), o.clip(), this.drawRowHeaderRange(h, p, t.scrollY, i, s), o.restore(), l > 0 && (o.save(), o.beginPath(), o.rect(0, s, i, this.freeze.frozenHeight), o.clip(), this.drawRowHeaderRange(0, l - 1, 0, i, s), o.restore()), o.fillStyle = this.theme.headerBg, o.fillRect(0, 0, i, s), o.strokeStyle = this.theme.headerLine, o.lineWidth = 1, o.strokeRect(0.5, 0.5, i, s);
  }
  drawColHeaderRange(e, t, o, i, s) {
    const r = this.ctx;
    r.textAlign = "center", r.textBaseline = "middle", r.font = "11px Calibri, sans-serif";
    for (let l = e; l <= t; l++) {
      const a = i + this.metrics.colLeft(l) - o, c = this.metrics.colWidth(l);
      c <= 0 || (r.fillStyle = this.theme.headerBg, r.fillRect(a, 0, c, s), r.strokeStyle = this.theme.headerLine, r.lineWidth = 1, r.beginPath(), r.moveTo(Math.round(a) + 0.5, 0), r.lineTo(Math.round(a) + 0.5, s), r.moveTo(a, s - 0.5), r.lineTo(a + c, s - 0.5), r.stroke(), r.fillStyle = this.theme.headerText, r.fillText(Pe(l), a + c / 2, s / 2 + 1));
    }
  }
  drawRowHeaderRange(e, t, o, i, s) {
    const r = this.ctx;
    r.textAlign = "center", r.textBaseline = "middle", r.font = "11px Calibri, sans-serif";
    for (let l = e; l <= t; l++) {
      const a = s + this.metrics.rowTop(l) - o, c = this.metrics.rowHeight(l);
      c <= 0 || (r.fillStyle = this.theme.headerBg, r.fillRect(0, a, i, c), r.strokeStyle = this.theme.headerLine, r.lineWidth = 1, r.beginPath(), r.moveTo(0, Math.round(a) + 0.5), r.lineTo(i, Math.round(a) + 0.5), r.moveTo(i - 0.5, a), r.lineTo(i - 0.5, a + c), r.stroke(), r.fillStyle = this.theme.headerText, r.fillText(String(l + 1), i / 2, a + c / 2 + 1));
    }
  }
  drawFreezeLines(e) {
    const t = this.ctx;
    if (!(this.freeze.frozenCols === 0 && this.freeze.frozenRows === 0)) {
      if (t.save(), t.strokeStyle = "#9AA4AE", t.lineWidth = 1, this.freeze.frozenCols > 0) {
        const o = e.rowHeaderWidth + this.freeze.frozenWidth + 0.5;
        t.beginPath(), t.moveTo(o, 0), t.lineTo(o, t.canvas.height), t.stroke();
      }
      if (this.freeze.frozenRows > 0) {
        const o = e.colHeaderHeight + this.freeze.frozenHeight + 0.5;
        t.beginPath(), t.moveTo(0, o), t.lineTo(t.canvas.width, o), t.stroke();
      }
      t.restore();
    }
  }
  styleOf(e) {
    var s;
    const t = (s = this.sheet.styles[e.styleId]) != null ? s : N0(), o = this.isEditableFn(e.row, e.col);
    let i = t;
    if (this.cellStyleHook) {
      const r = this.cellStyleHook(e, { row: e.row, col: e.col }, { editable: o });
      r && (i = rs(i, r));
    }
    if (!o && this.readOnlyStyleHook) {
      const r = this.readOnlyStyleHook;
      let l;
      r === !0 ? l = { fill: { type: "solid", fgColor: "#f5f7fa" } } : typeof r == "function" ? l = r(e, { row: e.row, col: e.col }, { editable: o }) : r && typeof r == "object" && (l = r), l && (i = rs(i, l));
    }
    return i;
  }
}
function N0() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
function O0(n, e) {
  const t = /^#?([0-9a-f]{6})$/i.exec(n);
  if (!t) return n;
  const o = parseInt(t[1], 16);
  return `rgba(${o >> 16 & 255},${o >> 8 & 255},${o & 255},${e})`;
}
function z0(n, e, t) {
  if (!t.length) return n < e ? [[n, e]] : [];
  const o = [...t].sort((r, l) => r[0] - l[0]), i = [];
  let s = n;
  for (const [r, l] of o) {
    const a = Math.max(r, n), c = Math.min(l, e);
    a > s && i.push([s, a]), c > s && (s = c);
  }
  return s < e && i.push([s, e]), i;
}
function sa(n, e, t, o, i, s) {
  for (const [r, l] of z0(t, o, i))
    l - r <= 1e-4 || (s ? (n.moveTo(e, r), n.lineTo(e, l)) : (n.moveTo(r, e), n.lineTo(l, e)));
}
function H0(n, e, t, o, i, s) {
  const l = t + 2, a = o + 2, c = i - 4, d = s - 4;
  if (c < 4 || d < 3) return;
  const u = e.values, h = u.filter((w) => w !== null);
  if (!h.length) return;
  const p = Math.min(...h), m = Math.max(...h), b = e.color || "#376092", v = e.negativeColor || "#D00000", y = u.length;
  if (n.save(), e.type === "winloss") {
    const w = c / y, S = a + d / 2, k = d * 0.4;
    for (let C = 0; C < y; C++) {
      const M = u[C];
      M == null || M === 0 || (n.fillStyle = M > 0 ? b : v, n.fillRect(l + C * w + w * 0.15, M > 0 ? S - k : S, w * 0.7, k));
    }
  } else if (e.type === "column") {
    const w = Math.max(m, 0), S = Math.min(p, 0), k = w - S || 1, C = a + d * (w / k), M = c / y;
    for (let E = 0; E < y; E++) {
      const P = u[E];
      if (P == null) continue;
      n.fillStyle = P < 0 ? v : b;
      const I = a + d * ((w - P) / k);
      n.fillRect(l + E * M + M * 0.15, Math.min(I, C), M * 0.7, Math.max(1, Math.abs(I - C)));
    }
  } else {
    const w = m - p || 1;
    n.strokeStyle = b, n.lineWidth = 1, n.beginPath();
    let S = !1;
    for (let k = 0; k < y; k++) {
      const C = u[k];
      if (C == null) {
        S = !1;
        continue;
      }
      const M = l + (y === 1 ? c / 2 : k / (y - 1) * c), E = a + d - (C - p) / w * d;
      S ? n.lineTo(M, E) : (n.moveTo(M, E), S = !0);
    }
    n.stroke();
  }
  n.restore();
}
function D0(n, e, t, o, i) {
  const s = o + i / 2, r = t + 7, l = 5;
  if (n.save(), e.setName.includes("TrafficLights") || e.setName.includes("Signs") || e.count === 3 && e.setName.includes("Symbols")) {
    const a = ["#D63B3B", "#E8B53A", "#5B9F4E"];
    n.fillStyle = a[Math.min(e.level, 2)], n.beginPath(), n.arc(r, s, l, 0, Math.PI * 2), n.fill();
  } else if (e.setName.includes("Arrows")) {
    const a = ["#D63B3B", "#E8B53A", "#5B9F4E", "#5B9F4E", "#5B9F4E"];
    n.strokeStyle = a[Math.min(e.level, a.length - 1)], n.fillStyle = n.strokeStyle, n.lineWidth = 2;
    const c = e.level === 0 ? Math.PI / 2 : e.level >= e.count - 1 ? -Math.PI / 2 : 0;
    n.translate(r, s), n.rotate(c), n.beginPath(), n.moveTo(-4, 0), n.lineTo(4, 0), n.moveTo(1, -3), n.lineTo(4, 0), n.lineTo(1, 3), n.stroke();
  } else {
    const a = e.count > 1 ? e.level / (e.count - 1) : 1;
    n.fillStyle = `rgb(${Math.round(214 - 120 * a)},${Math.round(59 + 100 * a)},59)`, n.beginPath(), n.arc(r, s, l, 0, Math.PI * 2), n.fill();
  }
  n.restore();
}
function Bc(n) {
  var r;
  const e = {
    animation: !1,
    title: n.title ? { text: n.title, left: "center", textStyle: { fontSize: 13 } } : void 0,
    legend: n.showLegend ? { bottom: 0, type: "scroll" } : void 0,
    grid: { left: 40, right: 16, top: n.title ? 36 : 16, bottom: n.showLegend ? 32 : 24, containLabel: !0 },
    tooltip: { trigger: n.type === "pie" || n.type === "doughnut" ? "item" : "axis" }
  }, t = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47", "#264478", "#9E480E"];
  if (n.type === "pie" || n.type === "doughnut") {
    const l = n.series[0], a = ((r = l == null ? void 0 : l.values) != null ? r : []).map((c, d) => {
      var u;
      return { name: String((u = n.categories[d]) != null ? u : d + 1), value: c != null ? c : 0 };
    });
    return K(R({}, e), {
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: n.type === "doughnut" ? ["40%", "70%"] : "70%",
          data: a,
          label: { fontSize: 10 }
        }
      ],
      color: t
    });
  }
  if (n.type === "scatter")
    return K(R({}, e), {
      xAxis: { type: "value", scale: !0 },
      yAxis: { type: "value", scale: !0 },
      series: n.series.map((l, a) => ({
        name: l.name,
        type: "scatter",
        data: l.values.map((c, d) => {
          var u;
          return [Number((u = n.categories[d]) != null ? u : d), c];
        }),
        itemStyle: { color: l.color || t[a % t.length] }
      }))
    });
  if (n.type === "radar") {
    const l = n.categories.map((a) => ({ name: String(a) }));
    return K(R({}, e), {
      radar: { indicator: l.length ? l : [{ name: "" }] },
      series: [
        {
          type: "radar",
          data: n.series.map((a, c) => ({
            name: a.name,
            value: a.values.map((d) => d != null ? d : 0),
            itemStyle: { color: a.color || t[c % t.length] }
          }))
        }
      ]
    });
  }
  const o = { type: "category", data: n.categories.map(String), axisLabel: { fontSize: 10 } }, i = { type: "value", axisLabel: { fontSize: 10 } }, s = n.type === "bar" && n.barDirection === "bar";
  return K(R({}, e), {
    xAxis: s ? i : o,
    yAxis: s ? o : i,
    series: n.series.map((l, a) => ({
      name: l.name,
      type: n.type === "line" || n.type === "area" ? "line" : "bar",
      areaStyle: n.type === "area" ? {} : void 0,
      data: l.values.map((c) => c != null ? c : null),
      itemStyle: { color: l.color || t[a % t.length] },
      smooth: !1
    })),
    color: t
  });
}
let _i = null;
async function Wc() {
  return _i || (_i = await import("echarts")), _i;
}
const ra = "position:absolute;background:rgba(255,255,255,0.96);border:1px solid #e2e4e7;box-shadow:0 1px 4px rgba(0,0,0,0.08);", B0 = "display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#6b7785;border-style:dashed;box-sizing:border-box;padding:8px;overflow:hidden;", qc = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
class W0 {
  constructor(e) {
    T(this, "chartInstances", []);
    T(this, "imageEls", []);
    T(this, "chartPlaceholders", []);
    T(this, "shapeEls", []);
    T(this, "pivotButtonEls", []);
    /** 防止异步加载 echarts 期间已切表/重建: build 自增,await 后 token 变了就放弃 */
    T(this, "buildToken", 0);
    /** 当前选中的浮动图 index(-1 无);画选框 + 8 控制点 + 旋转柄(整组随图旋转)。 */
    T(this, "selectedImageIdx", -1);
    T(this, "selWrap", null);
    // 旋转容器 = 选框(rotate 施于此,box+控制点整体转)
    T(this, "selHandles", []);
    T(this, "selRotateHandle", null);
    this.quads = e;
  }
  /** 设选中浮动图(-1 清);实际画/隐藏在下一次 position() 里做。 */
  setSelectedImage(e) {
    this.selectedImageIdx = e;
  }
  container(e) {
    return this.quads[e];
  }
  /** 锚点落在哪个象限(冻结行/列内的钉住,其余随滚动) */
  quadrantOf(e, t) {
    const o = t.freezeGeometry;
    if (!o.frozenRows && !o.frozenCols) return "main";
    const i = Ie(t.metrics, e), s = o.frozenRows > 0 && i.top + i.height <= o.frozenHeight + 0.5, r = o.frozenCols > 0 && i.left + i.width <= o.frozenWidth + 0.5;
    return s && r ? "corner" : s ? "frow" : r ? "fcol" : "main";
  }
  dispose() {
    var e;
    for (const t of this.chartInstances)
      t.inst.dispose(), t.el.remove();
    this.chartInstances = [];
    for (const t of this.chartPlaceholders) t.el.remove();
    this.chartPlaceholders = [];
    for (const t of this.shapeEls) t.el.remove();
    this.shapeEls = [];
    for (const t of this.pivotButtonEls) t.el.remove();
    this.pivotButtonEls = [];
    for (const t of this.imageEls) t.el.remove();
    this.imageEls = [], (e = this.selWrap) == null || e.remove(), this.selWrap = null, this.selHandles = [], this.selRotateHandle = null;
  }
  /** 重建该表全部叠加层(先销毁再挂载),末尾定位一次 */
  async build(e, t, o) {
    var s, r;
    this.dispose();
    const i = ++this.buildToken;
    for (let l = 0; l < e.images.length; l++) {
      const a = e.images[l], c = this.quadrantOf(a, t), d = document.createElement("div");
      d.className = "ov-img-wrap", d.style.cssText = "position:absolute;overflow:hidden;transform-origin:center;pointer-events:none";
      const u = document.createElement("img");
      u.src = a.src, u.draggable = !1, u.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:fill;pointer-events:none", d.appendChild(u), this.container(c).appendChild(d), this.imageEls.push({ el: d, img: u, anchorIdx: l, quad: c });
    }
    for (let l = 0; l < e.shapes.length; l++) {
      const a = e.shapes[l], c = this.quadrantOf(a.anchor, t), d = document.createElement("div");
      d.style.position = "absolute", d.style.boxSizing = "border-box", d.style.pointerEvents = "none", d.style.overflow = "hidden", d.style.display = "flex", d.style.padding = "3px 5px", d.style.alignItems = "center", d.style.justifyContent = a.align === "center" ? "center" : a.align === "right" ? "flex-end" : "flex-start", d.style.whiteSpace = "pre-wrap", d.style.wordBreak = "break-word", d.style.lineHeight = "1.2", a.fillColor && (d.style.background = a.fillColor), a.lineColor && (d.style.border = `1px solid ${a.lineColor}`), a.geom === "roundRect" ? d.style.borderRadius = "8px" : a.geom === "ellipse" && (d.style.borderRadius = "50%"), a.textColor && (d.style.color = a.textColor), a.bold && (d.style.fontWeight = "bold"), d.style.textAlign = (s = a.align) != null ? s : "left", d.textContent = (r = a.text) != null ? r : "", this.container(c).appendChild(d), this.shapeEls.push({ el: d, shapeIdx: l, quad: c });
    }
    if (e.charts.length) {
      let l = null;
      try {
        l = await Wc();
      } catch (a) {
        console.warn("[ooxml-preview] 未能加载 echarts,图表降级为占位提示。请安装依赖: npm i echarts", a);
      }
      if (i !== this.buildToken) return;
      for (const a of e.charts) {
        const c = this.quadrantOf(a.anchor, t);
        if (l) {
          const d = document.createElement("div");
          d.style.cssText = ra, this.container(c).appendChild(d);
          const u = l.init(d);
          try {
            u.setOption(Bc(a));
          } catch (h) {
            console.warn("[ooxml-preview] 图表渲染失败:", h);
          }
          this.chartInstances.push({ el: d, inst: u, spec: a, quad: c, lastW: 0, lastH: 0 });
        } else {
          const d = document.createElement("div");
          d.style.cssText = ra + B0, d.innerHTML = '<div style="font-size:22px;line-height:1">📊</div><div style="margin-top:6px;font-weight:600">图表</div><div style="margin-top:2px;font-size:11px;color:#9aa4ae">渲染需安装 echarts 依赖</div>', this.container(c).appendChild(d), this.chartPlaceholders.push({ el: d, spec: a, quad: c });
        }
      }
    }
    for (let l = 0; l < e.pivotTables.length; l++) {
      const a = e.pivotTables[l];
      for (let c = 0; c < a.buttons.length; c++) {
        const d = a.buttons[c], u = {
          src: "",
          from: { row: d.row, col: d.col, rowOffEmu: 0, colOffEmu: 0 },
          to: { row: d.row + 1, col: d.col + 1, rowOffEmu: 0, colOffEmu: 0 }
        }, h = this.quadrantOf(u, t), p = document.createElement("button");
        p.type = "button", p.className = `ooxml-pivot-button ${d.kind}`, p.title = `${a.name}: ${d.label}`, p.setAttribute("aria-label", `透视表字段 ${d.label}`);
        const m = document.createElement("span");
        m.className = "ooxml-pivot-label", m.textContent = d.label;
        const b = document.createElement("span");
        b.className = "ooxml-pivot-caret", b.textContent = "▾", p.append(m, b), this.container(h).appendChild(p), this.pivotButtonEls.push({ el: p, tableIdx: l, buttonIdx: c, quad: h });
      }
    }
    this.position(e, t, o);
  }
  /** 按当前视图(滚动/缩放)重新定位四象限容器与各叠加层 */
  position(e, t, o) {
    var h;
    const i = t.metrics.rowHeaderWidth, s = t.metrics.colHeaderHeight, r = t.freezeGeometry, l = r.frozenWidth, a = r.frozenHeight, c = Math.max(0, o.width - i - l), d = Math.max(0, o.height - s - a);
    un(this.quads.corner, i, s, l, a), un(this.quads.frow, i + l, s, c, a), un(this.quads.fcol, i, s + a, l, d), un(this.quads.main, i + l, s + a, c, d);
    for (const p of this.imageEls) {
      const m = e.images[p.anchorIdx];
      if (!m) continue;
      const b = this.quadrantOf(m, t);
      b !== p.quad && (this.container(b).appendChild(p.el), p.quad = b), So(p.el, Ie(t.metrics, m), b, l, a, o), p.el.style.transform = m.rotation ? `rotate(${m.rotation}deg)` : "";
      const v = m.crop;
      if (v && (v.l || v.t || v.r || v.b)) {
        const y = Math.max(0.01, 1 - v.l - v.r), w = Math.max(0.01, 1 - v.t - v.b);
        p.img.style.width = `${100 / y}%`, p.img.style.height = `${100 / w}%`, p.img.style.left = `${-v.l / y * 100}%`, p.img.style.top = `${-v.t / w * 100}%`;
      } else
        p.img.style.width = "100%", p.img.style.height = "100%", p.img.style.left = "0", p.img.style.top = "0";
    }
    this.positionSelection(e, t, l, a, o);
    const u = Math.round(11 * (96 / 72) * t.metrics.zoom);
    for (const p of this.shapeEls)
      p.el.style.fontSize = u + "px", So(p.el, Ie(t.metrics, e.shapes[p.shapeIdx].anchor), p.quad, l, a, o);
    for (const p of this.chartInstances) {
      const m = Ie(t.metrics, p.spec.anchor);
      So(p.el, m, p.quad, l, a, o), (p.lastW !== m.width || p.lastH !== m.height) && (p.inst.resize(), p.lastW = m.width, p.lastH = m.height);
    }
    for (const p of this.chartPlaceholders)
      So(p.el, Ie(t.metrics, p.spec.anchor), p.quad, l, a, o);
    for (const p of this.pivotButtonEls) {
      const m = (h = e.pivotTables[p.tableIdx]) == null ? void 0 : h.buttons[p.buttonIdx];
      if (!m) continue;
      const b = q0(t, m.row, m.col);
      So(p.el, b, p.quad, l, a, o);
    }
  }
  /** 选中浮动图的选框 + 8 控制点 + 旋转柄定位(整组放旋转容器里,随图旋转;坐标全 CSS 像素,DPR 无关)。 */
  positionSelection(e, t, o, i, s) {
    const r = this.selectedImageIdx >= 0 ? e.images[this.selectedImageIdx] : null;
    if (!r) {
      this.hideSelection();
      return;
    }
    this.ensureSelEls();
    const l = this.quadrantOf(r, t), a = this.container(l), c = Ie(t.metrics, r), d = l === "main" || l === "frow" ? c.left - o - s.scrollX : c.left, u = l === "main" || l === "fcol" ? c.top - i - s.scrollY : c.top, h = c.width, p = c.height, m = this.selWrap;
    m.parentElement !== a && a.appendChild(m), m.style.left = `${d}px`, m.style.top = `${u}px`, m.style.width = `${h}px`, m.style.height = `${p}px`, m.style.transform = r.rotation ? `rotate(${r.rotation}deg)` : "", m.style.display = "";
    const b = {
      nw: [0, 0],
      n: [h / 2, 0],
      ne: [h, 0],
      e: [h, p / 2],
      se: [h, p],
      s: [h / 2, p],
      sw: [0, p],
      w: [0, p / 2]
    };
    for (const { el: v, dir: y } of this.selHandles) {
      const [w, S] = b[y];
      v.style.left = `${w - 5}px`, v.style.top = `${S - 5}px`;
    }
    this.selRotateHandle.style.left = `${h / 2 - 6}px`, this.selRotateHandle.style.top = "-26px";
  }
  ensureSelEls() {
    if (this.selWrap) return;
    const e = document.createElement("div");
    e.className = "ov-img-selbox", e.style.cssText = "position:absolute;box-sizing:border-box;border:1.5px solid #217346;pointer-events:none;transform-origin:center;z-index:2;", this.selWrap = e;
    for (const o of qc) {
      const i = document.createElement("div");
      i.className = "ov-img-handle ov-img-handle-" + o, i.style.cssText = "position:absolute;width:8px;height:8px;background:#fff;border:1.5px solid #217346;border-radius:1px;pointer-events:none;", e.appendChild(i), this.selHandles.push({ el: i, dir: o });
    }
    const t = document.createElement("div");
    t.className = "ov-img-rotate", t.style.cssText = "position:absolute;width:11px;height:11px;background:#fff;border:1.5px solid #217346;border-radius:50%;pointer-events:none;", e.appendChild(t), this.selRotateHandle = t;
  }
  hideSelection() {
    this.selWrap && (this.selWrap.style.display = "none");
  }
}
function q0(n, e, t) {
  return {
    left: n.metrics.colLeft(t),
    top: n.metrics.rowTop(e),
    width: n.metrics.colWidth(t),
    height: n.metrics.rowHeight(e)
  };
}
function un(n, e, t, o, i) {
  n.style.left = e + "px", n.style.top = t + "px", n.style.width = Math.max(0, o) + "px", n.style.height = Math.max(0, i) + "px";
}
function So(n, e, t, o, i, s) {
  const r = t === "main" || t === "frow" ? e.left - o - s.scrollX : e.left, l = t === "main" || t === "fcol" ? e.top - i - s.scrollY : e.top;
  n.style.left = r + "px", n.style.top = l + "px", n.style.width = e.width + "px", n.style.height = e.height + "px";
}
function U0(n, e) {
  var s, r, l, a, c, d;
  if (!e || !((s = e.images) != null && s.length) && !((r = e.charts) != null && r.length) && !((l = e.shapes) != null && l.length)) return;
  const t = n.canvas.getContext("2d");
  if (!t) return;
  const o = n.scale, i = (u) => ({
    x: (n.originX + u.left - n.gridOriginX) * o,
    y: (n.originY + u.top - n.gridOriginY) * o,
    w: u.width * o,
    h: u.height * o
  });
  t.save();
  for (const u of (a = e.images) != null ? a : []) {
    const h = i(Ie(n.metrics, u.anchor));
    try {
      t.drawImage(u.source, h.x, h.y, h.w, h.h);
    } catch (p) {
    }
  }
  for (const u of (c = e.charts) != null ? c : []) {
    const h = i(Ie(n.metrics, u.anchor));
    try {
      t.drawImage(u.source, h.x, h.y, h.w, h.h);
    } catch (p) {
    }
  }
  for (const u of (d = e.shapes) != null ? d : [])
    _0(t, u, i(Ie(n.metrics, u.anchor)), o);
  t.restore();
}
function _0(n, e, t, o) {
  const { x: i, y: s, w: r, h: l } = t;
  if (n.save(), n.beginPath(), e.geom === "ellipse" ? n.ellipse(i + r / 2, s + l / 2, r / 2, l / 2, 0, 0, Math.PI * 2) : e.geom === "roundRect" ? j0(n, i, s, r, l, 8 * o) : n.rect(i, s, r, l), e.fillColor && (n.fillStyle = e.fillColor, n.fill()), e.lineColor && (n.strokeStyle = e.lineColor, n.lineWidth = Math.max(1, o), n.stroke()), e.text) {
    n.clip(), n.fillStyle = e.textColor || "#000000";
    const a = 11 * (96 / 72) * o;
    n.font = `${e.bold ? "bold " : ""}${a}px Calibri, sans-serif`, n.textBaseline = "middle", n.textAlign = e.align === "center" ? "center" : e.align === "right" ? "right" : "left";
    const c = e.align === "center" ? i + r / 2 : e.align === "right" ? i + r - 5 * o : i + 5 * o, d = e.text.split(`
`), u = a * 1.2;
    let h = s + l / 2 - (d.length - 1) * u / 2;
    for (const p of d)
      n.fillText(p, c, h), h += u;
  }
  n.restore();
}
function j0(n, e, t, o, i, s) {
  const r = Math.min(s, o / 2, i / 2);
  n.moveTo(e + r, t), n.arcTo(e + o, t, e + o, t + i, r), n.arcTo(e + o, t + i, e, t + i, r), n.arcTo(e, t + i, e, t, r), n.arcTo(e, t, e + o, t, r), n.closePath();
}
function la(n, e) {
  const t = [];
  if (e >= n) return [{ s: 0, len: n }];
  for (let o = 0; o < n - 0.5; o += e) {
    const i = Math.round(o), s = Math.min(Math.round(e), n - i);
    if (s < 1 || (t.push({ s: i, len: s }), t.length > 5e3)) break;
  }
  return t;
}
function Fs(n, e, t, o) {
  const i = n.width, s = n.height;
  if (i < 1 || s < 1 || e < 1 || t < 1) return [];
  const r = o.zoom && o.zoom > 0 ? o.zoom : 1, l = e * pt, a = t * pt, c = o.repeatLeft ? o.repeatLeft.canvas.width : 0, d = o.repeatTop ? o.repeatTop.canvas.height : 0, u = o.repeatLeft ? o.repeatLeft.widthCss : 0, h = o.repeatTop ? o.repeatTop.heightCss : 0;
  let p;
  if (o.fitToWidth) {
    const L = e + u;
    p = L > 0 ? o.contentWmm / (L * pt) : 1;
  } else
    p = r;
  const m = pt * p, b = u * m, v = h * m, y = Math.max(1, o.contentWmm - b), w = Math.max(1, o.contentHmm - v), S = l * p, k = a * p;
  if (S < 0.01 || k < 0.01) return [];
  const C = o.fitToWidth ? i : Math.max(1, y / S * i), M = Math.max(1, w / k * s), E = la(i, C), P = la(s, M), I = [];
  for (const L of E)
    for (const F of P) {
      const N = document.createElement("canvas");
      N.width = c + L.len, N.height = d + F.len;
      const O = N.getContext("2d");
      O && (o.corner && c && d && O.drawImage(o.corner.canvas, 0, 0, c, d, 0, 0, c, d), o.repeatTop && d && O.drawImage(o.repeatTop.canvas, L.s, 0, L.len, d, c, 0, L.len, d), o.repeatLeft && c && O.drawImage(o.repeatLeft.canvas, 0, F.s, c, F.len, 0, d, c, F.len), O.drawImage(n, L.s, F.s, L.len, F.len, c, d, L.len, F.len), I.push({
        canvas: N,
        widthMm: b + L.len / i * S,
        heightMm: v + F.len / s * k
      }));
    }
  return I;
}
async function V0() {
  var n;
  try {
    const e = await import(
      /* @vite-ignore */
      "./jspdf.es.min-BVEV1LX3.js"
    ).then((t) => t.j);
    return e.jsPDF || ((n = e.default) == null ? void 0 : n.jsPDF) || e.default || e;
  } catch (e) {
    throw new Error("PDF 导出需要可选依赖 jspdf,请先安装: npm i jspdf (" + e.message + ")");
  }
}
async function Y0(n, e = {}) {
  var m;
  if (!n.length) throw new Error("没有可导出的工作表");
  const t = await V0(), [o, i] = Bn(e.format, e.orientation), s = Wn(e.margin), r = Math.max(1, o - s.left - s.right), l = Math.max(1, i - s.top - s.bottom), a = (m = e.fitToWidth) != null ? m : !0, c = n.map((b) => ({
    sheet: b,
    pages: Fs(b.canvas, b.bodyWcss, b.bodyHcss, {
      contentWmm: r,
      contentHmm: l,
      fitToWidth: a,
      zoom: b.zoom,
      repeatTop: b.repeatTop,
      repeatLeft: b.repeatLeft,
      corner: b.corner
    })
  })), d = c.reduce((b, v) => b + Math.max(v.pages.length, 0), 0) || 1, u = new t({ unit: "mm", format: [o, i], orientation: "portrait" });
  let h = 0, p = !0;
  for (let b = 0; b < c.length; b++) {
    const { sheet: v, pages: y } = c[b];
    if (y.length)
      for (const w of y) {
        p || u.addPage([o, i], "portrait"), p = !1;
        const S = w.canvas.toDataURL("image/png");
        if (u.addImage(S, "PNG", s.left, s.top, w.widthMm, w.heightMm, void 0, "FAST"), e.beforeRenderPage) {
          const k = {
            doc: u,
            pageIndex: h,
            pageCount: d,
            sheetName: v.sheetName,
            sheetIndex: b,
            pageWidth: o,
            pageHeight: i,
            margin: s
          };
          try {
            e.beforeRenderPage(k);
          } catch (C) {
            console.warn("[ooxml-preview] beforeRenderPage 抛错:", C);
          }
        }
        h++;
      }
  }
  return u.output("blob");
}
async function G0() {
  var n;
  try {
    const e = await import(
      /* @vite-ignore */
      "./jspdf.es.min-BVEV1LX3.js"
    ).then((t) => t.j);
    return e.jsPDF || ((n = e.default) == null ? void 0 : n.jsPDF) || e.default || e;
  } catch (e) {
    throw new Error("矢量 PDF 导出需要可选依赖 jspdf,请先安装: npm i jspdf (" + e.message + ")");
  }
}
const X0 = /* @__PURE__ */ new Set(["helvetica", "times", "courier", "symbol", "zapfdingbats"]);
function K0(n) {
  for (let e = 0; e < n.length; e++) if (n.charCodeAt(e) > 592) return !0;
  return !1;
}
function Io(n) {
  const e = /^#?([0-9a-f]{6})$/i.exec(n);
  if (!e) return [0, 0, 0];
  const t = parseInt(e[1], 16);
  return [t >> 16 & 255, t >> 8 & 255, t & 255];
}
const J0 = { thin: 0.2, hair: 0.1, medium: 0.45, thick: 0.7, double: 0.45 };
async function Z0(n, e = {}) {
  var y, w;
  if (!n.length) throw new Error("没有可导出的工作表");
  const t = await G0(), [o, i] = Bn(e.format, e.orientation), s = Wn(e.margin), r = Math.max(1, o - s.left - s.right), l = Math.max(1, i - s.top - s.bottom), a = (y = e.fitToWidth) != null ? y : !0, c = new t({ unit: "mm", format: [o, i], orientation: "portrait" });
  if (e.configureDoc)
    try {
      e.configureDoc(c);
    } catch (S) {
      console.warn("[ooxml-preview] configureDoc 抛错:", S);
    }
  const d = (((w = c.getFont) == null ? void 0 : w.call(c)) || {}).fontName || "helvetica", u = !X0.has(String(d).toLowerCase()), h = u ? d : "helvetica", p = n.map((S) => ey(S, { contentWmm: r, contentHmm: l, fitToWidth: a })), m = p.reduce((S, k) => S + k.pages.length, 0) || 1;
  let b = 0, v = !0;
  for (let S = 0; S < n.length; S++) {
    const k = n[S], C = p[S];
    for (const M of C.pages)
      v || c.addPage([o, i], "portrait"), v = !1, ty(c, k, C, M, s, h, u), Q0(e.beforeRenderPage, {
        doc: c,
        pageIndex: b,
        pageCount: m,
        sheetName: k.sheetName,
        sheetIndex: S,
        pageWidth: o,
        pageHeight: i,
        margin: s
      }), b++;
  }
  return c.output("blob");
}
function Q0(n, e) {
  if (n)
    try {
      n(e);
    } catch (t) {
      console.warn("[ooxml-preview] beforeRenderPage 抛错:", t);
    }
}
function aa(n, e, t) {
  const o = [];
  let i = [], s = 0;
  for (const r of n) {
    const l = e(r);
    i.length && s + l > t && (o.push(i), i = [], s = 0), i.push(r), s += l;
  }
  return i.length && o.push(i), o.length || o.push([]), o;
}
function ey(n, e) {
  const t = n.metrics, o = t.colLeft(n.bodyRight + 1) - t.colLeft(n.bodyLeft), i = n.titleCols ? fn(n.titleCols[0], n.titleCols[1]) : [], s = n.titleRows ? fn(n.titleRows[0], n.titleRows[1]) : [], r = i.reduce((S, k) => S + t.colWidth(k), 0), l = n.zoom && n.zoom > 0 ? n.zoom : 1, a = e.fitToWidth ? (o + r) * pt > 0 ? e.contentWmm / ((o + r) * pt) : 1 : l, c = pt * a, d = r * c, u = s.reduce((S, k) => S + t.rowHeight(k) * c, 0), h = Math.max(1, e.contentWmm - d), p = Math.max(1, e.contentHmm - u), m = fn(n.bodyLeft, n.bodyRight), b = fn(n.bodyTop, n.bodyBottom), v = e.fitToWidth ? [m] : aa(m, (S) => t.colWidth(S) * c, h), y = aa(b, (S) => t.rowHeight(S) * c, p), w = [];
  for (const S of v) for (const k of y) w.push({ cols: S, rows: k });
  return { mmPerCss: c, titleColCols: i, titleRowRows: s, titleColWmm: d, titleRowHmm: u, pages: w };
}
function ty(n, e, t, o, i, s, r) {
  var C, M;
  const l = e.metrics, { mmPerCss: a, titleColCols: c, titleRowRows: d, titleColWmm: u, titleRowHmm: h } = t, p = i.left + u, m = i.top + h, b = (E) => {
    var P;
    return p + (l.colLeft(E) - l.colLeft((P = o.cols[0]) != null ? P : e.bodyLeft)) * a;
  }, v = (E) => {
    var P;
    return m + (l.rowTop(E) - l.rowTop((P = o.rows[0]) != null ? P : e.bodyTop)) * a;
  }, y = (E) => {
    var P;
    return i.left + (l.colLeft(E) - l.colLeft((P = c[0]) != null ? P : 0)) * a;
  }, w = (E) => {
    var P;
    return i.top + (l.rowTop(E) - l.rowTop((P = d[0]) != null ? P : 0)) * a;
  }, S = { doc: n, vs: e, baseFont: s, customFont: r, mmPerCss: a };
  hn(S, o.rows, o.cols, b, v), d.length && hn(S, d, o.cols, b, w), c.length && hn(S, o.rows, c, y, v), d.length && c.length && hn(S, d, c, y, w);
  const k = new Set(o.rows);
  for (const E of e.images) {
    const P = E.anchor.from.row, I = E.anchor.from.col;
    if (!k.has(P) || I < ((C = o.cols[0]) != null ? C : 0) || I > ((M = o.cols[o.cols.length - 1]) != null ? M : -1)) continue;
    const L = Ie(l, E.anchor), F = p + (L.left - l.colLeft(o.cols[0])) * a, N = m + (L.top - l.rowTop(o.rows[0])) * a;
    try {
      const O = ry(E.source);
      O && n.addImage(O, "PNG", F, N, L.width * a, L.height * a, void 0, "FAST");
    } catch (O) {
    }
  }
}
function hn(n, e, t, o, i) {
  const { doc: s, vs: r, baseFont: l, customFont: a, mmPerCss: c } = n;
  if (!e.length || !t.length) return;
  const d = r.metrics, u = ly(r.merges), h = ay(r.merges);
  t[0];
  const p = t[t.length - 1];
  r.gridlines && iy(s, d, e, t, o, i, c);
  for (const m of e) {
    const b = i(m);
    for (let v = 0; v < t.length; v++) {
      const y = t[v], w = m + ":" + y;
      if (u.has(w) && !h.has(w)) continue;
      const S = h.get(w), k = S ? Math.min(S.right, p) : y, C = S ? S.bottom : m, M = o(y), E = (d.colLeft(k + 1) - d.colLeft(y)) * c, P = (d.rowTop(C + 1) - d.rowTop(m)) * c, I = r.getCell(m, y);
      if (I && (I.complex || !a && K0(I.text) ? sy(s, r, m, y, k, C, M, b, E, P) : oy(s, I, M, b, E, P, c, l, a)), S && S.right > y)
        for (; v < t.length - 1 && t[v + 1] <= S.right; ) v++;
    }
  }
}
function fn(n, e) {
  const t = [];
  for (let o = n; o <= e; o++) t.push(o);
  return t;
}
function oy(n, e, t, o, i, s, r, l, a) {
  const c = e.style;
  if (c.fill.type === "solid" && c.fill.fgColor) {
    const [I, L, F] = Io(c.fill.fgColor);
    n.setFillColor(I, L, F), n.rect(t, o, i, s, "F");
  }
  const d = e.effect;
  if (d != null && d.fillColor) {
    const [I, L, F] = Io(d.fillColor);
    n.setFillColor(I, L, F), n.rect(t, o, i, s, "F");
  }
  if (d != null && d.dataBar) {
    const I = Math.max(0, (i - 2 * r) * d.dataBar.ratio);
    if (I > 0) {
      const [L, F, N] = Io(d.dataBar.color);
      n.setFillColor(L, F, N), n.rect(t + r, o + r, I, s - 2 * r, "F");
    }
  }
  Xt(n, c.borders.top, t, o, t + i, o), Xt(n, c.borders.bottom, t, o + s, t + i, o + s), Xt(n, c.borders.left, t, o, t, o + s), Xt(n, c.borders.right, t + i, o, t + i, o + s), c.borders.diagonal && (c.borders.diagonalDown || c.borders.diagonalUp) && (c.borders.diagonalDown && Xt(n, c.borders.diagonal, t, o, t + i, o + s), c.borders.diagonalUp && Xt(n, c.borders.diagonal, t, o + s, t + i, o));
  let u = 0;
  d != null && d.icon && (ny(n, d.icon, t + 1.5 * r, o + s / 2, Math.min(s * 0.32, 2.2 * r)), u = 5 * r);
  const h = e.text;
  if (!h) return;
  const p = 2 * r;
  try {
    n.setFont(l, !a && e.bold ? "bold" : "normal");
  } catch (I) {
    n.setFont(l, "normal");
  }
  n.setFontSize(c.font.size * (r / pt));
  const [m, b, v] = Io(e.color);
  n.setTextColor(m, b, v);
  const y = /^[\s\d.,%$()+\-eE/]+$/.test(h), w = c.hAlign === "general" ? y ? "right" : "left" : c.hAlign;
  let S, k = "left";
  w === "center" ? (S = t + i / 2, k = "center") : w === "right" ? (S = t + i - p, k = "right") : S = t + p + u + (c.indent || 0) * 8 * r;
  let C, M, E = !1;
  if (c.wrapText) {
    const I = c.font.size * (r / pt);
    try {
      n.splitTextToSize(h, Math.max(1, i - 2 * p)).length * I * 1.15 > s - 2 * p && (E = !0);
    } catch (L) {
    }
  }
  c.vAlign === "top" || E ? (C = o + p, M = "top") : c.vAlign === "middle" ? (C = o + s / 2, M = "middle") : (C = o + s - p, M = "bottom");
  const P = { align: k, baseline: M };
  c.wrapText && (P.maxWidth = Math.max(1, i - 2 * p));
  try {
    n.text(h, S, C, P);
  } catch (I) {
  }
}
function ny(n, e, t, o, i) {
  const s = e.setName || "";
  if (s.includes("Arrows")) {
    const c = [
      [214, 59, 59],
      [232, 181, 58],
      [91, 159, 78]
    ], d = e.level === 0 ? 0 : e.level >= e.count - 1 ? 2 : 1, [u, h, p] = c[d];
    if (n.setDrawColor(u, h, p), n.setLineWidth(i * 0.35), d === 1)
      n.line(t - i, o, t + i, o);
    else {
      const m = d === 0 ? i : -i;
      n.line(t, o - m, t, o + m), n.line(t, o + m, t - i * 0.6, o + m - Math.sign(m) * i * 0.6), n.line(t, o + m, t + i * 0.6, o + m - Math.sign(m) * i * 0.6);
    }
    return;
  }
  const r = [
    [214, 59, 59],
    [232, 181, 58],
    [91, 159, 78]
  ], l = e.count > 1 ? e.level / (e.count - 1) : 1;
  let a;
  s.includes("TrafficLights") || s.includes("Signs") || s.includes("Symbols") ? a = r[Math.min(e.level, 2)] : a = [Math.round(214 - 123 * l), Math.round(59 + 100 * l), 59], n.setFillColor(a[0], a[1], a[2]), n.circle(t, o, i, "F");
}
function Xt(n, e, t, o, i, s) {
  var d;
  if (!e || !e.style || e.style === "none") return;
  const [r, l, a] = Io(e.color || "#000000");
  n.setDrawColor(r, l, a);
  const c = (d = J0[e.style]) != null ? d : 0.2;
  if (e.style === "double") {
    n.setLineWidth(Math.max(0.1, c * 0.5));
    const u = i - t, h = s - o, p = Math.hypot(u, h) || 1, m = Math.max(0.18, c * 0.6), b = -h / p * m, v = u / p * m;
    n.line(t + b, o + v, i + b, s + v), n.line(t - b, o - v, i - b, s - v);
    return;
  }
  n.setLineWidth(c), n.line(t, o, i, s);
}
function iy(n, e, t, o, i, s, r) {
  n.setDrawColor(224, 226, 229), n.setLineWidth(0.1);
  const l = o[0], a = o[o.length - 1], c = t[0], d = t[t.length - 1], u = i(l), h = i(a) + e.colWidth(a) * r, p = s(c), m = s(d) + e.rowHeight(d) * r;
  for (const b of t) n.line(u, s(b), h, s(b));
  n.line(u, m, h, m);
  for (const b of o) n.line(i(b), p, i(b), m);
  n.line(h, p, h, m);
}
function sy(n, e, t, o, i, s, r, l, a, c) {
  const d = e.metrics, u = (d.colLeft(o) - d.colLeft(e.rasterLeft)) * e.rasterScale, h = (d.rowTop(t) - d.rowTop(e.rasterTop)) * e.rasterScale, p = (d.colLeft(i + 1) - d.colLeft(o)) * e.rasterScale, m = (d.rowTop(s + 1) - d.rowTop(t)) * e.rasterScale;
  if (p < 1 || m < 1) return;
  const b = document.createElement("canvas");
  b.width = Math.round(p), b.height = Math.round(m);
  const v = b.getContext("2d");
  if (v)
    try {
      v.drawImage(e.rasterCanvas, Math.round(u), Math.round(h), b.width, b.height, 0, 0, b.width, b.height), n.addImage(b.toDataURL("image/png"), "PNG", r, l, a, c, void 0, "FAST");
    } catch (y) {
    }
}
function ry(n) {
  if (typeof HTMLCanvasElement != "undefined" && n instanceof HTMLCanvasElement) return n.toDataURL("image/png");
  if (typeof HTMLImageElement != "undefined" && n instanceof HTMLImageElement) {
    const e = document.createElement("canvas");
    e.width = n.naturalWidth || n.width, e.height = n.naturalHeight || n.height;
    const t = e.getContext("2d");
    if (!t) return null;
    try {
      return t.drawImage(n, 0, 0), e.toDataURL("image/png");
    } catch (o) {
      return null;
    }
  }
  return null;
}
function ly(n) {
  const e = /* @__PURE__ */ new Set();
  for (const t of n)
    for (let o = t.top; o <= t.bottom; o++) for (let i = t.left; i <= t.right; i++) e.add(o + ":" + i);
  return e;
}
function ay(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) e.set(t.top + ":" + t.left, t);
  return e;
}
function cy(n, e = {}) {
  var p;
  if (!n.length) return;
  const [t, o] = Bn(e.format, e.orientation), i = Wn(e.margin), s = Math.max(1, t - i.left - i.right), r = Math.max(1, o - i.top - i.bottom), l = (p = e.fitToWidth) != null ? p : !0, a = e.title || "打印", c = [];
  for (const m of n) {
    const b = Fs(m.canvas, m.bodyWcss, m.bodyHcss, {
      contentWmm: s,
      contentHmm: r,
      fitToWidth: l,
      zoom: m.zoom,
      repeatTop: m.repeatTop,
      repeatLeft: m.repeatLeft,
      corner: m.corner
    });
    for (const v of b)
      c.push(
        '<div class="page">' + (e.headerHtml ? `<div class="hdr">${e.headerHtml}</div>` : "") + `<img src="${v.canvas.toDataURL("image/png")}" style="width:${v.widthMm}mm;height:${v.heightMm}mm" />` + (e.footerHtml ? `<div class="ftr">${e.footerHtml}</div>` : "") + "</div>"
      );
  }
  if (!c.length) return;
  const d = `<!doctype html><html><head><meta charset="utf-8"><title>${dy(a)}</title><style>@page{size:${t}mm ${o}mm;margin:${i.top}mm ${i.right}mm ${i.bottom}mm ${i.left}mm}*{box-sizing:border-box}body{margin:0;font-family:Calibri,Arial,sans-serif}.page{page-break-after:always;break-after:page;overflow:hidden}.page:last-child{page-break-after:auto;break-after:auto}img{display:block}.hdr{font-size:11px;color:#555;margin-bottom:4px}.ftr{font-size:11px;color:#555;margin-top:4px}</style></head><body>${c.join("")}</body></html>`, u = window.open("", "_blank");
  if (!u) {
    console.warn("[ooxml-preview] 打印窗口被浏览器拦截,请允许弹窗");
    return;
  }
  u.document.open(), u.document.write(d), u.document.close();
  const h = () => {
    u.focus(), u.print();
  };
  u.document.readyState === "complete" ? setTimeout(h, 200) : u.onload = () => setTimeout(h, 200);
}
function dy(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function uy(n) {
  if (n == null) return "";
  const e = n instanceof Date ? n.toISOString() : String(n);
  return /[",\n\r]/.test(e) ? '"' + e.replace(/"/g, '""') + '"' : e;
}
function hy(n, e = {}) {
  var o, i;
  return rc(n, { format: (o = e.format) != null ? o : !0, date1904: (i = e.date1904) != null ? i : !1 }).map((s) => s.map(uy).join(",")).join(`\r
`);
}
function fy(n, e = {}) {
  return JSON.stringify(yg(n, R({ format: !1, date1904: n.date1904 }, e)), null, 2);
}
const py = "application/vnd.wps-officedocument.cellimage+xml", gy = "http://www.wps.cn/officeDocument/2020/cellImage", my = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
function by(n, e) {
  const t = { cx: 990600, cy: 990600 };
  if (e !== "image/png" || !n || n.length < 24) return t;
  const o = new DataView(n.buffer, n.byteOffset, n.byteLength);
  if (o.getUint32(0) !== 2303741511) return t;
  const i = o.getUint32(16), s = o.getUint32(20);
  return !i || !s ? t : { cx: i * 9525, cy: s * 9525 };
}
const ji = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/svg+xml": "svg",
  "image/webp": "webp"
};
function yy(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Co(n, e, t) {
  const o = new Uint8Array(t.byteLength);
  o.set(t), n[e] = o;
}
function vy(n, e) {
  const t = e.cellImages;
  if (!t || t.size === 0) return n;
  const o = Array.from(t.values()).filter((c) => c.bytes && c.bytes.length && c.mime && ji[c.mime]);
  if (o.length === 0) return n;
  const i = Mt(n), s = [], r = [];
  o.forEach((c, d) => {
    const u = d + 1, h = ji[c.mime], p = `cellimage${u}.${h}`;
    Co(i, `xl/media/${p}`, c.bytes);
    const m = `rId${u}`;
    s.push(`<Relationship Id="${m}" Type="${my}" Target="media/${p}"/>`);
    const { cx: b, cy: v } = by(c.bytes, c.mime);
    r.push(
      `<etc:cellImage><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="${u}" name="${yy(c.id)}" descr="img"/><xdr:cNvPicPr/></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="${m}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${b}" cy="${v}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic></etc:cellImage>`
    );
  }), Co(
    i,
    "xl/cellimages.xml",
    Je(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<etc:cellImages xmlns:etc="http://www.wps.cn/officeDocument/2017/etCustomData" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` + r.join("") + "</etc:cellImages>"
    )
  ), Co(
    i,
    "xl/_rels/cellimages.xml.rels",
    Je(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` + s.join("") + "</Relationships>"
    )
  );
  const l = "[Content_Types].xml";
  if (i[l]) {
    let c = xe(i[l]);
    const d = /* @__PURE__ */ new Map();
    for (const h of o) d.set(ji[h.mime], h.mime);
    let u = "";
    for (const [h, p] of d)
      new RegExp(`Extension="${h}"`, "i").test(c) || (u += `<Default Extension="${h}" ContentType="${p}"/>`);
    c.includes("/xl/cellimages.xml") || (u += `<Override PartName="/xl/cellimages.xml" ContentType="${py}"/>`), u && (c = c.replace("</Types>", u + "</Types>")), Co(i, l, Je(c));
  }
  const a = "xl/_rels/workbook.xml.rels";
  if (i[a]) {
    let c = xe(i[a]);
    if (!c.includes("cellimages.xml")) {
      let d = 0;
      for (const h of c.matchAll(/Id="rId(\d+)"/g)) d = Math.max(d, Number(h[1]));
      const u = `rId${d + 1}`;
      c = c.replace(
        "</Relationships>",
        `<Relationship Id="${u}" Type="${gy}" Target="cellimages.xml"/></Relationships>`
      ), Co(i, a, Je(c));
    }
  }
  return Oo(i);
}
const xy = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", wy = { "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif", "image/bmp": "bmp" };
function ky(n, e, t) {
  const o = new Uint8Array(t.byteLength);
  o.set(t), n[e] = o;
}
function Sy(n) {
  const e = new RegExp("^data:([^;,]+)(?:;base64)?,(.*)$", "s").exec(n);
  if (!e) return null;
  try {
    const t = atob(e[2]), o = new Uint8Array(t.length);
    for (let i = 0; i < t.length; i++) o[i] = t.charCodeAt(i);
    return { bytes: o, mime: e[1] };
  } catch (t) {
    return null;
  }
}
function Cy(n) {
  let e = 0;
  for (const t of n.matchAll(/Id="rId(\d+)"/g)) e = Math.max(e, Number(t[1]));
  return "rId" + (e + 1);
}
function ca(n) {
  const e = /sheet(\d+)\.xml$/.exec(n);
  return e ? Number(e[1]) : 0;
}
function Ey(n) {
  var l, a, c;
  const e = "xl/workbook.xml", t = "xl/_rels/workbook.xml.rels";
  if (!n[e] || !n[t]) return null;
  const o = xe(n[e]), i = xe(n[t]), s = {};
  for (const d of i.matchAll(/<Relationship\b[^>]*\bId="([^"]+)"[^>]*\bTarget="([^"]+)"[^>]*\/?>/g)) {
    let u = d[2].replace(/^\//, "");
    u.startsWith("xl/") || (u = "xl/" + u), s[d[1]] = u;
  }
  const r = [];
  for (const d of o.matchAll(/<sheet\b[^>]*\/?>/g)) {
    const u = (c = (l = /\br:id="([^"]+)"/.exec(d[0])) == null ? void 0 : l[1]) != null ? c : (a = /\br:embed="([^"]+)"/.exec(d[0])) == null ? void 0 : a[1], h = u ? s[u] : void 0;
    if (!h || !n[h]) return null;
    r.push(h);
  }
  return r.length ? r : null;
}
function Ty(n, e) {
  var a, c;
  const t = e.sheets.map((d, u) => ({ s: d, i: u })).filter(({ s: d }) => {
    var u;
    return d.background && (d.background.bytes || ((u = d.background.src) == null ? void 0 : u.startsWith("data:")));
  });
  if (!t.length) return n;
  const o = Mt(n), i = (a = Ey(o)) != null ? a : Object.keys(o).filter((d) => /^xl\/worksheets\/sheet\d+\.xml$/.test(d)).sort((d, u) => ca(d) - ca(u)), s = /* @__PURE__ */ new Set();
  let r = Object.keys(o).filter((d) => /^xl\/media\//.test(d)).length;
  for (const { s: d, i: u } of t) {
    const h = i[u];
    if (!h) continue;
    const p = d.background;
    let m = p.bytes, b = p.mime;
    if (!m && ((c = p.src) != null && c.startsWith("data:"))) {
      const M = Sy(p.src);
      M && (m = M.bytes, b = b || M.mime);
    }
    if (!m) continue;
    const v = wy[(b || "image/png").toLowerCase()] || "png";
    s.add(v), r++;
    const y = `wsbg${r}.${v}`;
    ky(o, `xl/media/${y}`, m);
    const w = h.replace("xl/worksheets/", "xl/worksheets/_rels/") + ".rels";
    let S = o[w] ? xe(o[w]) : `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;
    const k = Cy(S);
    S = S.replace("</Relationships>", `<Relationship Id="${k}" Type="${xy}" Target="../media/${y}"/></Relationships>`), o[w] = Je(S);
    let C = xe(o[h]);
    C = C.replace(/<picture[^>]*\/>/g, ""), C = C.replace("</worksheet>", `<picture r:id="${k}"/></worksheet>`), o[h] = Je(C);
  }
  const l = "[Content_Types].xml";
  if (o[l]) {
    let d = xe(o[l]);
    for (const u of s)
      if (!new RegExp(`Extension="${u}"`, "i").test(d)) {
        const h = u === "jpg" ? "image/jpeg" : `image/${u}`;
        d = d.replace("</Types>", `<Default Extension="${u}" ContentType="${h}"/></Types>`);
      }
    o[l] = Je(d);
  }
  return Oo(o);
}
const Vi = "xl/workbook.xml";
function My(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Iy(n, e) {
  const t = e.protection;
  if (!t || !t.lockStructure && !t.lockWindows) return n;
  let o;
  try {
    o = Mt(n);
  } catch (d) {
    return n;
  }
  if (!o[Vi]) return n;
  let i = xe(o[Vi]);
  if (/<workbookProtection\b/.test(i)) return n;
  const s = [];
  if (t.lockStructure && s.push('lockStructure="1"'), t.lockWindows && s.push('lockWindows="1"'), t.raw)
    for (const d of ["workbookAlgorithmName", "workbookHashValue", "workbookSaltValue", "workbookSpinCount"]) {
      const u = t.raw[d];
      u != null && s.push(`${d}="${My(String(u))}"`);
    }
  const r = `<workbookProtection ${s.join(" ")}/>`, l = i.search(/<bookViews\b/) >= 0 ? "<bookViews" : "<sheets", a = i.indexOf(l);
  if (a < 0) return n;
  i = i.slice(0, a) + r + i.slice(a);
  const c = Je(i);
  return o[Vi] = c, Oo(o);
}
const Rs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main", Ho = "http://schemas.openxmlformats.org/officeDocument/2006/relationships", hs = `${Ho}/pivotCacheDefinition`, $y = `${Ho}/pivotCacheRecords`, Uc = `${Ho}/pivotTable`, _c = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml", jc = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml", Vc = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml";
function ht(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function da(n) {
  let e = n + 1, t = "";
  for (; e > 0; ) {
    const o = (e - 1) % 26;
    t = String.fromCharCode(65 + o) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
function Yc(n) {
  return `${da(n.left)}${n.top + 1}:${da(n.right)}${n.bottom + 1}`;
}
function Be(n, e, t) {
  const o = Je(t), i = new Uint8Array(o.byteLength);
  i.set(o), n[e] = i;
}
function Gc(n, e, t) {
  var i;
  const o = (i = n.cells.get(X(e, t))) == null ? void 0 : i.raw;
  return o == null ? null : o;
}
function Xc(n) {
  return n == null ? "" : n instanceof Date ? n.toISOString() : String(n);
}
function Kc(n) {
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n == "string") {
    const e = Number(n.replace(/,/g, "").trim());
    if (n.trim() !== "" && Number.isFinite(e)) return e;
  }
  return null;
}
const Ay = {
  sum: void 0,
  // sum 是 dataField@subtotal 缺省值,省略保持文件精简
  count: "count",
  avg: "average",
  max: "max",
  min: "min"
}, Fy = { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" };
function Ry(n) {
  var t;
  const e = [];
  for (const o of n.sheets)
    for (const i of (t = o.pivotTables) != null ? t : []) {
      const s = i.source, r = i.layout;
      if (!s || !r || !r.values.length) continue;
      const l = n.sheets[s.sheetIndex];
      l && (s.range.bottom <= s.range.top || e.push({ pivot: i, source: s, layout: r, hostSheet: o, sourceSheet: l }));
    }
  return e;
}
function Ly(n) {
  const { source: e, layout: t, sourceSheet: o, pivot: i } = n, s = /* @__PURE__ */ new Set([...t.rows, ...t.columns, ...t.filters.map((l) => l.field)]), r = [];
  for (let l = e.range.left; l <= e.range.right; l++) {
    const a = l - e.range.left, c = {
      name: i.fields[a] || `字段${a + 1}`,
      onAxis: s.has(l),
      numeric: !0,
      hasBlank: !1,
      items: [],
      itemIndex: /* @__PURE__ */ new Map(),
      min: 1 / 0,
      max: -1 / 0
    }, d = /* @__PURE__ */ new Set();
    let u = !1;
    for (let h = e.range.top + 1; h <= e.range.bottom; h++) {
      const p = Gc(o, h, l), m = Xc(p).trim();
      if (!m) {
        c.hasBlank = !0;
        continue;
      }
      u = !0;
      const b = Kc(p);
      b == null ? c.numeric = !1 : (c.min = Math.min(c.min, b), c.max = Math.max(c.max, b)), c.onAxis && !d.has(m) && (d.add(m), c.itemIndex.set(m, c.items.length), c.items.push(m));
    }
    u || (c.numeric = !1), r.push(c);
  }
  return r;
}
function Py(n, e, t) {
  const o = n.sourceSheet.name, i = e.map((s) => {
    if (s.onAxis) {
      const r = s.items.map((c) => `<s v="${ht(c)}"/>`).join("") + (s.hasBlank ? "<m/>" : ""), l = s.items.length + (s.hasBlank ? 1 : 0), a = s.hasBlank ? ' containsBlank="1"' : "";
      return `<cacheField name="${ht(s.name)}" numFmtId="0"><sharedItems${a} count="${l}">${r}</sharedItems></cacheField>`;
    }
    if (s.numeric) {
      const r = s.hasBlank ? ' containsBlank="1"' : "";
      return `<cacheField name="${ht(s.name)}" numFmtId="0"><sharedItems${r} containsSemiMixedTypes="0" containsString="0" containsNumber="1" minValue="${s.min}" maxValue="${s.max}"/></cacheField>`;
    }
    return `<cacheField name="${ht(s.name)}" numFmtId="0"><sharedItems/></cacheField>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotCacheDefinition xmlns="${Rs}" xmlns:r="${Ho}" r:id="rId1" refreshedBy="ooxml-excel-editor" refreshOnLoad="1" createdVersion="3" refreshedVersion="3" minRefreshableVersion="3" recordCount="${t}"><cacheSource type="worksheet"><worksheetSource ref="${Yc(n.source.range)}" sheet="${ht(o)}"/></cacheSource><cacheFields count="${e.length}">${i}</cacheFields></pivotCacheDefinition>`;
}
function Ny(n, e) {
  const { source: t, sourceSheet: o } = n, i = [];
  for (let r = t.range.top + 1; r <= t.range.bottom; r++) {
    const l = e.map((a, c) => {
      var p;
      const d = Gc(o, r, t.range.left + c), u = Xc(d).trim();
      if (!u) return "<m/>";
      if (a.onAxis) return `<x v="${(p = a.itemIndex.get(u)) != null ? p : 0}"/>`;
      const h = Kc(d);
      return a.numeric && h != null ? `<n v="${h}"/>` : `<s v="${ht(u)}"/>`;
    });
    i.push(`<r>${l.join("")}</r>`);
  }
  return { xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotCacheRecords xmlns="${Rs}" xmlns:r="${Ho}" count="${i.length}">` + i.join("") + "</pivotCacheRecords>", count: i.length };
}
function Oy(n, e, t) {
  const { pivot: o, source: i, layout: s } = n, r = (v) => v - i.range.left, l = (v) => {
    const y = i.range.left + v;
    return s.rows.includes(y) ? "axisRow" : s.columns.includes(y) ? "axisCol" : s.filters.some((w) => w.field === y) ? "axisPage" : null;
  }, a = new Set(s.values.map((v) => r(v.field))), c = (v) => s.filters.find((y) => r(y.field) === v), d = e.map((v, y) => {
    const w = l(y);
    if (w) {
      const S = v.items.length + (v.hasBlank ? 1 : 0), k = w === "axisPage" ? c(y) : void 0, C = v.items.length, M = /* @__PURE__ */ new Set();
      let E = !1;
      if ((k == null ? void 0 : k.mode) === "non-empty" && v.hasBlank && (E = !0, M.add(C)), (k == null ? void 0 : k.mode) === "include" && k.values) {
        E = !0;
        const L = new Set(k.values);
        v.items.forEach((F, N) => {
          L.has(F) || M.add(N);
        }), v.hasBlank && M.add(C);
      }
      const P = Array.from({ length: S }, (L, F) => M.has(F) ? `<item x="${F}" h="1"/>` : `<item x="${F}"/>`).join("") + '<item t="default"/>';
      return `<pivotField axis="${w}"${E ? ' multipleItemSelectionAllowed="1"' : ""} showAll="0"><items count="${S + 1}">${P}</items></pivotField>`;
    }
    return a.has(y) ? '<pivotField dataField="1" showAll="0"/>' : '<pivotField showAll="0"/>';
  }).join(""), u = s.rows.length ? `<rowFields count="${s.rows.length}">${s.rows.map((v) => `<field x="${r(v)}"/>`).join("")}</rowFields>` : "", h = s.columns.length ? `<colFields count="${s.columns.length}">${s.columns.map((v) => `<field x="${r(v)}"/>`).join("")}</colFields>` : "", p = s.filters.length ? `<pageFields count="${s.filters.length}">${s.filters.map((v) => {
    const y = e[r(v.field)], w = v.mode === "equals" && v.value != null ? y == null ? void 0 : y.itemIndex.get(v.value) : void 0;
    return `<pageField fld="${r(v.field)}"${w != null ? ` item="${w}"` : ""} hier="-1"/>`;
  }).join("")}</pageFields>` : "", m = `<dataFields count="${s.values.length}">${s.values.map((v) => {
    var k;
    const y = e[r(v.field)], w = Ay[v.summary], S = `${Fy[v.summary]}:${(k = y == null ? void 0 : y.name) != null ? k : `字段${r(v.field) + 1}`}`;
    return `<dataField name="${ht(S)}" fld="${r(v.field)}" baseField="0" baseItem="0"${w ? ` subtotal="${w}"` : ""}/>`;
  }).join("")}</dataFields>`, b = s.columns.length ? 2 : 1;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<pivotTableDefinition xmlns="${Rs}" name="${ht(o.name)}" cacheId="${t}" applyNumberFormats="0" applyBorderFormats="0" applyFontFormats="0" applyPatternFormats="0" applyAlignmentFormats="0" applyWidthHeightFormats="1" dataCaption="值" updatedVersion="3" minRefreshableVersion="3" createdVersion="3" useAutoFormatting="1" itemPrintTitles="1" indent="0" outline="1" outlineData="1" multipleFieldFilters="0"><location ref="${Yc(o.range)}" firstHeaderRow="1" firstDataRow="${b}" firstDataCol="1"/><pivotFields count="${e.length}">${d}</pivotFields>` + u + h + p + m + '<pivotTableStyleInfo name="PivotStyleLight16" showRowHeaders="1" showColHeaders="1" showRowStripes="0" showColStripes="0" showLastColumn="1"/></pivotTableDefinition>';
}
const bn = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;
function An(n, e, t) {
  let o = 0;
  for (const s of n.matchAll(/Id="rId(\d+)"/g)) o = Math.max(o, Number(s[1]));
  const i = `rId${o + 1}`;
  return {
    rels: n.replace("</Relationships>", `<Relationship Id="${i}" Type="${e}" Target="${t}"/></Relationships>`),
    rid: i
  };
}
function Jc(n, e) {
  var s, r;
  const t = n["xl/workbook.xml"] ? xe(n["xl/workbook.xml"]) : "", o = n["xl/_rels/workbook.xml.rels"] ? xe(n["xl/_rels/workbook.xml.rels"]) : "", i = ht(e);
  for (const l of t.matchAll(/<sheet\b[^>]*>/g)) {
    const a = l[0], c = (s = /name="([^"]*)"/.exec(a)) == null ? void 0 : s[1];
    if (c !== i && c !== e) continue;
    const d = (r = /r:id="([^"]+)"/.exec(a)) == null ? void 0 : r[1];
    if (!d) return null;
    const u = new RegExp(`<Relationship[^>]*Id="${d}"[^>]*Target="([^"]+)"`).exec(o);
    if (!u) return null;
    const h = u[1];
    return h.startsWith("/") ? h.slice(1) : `xl/${h.replace(/^\.\//, "")}`;
  }
  return null;
}
function zy(n, e) {
  const t = Ry(e);
  if (!t.length) return n;
  const o = Mt(n);
  if (!o["xl/workbook.xml"] || !o["xl/_rels/workbook.xml.rels"]) return n;
  let i = 1;
  for (const d of Object.keys(o)) {
    const u = /^xl\/pivotTables\/pivotTable(\d+)\.xml$/.exec(d);
    u && (i = Math.max(i, Number(u[1]) + 1));
  }
  let s = xe(o["xl/workbook.xml"]), r = 1;
  for (const d of s.matchAll(/cacheId="(\d+)"/g)) r = Math.max(r, Number(d[1]) + 1);
  let l = xe(o["xl/_rels/workbook.xml.rels"]), a = o["[Content_Types].xml"] ? xe(o["[Content_Types].xml"]) : "";
  const c = [];
  for (const d of t) {
    const u = Jc(o, d.hostSheet.name);
    if (!u || !o[u]) continue;
    const h = i++, p = r++, m = Ly(d), b = Ny(d, m);
    Be(o, `xl/pivotCache/pivotCacheDefinition${h}.xml`, Py(d, m, b.count)), Be(o, `xl/pivotCache/pivotCacheRecords${h}.xml`, b.xml), Be(
      o,
      `xl/pivotCache/_rels/pivotCacheDefinition${h}.xml.rels`,
      bn.replace("</Relationships>", `<Relationship Id="rId1" Type="${$y}" Target="pivotCacheRecords${h}.xml"/></Relationships>`)
    ), Be(o, `xl/pivotTables/pivotTable${h}.xml`, Oy(d, m, p)), Be(
      o,
      `xl/pivotTables/_rels/pivotTable${h}.xml.rels`,
      bn.replace("</Relationships>", `<Relationship Id="rId1" Type="${hs}" Target="../pivotCache/pivotCacheDefinition${h}.xml"/></Relationships>`)
    );
    const v = An(l, hs, `pivotCache/pivotCacheDefinition${h}.xml`);
    l = v.rels, c.push(`<pivotCache cacheId="${p}" r:id="${v.rid}"/>`);
    const y = u.slice(0, u.lastIndexOf("/")), w = u.slice(u.lastIndexOf("/") + 1), S = `${y}/_rels/${w}.rels`, k = o[S] ? xe(o[S]) : bn;
    Be(o, S, An(k, Uc, `../pivotTables/pivotTable${h}.xml`).rels);
    let C = "";
    C += `<Override PartName="/xl/pivotCache/pivotCacheDefinition${h}.xml" ContentType="${_c}"/>`, C += `<Override PartName="/xl/pivotCache/pivotCacheRecords${h}.xml" ContentType="${jc}"/>`, C += `<Override PartName="/xl/pivotTables/pivotTable${h}.xml" ContentType="${Vc}"/>`, a = a.replace("</Types>", C + "</Types>");
  }
  return c.length ? (Be(o, "xl/workbook.xml", Zc(s, c)), Be(o, "xl/_rels/workbook.xml.rels", l), a && Be(o, "[Content_Types].xml", a), Oo(o)) : n;
}
function Zc(n, e) {
  if (n.includes("<pivotCaches>")) return n.replace("<pivotCaches>", `<pivotCaches>${e.join("")}`);
  const t = `<pivotCaches>${e.join("")}</pivotCaches>`;
  return n.includes("<extLst") ? n.replace("<extLst", `${t}<extLst`) : n.replace("</workbook>", `${t}</workbook>`);
}
const Hy = [
  [/pivotCacheDefinition\d*\.xml$/, _c],
  [/pivotCacheRecords\d*\.xml$/, jc],
  [/pivotTables\/pivotTable\d*\.xml$/, Vc]
];
function Dy(n, e) {
  var u, h, p, m, b;
  let t;
  try {
    t = Mt(e);
  } catch (v) {
    return n;
  }
  if (!t["xl/workbook.xml"]) return n;
  const o = xe(t["xl/workbook.xml"]), i = t["xl/_rels/workbook.xml.rels"] ? xe(t["xl/_rels/workbook.xml.rels"]) : "", s = [...o.matchAll(/<pivotCache\b[^>]*cacheId="(\d+)"[^>]*r:id="([^"]+)"[^>]*\/>/g)], r = Object.keys(t).filter((v) => v.startsWith("xl/pivotCache/") || v.startsWith("xl/pivotTables/"));
  if (!s.length || !r.length) return n;
  const l = Mt(n);
  if (!l["xl/workbook.xml"] || !l["xl/_rels/workbook.xml.rels"]) return n;
  for (const v of r) {
    if (l[v]) continue;
    const y = new Uint8Array(t[v].byteLength);
    y.set(t[v]), l[v] = y;
  }
  let a = xe(l["xl/_rels/workbook.xml.rels"]);
  const c = [];
  for (const [, v, y] of s) {
    const w = (u = new RegExp(`<Relationship[^>]*Id="${y}"[^>]*Target="([^"]+)"`).exec(i)) == null ? void 0 : u[1];
    if (!w) continue;
    const S = w.startsWith("/") ? w.slice(1).replace(/^xl\//, "") : w.replace(/^\.\//, "");
    if (!l[`xl/${S}`]) continue;
    const k = An(a, hs, S);
    a = k.rels, c.push(`<pivotCache cacheId="${v}" r:id="${k.rid}"/>`);
  }
  if (!c.length) return n;
  Be(l, "xl/workbook.xml", Zc(xe(l["xl/workbook.xml"]), c)), Be(l, "xl/_rels/workbook.xml.rels", a);
  const d = /* @__PURE__ */ new Map();
  for (const v of o.matchAll(/<sheet\b[^>]*>/g)) {
    const y = (h = /name="([^"]*)"/.exec(v[0])) == null ? void 0 : h[1], w = (p = /r:id="([^"]+)"/.exec(v[0])) == null ? void 0 : p[1];
    if (!y || !w) continue;
    const S = (m = new RegExp(`<Relationship[^>]*Id="${w}"[^>]*Target="([^"]+)"`).exec(i)) == null ? void 0 : m[1];
    S && d.set(S.startsWith("/") ? S.slice(1) : `xl/${S.replace(/^\.\//, "")}`, y);
  }
  for (const [v, y] of d) {
    const w = v.slice(0, v.lastIndexOf("/")), S = v.slice(v.lastIndexOf("/") + 1), k = t[`${w}/_rels/${S}.rels`];
    if (!k) continue;
    const C = [...xe(k).matchAll(/<Relationship[^>]*Type="[^"]*\/pivotTable"[^>]*Target="([^"]+)"/g)].map((F) => F[1]);
    if (!C.length) continue;
    const M = Jc(l, y);
    if (!M) continue;
    const E = M.slice(0, M.lastIndexOf("/")), P = M.slice(M.lastIndexOf("/") + 1), I = `${E}/_rels/${P}.rels`;
    let L = l[I] ? xe(l[I]) : bn;
    for (const F of C)
      L.includes(`Target="${F}"`) || (L = An(L, Uc, F).rels);
    Be(l, I, L);
  }
  if (l["[Content_Types].xml"]) {
    let v = xe(l["[Content_Types].xml"]), y = "";
    for (const w of r) {
      if (w.includes("/_rels/")) continue;
      const S = (b = Hy.find(([k]) => k.test(w))) == null ? void 0 : b[1];
      S && !v.includes(`/${w}`) && (y += `<Override PartName="/${w}" ContentType="${S}"/>`);
    }
    y && (v = v.replace("</Types>", y + "</Types>")), Be(l, "[Content_Types].xml", v);
  }
  return Oo(l);
}
function pn() {
  return typeof requestAnimationFrame == "function" ? new Promise((n) => requestAnimationFrame((e) => n(e))) : new Promise((n) => setTimeout(() => n(0), 0));
}
function Re(n) {
  if (!(n != null && n.aborted)) return;
  if (typeof DOMException != "undefined")
    throw new DOMException("Aborted", "AbortError");
  const e = new Error("Aborted");
  throw e.name = "AbortError", e;
}
function it(n) {
  if (!n) return;
  let e = /^#([0-9a-f]{6})$/i.exec(n);
  if (e) return ("FF" + e[1]).toUpperCase();
  if (e = /^#([0-9a-f]{8})$/i.exec(n), e) return (e[1].slice(6) + e[1].slice(0, 6)).toUpperCase();
  const t = /rgba?\(([^)]+)\)/i.exec(n);
  if (t) {
    const o = t[1].split(",").map((r) => r.trim()), i = (r) => Math.max(0, Math.min(255, Math.round(r))).toString(16).padStart(2, "0");
    return (i((o[3] != null ? +o[3] : 1) * 255) + i(+o[0]) + i(+o[1]) + i(+o[2])).toUpperCase();
  }
}
function By(n) {
  const e = n.color ? it(n.color) : void 0, t = {};
  return n.name && (t.name = n.name), n.size && (t.size = n.size), n.bold && (t.bold = !0), n.italic && (t.italic = !0), n.underline && (t.underline = n.underlineStyle === "double" ? "double" : !0), n.strike && (t.strike = !0), e && (t.color = { argb: e }), t;
}
function Qc(n, e) {
  const t = e.font, o = it(t.color);
  if (n.font = {
    name: t.name || void 0,
    size: t.size || void 0,
    bold: t.bold || void 0,
    italic: t.italic || void 0,
    underline: t.underline ? t.underlineStyle === "double" ? "double" : !0 : void 0,
    strike: t.strike || void 0,
    color: o ? { argb: o } : void 0
  }, e.fill && e.fill.type !== "none") {
    const r = it(e.fill.fgColor), l = it(e.fill.bgColor);
    n.fill = {
      type: "pattern",
      pattern: e.fill.type === "solid" ? "solid" : e.fill.pattern || "solid",
      fgColor: r ? { argb: r } : void 0,
      bgColor: l ? { argb: l } : void 0
    };
  }
  const i = e.borders;
  if (i && (i.top || i.bottom || i.left || i.right || i.diagonal)) {
    const r = (l) => l && l.style !== "none" ? { style: l.style, color: it(l.color) ? { argb: it(l.color) } : void 0 } : void 0;
    n.border = {
      top: r(i.top),
      bottom: r(i.bottom),
      left: r(i.left),
      right: r(i.right),
      diagonal: i.diagonal ? R({ up: !!i.diagonalUp, down: !!i.diagonalDown }, r(i.diagonal)) : void 0
    };
  }
  const s = {};
  e.hAlign && e.hAlign !== "general" && (s.horizontal = e.hAlign), e.vAlign && e.vAlign !== "bottom" && (s.vertical = e.vAlign), e.wrapText && (s.wrapText = !0), e.textRotation && (s.textRotation = e.textRotation), e.indent && (s.indent = e.indent), Object.keys(s).length && (n.alignment = s), e.numFmt && e.numFmt !== "General" && (n.numFmt = e.numFmt), e.protection && (e.protection.locked === !1 || e.protection.hidden) && (n.protection = { locked: e.protection.locked !== !1, hidden: !!e.protection.hidden });
}
function Fn(n) {
  let e = "", t = n;
  do
    e = String.fromCharCode(65 + t % 26) + e, t = Math.floor(t / 26) - 1;
  while (t >= 0);
  return e;
}
function qn(n) {
  return `${Fn(n.left)}${n.top + 1}:${Fn(n.right)}${n.bottom + 1}`;
}
function Wy(n) {
  return (n || []).map(qn).join(" ");
}
function qy(n) {
  if (!n) return;
  const e = {}, t = n.font;
  if (t) {
    const o = {};
    t.bold && (o.bold = !0), t.italic && (o.italic = !0), t.underline && (o.underline = !0), t.strike && (o.strike = !0);
    const i = it(t.color);
    i && (o.color = { argb: i }), Object.keys(o).length && (e.font = o);
  }
  if (n.fill && n.fill.type !== "none") {
    const o = it(n.fill.fgColor);
    o && (e.fill = { type: "pattern", pattern: "solid", fgColor: { argb: o } });
  }
  return Object.keys(e).length ? e : void 0;
}
function Uy(n) {
  const e = n.priority || 1, t = qy(n.style);
  switch (n.type) {
    case "cellIs":
      return { type: "cellIs", operator: n.operator || "greaterThan", formulae: n.formulae || [], priority: e, style: t };
    case "expression":
      return { type: "expression", formulae: n.formulae || [], priority: e, style: t };
    case "colorScale": {
      const o = n.colorScale;
      if (!o) return null;
      const i = o.mid ? [{ type: "min" }, { type: "percentile", value: 50 }, { type: "max" }] : [{ type: "min" }, { type: "max" }], s = (o.mid ? [o.min, o.mid, o.max] : [o.min, o.max]).map((r) => ({ argb: it(r) || "FF000000" }));
      return { type: "colorScale", cfvo: i, color: s, priority: e };
    }
    case "dataBar": {
      const o = n.dataBar;
      return o ? { type: "dataBar", cfvo: [{ type: "min" }, { type: "max" }], color: { argb: it(o.color) || "FF638EC6" }, priority: e } : null;
    }
    case "iconSet": {
      const o = n.iconSet;
      return o ? { type: "iconSet", iconSet: o.name, reverse: !!o.reverse, cfvo: [{ type: "percent", value: 0 }, { type: "percent", value: 33 }, { type: "percent", value: 67 }], priority: e } : null;
    }
    case "top10": {
      const o = n.top10 || { rank: 10, percent: !1, bottom: !1 };
      return { type: "top10", rank: o.rank, percent: o.percent, bottom: o.bottom, priority: e, style: t };
    }
    default:
      return null;
  }
}
function ed(n, e) {
  const t = e.conditional;
  if (Array.isArray(n.conditionalFormattings) && (n.conditionalFormattings = []), !(!t || !t.length))
    for (const o of t) {
      if (o.type === "unsupported") continue;
      const i = Wy(o.ranges);
      if (!i) continue;
      const r = o.origin !== "user" && !o.dirty && o.raw ? o.raw : Uy(o);
      if (r)
        try {
          n.addConditionalFormatting({ ref: i, rules: [r] });
        } catch (l) {
        }
    }
}
function td(n) {
  var e, t, o, i, s, r;
  switch (n.type) {
    case "number":
    case "boolean":
    case "date":
    case "string":
      return n.raw;
    case "error":
      return { error: n.raw };
    case "formula": {
      const l = (e = n.formula) != null ? e : "", a = l[0] === "=" ? l.slice(1) : l;
      return n.dispImgId ? { formula: a, result: `=DISPIMG("${n.dispImgId}",1)` } : { formula: a, result: (t = n.raw) != null ? t : void 0 };
    }
    case "hyperlink":
      return { text: String((o = n.raw) != null ? o : ""), hyperlink: (i = n.hyperlink) != null ? i : "" };
    case "richtext":
      return n.rich ? { richText: n.rich.map((l) => l.font ? { text: l.text, font: By(l.font) } : { text: l.text }) } : (s = n.raw) != null ? s : "";
    default:
      return (r = n.raw) != null ? r : null;
  }
}
function ua(n) {
  return n != null && n.includes("jpeg") || n != null && n.includes("jpg") ? "jpeg" : n != null && n.includes("gif") ? "gif" : "png";
}
function _y(n, e, t, o) {
  var d;
  let i;
  if (t.bytes) i = { buffer: t.bytes, extension: ua(t.mime) };
  else if ((d = t.src) != null && d.startsWith("data:")) {
    const u = t.src.indexOf(","), h = t.src.slice(5, u);
    i = { base64: t.src.slice(u + 1), extension: ua(h) };
  } else return;
  const s = n.addImage(i), r = (u, h) => ha((p) => o.colWidth(p), u, Lo(h)), l = (u, h) => ha((p) => o.rowHeight(p), u, Lo(h)), a = { col: r(t.from.col, t.from.colOffEmu), row: l(t.from.row, t.from.rowOffEmu) }, c = t.editAs === "oneCell" || t.editAs === "absolute" || t.editAs === "twoCell" ? t.editAs : t.to ? "twoCell" : "oneCell";
  if (t.to)
    e.addImage(s, { tl: a, br: { col: r(t.to.col, t.to.colOffEmu), row: l(t.to.row, t.to.rowOffEmu) }, editAs: c });
  else {
    const u = Ie(o, t);
    e.addImage(s, { tl: a, ext: { width: u.width, height: u.height }, editAs: c });
  }
}
function ha(n, e, t) {
  let o = e, i = t;
  for (; i > 0; ) {
    const r = n(o);
    if (r <= 0 || i < r) break;
    i -= r, o++;
  }
  const s = n(o);
  return o + (s > 0 ? i / s : 0);
}
function od(n, e) {
  var s, r, l;
  const t = e.pageSetup, o = e.pageBreaks;
  if (!t && !o) return;
  const i = n.pageSetup || (n.pageSetup = {});
  if (t) {
    if (t.orientation && (i.orientation = t.orientation), t.paperFormat && !Array.isArray(t.paperFormat) && (i.paperSize = { a4: 9, a3: 8, letter: 1 }[t.paperFormat]), t.fitToPage ? (i.fitToPage = !0, t.fitToWidth != null && (i.fitToWidth = t.fitToWidth), t.fitToHeight != null && (i.fitToHeight = t.fitToHeight)) : t.scale != null && (i.scale = t.scale), t.margins) {
      const a = (c) => Math.round(c / 25.4 * 1e3) / 1e3;
      i.margins = {
        top: a(t.margins.top),
        bottom: a(t.margins.bottom),
        left: a(t.margins.left),
        right: a(t.margins.right),
        header: a(t.margins.header),
        footer: a(t.margins.footer)
      };
    }
    t.printArea && (i.printArea = qn(t.printArea)), t.printTitleRows && (i.printTitlesRow = `${t.printTitleRows[0] + 1}:${t.printTitleRows[1] + 1}`), t.printTitleCols && (i.printTitlesColumn = `${Fn(t.printTitleCols[0])}:${Fn(t.printTitleCols[1])}`), t.printGridLines != null && (i.showGridLines = t.printGridLines), t.printHeadings != null && (i.showRowColHeaders = t.printHeadings);
  }
  if (o)
    for (const a of (s = o.rows) != null ? s : [])
      try {
        (l = (r = n.getRow(a + 1)).addPageBreak) == null || l.call(r);
      } catch (c) {
      }
}
function jy(n, e, t) {
  for (const [i, s] of e.columns) {
    const r = n.getColumn(i + 1);
    r.width = Math.max(0, (s.width - 5) / ws), s.hidden && (r.hidden = !0);
  }
  for (const [i, s] of e.rows) {
    const r = n.getRow(i + 1);
    r.height = s.height / Hn, s.hidden && (r.hidden = !0);
  }
  for (const i of e.cells.values()) {
    const s = n.getCell(i.row + 1, i.col + 1);
    i.type !== "empty" && (s.value = td(i));
    const r = e.styles[i.styleId];
    r && Qc(s, r), i.comment && (s.note = i.comment);
  }
  for (const i of e.merges)
    try {
      n.mergeCells(i.top + 1, i.left + 1, i.bottom + 1, i.right + 1);
    } catch (s) {
    }
  e.freeze && (e.freeze.frozenRows || e.freeze.frozenCols) && (n.views = [{ state: "frozen", xSplit: e.freeze.frozenCols, ySplit: e.freeze.frozenRows }]), ed(n, e), od(n, e), id(n, e), nd(n, e);
  const o = new kt(e, 1);
  for (const i of e.images)
    try {
      _y(t, n, i, o);
    } catch (s) {
    }
}
const Vy = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
function Yy(n, e) {
  var o, i;
  const t = new Set(e.cells.keys());
  n.eachRow({ includeEmpty: !1 }, (s, r) => {
    s.eachCell({ includeEmpty: !1 }, (l, a) => {
      t.has(X(r - 1, a - 1)) || (l.value = null);
    });
  });
  for (const s of e.cells.values()) {
    const r = n.getCell(s.row + 1, s.col + 1);
    r.value = s.type !== "empty" ? td(s) : null;
    const l = e.styles[s.styleId];
    l && Qc(r, l), s.comment && (r.note = s.comment);
  }
  for (const s of [...(i = (o = n.model) == null ? void 0 : o.merges) != null ? i : []])
    try {
      n.unMergeCells(s);
    } catch (r) {
    }
  for (const s of e.merges)
    try {
      n.mergeCells(s.top + 1, s.left + 1, s.bottom + 1, s.right + 1);
    } catch (r) {
    }
  for (const [s, r] of e.columns) {
    const l = n.getColumn(s + 1);
    l.width = Math.max(0, (r.width - 5) / ws), r.hidden && (l.hidden = !0);
  }
  for (const [s, r] of e.rows) {
    const l = n.getRow(s + 1);
    l.height = r.height / Hn, r.hidden && (l.hidden = !0);
  }
  e.freeze && (e.freeze.frozenRows || e.freeze.frozenCols) && (n.views = [{ state: "frozen", xSplit: e.freeze.frozenCols, ySplit: e.freeze.frozenRows }]), ed(n, e), od(n, e), id(n, e), nd(n, e);
}
function nd(n, e) {
  var i, s;
  const t = e.sheetProtection;
  if (t != null && t.protected)
    if (t.raw)
      n.sheetProtection = K(R({}, t.raw), { sheet: !0 });
    else {
      const r = R({ sheet: !0 }, (i = t.allow) != null ? i : {});
      if (t.password)
        try {
          n.protect(t.password, (s = t.allow) != null ? s : {});
        } catch (l) {
          n.sheetProtection = r;
        }
      else
        n.sheetProtection = r;
    }
  else
    n.sheetProtection && (n.sheetProtection = null);
  const o = e.protectedRanges;
  o && o.length && (n.protectedRanges = o.map((r) => ({ name: r.name, ref: qn(r.range) })));
}
function id(n, e) {
  var o, i, s;
  const t = e.dataValidationRules;
  if (!(!(t != null && t.length) || !((o = n.dataValidations) != null && o.add)))
    for (const r of t) {
      const l = { type: r.type, allowBlank: !!r.allowBlank };
      r.operator && (l.operator = r.operator), l.formulae = r.type === "list" ? [`"${((i = r.options) != null ? i : []).join(",")}"`] : ((s = r.formulae) != null ? s : []).map((a) => String(a)), r.showErrorMessage && (l.showErrorMessage = !0, r.errorStyle && (l.errorStyle = r.errorStyle), r.errorTitle && (l.errorTitle = r.errorTitle), r.error && (l.error = r.error)), r.showInputMessage && (l.showInputMessage = !0, r.promptTitle && (l.promptTitle = r.promptTitle), r.prompt && (l.prompt = r.prompt));
      try {
        n.dataValidations.add(qn(r.range), l);
      } catch (a) {
      }
    }
}
async function Gy(n, e = {}) {
  var r, l, a, c, d, u, h, p, m;
  Re(e.signal);
  const t = await import("./exceljs.min-Bo1tFAdV.js").then((b) => b.e), o = (r = t.default) != null ? r : t;
  if (e.fidelity === "overlay" && e.sourceBuffer) {
    Re(e.signal);
    const b = new o.Workbook();
    await b.xlsx.load(e.sourceBuffer);
    for (let y = 0; y < n.sheets.length; y++) {
      Re(e.signal);
      const w = n.sheets[y], S = (a = (l = b.worksheets[y]) != null ? l : b.getWorksheet(w.name)) != null ? a : b.addWorksheet(w.name || `Sheet${y + 1}`);
      Yy(S, w), (c = e.onProgress) == null || c.call(e, { stage: "write", sheetIndex: y, ratio: (y + 1) / n.sheets.length, label: `写入 ${w.name}` });
    }
    (d = e.onProgress) == null || d.call(e, { stage: "zip", ratio: void 0, label: "zip 压缩 .xlsx…" });
    const v = await b.xlsx.writeBuffer();
    return Re(e.signal), (u = e.onProgress) == null || u.call(e, { stage: "zip", ratio: 1 }), fa(v, n, e);
  }
  const i = new o.Workbook();
  i.properties.date1904 = n.date1904;
  for (let b = 0; b < n.sheets.length; b++) {
    Re(e.signal);
    const v = n.sheets[b], y = i.addWorksheet(v.name || `Sheet${v.index + 1}`, {
      state: v.state === "visible" ? "visible" : v.state
    });
    jy(y, v, i), (h = e.onProgress) == null || h.call(e, { stage: "write", sheetIndex: b, ratio: (b + 1) / n.sheets.length, label: `写入 ${v.name}` });
  }
  (p = e.onProgress) == null || p.call(e, { stage: "zip", ratio: 0, label: "zip 压缩…" });
  const s = await i.xlsx.writeBuffer();
  return Re(e.signal), (m = e.onProgress) == null || m.call(e, { stage: "zip", ratio: 1 }), fa(s, n, e);
}
async function Xy(n, e = {}) {
  const t = await Gy(n, e);
  return new Blob([t], { type: Vy });
}
function fa(n, e, t) {
  let o = new Uint8Array(n);
  if (e.cellImages && e.cellImages.size && (o = vy(o, e)), e.sheets.some((i) => i.background))
    try {
      o = Ty(o, e);
    } catch (i) {
    }
  if (e.protection && (e.protection.lockStructure || e.protection.lockWindows))
    try {
      o = Iy(o, e);
    } catch (i) {
    }
  if (t.pivotTables)
    try {
      t.fidelity === "overlay" && t.sourceBuffer && (o = Dy(o, new Uint8Array(t.sourceBuffer))), o = zy(o, e);
    } catch (i) {
    }
  return o;
}
class Ky {
  constructor(e) {
    this.host = e;
  }
  /** target → 工作表索引列表 */
  resolveTargets(e = "active") {
    const t = this.host.getWorkbook();
    return t ? e === "all" ? t.sheets.map((o, i) => i).filter((o) => t.sheets[o].state === "visible") : e === "active" ? [this.host.getActiveIndex()] : typeof e == "number" ? [e] : e.filter((o) => t.sheets[o]) : [];
  }
  /** 取某表的 renderer: 活动表复用 live,其它表离屏新建 */
  rendererFor(e, t, o) {
    const i = this.host.getLiveRenderer();
    return e === this.host.getActiveIndex() && i ? i : new Dc(document.createElement("canvas"), t, o, 1, this.host.getRendererOpts());
  }
  baseName() {
    var o;
    const e = this.host.getWorkbook(), t = ((o = e == null ? void 0 : e.sheets[this.host.getActiveIndex()]) == null ? void 0 : o.name) || "workbook";
    return (this.host.getFileName() || t).replace(/\.[^.]+$/, "");
  }
  /** 离屏渲染一个图表为 dataURL(供非当前表 / 统一合成);echarts 不可用返回 null */
  async chartDataUrl(e, t) {
    let o;
    try {
      o = await Wc();
    } catch (l) {
      return null;
    }
    const i = Ie(t, e.anchor), s = document.createElement("div");
    s.style.cssText = `position:fixed;left:-10000px;top:0;width:${Math.max(80, Math.round(i.width))}px;height:${Math.max(60, Math.round(i.height))}px`, document.body.appendChild(s);
    const r = o.init(s);
    try {
      return r.setOption(Bc(e)), r.getDataURL({ pixelRatio: 2, backgroundColor: "#fff" });
    } catch (l) {
      return null;
    } finally {
      r.dispose(), s.remove();
    }
  }
  /** 收集一个工作表的叠加层装饰(图片/图表/形状),供合成到导出底图 */
  async collectDecorations(e, t) {
    const o = [];
    for (const s of e.images)
      if (s.src)
        try {
          o.push({ source: await Pl(s.src), anchor: s });
        } catch (r) {
        }
    const i = [];
    for (const s of e.charts) {
      const r = await this.chartDataUrl(s, t);
      if (r)
        try {
          i.push({ source: await Pl(r), anchor: s.anchor });
        } catch (l) {
        }
    }
    return { images: o, charts: i, shapes: e.shapes };
  }
  /**
   * 为一个工作表生成合成底图(格子 + 图片/图表/形状)。
   * withTitles(PDF/打印): 应用 pageSetup 打印标题行(抽出标题条 + 正文剔除标题行)与缩放。
   */
  async buildSheetImage(e, t, o = !1) {
    var E, P;
    const i = this.host.getWorkbook(), s = i == null ? void 0 : i.sheets[e];
    if (!i || !s) return null;
    const r = this.rendererFor(e, s, i), l = s.pageSetup, a = s.dimension, c = { top: 0, left: 0, bottom: Math.max(0, a.rows - 1), right: Math.max(0, a.cols - 1) }, d = (P = (E = t.range) != null ? E : l == null ? void 0 : l.printArea) != null ? P : c;
    let u = null, h = null, p = d.top, m = d.left;
    if (o && (l != null && l.printTitleRows)) {
      const [I, L] = l.printTitleRows;
      L >= I && I <= d.top && L < d.bottom && (u = [I, L], p = Math.max(d.top, L + 1));
    }
    if (o && (l != null && l.printTitleCols)) {
      const [I, L] = l.printTitleCols;
      L >= I && I <= d.left && L < d.right && (h = [I, L], m = Math.max(d.left, L + 1));
    }
    const b = (I, L) => r.exportToCanvas({
      range: I,
      scale: L != null ? L : t.scale,
      includeHeaders: t.includeHeaders,
      gridlines: t.gridlines,
      background: t.background
    }), v = b({ top: p, left: m, bottom: d.bottom, right: d.right }), y = await this.collectDecorations(s, v.metrics);
    U0(v, y);
    const w = v.scale;
    let S, k, C;
    if (u) {
      const I = b({ top: u[0], bottom: u[1], left: m, right: d.right }, w);
      S = { canvas: I.canvas, heightCss: I.bodyH };
    }
    if (h) {
      const I = b({ top: p, bottom: d.bottom, left: h[0], right: h[1] }, w);
      k = { canvas: I.canvas, widthCss: I.bodyW };
    }
    u && h && (C = { canvas: b({ top: u[0], bottom: u[1], left: h[0], right: h[1] }, w).canvas });
    const M = t.fitToWidth === !1 && (l != null && l.scale) ? l.scale / 100 : void 0;
    return {
      canvas: v.canvas,
      bodyWcss: v.bodyW,
      bodyHcss: v.bodyH,
      sheetName: s.name,
      repeatTop: S,
      repeatLeft: k,
      corner: C,
      zoom: M
    };
  }
  /** 为一个工作表生成矢量导出输入(逐格信息 + 兜底底图 + 图片图表 + 标题行) */
  async buildVectorSheet(e, t) {
    var C, M, E, P, I;
    const o = this.host.getWorkbook(), i = o == null ? void 0 : o.sheets[e];
    if (!o || !i) return null;
    const s = this.rendererFor(e, i, o), r = new kt(i, 1), l = i.pageSetup, a = i.dimension, c = { top: 0, left: 0, bottom: Math.max(0, a.rows - 1), right: Math.max(0, a.cols - 1) }, d = (M = (C = t.range) != null ? C : l == null ? void 0 : l.printArea) != null ? M : c;
    let u, h, p = d.top, m = d.left;
    if (l != null && l.printTitleRows) {
      const [L, F] = l.printTitleRows;
      F >= L && L <= d.top && F < d.bottom && (u = [L, F], p = Math.max(d.top, F + 1));
    }
    if (l != null && l.printTitleCols) {
      const [L, F] = l.printTitleCols;
      F >= L && L <= d.left && F < d.right && (h = [L, F], m = Math.max(d.left, F + 1));
    }
    const b = u ? Math.min(d.top, u[0]) : d.top, v = h ? Math.min(d.left, h[0]) : d.left, y = s.exportToCanvas({
      range: { top: b, left: v, bottom: d.bottom, right: d.right },
      scale: t.scale,
      includeHeaders: !1,
      gridlines: t.gridlines,
      background: t.background
    }), w = await this.collectDecorations(i, y.metrics), S = [...(E = w.images) != null ? E : [], ...(P = w.charts) != null ? P : []], k = t.fitToWidth === !1 && (l != null && l.scale) ? l.scale / 100 : void 0;
    return {
      sheetName: i.name,
      metrics: r,
      bodyLeft: m,
      bodyRight: d.right,
      bodyTop: p,
      bodyBottom: d.bottom,
      titleRows: u,
      titleCols: h,
      merges: i.merges,
      gridlines: (I = t.gridlines) != null ? I : i.showGridLines,
      zoom: k,
      getCell: (L, F) => s.exportCellDraw(L, F),
      rasterCanvas: y.canvas,
      rasterScale: y.scale,
      rasterTop: b,
      rasterLeft: v,
      images: S
    };
  }
  /** 从工作表原生 pageSetup 推导导出默认值(纸张/方向/边距/是否适应页宽) */
  pageSetupDefaults(e) {
    var i, s;
    const t = (s = (i = this.host.getWorkbook()) == null ? void 0 : i.sheets[e]) == null ? void 0 : s.pageSetup;
    if (!t) return {};
    const o = {};
    return t.paperFormat && (o.format = t.paperFormat), t.orientation && (o.orientation = t.orientation), t.margins && (o.margin = { top: t.margins.top, right: t.margins.right, bottom: t.margins.bottom, left: t.margins.left }), o.fitToWidth = !!t.fitToPage, t.printGridLines != null && (o.gridlines = t.printGridLines), t.printHeadings != null && (o.includeHeaders = t.printHeadings), o;
  }
  // ====================== 对外导出 API ======================
  /** 导出当前/指定表为图片 Blob(图片为单表;多表请用 PDF) */
  async exportImage(e = {}) {
    var s, r, l, a, c;
    Re(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) throw new Error("无可导出的工作表");
    (s = e.onProgress) == null || s.call(e, { stage: "render", sheetIndex: t[0], ratio: void 0, label: "渲染表格…" });
    const o = await this.buildSheetImage(t[0], e);
    if (!o) throw new Error("导出失败: 无法生成底图");
    Re(e.signal), (r = e.onProgress) == null || r.call(e, { stage: "write", sheetIndex: t[0], ratio: void 0, label: "编码图片…" });
    const i = await Rb(o.canvas, (l = e.type) != null ? l : "png", (a = e.quality) != null ? a : 0.92);
    return (c = e.onProgress) == null || c.call(e, { stage: "write", ratio: 1 }), i;
  }
  async downloadImage(e = {}) {
    var i;
    const t = await this.exportImage(e), o = e.type === "jpeg" ? "jpg" : e.type === "webp" ? "webp" : "png";
    Jt(t, (i = e.fileName) != null ? i : `${this.baseName()}.${o}`);
  }
  /** 导出为 PDF Blob(每个目标表分页;需可选依赖 jspdf)。未显式指定的页面参数取自工作表 pageSetup。
   *  支持 `onProgress` 分阶段(render/compose/paginate/write)报进度 + `signal` 取消(标准 AbortSignal)。 */
  async exportPdf(e = {}) {
    var c, d, u, h, p, m, b, v;
    Re(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) throw new Error("无可导出的工作表");
    const o = R(R({}, this.pageSetupDefaults(t[0])), e), i = t.length, s = (y) => i > 1 ? y / i : void 0, r = (y) => i > 1 ? `已渲染 ${y}/${i}` : "渲染表格…";
    if (o.vector) {
      const y = [];
      for (let S = 0; S < i; S++) {
        Re(e.signal), (c = e.onProgress) == null || c.call(e, { stage: "render", sheetIndex: t[S], ratio: s(S), label: i > 1 ? `渲染 ${S + 1}/${i}` : "渲染表格…" });
        const k = await this.buildVectorSheet(t[S], o);
        k && y.push(k), (d = e.onProgress) == null || d.call(e, { stage: "render", sheetIndex: t[S], ratio: s(S + 1), label: r(S + 1) }), await pn();
      }
      Re(e.signal), (u = e.onProgress) == null || u.call(e, { stage: "write", ratio: void 0, label: "生成矢量 PDF…" });
      const w = await Z0(y, o);
      return (h = e.onProgress) == null || h.call(e, { stage: "write", ratio: 1 }), w;
    }
    const l = [];
    for (let y = 0; y < i; y++) {
      Re(e.signal), (p = e.onProgress) == null || p.call(e, { stage: "render", sheetIndex: t[y], ratio: s(y), label: i > 1 ? `渲染 ${y + 1}/${i}` : "渲染表格…" });
      const w = await this.buildSheetImage(t[y], o, !0);
      w && l.push(w), (m = e.onProgress) == null || m.call(e, { stage: "render", sheetIndex: t[y], ratio: s(y + 1), label: r(y + 1) }), await pn();
    }
    Re(e.signal), (b = e.onProgress) == null || b.call(e, { stage: "write", ratio: void 0, label: "生成 PDF 文件…" });
    const a = await Y0(l, o);
    return (v = e.onProgress) == null || v.call(e, { stage: "write", ratio: 1 }), a;
  }
  async downloadPdf(e = {}) {
    var o;
    const t = await this.exportPdf(e);
    Jt(t, (o = e.fileName) != null ? o : `${this.baseName()}.pdf`);
  }
  /** 打开系统打印(可在对话框另存为 PDF)。页面参数同样默认取自 pageSetup。 */
  async print(e = {}) {
    var l, a, c;
    Re(e.signal);
    const t = this.resolveTargets(e.target);
    if (!t.length) return;
    const o = R(R({}, this.pageSetupDefaults(t[0])), e), i = t.length, s = (d) => i > 1 ? d / i : void 0, r = [];
    for (let d = 0; d < i; d++) {
      Re(e.signal), (l = e.onProgress) == null || l.call(e, { stage: "render", sheetIndex: t[d], ratio: s(d), label: i > 1 ? `渲染 ${d + 1}/${i}` : "渲染表格…" });
      const u = await this.buildSheetImage(t[d], o, !0);
      u && r.push(u), (a = e.onProgress) == null || a.call(e, { stage: "render", sheetIndex: t[d], ratio: s(d + 1), label: i > 1 ? `已渲染 ${d + 1}/${i}` : "准备打印…" }), await pn();
    }
    cy(r, K(R({}, o), { title: (c = o.title) != null ? c : this.baseName() }));
  }
  /**
   * 打印预览:同 print() 的合成 + 分页管线,但**返回每页 canvas**(不开打印窗口),供预览对话框展示。
   * 复用 pageSetupDefaults(纸张/方向/边距/网格线)+ buildSheetImage + sliceToPages,与实际打印所见一致。
   */
  async buildPrintPages(e = {}) {
    var u;
    const t = this.resolveTargets(e.target);
    if (!t.length) return [];
    const o = R(R({}, this.pageSetupDefaults(t[0])), e), [i, s] = Bn(o.format, o.orientation), r = Wn(o.margin), l = Math.max(1, i - r.left - r.right), a = Math.max(1, s - r.top - r.bottom), c = (u = o.fitToWidth) != null ? u : !0, d = [];
    for (const h of t) {
      Re(e.signal);
      const p = await this.buildSheetImage(h, o, !0);
      if (!p) continue;
      const m = Fs(p.canvas, p.bodyWcss, p.bodyHcss, {
        contentWmm: l,
        contentHmm: a,
        fitToWidth: c,
        zoom: p.zoom,
        repeatTop: p.repeatTop,
        repeatLeft: p.repeatLeft,
        corner: p.corner
      });
      d.push({ sheetName: p.sheetName, pages: m.map((b) => b.canvas) }), await pn();
    }
    return d;
  }
  // ====================== 数据导出(E8;复用读层 + 从模型重建 xlsx) ======================
  /** 整簿 → JSON 文本(各表首行作 key 的对象数组)。 */
  exportJson(e) {
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    return fy(t, e);
  }
  downloadJson(e) {
    Jt(new Blob([this.exportJson(e)], { type: "application/json" }), `${this.baseName()}.json`);
  }
  /** 一张表 → CSV 文本(默认活动表、格式化显示值)。 */
  exportCsv(e = {}) {
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    const o = t.sheets[typeof e.target == "number" ? e.target : this.host.getActiveIndex()];
    if (!o) throw new Error("无工作表可导出");
    return hy(o, { format: e.format, date1904: t.date1904 });
  }
  downloadCsv(e = {}) {
    Jt(new Blob(["\uFEFF" + this.exportCsv(e)], { type: "text/csv;charset=utf-8" }), `${this.baseName()}.csv`);
  }
  /** 整簿 → .xlsx Blob(默认从模型重建;`fidelity:'overlay'` 重载原件叠加编辑,保真更高)。 */
  exportXlsx(e) {
    var i, s, r, l, a, c, d;
    const t = this.host.getWorkbook();
    if (!t) throw new Error("无工作簿可导出");
    const o = R({}, e);
    if (o.fidelity === "overlay" && !o.sourceBuffer) {
      const u = (r = (s = (i = this.host).getSourceBuffer) == null ? void 0 : s.call(i)) != null ? r : null;
      u && (o.sourceBuffer = u);
    }
    return (d = o.pivotTables) != null || (o.pivotTables = (c = (a = (l = this.host).isPivotEnabled) == null ? void 0 : a.call(l)) != null ? c : !1), Xy(t, o);
  }
  async downloadXlsx(e) {
    Jt(await this.exportXlsx(e), `${this.baseName()}.xlsx`);
  }
}
const pa = "(空白)", ga = {
  green: "#217346",
  blue: "#2b6cb0",
  orange: "#c05621",
  red: "#b42318",
  purple: "#7030a0",
  teal: "#0e7c86",
  gray: "#6b7280"
};
function Eo(n, e) {
  const t = n.replace("#", ""), o = (s) => parseInt(t.slice(s, s + 2), 16), i = (s) => Math.round(s + (255 - s) * e).toString(16).padStart(2, "0");
  return "#" + i(o(0)) + i(o(2)) + i(o(4));
}
function ma(n, e) {
  const t = n.replace("#", ""), o = (s) => parseInt(t.slice(s, s + 2), 16), i = (s) => Math.round(s * (1 - e)).toString(16).padStart(2, "0");
  return "#" + i(o(0)) + i(o(2)) + i(o(4));
}
function Jy(n) {
  return new Promise((e, t) => {
    const o = new FileReader();
    o.onload = () => e(String(o.result)), o.onerror = () => t(o.error), o.readAsDataURL(n);
  });
}
function ba(n) {
  return new Promise((e) => {
    if (typeof Image == "undefined") {
      e({ width: 120, height: 90 });
      return;
    }
    const t = new Image();
    t.onload = () => e({ width: t.naturalWidth || 120, height: t.naturalHeight || 90 }), t.onerror = () => e({ width: 120, height: 90 }), t.src = n;
  });
}
function Zy(n) {
  var i;
  if (n === "plain") return { h: "#6b7280", ht: "#ffffff", b: "#f3f4f6", border: "#c8ccd0" };
  const [e, t = "medium"] = n.split("-"), o = (i = ga[e]) != null ? i : ga.green;
  return t === "light" ? { h: Eo(o, 0.82), ht: ma(o, 0.15), b: Eo(o, 0.93), border: Eo(o, 0.55) } : t === "dark" ? { h: ma(o, 0.25), ht: "#ffffff", b: Eo(o, 0.78), border: o } : { h: o, ht: "#ffffff", b: Eo(o, 0.88), border: "#c8ccd0" };
}
class Qy {
  constructor(e, t) {
    /** 当前渲染器(壳通过 onRenderer 镜像) */
    T(this, "renderer", null);
    /** 视图状态(滚动/缩放/尺寸);壳与控制器共享同一对象 */
    T(this, "view", { scrollX: 0, scrollY: 0, width: 0, height: 0, zoom: 1 });
    T(this, "overlays");
    T(this, "sheet", null);
    T(this, "rafId", 0);
    T(this, "contentW", 0);
    T(this, "contentH", 0);
    /** 虚拟外推行/列数(滚动出空行/空列;只增不减,封顶 Excel 上限)。不动 dimension/文件。 */
    T(this, "virtualRows", 0);
    T(this, "virtualCols", 0);
    // ---- 导出上下文(供 WorkbookExporter 取数) ----
    T(this, "workbook", null);
    T(this, "activeIndex", 0);
    T(this, "rendererOpts", {});
    /** 下载默认文件名(壳可随 props 更新) */
    T(this, "fileName");
    /** 右键上下文菜单宿主(G3;body 级 DOM,框架无关) */
    T(this, "menuHost", new Wm());
    T(this, "lightbox", new Lb());
    T(this, "printPreview", new Pb());
    T(this, "insertFnDialog", new zb());
    T(this, "dvDialog", new Wb());
    T(this, "removeDupDialog", new jb());
    T(this, "t2cDialog", new Kb());
    T(this, "protectSheetDialog", new Jb());
    T(this, "protectWbDialog", new Zb());
    T(this, "allowRangesDialog", new e0());
    T(this, "taskPane", new t0());
    T(this, "pivotDialog", new _m());
    T(this, "pivotPanel", new jm());
    T(this, "pasteConfigDialog", new uu());
    T(this, "readonlyPrompt", new Xm());
    T(this, "validationPrompt", new Zm());
    T(this, "cfDialog", new nb());
    T(this, "numFmtDialog", new lb());
    T(this, "commentDialog", new ab());
    T(this, "pageSetupDialog", new pb());
    T(this, "backgroundDialog", new mb());
    T(this, "seriesDialog", new Pm());
    T(this, "sortDialog", new xb());
    T(this, "imageOversizeDialog", new Fm());
    /** 当前输入提示气泡的签名(格+位置),变了才重建,避免每帧 render 抖动 */
    T(this, "bubbleSig", "");
    /** 用户新建条件格式规则的自增序号(派 id `cf-u<n>`,只增不减,session 内唯一) */
    T(this, "cfSeq", 0);
    /** 格式刷(1.12.0):采样到的样式(armed 时非空)+ 是否连续刷 */
    T(this, "painterStyle", null);
    T(this, "painterSticky", !1);
    /** 透视表"活刷新"重入兜底:recompute 内部 setCellValue 不再触发 onModelChange,此旗保险。 */
    T(this, "pivotRefreshing", !1);
    T(this, "lightboxEnabled", !0);
    /** 用户的右键菜单 transform 回调(Plan C):`(ctx, items) => MenuItem[] | undefined` */
    T(this, "ctxMenuTransform", null);
    /** 原始 .xlsx 字节(壳加载时注入;供高保真 overlay 导出重载原件) */
    T(this, "sourceBuffer", null);
    T(this, "exporter");
    // ---- 选区模型 ----
    T(this, "selAnchor", null);
    // 固定角(扩选时不动)
    T(this, "selActive", null);
    // 活动角(移动/扩选时变)
    T(this, "selMode", "range");
    /** 不连续多区域(1.13.0):Ctrl+点击已提交的"附加选区";当前(anchor/active)是活动区,总选区 = 这些 + 当前。 */
    T(this, "selRanges", []);
    // ---- 拖拽态 ----
    T(this, "dragMode", "none");
    /** 自动填充(1.10.0):拖拽起点的源选区 + 当前目标范围 + 方向 */
    T(this, "fillBase", null);
    T(this, "fillRange", null);
    T(this, "fillDir", "down");
    T(this, "resizeTarget", -1);
    // 正在拖拽改宽高的列/行索引
    // 图片拖拽态(E6)
    T(this, "imageDragIdx", -1);
    T(this, "imageDragStartRect", null);
    T(this, "imageDragStartMouse", { x: 0, y: 0 });
    T(this, "imageDragBefore", null);
    /** 当前选中的浮动图 index(-1 无);画选框+8 控制点、resize 用。 */
    T(this, "selectedImageIdx", -1);
    /** image-resize 拖拽:抓的是哪个控制点方向。 */
    T(this, "imageResizeDir", null);
    /** 裁剪模式:正在裁剪的浮动图 index(-1 非裁剪);此时拖控制点=裁剪而非缩放。 */
    T(this, "cropModeIdx", -1);
    T(this, "imageCropStart", null);
    T(this, "resizeStartPos", 0);
    // 起始鼠标坐标(px)
    T(this, "resizeStartSize", 0);
    // 起始宽/高(px,zoom 后)
    T(this, "resizeStartInfo", null);
    // 拖拽起始的列/行维度信息(克隆,供 undo)
    T(this, "resizeStartModelSize", 0);
    // 拖拽起始的模型 px 尺寸(非缩放,dim-change 事件用)
    T(this, "dragMoved", !1);
    T(this, "dragStartXY", null);
    // mousedown 起点(死区判定:超 3px 才算拖动)
    // ---- 查找态 ----
    T(this, "findQuery", "");
    T(this, "findReplace", "");
    T(this, "findMatchCase", !1);
    T(this, "findWholeCell", !1);
    T(this, "findScope", "sheet");
    T(this, "findDirection", "row");
    T(this, "findLookIn", "value");
    T(this, "findWildcard", !1);
    T(this, "findHits", []);
    // 跨表命中(工作簿范围含多表)
    T(this, "findIndex", -1);
    // 全局命中下标(跨表)
    /** 跨表跳转:切表后待定位的命中(rebuild 重跑查找后应用) */
    T(this, "pendingFindFocus", null);
    /** WPS 查找和替换对话框(框架无关 DOM,三壳共用)。1.16.1 */
    T(this, "findDialog", new m0());
    // ---- 自动筛选态(仅作用于当前表) ----
    T(this, "filterState", /* @__PURE__ */ new Map());
    // 列 → 按值/按条件筛选(缺省=未筛选)
    T(this, "filterPopupHost", new d0());
    T(this, "filterOrigHidden", /* @__PURE__ */ new Map());
    // 行 → 原始 hidden(首次筛选前快照)
    // ---- 排序态(仅作用于当前表;rebuild 时重置) ----
    T(this, "sortCol", -1);
    T(this, "sortDir", null);
    // ---- 编辑配置(默认只读;E0 只做闸门,后续阶段在此扩展) ----
    T(this, "editCfg", {});
    /** 编辑底座(命令栈/快照/事件;E1) */
    T(this, "edit");
    /** 单元格编辑器宿主(E2) */
    T(this, "editorHost");
    /** 按格解析编辑器(壳合并 plugin.editor + prop.editor 后注入;E2) */
    T(this, "editorResolver");
    /** paste 事件处理器(绑在 scroller 上;Ctrl+V 走它拿**原始**剪贴板 HTML,避开 clipboard.read() 的净化) */
    T(this, "onPasteHandler", (e) => this.onPaste(e));
    // ---- 触屏手势(1.16.2:手机端只读高保真查看)----
    // 单指平移交给原生 scroller(touch-action: pan-x pan-y),双指走 pinch 缩放,双击切缩放。
    // 坐标/缩放全走既有 setZoom(保持视口中心),不碰 DPR/命中数学,零回归。
    T(this, "pinching", !1);
    T(this, "pinchStartDist", 0);
    T(this, "pinchStartZoom", 1);
    T(this, "lastTapTime", 0);
    T(this, "lastTapX", 0);
    T(this, "lastTapY", 0);
    T(this, "onTouchStartHandler", (e) => {
      e.touches.length === 2 && (this.pinching = !0, this.pinchStartDist = this.touchDist(e), this.pinchStartZoom = this.view.zoom, e.preventDefault());
    });
    T(this, "onTouchMoveHandler", (e) => {
      if (this.pinching && e.touches.length === 2) {
        e.preventDefault();
        const t = this.touchDist(e);
        this.pinchStartDist > 0 && this.requestZoom(this.pinchStartZoom * (t / this.pinchStartDist));
      }
    });
    T(this, "onTouchEndHandler", (e) => {
      if (this.pinching) {
        e.touches.length < 2 && (this.pinching = !1);
        return;
      }
      if (e.touches.length === 0 && e.changedTouches.length === 1) {
        const t = e.changedTouches[0], o = typeof performance != "undefined" ? performance.now() : 0;
        o - this.lastTapTime < 300 && Math.abs(t.clientX - this.lastTapX) < 30 && Math.abs(t.clientY - this.lastTapY) < 30 ? (this.requestZoom(this.view.zoom < 1.5 ? 2 : 1), this.lastTapTime = 0, e.preventDefault()) : (this.lastTapTime = o, this.lastTapX = t.clientX, this.lastTapY = t.clientY);
      }
    });
    // ===== WPS「插入 → 图片」(浮动式 / 嵌入到单元格)=====
    /** 图片插入模式(WPS 图片下拉顶部单选):'float' 浮动式 / 'cell' 嵌入到单元格。默认 float。 */
    T(this, "imageInsertMode", "float");
    T(this, "showAllCommentsOn", !1);
    T(this, "formulaBarVisible", !0);
    T(this, "freezePreviewOn", !1);
    this.els = e, this.hooks = t, this.overlays = new W0(e.overlays);
    const o = {
      getWorkbook: () => this.workbook,
      getActiveIndex: () => this.activeIndex,
      getLiveRenderer: () => this.renderer,
      getRendererOpts: () => this.rendererOpts,
      getFileName: () => this.fileName,
      getSourceBuffer: () => this.sourceBuffer,
      isPivotEnabled: () => !!this.editCfg.pivotTable
    };
    this.exporter = new Ky(o);
    const i = {
      getSheet: () => this.sheet,
      getWorkbook: () => this.workbook,
      getDate1904: () => {
        var s, r;
        return (r = (s = this.workbook) == null ? void 0 : s.date1904) != null ? r : !1;
      },
      isEditable: (s, r) => this.isCellEditable(s, r),
      isEditingEnabled: () => !!this.editCfg.editable,
      getActiveSheetIndex: () => this.activeIndex,
      isRecalcEnabled: () => !!this.editCfg.editable && !!this.editCfg.recalc,
      getEngineFactory: () => {
        var s;
        return this.editCfg.editable && this.editCfg.recalc ? (s = this.editCfg.formulaEngine) != null ? s : sm : null;
      },
      onModelChange: () => {
        var s;
        this.refreshPivotsAfterEdit(), (s = this.renderer) == null || s.rebuildMetrics(), this.refreshContentSize(), this.render();
      },
      rebuildOverlays: () => {
        this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view);
      },
      emit: (s, r) => this.emitEditEvent(s, r)
    };
    this.edit = new Zg(i), this.editorHost = new Dm(e.editorSlot, (s, r) => this.rectOf(s, r)), e.scroller.addEventListener("paste", this.onPasteHandler), e.scroller.addEventListener("touchstart", this.onTouchStartHandler, { passive: !1 }), e.scroller.addEventListener("touchmove", this.onTouchMoveHandler, { passive: !1 }), e.scroller.addEventListener("touchend", this.onTouchEndHandler, { passive: !1 });
  }
  /** 壳在加载后注入原始字节(供 exportXlsx({fidelity:'overlay'}) 重载原件叠加编辑) */
  setSourceBuffer(e) {
    this.sourceBuffer = e;
  }
  touchDist(e) {
    const t = e.touches[0], o = e.touches[1];
    return Math.hypot(t.clientX - o.clientX, t.clientY - o.clientY);
  }
  /** 手势请求缩放:立即 setZoom(即时顺滑重绘)+ 通知壳同步显示。clamp 0.3–3(比下拉 0.5–2 宽,方便手机看清)。 */
  requestZoom(e) {
    var t, o;
    e = Math.min(3, Math.max(0.3, e)), this.setZoom(e), (o = (t = this.hooks).onZoomChange) == null || o.call(t, e);
  }
  /** 切表/换簿/主题变化: 清状态,重建渲染器,重置滚动,量尺寸,建叠加层,绘制,按需重跑查找 */
  rebuild(e, t, o, i) {
    this.selAnchor = null, this.selActive = null, this.selMode = "range", this.selectImage(-1), this.hooks.onSelectionChange(), this.findHits = [], this.findIndex = -1, this.hooks.onTooltip(null), this.sortCol = -1, this.sortDir = null, this.editorHost.unmount(), this.edit.reset();
    const s = this.workbook !== t;
    this.sheet = e, this.workbook = t, s && (this.edit.resetDirtyBaseline(), this.edit.refreshEngine()), this.activeIndex = Math.max(0, t.sheets.indexOf(e)), this.rendererOpts = i, this.renderer = new Dc(this.els.canvas, e, t, o, K(R({}, i), {
      onNeedsRedraw: () => this.scheduleRender(),
      // WPS 内嵌图异步解码完触发重绘
      isEditable: (r, l) => this.isCellEditable(r, l)
      // Phase C 2026-06-08: 让渲染层感知 editable
    })), this.renderer.showFillHandle = !!this.editCfg.editable, this.renderer.setShowAllComments(this.showAllCommentsOn), this.hooks.onRenderer(this.renderer), this.view.zoom = o, this.view.scrollX = 0, this.view.scrollY = 0, this.virtualRows = 0, this.virtualCols = 0, this.els.scroller.scrollLeft = 0, this.els.scroller.scrollTop = 0, this.refreshContentSize(), this.measure(), this.overlays.build(e, this.renderer, this.view), this.render(), this.findQuery && (this.recomputeFind(), this.resolvePendingFindFocus());
  }
  /** 立即绘制(取消挂起的 rAF)。绘制 + 定位叠加层 + 通知 tick。 */
  render() {
    this.rafId && (cancelAnimationFrame(this.rafId), this.rafId = 0);
    const e = this.renderer;
    e && (e.setSelection(this.getSelection()), e.setExtraSelection(this.selRanges), e.render(this.view), this.sheet && this.overlays.position(this.sheet, e, this.view), this.editorHost.position(), this.updateValidationBubble(), this.taskPane.isOpen() && this.taskPane.refresh(), this.hooks.onRenderTick());
  }
  /** 合并到下一帧绘制(滚动/拖选高频时,每帧最多一次) */
  scheduleRender() {
    this.rafId || (this.rafId = requestAnimationFrame(() => {
      this.rafId = 0, this.render();
    }));
  }
  /** 量可视区尺寸 */
  measure() {
    this.view.width = this.els.renderArea.clientWidth, this.view.height = this.els.renderArea.clientHeight, this.recomputeVirtualExtent();
  }
  /** 同步滚动量(壳的 scroll 事件里调) */
  setScroll(e, t) {
    this.view.scrollX = e, this.view.scrollY = t, this.recomputeVirtualExtent(), this.scheduleRender();
  }
  /** 当前缩放(壳 watch 用它去重,避免 pinch 已改 core 后 watch 再回调一次 setZoom 双重渲染)。 */
  getZoom() {
    return this.view.zoom;
  }
  /** 缩放: 保持视口中心相对内容的比例,避免跳到左上角 */
  setZoom(e) {
    const t = this.renderer, o = this.els.scroller;
    if (!t) return;
    const i = this.contentW ? (o.scrollLeft + o.clientWidth / 2) / this.contentW : 0, s = this.contentH ? (o.scrollTop + o.clientHeight / 2) / this.contentH : 0;
    t.setZoom(e), this.view.zoom = e, this.recomputeVirtualExtent(), this.refreshContentSize(), o.scrollLeft = Math.max(0, i * this.contentW - o.clientWidth / 2), o.scrollTop = Math.max(0, s * this.contentH - o.clientHeight / 2), this.view.scrollX = o.scrollLeft, this.view.scrollY = o.scrollTop, this.render();
  }
  /** 拖拽改列宽(px) */
  setColWidthPx(e, t) {
    var o;
    (o = this.renderer) == null || o.setColWidthPx(e, t), this.refreshContentSize(), this.scheduleRender();
  }
  /** 拖拽改行高(px) */
  setRowHeightPx(e, t) {
    var o;
    (o = this.renderer) == null || o.setRowHeightPx(e, t), this.refreshContentSize(), this.scheduleRender();
  }
  /** 双击列边界: 自适应列宽(editable 时入命令栈/发事件/记脏) */
  autoFitColumn(e) {
    var t;
    this.editCfg.editable && this.beginResizeRecord("col", e), (t = this.renderer) == null || t.autoFitColumn(e), this.refreshContentSize(), this.render(), this.editCfg.editable && this.endResizeRecord("col", e);
  }
  /** 双击行边界: 自适应行高(editable 时入命令栈/发事件/记脏) */
  autoFitRow(e) {
    var t;
    this.editCfg.editable && this.beginResizeRecord("row", e), (t = this.renderer) == null || t.autoFitRow(e), this.refreshContentSize(), this.render(), this.editCfg.editable && this.endResizeRecord("row", e);
  }
  // ---- 维度 / 脏状态 命令式 API(E3.5;Phase B 多形态 2026-06-08) ----
  /**
   * 程序化设列宽 (px, 模型单位/非缩放). Phase B 2026-06-08:
   * target 接 `number | number[] | {from,to}` (DimTarget). 多 index 时聚合成单次 undo.
   * editable 时走命令栈;strictDimensions=true 时该列至少 1 格在白名单内才生效.
   * 返回**成功条数** (0 = 全部 skip / editable=false).
   */
  setColumnWidth(e, t) {
    const o = this.sheet;
    if (!o) return 0;
    const i = _t(e);
    return this.edit.setDimensions("col", i, t, (s) => vt(o, "col", s, this.editCfg));
  }
  /** 程序化设行高 (px, 模型单位/非缩放). 同 setColumnWidth, 维度 = 'row'. */
  setRowHeight(e, t) {
    const o = this.sheet;
    if (!o) return 0;
    const i = _t(e);
    return this.edit.setDimensions("row", i, t, (s) => vt(o, "row", s, this.editCfg));
  }
  /**
   * 批量 autoFit 列宽 (Phase B 2026-06-08). target 不传 = 整表; 传 DimTarget = 选定列.
   * 单 index 走 autoFitColumn (含 resize-record); 多 index 单次 restore-wb undo + 循环 autofit.
   * 返回成功条数.
   */
  autoFitColumns(e) {
    const t = this.sheet, o = this.renderer;
    if (!t || !o) return 0;
    const i = e === void 0 ? Array.from({ length: t.dimension.cols }, (d, u) => u) : _t(e), s = i.filter((d) => d >= 0 && vt(t, "col", d, this.editCfg)), r = i.filter((d) => d >= 0 && !vt(t, "col", d, this.editCfg));
    if (r.length && this.hooks.onEditEvent("permission-denied", { reason: "dimension", cells: [], dims: { axis: "col", indices: r }, message: `${r.length} 列未覆盖白名单,autoFit 跳过` }), !s.length) return 0;
    if (s.length === 1)
      return this.autoFitColumn(s[0]), 1;
    const l = this.workbook;
    if (!l) return 0;
    this.edit.ensureBaseline();
    const a = we(l);
    let c = 0;
    for (const d of s)
      o.autoFitColumn(d), c++;
    return this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: a }), this.edit.markDirtyExternal(), this.refreshContentSize(), this.render(), c;
  }
  /** 批量 autoFit 行高 (Phase B 2026-06-08). 同 autoFitColumns, 维度 = 'row'. */
  autoFitRows(e) {
    const t = this.sheet, o = this.renderer;
    if (!t || !o) return 0;
    const i = e === void 0 ? Array.from({ length: t.dimension.rows }, (d, u) => u) : _t(e), s = i.filter((d) => d >= 0 && vt(t, "row", d, this.editCfg)), r = i.filter((d) => d >= 0 && !vt(t, "row", d, this.editCfg));
    if (r.length && this.hooks.onEditEvent("permission-denied", { reason: "dimension", cells: [], dims: { axis: "row", indices: r }, message: `${r.length} 行未覆盖白名单,autoFit 跳过` }), !s.length) return 0;
    if (s.length === 1)
      return this.autoFitRow(s[0]), 1;
    const l = this.workbook;
    if (!l) return 0;
    this.edit.ensureBaseline();
    const a = we(l);
    let c = 0;
    for (const d of s)
      o.autoFitRow(d), c++;
    return this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: a }), this.edit.markDirtyExternal(), this.refreshContentSize(), this.render(), c;
  }
  /**
   * 重置列宽到默认 (Phase B 2026-06-08) — 移除 sheet.columns Map 条目, 回落到 defaultColWidth.
   * 多 index 单次 undo. 返回成功条数.
   */
  resetColumnWidth(e) {
    const t = this.sheet;
    if (!t) return 0;
    const o = _t(e);
    return this.edit.resetDimensions("col", o, (i) => vt(t, "col", i, this.editCfg));
  }
  /** 重置行高到默认. 同 resetColumnWidth, 维度 = 'row'. */
  resetRowHeight(e) {
    const t = this.sheet;
    if (!t) return 0;
    const o = _t(e);
    return this.edit.resetDimensions("row", o, (i) => vt(t, "row", i, this.editCfg));
  }
  /** 公式引擎是否已就绪(recalc 开启 + 异步 warm 完成);未开重算恒 false。 */
  isRecalcReady() {
    return this.edit.isRecalcReady();
  }
  /** 当前是否有未保存修改(自加载/还原以来发生过编辑或 resize)。 */
  isDirty() {
    return this.edit.isDirty();
  }
  /** 放弃全部修改,还原到刚加载的原件;返回是否还原(无 baseline → false)。 */
  resetToOriginal() {
    return this.edit.resetToOriginal();
  }
  /** 单元格当前屏幕矩形(render-area 相对) */
  rectOf(e, t) {
    const o = this.renderer;
    return o ? o.screenRectOfCell(this.view, e, t) : null;
  }
  /** 区域当前屏幕矩形(左上到右下并集) */
  rectOfRange(e) {
    const t = this.renderer;
    if (!t) return null;
    const o = t.screenRectOfCell(this.view, e.top, e.left), i = t.screenRectOfCell(this.view, e.bottom, e.right);
    return { x: o.x, y: o.y, w: i.x + i.w - o.x, h: i.y + i.h - o.y };
  }
  dispose() {
    this.rafId && cancelAnimationFrame(this.rafId), this.rafId = 0, this.els.scroller.removeEventListener("paste", this.onPasteHandler), this.els.scroller.removeEventListener("touchstart", this.onTouchStartHandler), this.els.scroller.removeEventListener("touchmove", this.onTouchMoveHandler), this.els.scroller.removeEventListener("touchend", this.onTouchEndHandler), this.overlays.dispose(), this.editorHost.dispose(), this.menuHost.dispose(), this.lightbox.dispose(), this.printPreview.dispose(), this.insertFnDialog.dispose(), this.dvDialog.dispose(), this.removeDupDialog.dispose(), this.t2cDialog.dispose(), this.protectSheetDialog.dispose(), this.protectWbDialog.dispose(), this.allowRangesDialog.dispose(), this.taskPane.dispose(), this.filterPopupHost.dispose(), this.findDialog.dispose(), this.pivotDialog.dispose(), this.pivotPanel.dispose(), this.pasteConfigDialog.dispose(), this.readonlyPrompt.dispose(), this.validationPrompt.dispose(), this.cfDialog.dispose(), this.numFmtDialog.dispose(), this.commentDialog.dispose(), this.pageSetupDialog.dispose(), this.backgroundDialog.dispose(), this.seriesDialog.dispose(), this.sortDialog.dispose(), this.imageOversizeDialog.dispose(), this.edit.disposeEngine();
  }
  /** 内容总尺寸变化 → 量 + 直接撑 spacer(滚动范围由它决定) */
  refreshContentSize() {
    const e = this.renderer;
    e && (this.contentW = e.contentWidth, this.contentH = e.contentHeight, this.els.spacer.style.width = this.contentW + "px", this.els.spacer.style.height = this.contentH + "px");
  }
  /**
   * 据当前滚动+视口算"虚拟范围"(滚到数据下方仍有空行/空列可滚动/选中/编辑)。
   * 只增不减(防 spacer 抖动)、封顶 Excel 上限。**不动 dimension/文件**;编辑虚拟格才靠 growDimension 变实。
   * 仅当范围真变化时重建 GridMetrics + 刷 spacer。
   */
  recomputeVirtualExtent() {
    const e = this.renderer;
    if (!e) return;
    const t = e.metrics, o = t.rowAt(this.view.scrollY + this.view.height - t.colHeaderHeight) + 30, i = t.colAt(this.view.scrollX + this.view.width - t.rowHeaderWidth) + 10, s = Math.min($o, Math.max(this.virtualRows, o)), r = Math.min(Zt, Math.max(this.virtualCols, i));
    s === this.virtualRows && r === this.virtualCols || (this.virtualRows = s, this.virtualCols = r, e.setVirtualExtent(s, r) && this.refreshContentSize());
  }
  /** 当前虚拟范围(含 dimension 兜底);供调试/e2e。 */
  getVirtualExtent() {
    var t, o, i;
    const e = (t = this.renderer) == null ? void 0 : t.metrics;
    return { rows: (o = e == null ? void 0 : e.vRows) != null ? o : 0, cols: (i = e == null ? void 0 : e.vCols) != null ? i : 0 };
  }
  // ====================== 选区模型 ======================
  /** 当前选区(随 mode 解析为单元格/整行/整列范围,含合并单元格扩展) */
  getSelection() {
    var r, l;
    const e = this.renderer, t = this.selAnchor, o = this.selActive;
    if (!e || !t || !o) return null;
    if (this.selMode === "rows")
      return { top: Math.min(t.row, o.row), bottom: Math.max(t.row, o.row), left: 0, right: e.metrics.cols - 1 };
    if (this.selMode === "cols")
      return { left: Math.min(t.col, o.col), right: Math.max(t.col, o.col), top: 0, bottom: e.metrics.rows - 1 };
    const i = (r = e.mergeAt(t.row, t.col)) != null ? r : ya(t), s = (l = e.mergeAt(o.row, o.col)) != null ? l : ya(o);
    return {
      top: Math.min(i.top, s.top),
      left: Math.min(i.left, s.left),
      bottom: Math.max(i.bottom, s.bottom),
      right: Math.max(i.right, s.right)
    };
  }
  /** 活动单元格(选区的"焦点"角) */
  getActiveCell() {
    return this.selActive;
  }
  /** 全部选区(不连续多选时含多个矩形;末个为当前活动区)。空选返 []。1.13.0 */
  getSelectionRanges() {
    const e = this.getSelection();
    return e ? [...this.selRanges, e] : [...this.selRanges];
  }
  /** 是否处于不连续多区域选择(>1 个矩形)。 */
  hasMultiSelection() {
    return this.selRanges.length > 0;
  }
  /** 选区统计(状态栏用):多选时跨所有区域聚合(count/sum/min/max/avg)。空返 null。1.13.0 */
  getSelectionStats() {
    const e = this.renderer, t = this.getSelectionRanges();
    if (!e || !t.length) return null;
    if (t.length === 1) return e.selectionStats(t[0]);
    let o = 0, i = 0, s = 0, r = 1 / 0, l = -1 / 0;
    for (const a of t) {
      const c = e.selectionStats(a);
      o += c.count, i += c.numCount, s += c.sum, c.numCount && (r = Math.min(r, c.min), l = Math.max(l, c.max));
    }
    return { count: o, numCount: i, sum: s, avg: i ? s / i : 0, min: i ? r : 0, max: i ? l : 0 };
  }
  /**
   * 活动格(或指定格)在公式栏里**可编辑的字符串**:
   * 公式 → `=...`;数值 → 原始数字串(非格式化,避免编辑货币/千分位被当文本);布尔 → TRUE/FALSE;
   * 日期/字符串/富文本 → 显示文本。空格返 ''。供公式栏 / 命令式取活动格编辑值。
   */
  getCellEditString(e, t) {
    var i, s;
    const o = e != null && t != null ? { row: e, col: t } : this.selActive;
    return o && (s = (i = this.edit.getCellSnapshot(o.row, o.col)) == null ? void 0 : i.editText) != null ? s : "";
  }
  /** 活动格此刻是否可经公式栏/命令式编辑(editable 开 + 该格非只读) */
  canEditActiveCell() {
    const e = this.selActive;
    return !!(e && this.editCfg.editable && this.isCellEditable(e.row, e.col));
  }
  /**
   * 经公式栏提交活动格的值(value 同 editCell 的输入语义:`=`→公式、数字串→数字…)。
   * 仅在 editable + 该格可编辑时生效;move='down' 时提交后活动格下移(像 Excel 回车)。返回是否提交。
   */
  commitActiveCellValue(e, t) {
    const o = this.selActive;
    if (!o || !this.editCfg.editable || !this.isCellEditable(o.row, o.col)) return !1;
    if (this.editorHost.isActive() && this.cancelEdit(), e !== this.getCellEditString(o.row, o.col)) {
      if (!this.passValidation(o.row, o.col, e)) return !1;
      this.edit.editCell(o.row, o.col, e);
    }
    if (t === "down" && this.renderer) {
      const i = Math.min(o.row + 1, this.renderer.metrics.rows - 1);
      this.selectCell(i, o.col);
    }
    return !0;
  }
  /** 清空选区 */
  clearSelection() {
    this.selAnchor = null, this.selActive = null, this.selMode = "range", this.selRanges = [], this.hooks.onSelectionChange();
  }
  /** 全选 */
  selectAll() {
    const e = this.renderer;
    e && (this.selMode = "range", this.selRanges = [], this.selAnchor = { row: 0, col: 0 }, this.selActive = { row: e.metrics.rows - 1, col: e.metrics.cols - 1 }, this.hooks.onSelectionChange());
  }
  /** 选中单个单元格并滚动到视图(查找定位用);range 模式,anchor=active */
  selectCell(e, t) {
    this.selMode = "range", this.selRanges = [], this.selAnchor = { row: e, col: t }, this.selActive = { row: e, col: t }, this.scrollActiveIntoView(), this.hooks.onSelectionChange(), this.render();
  }
  /** 滚动到指定单元格;select=true 时同步选中目标格。 */
  scrollToCell(e, t, o) {
    const i = this.renderer;
    if (!i) return !1;
    const s = Math.max(0, Math.min(e, $o - 1)), r = Math.max(0, Math.min(t, Zt - 1));
    (s >= i.metrics.vRows || r >= i.metrics.vCols) && (this.virtualRows = Math.max(this.virtualRows, s + 1), this.virtualCols = Math.max(this.virtualCols, r + 1), i.setVirtualExtent(this.virtualRows, this.virtualCols) && this.refreshContentSize());
    const l = i.mergeAt(s, r), a = l ? { row: l.top, col: l.left } : { row: s, col: r };
    return o != null && o.select ? (this.selectCell(a.row, a.col), !0) : (this.scrollCellIntoView(a), this.render(), !0);
  }
  /** 命令式设选区(anchor=左上, active=右下) */
  setSelectionRange(e) {
    this.selMode = "range", this.selRanges = [], this.selAnchor = { row: e.top, col: e.left }, this.selActive = { row: e.bottom, col: e.right }, this.hooks.onSelectionChange(), this.render();
  }
  setCell(e, t) {
    this.selMode = "range", t && this.selAnchor ? this.selActive = e : (this.selAnchor = e, this.selActive = e), this.hooks.onSelectionChange();
  }
  setRows(e, t) {
    this.selMode = "rows";
    const o = { row: e, col: 0 };
    t && this.selAnchor ? this.selActive = o : (this.selAnchor = o, this.selActive = o), this.hooks.onSelectionChange();
  }
  setCols(e, t) {
    this.selMode = "cols";
    const o = { row: 0, col: e };
    t && this.selAnchor ? this.selActive = o : (this.selAnchor = o, this.selActive = o), this.hooks.onSelectionChange();
  }
  // ====================== 命中检测 ======================
  localXY(e) {
    const t = this.els.renderArea.getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top };
  }
  hitRegion(e) {
    const t = this.renderer, o = this.localXY(e);
    if (!t || !o) return { region: "none" };
    const i = t.metrics.rowHeaderWidth, s = t.metrics.colHeaderHeight;
    if (o.x < i && o.y < s) return { region: "corner" };
    if (o.x < i) return { region: "row", row: t.rowAtScreen(this.view, o.y) };
    if (o.y < s) return { region: "col", col: t.colAtScreen(this.view, o.x) };
    const r = t.cellAtScreen(this.view, o.x, o.y);
    return r ? { region: "cell", row: r.row, col: r.col } : { region: "none" };
  }
  nearColBorder(e, t) {
    const o = this.renderer;
    if (!o || t >= o.metrics.colHeaderHeight) return null;
    const i = o.colAtScreen(this.view, e);
    if (i < 0) return null;
    const s = o.screenRectOfCell(this.view, 0, i);
    return Math.abs(e - (s.x + s.w)) <= 4 ? { col: i } : Math.abs(e - s.x) <= 4 && i > 0 ? { col: i - 1 } : null;
  }
  nearRowBorder(e, t) {
    const o = this.renderer;
    if (!o || e >= o.metrics.rowHeaderWidth) return null;
    const i = o.rowAtScreen(this.view, t);
    if (i < 0) return null;
    const s = o.screenRectOfCell(this.view, i, 0);
    return Math.abs(t - (s.y + s.h)) <= 4 ? { row: i } : Math.abs(t - s.y) <= 4 && i > 0 ? { row: i - 1 } : null;
  }
  // ====================== 鼠标交互 ======================
  onMouseDown(e) {
    if (e.button !== 0) return;
    this.clearFreezePreview(), this.els.scroller.focus();
    const t = this.renderer, o = this.localXY(e);
    if (t && o) {
      const r = t.filterButtonAt(this.view, o.x, o.y);
      if (r != null) {
        this.openFilterPopup(r);
        return;
      }
      const l = t.dataValidationButtonAt(this.view, o.x, o.y);
      if (l && this.editCfg.editable && this.isCellEditable(l.row, l.col)) {
        this.openDataValidationPicker(l, e);
        return;
      }
    }
    if (t && o && this.editCfg.pivotTable) {
      const r = t.pivotToggleAt(this.view, o.x, o.y);
      if (r) {
        this.togglePivotGroup(r.tableIdx, r.key);
        return;
      }
    }
    if (t && o && this.editCfg.editable && this.sheet) {
      const r = this.imageHandleAt(o);
      if (r && this.selectedImageIdx >= 0) {
        const a = this.cropModeIdx === this.selectedImageIdx && r !== "rotate";
        this.dragMode = a ? "image-crop" : r === "rotate" ? "image-rotate" : "image-resize", this.imageResizeDir = r === "rotate" ? null : r, this.imageDragIdx = this.selectedImageIdx, this.imageDragStartRect = Ie(t.metrics, this.sheet.images[this.selectedImageIdx]), this.imageDragStartMouse = { x: o.x, y: o.y }, this.imageDragBefore = Ee(this.sheet.images[this.selectedImageIdx]);
        const c = this.sheet.images[this.selectedImageIdx].crop;
        this.imageCropStart = c ? R({}, c) : { l: 0, t: 0, r: 0, b: 0 }, this.edit.ensureBaseline();
        return;
      }
      this.cropModeIdx >= 0 && this.exitImageCrop();
      const l = this.imageHitAt(o);
      if (l >= 0) {
        this.dragMode = "image", this.imageDragIdx = l, this.imageDragStartRect = Ie(t.metrics, this.sheet.images[l]), this.imageDragStartMouse = { x: o.x, y: o.y }, this.imageDragBefore = Ee(this.sheet.images[l]), this.selectImage(l), this.render(), this.edit.ensureBaseline();
        return;
      }
      this.selectedImageIdx >= 0 && (this.selectImage(-1), this.render());
    }
    if (t && o && this.editCfg.editable && this.selActive && t.fillHandleAt(this.view, o.x, o.y)) {
      this.dragMode = "fill", this.fillBase = this.getSelection(), this.fillRange = this.fillBase, this.dragMoved = !1, this.dragStartXY = o;
      return;
    }
    if (t && o) {
      if (o.y < t.metrics.colHeaderHeight) {
        const r = this.nearColBorder(o.x, o.y);
        if (r) {
          this.dragMode = "resize-col", this.resizeTarget = r.col, this.resizeStartPos = o.x, this.resizeStartSize = t.metrics.colWidth(r.col), this.beginResizeRecord("col", r.col);
          return;
        }
      } else if (o.x < t.metrics.rowHeaderWidth) {
        const r = this.nearRowBorder(o.x, o.y);
        if (r) {
          this.dragMode = "resize-row", this.resizeTarget = r.row, this.resizeStartPos = o.y, this.resizeStartSize = t.metrics.rowHeight(r.row), this.beginResizeRecord("row", r.row);
          return;
        }
      }
    }
    const i = this.hitRegion(e);
    this.dragMoved = !1, this.dragStartXY = this.localXY(e);
    const s = (e.ctrlKey || e.metaKey) && !e.shiftKey;
    if (i.region === "row" || i.region === "col" || i.region === "cell")
      if (s) {
        const r = this.getSelection();
        r && this.selRanges.push(r);
      } else
        this.selRanges = [];
    else
      this.selRanges = [];
    i.region === "corner" ? (this.selectAll(), this.dragMode = "none") : i.region === "row" ? (this.dragMode = "row", this.setRows(i.row, e.shiftKey)) : i.region === "col" ? (this.dragMode = "col", this.setCols(i.col, e.shiftKey)) : i.region === "cell" ? (this.dragMode = "cell", this.setCell({ row: i.row, col: i.col }, e.shiftKey)) : this.dragMode = "none", this.render();
  }
  onMouseMove(e) {
    if (this.dragMode !== "none") {
      const t = this.renderer, o = this.localXY(e);
      if (!t || !o) return;
      if ((!this.dragStartXY || Math.abs(o.x - this.dragStartXY.x) > 3 || Math.abs(o.y - this.dragStartXY.y) > 3) && (this.dragMoved = !0), this.dragMode === "image" && this.imageDragStartRect && this.sheet) {
        const i = o.x - this.imageDragStartMouse.x, s = o.y - this.imageDragStartMouse.y;
        Ci(
          this.sheet,
          this.imageDragIdx,
          {
            left: this.imageDragStartRect.left + i,
            top: this.imageDragStartRect.top + s,
            width: this.imageDragStartRect.width,
            height: this.imageDragStartRect.height
          },
          this.view.zoom
        ), this.render();
        return;
      }
      if (this.dragMode === "image-rotate" && this.imageDragStartRect && this.sheet) {
        const i = this.imageDragStartRect, s = t.metrics.rowHeaderWidth + i.left + i.width / 2 - this.view.scrollX, r = t.metrics.colHeaderHeight + i.top + i.height / 2 - this.view.scrollY;
        let l = Math.round(Math.atan2(o.y - r, o.x - s) * 180 / Math.PI + 90);
        l = (l % 360 + 360) % 360, this.sheet.images[this.imageDragIdx].rotation = l, this.render();
        return;
      }
      if (this.dragMode === "image-crop" && this.imageDragStartRect && this.imageResizeDir && this.imageCropStart && this.sheet) {
        const i = this.imageDragStartRect, s = this.imageResizeDir, r = this.imageCropStart, l = o.x - this.imageDragStartMouse.x, a = o.y - this.imageDragStartMouse.y, c = (u, h) => Math.max(0, Math.min(h, u)), d = R({}, r);
        s.includes("e") && (d.r = c(r.r - l / i.width, 0.9 - r.l)), s.includes("w") && (d.l = c(r.l + l / i.width, 0.9 - r.r)), s.includes("s") && (d.b = c(r.b - a / i.height, 0.9 - r.t)), s.includes("n") && (d.t = c(r.t + a / i.height, 0.9 - r.b)), this.sheet.images[this.imageDragIdx].crop = d.l || d.t || d.r || d.b ? d : void 0, this.render();
        return;
      }
      if (this.dragMode === "image-resize" && this.imageDragStartRect && this.imageResizeDir && this.sheet) {
        const i = this.imageDragStartRect, s = this.imageResizeDir, r = (this.sheet.images[this.imageDragIdx].rotation || 0) * Math.PI / 180, l = o.x - this.imageDragStartMouse.x, a = o.y - this.imageDragStartMouse.y, c = Math.cos(-r), d = Math.sin(-r), u = l * c - a * d, h = l * d + a * c, p = 12;
        let m = i.left, b = i.top, v = i.width, y = i.height;
        s.includes("e") && (v = i.width + u), s.includes("s") && (y = i.height + h), s.includes("w") && (v = i.width - u, m = i.left + u), s.includes("n") && (y = i.height - h, b = i.top + h), v < p && (s.includes("w") && (m = i.left + i.width - p), v = p), y < p && (s.includes("n") && (b = i.top + i.height - p), y = p), Ci(this.sheet, this.imageDragIdx, { left: m, top: b, width: v, height: y }, this.view.zoom), this.render();
        return;
      }
      if (this.dragMode === "resize-col") {
        this.setColWidthPx(this.resizeTarget, this.resizeStartSize + (o.x - this.resizeStartPos));
        return;
      }
      if (this.dragMode === "resize-row") {
        this.setRowHeightPx(this.resizeTarget, this.resizeStartSize + (o.y - this.resizeStartPos));
        return;
      }
      if (this.dragMode === "fill") {
        this.updateFillPreview(o);
        return;
      }
      if (this.dragMode === "cell") {
        const i = t.cellAtScreen(this.view, o.x, o.y);
        i && (this.selActive = i, this.hooks.onSelectionChange(), this.scheduleRender());
      } else if (this.dragMode === "row") {
        const i = t.rowAtScreen(this.view, o.y);
        i >= 0 && (this.selActive = { row: i, col: 0 }, this.hooks.onSelectionChange(), this.scheduleRender());
      } else {
        const i = t.colAtScreen(this.view, o.x);
        i >= 0 && (this.selActive = { row: 0, col: i }, this.hooks.onSelectionChange(), this.scheduleRender());
      }
      return;
    }
    this.updateHover(e);
  }
  onMouseUp(e) {
    var t;
    if (this.dragMode === "cell" && !this.dragMoved) {
      const o = this.hitRegion(e), i = this.renderer;
      if (o.region === "cell" && i) {
        this.hooks.onCellClick(o.row, o.col, i.cellText(o.row, o.col));
        const s = i.cellHyperlink(o.row, o.col);
        s && this.hooks.onHyperlink(s, { row: o.row, col: o.col });
      }
    } else if (this.dragMode === "resize-col")
      this.endResizeRecord("col", this.resizeTarget);
    else if (this.dragMode === "resize-row")
      this.endResizeRecord("row", this.resizeTarget);
    else if (this.dragMode === "image" || this.dragMode === "image-resize" || this.dragMode === "image-rotate" || this.dragMode === "image-crop") {
      if (this.dragMoved && this.imageDragBefore && this.sheet) {
        const o = Ee(this.sheet.images[this.imageDragIdx]);
        this.edit.recordImageEdit(this.imageDragIdx, this.imageDragBefore, o);
      }
      this.imageDragBefore = null, this.imageDragStartRect = null, this.imageDragIdx = -1, this.imageResizeDir = null, this.imageCropStart = null;
    } else this.dragMode === "fill" && (this.applyFill(e.ctrlKey || e.metaKey), (t = this.renderer) == null || t.setFillPreview(null), this.fillBase = null, this.fillRange = null, this.render());
    this.painterStyle && (this.dragMode === "cell" || this.dragMode === "row" || this.dragMode === "col") && this.applyFormatPainterIfArmed(), this.dragMode = "none";
  }
  // ===== 自动填充(1.10.0)=====
  /** 拖拽填充柄时:按鼠标位置算目标范围(主轴 = 偏移更大的方向),设预览。 */
  updateFillPreview(e) {
    const t = this.renderer, o = this.fillBase;
    if (!t || !o) return;
    const i = t.cellAtScreen(this.view, e.x, e.y);
    if (!i) return;
    const s = i.row - o.bottom, r = o.top - i.row, l = i.col - o.right, a = o.left - i.col, c = Math.max(s, r, 0), d = Math.max(l, a, 0);
    if (c === 0 && d === 0) {
      this.fillRange = o, this.fillDir = "down", t.setFillPreview(null), this.scheduleRender();
      return;
    }
    c >= d ? s >= r ? (this.fillDir = "down", this.fillRange = { top: o.top, left: o.left, bottom: i.row, right: o.right }) : (this.fillDir = "up", this.fillRange = { top: i.row, left: o.left, bottom: o.bottom, right: o.right }) : l >= a ? (this.fillDir = "right", this.fillRange = { top: o.top, left: o.left, bottom: o.bottom, right: i.col }) : (this.fillDir = "left", this.fillRange = { top: o.top, left: i.col, bottom: o.bottom, right: o.right }), t.setFillPreview(this.fillRange), this.scheduleRender();
  }
  /** 松手:用源选区接续序列填进新增格(整体单次撤销),并把选区扩到合并范围。ctrl 翻转复制↔序列。 */
  applyFill(e = !1) {
    const t = this.fillBase, o = this.fillRange, i = this.sheet;
    if (!t || !o || !i) return;
    const s = (d, u) => ct(i, d, u), r = this.fillDir === "down" || this.fillDir === "up", l = this.fillDir === "down", a = this.fillDir === "right", c = [];
    if (r) {
      const d = l ? o.bottom - t.bottom : t.top - o.top;
      if (d <= 0) return;
      for (let u = t.left; u <= t.right; u++) {
        const h = [];
        for (let b = t.top; b <= t.bottom; b++) h.push(b);
        const p = (l ? h : h.slice().reverse()).map((b) => s(b, u)), m = il(p, d, e);
        for (let b = 0; b < d; b++) {
          const v = l ? t.bottom + 1 + b : t.top - 1 - b;
          c.push({ row: v, col: u, value: m[b] });
        }
      }
    } else {
      const d = a ? o.right - t.right : t.left - o.left;
      if (d <= 0) return;
      for (let u = t.top; u <= t.bottom; u++) {
        const h = [];
        for (let b = t.left; b <= t.right; b++) h.push(b);
        const p = (a ? h : h.slice().reverse()).map((b) => s(u, b)), m = il(p, d, e);
        for (let b = 0; b < d; b++) {
          const v = a ? t.right + 1 + b : t.left - 1 - b;
          c.push({ row: u, col: v, value: m[b] });
        }
      }
    }
    c.length && this.edit.setCellsBatch(c) && this.setSelectionRange(o);
  }
  /** 命中最上层浮动图(editable;p 为 render-area 坐标含表头);返回 index 或 -1。 */
  imageHitAt(e) {
    const t = this.renderer, o = this.sheet;
    if (!t || !o) return -1;
    const i = t.metrics.rowHeaderWidth, s = t.metrics.colHeaderHeight;
    if (e.x < i || e.y < s) return -1;
    for (let r = o.images.length - 1; r >= 0; r--) {
      const l = Ie(t.metrics, o.images[r]), a = i + l.left - this.view.scrollX, c = s + l.top - this.view.scrollY;
      if (e.x >= a && e.x <= a + l.width && e.y >= c && e.y <= c + l.height) return r;
    }
    return -1;
  }
  /**
   * 命中选中浮动图的 8 控制点 / 旋转柄;无则 null。坐标全 CSS 像素(localXY + metrics),DPR 安全。
   * 图旋转时:把鼠标点绕图中心**反旋转**回图局部坐标系再按基础矩形命中(控制点跟图一起转)。
   */
  imageHandleAt(e) {
    var k;
    const t = this.renderer, o = this.selectedImageIdx >= 0 ? (k = this.sheet) == null ? void 0 : k.images[this.selectedImageIdx] : null;
    if (!t || !o) return null;
    const i = Ie(t.metrics, o), s = t.metrics.rowHeaderWidth + i.left - this.view.scrollX, r = t.metrics.colHeaderHeight + i.top - this.view.scrollY, l = i.width, a = i.height, c = s + l / 2, d = r + a / 2, u = (o.rotation || 0) * Math.PI / 180, h = e.x - c, p = e.y - d, m = Math.cos(-u), b = Math.sin(-u), v = c + h * m - p * b, y = d + h * b + p * m, w = 7;
    if (Math.abs(v - c) <= 8 && Math.abs(y - (r - 26)) <= 8) return "rotate";
    const S = {
      nw: [s, r],
      n: [s + l / 2, r],
      ne: [s + l, r],
      e: [s + l, r + a / 2],
      se: [s + l, r + a],
      s: [s + l / 2, r + a],
      sw: [s, r + a],
      w: [s, r + a / 2]
    };
    for (const C of qc) {
      const [M, E] = S[C];
      if (Math.abs(v - M) <= w && Math.abs(y - E) <= w) return C;
    }
    return null;
  }
  /** 设选中浮动图并刷新选框(-1 清)。 */
  selectImage(e) {
    this.selectedImageIdx !== e && (this.cropModeIdx >= 0 && this.cropModeIdx !== e && (this.cropModeIdx = -1), this.selectedImageIdx = e, this.overlays.setSelectedImage(e));
  }
  // ---- resize → 命令栈记账(仅 editable;E3.5) ----
  /** 拖拽起始:editable 时捕获 baseline + 起始维度信息(供 undo / dim-change)。 */
  beginResizeRecord(e, t) {
    var o, i;
    if (!(!this.editCfg.editable || !this.sheet))
      if (this.edit.ensureBaseline(), e === "col") {
        const s = this.sheet.columns.get(t);
        this.resizeStartInfo = s ? R({}, s) : null, this.resizeStartModelSize = (o = s == null ? void 0 : s.width) != null ? o : this.sheet.defaultColWidth;
      } else {
        const s = this.sheet.rows.get(t);
        this.resizeStartInfo = s ? R({}, s) : null, this.resizeStartModelSize = (i = s == null ? void 0 : s.height) != null ? i : this.sheet.defaultRowHeight;
      }
  }
  /** 拖拽结束:模型已被 renderer 改完,补登一条 undo 项 + 发 dim-change。 */
  endResizeRecord(e, t) {
    var i, s, r, l;
    if (!this.editCfg.editable || !this.sheet) return;
    const o = e === "col" ? (s = (i = this.sheet.columns.get(t)) == null ? void 0 : i.width) != null ? s : this.sheet.defaultColWidth : (l = (r = this.sheet.rows.get(t)) == null ? void 0 : r.height) != null ? l : this.sheet.defaultRowHeight;
    this.edit.recordDimEdit(e, t, this.resizeStartInfo, this.resizeStartModelSize, o), this.resizeStartInfo = null;
  }
  onMouseLeave() {
    this.hooks.onTooltip(null);
  }
  /** 右键上下文菜单(G3;仅 editable;只读用浏览器默认菜单)。壳把 contextmenu 事件转给它。 */
  /**
   * 右键事件入口(Plan C 全面开放):
   *  1. 算 ctx(选区 + 单/多格 + 活动格);右键不在当前选区 → 先选中(仿 Excel)
   *  2. 算内置 items(`buildBuiltinContextMenuItems`,editable 时才有,否则空)
   *  3. 跑用户 `setContextMenuTransform` 回调(可加/减/重排)
   *  4. 触发 `onContextMenuBefore` 钩子(可 preventDefault)
   *  5. 没被 prevent + items 非空 → 弹内置浮层;无论是否弹,都触发 `onContextMenuShow`(让用户也能自渲染)
   */
  onContextMenu(e) {
    var a, c, d, u, h, p;
    const t = this.editCfg.editable ? this.localXY(e) : null, o = t ? this.imageHitAt(t) : -1;
    if (o >= 0) {
      const m = this.buildImageContextMenuItems(o);
      m.length && (e.preventDefault(), this.menuHost.show(e.clientX, e.clientY, m));
      return;
    }
    const i = this.buildContextMenuCtx(e);
    if (!i) return;
    let s = this.buildBuiltinContextMenuItems(i);
    if (this.ctxMenuTransform) {
      const m = this.ctxMenuTransform(i, s);
      Array.isArray(m) && (s = m);
    }
    let r = !1;
    const l = () => {
      r = !0;
    };
    if ((c = (a = this.hooks).onContextMenuBefore) == null || c.call(a, { event: e, ctx: i, items: s, preventDefault: l }), r) {
      e.preventDefault(), (u = (d = this.hooks).onContextMenuShow) == null || u.call(d, { x: e.clientX, y: e.clientY, ctx: i, items: s });
      return;
    }
    s.length && (e.preventDefault(), this.menuHost.show(e.clientX, e.clientY, s)), (p = (h = this.hooks).onContextMenuShow) == null || p.call(h, { x: e.clientX, y: e.clientY, ctx: i, items: s });
  }
  /** 算右键 ctx:命中格 + 选区调整;非内容区 / 无 renderer 返 null */
  buildContextMenuCtx(e) {
    const t = this.renderer, o = this.localXY(e);
    if (!t || !o) return null;
    const i = t.cellAtScreen(this.view, o.x, o.y);
    let s = this.getSelection();
    if (i && (!s || i.row < s.top || i.row > s.bottom || i.col < s.left || i.col > s.right) && (this.selectCell(i.row, i.col), this.render(), s = this.getSelection()), !s || !this.sheet || !this.workbook) return null;
    const r = R({}, s), l = r.top === r.bottom && r.left === r.right;
    return {
      range: r,
      single: l,
      activeCell: { row: r.top, col: r.left },
      sheet: this.sheet,
      workbook: this.workbook,
      editable: !!this.editCfg.editable
    };
  }
  /** 内置右键菜单项(独立提取,便于 transform 回调拿到再二次加工)。
   *  只读模式:只返回**不改数据**的项(复制) —— 复制不修改数据源,只读也该能用;编辑模式给全套。 */
  buildBuiltinContextMenuItems(e) {
    var d, u, h;
    const t = e.range, o = { label: "复制", action: () => void this.copySelection() };
    if (!e.editable) return [o];
    const i = t.bottom - t.top + 1, s = t.right - t.left + 1, r = e.single;
    let l = !1, a = !0;
    for (let p = t.top; p <= t.bottom; p++)
      for (let m = t.left; m <= t.right; m++)
        this.isCellEditable(p, m) ? l = !0 : a = !1;
    const c = [
      o,
      { label: "粘贴", disabled: !l, action: () => void this.pasteFromClipboard() },
      {
        label: "选择性粘贴",
        disabled: !l,
        children: [
          { label: "覆盖格式(贴近源)", action: () => void this.pasteFromClipboard(rt) },
          { label: "保留原样式(仅值)", action: () => void this.pasteFromClipboard(Rn) }
        ]
      },
      { separator: !0 },
      { label: `在上方插入 ${i} 行`, action: () => this.insertRows(t.top, i) },
      { label: `在左侧插入 ${s} 列`, action: () => this.insertCols(t.left, s) },
      { label: `删除 ${i} 行`, disabled: !a, action: () => this.deleteRows(t.top, i) },
      { label: `删除 ${s} 列`, disabled: !a, action: () => this.deleteCols(t.left, s) },
      { separator: !0 },
      { label: "合并单元格", disabled: r || !a, action: () => this.mergeCells(t) },
      { label: "拆分单元格", disabled: !a, action: () => this.unmergeCells(t) },
      {
        label: (this.getSelectionWrapState() === "all" ? "✓ " : "") + "自动换行",
        disabled: !l,
        action: () => this.toggleWrapTextOnSelection()
      },
      { separator: !0 },
      { label: "清除内容", disabled: !l, action: () => this.clearRange(t) }
    ];
    if (r) {
      const p = !!this.getCellComment(t.top, t.left);
      c.push({ separator: !0 }), c.push({ label: p ? "编辑批注" : "插入批注", disabled: !l, action: () => this.openCommentEditor(t.top, t.left) }), p && c.push({ label: "删除批注", action: () => this.setCellComment(t.top, t.left, "") });
    }
    if (!r) {
      const m = ((d = e.sheet.images) != null ? d : []).reduce((v, y, w) => {
        const S = this.imageCellOf(w);
        return v + (S && S.row >= t.top && S.row <= t.bottom && S.col >= t.left && S.col <= t.right ? 1 : 0);
      }, 0);
      let b = 0;
      for (let v = t.top; v <= t.bottom; v++)
        for (let y = t.left; y <= t.right; y++)
          (u = e.sheet.cells.get(X(v, y))) != null && u.dispImgId && b++;
      if (m > 0 || b > 0) {
        const v = [];
        m > 0 && v.push({ label: `选区浮动图全部嵌入(${m} 张)`, action: () => this.convertImagesInRangeToCell(t) }), b > 0 && v.push({ label: `选区内嵌图全部浮动化(${b} 张)`, action: () => this.convertCellImagesInRangeToFloat(t) }), c.push({ separator: !0 }, ...v);
      }
    }
    if (r) {
      const p = t.top, m = t.left, b = e.sheet.cells.get(X(p, m)), v = (h = e.sheet.images) != null ? h : [], y = [];
      if (b != null && b.dispImgId) {
        const w = this.getCellImageAt(p, m);
        this.lightboxEnabled && (w != null && w.src) && y.push({
          label: "查看大图 / 下载原图",
          action: () => {
            var S;
            return this.openImageLightbox(w.src, `${w.id}.${((S = w.mime) == null ? void 0 : S.split("/")[1]) || "png"}`, w.mime);
          }
        }), y.push({ label: "内嵌图转为浮动图", action: () => this.convertCellImageToFloat(p, m) });
      }
      if (v.length) {
        const w = v.findIndex((k, C) => {
          const M = this.imageCellOf(C);
          return !!M && M.row === p && M.col === m;
        });
        w >= 0 && y.push({ label: "将此处浮动图嵌入单元格", action: () => this.convertImageToCellAuto(w) });
        const S = v.reduce((k, C, M) => {
          var E;
          return k + (((E = this.imageCellOf(M)) == null ? void 0 : E.col) === m ? 1 : 0);
        }, 0);
        S > 0 && y.push({ label: `整列浮动图嵌入单元格(${S} 张)`, action: () => this.convertAllImagesToCells(m) }), y.push({ label: `整表浮动图嵌入单元格(${v.length} 张)`, action: () => this.convertAllImagesToCells() });
      }
      y.length && c.push({ separator: !0 }, ...y);
    }
    return c;
  }
  /** 设置用户 transform 回调(`(ctx, items) => MenuItem[] | undefined`);壳侧调用 */
  setContextMenuTransform(e) {
    this.ctxMenuTransform = e != null ? e : null;
  }
  /** 程序化打开菜单(键盘 Shift+F10 / 自定义触发);items 不给则按当前选区算内置 */
  openContextMenu(e, t, o) {
    if (o && o.length) {
      this.menuHost.show(e, t, o);
      return;
    }
    const i = this.getSelection();
    if (!i || !this.sheet || !this.workbook) return;
    const s = {
      range: R({}, i),
      single: i.top === i.bottom && i.left === i.right,
      activeCell: { row: i.top, col: i.left },
      sheet: this.sheet,
      workbook: this.workbook,
      editable: !!this.editCfg.editable
    };
    let r = this.editCfg.editable ? this.buildBuiltinContextMenuItems(s) : [];
    if (this.ctxMenuTransform) {
      const l = this.ctxMenuTransform(s, r);
      Array.isArray(l) && (r = l);
    }
    r.length && this.menuHost.show(e, t, r);
  }
  /** 关闭当前菜单(无打开则 no-op) */
  closeContextMenu() {
    this.menuHost.close();
  }
  updateHover(e) {
    const t = this.renderer, o = this.els.scroller, i = this.localXY(e);
    if (!t || !i) {
      this.hooks.onTooltip(null);
      return;
    }
    if (this.painterStyle) {
      o.style.cursor = "copy", this.hooks.onTooltip(null);
      return;
    }
    if (this.editCfg.editable && this.selActive && t.fillHandleAt(this.view, i.x, i.y)) {
      o.style.cursor = "crosshair", this.hooks.onTooltip(null);
      return;
    }
    if (i.y < t.metrics.colHeaderHeight && this.nearColBorder(i.x, i.y)) {
      o.style.cursor = "col-resize", this.hooks.onTooltip(null);
      return;
    }
    if (i.x < t.metrics.rowHeaderWidth && this.nearRowBorder(i.x, i.y)) {
      o.style.cursor = "row-resize", this.hooks.onTooltip(null);
      return;
    }
    const s = t.cellAtScreen(this.view, i.x, i.y);
    if (!s) {
      this.hooks.onTooltip(null), o.style.cursor = "";
      return;
    }
    this.editCfg.editable && !this.isCellEditable(s.row, s.col) ? o.style.cursor = t.cellHyperlink(s.row, s.col) ? "pointer" : "not-allowed" : o.style.cursor = t.cellHyperlink(s.row, s.col) ? "pointer" : "cell";
    const r = i.x + 14, l = i.y + 18, a = t.commentAt(s.row, s.col);
    if (a) {
      this.hooks.onTooltip({ text: a, x: r, y: l, kind: "comment" });
      return;
    }
    const c = t.overflowTextAt(s.row, s.col);
    this.hooks.onTooltip(c ? { text: c, x: r, y: l, kind: "overflow" } : null);
  }
  onDblClick(e) {
    var r, l, a;
    const t = this.renderer, o = this.localXY(e);
    if (!t || !o) return;
    const i = this.nearColBorder(o.x, o.y), s = i ? null : this.nearRowBorder(o.x, o.y);
    if (i)
      this.autoFitColumn(i.col);
    else if (s)
      this.autoFitRow(s.row);
    else {
      const c = t.cellAtScreen(this.view, o.x, o.y);
      if (!c) return;
      if (this.lightboxEnabled) {
        const d = this.imageHitAt(o);
        if (d >= 0) {
          const h = (r = this.sheet) == null ? void 0 : r.images[d];
          if (h != null && h.src) {
            this.openImageLightbox(h.src, `image-${d + 1}.${((l = h.mime) == null ? void 0 : l.split("/")[1]) || "png"}`, h.mime);
            return;
          }
        }
        const u = this.getCellImageAt(c.row, c.col);
        if (u != null && u.src) {
          this.openImageLightbox(u.src, `${u.id}.${((a = u.mime) == null ? void 0 : a.split("/")[1]) || "png"}`, u.mime);
          return;
        }
      }
      this.editCfg.editable && this.isCellEditable(c.row, c.col) ? this.beginEdit(c.row, c.col) : this.hooks.onCellDblClick(c.row, c.col, t.cellText(c.row, c.col));
    }
  }
  // ====================== 键盘交互 ======================
  pageRows() {
    const e = this.renderer;
    return e ? Math.max(1, Math.floor((this.view.height - e.metrics.colHeaderHeight) / e.defaultRowPx) - 1) : 10;
  }
  onKeyDown(e) {
    if (e.key === "Escape" && this.painterStyle) {
      this.cancelFormatPainter(), e.preventDefault();
      return;
    }
    if (this.selectedImageIdx >= 0 && this.editCfg.editable && !this.isEditing()) {
      if (e.key === "Escape") {
        this.cropModeIdx >= 0 ? this.exitImageCrop() : (this.selectImage(-1), this.render()), e.preventDefault();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const u = this.selectedImageIdx;
        this.selectImage(-1), this.removeImage(u), this.render(), e.preventDefault();
        return;
      }
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
      e.shiftKey ? this.edit.redo() : this.edit.undo(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
      this.edit.redo(), e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
      this.copySelection(), e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) {
      this.selectAll(), this.render(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && (e.ctrlKey || e.metaKey) && (e.key === "e" || e.key === "E")) {
      this.flashFill(), e.preventDefault();
      return;
    }
    if (this.editCfg.editable && this.selActive && !this.isEditing()) {
      const { row: u, col: h } = this.selActive;
      if (e.key === "F2") {
        this.beginEdit(u, h), e.preventDefault();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        this.isCellEditable(u, h) && this.edit.clearRange({ top: u, left: h, bottom: u, right: h }), e.preventDefault();
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && this.beginEdit(u, h, e.key)) {
        e.preventDefault();
        return;
      }
    }
    const t = this.renderer;
    if (!t || !this.selActive) return;
    const o = t.metrics.rows - 1, i = t.metrics.cols - 1, s = e.ctrlKey || e.metaKey;
    let { row: r, col: l } = this.selActive, a = !0;
    switch (e.key) {
      case "ArrowUp":
        if (s) {
          const u = mn(t, r, l, -1, 0);
          r = u.row, l = u.col;
        } else r = Math.max(0, r - 1);
        break;
      case "ArrowDown":
        if (s) {
          const u = mn(t, r, l, 1, 0);
          r = u.row, l = u.col;
        } else r = Math.min(o, r + 1);
        break;
      case "ArrowLeft":
        if (s) {
          const u = mn(t, r, l, 0, -1);
          r = u.row, l = u.col;
        } else l = Math.max(0, l - 1);
        break;
      case "ArrowRight":
        if (s) {
          const u = mn(t, r, l, 0, 1);
          r = u.row, l = u.col;
        } else l = Math.min(i, l + 1);
        break;
      case "Home":
        l = 0, s && (r = 0);
        break;
      case "End":
        l = i, e.ctrlKey && (r = o);
        break;
      case "PageUp":
        r = Math.max(0, r - this.pageRows());
        break;
      case "PageDown":
        r = Math.min(o, r + this.pageRows());
        break;
      case "Enter":
        r = Math.min(o, r + 1);
        break;
      case "Tab":
        l = e.shiftKey ? Math.max(0, l - 1) : Math.min(i, l + 1);
        break;
      default:
        a = !1;
    }
    if (!a) return;
    e.preventDefault();
    const c = t.mergeAt(r, l);
    c && (r = c.top, l = c.left), this.selMode = "range", this.selRanges = [], this.selActive = { row: r, col: l }, e.shiftKey && e.key !== "Tab" || (this.selAnchor = { row: r, col: l }), this.scrollActiveIntoView(), this.hooks.onSelectionChange(), this.render();
  }
  scrollActiveIntoView() {
    this.selActive && this.scrollCellIntoView(this.selActive);
  }
  scrollCellIntoView(e) {
    const t = this.renderer, o = this.els.scroller;
    if (!t || !e) return;
    const i = t.metrics.rowHeaderWidth, s = t.metrics.colHeaderHeight, r = t.freezeGeometry;
    let l = o.scrollLeft, a = o.scrollTop;
    if (e.col >= r.frozenCols) {
      const c = t.metrics.colLeft(e.col), d = c + t.metrics.colWidth(e.col), u = this.view.width - i;
      d > l + u && (l = d - u), c < l + r.frozenWidth && (l = c - r.frozenWidth);
    }
    if (e.row >= r.frozenRows) {
      const c = t.metrics.rowTop(e.row), d = c + t.metrics.rowHeight(e.row), u = this.view.height - s;
      d > a + u && (a = d - u), c < a + r.frozenHeight && (a = c - r.frozenHeight);
    }
    l = Math.max(0, l), a = Math.max(0, a), (l !== o.scrollLeft || a !== o.scrollTop) && (o.scrollLeft = l, o.scrollTop = a, this.view.scrollX = l, this.view.scrollY = a);
  }
  // ====================== 复制 ======================
  async copySelection() {
    var E, P, I, L, F;
    if (this.selRanges.length > 0) return this.copyMultiSelection();
    const e = this.renderer, t = this.getSelection(), o = this.sheet, i = this.workbook;
    if (!e || !t || !o || !i) return;
    const s = Math.min(t.bottom, t.top + 4999), r = Math.min(t.right, t.left + 255), l = { top: t.top, left: t.left, bottom: s, right: r }, a = this.hasFilters(), c = (N) => {
      var O;
      return !(a && ((O = o.rows.get(N)) != null && O.hidden));
    }, d = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Map();
    for (const N of o.merges)
      if (!(N.top < l.top || N.left < l.left || N.bottom > l.bottom || N.right > l.right)) {
        u.set(X(N.top, N.left), { rs: N.bottom - N.top + 1, cs: N.right - N.left + 1 });
        for (let O = N.top; O <= N.bottom; O++) for (let D = N.left; D <= N.right; D++) (O !== N.top || D !== N.left) && d.add(X(O, D));
      }
    let h = 0;
    for (let N = l.top; N <= l.bottom; N++)
      if (c(N))
        for (let O = l.left; O <= l.right; O++) {
          const D = (E = o.cells.get(X(N, O))) == null ? void 0 : E.dispImgId, W = D ? (P = i.cellImages) == null ? void 0 : P.get(D) : void 0;
          W != null && W.bytes && (h += W.bytes.length);
        }
    for (const N of o.images)
      N.from.row >= l.top && N.from.row <= l.bottom && c(N.from.row) && N.from.col >= l.left && N.from.col <= l.right && N.bytes && (h += N.bytes.length);
    const p = h > $g;
    p && this.hooks.onEditEvent("permission-denied", {
      reason: "copy",
      cells: [],
      message: `复制内容含图过多(约 ${Math.round(h / 1024 / 1024)} MB),已按无图复制以避免剪贴板超限`
    });
    const m = (N) => {
      var O, D;
      return Math.round((D = (O = o.columns.get(N)) == null ? void 0 : O.width) != null ? D : o.defaultColWidth);
    }, b = (N) => {
      var O, D;
      return Math.round((D = (O = o.rows.get(N)) == null ? void 0 : O.height) != null ? D : o.defaultRowHeight);
    }, v = /* @__PURE__ */ new Map();
    if (!p) {
      const N = (D, W, H, V, Y) => {
        var ce;
        const ee = (ce = v.get(D)) != null ? ce : [];
        ee.push({ key: W, url: H, w: V, h: Y }), v.set(D, ee);
      };
      for (let D = l.top; D <= l.bottom; D++)
        if (c(D))
          for (let W = l.left; W <= l.right; W++) {
            const H = (I = o.cells.get(X(D, W))) == null ? void 0 : I.dispImgId, V = H ? (L = i.cellImages) == null ? void 0 : L.get(H) : void 0;
            H && (V != null && V.bytes) && V.mime && N(X(D, W), `c:${H}`, `data:${V.mime};base64,${no(V.bytes)}`, m(W), b(D));
          }
      let O = 0;
      for (const D of o.images) {
        if (D.from.row < l.top || D.from.row > l.bottom || !c(D.from.row) || D.from.col < l.left || D.from.col > l.right || !D.bytes || !D.mime) continue;
        const W = D.extWidthEmu ? Math.round(Lo(D.extWidthEmu)) : m(D.from.col), H = D.extHeightEmu ? Math.round(Lo(D.extHeightEmu)) : b(D.from.row);
        N(X(D.from.row, D.from.col), `f:${O}`, `data:${D.mime};base64,${no(D.bytes)}`, W, H), O++;
      }
    }
    const y = [], w = [];
    for (let N = l.top; N <= l.bottom; N++) {
      if (!c(N)) continue;
      const O = [], D = [];
      for (let W = l.left; W <= l.right; W++) {
        const H = e.cellText(N, W);
        if (O.push(H), d.has(X(N, W))) continue;
        const V = e.cellInlineStyle(N, W), Y = u.get(X(N, W)), ee = Y ? `${Y.rs > 1 ? ` rowspan="${Y.rs}"` : ""}${Y.cs > 1 ? ` colspan="${Y.cs}"` : ""}` : "", ce = ((F = v.get(X(N, W))) != null ? F : []).map((le) => `<img data-clip-img="${le.key}" width="${le.w}" height="${le.h}" src="${le.url}" style="width:${le.w}px;height:${le.h}px" />`).join("");
        D.push(`<td${ee}${V ? ` style="${V}"` : ""}>${wa(H)}${ce}</td>`);
      }
      y.push(O.join("	")), w.push(`<tr>${D.join("")}</tr>`);
    }
    const S = y.join(`
`), k = Ag(o, i, l, { withImageBytes: !1, rowVisible: c }), M = `<table data-ooxml-clip="${Rg(p ? Ng(k) : k)}" border="1" style="border-collapse:collapse">${w.join("")}</table>`;
    await Ll(S, M);
  }
  /**
   * 不连续多选复制(1.13.0):把各区域按出现顺序**逐行堆叠**成一个块 → TSV + HTML 表写剪贴板。
   * 覆盖最常见场景(Ctrl 点多个行头复制非相邻行);列对齐以各区自身宽度。粘到 Excel/WPS / app 内都成堆叠块。
   * 注:不带 ooxml-clip 快照(多区无单一矩形快照),app 内粘贴走 HTML 解析(值 + 基本样式)。
   */
  async copyMultiSelection() {
    var a, c;
    const e = this.renderer, t = this.sheet;
    if (!e || !t) return;
    const o = this.hasFilters(), i = [], s = [];
    for (const d of this.getSelectionRanges()) {
      const u = Math.min(d.bottom, d.top + 4999), h = Math.min(d.right, d.left + 255);
      for (let p = d.top; p <= u; p++) {
        if (o && ((a = t.rows.get(p)) != null && a.hidden)) continue;
        const m = [], b = [];
        for (let v = d.left; v <= h; v++) {
          const y = (c = e.cellText(p, v)) != null ? c : "";
          m.push(y.replace(/[\t\n]/g, " "));
          const w = e.cellInlineStyle(p, v);
          b.push(`<td${w ? ` style="${w}"` : ""}>${wa(y)}</td>`);
        }
        i.push(m.join("	")), s.push(`<tr>${b.join("")}</tr>`);
      }
    }
    const r = i.join(`
`), l = `<table border="1" style="border-collapse:collapse">${s.join("")}</table>`;
    await Ll(r, l);
  }
  /**
   * paste 事件粘贴(Ctrl+V 主路径,绑在 scroller 上)。`e.clipboardData` 给的是**原始未净化** HTML/图片/文本 ——
   * 关键:`navigator.clipboard.read()`(pasteFromClipboard 用)会净化 HTML、删掉 `<style>` 块和注释,而 WPS/Excel
   * 的格式(CSS 类)、数字格式(mso-number-format)、内嵌图(VML o:gfxdata)全在那里面 → 走 read 必丢。paste 事件不净化。
   * 我们自己复制的快照(data-ooxml-clip)也一并原样拿到,1:1 不受影响。
   */
  /**
   * 统一出口(核心层唯一只读反馈点):**任何**改数据的操作撞只读 → EditController/控制器都经 `host.emit` 走到这里,
   * 按 `readOnlyPrompt` 配置(dialog/toast/none)弹一次内置提醒,再转壳事件。新增输入方式只要照常走 EditController
   * 的 API(其内 `isEditable` 中央闸门已逐格拦截 + emit permission-denied),无需各自重写只读检查/提醒。
   */
  emitEditEvent(e, t) {
    var o, i, s;
    if (e === "permission-denied") {
      const r = t;
      r != null && r.reason && r.reason !== "dimension" && this.readonlyPrompt.show((o = this.editCfg.readOnlyPrompt) != null ? o : "dialog", (i = r.message) != null ? i : "目标只读,操作已跳过", (s = r.cells) != null ? s : []);
    }
    this.hooks.onEditEvent(e, t);
  }
  onPaste(e) {
    var l, a;
    const t = e.clipboardData;
    if (!t) return;
    const o = t.getData("text/html"), i = t.getData("text/plain"), s = (a = Array.from((l = t.items) != null ? l : []).find((c) => c.kind === "file" && c.type.startsWith("image/"))) == null ? void 0 : a.getAsFile(), r = !!o || !!i || !!s;
    if (!this.editCfg.editable) {
      r && (e.preventDefault(), this.emitEditEvent("permission-denied", { reason: "paste", cells: [], message: "当前为只读模式,无法粘贴(开启编辑后再试)" }));
      return;
    }
    if (o && this.pasteRichHtml(o)) {
      e.preventDefault();
      return;
    }
    if (s) {
      this.pasteImageBlob(s), e.preventDefault();
      return;
    }
    i && this.pasteText(i) && e.preventDefault();
  }
  /**
   * 从系统剪贴板粘贴(右键菜单"粘贴"等无 paste 事件的入口用)。`clipboard.read()` 拿 text/html —— 注意它会**净化**
   * HTML(删 `<style>`/注释),所以从 WPS/Excel 粘的格式不如 Ctrl+V(走 onPaste 的原始 HTML)全。否则单图 / TSV 兜底。
   */
  async pasteFromClipboard(e) {
    var o;
    if (!this.editCfg.editable)
      return this.emitEditEvent("permission-denied", { reason: "paste", cells: [], message: "当前为只读模式,无法粘贴(开启编辑后再试)" }), !1;
    const t = navigator.clipboard;
    try {
      if (t != null && t.read) {
        const i = await t.read();
        for (const s of i)
          if (s.types.includes("text/html")) {
            const r = await (await s.getType("text/html")).text();
            if (this.pasteRichHtml(r, void 0, e)) return !0;
          }
        for (const s of i) {
          const r = s.types.find((l) => l.startsWith("image/"));
          if (r && await this.pasteImageBlob(await s.getType(r))) return !0;
        }
      }
    } catch (i) {
    }
    try {
      const i = await ((o = t == null ? void 0 : t.readText) == null ? void 0 : o.call(t));
      return i ? this.pasteText(i) : !1;
    } catch (i) {
      return !1;
    }
  }
  /**
   * 解析 Excel/WPS 复制的剪贴板 HTML(text/html)→ 富粘贴:值 + 字体/颜色/填充/边框/对齐 + 合并 + data-uri 图,
   * **整体单次撤销**。无 `<table>` 返 false(调用方回退 TSV)。at 缺省用活动格。
   */
  pasteRichHtml(e, t, o) {
    var a;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const i = this.getSelection(), s = (a = t != null ? t : this.selActive) != null ? a : i ? { row: i.top, col: i.left } : null;
    if (!s) return !1;
    const r = Og(e);
    if (r) return this.edit.pasteSnapshot(s, r, o);
    const l = $b(e);
    return l ? this.edit.pasteRich(s, l, o) : !1;
  }
  /** 读当前粘贴行为配置(完整)。 */
  getPasteBehavior() {
    return this.edit.getPasteBehavior();
  }
  /** 设粘贴行为默认(缺项回落默认);影响 Ctrl+V / 右键「粘贴」。右键「选择性粘贴」逐次预设走 pasteRichHtml 的第 3 参。 */
  setPasteBehavior(e) {
    this.edit.setPasteBehavior(e);
  }
  /** 打开「粘贴行为配置」面板(框架无关 DOM,三壳共用);应用即 setPasteBehavior。需 editable。 */
  openPasteConfigDialog() {
    return this.editCfg.editable ? (this.pasteConfigDialog.show({ current: this.edit.getPasteBehavior(), onSubmit: (e) => this.edit.setPasteBehavior(e) }), !0) : !1;
  }
  getImageInsertMode() {
    return this.imageInsertMode;
  }
  setImageInsertMode(e) {
    this.imageInsertMode = e, this.hooks.onRenderTick();
  }
  /**
   * 插入一张图片 blob:mode='cell' 嵌入到单元格(DISPIMG 式,复用 pasteImageBlob);
   * 'float' 浮动图(锚在活动格 / at,默认 120×90px)。需 editable。单次撤销。
   */
  async insertImageBlob(e, t = "float", o) {
    var h;
    if (!this.editCfg.editable || !this.sheet) return !1;
    if (t === "cell") return this.pasteImageBlob(e, o);
    const i = this.getSelection(), s = (h = o != null ? o : this.selActive) != null ? h : i ? { row: i.top, col: i.left } : { row: 0, col: 0 }, r = new Uint8Array(await e.arrayBuffer()), l = e.type || "image/png", a = await Jy(e), c = await ba(a), d = cl(c, al(r, l));
    return this.addImage({ src: a, bytes: r, mime: l, from: { col: s.col, row: s.row, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: ft(d.width), extHeightEmu: ft(d.height) }) < 0 ? !1 : (this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render(), this.selectCell(s.row, s.col), !0);
  }
  /**
   * WPS「图片 → 本地图片 / 批量插图」:弹系统文件选择器,选中的图片按 mode 插入。
   * 批量(multiple)时依次向下错开一行/一格避免叠一起。需 editable(且浏览器环境)。
   */
  openImagePicker(e = this.imageInsertMode, t) {
    if (!this.editCfg.editable || !this.sheet || typeof document == "undefined") return !1;
    const o = document.createElement("input");
    return o.type = "file", o.accept = "image/*", t != null && t.multiple && (o.multiple = !0), o.style.position = "fixed", o.style.left = "-9999px", o.addEventListener("change", () => {
      var r, l;
      const i = Array.from((r = o.files) != null ? r : []), s = (l = this.selActive) != null ? l : this.getSelection() ? { row: this.getSelection().top, col: this.getSelection().left } : { row: 0, col: 0 };
      (async () => {
        const a = i.filter((d) => d.size > dl);
        let c = !1;
        if (a.length) {
          const d = await this.promptImageOversize(a.length, a.reduce((u, h) => u + h.size, 0));
          if (d === null) {
            o.remove();
            return;
          }
          c = d;
        }
        for (let d = 0; d < i.length; d++) {
          const u = c && i[d].size > dl ? await Im(i[d]) : i[d];
          await this.insertImageBlob(u, e, { row: s.row + d, col: s.col });
        }
        o.remove();
      })();
    }, { once: !0 }), document.body.appendChild(o), o.click(), !0;
  }
  /** 弹"图片较大是否压缩"框;resolve true=压缩 / false=保持原图 / null=取消整批。 */
  promptImageOversize(e, t) {
    return new Promise((o) => {
      this.imageOversizeDialog.show({
        count: e,
        totalBytes: t,
        onCompress: () => o(!0),
        onKeep: () => o(!1),
        onCancel: () => o(null)
      });
    });
  }
  /** 把一张图片 blob 落到活动格(转内嵌图);剪贴板单图粘贴 / 拖文件进网格用。 */
  async pasteImageBlob(e, t) {
    var c;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const o = this.getSelection(), i = (c = t != null ? t : this.selActive) != null ? c : o ? { row: o.top, col: o.left } : { row: 0, col: 0 }, s = new Uint8Array(await e.arrayBuffer()), r = e.type || "image/png", l = this.addImage({ src: "", bytes: s, mime: r, from: { col: i.col, row: i.row, colOffEmu: 0, rowOffEmu: 0 }, extWidthEmu: ft(96), extHeightEmu: ft(96) });
    if (l < 0) return !1;
    const a = this.convertImageToCell(l, i.row, i.col);
    return a && (this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.selectCell(i.row, i.col), this.render()), a;
  }
  /**
   * 把 TSV(Excel/表格复制的制表符分隔文本)粘到选区左上角(无 at 时用活动格)。
   * 值类型自动推断(纯数字串→数字、`=`→公式)、跳过只读格;入命令栈可撤销。返回是否有改动。
   */
  pasteText(e, t) {
    var d;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const o = lv(e);
    if (!o.length) return !1;
    const i = this.getSelection(), s = (d = t != null ? t : this.selActive) != null ? d : i ? { row: i.top, col: i.left } : null;
    if (!s) return !1;
    const r = s.row, l = s.col, a = r + o.length - 1, c = l + Math.max(1, ...o.map((u) => u.length)) - 1;
    return this.edit.editRange({ top: r, left: l, bottom: a, right: c }, o);
  }
  // ====================== 查找 ======================
  /** 查找状态快照(壳渲染查找和替换对话框) */
  getFindState() {
    return {
      query: this.findQuery,
      matchCase: this.findMatchCase,
      wholeCell: this.findWholeCell,
      count: this.findHits.length,
      index: this.findIndex,
      replace: this.findReplace,
      scope: this.findScope,
      direction: this.findDirection,
      lookIn: this.findLookIn,
      wildcard: this.findWildcard
    };
  }
  /** 「全部查找」结果列表(跨表命中:sheet 下标 + 表名 + 行列 + 显示值)。 */
  getFindResults() {
    const e = this.workbook;
    return this.findHits.map((t) => {
      var o, i;
      return K(R({}, t), { sheetName: (i = (o = e == null ? void 0 : e.sheets[t.sheet]) == null ? void 0 : o.name) != null ? i : "" });
    });
  }
  setFindQuery(e) {
    this.findQuery = e, this.recomputeFind();
  }
  setFindMatchCase(e) {
    this.findMatchCase = e, this.recomputeFind();
  }
  setFindWholeCell(e) {
    this.findWholeCell = e, this.recomputeFind();
  }
  setFindScope(e) {
    this.findScope = e, this.recomputeFind();
  }
  setFindDirection(e) {
    this.findDirection = e, this.recomputeFind();
  }
  setFindLookIn(e) {
    this.findLookIn = e, this.recomputeFind();
  }
  setFindWildcard(e) {
    this.findWildcard = e, this.recomputeFind();
  }
  findOptions() {
    return {
      query: this.findQuery,
      matchCase: this.findMatchCase,
      wholeCell: this.findWholeCell,
      wildcard: this.findWildcard,
      scope: this.findScope,
      direction: this.findDirection,
      lookIn: this.findLookIn
    };
  }
  /** 重算命中并应用(query/选项变化时)。跨表命中,索引重置到第一处。 */
  recomputeFind() {
    var e;
    if (!this.workbook || !this.renderer || !this.findQuery) {
      this.findHits = [], this.findIndex = -1, (e = this.renderer) == null || e.setFind([], -1), this.notifyFindChange(), this.render();
      return;
    }
    this.findHits = Zl(this.workbook, this.activeIndex, this.findOptions()), this.findIndex = this.findHits.length ? 0 : -1, this.applyFind();
  }
  /** 查找态变化通知(壳 + 对话框计数刷新)。 */
  notifyFindChange() {
    this.hooks.onFindChange(), this.findDialog.refresh();
  }
  /** 把当前活动表的命中应用到渲染器(高亮),并定位当前命中(必要时跨表跳转)。 */
  applyFind() {
    const e = this.renderer;
    if (!e) return;
    const t = this.findHits.filter((s) => s.sheet === this.activeIndex).map((s) => ({ row: s.row, col: s.col })), o = this.findHits[this.findIndex], i = o && o.sheet === this.activeIndex ? t.findIndex((s) => s.row === o.row && s.col === o.col) : -1;
    e.setFind(t, i), this.notifyFindChange(), o && o.sheet === this.activeIndex ? this.selectCell(o.row, o.col) : this.render();
  }
  /** 打开 WPS 查找和替换对话框(框架无关;三壳只转发)。tab 缺省 'find'。 */
  openFindReplaceDialog(e = "find") {
    if (this.findDialog.isOpen()) {
      this.findDialog.refresh();
      return;
    }
    this.findDialog.open({
      editable: !!this.editCfg.editable,
      initialTab: e,
      getState: () => this.getFindState(),
      onQuery: (t) => this.setFindQuery(t),
      onReplace: (t) => this.setFindReplace(t),
      onMatchCase: (t) => this.setFindMatchCase(t),
      onWholeCell: (t) => this.setFindWholeCell(t),
      onWildcard: (t) => this.setFindWildcard(t),
      onScope: (t) => this.setFindScope(t),
      onDirection: (t) => this.setFindDirection(t),
      onLookIn: (t) => this.setFindLookIn(t),
      onFindNext: () => this.findNext(),
      onFindPrev: () => this.findPrev(),
      onFindAll: () => this.getFindResults(),
      onGotoResult: (t) => this.gotoFindHit(t),
      onReplaceOne: () => this.replaceCurrent(),
      onReplaceAll: () => this.replaceAll(),
      onClose: () => this.clearFind()
    }), this.hooks.onFindChange();
  }
  isFindDialogOpen() {
    return this.findDialog.isOpen();
  }
  /** 关闭对话框 + 清查找态。 */
  closeFindReplaceDialog() {
    this.findDialog.close(), this.clearFind();
  }
  /** 定位到第 gi 个全局命中;若在别的表 → 请求壳切表,rebuild 后由 pendingFindFocus 落位。 */
  focusHit(e) {
    var o, i;
    const t = this.findHits[e];
    t && (this.findIndex = e, t.sheet !== this.activeIndex ? (this.pendingFindFocus = { sheet: t.sheet, row: t.row, col: t.col }, (i = (o = this.hooks).onActiveSheetChange) == null || i.call(o, t.sheet)) : this.applyFind());
  }
  /** rebuild 重跑查找后调用:若有待定位命中且落在当前表,选中它。 */
  resolvePendingFindFocus() {
    const e = this.pendingFindFocus;
    if (!e || e.sheet !== this.activeIndex) return;
    this.pendingFindFocus = null;
    const t = this.findHits.findIndex((o) => o.sheet === this.activeIndex && o.row === e.row && o.col === e.col);
    t >= 0 && (this.findIndex = t, this.applyFind());
  }
  findNext() {
    this.findHits.length && this.focusHit((this.findIndex + 1) % this.findHits.length);
  }
  findPrev() {
    this.findHits.length && this.focusHit((this.findIndex - 1 + this.findHits.length) % this.findHits.length);
  }
  /** 「全部查找」结果表点某行 → 跳到该命中。 */
  gotoFindHit(e) {
    e >= 0 && e < this.findHits.length && this.focusHit(e);
  }
  /** 关闭查找: 清 query + 命中(保留选项),清除高亮 */
  clearFind() {
    var e;
    this.findQuery = "", this.findHits = [], this.findIndex = -1, this.pendingFindFocus = null, (e = this.renderer) == null || e.setFind([], -1), this.notifyFindChange(), this.render();
  }
  // ====================== 替换(1.11.0,需 editable)======================
  // 替换作用于**活动表**(跨表命令栈批处理不支持,工作簿范围下也只替当前表);批注 lookIn 仅查不替。
  setFindReplace(e) {
    this.findReplace = e;
  }
  /** 按当前查找选项把字符串里的命中换掉;无命中返 null。 */
  replaceInString(e) {
    if (this.findWholeCell || this.findWildcard) {
      const o = zc(this.findOptions());
      return o && o(e) ? this.findReplace : null;
    }
    const t = new RegExp(rv(this.findQuery), this.findMatchCase ? "g" : "gi");
    return t.test(e) ? e.replace(t, this.findReplace) : null;
  }
  /** 替换当前命中格(替换后重算命中并定位下一个);返回是否替换了。 */
  replaceCurrent() {
    if (!this.editCfg.editable || !this.findQuery || this.findLookIn === "comment") return !1;
    const e = this.findHits[this.findIndex];
    if (!e) return !1;
    if (e.sheet !== this.activeIndex)
      return this.findNext(), !1;
    if (!this.isCellEditable(e.row, e.col))
      return this.findNext(), !1;
    const t = this.replaceInString(this.getCellEditString(e.row, e.col));
    return t == null ? (this.findNext(), !1) : (this.editCell(e.row, e.col, t), this.recomputeFind(), !0);
  }
  /** 全部替换(活动表);返回替换的格数(整体单次撤销)。 */
  replaceAll() {
    const e = this.workbook;
    if (!this.editCfg.editable || !this.findQuery || !e || this.findLookIn === "comment") return 0;
    const t = Zl(e, this.activeIndex, K(R({}, this.findOptions()), { scope: "sheet" })), o = [];
    for (const i of t) {
      if (!this.isCellEditable(i.row, i.col)) continue;
      const s = this.replaceInString(this.getCellEditString(i.row, i.col));
      s != null && o.push({ row: i.row, col: i.col, value: s });
    }
    return o.length ? (this.edit.setCellsBatch(o), this.recomputeFind(), o.length) : 0;
  }
  // ====================== 自动筛选 ======================
  /** 当前是否有列处于筛选中(工具栏「清除筛选」启用判断) */
  hasFilters() {
    return this.filterState.size > 0;
  }
  /** 筛选数据区底行: 正常用 af.bottom;若 af 只含表头(bottom===top)则延伸到数据末行 */
  filterDataBottom() {
    const e = this.sheet, t = e.autoFilterRange;
    return t.bottom > t.top ? t.bottom : e.dimension.rows - 1;
  }
  /** 某列(自动筛选数据区)的去重值,数值/中文自然排序 */
  distinctColumnValues(e) {
    const t = this.renderer, o = this.sheet;
    if (!t || !(o != null && o.autoFilterRange)) return [];
    const i = o.autoFilterRange, s = /* @__PURE__ */ new Set();
    for (let r = i.top + 1; r <= this.filterDataBottom(); r++) s.add(t.cellText(r, e) || pa);
    return [...s].sort((r, l) => r.localeCompare(l, void 0, { numeric: !0 }));
  }
  /** 取一格喂给条件引擎的三元(显示文本 + 数值 + 日期 ms)。 */
  filterCellValue(e, t) {
    var l;
    const o = ((l = this.renderer) == null ? void 0 : l.cellText(e, t)) || "", i = this.sheet ? ct(this.sheet, e, t) : null;
    let s = null, r = null;
    if (typeof i == "number" ? s = i : i instanceof Date && (r = i.getTime()), s === null) {
      const a = o.replace(/,/g, "").trim();
      a && /^-?\d+(\.\d+)?$/.test(a) && (s = Number(a));
    }
    if (r === null && o) {
      const a = Date.parse(o);
      isNaN(a) || (r = a);
    }
    return { text: o, num: s, dateMs: r };
  }
  /** 重算筛选导致的隐藏行并应用到模型(行隐藏机制 → 几何归零) */
  applyFilters() {
    var r, l, a;
    const e = this.renderer, t = this.sheet;
    if (!e || !(t != null && t.autoFilterRange)) return;
    const o = t.autoFilterRange, i = this.filterDataBottom();
    if (!this.filterOrigHidden.size)
      for (let c = o.top + 1; c <= i; c++) this.filterOrigHidden.set(c, (l = (r = t.rows.get(c)) == null ? void 0 : r.hidden) != null ? l : !1);
    const s = /* @__PURE__ */ new Map();
    for (const [c, d] of this.filterState)
      if ("cond" in d) {
        let u = d.cond;
        if (u.type === "top10" || u.type === "aboveAvg" || u.type === "belowAvg") {
          const h = [];
          for (let p = o.top + 1; p <= i; p++) {
            const m = this.filterCellValue(p, c).num;
            m !== null && h.push(m);
          }
          u = l0(u, h);
        }
        s.set(c, u);
      }
    for (let c = o.top + 1; c <= i; c++) {
      const d = (a = this.filterOrigHidden.get(c)) != null ? a : !1;
      let u = !1;
      for (const [m, b] of this.filterState)
        if ("values" in b) {
          if (!b.values.has(e.cellText(c, m) || pa)) {
            u = !0;
            break;
          }
        } else if (!a0(s.get(m), this.filterCellValue(c, m))) {
          u = !0;
          break;
        }
      const h = d || u, p = t.rows.get(c);
      p ? p.hidden = h : h && t.rows.set(c, { height: t.defaultRowHeight, hidden: !0 });
    }
    e.setFilteredCols(new Set(this.filterState.keys())), e.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render();
  }
  /** 点中下拉按钮 / 命令式: 打开某列筛选浮层(算去重值 + 已选 + 屏幕位置) */
  /** 列表型数据验证下拉:在箭头处弹可选值菜单(复用右键菜单宿主),点选 → editCell(undo 可回退)。 */
  openDataValidationPicker(e, t) {
    var s, r;
    const o = (r = (s = this.sheet) == null ? void 0 : s.dataValidationLists) == null ? void 0 : r.find(
      (l) => e.row >= l.range.top && e.row <= l.range.bottom && e.col >= l.range.left && e.col <= l.range.right
    );
    if (!o || !o.options.length) return;
    const i = o.options.map((l) => ({ label: l, action: () => this.editCell(e.row, e.col, l) }));
    this.menuHost.show(t.clientX, t.clientY, i);
  }
  /**
   * 数据验证拦截:提交某值前校验。返回 true=放行(可写入),false=拦截(stop,不写入)。
   * stop → 弹模态拒绝;warning/information → 弹 toast 但放行;公式串(=开头)不拦(结果未知,交引擎)。
   */
  passValidation(e, t, o) {
    if (!this.sheet || typeof o == "string" && o[0] === "=") return !0;
    const i = Ri(this.sheet, e, t);
    if (!i) return !0;
    const s = Qm(i, o);
    return s ? (this.validationPrompt.showError(s.errorStyle, s.message, s.title), s.errorStyle !== "stop") : !0;
  }
  /** 选中带"输入提示"的数据验证格时,在格旁弹黄色气泡;否则隐藏。render() 末尾调用(随滚动跟手)。 */
  updateValidationBubble() {
    var c;
    const e = this.selActive, t = this.sheet;
    if (!e || !t) return this.hideValidationBubble();
    const o = Ri(t, e.row, e.col);
    if (!o || !o.showInputMessage || !o.prompt && !o.promptTitle) return this.hideValidationBubble();
    const i = this.rectOf(e.row, e.col), s = this.els.renderArea.getBoundingClientRect();
    if (!i) return this.hideValidationBubble();
    if (i.x + i.w < 0 || i.y + i.h < 0 || i.x > this.view.width || i.y > this.view.height) return this.hideValidationBubble();
    const r = s.left + i.x + i.w, l = s.top + i.y + i.h, a = `${e.row}:${e.col}:${Math.round(r)}:${Math.round(l)}`;
    a !== this.bubbleSig && (this.bubbleSig = a, this.validationPrompt.showInputBubble(r, l, (c = o.prompt) != null ? c : "", o.promptTitle));
  }
  hideValidationBubble() {
    this.bubbleSig && (this.bubbleSig = "", this.validationPrompt.hideInputBubble());
  }
  /** 点表头筛选下拉 / 命令式:打开某列筛选浮层(WPS 式分页签:按内容 + 条件筛选;core DOM 三壳共用)。 */
  openFilterPopup(e, t = "values") {
    const o = this.renderer, i = this.sheet;
    if (!o || !(i != null && i.autoFilterRange)) return;
    const s = o.cellScreenRect(this.view, i.autoFilterRange.top, e), r = this.els.renderArea.getBoundingClientRect();
    let l = r.left + s.x, a = r.top + s.y + s.h;
    typeof window != "undefined" && (l + 274 > window.innerWidth && (l = Math.max(4, window.innerWidth - 278)), a + 360 > window.innerHeight && (a = Math.max(4, r.top + s.y - 360)));
    const c = this.distinctColumnValues(e), d = this.filterState.get(e);
    this.filterPopupHost.show({
      values: c,
      selected: d && "values" in d ? [...d.values] : [],
      sortDir: this.sortCol === e ? this.sortDir : null,
      colType: r0(c),
      currentCond: d && "cond" in d ? d.cond : null,
      condActive: !!(d && "cond" in d),
      x: l,
      y: a,
      initialTab: t,
      onSort: (u) => this.sortColumn(e, u),
      onApplyValues: (u) => this.applyFilterValues(e, u),
      onApplyCondition: (u) => this.applyFilterCondition(e, u),
      onClear: () => {
        this.filterState.delete(e), this.applyFilters();
      },
      onClose: () => this.hooks.onFilterChange()
    }), this.hooks.onFilterChange();
  }
  closeFilterPopup() {
    this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 「按内容」确定:勾选值落筛选态(全选=取消该列;子集=保留;空集=全隐藏)。 */
  applyFilterValues(e, t) {
    var i;
    if (!((i = this.sheet) != null && i.autoFilterRange)) return;
    const o = this.distinctColumnValues(e);
    t.length >= o.length ? this.filterState.delete(e) : this.filterState.set(e, { values: new Set(t) }), this.applyFilters();
  }
  /** 打开某列筛选浮层并直达「条件筛选」页(程序化 / 数据 tab 入口)。1.16.0 */
  openFilterConditionDialog(e) {
    this.openFilterPopup(e, "condition");
  }
  /** 设/清某列条件筛选(cond=null 清除该列筛选)。 */
  applyFilterCondition(e, t) {
    var o;
    return (o = this.sheet) != null && o.autoFilterRange ? (t ? this.filterState.set(e, { cond: t }) : this.filterState.delete(e), this.applyFilters(), !0) : !1;
  }
  /** 清除当前表全部筛选 */
  clearAllFilters() {
    this.filterState.size && (this.filterState.clear(), this.applyFilters());
  }
  /**
   * 离开某表 / 取消自动筛选: 恢复被筛选隐藏的行,清空筛选态。
   * 传入要恢复的 sheet(切表时是"旧表",取消筛选时是当前表)。
   */
  resetFilter(e) {
    if (e && this.filterOrigHidden.size)
      for (const [t, o] of this.filterOrigHidden) {
        const i = e.rows.get(t);
        i && (i.hidden = o);
      }
    this.filterOrigHidden.clear(), this.filterState.clear(), this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 换工作簿: 仅清筛选态(旧 sheet 已废,不需恢复行) */
  clearFilterState() {
    this.filterOrigHidden.clear(), this.filterState.clear(), this.filterPopupHost.close(), this.hooks.onFilterChange();
  }
  /** 工具栏「筛选」: 切换自动筛选。无则按选区(或整张已用区)新建,使下拉按钮出现。 */
  toggleAutoFilter() {
    const e = this.sheet, t = this.renderer;
    if (!(!e || !t)) {
      if (e.autoFilterRange)
        this.resetFilter(e), e.autoFilterRange = void 0;
      else {
        const o = this.getSelection(), i = o && !(o.top === o.bottom && o.left === o.right);
        e.autoFilterRange = i ? R({}, o) : { top: 0, left: 0, bottom: Math.max(0, e.dimension.rows - 1), right: Math.max(0, e.dimension.cols - 1) };
      }
      t.setFilteredCols(/* @__PURE__ */ new Set()), t.rebuildMetrics(), this.refreshContentSize(), this.hooks.onFilterChange(), this.render();
    }
  }
  // ====================== 排序 ======================
  /** 当前排序状态(壳可读以显示指示) */
  getSortState() {
    return { col: this.sortCol, dir: this.sortDir };
  }
  /** 按活动单元格所在列排序;若当前表未开启自动筛选,先按选区/已用区建立筛选范围。 */
  sortActiveColumn(e) {
    const t = this.sheet, o = this.getActiveCell();
    return !t || !o || (t.autoFilterRange || this.toggleAutoFilter(), !t.autoFilterRange || o.col < t.autoFilterRange.left || o.col > t.autoFilterRange.right) ? !1 : (this.sortColumn(o.col, e), this.sortCol === o.col && this.sortDir === e);
  }
  // ===== 条件格式编辑(1.9.0)需 `conditionalFormat` + `editable` 配置 =====
  /** 当前表的条件格式规则集(只读副本)。 */
  getConditionalRules() {
    return this.sheet ? this.sheet.conditional.slice() : [];
  }
  /** 新增一条规则;未给 id 自动派 `cf-u<n>`、origin 默认 'user'。返回新 id 或 false。 */
  addConditionalRule(e) {
    var s, r;
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const t = (s = e.id) != null ? s : `cf-u${this.cfSeq++}`, o = this.sheet.conditional.reduce((l, a) => Math.max(l, a.priority || 0), 0), i = K(R({ priority: o + 1 }, e), { id: t, origin: (r = e.origin) != null ? r : "user" });
    return this.edit.setConditionalRules([...this.sheet.conditional, i]) ? (this.render(), t) : !1;
  }
  /** 按 id 改一条规则(浅合并 patch);编辑 parsed 规则会改其 raw 中的可视字段(色/名)以留住阈值。 */
  updateConditionalRule(e, t) {
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const o = this.sheet.conditional.findIndex((s) => s.id === e);
    if (o < 0) return !1;
    const i = this.sheet.conditional.slice();
    return i[o] = K(R(R({}, i[o]), t), { dirty: !0 }), this.edit.setConditionalRules(i) ? (this.render(), !0) : !1;
  }
  /** 按 id 删一条规则。 */
  removeConditionalRule(e) {
    if (!this.editCfg.conditionalFormat || !this.sheet) return !1;
    const t = this.sheet.conditional.filter((o) => o.id !== e);
    return t.length === this.sheet.conditional.length || !this.edit.setConditionalRules(t) ? !1 : (this.render(), !0);
  }
  /** 整表替换规则集(对话框"应用"用)。 */
  setConditionalRules(e) {
    return !this.editCfg.conditionalFormat || !this.sheet || !this.edit.setConditionalRules(e) ? !1 : (this.render(), !0);
  }
  /** 打开条件格式管理对话框(框架无关 DOM,三壳共用)。需 `conditionalFormat` + `editable`。 */
  openConditionalFormatDialog() {
    return !this.editCfg.conditionalFormat || !this.editCfg.editable || !this.sheet ? !1 : (this.cfDialog.show({
      rules: this.sheet.conditional,
      selection: this.getSelection(),
      genId: () => `cf-u${this.cfSeq++}`,
      onApply: (e) => {
        this.setConditionalRules(e);
      }
    }), !0);
  }
  /** 打开 WPS 式透视表入口:确认选区字段后生成静态透视汇总表。需 `pivotTable` + `editable` 配置。 */
  openPivotTableDialog() {
    const e = this.getSelection();
    return !this.editCfg.pivotTable || !e || !this.renderer || !this.sheet || !this.editCfg.editable || this.pivotFieldOptions(e).length < 2 ? !1 : (this.pivotDialog.show({
      rangeLabel: `${Oe(e.left)}${e.top + 1}:${Oe(e.right)}${e.bottom + 1}`,
      defaultOutputCell: `${Oe(Math.min(e.right + 2, Zt - 2))}${e.top + 1}`,
      onSubmit: (o) => this.createPivotTableFromSelection({ output: o })
    }), !0);
  }
  /** 兼容旧 API:基于当前选区创建静态透视汇总表。 */
  createPivotTableFromSelection(e = {}) {
    const t = this.getSelection();
    if (!t) return this.failPivot("透视表创建失败:请先选择包含表头且至少两列两行的数据区域。");
    const o = {};
    return e.rowFieldIndex != null && (o.rows = [e.rowFieldIndex]), e.valueFieldIndex != null && (o.values = [{ field: e.valueFieldIndex, summary: "sum" }]), this.createPivotTable({ sourceRange: t, output: e.output, layout: o, showPanel: !0 });
  }
  /** 通过 API 直接创建静态透视表,不依赖页面选区或对话框。需 `pivotTable` + `editable` 配置。 */
  createPivotTable(e) {
    var C, M, E, P, I, L, F, N, O, D, W, H, V, Y, ee, ce, le, ge, se, de, q, Z, te;
    const t = this.renderer, o = this.workbook;
    if (!this.editCfg.pivotTable) return this.failPivot("透视表创建失败:未开启透视表功能(pivotTable 配置,默认关闭)。");
    if (!t || !o) return this.failPivot("透视表创建失败:工作簿尚未加载完成。");
    if (!this.editCfg.editable) return this.failPivot("透视表创建失败:请先开启编辑模式。");
    const i = (C = e.sourceSheetIndex) != null ? C : this.activeIndex, s = o.sheets[i];
    if (!s) return this.failPivot("透视表创建失败:源工作表不存在。");
    const r = (M = e.sourceRange) != null ? M : this.getSelection();
    if (!r || r.bottom <= r.top || r.right <= r.left) return this.failPivot("透视表创建失败:请先选择包含表头且至少两列两行的数据区域。");
    const l = [];
    for (let oe = r.left; oe <= r.right; oe++) l.push(this.pivotCellText(s, r.top, oe) || `字段${oe - r.left + 1}`);
    const a = this.pivotFieldOptionsForSheet(s, r), c = !!((P = (E = e.layout) == null ? void 0 : E.rows) != null && P.length || (L = (I = e.layout) == null ? void 0 : I.values) != null && L.length);
    let d;
    if (c) {
      const oe = l.length;
      let ne = ((O = (N = (F = e.layout) == null ? void 0 : F.rows) == null ? void 0 : N[0]) != null ? O : -1) - r.left, ye = ((V = (H = (W = (D = e.layout) == null ? void 0 : D.values) == null ? void 0 : W[0]) == null ? void 0 : H.field) != null ? V : -1) - r.left;
      if (ye < 0 && (ye = ((ee = (Y = a.find(($e) => $e.numeric)) == null ? void 0 : Y.index) != null ? ee : -1) - r.left), ne < 0 && (ne = ((le = (ce = a.find(($e) => $e.index !== r.left + ye)) == null ? void 0 : ce.index) != null ? le : -1) - r.left), ye < 0 || ye >= oe) return this.failPivot("透视表创建失败:请选择有效的值字段。");
      if ((ne < 0 || ne === ye) && (ne = ye === 0 ? 1 : 0), ne < 0 || ne >= oe) return this.failPivot("透视表创建失败:请选择有效的行字段。");
      d = ov(e.layout, r.left + ne, r.left + ye);
    } else
      d = { filters: (de = (se = (ge = e.layout) == null ? void 0 : ge.filters) == null ? void 0 : se.map((oe) => {
        var ne;
        return K(R({}, oe), { values: (ne = oe.values) == null ? void 0 : ne.slice() });
      })) != null ? de : [], columns: [], rows: [], values: [] };
    const u = this.buildPivotRows(s, r, a, d, []);
    if (!u) return this.failPivot("透视表创建失败:值字段没有可汇总的数据。");
    const h = (q = e.output) != null ? q : { kind: "current-sheet", cell: `${Oe(r.right + 2)}${r.top + 1}` }, p = h.kind === "new-sheet" ? { row: 0, col: 0 } : ev(h.cell);
    if (!p) return this.failPivot("透视表创建失败:请输入有效的生成位置,例如 H1。");
    const m = p.row, b = p.col, v = Math.max(1, ...u.rows.map((oe) => oe.length));
    if (b + v - 1 >= Zt) return this.failPivot("透视表创建失败:生成位置超出最大列数。");
    const y = { top: m, left: b, bottom: m + u.rows.length - 1, right: b + v - 1 };
    if (y.bottom >= $o) return this.failPivot("透视表创建失败:生成位置超出最大行数。");
    if (h.kind === "current-sheet") {
      for (let oe = y.top; oe <= y.bottom; oe++)
        for (let ne = y.left; ne <= y.right; ne++)
          if (!this.isCellEditable(oe, ne)) return this.failPivot("透视表创建失败:生成区域包含只读单元格,请换一个位置或选择新建工作表。");
    }
    this.edit.ensureBaseline();
    const w = we(o), S = h.kind === "new-sheet" ? iv(o) : s;
    for (let oe = 0; oe < u.rows.length; oe++)
      for (let ne = 0; ne < u.rows[oe].length; ne++) Et(S, m + oe, b + ne, u.rows[oe][ne]);
    const k = {
      name: `PivotTable${S.pivotTables.length + 1}`,
      range: y,
      fields: l,
      source: { sheetIndex: i, range: R({}, r) },
      layout: xa(d),
      collapsed: [],
      rowGroups: u.groups.map((oe) => ({ row: m + oe.rowOffset, key: oe.key })),
      buttons: [
        { row: m, col: b, label: u.rowLabel, kind: "row" },
        { row: m, col: b + 1, label: u.valueLabel, kind: "data" }
      ]
    };
    return S.pivotTables.push(k), this.edit.pushUndoExternal({ kind: "restore-wb", snapshot: w }), this.edit.markDirtyExternal(), h.kind === "new-sheet" ? (o.activeSheet = o.sheets.indexOf(S), (te = (Z = this.hooks).onActiveSheetChange) == null || te.call(Z, o.activeSheet), this.rebuild(S, o, this.view.zoom, this.rendererOpts)) : (t.rebuildMetrics(), this.refreshContentSize(), this.overlays.build(s, t, this.view)), this.selectCell(m, b), e.showPanel && this.showPivotPanel({ sourceSheet: s, outSheet: S, sourceRange: R({}, r), outRange: y, fields: a, layout: d }), !0;
  }
  showPivotPanel(e) {
    this.pivotPanel.show({
      fields: e.fields,
      filterValues: tv(e.sourceSheet, e.sourceRange, e.fields),
      layout: e.layout,
      onChange: (t) => {
        var i;
        const o = e.outSheet.pivotTables.find((s) => s.range.top === e.outRange.top && s.range.left === e.outRange.left);
        o && (o.layout = xa(t), this.recomputePivot(e.outSheet, o) && (e.outRange.bottom = o.range.bottom, e.outRange.right = o.range.right, (i = this.renderer) == null || i.rebuildMetrics(), this.refreshContentSize(), this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render()));
      }
    });
  }
  /**
   * 透视表的唯一重算入口:读 pivot.source/layout/collapsed → 重建静态结果 → 清旧区写新区 →
   * 刷新 range/buttons/rowGroups。被面板改布局、源数据"活刷新"、折叠/展开三处共用,避免逻辑分叉。
   */
  recomputePivot(e, t) {
    var m;
    const o = this.workbook;
    if (!o || !t.source || !t.layout) return !1;
    const i = o.sheets[t.source.sheetIndex];
    if (!i) return !1;
    const s = this.pivotFieldOptionsForSheet(i, t.source.range), r = this.buildPivotRows(i, t.source.range, s, t.layout, (m = t.collapsed) != null ? m : []);
    if (!r) return !1;
    const l = t.range.top, a = t.range.left, c = Math.max(1, ...r.rows.map((b) => b.length)), d = l + r.rows.length - 1, u = a + c - 1, h = Math.max(t.range.bottom, d), p = Math.max(t.range.right, u);
    for (let b = l; b <= h; b++)
      for (let v = a; v <= p; v++) e.cells.delete(X(b, v));
    for (let b = 0; b < r.rows.length; b++)
      for (let v = 0; v < r.rows[b].length; v++) Et(e, l + b, a + v, r.rows[b][v]);
    return t.range = { top: l, left: a, bottom: d, right: u }, t.buttons = [
      { row: l, col: a, label: r.rowLabel, kind: "row" },
      { row: l, col: a + 1, label: r.valueLabel, kind: "data" }
    ], t.rowGroups = r.groups.map((b) => ({ row: l + b.rowOffset, key: b.key })), !0;
  }
  /**
   * 源数据"活刷新":任何模型变更(编辑/粘贴/撤销/重做都经 onModelChange)后,把所有透视表按其源区域重算,
   * 让结果跟着源数据走(WPS 透视表的"活"语义)。重算用 setCellValue 直接改模型(不经命令栈,不再触发
   * onModelChange),pivotRefreshing 兜底防重入。功能开关关闭或无透视表时零开销。
   */
  refreshPivotsAfterEdit() {
    var o, i, s;
    if (this.pivotRefreshing || !this.editCfg.pivotTable) return;
    const e = this.workbook;
    if (!e) return;
    let t = !1;
    for (const r of e.sheets) if (((i = (o = r.pivotTables) == null ? void 0 : o.length) != null ? i : 0) > 0) {
      t = !0;
      break;
    }
    if (t) {
      this.pivotRefreshing = !0;
      try {
        for (const r of e.sheets)
          for (const l of (s = r.pivotTables) != null ? s : [])
            l.source && l.layout && this.recomputePivot(r, l);
      } finally {
        this.pivotRefreshing = !1;
      }
    }
  }
  /** 折叠/展开某个外层行分组(行字段 ≥2 时由折叠按钮触发),重算并重绘。 */
  togglePivotGroup(e, t) {
    var r, l;
    const o = this.sheet;
    if (!o) return;
    const i = o.pivotTables[e];
    if (!i) return;
    const s = new Set((r = i.collapsed) != null ? r : []);
    s.has(t) ? s.delete(t) : s.add(t), i.collapsed = [...s], this.recomputePivot(o, i) && ((l = this.renderer) == null || l.rebuildMetrics(), this.refreshContentSize(), this.renderer && this.overlays.build(o, this.renderer, this.view), this.render());
  }
  /**
   * 重建透视结果为二维单元格数组(框架无关纯计算)。
   * 行字段第 1 个为外层分组,其余为内层明细 → 多行字段时产出可折叠的"大纲"(外层分组行带小计 +
   * 内层缩进明细);单行字段退化为扁平(每个值一行,无折叠)。列字段横向展开,值字段可多个。
   * groups 列出可折叠的分组表头行(相对 top 的偏移 + 外层 key),供渲染折叠按钮 + 命中测试。
   */
  buildPivotRows(e, t, o, i, s = []) {
    const r = i.rows, l = i.values;
    if (!r.length && !l.length)
      return { rows: [["数据透视表"]], rowLabel: "数据透视表", valueLabel: "", groups: [] };
    const a = l.length ? i.columns : [], c = new Set(s), d = l.map((F) => {
      var N, O;
      return (O = (N = o.find((D) => D.index === F.field)) == null ? void 0 : N.numeric) != null ? O : !1;
    }), u = (F) => {
      var N, O;
      return (O = (N = o.find((D) => D.index === F)) == null ? void 0 : N.label) != null ? O : `字段${F + 1}`;
    }, h = [];
    for (let F = t.top + 1; F <= t.bottom; F++)
      nv(e, F, i.filters) && h.push(F);
    const p = yn(h.map((F) => To(e, F, a))), m = p.length ? p : [""], b = l.map((F) => `${dv(F.summary)}: ${u(F.field)}`), v = [r.length ? r.map(u).join("/") || "行标签" : "总计"];
    for (const F of m)
      for (const N of b) v.push(F ? `${F} ${N}` : N);
    const y = (F, N, O) => {
      var W;
      let D = F.get(N);
      D || F.set(N, D = l.map(() => Sa()));
      for (let H = 0; H < l.length; H++) {
        const V = (W = e.cells.get(X(O, l[H].field))) == null ? void 0 : W.raw, Y = va(V);
        av(D[H], d[H] && Y != null ? Y : null, V);
      }
    }, w = (F, N) => {
      const O = [F];
      return m.forEach((D) => {
        const W = N.get(D);
        for (let H = 0; H < l.length; H++) O.push(W ? Ca(W[H], l[H].summary) : 0);
      }), O;
    };
    if (!r.length) {
      const F = /* @__PURE__ */ new Map();
      for (const N of h) y(F, a.length ? To(e, N, a) : "", N);
      return { rows: [v, w("总计", F)], rowLabel: v[0], valueLabel: b.join("/"), groups: [] };
    }
    const S = r[0], k = r.slice(1), C = k.length > 0, M = /* @__PURE__ */ new Map();
    for (const F of h) {
      const N = To(e, F, [S]), O = a.length ? To(e, F, a) : "";
      let D = M.get(N);
      if (D || M.set(N, D = { subtotal: /* @__PURE__ */ new Map(), inner: /* @__PURE__ */ new Map() }), y(D.subtotal, O, F), C) {
        const W = To(e, F, k);
        let H = D.inner.get(W);
        H || D.inner.set(W, H = /* @__PURE__ */ new Map()), y(H, O, F);
      }
    }
    if (!M.size) return null;
    const E = m.map(() => l.map(() => Sa())), P = [v], I = [];
    for (const F of yn([...M.keys()])) {
      const N = M.get(F);
      if (m.forEach((O, D) => {
        const W = N.subtotal.get(O);
        if (W) for (let H = 0; H < l.length; H++) cv(E[D][H], W[H]);
      }), C) {
        if (I.push({ rowOffset: P.length, key: F }), P.push(w(`  ${F}`, N.subtotal)), !c.has(F))
          for (const O of yn([...N.inner.keys()])) P.push(w(`　　${O}`, N.inner.get(O)));
      } else
        P.push(w(F, N.subtotal));
    }
    const L = ["总计"];
    for (let F = 0; F < m.length; F++) for (let N = 0; N < l.length; N++) L.push(Ca(E[F][N], l[N].summary));
    return P.push(L), { rows: P, rowLabel: v[0], valueLabel: b.join("/"), groups: I };
  }
  failPivot(e) {
    return console.warn(`[ooxml-preview] ${e}`), typeof window != "undefined" && window.alert(e), !1;
  }
  pivotFieldOptions(e) {
    const t = this.sheet;
    return t ? this.pivotFieldOptionsForSheet(t, e) : [];
  }
  pivotFieldOptionsForSheet(e, t) {
    var i;
    if (t.bottom <= t.top) return [];
    const o = [];
    for (let s = t.left; s <= t.right; s++) {
      let r = 0;
      for (let l = t.top + 1; l <= t.bottom; l++)
        va((i = e.cells.get(X(l, s))) == null ? void 0 : i.raw) != null && r++;
      o.push({ index: s, label: this.pivotCellText(e, t.top, s) || `字段${s - t.left + 1}`, numeric: r > 0 });
    }
    return o;
  }
  pivotCellText(e, t, o) {
    var s;
    if (e === this.sheet && this.renderer) return this.renderer.cellText(t, o).trim();
    const i = (s = e.cells.get(X(t, o))) == null ? void 0 : s.raw;
    return i == null ? "" : String(i).trim();
  }
  /**
   * 按某列对自动筛选数据区排序(只读视图重排:移动行内容 + 行高,不改文件)。
   * 合并区与数据区相交则拒绝(与 Excel 一致)。排序前会清除该表筛选,避免行索引快照错位。
   */
  sortColumn(e, t) {
    const o = this.renderer, i = this.sheet;
    if (!o || !(i != null && i.autoFilterRange)) return;
    const s = i.autoFilterRange, r = s.top + 1, l = this.filterDataBottom(), a = s.left, c = s.right;
    if (l <= r || e < a || e > c) return;
    for (const p of i.merges)
      if (!(p.bottom < r || p.top > l || p.right < a || p.left > c)) {
        console.warn("[ooxml-preview] 排序区域含合并单元格,已跳过(与 Excel 一致)");
        return;
      }
    this.resetFilter(i);
    const d = [];
    for (let p = r; p <= l; p++) {
      const m = [];
      for (let v = a; v <= c; v++) {
        const y = i.cells.get(X(p, v));
        y && m.push(y);
      }
      const b = i.cells.get(X(p, e));
      d.push({ key: b ? b.raw : null, cells: m, rowInfo: i.rows.get(p) });
    }
    const u = t === "asc" ? 1 : -1, h = d.map((p, m) => m);
    h.sort((p, m) => {
      const b = d[p].key, v = d[m].key, y = gn(b), w = gn(v);
      if (y && w) return p - m;
      if (y) return 1;
      if (w) return -1;
      const S = ka(b, v);
      return S !== 0 ? u * S : p - m;
    });
    for (let p = r; p <= l; p++) {
      for (let m = a; m <= c; m++) i.cells.delete(X(p, m));
      i.rows.delete(p);
    }
    for (let p = 0; p < h.length; p++) {
      const m = r + p, b = d[h[p]];
      for (const v of b.cells)
        v.row = m, i.cells.set(X(m, v.col), v);
      b.rowInfo && i.rows.set(m, b.rowInfo);
    }
    this.sortCol = e, this.sortDir = t, o.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render();
  }
  /** 多关键字排序(WPS 自定义排序);在自动筛选数据区内按 keys 依次比较,稳定,空值恒末尾。需 autoFilter。 */
  sortByKeys(e) {
    const t = this.renderer, o = this.sheet;
    if (!t || !(o != null && o.autoFilterRange) || !e.length) return !1;
    const i = o.autoFilterRange, s = i.top + 1, r = this.filterDataBottom(), l = i.left, a = i.right;
    if (r <= s) return !1;
    for (const u of o.merges) if (!(u.bottom < s || u.top > r || u.right < l || u.left > a)) return !1;
    this.resetFilter(o);
    const c = [];
    for (let u = s; u <= r; u++) {
      const h = [];
      for (let p = l; p <= a; p++) {
        const m = o.cells.get(X(u, p));
        m && h.push(m);
      }
      c.push({ keys: e.map((p) => {
        var m, b;
        return (b = (m = o.cells.get(X(u, p.col))) == null ? void 0 : m.raw) != null ? b : null;
      }), cells: h, rowInfo: o.rows.get(u) });
    }
    const d = c.map((u, h) => h);
    d.sort((u, h) => {
      for (let p = 0; p < e.length; p++) {
        const m = e[p].dir === "asc" ? 1 : -1, b = c[u].keys[p], v = c[h].keys[p], y = gn(b), w = gn(v);
        if (y && w) continue;
        if (y) return 1;
        if (w) return -1;
        const S = ka(b, v);
        if (S !== 0) return m * S;
      }
      return u - h;
    });
    for (let u = s; u <= r; u++) {
      for (let h = l; h <= a; h++) o.cells.delete(X(u, h));
      o.rows.delete(u);
    }
    for (let u = 0; u < d.length; u++) {
      const h = s + u, p = c[d[u]];
      for (const m of p.cells)
        m.row = h, o.cells.set(X(h, m.col), m);
      p.rowInfo && o.rows.set(h, p.rowInfo);
    }
    return t.rebuildMetrics(), this.refreshContentSize(), this.clearSelection(), this.hooks.onFilterChange(), this.render(), !0;
  }
  /** 打开自定义排序对话框(多关键字)。需 autoFilter(否则不弹)。 */
  openSortDialog() {
    const e = this.sheet;
    if (!(e != null && e.autoFilterRange)) return !1;
    const t = e.autoFilterRange, o = [];
    for (let i = t.left; i <= t.right; i++) {
      const s = De(e, t.top, i);
      o.push({ index: i, label: s ? `${s}(${Oe(i)})` : Oe(i) });
    }
    return this.sortDialog.show({ columns: o, onApply: (i) => {
      this.sortByKeys(i);
    } }), !0;
  }
  // ====================== 编辑配置(E0:闸门) ======================
  /** 设置编辑配置(默认只读;壳在挂载 + props 变化时调) */
  setEditConfig(e) {
    var t;
    this.editCfg = e != null ? e : {}, this.edit.setPasteBehavior((t = this.editCfg.pasteBehavior) != null ? t : null), this.edit.refreshEngine(), this.renderer && (this.renderer.showFillHandle = !!this.editCfg.editable, this.render());
  }
  /** 该格当前是否可编辑(综合 editable + editableTargets 白名单 + readOnlyRanges + cellReadOnly) */
  isCellEditable(e, t) {
    return this.sheet ? ls(this.sheet, e, t, this.editCfg) : !1;
  }
  /**
   * **运行时**改可编辑白名单(2026-06-08 新增) —— 不动 `:editableTargets` prop,
   * 直接覆盖 `editCfg.editableTargets`. 立即重绘以反映只读光标变化.
   * 传 `undefined` = 关闭白名单(默认全可编辑);`[]` = 全只读;单值或数组 = 白名单.
   */
  setEditableTargets(e) {
    this.editCfg = K(R({}, this.editCfg), { editableTargets: e }), this.render();
  }
  /** 当前生效的可编辑白名单(运行时 setEditableTargets 或初始 prop). 用 `undefined` 表示未启用白名单 */
  getEditableTargets() {
    return this.editCfg.editableTargets;
  }
  // ---- 命令式编辑 API(委托 EditController;E1) ----
  editCell(e, t, o) {
    return this.edit.editCell(e, t, o);
  }
  editRange(e, t) {
    return this.edit.editRange(e, t);
  }
  clearRange(e) {
    return this.edit.clearRange(e);
  }
  /** 给区域套样式覆盖(E5;粗体/对齐/填充等);editable 时走命令栈(可撤销 + 发 cell-change + 记脏) */
  setStyle(e, t) {
    return this.edit.setStyle(e, t);
  }
  // ---- 背景色 / 字体色 回显 + 修改(WPS 风格工具栏用) ----
  /** 活动格当前背景填充色(#RRGGBB);无填充/非纯色 → 默认白 #FFFFFF。 */
  getActiveFillColor() {
    var i;
    const e = this.selActive, t = e ? this.edit.getCellSnapshot(e.row, e.col) : null, o = (i = t == null ? void 0 : t.style) == null ? void 0 : i.fill;
    return o && o.type === "solid" && Ro(o.fgColor) || "#FFFFFF";
  }
  /** 活动格当前字体色(#RRGGBB);缺省黑 #000000。 */
  getActiveFontColor() {
    var o, i;
    const e = this.selActive, t = e ? this.edit.getCellSnapshot(e.row, e.col) : null;
    return Ro((i = (o = t == null ? void 0 : t.style) == null ? void 0 : o.font) == null ? void 0 : i.color) || "#000000";
  }
  /** 给当前选区设背景填充色(null = 清除填充);editable 时入命令栈。 */
  setSelectionFill(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { fill: e ? { type: "solid", fgColor: e } : { type: "none" } }) : !1;
  }
  /** 给当前选区设字体色;editable 时入命令栈。 */
  setSelectionFontColor(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { color: e } }) : !1;
  }
  // ===== 格式刷(1.12.0,需 editable)=====
  /** 启动格式刷:采样活动格的样式 → 进入"刷"状态;下次选区完成即刷上。sticky=连续刷。 */
  startFormatPainter(e = !1) {
    var i;
    const t = this.selActive;
    if (!this.editCfg.editable || !t) return !1;
    const o = (i = this.edit.getCellSnapshot(t.row, t.col)) == null ? void 0 : i.style;
    return o ? (this.painterStyle = {
      font: R({}, o.font),
      fill: R({}, o.fill),
      borders: R({}, o.borders),
      hAlign: o.hAlign,
      vAlign: o.vAlign,
      wrapText: o.wrapText,
      shrinkToFit: o.shrinkToFit,
      textRotation: o.textRotation,
      indent: o.indent,
      numFmt: o.numFmt
    }, this.painterSticky = e, this.hooks.onSelectionChange(), !0) : !1;
  }
  /** 格式刷是否处于待刷状态(工具栏 active / 光标用)。 */
  isFormatPainterArmed() {
    return !!this.painterStyle;
  }
  /** 退出格式刷。 */
  cancelFormatPainter() {
    this.painterStyle && (this.painterStyle = null, this.painterSticky = !1, this.els.scroller.style.cursor = "", this.hooks.onSelectionChange());
  }
  /** 选区完成后(onMouseUp)若 armed → 把采样样式刷到当前选区;非连续则退出。 */
  applyFormatPainterIfArmed() {
    if (!this.painterStyle) return;
    const e = this.getSelection();
    e && this.setStyle(e, this.painterStyle), this.painterSticky || (this.painterStyle = null, this.hooks.onSelectionChange());
  }
  /** 给当前选区设数字格式代码(numFmt);editable 时入命令栈。1.11.0 */
  setSelectionNumberFormat(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { numFmt: e }) : !1;
  }
  /** 打开数字格式编辑对话框(框架无关 DOM,三壳共用)。需 editable + 选区。1.11.0 */
  openNumberFormatDialog() {
    var i, s, r;
    const e = this.getSelection(), t = this.selActive;
    if (!this.editCfg.editable || !e || !t || !this.sheet) return !1;
    const o = this.edit.getCellSnapshot(t.row, t.col);
    return this.numFmtDialog.show({
      sampleValue: ct(this.sheet, t.row, t.col),
      currentCode: (s = (i = o == null ? void 0 : o.style) == null ? void 0 : i.numFmt) != null ? s : "General",
      date1904: !!((r = this.workbook) != null && r.date1904),
      onApply: (l) => {
        this.setSelectionNumberFormat(l);
      }
    }), !0;
  }
  // ===== 批注编辑(1.11.0,需 editable)=====
  /** 读某格批注(无则 ''). */
  getCellComment(e, t) {
    var o, i, s;
    return (s = (i = (o = this.sheet) == null ? void 0 : o.cells.get(X(e, t))) == null ? void 0 : i.comment) != null ? s : "";
  }
  /** 设/清某格批注(空串 = 删除);单次撤销。 */
  setCellComment(e, t, o) {
    if (!this.editCfg.editable) return !1;
    const i = this.edit.setCellComment(e, t, o);
    return i && this.render(), i;
  }
  /** 打开批注编辑对话框(默认活动格);需 editable。 */
  openCommentEditor(e, t) {
    const o = this.selActive, i = e != null ? e : o == null ? void 0 : o.row, s = t != null ? t : o == null ? void 0 : o.col;
    return !this.editCfg.editable || i == null || s == null || !this.isCellEditable(i, s) ? !1 : (this.commentDialog.show({
      cellRef: `${Oe(s)}${i + 1}`,
      current: this.getCellComment(i, s),
      onApply: (r) => {
        this.setCellComment(i, s, r);
      }
    }), !0);
  }
  // ---- 自动换行(WPS 风格 toggle) ----
  /** 当前选区里 wrapText 的整体态:'all' 全开 / 'none' 全关 / 'mixed' 混合。空选区→'none'。 */
  getSelectionWrapState() {
    var i;
    const e = this.getSelection();
    if (!e || !this.sheet) return "none";
    let t = 0, o = 0;
    for (let s = e.top; s <= e.bottom; s++)
      for (let r = e.left; r <= e.right; r++) {
        const l = this.edit.getCellSnapshot(s, r);
        if ((i = l == null ? void 0 : l.style) != null && i.wrapText ? t++ : o++, t && o) return "mixed";
      }
    return t ? "all" : "none";
  }
  /** 切换当前选区的"自动换行"(WPS 风格):全 wrap → 全关;否则 → 全开。
   *  失效行高缓存让 autofit 按新 wrap 重撑(只扩不缩);editable 时入命令栈(单次撤销 style)。
   *  注:undo 回滚 style 但不回滚行高,与现有 setStyle/autofit "只扩不缩"语义一致。 */
  toggleWrapTextOnSelection() {
    if (!this.editCfg.editable) return !1;
    const e = this.getSelection();
    if (!e || !this.sheet) return !1;
    const t = this.getSelectionWrapState() !== "all";
    return I0(this.sheet), this.setStyle(e, { wrapText: t });
  }
  /** 合并区域(G1;清空被覆盖格,只留左上锚点);editable 时入命令栈 */
  mergeCells(e) {
    return this.edit.mergeCells(e);
  }
  /** 拆分区域内的合并(G1);editable 时入命令栈 */
  unmergeCells(e) {
    return this.edit.unmergeCells(e);
  }
  // ===== WPS 工具栏样式便利(1.16.0;把已有 setStyle 能力接成"开始"板块工具)=====
  /** 活动格字体态回显(工具栏 toggle 高亮用)。 */
  getSelectionFontState() {
    var o, i;
    const e = this.selActive, t = e ? (i = (o = this.edit.getCellSnapshot(e.row, e.col)) == null ? void 0 : o.style) == null ? void 0 : i.font : null;
    return { bold: !!(t != null && t.bold), italic: !!(t != null && t.italic), underline: !!(t != null && t.underline), underlineStyle: t == null ? void 0 : t.underlineStyle, name: t == null ? void 0 : t.name, size: t == null ? void 0 : t.size };
  }
  /** 活动格对齐态回显(工具栏 active 用)。 */
  getSelectionAlignState() {
    var o;
    const e = this.selActive, t = e ? (o = this.edit.getCellSnapshot(e.row, e.col)) == null ? void 0 : o.style : null;
    return { hAlign: t == null ? void 0 : t.hAlign, vAlign: t == null ? void 0 : t.vAlign, indent: t == null ? void 0 : t.indent };
  }
  /** 切换选区字体粗体/斜体/下划线/删除线(读活动格当前值取反,套整个选区)。 */
  toggleSelectionFont(e) {
    var r, l;
    const t = this.getSelection();
    if (!t) return !1;
    const o = this.selActive, i = o ? (l = (r = this.edit.getCellSnapshot(o.row, o.col)) == null ? void 0 : r.style) == null ? void 0 : l.font : null, s = e === "strike" ? !!(i != null && i.strike) : this.getSelectionFontState()[e];
    return this.setStyle(t, { font: { [e]: !s } });
  }
  /** 设选区下划线样式:none=无 / single=单下划线 / double=双下划线(WPS 下划线 ▾)。 */
  setSelectionUnderline(e) {
    const t = this.getSelection();
    return t ? e === "none" ? this.setStyle(t, { font: { underline: !1, underlineStyle: void 0 } }) : this.setStyle(t, { font: { underline: !0, underlineStyle: e } }) : !1;
  }
  /** 设选区字体名。 */
  setSelectionFontName(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { name: e } }) : !1;
  }
  /** 设选区字号(pt)。 */
  setSelectionFontSize(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { font: { size: e } }) : !1;
  }
  /** 增/减选区字号(读活动格当前值 ± delta,范围 5~409 同 Excel)。 */
  adjustSelectionFontSize(e) {
    var o;
    const t = (o = this.getSelectionFontState().size) != null ? o : 11;
    return this.setSelectionFontSize(Math.max(5, Math.min(409, t + e)));
  }
  /** 剪切(复制 + 清内容);需 editable。 */
  async cutSelection() {
    const e = this.getSelection();
    return !this.editCfg.editable || !e ? !1 : (await this.copySelection(), this.clearRange(e));
  }
  /** 清除选区格式(字体/填充/边框/对齐/数字格式回默认;不动值);需 editable。 */
  clearSelectionFormat() {
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = { style: "none", color: "#000000" };
    return this.setStyle(e, {
      font: { bold: !1, italic: !1, underline: !1, strike: !1 },
      fill: { type: "none" },
      borders: { top: t, bottom: t, left: t, right: t },
      hAlign: "general",
      vAlign: "bottom",
      wrapText: !1,
      indent: 0,
      numFmt: "General"
    });
  }
  /** 增/减选区小数位(读活动格数字格式,加/减一位 0);常见单段格式;需 editable。 */
  adjustSelectionDecimals(e) {
    var u, h;
    const t = this.getSelection(), o = this.selActive;
    if (!this.editCfg.editable || !t || !o) return !1;
    let i = ((h = (u = this.edit.getCellSnapshot(o.row, o.col)) == null ? void 0 : u.style) == null ? void 0 : h.numFmt) || "General";
    (i === "General" || i === "@") && (i = "0");
    const s = /\.(0+)/.exec(i), r = s ? s[1].length : 0, l = Math.max(0, Math.min(20, r + e)), a = i.replace(/\.0+/g, ""), c = a.includes("%"), d = a.replace("%", "") + (l > 0 ? "." + "0".repeat(l) : "");
    return this.setSelectionNumberFormat(c ? d + "%" : d);
  }
  /** 给当前选区套样式覆盖(单元格样式预设等用);editable 时入命令栈。 */
  applySelectionStyle(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, e) : !1;
  }
  /**
   * 填充(WPS/Excel 向下/右/上/左):以选区首(尾)行/列为源,复制到其余格。需 editable。
   *  - 源是**公式** → 按偏移重写相对引用(=A1 向下 → =A2);否则复制值。
   *  - `mode`:all=值+格式(默认,同 Ctrl+D)/ values=仅值 / formats=仅格式。单次撤销。
   */
  fillSelection(e, t = "all") {
    const o = this.getSelection(), i = this.sheet;
    if (!this.editCfg.editable || !o || !i) return !1;
    const s = (d, u, h, p) => {
      if (t === "formats") return;
      const m = i.cells.get(X(d, u));
      return (m == null ? void 0 : m.type) === "formula" && m.formula ? Vg(m.formula, h - d, p - u) : ct(i, d, u);
    }, r = (d, u) => t !== "values" ? { row: d, col: u } : void 0, l = [];
    if (e === "down" || e === "up") {
      const d = e === "down" ? o.top : o.bottom;
      if (o.bottom === o.top) return !1;
      for (let u = o.left; u <= o.right; u++)
        for (let h = o.top; h <= o.bottom; h++)
          h !== d && l.push({ row: h, col: u, value: s(d, u, h, u), styleFrom: r(d, u) });
    } else {
      const d = e === "right" ? o.left : o.right;
      if (o.right === o.left) return !1;
      for (let u = o.top; u <= o.bottom; u++)
        for (let h = o.left; h <= o.right; h++)
          h !== d && l.push({ row: u, col: h, value: s(u, d, u, h), styleFrom: r(u, d) });
    }
    const c = l.length ? this.edit.fillCells(l) : !1;
    return c && this.render(), c;
  }
  /** 序列填充(WPS「序列」对话框):方向按选区形状(高≥宽→向下,否则向右),首格为起点,按 spec 生成后续。 */
  fillSeries(e) {
    const t = this.getSelection(), o = this.sheet;
    if (!this.editCfg.editable || !t || !o) return !1;
    const i = [];
    if (t.bottom - t.top >= t.right - t.left) {
      const l = t.bottom - t.top;
      if (l <= 0) return !1;
      for (let a = t.left; a <= t.right; a++) {
        const c = sl(ct(o, t.top, a), l, e);
        for (let d = 0; d < c.length; d++) i.push({ row: t.top + 1 + d, col: a, value: c[d], styleFrom: { row: t.top, col: a } });
      }
    } else {
      const l = t.right - t.left;
      if (l <= 0) return !1;
      for (let a = t.top; a <= t.bottom; a++) {
        const c = sl(ct(o, a, t.left), l, e);
        for (let d = 0; d < c.length; d++) i.push({ row: a, col: t.left + 1 + d, value: c[d], styleFrom: { row: a, col: t.left } });
      }
    }
    const r = i.length ? this.edit.fillCells(i) : !1;
    return r && this.render(), r;
  }
  /** 打开序列对话框。 */
  openFillSeriesDialog() {
    return !this.editCfg.editable || !this.getSelection() ? !1 : (this.seriesDialog.show({ onApply: (e) => {
      this.fillSeries(e);
    } }), !0);
  }
  /**
   * 快速填充(Flash Fill,Ctrl+E):从活动格所在**目标列**已手打的样例,推断左侧源列的变换,
   * 填其余空行。需 editable + 目标列左侧有源列 + 目标列至少 1 个样例。单次撤销。返回是否填了值。
   */
  flashFill() {
    var b, v;
    const e = this.sheet, t = this.selActive;
    if (!this.editCfg.editable || !e || !t || t.col === 0) return !1;
    const o = t.col, i = this.getSelection();
    let s, r;
    if (i && i.bottom > i.top)
      s = i.top, r = i.bottom;
    else {
      const y = o - 1, w = ((v = (b = e.dimension) == null ? void 0 : b.rows) != null ? v : t.row + 1) - 1;
      for (s = t.row; s > 0 && De(e, s - 1, y).trim() !== ""; ) s--;
      for (r = t.row; r < w && De(e, r + 1, y).trim() !== ""; ) r++;
    }
    let l = o;
    for (let y = o - 1; y >= 0; y--) {
      let w = !1;
      for (let S = s; S <= r && !w; S++) De(e, S, y).trim() !== "" && (w = !0);
      if (!w) break;
      l = y;
    }
    if (l === o) return !1;
    const a = [];
    for (let y = l; y < o; y++) a.push(y);
    const c = [], d = [], u = [];
    for (let y = s; y <= r; y++) {
      c.push(a.map((S) => De(e, y, S))), d.push(y);
      const w = De(e, y, o);
      w.trim() !== "" && u.push({ row: c.length - 1, output: w });
    }
    if (!u.length) return !1;
    const h = Sm(c, u);
    if (!h) return !1;
    const p = h.outputs.filter((y) => De(e, d[y.row], o).trim() === "").map((y) => ({ row: d[y.row], col: o, value: y.value }));
    if (!p.length) return !1;
    const m = this.edit.setCellsBatch(p);
    return m && this.render(), m;
  }
  /** 文本↔数值转换(WPS「转换」):text→数值把可解析的文本串改成数字(单次撤销);数值→文本设文本格式。需 editable。 */
  convertSelection(e) {
    const t = this.getSelection(), o = this.sheet;
    if (!this.editCfg.editable || !t || !o) return !1;
    if (e === "number-to-text") return this.setSelectionNumberFormat("@");
    const i = [];
    for (let s = t.top; s <= t.bottom; s++)
      for (let r = t.left; r <= t.right; r++) {
        const l = ct(o, s, r);
        typeof l == "string" && l.trim() !== "" && !isNaN(Number(l.trim())) && i.push({ row: s, col: r, value: Number(l.trim()) });
      }
    return i.length ? this.edit.setCellsBatch(i) : !1;
  }
  /**
   * 套用表格样式(表头强调 + 隔行底纹 + 边框),一次单次撤销。需 editable + 选区。
   * preset:`<颜色>-<深浅>`(如 `blue-medium`;颜色 green/blue/orange/red/purple/teal/gray,深浅 light/medium/dark);
   * 兼容旧值 `green`/`blue`/`plain`。
   */
  applyTableStyle(e = "green") {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    const o = Zy(e), i = { style: "thin", color: o.border }, s = [], r = [], l = [];
    for (let a = t.top; a <= t.bottom; a++)
      for (let c = t.left; c <= t.right; c++)
        s.push({ row: a, col: c }), a === t.top ? r.push({ row: a, col: c }) : (a - t.top) % 2 === 0 && l.push({ row: a, col: c });
    return this.edit.setStyleRegions([
      { cells: s, patch: { borders: { top: i, bottom: i, left: i, right: i } } },
      { cells: r, patch: { font: { bold: !0, color: o.ht }, fill: { type: "solid", fgColor: o.h }, hAlign: "center" } },
      { cells: l, patch: { fill: { type: "solid", fgColor: o.b } } }
    ]);
  }
  // ===== 页面设置(1.16.0 页面选项卡,需 editable)=====
  /** 读当前表页面设置(缺省空对象)。 */
  getPageSetup() {
    var e, t;
    return (t = (e = this.sheet) == null ? void 0 : e.pageSetup) != null ? t : {};
  }
  /** 改页面设置(整体替换,单次撤销)。 */
  setPageSetup(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ pageSetup: e });
    return t && this.render(), t;
  }
  /** 改分页符(整体替换,单次撤销)。 */
  setPageBreaks(e, t) {
    if (!this.editCfg.editable) return !1;
    const o = this.edit.setPageConfig({ pageBreaks: { rows: e, cols: t } });
    return o && this.render(), o;
  }
  /** 把当前选区设为打印区域。 */
  setPrintAreaFromSelection() {
    var o, i;
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = K(R({}, (i = (o = this.sheet) == null ? void 0 : o.pageSetup) != null ? i : {}), { printArea: R({}, e) });
    return this.setPageSetup(t);
  }
  /** 在活动行/列切换分页符(有则删,无则加)。 */
  togglePageBreakAt(e) {
    var r, l, a, c;
    const t = this.selActive;
    if (!this.editCfg.editable || !t) return !1;
    const o = (l = (r = this.sheet) == null ? void 0 : r.pageBreaks) != null ? l : { rows: [], cols: [] }, i = [...(a = o.rows) != null ? a : []], s = [...(c = o.cols) != null ? c : []];
    if (e === "row") {
      const d = i.indexOf(t.row);
      d >= 0 ? i.splice(d, 1) : i.push(t.row);
    } else {
      const d = s.indexOf(t.col);
      d >= 0 ? s.splice(d, 1) : s.push(t.col);
    }
    return this.setPageBreaks(i, s);
  }
  /** 清所有分页符。 */
  clearPageBreaks() {
    return this.editCfg.editable ? this.setPageBreaks([], []) : !1;
  }
  /** 打开页面设置对话框。 */
  openPageSetupDialog() {
    var e;
    return !this.editCfg.editable || !this.sheet ? !1 : (this.pageSetupDialog.show({
      current: (e = this.sheet.pageSetup) != null ? e : {},
      hasSelection: !!this.getSelection(),
      onApply: (t) => {
        this.setPageSetup(t);
      },
      onPrintAreaFromSelection: () => this.setPrintAreaFromSelection()
    }), !0);
  }
  // ===== 背景 / 水印(1.16.0)=====
  getBackground() {
    var e;
    return (e = this.sheet) == null ? void 0 : e.background;
  }
  getWatermark() {
    var e;
    return (e = this.sheet) == null ? void 0 : e.watermark;
  }
  /** 设/清工作表背景图(undefined=清);需 editable。导出经 zip 注入 sheet <picture>。 */
  setBackground(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ background: e });
    return t && this.render(), t;
  }
  /** 设/清文字水印(undefined=清);需 editable。仅屏幕显示。 */
  setWatermark(e) {
    if (!this.editCfg.editable) return !1;
    const t = this.edit.setPageConfig({ watermark: e });
    return t && this.render(), t;
  }
  /** 打开背景/水印对话框。 */
  openBackgroundDialog() {
    return !this.editCfg.editable || !this.sheet ? !1 : (this.backgroundDialog.show({
      background: this.sheet.background,
      watermark: this.sheet.watermark,
      onApplyBackground: (e) => this.setBackground(e),
      onApplyWatermark: (e) => this.setWatermark(e)
    }), !0);
  }
  /** 求和/统计(WPS 求和 ▾):把 =FN(选区) 写到选区正下方(单行时右侧)的格。需 editable。 */
  autoSumSelection(e = "sum") {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    const o = (a, c) => `${Oe(c)}${a + 1}`, i = `${o(t.top, t.left)}:${o(t.bottom, t.right)}`, s = { sum: "SUM", average: "AVERAGE", count: "COUNT", max: "MAX", min: "MIN" }[e], r = t.bottom > t.top ? t.bottom + 1 : t.top, l = t.bottom > t.top ? t.left : t.right + 1;
    return this.editCell(r, l, `=${s}(${i})`);
  }
  // ---- 公式选项卡:插入函数对话框 + 计算 ----
  /** 预览一条公式串的结果(读模型已提交值,内置引擎无副作用求值;供插入函数对话框实时预览)。 */
  previewFormula(e) {
    try {
      const t = bc(e), o = this.workbook, i = this.sheet, r = fe(Qt(t, {
        getCell: (l, a, c) => {
          var p;
          const d = l == null ? i : (p = o == null ? void 0 : o.sheets.find((m) => (m.name || "") === l)) != null ? p : null, u = d == null ? void 0 : d.cells.get(X(a, c));
          if (!u || u.type === "empty") return null;
          const h = u.raw;
          return typeof h == "number" || typeof h == "string" || typeof h == "boolean" ? h : null;
        }
      }));
      return G(r) ? r.code : r === null ? "" : typeof r == "boolean" ? r ? "TRUE" : "FALSE" : String(r);
    } catch (t) {
      return "#ERROR";
    }
  }
  /** 打开「插入函数」对话框(presetName 直接定位某函数);确定 → 插入活动格。需 editable。 */
  openInsertFunctionDialog(e) {
    var o;
    if (!this.editCfg.editable) return !1;
    const t = (o = this.selActive) != null ? o : { row: 0, col: 0 };
    return this.insertFnDialog.show({
      presetName: e,
      preview: (i) => this.previewFormula(i),
      onInsert: (i) => {
        this.editCell(t.row, t.col, i), this.selectCell(t.row, t.col);
      }
    }), !0;
  }
  /** 全量重算(公式选项卡「重算工作簿」)。未开重算/引擎未就绪 → false。 */
  recalcAll() {
    const e = this.edit.recalcAll();
    return e && this.render(), e;
  }
  /** 只重算当前工作表(「计算工作表」)。 */
  recalcActiveSheet() {
    const e = this.edit.recalcActiveSheet();
    return e && this.render(), e;
  }
  /** 计算模式(「计算选项」自动/手动)。 */
  getCalcMode() {
    return this.edit.getCalcMode();
  }
  setCalcMode(e) {
    this.edit.setCalcMode(e);
  }
  // ---- 数据选项卡:重新应用筛选 / 数据有效性 / 删除重复 / 文本分列 ----
  /** 当前选区;无选区则退化为活动格 1×1。 */
  selectionOrActive() {
    const e = this.getSelection();
    if (e) return e;
    const t = this.selActive;
    return t ? { top: t.row, left: t.col, bottom: t.row, right: t.col } : null;
  }
  /** 重新应用当前筛选(数据变更后手动重跑)。 */
  reapplyFilters() {
    var e;
    return (e = this.sheet) != null && e.autoFilterRange ? (this.applyFilters(), this.render(), !0) : !1;
  }
  /** 打开数据有效性对话框(取选区当 range;presetType='list' 供「下拉列表」直达)。需 editable。 */
  openDataValidationDialog(e) {
    var s, r;
    const t = this.selectionOrActive();
    if (!this.editCfg.editable || !t || !this.sheet) return !1;
    const o = (s = this.selActive) != null ? s : { row: t.top, col: t.left }, i = (r = Ri(this.sheet, o.row, o.col)) != null ? r : null;
    return this.dvDialog.show({
      presetType: e,
      current: i,
      onApply: (l) => this.setDataValidation(l, t)
    }), !0;
  }
  /** 设/清区域数据有效性(rule=null 清除;range 缺省用当前选区)。 */
  setDataValidation(e, t) {
    const o = t != null ? t : this.getSelection();
    if (!o) return !1;
    const i = e ? K(R({}, e), { range: R({}, o) }) : null, s = this.edit.setDataValidation(i, o);
    return s && this.render(), s;
  }
  /** 打开删除重复项对话框(选区各列 + 表头标签)。需 editable。 */
  openRemoveDuplicatesDialog() {
    var i, s;
    const e = this.selectionOrActive();
    if (!this.editCfg.editable || !e || !this.sheet) return !1;
    const t = this.sheet, o = [];
    for (let r = e.left; r <= e.right; r++) {
      const l = De(t, e.top, r, (s = (i = this.workbook) == null ? void 0 : i.date1904) != null ? s : !1).trim();
      o.push({ index: r, label: l || `列 ${Oe(r)}` });
    }
    return this.removeDupDialog.show({
      columns: o,
      onApply: (r, l) => {
        this.edit.removeDuplicates(e, r, l), this.refreshContentSize(), this.render();
      }
    }), !0;
  }
  /** 打开文本分列对话框(按分隔符拆当前选区单列)。需 editable。 */
  openTextToColumnsDialog() {
    const e = this.selectionOrActive();
    return !this.editCfg.editable || !e ? !1 : (this.t2cDialog.show({
      onApply: (t) => {
        this.edit.textToColumns(e, t), this.render();
      }
    }), !0);
  }
  // ===== 审阅选项卡:批注导航/显示 + 单元格锁定 + 工作表/工作簿保护(1.16.0)=====
  /** 全表是否有任意批注(工具禁用态用)。 */
  hasAnyComment() {
    if (!this.sheet) return !1;
    for (const e of this.sheet.cells.values()) if (e.comment) return !0;
    return !1;
  }
  /** 活动格是否有批注(「删除批注」禁用态)。 */
  activeHasComment() {
    const e = this.selActive;
    return !!(e && this.getCellComment(e.row, e.col));
  }
  /** 删除活动格批注(审阅「删除批注」)。 */
  deleteActiveComment() {
    const e = this.selActive;
    return e ? this.setCellComment(e.row, e.col, "") : !1;
  }
  /** 跳到上一条/下一条批注(审阅「上一条/下一条」);按行列顺序循环,移动选区并滚动可见。 */
  gotoComment(e) {
    if (!this.sheet) return !1;
    const t = [];
    for (const r of this.sheet.cells.values()) r.comment && t.push({ row: r.row, col: r.col });
    if (!t.length) return !1;
    t.sort((r, l) => r.row - l.row || r.col - l.col);
    const o = this.selActive;
    let i = -1;
    o && (i = t.findIndex((r) => r.row === o.row && r.col === o.col));
    let s;
    return i < 0 ? s = e > 0 ? t[0] : t[t.length - 1] : s = t[(i + e + t.length) % t.length], this.selectCell(s.row, s.col), !0;
  }
  /** 切换「显示批注」常驻小黄框(审阅「显示」)。 */
  toggleShowAllComments() {
    var e;
    return this.showAllCommentsOn = !this.showAllCommentsOn, (e = this.renderer) == null || e.setShowAllComments(this.showAllCommentsOn), this.render(), this.hooks.onSelectionChange(), this.showAllCommentsOn;
  }
  isShowAllComments() {
    return this.showAllCommentsOn;
  }
  // ---- 单元格锁定(审阅「锁定单元格」)----
  /** 选区(或活动格)是否全部锁定(工具 active 态:缺省锁定 → 未显式解锁即锁定)。 */
  isSelectionLocked() {
    const e = this.selectionOrActive(), t = this.sheet;
    if (!e || !t) return !0;
    for (let o = e.top; o <= e.bottom; o++)
      for (let i = e.left; i <= e.right; i++)
        if (cc(t, o, i) === !1) return !1;
    return !0;
  }
  /** 切换选区锁定态(全锁 → 解锁;否则 → 全锁)。需 editable。单次撤销。 */
  toggleCellLock() {
    const e = this.selectionOrActive();
    if (!this.editCfg.editable || !e) return !1;
    const t = !this.isSelectionLocked(), o = this.edit.setCellsLocked(e, t);
    return o && (this.render(), this.hooks.onSelectionChange()), o;
  }
  // ---- 工作表保护(审阅「保护工作表」)----
  isSheetProtected() {
    var e, t;
    return !!((t = (e = this.sheet) == null ? void 0 : e.sheetProtection) != null && t.protected);
  }
  /** 打开保护/撤销工作表对话框(已保护 → 撤销流程;否则 → 保护对话框)。需 editable。 */
  openProtectSheetDialog() {
    if (!this.editCfg.editable || !this.sheet) return !1;
    const e = this.sheet.sheetProtection;
    return e != null && e.protected ? this.protectSheetDialog.show({
      mode: "unprotect",
      hasPassword: !!e.password,
      onUnprotect: (t) => {
        if (e.password && t !== e.password) {
          this.validationPrompt.showError("warning", "密码不正确,无法撤销保护。");
          return;
        }
        this.edit.setSheetProtection(null), this.render();
      }
    }) : this.protectSheetDialog.show({
      mode: "protect",
      onApply: ({ password: t, allow: o }) => {
        this.edit.setSheetProtection(K(R({ protected: !0 }, t ? { password: t } : {}), { allow: o })), this.render();
      }
    }), !0;
  }
  // ---- 允许编辑区域(审阅「允许编辑区域」)----
  /** 打开允许编辑区域对话框。需 editable。 */
  openAllowEditRangesDialog() {
    var o, i;
    if (!this.editCfg.editable || !this.sheet) return !1;
    const e = ((o = this.sheet.protectedRanges) != null ? o : []).map((s) => R({ name: s.name, ref: this.rangeToRef(s.range) }, s.password ? { password: s.password } : {})), t = (i = this.selectionOrActive()) != null ? i : { top: 0, left: 0, bottom: 0, right: 0 };
    return this.allowRangesDialog.show({
      ranges: e,
      defaultRef: this.rangeToRef(t),
      onApply: (s) => {
        const r = [];
        for (const l of s) {
          const a = this.refToRange(l.ref);
          a && r.push(R({ name: l.name, range: a }, l.password ? { password: l.password } : {}));
        }
        this.edit.setProtectedRanges(r), this.render();
      }
    }), !0;
  }
  /** MergeRange → "A1:C3"。 */
  rangeToRef(e) {
    return e.top === e.bottom && e.left === e.right ? `${Oe(e.left)}${e.top + 1}` : `${Oe(e.left)}${e.top + 1}:${Oe(e.right)}${e.bottom + 1}`;
  }
  /** "A1:C3"/"A1" → MergeRange(0-based);非法返 null。 */
  refToRange(e) {
    const t = e.trim().split(/\s+/)[0], o = /^([A-Za-z]+)(\d+)(?::([A-Za-z]+)(\d+))?$/.exec(t);
    if (!o) return null;
    const i = (c) => {
      let d = 0;
      for (const u of c.toUpperCase()) d = d * 26 + (u.charCodeAt(0) - 64);
      return d - 1;
    }, s = i(o[1]), r = parseInt(o[2], 10) - 1, l = o[3] ? i(o[3]) : s, a = o[4] ? parseInt(o[4], 10) - 1 : r;
    return { top: Math.min(r, a), left: Math.min(s, l), bottom: Math.max(r, a), right: Math.max(s, l) };
  }
  // ---- 工作簿保护(审阅「保护工作簿」)----
  isWorkbookProtected() {
    var e, t;
    return !!((t = (e = this.workbook) == null ? void 0 : e.protection) != null && t.lockStructure);
  }
  /** 打开保护/撤销工作簿对话框。需 editable。 */
  openProtectWorkbookDialog() {
    if (!this.editCfg.editable || !this.workbook) return !1;
    const e = this.workbook.protection;
    return e != null && e.lockStructure || e != null && e.lockWindows ? this.protectWbDialog.show({
      mode: "unprotect",
      hasPassword: !!e.password,
      onUnprotect: (t) => {
        if (e.password && t !== e.password) {
          this.validationPrompt.showError("warning", "密码不正确,无法撤销保护。");
          return;
        }
        this.edit.setWorkbookProtection(null), this.render();
      }
    }) : this.protectWbDialog.show({
      mode: "protect",
      onApply: ({ lockStructure: t, password: o }) => {
        this.edit.setWorkbookProtection(R({ lockStructure: t }, o ? { password: o } : {})), this.render();
      }
    }), !0;
  }
  /** 共享工作簿(审阅「共享工作簿」)—— 该特性已被 Excel/WPS 官方弃用,占位提示不实现。 */
  shareWorkbookNotice() {
    this.validationPrompt.showError("information", "「共享工作簿」是已被官方弃用的旧特性,本组件不提供该能力。");
  }
  // ===== 视图选项卡:编辑栏 / 行号列标 / 网格线 / 任务窗格(1.16.0)=====
  /** 网格线是否显示(视图「网格线」;跟随当前表 showGridLines)。 */
  isGridLinesVisible() {
    var e;
    return ((e = this.sheet) == null ? void 0 : e.showGridLines) !== !1;
  }
  /** 切换网格线显示(直接改当前表 showGridLines;非撤销,同 WPS 视图开关)。 */
  toggleGridLines() {
    return this.sheet ? (this.sheet.showGridLines = !this.isGridLinesVisible(), this.render(), this.hooks.onSelectionChange(), this.sheet.showGridLines) : !1;
  }
  /** 行号列标是否显示(视图「行号列标」)。 */
  areHeadersVisible() {
    var e, t;
    return (t = (e = this.renderer) == null ? void 0 : e.areHeadersVisible()) != null ? t : !0;
  }
  /** 切换行号列标显示(渲染器表头尺寸归 0 / 恢复;重建几何 + 刷内容尺寸;非撤销)。 */
  toggleHeaders() {
    const e = this.renderer;
    if (!e) return !1;
    const t = !e.areHeadersVisible();
    return e.setShowHeaders(t), this.refreshContentSize(), this.sheet && this.overlays.build(this.sheet, e, this.view), this.render(), this.hooks.onSelectionChange(), t;
  }
  /** 编辑栏是否显示(视图「编辑栏」;壳读此决定是否渲染公式栏)。 */
  isFormulaBarVisible() {
    return this.formulaBarVisible;
  }
  /** 切换编辑栏显示(壳级 UI:改布尔 + 通知壳重渲)。 */
  toggleFormulaBar() {
    return this.formulaBarVisible = !this.formulaBarVisible, this.hooks.onSelectionChange(), this.formulaBarVisible;
  }
  /** 任务窗格是否打开(视图「任务窗格」)。 */
  isTaskPaneOpen() {
    return this.taskPane.isOpen();
  }
  /** 切换任务窗格(右停靠面板:工作表导航 + 选区统计 + 视图开关)。 */
  toggleTaskPane() {
    return this.taskPane.isOpen() ? (this.taskPane.close(), this.hooks.onSelectionChange(), !1) : (this.openTaskPane(), !0);
  }
  openTaskPane() {
    this.taskPane.show({
      getData: () => this.buildTaskPaneData(),
      onToggle: (e) => {
        e === "formulaBar" ? this.toggleFormulaBar() : e === "headers" ? this.toggleHeaders() : e === "gridlines" && this.toggleGridLines(), this.taskPane.refresh();
      },
      onClose: () => this.hooks.onSelectionChange()
    }), this.hooks.onSelectionChange();
  }
  /** 组装任务窗格数据(工作簿/表/选区/视图开关)。 */
  buildTaskPaneData() {
    var i, s, r, l, a, c;
    const e = (s = (i = this.workbook) == null ? void 0 : i.sheets.map((d) => d.name)) != null ? s : [], t = this.getSelection(), o = this.getSelectionStats();
    return {
      sheets: e,
      activeSheet: this.activeIndex,
      selectionRef: t ? t.top === t.bottom && t.left === t.right ? `${Oe(t.left)}${t.top + 1}` : `${Oe(t.left)}${t.top + 1}:${Oe(t.right)}${t.bottom + 1}` : "—",
      count: (r = o == null ? void 0 : o.count) != null ? r : 0,
      sum: (l = o == null ? void 0 : o.sum) != null ? l : 0,
      average: (a = o == null ? void 0 : o.avg) != null ? a : 0,
      numCount: (c = o == null ? void 0 : o.numCount) != null ? c : 0,
      formulaBar: this.isFormulaBarVisible(),
      headers: this.areHeadersVisible(),
      gridlines: this.isGridLinesVisible()
    };
  }
  /** 隐藏/显示选区所在行(WPS 行和列 ▾)。非撤销(可再"显示"还原)。 */
  setSelectionRowsHidden(e) {
    var i;
    const t = this.getSelection(), o = this.sheet;
    if (!this.editCfg.editable || !t || !o) return !1;
    for (let s = t.top; s <= t.bottom; s++) {
      const r = o.rows.get(s);
      r ? r.hidden = e : e && o.rows.set(s, { height: o.defaultRowHeight, hidden: !0 });
    }
    return (i = this.renderer) == null || i.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 隐藏/显示选区所在列。 */
  setSelectionColsHidden(e) {
    var i;
    const t = this.getSelection(), o = this.sheet;
    if (!this.editCfg.editable || !t || !o) return !1;
    for (let s = t.left; s <= t.right; s++) {
      const r = o.columns.get(s);
      r ? r.hidden = e : e && o.columns.set(s, { width: o.defaultColWidth, hidden: !0 });
    }
    return (i = this.renderer) == null || i.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 最适合选区行高/列宽(WPS 行和列 ▾)。 */
  autoFitSelection(e) {
    const t = this.getSelection();
    return !this.editCfg.editable || !t ? !1 : e === "col" ? this.autoFitColumns({ from: t.left, to: t.right }) > 0 : this.autoFitRows({ from: t.top, to: t.bottom }) > 0;
  }
  /** 当前冻结态(工具栏 active 用)。 */
  getFreezeState() {
    var e, t;
    return (t = (e = this.sheet) == null ? void 0 : e.freeze) != null ? t : { frozenRows: 0, frozenCols: 0 };
  }
  /**
   * 冻结(WPS 冻结 ▾):active=活动格(行+列)/ activeRow=只冻行到活动格 / activeCol=只冻列到活动格 /
   * header=智能识别表头 / firstRow=首行 / firstCol=首列 / none=取消。非撤销(同旧 toggle 行为)。
   */
  freezePanes(e) {
    var s, r;
    const t = this.sheet;
    if (!t) return !1;
    const { fr: o, fc: i } = this.freezeCountsForMode(e);
    return (s = this.renderer) == null || s.setFreezePreview(null), this.freezePreviewOn = !1, t.freeze = { frozenRows: o, frozenCols: i }, (r = this.renderer) == null || r.rebuildMetrics(), this.refreshContentSize(), this.render(), !0;
  }
  /** 各冻结模式 → {冻结行数 fr, 冻结列数 fc}(freezePanes 应用 / previewFreezeMode 预览共用)。 */
  freezeCountsForMode(e) {
    const t = this.selActive;
    let o = 0, i = 0;
    return e === "firstRow" ? o = 1 : e === "firstCol" ? i = 1 : e === "active" ? (o = t ? t.row : 1, i = t ? t.col : 0) : e === "activeRow" ? o = t ? t.row : 1 : e === "activeCol" ? i = t ? t.col : 0 : e === "header" && this.sheet && (o = Eg(this.sheet)), { fr: o, fc: i };
  }
  /** 悬停冻结菜单项时高亮"将冻结的区域"(灰底 + 分割线加重,对齐 WPS)。不改模型。 */
  previewFreezeMode(e) {
    if (!this.sheet || !this.renderer) return;
    const { fr: t, fc: o } = this.freezeCountsForMode(e), i = t > 0 || o > 0;
    this.renderer.setFreezePreview(i ? { rows: t, cols: o } : null), this.freezePreviewOn = i, this.render();
  }
  /** 清除冻结预览(菜单项移出 / 菜单关闭 / 网格交互时调);无预览时空操作不重渲。 */
  clearFreezePreview() {
    !this.renderer || !this.freezePreviewOn || (this.renderer.setFreezePreview(null), this.freezePreviewOn = !1, this.render());
  }
  /** 设选区水平对齐。 */
  setSelectionHAlign(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { hAlign: e }) : !1;
  }
  /** 设选区垂直对齐。 */
  setSelectionVAlign(e) {
    const t = this.getSelection();
    return t ? this.setStyle(t, { vAlign: e }) : !1;
  }
  /** 增减选区缩进(下限 0)。 */
  adjustSelectionIndent(e) {
    var i;
    const t = this.getSelection();
    if (!t) return !1;
    const o = (i = this.getSelectionAlignState().indent) != null ? i : 0;
    return this.setStyle(t, { indent: Math.max(0, o + e) });
  }
  /** 给选区加/清框线(WPS 全项):所有/无/外侧/上/下/左/右。单/外侧边用 setStyleRegions 精确到边界格,单次撤销。 */
  setSelectionBorders(e, t = "#000000") {
    const o = this.getSelection();
    if (!this.editCfg.editable || !o) return !1;
    const i = { style: "thin", color: t }, s = { style: "none", color: "#000000" };
    if (e === "all") return this.setStyle(o, { borders: { top: i, bottom: i, left: i, right: i } });
    if (e === "none") return this.setStyle(o, { borders: { top: s, bottom: s, left: s, right: s } });
    const r = (a, c, d, u) => {
      const h = [];
      for (let p = a; p <= d; p++) for (let m = c; m <= u; m++) h.push({ row: p, col: m });
      return h;
    }, l = [];
    return (e === "outer" || e === "top") && l.push({ cells: r(o.top, o.left, o.top, o.right), patch: { borders: { top: i } } }), (e === "outer" || e === "bottom") && l.push({ cells: r(o.bottom, o.left, o.bottom, o.right), patch: { borders: { bottom: i } } }), (e === "outer" || e === "left") && l.push({ cells: r(o.top, o.left, o.bottom, o.left), patch: { borders: { left: i } } }), (e === "outer" || e === "right") && l.push({ cells: r(o.top, o.right, o.bottom, o.right), patch: { borders: { right: i } } }), l.length ? this.edit.setStyleRegions(l) : !1;
  }
  /** 合并居中(WPS 合并居中):合并选区 + 锚点水平居中/垂直居中。 */
  mergeCenterSelection() {
    const e = this.getSelection();
    if (!this.editCfg.editable || !e) return !1;
    const t = this.mergeCells(e);
    return t && this.setStyle({ top: e.top, left: e.left, bottom: e.top, right: e.left }, { hAlign: "center", vAlign: "middle" }), t;
  }
  /** 清除(WPS 清除菜单):all=全部(删格)/ content=内容 / formats=格式 / comments=批注。单次撤销。 */
  clearSelectionCells(e) {
    const t = this.getSelection();
    if (!this.editCfg.editable || !t) return !1;
    if (e === "content") return this.clearRange(t);
    if (e === "formats") return this.clearSelectionFormat();
    const o = this.edit.clearCellsSnapshot(t, e);
    return o && this.render(), o;
  }
  // ---- 图片编辑(E6;浮动/嵌入 增删移改) ----
  /** 读当前表全部图片锚点(克隆)。 */
  getImages() {
    return this.edit.getImages();
  }
  /** 加一张图(无 src 但有 bytes+mime 时自动生成 blob url);返回插入索引(失败 -1)。 */
  addImage(e) {
    let t = e;
    return !t.src && t.bytes && t.mime && (t = K(R({}, t), { src: URL.createObjectURL(new Blob([t.bytes], { type: t.mime })) })), this.edit.addImage(t);
  }
  /** 删一张图。 */
  removeImage(e) {
    const t = this.edit.removeImage(e);
    return t && this.afterImageStructChange(), t;
  }
  /** 图片增删/互转后:清选中态 + 重建 overlay(<img> el 随 sheet.images 增删)+ 重绘。 */
  afterImageStructChange() {
    this.selectImage(-1), this.sheet && this.renderer && this.overlays.build(this.sheet, this.renderer, this.view), this.render();
  }
  /** 移动图片(屏幕像素增量);editable 时入命令栈 + 发 image-change。 */
  moveImage(e, t, o) {
    return this.editImageRect(e, (i) => K(R({}, i), { left: i.left + t, top: i.top + o }));
  }
  /** 缩放图片(目标屏幕像素宽高);editable 时入命令栈 + 发 image-change。 */
  resizeImage(e, t, o) {
    return this.editImageRect(e, (i) => K(R({}, i), { width: Math.max(8, t), height: Math.max(8, o) }));
  }
  /** 设浮动图旋转角(顺时针度,自动归一 0~359);editable 时入命令栈 + 重绘。 */
  setImageRotation(e, t) {
    var s;
    const o = (s = this.sheet) == null ? void 0 : s.images[e];
    if (!this.editCfg.editable || !o) return !1;
    this.edit.ensureBaseline();
    const i = Ee(o);
    return o.rotation = (Math.round(t) % 360 + 360) % 360 || void 0, this.edit.recordImageEdit(e, i, Ee(o)), this.render(), !0;
  }
  /** 在当前角度上增量旋转(+90 右转 / -90 左转);editable。 */
  rotateImage(e, t) {
    var i;
    const o = (i = this.sheet) == null ? void 0 : i.images[e];
    return o ? this.setImageRotation(e, (o.rotation || 0) + t) : !1;
  }
  /** 设浮动图裁剪(各边 0~1 比例,undefined=清);editable 入命令栈。 */
  setImageCrop(e, t) {
    var s;
    const o = (s = this.sheet) == null ? void 0 : s.images[e];
    if (!this.editCfg.editable || !o) return !1;
    this.edit.ensureBaseline();
    const i = Ee(o);
    return o.crop = t && (t.l || t.t || t.r || t.b) ? R({}, t) : void 0, this.edit.recordImageEdit(e, i, Ee(o)), this.render(), !0;
  }
  /** 进入裁剪模式(拖控制点=裁剪);选中该图。需 editable。 */
  enterImageCrop(e) {
    var t;
    return !this.editCfg.editable || !((t = this.sheet) != null && t.images[e]) ? !1 : (this.selectImage(e), this.cropModeIdx = e, this.render(), !0);
  }
  /** 退出裁剪模式(保留已裁结果)。 */
  exitImageCrop() {
    this.cropModeIdx < 0 || (this.cropModeIdx = -1, this.render());
  }
  /** 把浮动图恢复为**初始物理尺寸**(像素÷DPI×96 + 上限,同插入时;锚点/位置不变);需 editable。 */
  async resetImageSize(e) {
    var s, r;
    const t = (s = this.sheet) == null ? void 0 : s.images[e];
    if (!this.editCfg.editable || !(t != null && t.src)) return !1;
    const o = await ba(t.src), i = cl(o, t.bytes ? al(t.bytes, (r = t.mime) != null ? r : "") : null);
    return this.resizeImage(e, i.width, i.height);
  }
  /** 浮动图右键菜单项(WPS 式:嵌入到单元格 / 预览 / 重置原图大小 / 删除)。 */
  buildImageContextMenuItems(e) {
    var i, s;
    const t = (i = this.sheet) == null ? void 0 : i.images[e];
    if (!t) return [];
    const o = ((s = t.mime) == null ? void 0 : s.split("/")[1]) || "png";
    return [
      { label: "图片嵌入到单元格", action: () => {
        this.convertImageToCellAuto(e);
      } },
      { label: "图片预览", action: () => {
        t.src && this.openImageLightbox(t.src, `image-${e + 1}.${o}`, t.mime);
      } },
      {
        label: "图片旋转",
        children: [
          { label: "向右旋转 90°", action: () => {
            this.selectImage(e), this.rotateImage(e, 90);
          } },
          { label: "向左旋转 90°", action: () => {
            this.selectImage(e), this.rotateImage(e, -90);
          } },
          { label: "重置旋转", action: () => {
            this.selectImage(e), this.setImageRotation(e, 0);
          } }
        ]
      },
      {
        label: "图片裁剪",
        children: [
          { label: "进入裁剪(拖控制点裁剪,点空白/Esc 确认)", action: () => {
            this.enterImageCrop(e);
          } },
          { label: "重置裁剪", action: () => {
            this.selectImage(e), this.setImageCrop(e, void 0);
          } }
        ]
      },
      { label: "重置为原图大小", action: () => {
        this.resetImageSize(e);
      } },
      { separator: !0 },
      { label: "删除图片", action: () => {
        this.removeImage(e);
      } }
    ];
  }
  // ---- WPS 单元格内嵌图(DISPIMG)⇄ 浮动图互转(第二期) ----
  /** 改 WPS 单元格内嵌图贴合方式(fill/contain/cover);即时重绘。 */
  setCellImageFit(e) {
    var t;
    this.rendererOpts = K(R({}, this.rendererOpts), { cellImageFit: e }), (t = this.renderer) != null && t.setCellImageFit(e) && this.render();
  }
  /** 读 WPS 单元格内嵌图登记表(克隆,id→{id,src,mime});无则空数组。 */
  getCellImages() {
    var t;
    const e = (t = this.workbook) == null ? void 0 : t.cellImages;
    return e ? Array.from(e.values(), (o) => ({ id: o.id, src: o.src, mime: o.mime })) : [];
  }
  /** 某格是否内嵌图(DISPIMG)→ 返 {id,src,mime},否则 null(供点击放大判定)。 */
  getCellImageAt(e, t) {
    var s, r, l, a;
    const o = (r = (s = this.sheet) == null ? void 0 : s.cells.get(X(e, t))) == null ? void 0 : r.dispImgId, i = o ? (a = (l = this.workbook) == null ? void 0 : l.cellImages) == null ? void 0 : a.get(o) : void 0;
    return i ? { id: i.id, src: i.src, mime: i.mime } : null;
  }
  /** 开/关图片点击放大灯箱(默认开;只读模式单击图、编辑模式右键菜单触发)。 */
  setLightboxEnabled(e) {
    this.lightboxEnabled = e;
  }
  /** 打开图片放大灯箱(命令式;src = blob/data/http url)。 */
  openImageLightbox(e, t, o) {
    this.lightbox.show({ src: e, fileName: t, mime: o });
  }
  /** 一张浮动图视觉中心落在哪个单元格(用几何反推;无渲染器时回落锚点 from 格)。 */
  imageCellOf(e) {
    var i;
    const t = (i = this.sheet) == null ? void 0 : i.images[e];
    if (!t) return null;
    if (!this.renderer) return { row: t.from.row, col: t.from.col };
    const o = Ie(this.renderer.metrics, t);
    return {
      row: this.renderer.metrics.rowAt(o.top),
      col: this.renderer.metrics.colAt(o.left)
    };
  }
  /** 浮动图 → 单元格内嵌图(显式指定目标格);失败返 false。 */
  convertImageToCell(e, t, o) {
    const i = this.edit.convertImageToCell(e, t, o);
    return i && this.afterImageStructChange(), i;
  }
  /** 选区批量:把"中心格落在 range 内"的所有浮动图就近嵌入,聚合成单次 undo;返回成功嵌入张数。 */
  convertImagesInRangeToCell(e) {
    const t = this.sheet;
    if (!t) return 0;
    const o = [];
    for (let i = 0; i < t.images.length; i++) {
      const s = this.imageCellOf(i);
      s && s.row >= e.top && s.row <= e.bottom && s.col >= e.left && s.col <= e.right && o.push({ imageIndex: i, row: s.row, col: s.col });
    }
    return o.length ? this.edit.convertImagesToCells(o) : 0;
  }
  // applyTemplate(P3 旧版 placeholder + anchor 模型,2026-06-08 已删除)
  // 新语义"模板=样式捐赠者"由 core/template/style-overlay.ts 提供,壳层 (Vue/React) 用
  // applyStyleTemplate(dataWb, templateWb) 合成后再 loadModel 喂进来,不再走 controller 内 in-place 改造.
  /** 选区批量:把 range 内所有 DISPIMG 格拎成浮动图;聚合成单次 undo;返回成功转换张数。 */
  convertCellImagesInRangeToFloat(e, t) {
    const o = this.sheet;
    if (!o) return 0;
    const i = [];
    for (let s = e.top; s <= e.bottom; s++)
      for (let r = e.left; r <= e.right; r++) {
        const l = o.cells.get(X(s, r));
        l != null && l.dispImgId && i.push({ row: s, col: r, size: t });
      }
    return i.length ? this.edit.convertCellImagesToFloats(i) : 0;
  }
  /** 浮动图 → 内嵌图(**就近**:图在哪格就嵌哪格,目标由几何反推);失败返 false。 */
  convertImageToCellAuto(e) {
    const t = this.imageCellOf(e);
    if (!t) return !1;
    const o = this.edit.convertImageToCell(e, t.row, t.col);
    return o && this.afterImageStructChange(), o;
  }
  /**
   * 批量把浮动图按"所在单元格"就近嵌入(整表 / 整列)。`col` 给定则只嵌中心落在该列的图。
   * 一次进撤销栈(单次 Ctrl+Z 全撤)。返回成功嵌入的张数。
   */
  convertAllImagesToCells(e) {
    var i;
    const t = (i = this.sheet) == null ? void 0 : i.images;
    if (!t || !t.length) return 0;
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const r = this.imageCellOf(s);
      r && (e != null && r.col !== e || o.push({ imageIndex: s, row: r.row, col: r.col }));
    }
    return this.edit.convertImagesToCells(o);
  }
  /** 单元格内嵌图 → 浮动图(把 row,col 的 DISPIMG 拎成浮动图);非内嵌图格返 false。 */
  convertCellImageToFloat(e, t, o) {
    return this.edit.convertCellImageToFloat(e, t, o);
  }
  // ---- 行列结构编辑(E7;增删行列) ----
  /** 在 at 处插入 count 行(原 at 行及之后下移)。 */
  insertRows(e, t = 1) {
    return this.edit.insertRows(e, t);
  }
  /** 删除 [at, at+count) 行(与合并相交则警告,相交合并被移除)。 */
  deleteRows(e, t = 1) {
    return this.sheet && Kr(this.sheet, "delete-rows", e, t) && console.warn("[ooxml-preview] 删除行与合并单元格相交,相交的合并将被移除"), this.edit.deleteRows(e, t);
  }
  /** 在 at 处插入 count 列。 */
  insertCols(e, t = 1) {
    return this.edit.insertCols(e, t);
  }
  /** 删除 [at, at+count) 列(与合并相交则警告)。 */
  deleteCols(e, t = 1) {
    return this.sheet && Kr(this.sheet, "delete-cols", e, t) && console.warn("[ooxml-preview] 删除列与合并单元格相交,相交的合并将被移除"), this.edit.deleteCols(e, t);
  }
  /** 移动/缩放公共路径:算当前矩形 → 变换 → setImageRect → 重定位 → 补登命令。 */
  editImageRect(e, t) {
    if (!this.editCfg.editable || !this.sheet || !this.renderer) return !1;
    const o = this.sheet.images[e];
    if (!o) return !1;
    this.edit.ensureBaseline();
    const i = Ee(o);
    return Ci(this.sheet, e, t(Ie(this.renderer.metrics, o)), this.view.zoom), this.render(), this.edit.recordImageEdit(e, i, Ee(this.sheet.images[e])), !0;
  }
  undo() {
    this.edit.undo();
  }
  redo() {
    this.edit.redo();
  }
  canUndo() {
    return this.edit.canUndo();
  }
  canRedo() {
    return this.edit.canRedo();
  }
  getEditingCell() {
    return this.edit.getEditingCell();
  }
  getCellSnapshot(e, t) {
    return this.edit.getCellSnapshot(e, t);
  }
  /** 单元格"全息体检":snapshot + 合并区 + 浮动图覆盖 + WPS 内嵌图 + 数据验证 + 条件格式命中 + 链接/批注。
   *  无 workbook / sheet / 越界返 null。详见 [src/core/model/inspect.ts](src/core/model/inspect.ts)。 */
  inspectCell(e, t) {
    const o = this.sheet, i = this.workbook;
    return !o || !i || e < 0 || t < 0 ? null : zm(o, i, e, t, i.date1904);
  }
  // ---- 编辑器宿主(E2) ----
  /** 壳注入合并后的编辑器解析器(plugin.editor + prop.editor) */
  setEditorResolver(e) {
    this.editorResolver = e;
  }
  /**
   * 进入编辑:解析编辑器工厂(无自定义则用内置文本编辑器)→ 挂载。只读则不进入。
   * initialText 为打字进入时的起始字符。返回是否进入。
   */
  beginEdit(e, t, o) {
    var p, m, b, v, y;
    if (!this.sheet || !this.workbook) return !1;
    const i = (m = (p = this.renderer) == null ? void 0 : p.mergeAt(e, t)) != null ? m : null, s = i ? i.top : e, r = i ? i.left : t;
    if (!this.isCellEditable(s, r)) return !1;
    const l = (b = this.sheet.cells.get(X(s, r))) != null ? b : null;
    if (l != null && l.dispImgId) return !1;
    const a = (y = (v = this.editorResolver) == null ? void 0 : v.call(this, l, { row: s, col: r })) != null ? y : k0, c = i ? this.rectOfRange(i) : this.rectOf(s, r), d = this.edit.getCellSnapshot(s, r);
    if (!c || !d) return !1;
    const u = {
      snapshot: d,
      rect: c,
      sheet: this.sheet,
      workbook: this.workbook,
      permission: "editable",
      initialText: o,
      commit: (w, S) => this.commitEdit(w, S),
      cancel: () => this.cancelEdit()
    }, h = i ? () => this.rectOfRange(i) : void 0;
    return this.editorHost.mount(s, r, a, u, h) ? (this.edit.setEditing({ row: s, col: r }), this.hooks.onEditEvent("edit-start", { cell: { row: s, col: r }, snapshot: d }), !0) : !1;
  }
  /**
   * 提交当前编辑(取值 → 命令栈 → 卸编辑器)。value 可为裸值或 {value,style}(样式 E5 起生效)。
   * move 指示提交后活动格移动(Enter→down / Tab→right)。
   */
  commitEdit(e, t) {
    const o = this.edit.getEditingCell();
    if (!o) return !1;
    const i = e !== null && typeof e == "object" && !(e instanceof Date) && "value" in e, s = i ? e.value : e, r = i ? e.style : void 0;
    if (!this.passValidation(o.row, o.col, s)) return !1;
    !r && typeof s == "string" && s === this.getCellEditString(o.row, o.col) || this.edit.editCell(o.row, o.col, s), r && this.edit.setStyle({ top: o.row, left: o.col, bottom: o.row, right: o.col }, r), this.hooks.onEditEvent("edit-commit", { cell: o, value: s }), this.editorHost.unmount(), this.edit.setEditing(null);
    const a = this.renderer;
    if (t && a) {
      const c = t === "down" ? Math.min(o.row + 1, a.metrics.rows - 1) : o.row, d = t === "right" ? Math.min(o.col + 1, a.metrics.cols - 1) : o.col;
      this.selectCell(c, d);
    }
    return this.els.scroller.focus(), !0;
  }
  /** 取消当前编辑(不改模型) */
  cancelEdit() {
    this.editorHost.isActive() && (this.editorHost.unmount(), this.edit.setEditing(null));
  }
  /** 当前是否有活动编辑器 */
  isEditing() {
    return this.editorHost.isActive();
  }
  // ====================== 导出 / 打印(委托 WorkbookExporter) ======================
  exportImage(e) {
    return this.exporter.exportImage(e);
  }
  downloadImage(e) {
    return this.exporter.downloadImage(e);
  }
  exportPdf(e) {
    return this.exporter.exportPdf(e);
  }
  downloadPdf(e) {
    return this.exporter.downloadPdf(e);
  }
  print(e) {
    return this.exporter.print(e);
  }
  /** 打印预览:生成分页页图 → 弹全屏预览浮层(内含「打印」= 走 print(同 opts));无可导出表返 false。只读也可用。 */
  async openPrintPreview(e) {
    const t = await this.exporter.buildPrintPages(e != null ? e : {});
    return t.length ? (this.printPreview.show({ sheets: t, onPrint: () => void this.exporter.print(e) }), !0) : !1;
  }
  // ---- 数据导出(E8;委托 WorkbookExporter,一份数据层 → xlsx/json/csv) ----
  exportXlsx(e) {
    return this.exporter.exportXlsx(e);
  }
  downloadXlsx(e) {
    return this.exporter.downloadXlsx(e);
  }
  exportJson(e) {
    return this.exporter.exportJson(e);
  }
  downloadJson(e) {
    this.exporter.downloadJson(e);
  }
  exportCsv(e) {
    return this.exporter.exportCsv(e);
  }
  downloadCsv(e) {
    this.exporter.downloadCsv(e);
  }
}
function ya(n) {
  return { top: n.row, left: n.col, bottom: n.row, right: n.col };
}
function Oe(n) {
  let e = n + 1, t = "";
  for (; e > 0; ) {
    const o = (e - 1) % 26;
    t = String.fromCharCode(65 + o) + t, e = Math.floor((e - 1) / 26);
  }
  return t;
}
function ev(n) {
  const e = /^\s*([A-Za-z]+)([1-9]\d*)\s*$/.exec(n);
  if (!e) return null;
  let t = 0;
  for (const i of e[1].toUpperCase()) t = t * 26 + i.charCodeAt(0) - 64;
  const o = Number(e[2]) - 1;
  return t -= 1, o >= 0 && o < $o && t >= 0 && t < Zt ? { row: o, col: t } : null;
}
function va(n) {
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n == "string") {
    const e = Number(n.replace(/,/g, "").trim());
    if (Number.isFinite(e)) return e;
  }
  return null;
}
function To(n, e, t) {
  return t.length ? t.map((o) => {
    var s;
    const i = (s = n.cells.get(X(e, o))) == null ? void 0 : s.raw;
    return i == null || String(i).trim() === "" ? "(空白)" : String(i);
  }).join(" / ") : "";
}
function yn(n) {
  return [...new Set(n)].sort((e, t) => e.localeCompare(t, void 0, { numeric: !0 }));
}
function tv(n, e, t) {
  var i;
  const o = {};
  for (const s of t) {
    const r = [];
    for (let l = e.top + 1; l <= e.bottom; l++) {
      const a = (i = n.cells.get(X(l, s.index))) == null ? void 0 : i.raw;
      a != null && String(a).trim() !== "" && r.push(String(a));
    }
    o[s.index] = yn(r);
  }
  return o;
}
function ov(n, e, t) {
  var o, i, s, r, l, a;
  return {
    filters: (i = (o = n == null ? void 0 : n.filters) == null ? void 0 : o.map((c) => {
      var d;
      return K(R({}, c), { values: (d = c.values) == null ? void 0 : d.slice() });
    })) != null ? i : [],
    columns: (r = (s = n == null ? void 0 : n.columns) == null ? void 0 : s.slice()) != null ? r : [],
    rows: (l = n == null ? void 0 : n.rows) != null && l.length ? n.rows.slice() : [e],
    values: (a = n == null ? void 0 : n.values) != null && a.length ? n.values.map((c) => R({}, c)) : [{ field: t, summary: "sum" }]
  };
}
function xa(n) {
  return {
    filters: n.filters.map((e) => {
      var t;
      return K(R({}, e), { values: (t = e.values) == null ? void 0 : t.slice() });
    }),
    columns: n.columns.slice(),
    rows: n.rows.slice(),
    values: n.values.map((e) => R({}, e))
  };
}
function nv(n, e, t) {
  var o, i;
  for (const s of t) {
    const r = (o = n.cells.get(X(e, s.field))) == null ? void 0 : o.raw, l = r == null || String(r).trim() === "" ? "" : String(r);
    if (s.mode === "non-empty" && !l || s.mode === "equals" && l !== ((i = s.value) != null ? i : "") || s.mode === "include" && s.values && s.values.length && !s.values.includes(l)) return !1;
  }
  return !0;
}
function iv(n) {
  const e = "PivotTable", t = new Set(n.sheets.map((r) => r.name));
  let o = e, i = 1;
  for (; t.has(o); ) o = `${e}${++i}`;
  const s = {
    name: o,
    index: n.sheets.length,
    state: "visible",
    dimension: { rows: 0, cols: 0 },
    cells: /* @__PURE__ */ new Map(),
    styles: [sv()],
    merges: [],
    columns: /* @__PURE__ */ new Map(),
    rows: /* @__PURE__ */ new Map(),
    defaultColWidth: 80,
    defaultRowHeight: 24,
    freeze: { frozenRows: 0, frozenCols: 0 },
    conditional: [],
    dataValidations: [],
    images: [],
    charts: [],
    shapes: [],
    sparklines: [],
    pivotTables: [],
    showGridLines: !0
  };
  return n.sheets.push(s), s;
}
function sv() {
  return {
    font: { name: "Calibri", size: 11, bold: !1, italic: !1, underline: !1, strike: !1, color: "#000000" },
    fill: { type: "none" },
    borders: {},
    hAlign: "general",
    vAlign: "bottom",
    wrapText: !1,
    shrinkToFit: !1,
    textRotation: 0,
    indent: 0,
    numFmt: "General"
  };
}
function wa(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function rv(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function lv(n) {
  if (!n) return [];
  let e = n.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
  return e.endsWith(`
`) && (e = e.slice(0, -1)), e === "" ? [] : e.split(`
`).map((t) => t.split("	"));
}
function gn(n) {
  return n == null || n === "";
}
function ka(n, e) {
  const t = Ea(n), o = Ea(e);
  if (t !== o) return t - o;
  if (t === 0) {
    const i = Ta(n), s = Ta(e);
    return i < s ? -1 : i > s ? 1 : 0;
  }
  return t === 2 ? (n ? 1 : 0) - (e ? 1 : 0) : String(n).localeCompare(String(e), void 0, { numeric: !0 });
}
function Sa() {
  return { sum: 0, count: 0, max: null, min: null };
}
function av(n, e, t) {
  e != null ? (n.sum += e, n.count++, n.max = n.max == null ? e : Math.max(n.max, e), n.min = n.min == null ? e : Math.min(n.min, e)) : t != null && String(t).trim() && n.count++;
}
function cv(n, e) {
  n.sum += e.sum, n.count += e.count, e.max != null && (n.max = n.max == null ? e.max : Math.max(n.max, e.max)), e.min != null && (n.min = n.min == null ? e.min : Math.min(n.min, e.min));
}
function Ca(n, e) {
  var t, o;
  return e === "count" ? n.count : e === "avg" ? n.count ? n.sum / n.count : 0 : e === "max" ? (t = n.max) != null ? t : 0 : e === "min" ? (o = n.min) != null ? o : 0 : n.sum;
}
function dv(n) {
  return { sum: "求和项", count: "计数项", avg: "平均值", max: "最大值", min: "最小值" }[n];
}
function Ea(n) {
  return typeof n == "number" || n instanceof Date ? 0 : typeof n == "boolean" ? 2 : 1;
}
function Ta(n) {
  return n instanceof Date ? n.getTime() : typeof n == "number" ? n : Number(n);
}
function mn(n, e, t, o, i) {
  const s = n.metrics.rows - 1, r = n.metrics.cols - 1, l = (u, h) => u >= 0 && u <= s && h >= 0 && h <= r, a = (u, h) => n.cellText(u, h) !== "";
  let c = e + o, d = t + i;
  if (!l(c, d)) return { row: e, col: t };
  if (a(e, t) && a(c, d))
    for (; l(c + o, d + i) && a(c + o, d + i); )
      c += o, d += i;
  else
    for (; l(c, d) && !a(c, d) && l(c + o, d + i); )
      c += o, d += i;
  return { row: c, col: d };
}
function uv() {
  const n = be(!1), e = be(null), t = be(null), o = be(null), i = be(null);
  async function s(l, a) {
    var c;
    n.value = !0, e.value = null, t.value && Ki(t.value), t.value = null, i.value = null, o.value = { stage: "read", ratio: 0 };
    try {
      const d = await bs(l, (p, m) => {
        o.value = { stage: "read", ratio: m ? p / m : void 0 };
      }), u = Da(d);
      if (u === "xls") throw new Error("这是旧版 .xls(BIFF) 或加密文件,本预览器只支持 .xlsx/.xlsm.");
      if (u === "not-zip") throw new Error("文件不是有效的 .xlsx(非 ZIP 包).");
      if (u === "empty") throw new Error("文件为空.");
      let h = await sc(d, (p) => {
        o.value = p;
      });
      a && (h = (c = a(h)) != null ? c : h), Ha(h), i.value = d.slice(0), t.value = h;
    } catch (d) {
      const u = d == null ? void 0 : d.message;
      e.value = u && /预览器|损坏|加密|为空|ZIP/.test(u) ? u : Zh(d), console.error("[ooxml-preview vue2] 解析失败:", d);
    } finally {
      n.value = !1, o.value = null;
    }
  }
  function r(l, a) {
    var c;
    t.value && Ki(t.value), i.value = null, e.value = null, o.value = null, t.value = a && (c = a(l)) != null ? c : l;
  }
  return { loading: n, error: e, workbook: t, load: s, loadModel: r, progress: o, sourceBuffer: i };
}
const hv = 56, fv = 200, Kt = (n) => n ? n.length * 2 : 0;
function pv(n) {
  var t, o, i, s, r;
  let e = 0;
  for (const l of n.sheets) {
    for (const a of l.cells.values()) {
      e += hv;
      const c = a.raw;
      if (typeof c == "string" ? e += Kt(c) : typeof c == "number" ? e += 8 : typeof c == "boolean" ? e += 4 : c instanceof Date && (e += 8), a.formula && (e += Kt(a.formula)), a.hyperlink && (e += Kt(a.hyperlink)), a.comment && (e += Kt(a.comment)), a.dispImgId && (e += Kt(a.dispImgId)), a.rich) for (const d of a.rich) e += Kt(d.text) + 40;
    }
    e += l.styles.length * fv, e += l.merges.length * 40, e += l.columns.size * 40, e += l.rows.size * 40;
    for (const a of l.images) e += (o = (t = a.bytes) == null ? void 0 : t.length) != null ? o : 0;
    (i = l.background) != null && i.bytes && (e += l.background.bytes.length);
  }
  if (n.cellImages) for (const l of n.cellImages.values()) e += (r = (s = l.bytes) == null ? void 0 : s.length) != null ? r : 0;
  return e;
}
function Yi(n) {
  return n == null || !isFinite(n) || n < 0 ? "—" : n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function Gi() {
  if (typeof performance == "undefined") return null;
  const n = performance.memory;
  return typeof (n == null ? void 0 : n.usedJSHeapSize) == "number" ? n.usedJSHeapSize : null;
}
function gv(n) {
  return function(t) {
    return {
      refName: t,
      get value() {
        var o;
        return (o = n.$refs[t]) != null ? o : null;
      }
    };
  };
}
function ot(n, e) {
  const t = document.createElement(n);
  return e && (t.className = e), t;
}
const Ev = Xd({
  name: "OoxmlExcelViewer",
  props: {
    src: { type: [String, Object, Blob, ArrayBuffer, Uint8Array], default: void 0 },
    workbook: { type: [Array, Object], default: void 0 },
    jsonOptions: { type: Object, default: void 0 },
    templateFile: { type: [String, Object, Blob, ArrayBuffer, Uint8Array], default: void 0 },
    templateName: { type: String, default: "" },
    fileName: { type: String, default: "" },
    theme: { type: Object, default: void 0 },
    transformModel: { type: Function, default: void 0 },
    cellStyle: { type: Function, default: void 0 },
    cellImageFit: { type: String, default: void 0 },
    imageLightbox: { type: Boolean, default: !0 },
    openLinks: { type: Boolean, default: !0 },
    plugins: { type: Array, default: () => [] },
    toolbar: { type: [Boolean, Array], default: !0 },
    /** WPS 式选项卡 Ribbon(工具板块,跟 Vue3/React 同 API):给 RibbonConfig 启用多选项卡;不给走 legacy toolbar */
    ribbon: { type: Object, default: void 0 },
    /** Ribbon 板块布局持久化 key(localStorage);缺省用内置 key;传 null 关闭;仅启用 ribbon 时有意义。跟 Vue3/React 同 API。 */
    ribbonPersistKey: { type: String, default: void 0 },
    editable: { type: Boolean, default: !1 },
    /** 透视表功能开关:默认 false 关闭。开启后(还需 editable)工具栏入口/API/导出回注真实 OOXML 零件才生效 */
    pivotTable: { type: Boolean, default: !1 },
    /** 条件格式编辑开关:默认 false 关闭(只读渲染)。开启后(还需 editable)工具栏入口/API/导出回写才生效 */
    conditionalFormat: { type: Boolean, default: !1 },
    cellReadOnly: { type: Function, default: void 0 },
    readOnlyRanges: { type: Array, default: void 0 },
    editableTargets: { type: [Array, Object], default: void 0 },
    strictDimensions: { type: Boolean, default: !1 },
    readOnlyCellStyle: { type: [Boolean, Object, Function], default: !1 },
    editor: { type: Function, default: void 0 },
    recalc: { type: Boolean, default: !1 },
    formulaEngine: { type: Function, default: void 0 },
    pasteBehavior: { type: Object, default: void 0 },
    readOnlyPrompt: { type: String, default: void 0 },
    contextMenu: { type: [Boolean, Function], default: void 0 },
    exportProgress: { type: Boolean, default: !0 }
  },
  setup(n, { emit: e, expose: t, slots: o }) {
    var Xs;
    const i = (Xs = Kd()) == null ? void 0 : Xs.proxy, s = gv(i), r = s("renderArea"), l = s("fb"), a = s("templateInput");
    let c = null, d = null, u = null, h = null, p = null, m = null, b = null, v = null, y = null;
    const { loading: w, error: S, workbook: k, load: C, loadModel: M, progress: E, sourceBuffer: P } = uv(), I = me(() => {
      var f, g;
      return (g = (f = P.value) == null ? void 0 : f.byteLength) != null ? g : null;
    }), L = me(() => k.value ? pv(k.value) : null), F = be(null);
    let N = Gi();
    ke(w, (f) => {
      var g;
      f && (N = (g = Gi()) != null ? g : N);
    });
    const O = be(0), D = be(1), W = be(0), H = be(0), V = be(!1), Y = be(0), ee = be(0), ce = be(null), le = be(null), ge = be(!1);
    let se = null;
    const de = be(!1), q = be(null);
    function Z(f) {
      q.value = f;
    }
    function te(f) {
      q.value = q.value === f ? null : f;
    }
    function oe(f) {
      var g;
      (g = f.target) != null && g.closest("[data-tb-menu]") || (q.value = null);
    }
    const ne = Jd({
      action: "png",
      scope: "sheet",
      scale: 2,
      includeHeaders: !1,
      gridlines: !0,
      format: "auto",
      orientation: "auto",
      fitToWidth: !0,
      pdfVector: !1
    }), ye = be(null), $e = be(null), et = me(() => {
      var f, g;
      return (g = (f = ye.value) != null ? f : n.templateFile) != null ? g : null;
    }), Ae = me(() => {
      var f, g;
      return (g = (f = $e.value) != null ? f : n.templateName) != null ? g : "";
    }), It = me(() => {
      var f, g;
      return n.fileName ? n.fileName : n.workbook ? "JSON 数据" : ((g = (f = k.value) == null ? void 0 : f.sheets[0]) == null ? void 0 : g.name) || "";
    });
    function sd(f) {
      return f ? Xh(f) ? f : Gh(f, n.jsonOptions) : null;
    }
    async function rd(f) {
      const g = await bs(f), x = Da(g);
      if (x === "xls") throw new Error("模板文件是旧版 .xls 或加密, 仅支持 .xlsx/.xlsm");
      if (x === "not-zip") throw new Error("模板文件不是有效的 .xlsx(非 ZIP 包)");
      if (x === "empty") throw new Error("模板文件为空");
      const $ = await sc(g);
      return Ha($), $;
    }
    const ld = me(() => {
      const f = E.value;
      if (!f) return "加载中…";
      switch (f.stage) {
        case "read":
          return "读取文件";
        case "unzip":
          return "解压";
        case "parse":
          return "解析";
        case "finalize":
          return "处理图片";
        default:
          return "加载中…";
      }
    }), ad = me(() => {
      const f = E.value;
      return !f || f.ratio == null ? null : Math.max(0, Math.min(100, Math.round(f.ratio * 100)));
    }), Ve = me(() => {
      var f;
      return (f = n.plugins) != null ? f : [];
    }), Ls = me(() => Object.assign({}, ...Ve.value.map((f) => f.theme || {}), n.theme || {})), cd = me(() => !!n.cellStyle || Ve.value.some((f) => f.cellStyle));
    function dd(f, g, x) {
      let $;
      const B = (j) => {
        const Q = j == null ? void 0 : j(f, g, x);
        Q && ($ = R(R({}, $ || {}), Q));
      };
      for (const j of Ve.value) B(j.cellStyle);
      return B(n.cellStyle), $;
    }
    function Ot(f) {
      var x, $;
      let g = f;
      for (const B of Ve.value) B.transformModel && (g = (x = B.transformModel(g)) != null ? x : g);
      return n.transformModel && (g = ($ = n.transformModel(g)) != null ? $ : g), g;
    }
    const Do = be(null);
    ke(() => n.editable, () => {
      Do.value = null;
    });
    const Un = be(null);
    ke(() => n.cellImageFit, () => {
      Un.value = null;
    });
    const Ps = me(() => {
      var f;
      return {
        editable: (f = Do.value) != null ? f : n.editable,
        pivotTable: n.pivotTable,
        conditionalFormat: n.conditionalFormat,
        cellReadOnly: n.cellReadOnly,
        readOnlyRanges: n.readOnlyRanges,
        editableTargets: n.editableTargets,
        strictDimensions: n.strictDimensions,
        recalc: n.recalc,
        formulaEngine: n.formulaEngine,
        pasteBehavior: n.pasteBehavior,
        readOnlyPrompt: n.readOnlyPrompt
      };
    });
    function Ns(f, g) {
      var $, B;
      const x = ($ = n.editor) == null ? void 0 : $.call(n, f, g);
      if (x) return x;
      for (const j of Ve.value) {
        const Q = (B = j.editor) == null ? void 0 : B.call(j, f, g);
        if (Q) return Q;
      }
    }
    const Os = me(() => !!n.editor || Ve.value.some((f) => f.editor)), A = Zd(null);
    let so = null, zt = null;
    const Bo = /* @__PURE__ */ new Map();
    let Wo = [];
    function qe(f, g) {
      var x;
      f === "dirty-change" && (V.value = !!(g != null && g.dirty)), e(f, g), (x = Bo.get(f)) == null || x.forEach(($) => $(g));
    }
    async function zs() {
      const f = et.value, g = sd(n.workbook);
      if (n.src) {
        f && console.warn("[ooxml-excel-editor/vue2] :templateFile 只在 :workbook 数据源下生效;xlsx 数据源已忽略."), await C(n.src, Ot);
        return;
      }
      if (g && f) {
        try {
          const x = await rd(f);
          M(Kh(g, x), Ot);
        } catch (x) {
          console.error("[ooxml-excel-editor/vue2] 模板加载失败, 降级纯 JSON:", x), M(g, Ot);
        }
        return;
      }
      if (g) {
        M(g, Ot);
        return;
      }
      f && await C(f, Ot);
    }
    function _n() {
      var $;
      const f = k.value, g = A.value;
      if (!f || !g) return;
      const x = ($ = f.sheets[O.value]) != null ? $ : f.sheets[0];
      x && (g.rebuild(x, f, D.value, {
        theme: Ls.value,
        cellStyle: cd.value ? dd : void 0,
        cellImageFit: n.cellImageFit,
        readOnlyCellStyle: n.readOnlyCellStyle
      }), g.setSourceBuffer(P.value));
    }
    function Hs() {
      var x;
      Wo.forEach(($) => $()), Wo = [], Bo.clear();
      const f = ($, B) => {
        let j = Bo.get($);
        j || Bo.set($, j = /* @__PURE__ */ new Set()), j.add(B);
      }, g = { viewer: Dt, on: f, redraw: () => {
        var $;
        return ($ = A.value) == null ? void 0 : $.render();
      } };
      for (const $ of Ve.value) {
        if ($.events)
          for (const [j, Q] of Object.entries($.events)) Q && f(j, Q);
        const B = (x = $.setup) == null ? void 0 : x.call($, g);
        typeof B == "function" && Wo.push(B);
      }
    }
    function ud() {
      const f = A.value;
      if (!zt || !f) return;
      const g = {
        rectOf: (x, $) => f.rectOf(x, $),
        rectOfRange: (x) => f.rectOfRange(x),
        tick: W.value,
        workbook: k.value
      };
      zt.render(Ve.value, g);
    }
    Qd(() => {
      ho(() => {
        const f = r.value;
        if (!f) {
          console.error("[ooxml-excel-editor/vue2] onMounted: renderArea DOM 没拿到 — vm.$refs.renderArea 仍为空, 这是 bug");
          return;
        }
        c = ot("canvas", "ov-grid-canvas"), p = ot("div", "ov ov-main"), b = ot("div", "ov ov-fcol"), m = ot("div", "ov ov-frow"), v = ot("div", "ov ov-corner");
        const g = ot("div", "ov ov-plugin");
        y = ot("div"), g.appendChild(y), d = ot("div", "ov-scroller"), d.tabIndex = 0, u = ot("div", "ov-spacer"), d.appendChild(u), h = ot("div", "ov-editor-slot"), f.appendChild(c), f.appendChild(p), f.appendChild(b), f.appendChild(m), f.appendChild(v), f.appendChild(g), f.appendChild(d), f.appendChild(h);
        const x = d;
        x.addEventListener("scroll", (B) => {
          var Q;
          const j = B.target;
          (Q = A.value) == null || Q.setScroll(j.scrollLeft, j.scrollTop);
        }), x.addEventListener("mousedown", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onMouseDown(B);
        }), x.addEventListener("mousemove", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onMouseMove(B);
        }), x.addEventListener("mouseup", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onMouseUp(B);
        }), x.addEventListener("mouseleave", () => {
          var B;
          return (B = A.value) == null ? void 0 : B.onMouseLeave();
        }), x.addEventListener("dblclick", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onDblClick(B);
        }), x.addEventListener("contextmenu", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onContextMenu(B);
        }), x.addEventListener("keydown", (B) => {
          var j;
          return (j = A.value) == null ? void 0 : j.onKeyDown(B);
        });
        const $ = new Qy(
          {
            canvas: c,
            renderArea: f,
            scroller: d,
            spacer: u,
            overlays: { main: p, frow: m, fcol: b, corner: v },
            editorSlot: h
          },
          {
            onRenderer: () => {
            },
            onRenderTick: () => {
              W.value++;
            },
            onSelectionChange: () => {
              var Q, _;
              H.value++;
              const B = (Q = A.value) == null ? void 0 : Q.getSelection(), j = (_ = A.value) == null ? void 0 : _.getActiveCell();
              B && j && qe("selection-change", { range: B, active: j });
            },
            onCellClick: (B, j, Q) => qe("cell-click", { row: B, col: j, text: Q }),
            onCellDblClick: (B, j, Q) => qe("cell-dblclick", { row: B, col: j, text: Q }),
            onHyperlink: (B, j) => {
              qe("hyperlink-click", { url: B, cell: j }), n.openLinks && window.open(B, "_blank", "noopener");
            },
            onTooltip: (B) => {
              ce.value = B;
            },
            onFindChange: () => {
              Y.value++;
            },
            onFilterChange: () => {
              ee.value++;
            },
            onActiveSheetChange: (B) => {
              O.value = B;
            },
            onZoomChange: (B) => {
              D.value = B;
            },
            // 触屏 pinch/双击 → 同步工具栏 %(watch 去重不再回 setZoom)
            onEditEvent: (B, j) => qe(B, j),
            onContextMenuBefore: (B) => {
              for (const j of Ve.value)
                if (j.contextMenu) {
                  const Q = j.contextMenu(B.ctx, B.items);
                  Array.isArray(Q) && B.items.splice(0, B.items.length, ...Q);
                }
              n.contextMenu === !1 && B.preventDefault(), qe("before-context-menu", B);
            },
            onContextMenuShow: (B) => qe("context-menu", B)
          }
        );
        $.fileName = n.fileName, $.setEditConfig(Ps.value), $.setEditorResolver(Os.value ? Ns : void 0), $.setLightboxEnabled(n.imageLightbox !== !1), $.setContextMenuTransform(typeof n.contextMenu == "function" ? n.contextMenu : null), A.value = $, zt = new qh(y), Hs(), zs(), so = new ResizeObserver(() => {
          var B, j;
          (B = A.value) == null || B.measure(), (j = A.value) == null || j.render();
        }), so.observe(f), typeof document != "undefined" && document.addEventListener("click", oe);
      });
    }), ke(() => [n.src, n.workbook, n.templateFile, ye.value], () => {
      A.value && zs();
    }, { deep: !1 }), ke(() => n.fileName, (f) => {
      const g = A.value;
      g && (g.fileName = f);
    }), ke(Ps, (f) => {
      var g;
      return (g = A.value) == null ? void 0 : g.setEditConfig(f);
    }), ke(() => n.contextMenu, (f) => {
      var g;
      return (g = A.value) == null ? void 0 : g.setContextMenuTransform(typeof f == "function" ? f : null);
    }), ke(() => [n.editor, n.plugins], () => {
      var f;
      return (f = A.value) == null ? void 0 : f.setEditorResolver(Os.value ? Ns : void 0);
    }, { deep: !0 }), ke(() => n.cellImageFit, (f) => {
      var g;
      f && ((g = A.value) == null || g.setCellImageFit(f));
    }), ke(() => n.imageLightbox, (f) => {
      var g;
      return (g = A.value) == null ? void 0 : g.setLightboxEnabled(f !== !1);
    }), ke(() => [Ls.value, n.cellStyle, n.plugins, n.readOnlyCellStyle], () => {
      A.value && _n();
    }, { deep: !0 }), ke(() => n.plugins, () => Hs(), { deep: !1 }), ke(k, async (f) => {
      var x;
      if (!f) return;
      (x = A.value) == null || x.clearFilterState(), O.value = f.activeSheet, await ho(), await new Promise(($) => requestAnimationFrame(() => $())), _n();
      const g = Gi();
      F.value = g != null && N != null ? Math.max(0, g - N) : null, qe("rendered", f);
    }), ke(O, async (f, g) => {
      var $, B;
      g != null && ((B = A.value) == null || B.resetFilter(($ = k.value) == null ? void 0 : $.sheets[g])), await ho(), _n();
      const x = k.value;
      x != null && x.sheets[f] && qe("sheet-change", { index: f, name: x.sheets[f].name });
    }), ke(D, (f) => {
      const g = A.value;
      g && Math.abs(g.getZoom() - f) < 1e-6 || g == null || g.setZoom(f);
    }), ke(S, (f) => {
      f && qe("error", f);
    }), ke(E, (f) => {
      f && qe("progress", f);
    }), ke(W, () => ud()), eu(() => {
      var f;
      so == null || so.disconnect(), (f = A.value) == null || f.dispose(), Vs.dispose(), zt == null || zt.dispose(), Wo.forEach((g) => g()), k.value && Ki(k.value), typeof document != "undefined" && document.removeEventListener("click", oe);
    });
    const Ye = me(() => {
      var f, g;
      return H.value, (g = (f = A.value) == null ? void 0 : f.getSelection()) != null ? g : null;
    }), Ds = me(() => {
      var g;
      H.value;
      const f = (g = A.value) == null ? void 0 : g.getActiveCell();
      return f ? Pe(f.col) + (f.row + 1) : "";
    }), jn = me(() => {
      const f = Ye.value;
      return !f || f.top === f.bottom && f.left === f.right ? "" : `${Pe(f.left)}${f.top + 1}:${Pe(f.right)}${f.bottom + 1}`;
    }), hd = me(() => {
      var f, g;
      return H.value, (g = (f = A.value) == null ? void 0 : f.getSelectionStats()) != null ? g : null;
    });
    function qo(f) {
      return isFinite(f) ? f.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—";
    }
    const lt = be(""), ro = be(!1), fd = me(() => {
      var f;
      return H.value, !!((f = A.value) != null && f.canEditActiveCell());
    }), Uo = me(() => {
      var f, g;
      return H.value, (g = (f = A.value) == null ? void 0 : f.getCellEditString()) != null ? g : "";
    }), Bs = me(() => {
      var x, $, B;
      H.value;
      const f = (x = A.value) == null ? void 0 : x.renderer, g = ($ = A.value) == null ? void 0 : $.getActiveCell();
      return !f || !g ? "" : (B = f.cellFormula(g.row, g.col)) != null ? B : f.cellText(g.row, g.col);
    });
    ke(Uo, (f) => {
      ro.value || (lt.value = f);
    }, { immediate: !0 }), ke(lt, () => ho(Vn));
    function Vn() {
      const f = l.value;
      f && (f.style.height = "auto", f.style.height = f.scrollHeight + "px");
    }
    function pd() {
      ro.value = !0, lt.value = Uo.value, ho(Vn);
    }
    function Ws(f) {
      var g;
      (g = A.value) == null || g.commitActiveCellValue(lt.value, f), ro.value = !1, lt.value = Uo.value, f === "down" && (d == null || d.focus());
    }
    function gd() {
      ro.value = !1, lt.value = Uo.value, d == null || d.focus();
    }
    function md() {
      ro.value && Ws();
    }
    function bd(f) {
      f.stopPropagation(), f.key === "Enter" && !f.shiftKey ? (f.preventDefault(), Ws("down")) : f.key === "Escape" && (f.preventDefault(), gd());
    }
    const yd = me(() => {
      var f;
      return Y.value, !!((f = A.value) != null && f.isFindDialogOpen());
    });
    function vd() {
      var f;
      (f = A.value) == null || f.openFindReplaceDialog("find");
    }
    function xd() {
      const f = A.value;
      f != null && f.isFindDialogOpen() ? f.closeFindReplaceDialog() : f == null || f.openFindReplaceDialog("find");
    }
    function wd() {
      var f;
      (f = A.value) == null || f.toggleAutoFilter();
    }
    function kd(f) {
      (f.ctrlKey || f.metaKey) && (f.key === "f" || f.key === "F") && (f.preventDefault(), vd());
    }
    function Sd() {
      se == null || se.abort();
    }
    function lo(f, g) {
      if (n.exportProgress === !1) return g(f);
      const x = new AbortController();
      se = x, f != null && f.signal && (f.signal.aborted ? x.abort() : f.signal.addEventListener("abort", () => x.abort(), { once: !0 })), ge.value = !0, le.value = null;
      const $ = (j) => {
        var Q;
        le.value = j, (Q = f == null ? void 0 : f.onProgress) == null || Q.call(f, j);
      }, B = K(R({}, f != null ? f : {}), { onProgress: $, signal: x.signal });
      return g(B).finally(() => {
        ge.value = !1, le.value = null, se = null;
      });
    }
    const Cd = (f) => lo(f, (g) => A.value.exportImage(g)), _o = (f) => lo(f, (g) => A.value.downloadImage(g)), Ed = (f) => lo(f, (g) => A.value.exportPdf(g)), ao = (f) => lo(f, (g) => A.value.downloadPdf(g)), jo = (f) => lo(f, (g) => A.value.print(g)), Td = (f) => A.value ? A.value.openPrintPreview(f) : Promise.resolve(!1);
    async function qs() {
      try {
        await ao();
      } catch (f) {
        Ht(f);
      }
    }
    async function Md(f) {
      var j;
      de.value = !1;
      const g = f.scope === "all" ? "all" : "active", x = f.scope === "selection" && (j = Ye.value) != null ? j : void 0, $ = {
        target: g,
        range: x,
        scale: f.scale,
        includeHeaders: f.includeHeaders,
        gridlines: f.gridlines
      }, B = K(R(R({}, f.format !== "auto" ? { format: f.format } : {}), f.orientation !== "auto" ? { orientation: f.orientation } : {}), {
        fitToWidth: f.fitToWidth
      });
      try {
        f.action === "png" ? await _o($) : f.action === "pdf" ? await ao(K(R(R({}, $), B), { vector: f.pdfVector })) : await jo(R(R({}, $), B));
      } catch (Q) {
        Ht(Q);
      }
    }
    function Ht(f) {
      var x;
      const g = (f == null ? void 0 : f.message) || String(f);
      console.error("[ooxml-excel-editor/vue2] 导出失败:", f), qe("error", g), typeof window != "undefined" && ((x = window.alert) == null || x.call(window, g));
    }
    function Us() {
      var f;
      (f = a.value) == null || f.click();
    }
    function Id(f) {
      var x;
      const g = (x = f.target.files) == null ? void 0 : x[0];
      g && (ye.value = g, $e.value = g.name, f.target.value = "");
    }
    function Yn() {
      ye.value = null, $e.value = null;
    }
    function co(f) {
      var x;
      const g = k.value;
      return g && (x = g.sheets[f != null ? f : O.value]) != null ? x : null;
    }
    function Gn(f) {
      var g, x;
      return K(R({}, f), { date1904: (x = (g = k.value) == null ? void 0 : g.date1904) != null ? x : !1 });
    }
    const Dt = {
      load: (f) => C(f, Ot),
      getWorkbook: () => k.value,
      getActiveSheet: () => O.value,
      setActiveSheet: (f) => {
        var g;
        (g = k.value) != null && g.sheets[f] && (O.value = f);
      },
      getSelection: () => Ye.value,
      getSelectionRanges: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getSelectionRanges()) != null ? g : [];
      },
      hasMultiSelection: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.hasMultiSelection()) != null ? g : !1;
      },
      setSelection: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setSelectionRange(f);
      },
      scrollToCell: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.scrollToCell(f, g, x)) != null ? B : !1;
      },
      rectOf: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.rectOf(f, g)) != null ? $ : null;
      },
      rectOfRange: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.rectOfRange(f)) != null ? x : null;
      },
      redraw: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.render();
      },
      isCellEditable: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.isCellEditable(f, g)) != null ? $ : !1;
      },
      setEditableTargets: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setEditableTargets(f);
      },
      getEditableTargets: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.getEditableTargets();
      },
      sortActiveColumn: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.sortActiveColumn(f)) != null ? x : !1;
      },
      createPivotTable: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.createPivotTable(f)) != null ? x : !1;
      },
      createPivotTableFromSelection: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.createPivotTableFromSelection(f)) != null ? x : !1;
      },
      openPivotTableDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openPivotTableDialog()) != null ? g : !1;
      },
      getConditionalRules: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getConditionalRules()) != null ? g : [];
      },
      addConditionalRule: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.addConditionalRule(f)) != null ? x : !1;
      },
      updateConditionalRule: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.updateConditionalRule(f, g)) != null ? $ : !1;
      },
      removeConditionalRule: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.removeConditionalRule(f)) != null ? x : !1;
      },
      setConditionalRules: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setConditionalRules(f)) != null ? x : !1;
      },
      openConditionalFormatDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openConditionalFormatDialog()) != null ? g : !1;
      },
      setSelectionNumberFormat: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionNumberFormat(f)) != null ? x : !1;
      },
      openNumberFormatDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openNumberFormatDialog()) != null ? g : !1;
      },
      // WPS 工具栏样式/编辑便利 (1.16.0)
      getSelectionFontState: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getSelectionFontState()) != null ? g : { bold: !1, italic: !1, underline: !1 };
      },
      getSelectionAlignState: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getSelectionAlignState()) != null ? g : {};
      },
      toggleSelectionFont: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.toggleSelectionFont(f)) != null ? x : !1;
      },
      setSelectionUnderline: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionUnderline(f)) != null ? x : !1;
      },
      setSelectionFontName: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionFontName(f)) != null ? x : !1;
      },
      setSelectionFontSize: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionFontSize(f)) != null ? x : !1;
      },
      adjustSelectionFontSize: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.adjustSelectionFontSize(f)) != null ? x : !1;
      },
      setSelectionHAlign: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionHAlign(f)) != null ? x : !1;
      },
      setSelectionVAlign: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionVAlign(f)) != null ? x : !1;
      },
      setSelectionBorders: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setSelectionBorders(f, g)) != null ? $ : !1;
      },
      mergeCenterSelection: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.mergeCenterSelection()) != null ? g : !1;
      },
      clearSelectionCells: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.clearSelectionCells(f)) != null ? x : !1;
      },
      freezePanes: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.freezePanes(f)) != null ? x : !1;
      },
      getFreezeState: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getFreezeState()) != null ? g : { frozenRows: 0, frozenCols: 0 };
      },
      sortByKeys: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.sortByKeys(f)) != null ? x : !1;
      },
      openSortDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openSortDialog()) != null ? g : !1;
      },
      setSelectionRowsHidden: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionRowsHidden(f)) != null ? x : !1;
      },
      setSelectionColsHidden: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionColsHidden(f)) != null ? x : !1;
      },
      autoFitSelection: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.autoFitSelection(f)) != null ? x : !1;
      },
      adjustSelectionIndent: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.adjustSelectionIndent(f)) != null ? x : !1;
      },
      adjustSelectionDecimals: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.adjustSelectionDecimals(f)) != null ? x : !1;
      },
      applySelectionStyle: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.applySelectionStyle(f)) != null ? x : !1;
      },
      applyTableStyle: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.applyTableStyle(f)) != null ? x : !1;
      },
      fillSelection: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.fillSelection(f, g)) != null ? $ : !1;
      },
      fillSeries: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.fillSeries(f)) != null ? x : !1;
      },
      openFillSeriesDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openFillSeriesDialog()) != null ? g : !1;
      },
      flashFill: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.flashFill()) != null ? g : !1;
      },
      convertSelection: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.convertSelection(f)) != null ? x : !1;
      },
      autoSumSelection: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.autoSumSelection(f)) != null ? x : !1;
      },
      openInsertFunctionDialog: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.openInsertFunctionDialog(f)) != null ? x : !1;
      },
      recalcAll: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.recalcAll()) != null ? g : !1;
      },
      recalcActiveSheet: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.recalcActiveSheet()) != null ? g : !1;
      },
      getCalcMode: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getCalcMode()) != null ? g : "auto";
      },
      setCalcMode: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setCalcMode(f);
      },
      reapplyFilters: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.reapplyFilters()) != null ? g : !1;
      },
      toggleAutoFilter: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.toggleAutoFilter();
      },
      hasFilters: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.hasFilters()) != null ? g : !1;
      },
      clearAllFilters: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.clearAllFilters();
      },
      openFilterConditionDialog: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.openFilterConditionDialog(f);
      },
      applyFilterCondition: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.applyFilterCondition(f, g)) != null ? $ : !1;
      },
      openFindReplaceDialog: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.openFindReplaceDialog(f);
      },
      closeFindReplaceDialog: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.closeFindReplaceDialog();
      },
      isFindDialogOpen: () => {
        var f;
        return !!((f = A.value) != null && f.isFindDialogOpen());
      },
      openDataValidationDialog: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.openDataValidationDialog(f)) != null ? x : !1;
      },
      openRemoveDuplicatesDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openRemoveDuplicatesDialog()) != null ? g : !1;
      },
      openTextToColumnsDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openTextToColumnsDialog()) != null ? g : !1;
      },
      hasAnyComment: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.hasAnyComment()) != null ? g : !1;
      },
      activeHasComment: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.activeHasComment()) != null ? g : !1;
      },
      deleteActiveComment: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.deleteActiveComment()) != null ? g : !1;
      },
      gotoComment: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.gotoComment(f)) != null ? x : !1;
      },
      toggleShowAllComments: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleShowAllComments()) != null ? g : !1;
      },
      isShowAllComments: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isShowAllComments()) != null ? g : !1;
      },
      isSelectionLocked: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isSelectionLocked()) != null ? g : !0;
      },
      toggleCellLock: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleCellLock()) != null ? g : !1;
      },
      isSheetProtected: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isSheetProtected()) != null ? g : !1;
      },
      openProtectSheetDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openProtectSheetDialog()) != null ? g : !1;
      },
      openAllowEditRangesDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openAllowEditRangesDialog()) != null ? g : !1;
      },
      isWorkbookProtected: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isWorkbookProtected()) != null ? g : !1;
      },
      openProtectWorkbookDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openProtectWorkbookDialog()) != null ? g : !1;
      },
      shareWorkbookNotice: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.shareWorkbookNotice();
      },
      isGridLinesVisible: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isGridLinesVisible()) != null ? g : !0;
      },
      toggleGridLines: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleGridLines()) != null ? g : !0;
      },
      areHeadersVisible: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.areHeadersVisible()) != null ? g : !0;
      },
      toggleHeaders: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleHeaders()) != null ? g : !0;
      },
      isFormulaBarVisible: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isFormulaBarVisible()) != null ? g : !0;
      },
      toggleFormulaBar: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleFormulaBar()) != null ? g : !0;
      },
      isTaskPaneOpen: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isTaskPaneOpen()) != null ? g : !1;
      },
      toggleTaskPane: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleTaskPane()) != null ? g : !1;
      },
      cutSelection: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.cutSelection()) != null ? g : Promise.resolve(!1);
      },
      clearSelectionFormat: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.clearSelectionFormat()) != null ? g : !1;
      },
      getPageSetup: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getPageSetup()) != null ? g : {};
      },
      setPageSetup: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setPageSetup(f)) != null ? x : !1;
      },
      setPageBreaks: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setPageBreaks(f, g)) != null ? $ : !1;
      },
      setPrintAreaFromSelection: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.setPrintAreaFromSelection()) != null ? g : !1;
      },
      togglePageBreakAt: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.togglePageBreakAt(f)) != null ? x : !1;
      },
      clearPageBreaks: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.clearPageBreaks()) != null ? g : !1;
      },
      openPageSetupDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openPageSetupDialog()) != null ? g : !1;
      },
      getBackground: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.getBackground();
      },
      getWatermark: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.getWatermark();
      },
      setBackground: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setBackground(f)) != null ? x : !1;
      },
      setWatermark: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setWatermark(f)) != null ? x : !1;
      },
      openBackgroundDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openBackgroundDialog()) != null ? g : !1;
      },
      startFormatPainter: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.startFormatPainter(f)) != null ? x : !1;
      },
      isFormatPainterArmed: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isFormatPainterArmed()) != null ? g : !1;
      },
      cancelFormatPainter: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.cancelFormatPainter();
      },
      getCellComment: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.getCellComment(f, g)) != null ? $ : "";
      },
      setCellComment: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.setCellComment(f, g, x)) != null ? B : !1;
      },
      openCommentEditor: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.openCommentEditor(f, g)) != null ? $ : !1;
      },
      editCell: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.editCell(f, g, x)) != null ? B : !1;
      },
      editRange: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.editRange(f, g)) != null ? $ : !1;
      },
      clearRange: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.clearRange(f)) != null ? x : !1;
      },
      setStyle: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setStyle(f, g)) != null ? $ : !1;
      },
      getActiveFillColor: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getActiveFillColor()) != null ? g : "#FFFFFF";
      },
      getActiveFontColor: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getActiveFontColor()) != null ? g : "#000000";
      },
      setSelectionFill: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionFill(f)) != null ? x : !1;
      },
      setSelectionFontColor: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.setSelectionFontColor(f)) != null ? x : !1;
      },
      getSelectionWrapState: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getSelectionWrapState()) != null ? g : "none";
      },
      toggleWrapTextOnSelection: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.toggleWrapTextOnSelection()) != null ? g : !1;
      },
      mergeCells: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.mergeCells(f)) != null ? x : !1;
      },
      unmergeCells: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.unmergeCells(f)) != null ? x : !1;
      },
      pasteText: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.pasteText(f, g)) != null ? $ : !1;
      },
      pasteRichHtml: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.pasteRichHtml(f, g, x)) != null ? B : !1;
      },
      getPasteBehavior: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getPasteBehavior()) != null ? g : rt;
      },
      setPasteBehavior: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setPasteBehavior(f);
      },
      openPasteConfigDialog: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.openPasteConfigDialog()) != null ? g : !1;
      },
      pasteImageBlob: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.pasteImageBlob(f, g)) != null ? $ : Promise.resolve(!1);
      },
      getImageInsertMode: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getImageInsertMode()) != null ? g : "float";
      },
      setImageInsertMode: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setImageInsertMode(f);
      },
      insertImageBlob: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.insertImageBlob(f, g, x)) != null ? B : Promise.resolve(!1);
      },
      openImagePicker: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.openImagePicker(f, g)) != null ? $ : !1;
      },
      getImages: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getImages()) != null ? g : [];
      },
      addImage: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.addImage(f)) != null ? x : -1;
      },
      removeImage: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.removeImage(f)) != null ? x : !1;
      },
      moveImage: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.moveImage(f, g, x)) != null ? B : !1;
      },
      resizeImage: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.resizeImage(f, g, x)) != null ? B : !1;
      },
      resetImageSize: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.resetImageSize(f)) != null ? x : Promise.resolve(!1);
      },
      setImageRotation: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setImageRotation(f, g)) != null ? $ : !1;
      },
      rotateImage: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.rotateImage(f, g)) != null ? $ : !1;
      },
      setImageCrop: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setImageCrop(f, g)) != null ? $ : !1;
      },
      enterImageCrop: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.enterImageCrop(f)) != null ? x : !1;
      },
      exitImageCrop: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.exitImageCrop();
      },
      getCellEditString: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getCellEditString()) != null ? g : "";
      },
      canEditActiveCell: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.canEditActiveCell()) != null ? g : !1;
      },
      commitActiveCellValue: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.commitActiveCellValue(f, g)) != null ? $ : !1;
      },
      getCellImages: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getCellImages()) != null ? g : [];
      },
      getCellImageAt: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.getCellImageAt(f, g)) != null ? $ : null;
      },
      openImageLightbox: (f, g, x) => {
        var $;
        return ($ = A.value) == null ? void 0 : $.openImageLightbox(f, g, x);
      },
      setCellImageFit: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.setCellImageFit(f);
      },
      convertImageToCell: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.convertImageToCell(f, g, x)) != null ? B : !1;
      },
      convertImageToCellAuto: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.convertImageToCellAuto(f)) != null ? x : !1;
      },
      convertAllImagesToCells: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.convertAllImagesToCells(f)) != null ? x : 0;
      },
      convertImagesInRangeToCell: (f) => {
        var g, x;
        return Promise.resolve((x = (g = A.value) == null ? void 0 : g.convertImagesInRangeToCell(f)) != null ? x : 0);
      },
      convertCellImagesInRangeToFloat: (f, g) => {
        var x, $;
        return Promise.resolve(($ = (x = A.value) == null ? void 0 : x.convertCellImagesInRangeToFloat(f, g)) != null ? $ : 0);
      },
      openContextMenu: (f, g, x) => {
        var $;
        return ($ = A.value) == null ? void 0 : $.openContextMenu(f, g, x);
      },
      closeContextMenu: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.closeContextMenu();
      },
      convertCellImageToFloat: (f, g, x) => {
        var $, B;
        return (B = ($ = A.value) == null ? void 0 : $.convertCellImageToFloat(f, g, x)) != null ? B : !1;
      },
      insertRows: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.insertRows(f, g)) != null ? $ : !1;
      },
      deleteRows: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.deleteRows(f, g)) != null ? $ : !1;
      },
      insertCols: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.insertCols(f, g)) != null ? $ : !1;
      },
      deleteCols: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.deleteCols(f, g)) != null ? $ : !1;
      },
      undo: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.undo();
      },
      redo: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.redo();
      },
      canUndo: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.canUndo()) != null ? g : !1;
      },
      canRedo: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.canRedo()) != null ? g : !1;
      },
      getEditingCell: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getEditingCell()) != null ? g : null;
      },
      getCellSnapshot: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.getCellSnapshot(f, g)) != null ? $ : null;
      },
      inspectCell: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.inspectCell(f, g)) != null ? $ : null;
      },
      beginEdit: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.beginEdit(f, g)) != null ? $ : !1;
      },
      cancelEdit: () => {
        var f;
        return (f = A.value) == null ? void 0 : f.cancelEdit();
      },
      isEditing: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isEditing()) != null ? g : !1;
      },
      setColumnWidth: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setColumnWidth(f, g)) != null ? $ : 0;
      },
      setRowHeight: (f, g) => {
        var x, $;
        return ($ = (x = A.value) == null ? void 0 : x.setRowHeight(f, g)) != null ? $ : 0;
      },
      autoFitColumns: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.autoFitColumns(f)) != null ? x : 0;
      },
      autoFitRows: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.autoFitRows(f)) != null ? x : 0;
      },
      resetColumnWidth: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.resetColumnWidth(f)) != null ? x : 0;
      },
      resetRowHeight: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.resetRowHeight(f)) != null ? x : 0;
      },
      isRecalcReady: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isRecalcReady()) != null ? g : !1;
      },
      getVirtualExtent: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.getVirtualExtent()) != null ? g : { rows: 0, cols: 0 };
      },
      isDirty: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.isDirty()) != null ? g : !1;
      },
      resetToOriginal: () => {
        var f, g;
        return (g = (f = A.value) == null ? void 0 : f.resetToOriginal()) != null ? g : !1;
      },
      exportImage: Cd,
      downloadImage: _o,
      exportPdf: Ed,
      downloadPdf: ao,
      print: jo,
      openPrintPreview: Td,
      exportXlsx: (f) => A.value.exportXlsx(f),
      downloadXlsx: (f) => A.value.downloadXlsx(f),
      exportJson: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.exportJson(f)) != null ? x : "{}";
      },
      downloadJson: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.downloadJson(f);
      },
      exportCsv: (f) => {
        var g, x;
        return (x = (g = A.value) == null ? void 0 : g.exportCsv(f)) != null ? x : "";
      },
      downloadCsv: (f) => {
        var g;
        return (g = A.value) == null ? void 0 : g.downloadCsv(f);
      },
      getCellValue: (f, g, x) => {
        const $ = co(x);
        return $ ? ct($, f, g) : null;
      },
      getCellText: (f, g, x) => {
        var B, j;
        const $ = co(x);
        return $ ? De($, f, g, (j = (B = k.value) == null ? void 0 : B.date1904) != null ? j : !1) : "";
      },
      getSheetData: (f, g) => {
        const x = co(g);
        return x ? rc(x, Gn(f)) : [];
      },
      getSheetJSON: (f, g) => {
        const x = co(g);
        return x ? lc(x, Gn(f)) : [];
      },
      getRangeData: (f, g, x) => {
        const $ = co(x);
        return $ ? bg($, f, Gn(g)) : [];
      },
      openTemplateFilePicker: Us,
      clearRuntimeTemplate: Yn
    };
    t == null || t(Dt), i && i._isVue && Object.assign(i, Dt);
    function Xn() {
      const f = k.value;
      return f ? f.sheets.map((g, x) => ({ s: g, i: x })).filter(({ s: g }) => g.state === "visible") : [];
    }
    function $d() {
      var $, B;
      const f = ($ = k.value) == null ? void 0 : $.sheets[O.value], g = A.value;
      if (!f || !g) return;
      const x = f.freeze;
      if (x.frozenRows || x.frozenCols) f.freeze = { frozenRows: 0, frozenCols: 0 };
      else {
        const j = g.getActiveCell();
        f.freeze = { frozenRows: j ? j.row : 1, frozenCols: j ? j.col : 0 };
      }
      (B = g.renderer) == null || B.rebuildMetrics(), g.refreshContentSize(), g.render();
    }
    function ie(f) {
      return R({ kind: "builtin" }, f);
    }
    const Me = (f) => Ma[f];
    function Ad(f) {
      var B, j, Q;
      const g = A.value, x = (B = k.value) == null ? void 0 : B.sheets[O.value], $ = Bh(f, { controller: g, editable: !!n.editable, hasSelection: !!Ye.value });
      if ($) return $;
      switch (f) {
        case "find":
          return ie({ id: f, iconSvg: Me("find"), label: "查找", title: "查找和替换 (Ctrl+F)", active: yd.value, onClick: () => xd() });
        case "filter":
          return ie({ id: f, iconSvg: Me("filter"), label: "筛选", title: "切换自动筛选", active: !!(x != null && x.autoFilterRange), onClick: wd });
        case "clear-filter":
          return ie({ id: f, iconSvg: Me("clear-filter"), label: "清除筛选", title: "清除当前表全部筛选", disabled: !(g != null && g.hasFilters()), onClick: () => g == null ? void 0 : g.clearAllFilters() });
        case "sort": {
          const _ = g == null ? void 0 : g.getSortState(), re = g == null ? void 0 : g.getActiveCell(), he = !re || !x;
          return ie({
            id: f,
            iconSvg: Me("sort"),
            label: "排序",
            title: re ? `按 ${Pe(re.col)} 列排序` : "选中一个单元格后按该列排序",
            active: !!(re && (_ == null ? void 0 : _.col) === re.col && _.dir),
            disabled: he,
            items: [
              ie({ id: "sort-asc", label: "升序 (A → Z / 小 → 大)", active: !!(re && (_ == null ? void 0 : _.col) === re.col && _.dir === "asc"), disabled: he, onClick: () => g == null ? void 0 : g.sortActiveColumn("asc") }),
              ie({ id: "sort-desc", label: "降序 (Z → A / 大 → 小)", active: !!(re && (_ == null ? void 0 : _.col) === re.col && _.dir === "desc"), disabled: he, onClick: () => g == null ? void 0 : g.sortActiveColumn("desc") }),
              ie({ id: "sort-custom-sep", type: "separator" }),
              ie({ id: "sort-custom", label: "自定义排序…", title: "多关键字排序", onClick: () => g == null ? void 0 : g.openSortDialog() })
            ]
          });
        }
        case "copy":
          return ie({ id: f, iconSvg: Me("copy"), label: "复制", title: "复制选区 (Ctrl+C)", disabled: !Ye.value, onClick: () => void (g == null ? void 0 : g.copySelection()) });
        case "pivot-table":
          return n.pivotTable ? ie({ id: f, iconSvg: Me("pivot-table"), label: "透视表", title: "选择字段并基于当前选区创建静态透视汇总表", disabled: !Ye.value || !n.editable, onClick: () => g == null ? void 0 : g.openPivotTableDialog() }) : null;
        case "conditional-format":
          return n.conditionalFormat ? ie({ id: f, iconSvg: Me("conditional-format"), label: "条件格式", title: "管理条件格式规则(新建/编辑/删除;新建套到当前选区)", disabled: !n.editable, onClick: () => g == null ? void 0 : g.openConditionalFormatDialog() }) : null;
        case "number-format":
          return ie({ id: f, iconSvg: Me("number-format"), label: "数字格式", title: "设置单元格数字格式(数值/货币/百分比/日期/自定义)", disabled: !Ye.value || !n.editable, onClick: () => g == null ? void 0 : g.openNumberFormatDialog() });
        case "format-painter":
          return ie({ id: f, iconSvg: Me("format-painter"), label: "格式刷", title: "格式刷:先选源格点此采样,再点/拖目标刷上格式(Esc 取消)", active: !!(g != null && g.isFormatPainterArmed()), disabled: !Ye.value || !n.editable, onClick: () => g != null && g.isFormatPainterArmed() ? g == null ? void 0 : g.cancelFormatPainter() : g == null ? void 0 : g.startFormatPainter() });
        case "wrap-text": {
          const _ = (j = g == null ? void 0 : g.getSelectionWrapState()) != null ? j : "none";
          return ie({ id: f, iconSvg: Me("wrap-text"), label: "自动换行", title: "自动换行(选区,WPS 风格 toggle)", active: _ === "all", disabled: !Ye.value || !n.editable, onClick: () => void (g == null ? void 0 : g.toggleWrapTextOnSelection()) });
        }
        case "template": {
          const _ = !!et.value, re = Ae.value, he = !!n.src && !n.workbook;
          return ie({
            id: f,
            iconSvg: Me("template"),
            label: "模板",
            title: he ? "模板仅对 JSON / 模型数据源生效;当前是 .xlsx 数据源,模板不可用" : _ ? `模板已加载:${re || "(未命名)"}` : "为 JSON / 模型数据源套用 .xlsx 模板的样式;模板的文字内容会被丢弃",
            active: _,
            disabled: he,
            items: [
              ie({ id: "tpl-default", label: (_ ? "" : "✓ ") + "默认渲染", title: "不套模板,数据按默认样式渲染", disabled: !_, onClick: Yn }),
              ie({ id: "tpl-sep", type: "separator" }),
              ie({ id: "tpl-import", label: "导入 .xlsx 模板…", title: "选一份 .xlsx, 把它的 styling 套到当前 JSON 数据上", onClick: Us }),
              ie({ id: "tpl-clear", label: "清除模板", title: "切回默认样式渲染", disabled: !_, onClick: Yn })
            ]
          });
        }
        case "image-tools": {
          const _ = Ye.value, re = g == null ? void 0 : g.getActiveCell(), he = ((Q = x == null ? void 0 : x.images.length) != null ? Q : 0) > 0;
          return ie({
            id: f,
            iconSvg: Me("image-tools"),
            label: "图片工具",
            title: "浮动图 ⇄ 单元格内嵌图(WPS DISPIMG)互转",
            disabled: !n.editable,
            items: [
              ie({ id: "img-sel-to-cell", label: "选区:浮动 → 嵌入", title: '把选区里"中心格在选区内"的浮动图就近嵌入', disabled: !_ || !he, onClick: () => _ && (g == null ? void 0 : g.convertImagesInRangeToCell(_)) }),
              ie({ id: "img-sel-to-float", label: "选区:嵌入 → 浮动", title: "把选区内所有 DISPIMG 格拎成浮动图", disabled: !_, onClick: () => _ && (g == null ? void 0 : g.convertCellImagesInRangeToFloat(_)) }),
              ie({ id: "img-sep", type: "separator" }),
              ie({ id: "img-all-to-cell", label: "整表:浮动 → 嵌入", title: "全表浮动图按几何就近嵌入各自单元格", disabled: !he, onClick: () => g == null ? void 0 : g.convertAllImagesToCells() }),
              ie({ id: "img-col-to-cell", label: "整列:浮动 → 嵌入(活动列)", title: "把中心落在活动列的浮动图就近嵌入", disabled: !he || !re, onClick: () => re && (g == null ? void 0 : g.convertAllImagesToCells(re.col)) })
            ]
          });
        }
        case "freeze": {
          const _ = x == null ? void 0 : x.freeze;
          return ie({ id: f, iconSvg: Me("freeze"), label: "冻结", title: "冻结/取消冻结(在活动单元格)", active: !!(_ && (_.frozenRows || _.frozenCols)), onClick: $d });
        }
        case "export":
          return ie({
            id: f,
            iconSvg: Me("export"),
            label: "导出",
            title: "导出 / 打印",
            items: [
              ie({ id: "export-xlsx", label: "导出为 Excel (.xlsx)", onClick: () => {
                var _;
                return void ((_ = A.value) == null ? void 0 : _.downloadXlsx().catch(Ht));
              } }),
              ie({ id: "export-csv", label: "导出为 CSV (.csv)", onClick: () => {
                var _;
                return (_ = A.value) == null ? void 0 : _.downloadCsv();
              } }),
              ie({ id: "export-json", label: "导出为 JSON (.json)", onClick: () => {
                var _;
                return (_ = A.value) == null ? void 0 : _.downloadJson();
              } }),
              ie({ id: "export-sep0", type: "separator" }),
              ie({ id: "export-png", label: "导出为图片 (PNG)", onClick: () => void _o() }),
              ie({ id: "export-pdf", label: "导出为 PDF (位图)", onClick: qs }),
              ie({ id: "export-pdf-vector", label: "导出为 PDF (矢量·文字可选)", onClick: () => void ao({ vector: !0 }).catch(Ht) }),
              ie({ id: "export-print", label: "打印…", onClick: () => void jo() }),
              ie({ id: "export-sep", type: "separator" }),
              ie({ id: "export-settings", label: "导出设置…", onClick: () => {
                de.value = !0, ne.scope = jn.value ? "selection" : "sheet";
              } })
            ]
          });
        case "zoom":
          return ie({
            id: f,
            iconSvg: Me("zoom"),
            label: Math.round(D.value * 100) + "%",
            title: "缩放",
            items: [50, 75, 100, 125, 150, 200].map((_) => ie({ id: "zoom-" + _, label: _ + "%", active: Math.round(D.value * 100) === _, onClick: () => {
              D.value = _ / 100;
            } }))
          });
      }
      return null;
    }
    function Vo(f, g) {
      var $;
      const x = { kind: g, id: f.id, type: f.type, icon: f.icon, label: f.label, title: f.title };
      return f.active && (x.active = !!f.active(Dt)), f.disabled && (x.disabled = !!f.disabled(Dt)), f.onClick && (x.onClick = () => {
        var B;
        return (B = f.onClick) == null ? void 0 : B.call(f, Dt);
      }), ($ = f.items) != null && $.length && (x.items = f.items.map((B) => Vo(B, g))), x;
    }
    function _s(f, g) {
      var $, B, j;
      const x = [];
      for (const Q of f)
        if (nu(Q)) x.push({ id: "br-" + x.length, type: "rowbreak", kind: "builtin" });
        else if (vn(Q)) x.push({ id: "sep-" + x.length, type: "separator", kind: "builtin" });
        else if (g[Q]) x.push(Vo(g[Q], "custom"));
        else {
          const _ = Ad(Q);
          _ && (_.size = (j = (B = _.size) != null ? B : ($ = $a[Q]) == null ? void 0 : $.size) != null ? j : "small", x.push(_));
        }
      return x;
    }
    const js = me(() => iu(n.ribbon, n.toolbar)), $t = me(() => n.ribbonPersistKey === null ? null : n.ribbonPersistKey || lu), Kn = be($t.value ? au($t.value) : null), mt = me(() => nr({
      ribbon: n.ribbon,
      toolbar: n.toolbar,
      userState: js.value && $t.value ? Kn.value : null
    })), tt = be(""), Vs = new pu();
    function Fd() {
      var g, x, $, B, j, Q;
      const f = mt.value;
      Vs.show({
        sections: (g = f.sections) != null ? g : [],
        activeSectionId: tt.value,
        catalog: Ia,
        zoom: D.value,
        editable: (x = Do.value) != null ? x : !!n.editable,
        cellImageFit: (B = ($ = Un.value) != null ? $ : n.cellImageFit) != null ? B : "fill",
        pasteBehavior: (Q = (j = A.value) == null ? void 0 : j.getPasteBehavior()) != null ? Q : rt,
        onRibbonChange: (_, re) => {
          const he = { v: 1, sections: _, activeSectionId: re };
          Kn.value = he, $t.value && cu($t.value, he), tt.value = re;
        },
        onRuntimeChange: (_) => {
          var re, he;
          _.zoom != null && (D.value = _.zoom), _.editable != null && (Do.value = _.editable, e("update:editable", _.editable)), _.cellImageFit != null && (Un.value = _.cellImageFit, (re = A.value) == null || re.setCellImageFit(_.cellImageFit), e("update:cellImageFit", _.cellImageFit)), _.pasteBehavior != null && ((he = A.value) == null || he.setPasteBehavior(_.pasteBehavior));
        },
        onReset: () => {
          $t.value && du($t.value), Kn.value = null, tt.value = nr({ ribbon: n.ribbon, toolbar: n.toolbar, userState: null }).activeSectionId;
        }
      });
    }
    ke(mt, (f) => {
      f.sections && (f.sections.some((g) => g.id === tt.value) || (tt.value = f.activeSectionId));
    }, { immediate: !0 });
    const Ys = me(() => {
      var B, j;
      H.value, Y.value, ee.value;
      const f = mt.value;
      if (!f.sections) return [];
      const g = (B = f.sections.find((Q) => Q.id === tt.value)) != null ? B : f.sections[0], x = er(g).flatMap((Q) => Q.tools), $ = _s(x, f.customItems);
      for (const Q of Ve.value)
        for (const _ of (j = Q.toolbar) != null ? j : []) $.push(Vo(_, "plugin"));
      return $;
    }), Rd = me(() => {
      var B, j;
      H.value, Y.value, ee.value;
      const f = mt.value;
      if (!f.sections) return [];
      const g = (B = f.sections.find((Q) => Q.id === tt.value)) != null ? B : f.sections[0], x = er(g).map((Q) => ({ id: Q.id, name: Q.name, items: _s(Q.tools, f.customItems) })), $ = [];
      for (const Q of Ve.value) for (const _ of (j = Q.toolbar) != null ? j : []) $.push(Vo(_, "plugin"));
      return $.length && (x.length ? x[x.length - 1].items.push(...$) : x.push({ id: "plugins", name: "", items: $ })), x;
    }), Ld = Ys, Jn = me(() => !!mt.value.sections && Ys.value.length > 0);
    function Zn(f, g, x = "ov-tb-menu") {
      return U(
        "div",
        { class: x, attrs: { "data-tb-menu": "true" } },
        f.map(
          ($) => $.type === "separator" ? U("div", { key: $.id, class: "sep" }) : $.input ? U("input", {
            key: $.id,
            class: "mi-input",
            attrs: { placeholder: $.input.placeholder },
            domProps: { value: $.input.value || "" },
            on: {
              click: (B) => B.stopPropagation(),
              keydown: (B) => {
                B.key === "Enter" && ($.input.onCommit(B.target.value), g($));
              }
            }
          }) : U("button", {
            key: $.id,
            class: { mi: !0, active: !!$.active },
            attrs: { disabled: !!$.disabled, title: $.title },
            on: {
              click: (B) => {
                B.stopPropagation(), $.disabled || g($);
              },
              mouseenter: () => {
                var B;
                $.disabled || (B = $.onHover) == null || B.call($);
              },
              mouseleave: () => {
                var B;
                return (B = $.onHoverEnd) == null ? void 0 : B.call($);
              }
            }
          }, [
            $.swatch ? U("span", { class: "sw", style: { background: $.swatch } }) : $.iconSvg ? U("span", { class: "ic", domProps: { innerHTML: Wt($.iconSvg) } }) : $.icon ? U("span", { class: "ic-e" }, $.icon) : null,
            $.label ? U("span", { class: "lb" }, $.label) : null
          ])
        )
      );
    }
    function Pd() {
      if (!k.value) return null;
      const f = It.value, g = Ae.value, x = [0.5, 0.75, 1, 1.25, 1.5, 2], $ = q.value === "__header-export", B = [
        ie({ id: "h-xlsx", label: "导出为 Excel (.xlsx)", onClick: () => {
          var _;
          return void ((_ = A.value) == null ? void 0 : _.downloadXlsx().catch(Ht));
        } }),
        ie({ id: "h-csv", label: "导出为 CSV (.csv)", onClick: () => {
          var _;
          return (_ = A.value) == null ? void 0 : _.downloadCsv();
        } }),
        ie({ id: "h-json", label: "导出为 JSON (.json)", onClick: () => {
          var _;
          return (_ = A.value) == null ? void 0 : _.downloadJson();
        } }),
        ie({ id: "h-sep0", type: "separator" }),
        ie({ id: "h-png", label: "导出为图片 (PNG)", onClick: () => void _o() }),
        ie({ id: "h-pdf", label: "导出为 PDF (位图)", onClick: qs }),
        ie({ id: "h-pdf-vec", label: "导出为 PDF (矢量·文字可选)", onClick: () => void ao({ vector: !0 }).catch(Ht) }),
        ie({ id: "h-print", label: "打印…", onClick: () => void jo() }),
        ie({ id: "h-sep", type: "separator" }),
        ie({ id: "h-settings", label: "导出设置…", onClick: () => {
          de.value = !0, ne.scope = jn.value ? "selection" : "sheet";
        } })
      ], j = (_) => {
        D.value = Math.min(3, Math.max(0.3, _));
      }, Q = V.value;
      return U("div", { key: "header", class: "ov-toolbar" }, [
        U("span", { class: "file", attrs: { title: (Q ? "* 已修改(未保存) · " : "") + f + (g ? " · 模板: " + g : "") } }, [
          Q ? U("span", { key: "mod", class: "modified", attrs: { title: "已修改(未保存)" } }, "*") : null,
          f || "未命名工作簿",
          g ? U("span", { class: "tpl" }, " · 模板: " + g) : null
        ]),
        U("span", { class: "meta" }, [
          Xn().length + " 个工作表",
          I.value != null ? " · 源文件 " + Yi(I.value) : null,
          L.value != null ? U("span", { key: "data", attrs: { title: "模型数据体积估算(确定性;非真实 JS 堆,实际堆约 1.5~3x)" } }, " · 数据约 " + Yi(L.value)) : null,
          F.value != null ? U("span", { key: "heap", attrs: { title: "JS 堆增量(performance.memory;仅 Chromium、整页口径、被安全分桶粗化)" } }, [" · 堆约 " + Yi(F.value), U("span", { key: "r", class: "rough" }, "粗略")]) : null
        ]),
        U("div", { class: "spacer" }),
        // 导出下拉
        U("div", { class: "ov-export-wrap", attrs: { "data-tb-menu": "true" } }, [
          U("button", {
            class: { "ov-export-btn": !0, open: $ },
            attrs: { title: "导出 / 打印" },
            on: { click: (_) => {
              _.stopPropagation(), te("__header-export");
            } }
          }, ["导出 ", U("span", { class: "caret" }, "▾")]),
          $ ? Zn(B, (_) => {
            var re;
            Z(null), (re = _.onClick) == null || re.call(_);
          }, "ov-tb-menu header-menu") : null
        ]),
        // 缩放组 [-/select/+]
        U("div", { class: "ov-zoom" }, [
          U("button", { attrs: { title: "缩小" }, on: { click: () => j(D.value - 0.1) } }, "−"),
          U("select", {
            domProps: { value: String(D.value) },
            on: { change: (_) => j(parseFloat(_.target.value)) }
          }, [
            ...x.map((_) => U("option", { key: _, domProps: { value: String(_) } }, Math.round(_ * 100) + "%")),
            x.includes(D.value) ? null : U("option", { key: "cur", domProps: { value: String(D.value) } }, Math.round(D.value * 100) + "%")
          ]),
          U("button", { attrs: { title: "放大" }, on: { click: () => j(D.value + 0.1) } }, "+")
        ])
      ]);
    }
    function Nd() {
      if (!k.value || !Jn.value) return null;
      const f = mt.value;
      if (f.singleSection || !f.sections) return null;
      const g = f.sections.map((x) => U("button", {
        key: x.id,
        class: { "ov-ribbon-tab": !0, active: x.id === tt.value },
        attrs: { role: "tab", "aria-selected": String(x.id === tt.value) },
        on: { click: () => {
          tt.value = x.id;
        } }
      }, x.name));
      return g.push(U("span", { key: "__spacer", class: "ov-ribbon-spacer" })), js.value && g.push(U("button", {
        key: "__gear",
        class: "ov-ribbon-gear",
        attrs: { title: "设置(工具板块 / 常规 / 视图)" },
        on: { click: Fd }
      }, [U("span", { key: "ic", class: "ic", domProps: { innerHTML: Wt(Me("settings")) } }), U("span", { key: "lbl", class: "lbl" }, "设置")])), U("div", { key: "ribbon-tabs", class: "ov-ribbon-tabs", attrs: { role: "tablist" } }, g);
    }
    function Gs(f, g) {
      var Q;
      if (f.type === "separator") return U("span", { key: f.id, class: "ov-rb-vsep" });
      const x = !!((Q = f.items) != null && Q.length), $ = q.value === f.id, B = (_) => {
        var re;
        _.stopPropagation(), !f.disabled && (x ? te(f.id) : ((re = f.onClick) == null || re.call(f), Z(null)));
      }, j = [];
      return f.iconSvg ? j.push(U("span", { class: g ? "ov-rb-ic-lg" : "ov-rb-ic-sm", domProps: { innerHTML: Wt(f.iconSvg) } })) : f.icon && j.push(U("span", { class: "ov-at-ic-e" }, f.icon)), g ? j.push(U("span", { class: "ov-rb-lb" }, [f.label, x ? U("span", { class: "ov-rb-caret-inline" }, "▾") : null])) : (x || f.showLabel) && f.label && j.push(U("span", { class: "ov-rb-lb-sm" }, f.label)), !g && x && j.push(U("span", { class: "ov-rb-caret", domProps: { innerHTML: Wt(Me("caret")) } })), U("div", { key: f.id, class: "ov-at-dd", attrs: { "data-tb-menu": "true" } }, [
        U("button", {
          class: { "ov-rb-btn": !0, "ov-rb-large": g, "ov-rb-small": !g, active: !!f.active, open: $, combo: !g && x && !!f.label },
          attrs: { disabled: !!f.disabled, title: f.title || f.label || f.id },
          on: { click: B }
        }, j),
        x && $ ? Zn(f.items, (_) => {
          var re;
          _.keepOpen || Z(null), (re = _.onClick) == null || re.call(_);
        }) : null
      ]);
    }
    function Od() {
      if (!k.value || !Jn.value) return null;
      const f = mt.value;
      if (f.singleSection || !f.sections) return null;
      const g = [];
      return Rd.value.forEach((x, $) => {
        $ > 0 && g.push(U("div", { key: "sep-" + x.id, class: "ov-rb-sep" }));
        const B = [];
        ou(x.items).forEach((j, Q) => {
          j.kind === "large" ? B.push(Gs(j.item, !0)) : B.push(U(
            "div",
            { key: "sm-" + Q, class: "ov-rb-smalls" },
            j.rows.map((_, re) => U("div", { key: re, class: "ov-rb-row" }, _.map((he) => Gs(he, !1))))
          ));
        }), g.push(U("div", { key: "g-" + x.id, class: "ov-rb-group" }, [
          U("div", { key: "body", class: "ov-rb-body" }, B),
          x.name ? U("div", { key: "name", class: "ov-rb-gname" }, x.name) : null
        ]));
      }), U("div", { key: "ribbon-panel", class: "ov-rb-panel" }, g);
    }
    function zd() {
      if (!k.value || !Jn.value || !mt.value.singleSection) return null;
      const f = Ld.value, g = (x) => {
        var Q;
        if (x.type === "separator") return U("span", { key: x.id, class: "ov-at-divider" });
        const $ = !!((Q = x.items) != null && Q.length), B = q.value === x.id, j = (_) => {
          var re;
          _.stopPropagation(), !x.disabled && ($ ? te(x.id) : ((re = x.onClick) == null || re.call(x), Z(null)));
        };
        return U("div", { key: x.id, class: "ov-at-dd", attrs: { "data-tb-menu": "true" } }, [
          U("button", {
            class: { "ov-at-tool": !0, active: !!x.active, open: B },
            attrs: { disabled: !!x.disabled, title: x.title || x.label || x.id },
            on: { click: j }
          }, [
            x.iconSvg ? U("span", { class: "ov-at-ic", domProps: { innerHTML: Wt(x.iconSvg) } }) : x.icon ? U("span", { class: "ov-at-ic-e" }, x.icon) : null,
            x.label ? U("span", { class: "ov-at-lb" }, x.label) : null,
            $ ? U("span", { class: "ov-at-caret", domProps: { innerHTML: Wt(Me("caret")) } }) : null
          ]),
          $ && B ? Zn(x.items, (_) => {
            var re;
            _.keepOpen || Z(null), (re = _.onClick) == null || re.call(_);
          }) : null
        ]);
      };
      return U("div", { key: "action", class: "ov-action-toolbar" }, f.map(g));
    }
    function Hd() {
      var g;
      if (!k.value || (H.value, ((g = A.value) == null ? void 0 : g.isFormulaBarVisible()) === !1)) return null;
      const f = fd.value;
      return U("div", { key: "fbar", class: "ov-formula-bar" }, [
        U("span", { class: "addr" }, Ds.value || "—"),
        U("span", { class: "fx" }, "fx"),
        f ? U("textarea", {
          ref: l.refName,
          class: "content content-input",
          attrs: { rows: 1, spellcheck: "false", title: lt.value },
          domProps: { value: lt.value },
          on: {
            focus: pd,
            blur: md,
            keydown: bd,
            input: (x) => {
              lt.value = x.target.value, Vn();
            }
          }
        }) : U("span", { class: "content", attrs: { title: Bs.value } }, Bs.value)
      ]);
    }
    function Dd() {
      const f = Xn();
      return !k.value || f.length < 2 ? null : U("div", { key: "tabs", class: "ov-sheet-tabs" }, f.map(({ s: g, i: x }) => U("button", {
        key: x,
        class: { tab: !0, active: x === O.value },
        on: { click: () => {
          O.value = x;
        } }
      }, g.name)));
    }
    function Bd() {
      return null;
    }
    function Wd() {
      if (!k.value) return null;
      const f = jn.value || Ds.value, g = hd.value, x = [];
      return x.push(U("span", { class: "sel" }, f)), x.push(U("div", { class: "grow" })), g && g.numCount > 0 ? (x.push(U("span", "计数 " + g.count)), x.push(U("span", "求和 " + qo(g.sum))), x.push(U("span", "平均 " + qo(g.avg))), x.push(U("span", "最大 " + qo(g.max))), x.push(U("span", "最小 " + qo(g.min)))) : g && g.count > 0 && x.push(U("span", "计数 " + g.count)), U("div", { key: "statusbar", class: "ov-status-bar" }, x);
    }
    function qd() {
      const f = ce.value;
      return f ? U("div", {
        key: "tooltip",
        class: "ov-cell-tooltip " + (f.kind || ""),
        style: { left: f.x + "px", top: f.y + "px" }
      }, f.text) : null;
    }
    function Ud() {
      var j;
      if (n.exportProgress === !1 || !ge.value) return null;
      const f = le.value, g = {
        render: "渲染中",
        compose: "合成中",
        paginate: "分页中",
        write: "写出文件",
        zip: "zip 压缩",
        convert: "批量转换"
      }, x = f == null ? void 0 : f.ratio, $ = x != null ? Math.round(x * 100) : null, B = (f == null ? void 0 : f.label) || g[(j = f == null ? void 0 : f.stage) != null ? j : ""] || "处理中…";
      return U("div", { key: "exp-overlay", class: "ov-export-progress", attrs: { role: "dialog", "aria-modal": "true" } }, [
        U("div", { class: "card" }, [
          U("div", { class: "title" }, B),
          U("div", { class: $ != null ? "bar" : "bar indeterminate" }, [
            $ != null ? U("div", { class: "fill", style: { width: $ + "%" } }) : null
          ]),
          U("div", { class: "row" }, [
            U("span", { class: "pct" }, $ != null ? $ + "%" : "正在处理…"),
            U("button", { class: "cancel", attrs: { title: "按 Esc 也可取消" }, on: { click: Sd } }, "取消")
          ])
        ])
      ]);
    }
    function _d() {
      if (!de.value || !k.value) return null;
      const f = Xn().length, g = Ye.value, x = !!g && !(g.top === g.bottom && g.left === g.right), $ = g ? `${Pe(g.left)}${g.top + 1}:${Pe(g.right)}${g.bottom + 1}` : "", B = () => {
        de.value = !1;
      }, j = (he) => {
        Md(K(R({}, ne), { action: he }));
      }, Q = (he, Bt, At, uo, Ft, Ks) => U("label", {
        class: { disabled: !!Ks }
      }, [
        U("input", {
          attrs: { type: "radio", name: he, value: String(At), disabled: Ks ? "disabled" : void 0 },
          domProps: { checked: ne[Bt] === At },
          on: { change: () => {
            ne[Bt] = At;
          } }
        }),
        " " + uo,
        Ft ? U("span", { class: "hint" }, " " + Ft) : null
      ]), _ = (he, Bt) => U("label", [
        U("input", {
          attrs: { type: "checkbox" },
          domProps: { checked: ne[he] },
          on: { change: (At) => {
            ne[he] = At.target.checked;
          } }
        }),
        " " + Bt
      ]), re = (he, Bt, At = !1) => U("select", {
        domProps: { value: String(ne[he]) },
        on: { change: (uo) => {
          const Ft = uo.target.value;
          ne[he] = At ? Number(Ft) : Ft;
        } }
      }, Bt.map(([uo, Ft]) => U("option", { domProps: { value: String(uo) } }, Ft)));
      return U("div", {
        key: "export-dlg",
        class: "ov-dlg-mask",
        on: { click: (he) => {
          he.target === he.currentTarget && B();
        } }
      }, [
        U("div", { class: "ov-dlg", attrs: { role: "dialog", "aria-label": "导出设置" } }, [
          U("div", { class: "ov-dlg-head" }, [
            U("span", "导出 / 打印设置"),
            U("button", { class: "x", attrs: { title: "关闭" }, on: { click: B } }, "×")
          ]),
          U("div", { class: "ov-dlg-body" }, [
            U("div", { class: "field" }, [
              U("label", { class: "lbl" }, "范围"),
              U("div", { class: "opts" }, [
                Q("scope", "scope", "selection", "当前选区", x ? $ : "(未选多格)", !x),
                Q("scope", "scope", "sheet", "当前工作表"),
                Q("scope", "scope", "all", `全部工作表 (${f})`)
              ])
            ]),
            U("div", { class: "field" }, [
              U("label", { class: "lbl" }, "清晰度"),
              re("scale", [[1, "标准 (1×)"], [2, "高清 (2×)"], [3, "超清 (3×)"]], !0)
            ]),
            U("div", { class: "field" }, [
              U("label", { class: "lbl" }, "内容"),
              U("div", { class: "opts inline" }, [_("includeHeaders", "含行列号"), _("gridlines", "网格线")])
            ]),
            U("div", { class: "field" }, [
              U("label", { class: "lbl" }, "PDF 类型"),
              U("div", { class: "opts" }, [
                Q("pdfVector", "pdfVector", !1, "位图", "(完整还原观感)"),
                Q("pdfVector", "pdfVector", !0, "矢量", "(文字可选可搜·清晰·文件小;中文需注册字体)")
              ])
            ]),
            U("div", { class: "field" }, [
              U("label", { class: "lbl" }, [U("span", "纸张"), U("span", { class: "hint" }, " (PDF/打印)")]),
              U("div", { class: "opts inline" }, [
                re("format", [["auto", "自动(跟随表)"], ["a4", "A4"], ["a3", "A3"], ["letter", "Letter"]]),
                re("orientation", [["auto", "方向: 自动"], ["portrait", "纵向"], ["landscape", "横向"]]),
                _("fitToWidth", "适应页宽")
              ])
            ])
          ]),
          U("div", { class: "ov-dlg-foot" }, [
            U("button", { class: "ghost", on: { click: B } }, "取消"),
            U("div", { class: "grow" }),
            U("button", { on: { click: () => j("png") } }, "导出 PNG"),
            U("button", { on: { click: () => j("pdf") } }, "导出 PDF"),
            U("button", { class: "primary", on: { click: () => j("print") } }, "打印…")
          ])
        ])
      ]);
    }
    function jd() {
      if (w.value) {
        const f = ad.value;
        return U("div", { key: "state-loading", class: "ov-state" }, [
          U("div", { class: "ov-loader" }, [
            U("div", { class: "ov-loader-label" }, [
              ld.value,
              f != null ? U("span", " " + f + "%") : null
            ]),
            U("div", { class: "ov-loader-track" }, [
              U("div", { class: f != null ? "ov-loader-fill" : "ov-loader-fill indeterminate", style: f != null ? { width: f + "%" } : {} })
            ])
          ])
        ]);
      }
      return S.value ? U("div", { key: "state-error", class: "ov-state ov-state-error" }, "解析失败: " + S.value) : k.value ? null : U("div", { key: "state-empty", class: "ov-state ov-state-hint" }, "拖入或选择一个 .xlsx 文件");
    }
    return () => U("div", {
      class: "ooxml-excel-viewer",
      on: { keydown: kd }
    }, [
      Pd(),
      Nd(),
      Od(),
      zd(),
      Hd(),
      // render-area 外壳 — controller 在 onMounted 时手动 createElement + appendChild 进来,
      // Vue patch 不会动 controller 加的 children. 这里 children 是 Vue 管理的 [user-overlay-slot]:
      // user 通过 v-slot:overlay="{ rectOf, rectOfRange, tick }" 注入自定义 overlay 元素,
      // 跟 Vue 3 SFC 的 #overlay 同语义. user-slot 会被 Vue 渲染在 render-area 第一个 child,
      // controller append 的 canvas/overlays 在后面 (z-index 控制层级).
      // 必须给 key, 否则 Vue 2 patch 没 key 时按 tag 匹配, 会把这个 div 复用成其他 chrome div.
      U("div", { key: "render-area", ref: r.refName, class: "ov-render-area" }, [
        o.overlay ? U("div", { key: "user-overlay", class: "ov-user-slot" }, o.overlay({
          rectOf: (f, g) => {
            var x, $;
            return ($ = (x = A.value) == null ? void 0 : x.rectOf(f, g)) != null ? $ : null;
          },
          rectOfRange: (f) => {
            var g, x;
            return (x = (g = A.value) == null ? void 0 : g.rectOfRange(f)) != null ? x : null;
          },
          tick: W.value
        })) : null
      ]),
      Wd(),
      Dd(),
      // findbar / state / tooltip / 导出进度 浮层 — 用 absolute 浮在 viewer 主体上方
      Bd(),
      jd(),
      qd(),
      _d(),
      Ud(),
      U("input", {
        key: "tpl-input",
        ref: a.refName,
        attrs: { type: "file", accept: ".xlsx,.xlsm", hidden: !0 },
        on: { change: Id }
      })
    ]);
  }
});
async function Tv(n, e) {
  const t = await bs(n);
  return ic(t, e);
}
class mv {
  // modelIndex → hf sheetId(按名解析,避免数字名重排坑)
  constructor(e, t) {
    T(this, "hf", null);
    T(this, "sheetIds", []);
    this.HF = e, this.DCE = t;
  }
  setSheets(e) {
    const t = {}, o = [];
    for (let i = 0; i < e.sheets.length; i++) {
      const s = e.sheets[i];
      let r = s.name || `Sheet${i + 1}`;
      for (; o.includes(r); ) r += "_";
      o.push(r);
      const l = Math.max(s.dimension.rows, 1), a = Math.max(s.dimension.cols, 1), c = [];
      for (let d = 0; d < l; d++) c.push(new Array(a).fill(null));
      for (const d of s.cells.values())
        d.row < l && d.col < a && (c[d.row][d.col] = pc(d));
      t[r] = c;
    }
    this.hf = this.HF.buildFromSheets(t, { licenseKey: "gpl-v3" }), this.sheetIds = o.map((i) => {
      var s;
      return (s = this.hf.getSheetId(i)) != null ? s : 0;
    });
  }
  setCell(e, t, o, i) {
    var c;
    if (!this.hf) return [];
    const s = (c = this.sheetIds[e]) != null ? c : e, r = this.hf.setCellContents({ sheet: s, row: t, col: o }, i), l = (d) => {
      const u = this.sheetIds.indexOf(d);
      return u >= 0 ? u : d;
    }, a = [];
    for (const d of r)
      "address" in d && a.push({
        sheet: l(d.address.sheet),
        row: d.address.row,
        col: d.address.col,
        value: this.mapValue(d.newValue)
      });
    return a;
  }
  getValue(e, t, o) {
    var s;
    if (!this.hf) return null;
    const i = (s = this.sheetIds[e]) != null ? s : e;
    return this.mapValue(this.hf.getCellValue({ sheet: i, row: t, col: o }));
  }
  destroy() {
    var e;
    (e = this.hf) == null || e.destroy(), this.hf = null;
  }
  /** HF 值 → 模型 CellValue:错误对象 → 错误串(如 #DIV/0!);空 → null。 */
  mapValue(e) {
    return e instanceof this.DCE ? e.value : typeof e == "number" || typeof e == "string" || typeof e == "boolean" ? e : null;
  }
}
const Mv = async () => {
  var o;
  const n = await import("./index-gsLKcr47.js"), e = (o = n.HyperFormula) != null ? o : n.default, t = n.DetailedCellError;
  return new mv(e, t);
};
function Iv(n) {
  return n;
}
export {
  Sm as $,
  ac as A,
  lm as B,
  Dc as C,
  rt as D,
  Zg as E,
  Pt as F,
  kt as G,
  Da as H,
  Jt as I,
  pv as J,
  hu as K,
  Ha as L,
  Yi as M,
  to as N,
  W0 as O,
  Rn as P,
  Zh as Q,
  Ao as R,
  Ts as S,
  mg as T,
  De as U,
  Qy as V,
  Ky as W,
  ct as X,
  bg as Y,
  rc as Z,
  yg as _,
  Dm as a,
  xg as a0,
  vg as a1,
  ss as a2,
  Dg as a3,
  Bg as a4,
  Wg as a5,
  Xh as a6,
  Gh as a7,
  bs as a8,
  ys as a9,
  Gy as aA,
  rs as aa,
  C0 as ab,
  Tv as ac,
  Ah as ad,
  ic as ae,
  Gi as af,
  Bp as ag,
  ls as ah,
  St as ai,
  qr as aj,
  Mo as ak,
  Sv as al,
  Jr as am,
  Ki as an,
  Yg as ao,
  Et as ap,
  Hp as aq,
  Ci as ar,
  wv as as,
  Dp as at,
  lc as au,
  jg as av,
  rl as aw,
  hy as ax,
  fy as ay,
  Xy as az,
  S0 as b,
  Ev as c,
  Xi as d,
  qh as e,
  is as f,
  ll as g,
  Cn as h,
  ze as i,
  sm as j,
  Rb as k,
  Cv as l,
  kv as m,
  pc as n,
  Es as o,
  X as p,
  xv as q,
  zo as r,
  Ee as s,
  we as t,
  Pe as u,
  Mv as v,
  Iv as w,
  wg as x,
  Kr as y,
  vv as z
};
