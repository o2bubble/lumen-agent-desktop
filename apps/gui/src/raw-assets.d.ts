// Vite 的 `?raw` 文本导入 —— `.md` / `.py` 这些非代码资源当字符串用。
declare module "*?raw" {
  const content: string;
  export default content;
}
