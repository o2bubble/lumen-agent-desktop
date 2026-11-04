import { describe, it, expect } from "vitest";
import {
  normalizeDeliverInput,
  isDeliverTool,
  deliverItemLabel,
  DELIVER_TOOL_DEF,
} from "./deliverSpec";

describe("normalizeDeliverInput — 正常输入", () => {
  it("保留 path / action / label / note", () => {
    const p = normalizeDeliverInput({
      summary: "登录流程改完了",
      items: [
        { path: "src/a.ts", action: "created", label: "入口", note: "加了重试" },
        { path: "src/b.ts", action: "modified" },
      ],
    });
    expect(p.summary).toBe("登录流程改完了");
    expect(p.dropped).toBe(0);
    expect(p.items).toEqual([
      { type: "file", path: "src/a.ts", action: "created", label: "入口", note: "加了重试" },
      { type: "file", path: "src/b.ts", action: "modified" },
    ]);
  });

  it("action 缺省或非法一律归为 modified（不谎称新建）", () => {
    const p = normalizeDeliverInput({
      items: [{ path: "a" }, { path: "b", action: "bogus" }, { path: "c", action: null }],
    });
    expect(p.items.map((i) => i.action)).toEqual(["modified", "modified", "modified"]);
    expect(p.dropped).toBe(0);
  });

  it("条目类型恒为 file（v1 只收文件）", () => {
    const p = normalizeDeliverInput({ items: [{ path: "a.ts" }] });
    expect(p.items[0].type).toBe("file");
  });
});

describe("normalizeDeliverInput — 脏数据与流式半截", () => {
  it("空 path / 非字符串 path 的条目被丢弃并计数", () => {
    const p = normalizeDeliverInput({
      items: [{ path: "" }, { path: 42 }, { note: "没路径" }, { path: "ok.ts" }],
    });
    expect(p.items).toHaveLength(1);
    expect(p.dropped).toBe(3);
  });

  it("完全空的条目不计入 dropped（流式解析出的 {}) ", () => {
    const p = normalizeDeliverInput({ items: [{}, { path: "ok.ts" }] });
    expect(p.items).toHaveLength(1);
    expect(p.dropped).toBe(0);
  });

  it("items 不是数组 / input 是 undefined 时不抛，返回空载荷", () => {
    expect(normalizeDeliverInput(undefined).items).toEqual([]);
    expect(normalizeDeliverInput({ items: "oops" }).items).toEqual([]);
    expect(normalizeDeliverInput(null).items).toEqual([]);
  });

  it("空白字符串字段归一成 undefined（不产生空的 label/note）", () => {
    const p = normalizeDeliverInput({
      summary: "   ",
      items: [{ path: "a.ts", label: "  ", note: "\n" }],
    });
    expect(p.summary).toBeUndefined();
    expect(p.items[0].label).toBeUndefined();
    expect(p.items[0].note).toBeUndefined();
  });
});

describe("isDeliverTool — 认得三种工具名形态", () => {
  it("MCP 全名（服务器名可变）", () => {
    expect(isDeliverTool("mcp__super-desktop__deliver")).toBe(true);
    expect(isDeliverTool("mcp__whatever__deliver")).toBe(true);
  });

  it("无前缀模式下的裸名", () => {
    expect(isDeliverTool("deliver")).toBe(true);
  });

  it("不误伤名字里含 deliver 的其它工具", () => {
    expect(isDeliverTool("deliverable_scan")).toBe(false);
    expect(isDeliverTool("mcp__x__redeliver")).toBe(false);
  });
});

describe("deliverItemLabel", () => {
  it("优先 label，其次文件名，两种分隔符都认", () => {
    expect(deliverItemLabel({ type: "file", path: "a/b.ts", action: "modified", label: "甲" })).toBe("甲");
    expect(deliverItemLabel({ type: "file", path: "a/b.ts", action: "modified" })).toBe("b.ts");
    expect(deliverItemLabel({ type: "file", path: "a\\b.ts", action: "modified" })).toBe("b.ts");
  });
});

describe("DELIVER_TOOL_DEF", () => {
  it("声明 alwaysLoad，否则 MCP 工具会被 tool-search 延迟加载", () => {
    expect(DELIVER_TOOL_DEF._meta["anthropic/alwaysLoad"]).toBe(true);
  });

  it("schema 要求 items 且每项要 path", () => {
    expect(DELIVER_TOOL_DEF.inputSchema.required).toEqual(["items"]);
    expect(DELIVER_TOOL_DEF.inputSchema.properties.items.items.required).toEqual(["path"]);
  });
});
