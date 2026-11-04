// 桌面布局的纯计算。
//
// 这里的东西**不碰任何模块级状态**：给数据、算结果、返回。
// 所以能直接喂坐标做测试，不用起整个 store。
//
// 从 desktopStore 搬过来的原因：`findSmartPlace` 是螺旋扫描找空位，
// 逻辑不短但完全是几何计算。困在 store 里时，想测它得先造一个 desktop
// 对象、还得理解 store 的其余 40 个导出 —— 于是从来没被单独测过。

export interface LayoutItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutConfig {
  items: LayoutItem[];
  snapToGrid: boolean;
  gridSize: number;
}

/**
 * 两个矩形是否相交。
 *
 * ⚠️ **边界相接算相交** —— 用 `<` 而不是 `<=`，和搬家前的实现保持一致。
 * 看起来反直觉，但这是有意的：两个 item 边缘死死贴在一起时，视觉上就是
 * 压在一块的（没有间距），布局应该继续找别的位置。
 */
export function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
): boolean {
  return !(ax + aw < bx || ay + ah < by || ax > bx + bw || ay > by + bh);
}

/**
 * 从左上角锚点开始**螺旋向外**找第一个不重叠的位置。
 *
 * 为什么是螺旋而不是逐行扫描：逐行扫描在"左上角被占满"时会一路往右跑，
 * 出来一长条；螺旋能贴着已有内容排布，视觉上更自然。
 *
 * 找不到（扫满 maxSteps）时返回锚点旁边的位置 —— 宁可重叠也不要返回
 * 一个可能越界的怪坐标。
 */
/** 两个 item 之间的空隙。和 `skill/scripts/layout.py` 保持一致。 */
const GAP = 40;

export function findSmartPlace(
  desktop: LayoutConfig,
  itemW: number,
  itemH: number,
  maxSteps = 100,
): { x: number; y: number } {
  const anchorX = 100;
  const anchorY = 100;

  // ⚠️ 步长必须**不小于 item 自身的尺寸**。
  //
  // 旧实现是固定 30（或 gridSize），而 item 常见尺寸 200×150 ——
  // 相邻两个候选位置只差 30px，一个 200 宽的块放过去必然压住前一个，
  // 于是螺旋扫满 100 步全都判"重叠"，最后返回一个同样重叠的兜底位置。
  // 用户看到的就是"AI 放的东西叠在一起"。
  const grid = Math.max(1, desktop.gridSize);
  const rawStepX = itemW + GAP;
  const rawStepY = itemH + GAP;
  const stepX = desktop.snapToGrid ? Math.ceil(rawStepX / grid) * grid : rawStepX;
  const stepY = desktop.snapToGrid ? Math.ceil(rawStepY / grid) * grid : rawStepY;

  const overlaps = (x: number, y: number): boolean =>
    desktop.items.some((it) =>
      rectsOverlap(x, y, itemW, itemH, it.x, it.y, it.width, it.height),
    );

  const snap = (v: number): number =>
    desktop.snapToGrid ? Math.round(v / desktop.gridSize) * desktop.gridSize : v;

  // 逐行扫描：从左往右排满一行，再换下一行。
  //
  // 为什么不用螺旋：螺旋会从锚点向四周扩散，第二圈就跑到负坐标去
  // （实测 8 个块时出现 -70,-140 / -410,-380），而画布左上方是空的 ——
  // 用户看到的是"东西凭空出现在视野左上角外面"。
  //
  // 逐行扫描保证：① 永远按阅读顺序 ② 坐标单调递增，不会倒退到负数区。
  // 每行放几个：常见窗口约 1400~1900 宽，减去左侧锚点。
  // 太少会很快换行（内容挤成一列），太多会拉出一条几百 px 的横线
  // （实测 perRow=10 时 8 个块排到 x=2480，用户得横向滚很远）。
  const perRow = Math.max(1, Math.floor(1400 / stepX));

  for (let i = 0; i < maxSteps; i++) {
    const col = i % perRow;
    const row = Math.floor(i / perRow);

    const tx = snap(anchorX + col * stepX);
    const ty = snap(anchorY + row * stepY);

    if (!overlaps(tx, ty)) return { x: tx, y: ty };
  }

  // 螺旋扫不到空位 → **放到所有内容的下方**，保证不压任何东西。
  //
  // 旧实现返回 (anchorX+20, anchorY+20)，也就是锚点旁边 —— 那几乎一定
  // 落在已有 item 上（锚点周围正是最挤的地方）。宁可往下堆也不要重叠：
  // 用户往下滚一下就能看到，而重叠要一个个手动挪开。
  const below = desktop.items.length
    ? Math.max(...desktop.items.map((it) => it.y + it.height)) + GAP
    : anchorY;
  return {
    x: snap(anchorX),
    y: snap(below),
  };
}
