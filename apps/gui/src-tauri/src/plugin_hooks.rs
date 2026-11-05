// ── 插件贡献的引擎钩子 ──
//
// 插件在 manifest 的 `contributes.hooks` 里声明"某个脚本要在引擎的某个时机跑"，
// 宿主把它翻译成 `~/.claude/settings.json` 的 hooks 条目。
//
// 为什么走**全量对账**而不是"安装时写一次"：
//   - 插件被禁用/卸载、用户手改了 settings.json、插件目录换了位置 ——
//     增量维护都要各自处理一遍，而每条漏掉的表现都是"钩子还在跑/消失了"；
//   - 对账只有一个真理：**当前启用的插件集合**。每次重扫重建即可自愈。
//   这与技能链接（sync_plugin_skill_links）是同一套思路。
//
// 识别"哪些钩子是插件装的"：命令里含插件根目录路径。用户自己的钩子不会指向那里。

use std::path::{Path, PathBuf};

/// 前端传来的单条钩子声明（已通过 manifest 校验）。
#[derive(Debug, Clone, serde::Deserialize)]
pub struct PluginHookSpec {
    pub plugin: String,
    pub event: String,
    /// 插件目录内的相对路径
    pub script: String,
    /// python | bun | bash
    pub runner: String,
    #[serde(default)]
    pub timeout: Option<u32>,
    #[serde(default)]
    pub matcher: Option<String>,
}

/// 已解析成可执行命令的钩子（纯数据，便于单测）。
#[derive(Debug, Clone, PartialEq)]
pub struct BuiltHook {
    pub event: String,
    pub command: String,
    pub timeout: u32,
    pub matcher: Option<String>,
}

fn posix(p: &Path) -> String {
    p.to_string_lossy().replace('\\', "/")
}

/// 归一化用于"这条命令是不是插件装的"判断。
fn norm_for_match(s: &str) -> String {
    s.replace('\\', "/").to_lowercase()
}

/// 把声明翻译成真正能跑的命令。
///
/// - 路径一律转 POSIX 形式：引擎在 Windows 上固定用 Git Bash 执行钩子命令，
///   反斜杠会被当成转义字符吃掉。
/// - `--settings-dir` / `--plugin` 是给脚本读插件设置用的；路径稳定，内容每次现读。
pub fn build_hooks(
    specs: &[PluginHookSpec],
    plugins_dir: &Path,
    python: &Path,
    bun: &Path,
    settings_dir: &Path,
) -> Vec<BuiltHook> {
    let mut out = Vec::new();
    for s in specs {
        // 再挡一次穿越：前端已校验，这里是最终防线（manifest 是不可信输入）。
        let parts: Vec<&str> = s.script.split(['/', '\\']).collect();
        if parts.contains(&"..") || s.script.starts_with('/') || s.script.starts_with('\\') {
            continue;
        }
        let script_abs = plugins_dir.join(&s.plugin).join(&s.script);
        let script_s = posix(&script_abs);
        let command = match s.runner.as_str() {
            "python" => format!(
                "\"{}\" \"{}\" --plugin \"{}\" --settings-dir \"{}\"",
                posix(python),
                script_s,
                s.plugin,
                posix(settings_dir)
            ),
            "bash" => format!("bash \"{}\"", script_s),
            _ => format!("\"{}\" \"{}\"", posix(bun), script_s),
        };
        out.push(BuiltHook {
            event: s.event.clone(),
            command,
            timeout: s.timeout.unwrap_or(30).clamp(1, 300),
            matcher: s.matcher.clone().filter(|m| !m.trim().is_empty()),
        });
    }
    out
}

/// 一条 hook 条目是否是插件目录里的（命令指向插件根）。
fn is_plugin_command(cmd: &str, plugins_norm: &str) -> bool {
    norm_for_match(cmd).contains(plugins_norm)
}

/// 全量对账：删掉所有指向插件根的钩子，再按 specs 重建。
///
/// 返回 (新增, 删除) 条数。**幂等** —— 同样的输入跑两次，文件内容不变。
pub fn reconcile(root: &mut serde_json::Value, hooks: &[BuiltHook], plugins_dir: &Path) -> (usize, usize) {
    let plugins_norm = norm_for_match(&posix(plugins_dir));

    let Some(obj) = root.as_object_mut() else { return (0, 0) };
    let hooks_val = obj
        .entry("hooks")
        .or_insert_with(|| serde_json::json!({}));
    let Some(hooks_obj) = hooks_val.as_object_mut() else {
        // hooks 不是对象（用户写坏了）—— 不覆盖，交给引擎报错
        return (0, 0);
    };

    // 1. 清掉旧的插件钩子
    let mut removed = 0usize;
    let events: Vec<String> = hooks_obj.keys().cloned().collect();
    for event in events {
        let Some(arr) = hooks_obj.get_mut(&event).and_then(|v| v.as_array_mut()) else {
            continue;
        };
        let mut kept: Vec<serde_json::Value> = Vec::with_capacity(arr.len());
        for entry in arr.drain(..) {
            let Some(list) = entry.get("hooks").and_then(|h| h.as_array()) else {
                kept.push(entry);
                continue;
            };
            let ours = list.iter().any(|h| {
                h.get("command")
                    .and_then(|c| c.as_str())
                    .map(|c| is_plugin_command(c, &plugins_norm))
                    .unwrap_or(false)
            });
            if ours {
                removed += 1;
            } else {
                kept.push(entry);
            }
        }
        *arr = kept;
        if arr.is_empty() {
            hooks_obj.remove(&event);
        }
    }

    // 2. 按 specs 重建
    let mut added = 0usize;
    for h in hooks {
        let entry = match &h.matcher {
            Some(m) => serde_json::json!({
                "matcher": m,
                "hooks": [{ "type": "command", "command": h.command, "timeout": h.timeout }]
            }),
            None => serde_json::json!({
                "hooks": [{ "type": "command", "command": h.command, "timeout": h.timeout }]
            }),
        };
        let arr = hooks_obj
            .entry(h.event.clone())
            .or_insert_with(|| serde_json::json!([]));
        match arr.as_array_mut() {
            Some(list) => {
                list.push(entry);
                added += 1;
            }
            None => {
                // 该事件键存在但不是数组 —— 不覆盖用户数据
                continue;
            }
        }
    }

    if hooks_obj.is_empty() {
        obj.remove("hooks");
    }
    (added, removed)
}

/// 落盘：内容没变就不写（避免每次重扫都改 mtime）。
pub fn write_if_changed(path: &Path, root: &serde_json::Value) -> Result<bool, String> {
    let next = serde_json::to_string_pretty(root).map_err(|e| e.to_string())? + "\n";
    if let Ok(cur) = std::fs::read_to_string(path) {
        if cur == next {
            return Ok(false);
        }
    }
    if let Some(dir) = path.parent() {
        let _ = std::fs::create_dir_all(dir);
    }
    std::fs::write(path, next).map_err(|e| format!("写入失败: {}", e))?;
    Ok(true)
}

// ── Tauri 命令 ──

fn app_plugins_dir(app: &tauri::AppHandle) -> PathBuf {
    use tauri::Manager;
    app.path()
        .app_data_dir()
        .unwrap_or_else(|_| std::env::temp_dir().join("claude-code-gui"))
        .join("plugins")
}

fn app_settings_dir(app: &tauri::AppHandle) -> PathBuf {
    use tauri::Manager;
    app.path()
        .app_data_dir()
        .unwrap_or_else(|_| std::env::temp_dir().join("claude-code-gui"))
        .join("plugins-settings")
}

/// 解析内置运行时（bundled python / bun），都在 GUI exe 同目录。
fn runtime_paths() -> (PathBuf, PathBuf) {
    let dir = std::env::current_exe()
        .ok()
        .and_then(|p| p.parent().map(|d| d.to_path_buf()))
        .unwrap_or_else(|| PathBuf::from("."));
    if cfg!(target_os = "windows") {
        (dir.join("python").join("python.exe"), dir.join("bun.exe"))
    } else {
        (dir.join("python").join("bin").join("python3"), dir.join("bun"))
    }
}

/// 前台传入**当前启用插件**的钩子声明，宿主据此重建 settings.json 的那部分。
/// 返回 { added, removed, written } 供前端记日志。
#[tauri::command]
pub fn sync_plugin_hooks(
    app: tauri::AppHandle,
    specs: Vec<PluginHookSpec>,
) -> Result<serde_json::Value, String> {
    let plugins_dir = app_plugins_dir(&app);
    let settings_dir = app_settings_dir(&app);
    let (python, bun) = runtime_paths();
    let built = build_hooks(&specs, &plugins_dir, &python, &bun, &settings_dir);

    let path = crate::settings::global_settings_path();
    let mut root: serde_json::Value = std::fs::read_to_string(&path)
        .ok()
        .and_then(|c| serde_json::from_str(&c).ok())
        .unwrap_or_else(|| serde_json::json!({}));
    if !root.is_object() {
        return Err("settings.json 顶层不是对象，拒绝改写".into());
    }

    let (added, removed) = reconcile(&mut root, &built, &plugins_dir);
    let written = write_if_changed(&path, &root)?;
    Ok(serde_json::json!({
        "added": added,
        "removed": removed,
        "written": written,
        "path": path.to_string_lossy(),
    }))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn hook(cmd: &str) -> serde_json::Value {
        serde_json::json!({ "hooks": [{ "type": "command", "command": cmd, "timeout": 10 }] })
    }

    #[test]
    fn builds_posix_python_command() {
        let specs = vec![PluginHookSpec {
            plugin: "doc-metadata".into(),
            event: "Stop".into(),
            script: "sanitize.py".into(),
            runner: "python".into(),
            timeout: Some(60),
            matcher: None,
        }];
        let built = build_hooks(
            &specs,
            Path::new("C:\\AppData\\plugins"),
            Path::new("C:\\Program Files\\App\\python\\python.exe"),
            Path::new("C:\\Program Files\\App\\bun.exe"),
            Path::new("C:\\AppData\\plugins-settings"),
        );
        assert_eq!(built.len(), 1);
        let h = &built[0];
        assert_eq!(h.event, "Stop");
        assert_eq!(h.timeout, 60);
        // 反斜杠必须转成正斜杠 —— Git Bash 下反斜杠是转义字符
        assert!(!h.command.contains('\\'), "命令里不能有反斜杠: {}", h.command);
        assert!(h.command.contains("sanitize.py"));
        assert!(h.command.contains("--plugin \"doc-metadata\""));
    }

    #[test]
    fn rejects_traversal_script() {
        let specs = vec![PluginHookSpec {
            plugin: "p".into(),
            event: "Stop".into(),
            script: "../../evil.py".into(),
            runner: "python".into(),
            timeout: None,
            matcher: None,
        }];
        let built = build_hooks(
            &specs,
            Path::new("/plugins"),
            Path::new("/python"),
            Path::new("/bun"),
            Path::new("/settings"),
        );
        assert!(built.is_empty(), "穿越路径必须被拒");
    }

    #[test]
    fn reconcile_keeps_user_hooks_and_replaces_plugin_hooks() {
        let plugins = Path::new("C:\\Users\\u\\AppData\\plugins");
        let mut root = serde_json::json!({
            "hooks": {
                "Stop": [
                    hook("echo mine"),
                    hook("python \"C:/Users/u/AppData/plugins/old/hook.py\""),
                ]
            }
        });
        let built = vec![BuiltHook {
            event: "Stop".into(),
            command: "python \"C:/Users/u/AppData/plugins/new/hook.py\"".into(),
            timeout: 30,
            matcher: None,
        }];
        let (added, removed) = reconcile(&mut root, &built, plugins);

        assert_eq!((added, removed), (1, 1));
        let stop = root["hooks"]["Stop"].as_array().unwrap();
        assert_eq!(stop.len(), 2, "用户那条 + 新装的那条");
        let cmds: Vec<&str> = stop
            .iter()
            .map(|e| e["hooks"][0]["command"].as_str().unwrap())
            .collect();
        assert!(cmds.contains(&"echo mine"), "用户钩子不能被删");
        assert!(cmds.iter().any(|c| c.contains("/new/hook.py")));
        assert!(!cmds.iter().any(|c| c.contains("/old/hook.py")));
    }

    #[test]
    fn reconcile_removes_emptied_event_key() {
        let plugins = Path::new("/plugins");
        let mut root = serde_json::json!({
            "hooks": { "Stop": [hook("python \"/plugins/a/hook.py\"")] }
        });
        reconcile(&mut root, &[], plugins);
        assert!(root["hooks"].get("Stop").is_none(), "空事件键应被移除");
    }

    #[test]
    fn reconcile_is_idempotent() {
        let plugins = Path::new("/plugins");
        let built = vec![BuiltHook {
            event: "Stop".into(),
            command: "python \"/plugins/p/hook.py\"".into(),
            timeout: 30,
            matcher: None,
        }];
        let mut a = serde_json::json!({});
        reconcile(&mut a, &built, plugins);
        let first = serde_json::to_string(&a).unwrap();
        reconcile(&mut a, &built, plugins);
        assert_eq!(first, serde_json::to_string(&a).unwrap(), "重复对账结果不变");
    }

    #[test]
    fn reconcile_preserves_non_plugin_hook_events() {
        let plugins = Path::new("/plugins");
        let mut root = serde_json::json!({
            "hooks": {
                "SessionStart": [hook("bash ~/my-hook.sh")],
                "PostToolUse": [{ "matcher": "Read", "hooks": [{ "type": "command", "command": "cbm gate" }] }]
            }
        });
        reconcile(&mut root, &[], plugins);
        assert_eq!(root["hooks"]["SessionStart"].as_array().unwrap().len(), 1);
        assert_eq!(root["hooks"]["PostToolUse"].as_array().unwrap().len(), 1);
    }

    #[test]
    fn reconcile_respects_matcher() {
        let plugins = Path::new("/plugins");
        let built = vec![BuiltHook {
            event: "PostToolUse".into(),
            command: "python \"/plugins/p/hook.py\"".into(),
            timeout: 5,
            matcher: Some("Write|Edit".into()),
        }];
        let mut root = serde_json::json!({});
        reconcile(&mut root, &built, plugins);
        assert_eq!(root["hooks"]["PostToolUse"][0]["matcher"], "Write|Edit");
    }
}
