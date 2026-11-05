# doc-metadata —— AI 排查笔记

> 写给 AI 排查用。用户报「装了没效果」时按顺序看，别猜。

## 它是什么形态

**纯钩子插件**：没有面板、没有进程、没有 MCP 工具。全部逻辑在 `sanitize.py`，
由引擎在每轮结束时（`Stop`）调用一次。所以：

- 插件列表里它**没有可点的面板** —— 这是预期行为，不是装坏了
- 没有「启动中/运行中」状态 —— 那不是故障
- 装完**要新开一次会话**才生效（引擎只在会话启动时加载钩子配置）

## 钩子是怎么接上的

宿主每次重扫插件时，把 `contributes.hooks` 翻译成 `~/.claude/settings.json` 的
`hooks.Stop` 条目（对账式，卸载/禁用会自动移除）。命令形如：

```
"<安装目录>/python/python.exe" "<插件目录>/sanitize.py" --plugin "doc-metadata" --settings-dir "<AppData>/plugins-settings"
```

**排查第一步：看这条在不在。**

```bash
python -c "import json,os;d=json.load(open(os.path.expanduser('~/.claude/settings.json'),encoding='utf-8'));print(json.dumps(d.get('hooks',{}).get('Stop'),ensure_ascii=False,indent=2))"
```

- 没有 → 插件未启用 / 宿主重扫没跑（重启 GUI）
- 有但路径不对 → 插件被手工挪过，重启 GUI 触发重扫

## 「跑了但没清理」的三种常见原因

| 现象 | 原因 | 怎么办 |
|---|---|---|
| 本轮 AI 生成的文件没被处理 | `scope=touched`（默认）只认**本轮工具调用里出现过的路径**。AI 用代码拼路径（`os.path.join(base, name)`）时路径不出现在记录里 | 把设置改成 `newOnly` 或 `workspace` |
| 报「文件可能被占用」 | Word / WPS / Excel 正开着该文件 | 让用户关掉文档再试 |
| 报「无法自动清理」 | PDF 的 Info 字典被压进对象流，或 PDF 加密 | 明确告诉用户这个文件没清掉 |

## 每次运行的记录

```
<AppData>/com.claudecode.gui/plugins-settings/doc-metadata.last-run.json
```

含 `done` / `failed` / `unsupported` 三组。用户问「到底处理了哪些」→ 读这个文件，
不要凭记忆回答。

## 配置在哪

- 全局：`<AppData>/com.claudecode.gui/plugins-settings/doc-metadata.json`
- 工作区覆盖：`<工作区>/.claude/plugins-settings/doc-metadata.json`（逐键覆盖全局）

脚本**每次运行都现读**，改设置不用重启。

## 已知非故障

- **属性面板「来源 → 计算机」仍显示机器名 —— 不是 bug，不用排查、不用修。**
  该字段不存于文件，是 WPS/Windows 打开属性面板时按**当前这台电脑**现场算出来的。
  实测证据：文件字节里搜不到机器名；别人编译的二进制（如 git 自带的 `bash.exe`）
  属性里照样显示本机名；改名、换目录后显示不变。发给别人时对方看到的是对方自己的机器名。
  **只有当这一栏显示「别人的」机器名时才需要查** —— 那才是真存在文件里的数据。
- `.md` / `.txt` / 代码文件永远不处理 —— 它们没有文件属性元信息
- 文档清理后，Word 再打开编辑保存会重新写入作者 —— 这是 Office 的行为，不是没清
- `revision` 读出来是 0、时间是 None —— python-docx/openpyxl 对缺失字段的默认值，说明已清
- `docProps/custom.xml`（自定义属性）不处理 —— 极小众，实测 41 个 Office 文件零命中

## 不要做的事

- 别为了「验证」去手改 `settings.json` —— 下次插件重扫会覆盖
- 别把 `sanitize.py` 复制到插件目录外再改 —— 宿主只跑插件目录里的那份
