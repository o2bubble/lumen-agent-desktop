// 端到端复现 handler 的创建路径。
//
// 这是对「filegroup 静默降级成 text」那个 bug 的完整回归：
// 不测内部函数，而是按 handler 的做法走一遍 validateContent → addItem 的入参。

import { describe, expect, it, vi } from "vitest";
import { validateContent } from "./itemTypeSpecs";

/** 复刻 handler 里 validateContent 之后的入参构造。 */
function handlerContent(type: string, content: unknown) {
  const v = validateContent(type, content);
  if (!v.ok) throw new Error(v.errors.join("; "));
  return v.content;
}

describe("desktop_create_item 的真实路径", () => {
  it("AI 写 filegroup（MCP enum 里的写法）→ 建出文件组，不是文本", () => {
    const content = handlerContent("filegroup", {
      files: [{ type: "file", path: "README.md" }],
    });
    // 这就是 bug 的核心断言：以前这里是 "text"
    expect(content.type).toBe("file-group");
    expect(content.files).toEqual([{ type: "file", path: "README.md" }]);
  });

  it("AI 写 file-group（规范名）同样能建", () => {
    const content = handlerContent("file-group", { files: [] });
    expect(content.type).toBe("file-group");
  });

  it("表格给全字段能建，且 style/format 原样保留", () => {
    const content = handlerContent("table", {
      columns: [{ id: "a", name: "项目", pinned: "left" }],
      rows: [{ id: "r1", cells: { a: "服务器" } }],
      cellStyles: { "r1:a": { bold: true, colSpan: 2 } },
      formats: { a: "0,0.00" },
    });
    expect(content.type).toBe("table");
    expect((content as any).cellStyles["r1:a"].colSpan).toBe(2);
  });

  it("表格结构错（columns 不是数组）→ 报错，不静默降级", () => {
    expect(() => handlerContent("table", { columns: "oops", rows: [] }))
      .toThrow(/should be array/);
  });

  it("未知类型 → 报错并列出合法值", () => {
    expect(() => handlerContent("spaceship", {}))
      .toThrow(/Unknown item type.*table/s);
  });

  it("chart 三级通道都能用", () => {
    for (const raw of [
      { option: { series: [] } },
      { series: [{ type: "bar", data: [1, 2] }] },
      { data: { labels: ["a"], datasets: [{ label: "x", data: [1] }] }, chartType: "bar" },
    ]) {
      expect(handlerContent("chart", raw).type).toBe("chart");
    }
  });

  it("drawing 只给 svg 也能建（elements 是可选的）", () => {
    const content = handlerContent("drawing", {
      svg: "<svg><rect/></svg>",
      width: 400, height: 300,
    });
    expect(content.type).toBe("drawing");
  });
});
