import { describe, expect, it } from "vitest";
import { isTextEditingTarget } from "./editableTarget";

interface FakeEl {
  tagName: string;
  isContentEditable: boolean;
  parentElement: FakeEl | null;
}

const el = (
  tagName: string,
  opts: { editable?: boolean; parent?: FakeEl | null } = {},
): FakeEl => ({
  tagName,
  isContentEditable: opts.editable ?? false,
  parentElement: opts.parent ?? null,
});

const isEditing = (t: unknown) => isTextEditingTarget(t as EventTarget);

describe("isTextEditingTarget", () => {
  it("输入框 / 文本域 / 下拉框都算编辑中", () => {
    expect(isEditing(el("INPUT"))).toBe(true);
    expect(isEditing(el("TEXTAREA"))).toBe(true);
    expect(isEditing(el("SELECT"))).toBe(true);
  });

  it("contentEditable 宿主本身算编辑中", () => {
    expect(isEditing(el("DIV", { editable: true }))).toBe(true);
  });

  it("contentEditable 里的内层元素也算（编辑时文字常被 <b>/<span> 包住）", () => {
    const host = el("DIV", { editable: true });
    const span = el("SPAN", { parent: host });
    const bold = el("B", { parent: span });
    expect(isEditing(bold)).toBe(true);
  });

  it("普通画布元素不算编辑中", () => {
    expect(isEditing(el("DIV"))).toBe(false);
    expect(isEditing(el("SPAN", { parent: el("DIV") }))).toBe(false);
  });

  it("没有 target 时不算编辑中", () => {
    expect(isEditing(null)).toBe(false);
  });
});
