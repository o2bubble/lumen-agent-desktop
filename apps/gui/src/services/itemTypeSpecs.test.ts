// item 类型契约：别名规范化 + 校验。
//
// 最重要的一条是 `filegroup` 那个回归 —— 它曾经静默降级成 text，
// 而没有任何测试能发现。

import { describe, expect, it } from "vitest";
import {
  ITEM_TYPE_SPECS,
  resolveTypeName,
  validateContent,
  allAcceptedTypeNames,
} from "./itemTypeSpecs";
import type { ItemContentType } from "../types/desktop";

describe("别名规范化", () => {
  it("filegroup 别名解析到 file-group（回归）", () => {
    // 这是真实 bug：MCP enum 写 "filegroup"，registry 认 "file-group"，
    // handler 的 `itemType === "file-group"` 永远为 false → 建成 text。
    expect(resolveTypeName("filegroup")).toBe("file-group");
    expect(resolveTypeName("file-group")).toBe("file-group");
  });

  it("大小写与空白不敏感", () => {
    expect(resolveTypeName("  FileGroup ")).toBe("file-group");
    expect(resolveTypeName("TABLE")).toBe("table");
  });

  it("未知类型返回 undefined", () => {
    expect(resolveTypeName("spaceship")).toBeUndefined();
    expect(resolveTypeName("")).toBeUndefined();
  });

  it("每个 spec 的 canonical 都是合法的 ItemContentType", () => {
    const valid: ItemContentType[] = [
      "text", "chart", "graphic", "ref", "file-group",
      "image", "form", "drawing", "table",
    ];
    for (const s of ITEM_TYPE_SPECS) {
      expect(valid).toContain(s.canonical);
    }
  });

  it("覆盖全部 9 种类型（少一个说明规格表漏了）", () => {
    const canonicals = ITEM_TYPE_SPECS.map((s) => s.canonical).sort();
    expect(canonicals).toEqual(
      ["chart", "drawing", "file-group", "form", "graphic", "image", "ref", "table", "text"].sort(),
    );
  });

  it("别名和规范名都能通过 schema enum", () => {
    const names = allAcceptedTypeNames();
    expect(names).toContain("filegroup");
    expect(names).toContain("file-group");
    expect(names).toContain("table");
  });
});

describe("validateContent — 结构错误要拒绝", () => {
  it("未知类型报错并列出合法值", () => {
    const r = validateContent("spaceship", {});
    expect(r.ok).toBe(false);
    expect(r.errors[0]).toContain("Unknown item type");
    expect(r.errors[0]).toContain("table");
  });

  it("必填字段缺失", () => {
    const r = validateContent("file-group", {});
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes("files"))).toBe(true);
  });

  it("字段类型不对", () => {
    const r = validateContent("form", { fields: "oops" });
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes("should be array"))).toBe(true);
  });

  it("报错带正确样例，方便 AI 自纠", () => {
    const r = validateContent("table", {});
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes("Expected shape"))).toBe(true);
  });
});

describe("validateContent — 缺省要补齐", () => {
  it("text 缺 format/text 时补齐", () => {
    const r = validateContent("text", {});
    expect(r.ok).toBe(true);
    expect(r.content.format).toBe("plain");
    expect(r.content.text).toBe("");
  });

  it("graphic 缺内容时给默认 mermaid", () => {
    const r = validateContent("graphic", {});
    expect(r.ok).toBe(true);
    expect(String(r.content.mermaid)).toContain("graph");
  });

  it("form 的 field 缺 id 时自动生成", () => {
    const r = validateContent("form", {
      fields: [{ name: "姓名", type: "text" }],
    });
    expect(r.ok).toBe(true);
    expect((r.content.fields as any[])[0].id).toBe("f1");
  });

  it("form 的 field 缺 type 时报错（这个补不了）", () => {
    const r = validateContent("form", { fields: [{ id: "a", name: "x" }] });
    expect(r.ok).toBe(false);
    expect(r.errors[0]).toContain("missing \"type\"");
  });
});

describe("validateContent — type 判别符", () => {
  it("别名一律写成规范名", () => {
    const r = validateContent("filegroup", { files: [] });
    expect(r.ok).toBe(true);
    expect(r.content.type).toBe("file-group");
  });

  it("AI 写错 content.type 也会被纠正（以参数 type 为准）", () => {
    const r = validateContent("table", {
      type: "text",            // AI 自己写错了
      columns: [], rows: [],
    });
    expect(r.ok).toBe(true);
    expect(r.content.type).toBe("table");
  });
});
