#!/usr/bin/env python
"""文档元信息清理 —— Stop hook。

AI 生成文档后，自动抹除文件里的**元信息**（作者、公司、版本号、修订号、
创建/修改时间、缩略图……），然后**回读验证**确实抹掉了；验证不过就拦住会话，
让 AI 补上，而不是让用户拿着一份带着内部信息却看起来正常的文件发出去。

覆盖：
  .docx/.xlsx/.pptx  OOXML，改 docProps/core.xml + docProps/app.xml，删缩略图
  .pdf               Info 字典 + XMP（优先 pymupdf，其次原地等长覆写）
  .jpg/.jpeg/.png    EXIF / XMP / IPTC / 文本块（字节级，不重新编码，画质无损）

设计约束（改之前先读）：
  · **fail-open**：脚本自身出任何错都放行。会话卡住比漏提醒糟糕得多。
  · **不碰非目标**：只处理本轮明确出现的文件，或设置里指定范围内新产生/改动的。
  · **纯标准库优先**：Office/图片零依赖；PDF 的 pymupdf 是可选加成。
  · 改写一律「同目录临时文件 → os.replace」，中途失败不会留下半截文件。
"""

import argparse
import json
import os
import re
import sys
import time
import zipfile

PLUGIN = "doc-metadata"

OOXML_EXTS = {".docx", ".xlsx", ".pptx"}
IMAGE_EXTS = {".jpg", ".jpeg", ".png"}
PDF_EXTS = {".pdf"}
SUPPORTED_EXTS = OOXML_EXTS | IMAGE_EXTS | PDF_EXTS

# 目录扫描时跳过的名字（体积大、几乎不可能放用户文档）
SKIP_DIRS = {
    ".git", ".claude", "node_modules", "__pycache__", ".venv", "venv",
    "dist", "build", "target", ".next", ".cache", ".codegraph",
}

# ── 设置 ──────────────────────────────────────────────────────────

DEFAULTS = {
    # touched   = 只处理本轮工具调用里出现过的文件
    # newOnly   = 工作区里本轮**新建**的文件（旧文件不动）
    # workspace = 工作区里本轮**改动过**的文件
    "scope": "touched",
    # 抹除后写回的作者 / 公司。留空 = 彻底删掉该字段。
    "author": "",
    "company": "",
    # 是否保留创建/修改时间（默认连时间一起抹掉）
    "keepTimestamps": False,
}


def load_settings(settings_dir, cwd):
    """全局 <settings_dir>/<plugin>.json，工作区 <cwd>/.claude/plugins-settings 覆盖。"""
    merged = dict(DEFAULTS)
    paths = []
    if settings_dir:
        paths.append(os.path.join(settings_dir, PLUGIN + ".json"))
    if cwd:
        paths.append(os.path.join(cwd, ".claude", "plugins-settings", PLUGIN + ".json"))
    for p in paths:
        try:
            with open(p, encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict):
                for k in DEFAULTS:
                    if k in data:
                        merged[k] = data[k]
        except Exception:
            continue
    if merged.get("scope") not in ("touched", "newOnly", "workspace"):
        merged["scope"] = DEFAULTS["scope"]
    merged["keepTimestamps"] = bool(merged.get("keepTimestamps"))
    merged["author"] = str(merged.get("author") or "")
    merged["company"] = str(merged.get("company") or "")
    return merged


# ── 从 transcript 找"本轮"和"碰过的文件" ──────────────────────────

DOC_PATH_RE = re.compile(
    r"""(?:[A-Za-z]:[\\/]|/)[^"'<>\r\n\t|*?]*?\.(?:docx|xlsx|pptx|pdf|jpe?g|png)(?![A-Za-z0-9])""",
    re.IGNORECASE,
)
REL_PATH_RE = re.compile(
    r"""[^"'<>\r\n\t|*?\s]+?\.(?:docx|xlsx|pptx|pdf|jpe?g|png)(?![A-Za-z0-9])""",
    re.IGNORECASE,
)


def _is_real_user_prompt(obj):
    if obj.get("type") != "user":
        return False
    if obj.get("isMeta"):
        return False
    msg = obj.get("message") or {}
    content = msg.get("content")
    if isinstance(content, str):
        return bool(content.strip()) and not content.lstrip().startswith("<system-reminder>")
    if isinstance(content, list):
        return not any(
            isinstance(b, dict) and b.get("type") == "tool_result" for b in content
        )
    return False


def _walk_strings(value, out, depth=0):
    if depth > 8:
        return
    if isinstance(value, str):
        out.append(value)
    elif isinstance(value, dict):
        for v in value.values():
            _walk_strings(v, out, depth + 1)
    elif isinstance(value, list):
        for v in value:
            _walk_strings(v, out, depth + 1)


def _parse_ts(obj):
    t = obj.get("timestamp")
    if not isinstance(t, str):
        return None
    try:
        # 2026-11-05T10:00:00.000Z
        return time.mktime(time.strptime(t[:19], "%Y-%m-%dT%H:%M:%S")) - time.timezone
    except Exception:
        return None


def read_turn(transcript_path, cwd):
    """返回 (本轮起始时间戳, 本轮出现过的路径集合)。失败返回 (None, set())。"""
    try:
        with open(transcript_path, encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
    except Exception:
        return None, set()

    start_idx = 0
    turn_start = None
    for i in range(len(lines) - 1, -1, -1):
        raw = lines[i].strip()
        if not raw:
            continue
        try:
            obj = json.loads(raw)
        except Exception:
            continue
        if _is_real_user_prompt(obj):
            start_idx = i
            turn_start = _parse_ts(obj)
            break

    strings = []
    for raw in lines[start_idx:]:
        raw = raw.strip()
        if not raw:
            continue
        try:
            obj = json.loads(raw)
        except Exception:
            continue
        msg = obj.get("message") or {}
        content = msg.get("content")
        if not isinstance(content, list):
            continue
        for block in content:
            if isinstance(block, dict) and block.get("type") == "tool_use":
                _walk_strings(block.get("input"), strings)

    paths = set()
    for s in strings:
        for m in DOC_PATH_RE.findall(s):
            paths.add(os.path.normpath(m))
        # 相对路径：只在看起来像路径（含分隔符）时采纳，避免把 "报告.docx" 当路径
        for m in REL_PATH_RE.findall(s):
            if m.startswith(("http://", "https://")):
                continue
            if ("/" in m or "\\" in m) and cwd:
                paths.add(os.path.normpath(os.path.join(cwd, m)))
    return turn_start, {p for p in paths if os.path.isfile(p)}


def scan_workspace(cwd, since, mode):
    """mode: newOnly（按创建时间）| workspace（按修改时间）。"""
    if not cwd or since is None:
        return set()
    out = set()
    for root, dirs, files in os.walk(cwd):
        dirs[:] = [d for d in dirs if d.lower() not in SKIP_DIRS and not d.startswith(".")]
        for name in files:
            ext = os.path.splitext(name)[1].lower()
            if ext not in SUPPORTED_EXTS:
                continue
            full = os.path.join(root, name)
            try:
                st = os.stat(full)
            except OSError:
                continue
            # Windows 上 st_ctime 是创建时间；Unix 上是 inode 变更时间（近似）
            ts = st.st_ctime if mode == "newOnly" else st.st_mtime
            if ts >= since:
                out.add(os.path.normpath(full))
    return out


# ── 结果 ──────────────────────────────────────────────────────────


class Result:
    def __init__(self, path):
        self.path = path
        self.ok = False      # 处理成功且验证通过
        self.unsupported = ""  # 无法安全处理的原因（≠ 失败，但要告诉用户）
        self.error = ""
        self.fields = []     # 实际抹掉的字段
        self.not_changed = False

    def to_dict(self):
        d = {"file": self.path, "ok": self.ok, "fields": self.fields}
        if self.unsupported:
            d["unsupported"] = self.unsupported
        if self.error:
            d["error"] = self.error
        if self.not_changed:
            d["unchanged"] = True
        return d


def _atomic_write(path, data):
    d = os.path.dirname(path) or "."
    tmp = os.path.join(d, ".%s.tmp-%d" % (os.path.basename(path), os.getpid()))
    with open(tmp, "wb") as f:
        f.write(data)
    try:
        st = os.stat(path)
        os.utime(tmp, (st.st_atime, st.st_mtime))
    except OSError:
        pass
    os.replace(tmp, path)


# ── OOXML ─────────────────────────────────────────────────────────

import xml.etree.ElementTree as ET

NS_CORE = {
    "cp": "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    "dc": "http://purl.org/dc/elements/1.1/",
    "dcterms": "http://purl.org/dc/terms/",
}
NS_APP = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"

# 保留原有前缀 —— ElementTree 默认会改写成 ns0:/ns1:，虽然语义等价，
# 但 Office 对 core.xml/app.xml 的写法更挑剔，保持原样最稳。
ET.register_namespace("cp", NS_CORE["cp"])
ET.register_namespace("dc", NS_CORE["dc"])
ET.register_namespace("dcterms", NS_CORE["dcterms"])
ET.register_namespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
ET.register_namespace("", NS_APP)

# core.xml 里「标识谁/什么时候/哪个版本」的字段
CORE_SENSITIVE = ["title", "subject", "creator", "keywords", "description",
                  "lastModifiedBy", "revision", "category", "contentStatus",
                  "version", "lastPrinted", "identifier", "language"]
CORE_TIMESTAMPS = ["created", "modified"]
# app.xml 里的
APP_SENSITIVE = ["Company", "Manager", "Application", "AppVersion", "Template",
                 "TotalTime", "HyperlinkBase"]


def _q(ns, tag):
    return "{%s}%s" % (ns, tag)


def _sanitize_core_xml(raw, cfg):
    removed = []
    root = ET.fromstring(raw)
    for child in list(root):
        tag = child.tag
        local = tag.rsplit("}", 1)[-1]
        if local in CORE_TIMESTAMPS:
            if cfg["keepTimestamps"]:
                continue
            root.remove(child)
            removed.append(local)
            continue
        if local not in CORE_SENSITIVE:
            continue
        new_val = ""
        if local in ("creator", "lastModifiedBy"):
            new_val = cfg["author"]
        if new_val:
            child.text = new_val
            removed.append(local)
            continue
        root.remove(child)
        removed.append(local)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True), removed


def _sanitize_app_xml(raw, cfg):
    removed = []
    root = ET.fromstring(raw)
    for child in list(root):
        local = child.tag.rsplit("}", 1)[-1]
        if local not in APP_SENSITIVE:
            continue
        if local == "Company" and cfg["company"]:
            child.text = cfg["company"]
            removed.append(local)
            continue
        root.remove(child)
        removed.append(local)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True), removed


THUMBNAIL_RE = re.compile(rb"<Relationship[^>]*Target=\"[^\"]*thumbnail[^\"]*\"[^>]*/>", re.I)


def sanitize_ooxml(path, cfg):
    res = Result(path)
    try:
        with zipfile.ZipFile(path) as z:
            names = z.namelist()
            payload = {n: z.read(n) for n in names}
    except Exception as e:
        res.error = "不是有效的 Office 文件: %s" % e
        return res

    changed = False

    for entry, fn in (("docProps/core.xml", _sanitize_core_xml),
                      ("docProps/app.xml", _sanitize_app_xml)):
        if entry in payload:
            try:
                new_bytes, removed = fn(payload[entry], cfg)
            except Exception as e:
                res.error = "%s 解析失败: %s" % (entry, e)
                return res
            if removed:
                res.fields.extend(removed)
            # 只有**字节真的变了**才算改动 —— 否则每次重跑都重写一遍文件，
            # 既改 mtime 又白费 I/O（幂等性要求）。
            if new_bytes != payload[entry]:
                changed = True
                payload[entry] = new_bytes

    # 缩略图能泄露正文（Word 存的是第一页渲染图）—— 连关系一起删，
    # 否则 _rels/.rels 里留下指向不存在文件的悬空关系。
    for n in list(payload):
        if n.lower().startswith("docprops/thumbnail"):
            payload.pop(n, None)
            res.fields.append(n)
            changed = True
    if "_rels/.rels" in payload:
        new_rels = THUMBNAIL_RE.sub(b"", payload["_rels/.rels"])
        if new_rels != payload["_rels/.rels"]:
            payload["_rels/.rels"] = new_rels
            changed = True

    if not changed:
        res.not_changed = True
        res.ok = True
        return res

    import io
    buf = io.BytesIO()
    try:
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as out:
            for n in names:
                if n in payload:
                    out.writestr(n, payload[n])
            for n in payload:
                if n not in names:
                    out.writestr(n, payload[n])
    except Exception as e:
        res.error = "重写失败: %s" % e
        return res

    try:
        _atomic_write(path, buf.getvalue())
    except Exception as e:
        res.error = "写盘失败（文件可能被占用）: %s" % e
        return res

    res.ok = True
    return res


def verify_ooxml(path, cfg):
    """重新打开文件核对：敏感字段必须都不在了（或等于配置的写入值）。"""
    try:
        with zipfile.ZipFile(path) as z:
            names = z.namelist()
            leaks = []
            for n in names:
                if n.lower().startswith("docprops/thumbnail"):
                    leaks.append("缩略图仍在: " + n)
            core = z.read("docProps/core.xml") if "docProps/core.xml" in names else None
            app = z.read("docProps/app.xml") if "docProps/app.xml" in names else None
    except Exception as e:
        return ["无法回读: %s" % e]

    if core:
        try:
            root = ET.fromstring(core)
            for child in root:
                local = child.tag.rsplit("}", 1)[-1]
                text = (child.text or "").strip()
                if local in CORE_TIMESTAMPS:
                    if not cfg["keepTimestamps"]:
                        leaks.append("时间字段仍在: " + local)
                    continue
                if local not in CORE_SENSITIVE:
                    continue
                expect = cfg["author"] if local in ("creator", "lastModifiedBy") else ""
                if text and text != expect:
                    leaks.append("%s=%r" % (local, text))
        except Exception as e:
            leaks.append("core.xml 不可解析: %s" % e)

    if app:
        try:
            root = ET.fromstring(app)
            for child in root:
                local = child.tag.rsplit("}", 1)[-1]
                if local not in APP_SENSITIVE:
                    continue
                text = (child.text or "").strip()
                if not text:
                    continue
                if local == "Company" and text == cfg["company"]:
                    continue
                leaks.append("%s=%r" % (local, text))
        except Exception as e:
            leaks.append("app.xml 不可解析: %s" % e)
    return leaks


# ── 图片（字节级，不重新编码）─────────────────────────────────────


def sanitize_jpeg(path):
    res = Result(path)
    try:
        data = open(path, "rb").read()
    except Exception as e:
        res.error = "读失败: %s" % e
        return res
    if not data.startswith(b"\xff\xd8"):
        res.error = "不是 JPEG"
        return res

    out = bytearray(data[:2])
    i = 2
    removed = 0
    n = len(data)
    while i + 4 <= n:
        if data[i] != 0xFF:
            out.extend(data[i:])
            break
        marker = data[i + 1]
        if marker in (0xD8, 0xD9) or 0xD0 <= marker <= 0xD7:
            out.extend(data[i:i + 2])
            i += 2
            if marker == 0xD9:
                break
            continue
        seg_len = int.from_bytes(data[i + 2:i + 4], "big")
        if seg_len < 2 or i + 2 + seg_len > n:
            out.extend(data[i:])
            break
        seg = data[i:i + 2 + seg_len]
        payload = data[i + 4:i + 2 + seg_len]
        drop = False
        if marker == 0xE1 and (payload.startswith(b"Exif\x00\x00")
                               or payload.startswith(b"http://ns.adobe.com/xap/1.0/")):
            drop = True
        elif marker == 0xED:  # APP13 IPTC / Photoshop
            drop = True
        elif marker == 0xFE:  # COM 注释
            drop = True
        elif marker == 0xE2 and payload.startswith(b"ICC_PROFILE\x00"):
            drop = False  # 色彩配置文件保留（不是身份信息）
        if drop:
            removed += 1
            res.fields.append("APP%d(0x%02X)" % (marker - 0xE0 if marker >= 0xE0 else marker, marker))
        else:
            out.extend(seg)
        i += 2 + seg_len
    else:
        out.extend(data[i:])

    if removed == 0:
        res.not_changed = True
        res.ok = True
        return res
    try:
        _atomic_write(path, bytes(out))
    except Exception as e:
        res.error = "写盘失败: %s" % e
        return res
    res.ok = True
    return res


# 只删**身份/时间**类块。pHYs（像素密度）之类不属于元信息，动了只会改变显示效果。
PNG_TEXT_CHUNKS = {b"eXIf", b"tEXt", b"iTXt", b"zTXt", b"tIME"}


def sanitize_png(path):
    res = Result(path)
    try:
        data = open(path, "rb").read()
    except Exception as e:
        res.error = "读失败: %s" % e
        return res
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        res.error = "不是 PNG"
        return res

    out = bytearray(data[:8])
    i = 8
    removed = 0
    n = len(data)
    while i + 8 <= n:
        length = int.from_bytes(data[i:i + 4], "big")
        ctype = data[i + 4:i + 8]
        end = i + 12 + length
        if end > n:
            out.extend(data[i:])
            break
        if ctype in PNG_TEXT_CHUNKS:
            removed += 1
            res.fields.append(ctype.decode("ascii", "replace"))
        else:
            out.extend(data[i:end])
        i = end
        if ctype == b"IEND":
            break
    else:
        out.extend(data[i:])

    if removed == 0:
        res.not_changed = True
        res.ok = True
        return res
    try:
        _atomic_write(path, bytes(out))
    except Exception as e:
        res.error = "写盘失败: %s" % e
        return res
    res.ok = True
    return res


def verify_image(path):
    try:
        data = open(path, "rb").read()
    except Exception as e:
        return ["无法回读: %s" % e]
    leaks = []
    if data.startswith(b"\xff\xd8"):
        i = 2
        n = len(data)
        while i + 4 <= n and data[i] == 0xFF:
            marker = data[i + 1]
            if marker in (0xD8, 0xD9) or 0xD0 <= marker <= 0xD7:
                i += 2
                if marker == 0xD9:
                    break
                continue
            seg_len = int.from_bytes(data[i + 2:i + 4], "big")
            if seg_len < 2:
                break
            payload = data[i + 4:i + 2 + seg_len]
            if marker == 0xE1 and (payload.startswith(b"Exif\x00\x00")
                                   or payload.startswith(b"http://ns.adobe.com/xap/1.0/")):
                leaks.append("EXIF/XMP 段仍在")
            if marker == 0xED:
                leaks.append("IPTC 段仍在")
            i += 2 + seg_len
    elif data.startswith(b"\x89PNG\r\n\x1a\n"):
        i = 8
        n = len(data)
        while i + 8 <= n:
            length = int.from_bytes(data[i:i + 4], "big")
            ctype = data[i + 4:i + 8]
            if ctype in PNG_TEXT_CHUNKS:
                leaks.append("%s 块仍在" % ctype.decode("ascii", "replace"))
            i += 12 + length
            if ctype == b"IEND":
                break
    return leaks


# ── PDF ───────────────────────────────────────────────────────────

PDF_INFO_KEYS = [b"/Author", b"/Title", b"/Subject", b"/Keywords",
                 b"/Creator", b"/Producer", b"/CreationDate", b"/ModDate"]


def _pdf_needs_clean(meta, cfg):
    """已经是目标状态就别动文件（幂等）。"""
    for k in ("author", "title", "subject", "keywords", "creator", "producer"):
        v = (meta.get(k) or "").strip()
        if not v:
            continue
        if k == "author" and v == cfg["author"]:
            continue
        return True
    if not cfg["keepTimestamps"]:
        if (meta.get("creationDate") or "").strip() or (meta.get("modDate") or "").strip():
            return True
    return False


def sanitize_pdf(path, cfg):
    res = Result(path)
    try:
        import pymupdf  # type: ignore
    except Exception:
        try:
            import fitz as pymupdf  # type: ignore
        except Exception:
            pymupdf = None

    if pymupdf is not None:
        try:
            doc = pymupdf.open(path)
            meta = doc.metadata or {}
            if not _pdf_needs_clean(meta, cfg):
                doc.close()
                res.not_changed = True
                res.ok = True
                return res
            doc.set_metadata({
                "author": cfg["author"], "title": "", "subject": "",
                "keywords": "", "creator": "", "producer": "",
                "creationDate": "" if not cfg["keepTimestamps"] else meta.get("creationDate", ""),
                "modDate": "" if not cfg["keepTimestamps"] else meta.get("modDate", ""),
            })
            try:
                doc.del_xml_metadata()
            except Exception:
                pass
            tmp = path + ".tmp-%d" % os.getpid()
            doc.save(tmp, garbage=4, deflate=True)
            doc.close()
            try:
                st = os.stat(path)
                os.utime(tmp, (st.st_atime, st.st_mtime))
            except OSError:
                pass
            os.replace(tmp, path)
            res.fields.append("Info")
            res.ok = True
            return res
        except Exception as e:
            res.error = "PDF 处理失败: %s" % e
            return res

    # 无 pymupdf：原地等长覆写（不改偏移、不重排 xref，风险最低）
    try:
        data = bytearray(open(path, "rb").read())
    except Exception as e:
        res.error = "读失败: %s" % e
        return res

    changed = 0
    # 1) Info 字典：把 << ... >> 的内部填成空格
    for m in re.finditer(rb"/Info\s+(\d+)\s+(\d+)\s+R", data):
        objnum = m.group(1)
        om = re.search(rb"(?<![0-9])" + objnum + rb"\s+\d+\s+obj\s*<<", data)
        if not om:
            continue
        start = om.end() - 2  # 指向 "<<"
        depth = 0
        j = start
        while j < len(data):
            if data[j:j + 2] == b"<<":
                depth += 1
                j += 2
                continue
            if data[j:j + 2] == b">>":
                depth -= 1
                if depth == 0:
                    break
                j += 2
                continue
            j += 1
        if depth != 0:
            continue
        inner_len = (j) - (start + 2)
        if inner_len > 0:
            data[start + 2:j] = b" " * inner_len
            changed += 1
    # 2) XMP：未压缩的 <x:xmpmeta> 整块换成最小合法包（等长填充）
    xmp = re.search(rb"<x:xmpmeta[^>]*>.*?</x:xmpmeta>", data, re.S)
    if xmp:
        start, end = xmp.start(), xmp.end()
        minimal = b'<x:xmpmeta xmlns:x="adobe:ns:meta/"></x:xmpmeta>'
        if len(minimal) <= end - start:
            data[start:end] = minimal + b" " * (end - start - len(minimal))
            changed += 1

    if changed == 0:
        res.unsupported = "结构不支持自动清理（Info 字典在对象流内或已加密）"
        return res

    try:
        _atomic_write(path, bytes(data))
    except Exception as e:
        res.error = "写盘失败: %s" % e
        return res
    res.fields.append("Info")
    res.ok = True
    return res


def _pdf_text(raw, is_hex):
    """PDF 字符串 → 文本。字面串可能带转义，十六进制串通常是 UTF-16BE。"""
    if is_hex:
        try:
            data = bytes.fromhex(re.sub(rb"[^0-9A-Fa-f]", b"", raw).decode("ascii"))
        except Exception:
            return ""
    else:
        data = raw.replace(b"\\(", b"(").replace(b"\\)", b")").replace(b"\\\\", b"\\")
    if data.startswith(b"\xfe\xff"):
        data = data[2:]
        try:
            return data.decode("utf-16-be", "replace")
        except Exception:
            return ""
    return data.decode("latin-1", "replace")


def _pdf_info_values(body):
    """从 Info 字典体里取出 `/Key value`（返回解码后的文本）。

    关键：**键存在但值为空**（`/Author ()`）是清理成功的正常形态 —— 不能因为
    看见 `/Author` 就判泄漏。这正是第一版 verify 的假阳性来源。
    """
    values = {}
    for key in PDF_INFO_KEYS:
        idx = body.find(key)
        if idx < 0:
            continue
        i = idx + len(key)
        n = len(body)
        while i < n and body[i:i + 1] in b" \r\n\t":
            i += 1
        if i >= n:
            values[key.decode()] = ""
            continue
        ch = body[i:i + 1]
        if ch == b"(":
            j = i + 1
            while j < n:
                if body[j:j + 1] == b"\\":
                    j += 2
                    continue
                if body[j:j + 1] == b")":
                    break
                j += 1
            values[key.decode()] = _pdf_text(body[i + 1:j], False)
        elif ch == b"<":
            j = body.find(b">", i + 1)
            if j < 0:
                j = n
            values[key.decode()] = _pdf_text(body[i + 1:j], True)
        elif ch == b"/":
            j = i + 1
            while j < n and body[j:j + 1] not in b" \r\n\t/<>[]()":
                j += 1
            values[key.decode()] = body[i + 1:j].decode("latin-1", "replace")
        else:
            values[key.decode()] = ""
    return values


def verify_pdf(path, cfg):
    try:
        data = open(path, "rb").read()
    except Exception as e:
        return ["无法回读: %s" % e]
    leaks = []
    for m in re.finditer(rb"/Info\s+(\d+)\s+(\d+)\s+R", data):
        objnum = m.group(1)
        om = re.search(rb"(?<![0-9])" + objnum + rb"\s+\d+\s+obj\s*<<", data)
        if not om:
            continue
        start = om.end() - 2
        depth = 0
        j = start
        while j < len(data):
            if data[j:j + 2] == b"<<":
                depth += 1
                j += 2
                continue
            if data[j:j + 2] == b">>":
                depth -= 1
                if depth == 0:
                    break
                j += 2
                continue
            j += 1
        body = data[start:j]
        for k, v in _pdf_info_values(body).items():
            if not v.strip():
                continue
            # 配置允许保留的值不算泄漏
            if k == "Author" and v == cfg["author"]:
                continue
            if k in ("CreationDate", "ModDate") and cfg["keepTimestamps"]:
                continue
            leaks.append("Info %s 仍有值" % k)
    if re.search(rb"<x:xmpmeta[^>]*>.*?(dc:creator|xmp:CreatorTool|pdf:Producer)[^>]*>[^<]*\S", data, re.S):
        leaks.append("XMP 仍含创作者信息")
    return leaks


# ── 调度 ──────────────────────────────────────────────────────────


def process(path, cfg):
    ext = os.path.splitext(path)[1].lower()
    if ext in OOXML_EXTS:
        res = sanitize_ooxml(path, cfg)
        if res.ok and not res.not_changed:
            leaks = verify_ooxml(path, cfg)
            if leaks:
                res.ok = False
                res.error = "验证未通过: " + "; ".join(leaks)
        return res
    if ext in IMAGE_EXTS:
        res = sanitize_jpeg(path) if ext in (".jpg", ".jpeg") else sanitize_png(path)
        if res.ok and not res.not_changed:
            leaks = verify_image(path)
            if leaks:
                res.ok = False
                res.error = "验证未通过: " + "; ".join(leaks)
        return res
    if ext in PDF_EXTS:
        res = sanitize_pdf(path, cfg)
        if res.ok and not res.not_changed:
            leaks = verify_pdf(path, cfg)
            if leaks:
                res.ok = False
                res.error = "验证未通过: " + "; ".join(leaks)
        return res
    res = Result(path)
    res.unsupported = "不支持的格式"
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--plugin", default=PLUGIN)
    ap.add_argument("--settings-dir", default="")
    args = ap.parse_args()

    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    if payload.get("stop_hook_active"):
        return 0
    if payload.get("hook_event_name") not in (None, "Stop"):
        return 0

    cwd = payload.get("cwd") or os.getcwd()
    cfg = load_settings(args.settings_dir, cwd)
    transcript = payload.get("transcript_path")

    turn_start, touched = read_turn(transcript, cwd) if transcript else (None, set())

    targets = set()
    if cfg["scope"] == "touched":
        targets = touched
    elif cfg["scope"] == "newOnly":
        targets = scan_workspace(cwd, turn_start, "newOnly") if turn_start else set()
    else:
        targets = scan_workspace(cwd, turn_start, "workspace") if turn_start else set()

    targets = {p for p in targets if os.path.isfile(p)}

    results = []
    for p in sorted(targets):
        try:
            results.append(process(p, cfg))
        except Exception as e:  # 单个文件失败不影响其它文件
            r = Result(p)
            r.error = "异常: %s" % e
            results.append(r)

    report = {
        "at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "scope": cfg["scope"],
        "done": [r.to_dict() for r in results if r.ok],
        "failed": [r.to_dict() for r in results if not r.ok and not r.unsupported],
        "unsupported": [r.to_dict() for r in results if r.unsupported],
    }
    try:
        if args.settings_dir:
            os.makedirs(args.settings_dir, exist_ok=True)
            with open(os.path.join(args.settings_dir, PLUGIN + ".last-run.json"), "w",
                      encoding="utf-8") as f:
                json.dump(report, f, ensure_ascii=True, indent=2)
    except Exception:
        pass

    failed = report["failed"]
    unsupported = report["unsupported"]
    if not failed and not unsupported:
        return 0

    parts = []
    if failed:
        parts.append("以下文件清理失败（或验证不通过）：")
        for r in failed:
            parts.append("  - %s: %s" % (r["file"], r.get("error") or "未知原因"))
    if unsupported:
        parts.append("以下文件无法自动清理，请告知用户：")
        for r in unsupported:
            parts.append("  - %s: %s" % (r["file"], r["unsupported"]))

    print(json.dumps({
        "decision": "block",
        "reason": "文档元信息未清理干净，请处理后结束：\n" + "\n".join(parts),
    }, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)  # fail-open：脚本自身出错绝不能卡住会话
