"""公告（服务端消息）的模型层测试。

没有引入 pytest 以外的依赖：`models` 自己管 sqlite 连接，
这里只验证「增量游标」和「排序」这两个容易错的点。

跑法：python -m pytest test_announcements.py -q
"""

import os
import tempfile

import pytest

os.environ.setdefault("DB_PATH", tempfile.mktemp(suffix=".db"))

from server import models  # noqa: E402


@pytest.fixture(autouse=True)
def fresh_db():
    """每个用例一个干净库 —— 游标逻辑依赖自增 id，共享库会让断言不可靠。"""
    models.DB_PATH = tempfile.mktemp(suffix=".db")
    models.init_db()
    yield


def test_insert_and_list():
    models.insert_announcement("info", "标题", "正文", "")
    items = models.list_announcements(None, 50)
    assert len(items) == 1
    assert items[0]["title"] == "标题"
    assert items[0]["level"] == "info"


def test_incremental_by_cursor():
    a = models.insert_announcement("info", "A", "", "")
    b = models.insert_announcement("info", "B", "", "")
    c = models.insert_announcement("info", "C", "", "")

    assert [x["title"] for x in models.list_announcements(None, 50)] == ["A", "B", "C"]
    assert [x["title"] for x in models.list_announcements(a["uuid"], 50)] == ["B", "C"]
    assert [x["title"] for x in models.list_announcements(b["uuid"], 50)] == ["C"]
    assert [x["title"] for x in models.list_announcements(c["uuid"], 50)] == []


def test_same_second_inserts_are_not_skipped():
    """同一秒创建的多条必须都能被增量拿到。

    回归测试：第一版游标用 created_at（秒级），连插三条时间戳完全相同，
    `created_at > ?` 把它们全部漏掉 —— 实测增量返回空。
    """
    a = models.insert_announcement("info", "A", "", "")
    models.insert_announcement("info", "B", "", "")
    models.insert_announcement("info", "C", "", "")

    later = models.list_announcements(a["uuid"], 50)
    assert [x["title"] for x in later] == ["B", "C"], "同秒插入的公告被漏掉了"


def test_unknown_cursor_falls_back_to_latest():
    """游标 uuid 被删了 → 当没传，返回最近一批，不报错。"""
    models.insert_announcement("info", "A", "", "")
    items = models.list_announcements("不存在的-uuid", 50)
    assert len(items) == 1


def test_limit():
    for i in range(5):
        models.insert_announcement("info", f"n{i}", "", "")
    assert len(models.list_announcements(None, 3)) == 3


def test_delete():
    a = models.insert_announcement("info", "要删的", "", "")
    assert models.delete_announcement(a["uuid"]) is True
    assert models.delete_announcement(a["uuid"]) is False
    assert models.list_announcements(None, 50) == []


def test_levels_persist():
    for lv in ("info", "important", "critical"):
        models.insert_announcement(lv, lv, "", "")
    got = [x["level"] for x in models.list_announcements(None, 50)]
    assert got == ["info", "important", "critical"]
