#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import threading
import types

from EasySpider.DB import DB
from EasySpider.Proxy.ProxyManage import ProxyManage
from EasySpider.Spider import Spider
from .Base import Base
from .Log import PrintLog, Log
from Web import Web
from .Base.Thread import ThreadManage
from Base.Content import Content


class Core(Base):
    """
    核心类
    """

    def __init__(self, log=PrintLog, web=Web, db=DB, proxy=ProxyManage):
        self.set_content(Content())
        Base.__init__(self, self.content)
        self.spider_list = []
        self.content.set_log(log)
        self.content.set_web(web, content=self.content)
        self.content.set_db(db, content=self.content)
        self.content.set_proxy(proxy, content=self.content)
        self.content.start()

    def add_spider(self, spider):
        """
        添加线程管理器实例
        """
        if not isinstance(spider, Spider):
            spider = spider(self.content)
        assert isinstance(spider, Spider)
        spider.set_content(self.content)
        self.spider_list.append(spider)
        return spider

    def stop(self, spider=None):
        """
        停止某个或者所有爬虫
        :type spider Spider
        """
        if spider is None:
            for s in self.spider_list:
                assert isinstance(s, Spider)
                s.stop()
        else:
            assert isinstance(spider, Spider)
            spider.stop()

    def start(self, spider=None):
        """
        启动某个或全部爬虫
        """
        if spider is None:
            for s in self.spider_list:
                assert isinstance(s, Spider)
                s.start()
        else:
            assert isinstance(spider, Spider)
            spider.start()

    def stop_core(self):
        self.content.stop()

    def reload(self, spider):
        """
        热更新某个爬虫
        """
        assert issubclass(spider, Spider)
        import sys

        for spider_thread in self.spider_list:
            if isinstance(spider_thread, spider):
                reload(sys.modules[spider.__module__])
                spider = getattr(sys.modules[spider.__module__], spider.__name__)
                state = spider_thread.state
                spider_thread.stop()
                self.spider_list.remove(spider_thread)
                new_spider_thread = self.add_spider(spider)
                new_spider_thread.load(spider_thread.spider_func_queue_dict)
                if state:
                    new_spider_thread.start()

