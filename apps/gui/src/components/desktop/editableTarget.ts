/**
 * 焦点是否落在可编辑目标里 —— 此时按键属于编辑操作，不是画布命令。
 *
 * 必须包含 contentEditable：文本块用的是 contentEditable 而不是 textarea。
 * 漏掉它时，在文本块里按退格会冒泡到画布的 keydown，把当前选中的块全部删掉。
 *
 * 还要往祖先方向走：contentEditable 里的文字常被 <b>/<span> 包住，
 * 此时事件 target 是内层元素而不是编辑宿主。
 */
export function isTextEditingTarget(target: EventTarget | null): boolean {
  let el = target as HTMLElement | null;
  while (el) {
    if (
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "SELECT" ||
      el.isContentEditable
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}
