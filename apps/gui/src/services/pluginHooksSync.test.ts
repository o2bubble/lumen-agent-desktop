import { describe, expect, it } from "vitest";
import { parsePluginHooks, hookRunnerFor, type PluginManifest } from "./pluginRegistry";
import { collectPluginHooks } from "./pluginHooksSync";

describe("parsePluginHooks", () => {
  it("按扩展名推断解释器", () => {
    expect(hookRunnerFor("sanitize.py")).toBe("python");
    expect(hookRunnerFor("run.sh")).toBe("bash");
    expect(hookRunnerFor("hook.cjs")).toBe("bun");
  });

  it("正常声明被原样接受，超时补默认值", () => {
    const hooks = parsePluginHooks({ Stop: [{ script: "sanitize.py" }] });
    expect(hooks.Stop).toHaveLength(1);
    expect(hooks.Stop[0]).toMatchObject({ script: "sanitize.py", runner: "python", timeout: 30 });
  });

  it("未知事件被丢弃（写错的事件名钩子永远不会触发）", () => {
    const hooks = parsePluginHooks({ NotARealEvent: [{ script: "x.py" }] });
    expect(hooks).toEqual({});
  });

  it("拒绝绝对路径与目录穿越", () => {
    const hooks = parsePluginHooks({
      Stop: [
        { script: "../../evil.py" },
        { script: "/etc/passwd" },
        { script: "C:/Windows/x.py" },
        { script: "ok.py" },
      ],
    });
    expect(hooks.Stop).toHaveLength(1);
    expect(hooks.Stop[0].script).toBe("ok.py");
  });

  it("超时被钳制到 1–300", () => {
    expect(parsePluginHooks({ Stop: [{ script: "a.py", timeout: 0 }] }).Stop[0].timeout).toBe(1);
    expect(parsePluginHooks({ Stop: [{ script: "a.py", timeout: 9999 }] }).Stop[0].timeout).toBe(300);
  });

  it("matcher 只在声明时带上", () => {
    expect(parsePluginHooks({ PostToolUse: [{ script: "a.py" }] }).PostToolUse[0].matcher).toBeUndefined();
    expect(
      parsePluginHooks({ PostToolUse: [{ script: "a.py", matcher: "Write" }] }).PostToolUse[0].matcher,
    ).toBe("Write");
  });
});

function manifest(name: string, hooks: Record<string, unknown>): PluginManifest {
  return {
    pluginName: name,
    displayName: name,
    version: "1.0.0",
    contributes: {
      panels: [], commands: [], events: [], mcpTools: [], skills: [], fileTypes: [],
      hooks: parsePluginHooks(hooks),
    },
    processes: [],
    category: "tool",
    dependencies: [],
    installType: "standard",
    runtimes: [],
    platforms: [],
    settings: {},
  };
}

describe("collectPluginHooks", () => {
  it("把多个插件的声明摊平成扁平列表", () => {
    const specs = collectPluginHooks([
      manifest("a", { Stop: [{ script: "a.py" }] }),
      manifest("b", { PostToolUse: [{ script: "b.py", matcher: "Write" }] }),
    ]);
    expect(specs).toHaveLength(2);
    expect(specs.find((s) => s.plugin === "b")).toMatchObject({
      event: "PostToolUse", script: "b.py", matcher: "Write",
    });
  });

  it("没有钩子的插件不产生条目", () => {
    expect(collectPluginHooks([manifest("a", {})])).toEqual([]);
  });
});
