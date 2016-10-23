#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/10 9:06
# @Author  : wplct
import Queue
import threading

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..Base.Thread import BaseThread
from TestProxy import TestProxyManage
from QualityProxy import QualityProxy
from Entity import ProxyEntity, ProxyTest


class ProxyManage(BaseThread):
    def __init__(self, content):
        BaseThread.__init__(self, content=content)
        # 测试进程管理器
        self.test_manage = TestProxyManage(content=content)
        # 筛选代理进程，提供优质代理到队列里
        self.quality_proxy_queue = Queue.Queue()
        self.quality_thread = QualityProxy(content=content, quality_proxy_queue=self.quality_proxy_queue)

    def run(self):
        self.state = True
        self.test_manage.start()
        # self.quality_thread.start()

    def stop(self):
        self.state = False
        self.test_manage.stop()
        self.quality_thread.stop()

    def save(self, data):
        assert isinstance(data, (ProxyEntity, ProxyTest))
        self.content.db.save(data)

    def get(self):
        return self.quality_proxy_queue.get()

    def put(self, p):
        return self.quality_proxy_queue.put(p)
