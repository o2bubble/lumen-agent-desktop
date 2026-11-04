import { describe, it, expect } from "vitest";
import { buildGuiInstructions, MAX_INSTRUCTIONS_CHARS } from "./guiInstructions";

describe("buildGuiInstructions — 通道约定", () => {
  it("长度在 claude 侧截断阈值内（超出会被静默截掉尾巴）", () => {
    const text = buildGuiInstructions();
    expect(text.length).toBeLessThanOrEqual(MAX_INSTRUCTIONS_CHARS);
  });

  it("与 claude 侧的 MAX_MCP_DESCRIPTION_LENGTH 保持同一个数", () => {
    // 服务端常量：src/services/mcp/client.ts 的 MAX_MCP_DESCRIPTION_LENGTH。
    // 这里钉死，改一边忘了另一边会红。
    expect(MAX_INSTRUCTIONS_CHARS).toBe(2048);
  });

  it("提到 deliver 工具名，否则模型无从知道要调它", () => {
    expect(buildGuiInstructions()).toContain("deliver");
  });

  it("明确禁止把路径再抄一遍（否则正文和卡片重复）", () => {
    expect(buildGuiInstructions().toLowerCase()).toContain("don't paste");
  });

  it("不含 CLI 专属环境描述（这段话只会在 GUI 下生效）", () => {
    expect(buildGuiInstructions()).not.toMatch(/terminal-only/i);
  });
});
