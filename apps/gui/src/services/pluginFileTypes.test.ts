// 文件类型关联：把双击路由到插件面板。
//
// 契约：命中扩展名 → 返回「哪个插件的哪个面板 + 参数名」；没命中 → null
// （调用方继续走内置预览 / Monaco）。

import { describe, expect, it } from "vitest";
import { extOf, findFileTypeHandlerIn } from "./pluginFileTypes";
import type { PluginManifest } from "./pluginRegistry";

function manifest(name: string, fileTypes: any[]): PluginManifest {
  return {
    pluginName: name,
    displayName: name,
    version: "1.0.0",
    contributes: {
      panels: fileTypes.map((ft) => ({
        id: ft.panelId,
        title: ft.panelId,
        panelKind: "floating" as const,
        views: [],
      })),
      commands: [],
      events: [],
      mcpTools: [],
      skills: [],
      fileTypes,
      hooks: {},
    },
    processes: [],
    category: "tool",
    dependencies: [],
    installType: "standard",
    runtimes: [],
    platforms: [],
    settings: {},
  } as PluginManifest;
}

describe("extOf", () => {
  it("取小写扩展名", () => {
    expect(extOf("C:/a/b/Report.DOCX")).toBe("docx");
    expect(extOf("x.tar.gz")).toBe("gz");
  });

  it("无扩展名 / 隐藏文件返回空", () => {
    expect(extOf("C:/a/README")).toBe("");
    expect(extOf("C:/a/.gitignore")).toBe("");
    expect(extOf("C:/a/trailing.")).toBe("");
  });
});

describe("findFileTypeHandlerIn", () => {
  const office = manifest("office-preview", [
    { extensions: ["docx", "doc"], panelId: "preview" },
  ]);

  it("命中扩展名时返回完整面板 id", () => {
    const hit = findFileTypeHandlerIn([office], "D:/ws/报告.docx");
    expect(hit).not.toBeNull();
    expect(hit!.pluginName).toBe("office-preview");
    expect(hit!.fullPanelId).toBe("plugin:office-preview:preview");
    expect(hit!.paramName).toBe("file");
    expect(hit!.ext).toBe("docx");
  });

  it("大小写不敏感", () => {
    expect(findFileTypeHandlerIn([office], "A.DOCX")!.ext).toBe("docx");
  });

  it("未声明的扩展名返回 null（继续走老路径）", () => {
    expect(findFileTypeHandlerIn([office], "a.ts")).toBeNull();
    expect(findFileTypeHandlerIn([office], "a.xlsx")).toBeNull();
  });

  it("自定义参数名生效", () => {
    const m = manifest("x", [
      { extensions: ["docx"], panelId: "p", paramName: "path" },
    ]);
    expect(findFileTypeHandlerIn([m], "a.docx")!.paramName).toBe("path");
  });

  it("多个插件争同一后缀时先注册的赢", () => {
    const a = manifest("a", [{ extensions: ["docx"], panelId: "pa" }]);
    const b = manifest("b", [{ extensions: ["docx"], panelId: "pb" }]);
    expect(findFileTypeHandlerIn([a, b], "x.docx")!.pluginName).toBe("a");
  });

  it("没有插件声明时返回 null", () => {
    expect(findFileTypeHandlerIn([], "a.docx")).toBeNull();
    expect(findFileTypeHandlerIn([manifest("e", [])], "a.docx")).toBeNull();
  });
});
