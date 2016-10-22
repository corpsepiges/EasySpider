#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 9:24
# @Author  : wplct
import requests

from ..Base.Base import Base
from EasySpider.Base.Thread.ThreadManage import ThreadManage
from WebTask import WebTask
from Download import Download


class Web(Base):
    WebTask = WebTask

    def __init__(self, content, num=300, thread_class=Download):
        Base.__init__(self, content=content)
        self.web_thread_manage = ThreadManage(content=content, num=num, thread_class=thread_class)
        # todo 改为全局变量
        self.proxy_thread_manage = ThreadManage(content=content, num=num, thread_class=thread_class)

    def put(self, task):
        assert isinstance(task, WebTask)
        if task.test_proxies:
            self.proxy_thread_manage.put(task)
        else:
            self.web_thread_manage.put(task)
        return task

    def start(self):
        """
        启动所有线程
        """
        self.state = True
        self.web_thread_manage.start()
        self.proxy_thread_manage.start()

    def stop(self):
        if self.state:
            self.web_thread_manage.stop()
            self.proxy_thread_manage.stop()
        self.state = False

    def send(self, request, *args, **kwargs):
        return WebTask(request=request, *args, **kwargs)

    def get(self, url, proxy=False, proxies=None, task_data=None, show_log=True, block=False, *args, **kwargs):
        request = requests.Request(method="get", url=url, *args, **kwargs)
        return self.send(request=request, proxy=proxy, proxies=proxies, data=task_data, show_log=show_log, block=block)

    def post(self, url, proxy=False, proxies=None, task_data=None, show_log=True, block=False, *args, **kwargs):
        request = requests.Request(method="post", url=url, *args, **kwargs)
        return self.send(request=request, proxy=proxy, proxies=proxies, data=task_data, show_log=show_log, block=block)
