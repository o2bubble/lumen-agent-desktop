# AI_NOTES — office-preview 排查文档

Word / Excel / PowerPoint 预览插件。贡献：3 个面板（`preview`→`preview.html`、
`sheet`→`sheet.html`、`slides`→`slides.html`）+ 1 个后台进程
（`office-preview-server`）+ 1 个 MCP 工具（`preview_document`）
+ 3 条文件类型关联（docx/xlsx/pptx）。

面板**嵌在编辑器标签里**（宿主 `EditorPanel` 的 `PreviewSurface`），不是浮窗。

## 它是怎么被触发的

用户在文件树里**双击 `.docx`** → 宿主 `openFileAt` 查到本插件声明了该扩展名 →
打开 `preview` 面板并传 `{ file: "<绝对路径>" }` → 面板向后台进程取字节 → 渲染。

> **面板无法自己打开。** 插件进程碰不到窗口管理，所以 MCP 工具
> `preview_document` 只能定位文件并回一条说明，不能真的弹出面板。

## 症状 → 排查

| 用户说 | 先查什么 |
|---|---|
| 双击 .docx 还是显示乱码（Monaco） | 宿主版本太旧，不认识 `contributes.fileTypes`。看 `gui/src/services/pluginFileTypes.ts` 是否存在 |
| 面板打开了，一片空白/一直"正在加载" | 后台进程没起来。查宿主日志里有没有 `PLUGIN_PORT=` |
| "Failed to fetch" | CORS 头丢了。`/file` 那条 `res.writeHead` 必须带 `Access-Control-Allow-Origin` |
| "Cannot read properties of undefined (reading 'loadAsync')" | **缺 JSZip**。`preview.html` 里 JSZip 必须排在 docx-preview 之前 |
| "这个文件不在当前工作区内" | 打开的文件在工作区外。这是安全边界，不是 bug |
| "旧版 .doc 格式" | `.doc` 是 OLE 复合文档，docx-preview 只认 OOXML。属预期行为 |
| 排版错乱 / 字体不对 | docx-preview 的保真度上限。复杂分栏、文本框、SmartArt 会降级 |
| Excel 一片空白 | 检查 `vendor/ooxml/chunks/` 是否完整 —— 库内部有**变量拼接的动态 import**，静态分析抓不到依赖，漏拷才在运行时报错 |
| Excel 报 "Failed to fetch dynamically imported module" | 同上：某个 chunk 没打进包 |
| Excel 行列数显示 undefined | 尺寸在 `sheet.dimension.{rows,cols}`，不是 `rowCount`/`colCount`（这两个字段不存在） |
| PPT 图表区空白 | **已知限制**：图表节点（`nodeType: "chart"`）解析出来了但没渲染，无报错。不是配置问题 |
| PPT 少显示几个形状 | 极少数 python-pptx 生成的形状组合会漏渲染（`renderSlide` 返回的 `element.children.length` 少于节点数，且无错误）。用 PowerPoint 另存一次通常可解 |

## 安全边界（改代码时别破坏）

- 进程只监听 `127.0.0.1`，端口由系统分配
- `/file` 只读**工作区内**的文件；`isAllowed()` 先 `realpath` 再比前缀
  （只比字符串前缀会被 `../` 绕过）
- 无目录列举接口

## 第三方库

`vendor/` 下三个文件都是**运行时必需**，少一个就白屏：

- `docx-preview.min.js`（Apache-2.0）—— docx → DOM
- `jszip.min.js`（MIT / GPLv3 双许可）—— docx-preview 的依赖，docx 本质是 zip
- `ooxml/core.js` + `chunks/*.js`（MIT）—— xlsx Canvas 渲染引擎（v1.16.3）。
  **框架无关的 core 入口**，Vue/React 壳用不上。⚠️ `chunks/` 目录必须**整个**拷，
  静态 import 只指向 1 个 chunk，但还有变量拼接的动态 import（如 exceljs.min-*.js）
- `pptx-renderer.es.js`（Apache-2.0）—— pptx → DOM。**ESM 模块**，必须用
  `<script type="module">` + 动态 `import()` 加载（2.3MB，首屏按需加载）。
  输出固定 1280×720，缩放靠外层 CSS `transform`

升级库时注意：`docx-preview` / `exceljs` 是 UMD（全局 `window.docx` / `window.JSZip` /
`window.ExcelJS`），`pptx-renderer` 是 ESM（import）。三种加载方式不同，别混。
