// 所有随仓库分发的插件 manifest 都必须能被**真实的解析器**读懂。
//
// 为什么值得单独测：manifest 写错（多一个逗号、注释没删、icon 拼错、hooks
// 事件名打错）不会让构建失败，只会让插件在用户机器上"装着但没效果"。
// 这里直接拿 packages/plugins 下的真实文件过一遍 parseManifest。

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parsePluginManifest } from "./pluginRegistry";

const PLUGINS_ROOT = join(__dirname, "..", "..", "..", "..", "packages", "plugins");

function pluginDirs(): string[] {
  let names: string[] = [];
  try {
    names = readdirSync(PLUGINS_ROOT);
  } catch {
    return []; // 仓库布局变化时跳过，不让测试变噪音
  }
  return names.filter((n) => {
    if (n.startsWith("_") || n.startsWith(".")) return false;
    try {
      return statSync(join(PLUGINS_ROOT, n)).isDirectory();
    } catch {
      return false;
    }
  });
}

describe("packages/plugins 里的真实 manifest", () => {
  const dirs = pluginDirs();

  it("至少能找到一个插件（路径没写错）", () => {
    expect(dirs.length).toBeGreaterThan(0);
  });

  for (const name of dirs) {
    it(`${name}: plugin.json 可解析且目录名与 pluginName 一致`, () => {
      const raw = readFileSync(join(PLUGINS_ROOT, name, "plugin.json"), "utf-8");
      const res = parsePluginManifest(raw, name);
      expect(res.ok, res.ok ? "" : res.error).toBe(true);
      if (!res.ok) return;
      expect(res.manifest.pluginName).toBe(name);
    });
  }
});

describe("doc-metadata 插件的声明", () => {
  it("贡献了 Stop 钩子，脚本相对路径合法", () => {
    const raw = readFileSync(join(PLUGINS_ROOT, "doc-metadata", "plugin.json"), "utf-8");
    const res = parsePluginManifest(raw, "doc-metadata");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    const stop = res.manifest.contributes.hooks.Stop;
    expect(stop).toHaveLength(1);
    expect(stop[0].script).toBe("sanitize.py");
    expect(stop[0].runner).toBe("python");
  });

  it("设置项齐全（范围 + 作者 + 公司 + 时间）", () => {
    const raw = readFileSync(join(PLUGINS_ROOT, "doc-metadata", "plugin.json"), "utf-8");
    const res = parsePluginManifest(raw, "doc-metadata");
    if (!res.ok) return;
    expect(Object.keys(res.manifest.settings).sort()).toEqual(
      ["author", "company", "keepTimestamps", "scope"],
    );
  });
});
