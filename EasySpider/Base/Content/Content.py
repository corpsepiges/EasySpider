#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
from ...Proxy.ProxyManage import ProxyManage
from ...DB import DB
from ...Log import Log
from ...Web import Web
from ... import Config


class Content:
    """
    运行时对象，包含log
    """

    def __init__(self, log=None, web=None, db=None, proxy=None):
        self.log = log
        self.web = web
        self.db = db
        self.proxy = proxy
        self.debug = False
        self.config = Config

    def set_log(self, log):
        assert log is not None
        if isinstance(log, Log):
            self.log = log
        elif issubclass(log, Log):
            self.log = log()
        else:
            raise Exception("初始化log错误")

    def set_web(self, web, content):
        assert web is not None
        if isinstance(web, Web):
            self.web = web
        elif issubclass(web, Web):
            self.web = web(content)
        else:
            raise Exception("初始化web服务错误")

    def set_db(self, db, content):
        assert db is not None
        if isinstance(db, DB):
            self.db = db
        elif issubclass(db, DB):
            self.db = db(content)
        else:
            raise Exception("初始化数据库服务错误")

    def set_proxy(self, proxy, content):
        assert proxy is not None
        if isinstance(proxy, ProxyManage):
            self.proxy = proxy
        elif issubclass(proxy, ProxyManage):
            self.proxy = proxy(content)
        else:
            raise Exception("初始化代理服务错误")

    def stop(self):
        if self.web is not None:
            self.web.stop()
        if self.db is not None:
            self.db.stop()
        if self.proxy is not None:
            self.proxy.stop()
        if self.log is not None:
            self.log.stop()

    def start(self):
        if self.web is not None:
            self.web.start()
        if self.log is not None:
            self.log.start()
        if self.db is not None:
            self.db.start()
        if self.proxy is not None:
            self.proxy.start()
