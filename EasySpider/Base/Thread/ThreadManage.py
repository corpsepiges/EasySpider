#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import Queue

from ..Base import Base
from ..Thread import RunQueueThread


class ThreadManage(Base):
    """
    线程管理器，
    包含一些线程以及一个任务队列
    """

    def __init__(self,content, num=8, thread_class=RunQueueThread, *args, **kwargs):
        Base.__init__(self,content=content, *args, **kwargs)
        self.num = num
        self.list = []
        self.thread_class = thread_class
        self.state = False
        self.queue = Queue.Queue()
        self.init_list()

    def start(self):
        """
        启动所有线程
        """
        self.state = True
        for thread in self.list:
            assert isinstance(thread, RunQueueThread)
            thread.start()

    def stop(self):
        if self.state:
            for thread in self.list:
                assert isinstance(thread, RunQueueThread)
                thread.stop()
        self.state = False

    def put(self, task):
        """
        添加任务
        """
        self.queue.put(task)

    def init_list(self):
        """
        初始化线程列表
        """
        # todo 添加修改线程数量的方法
        self.list = []
        for i in range(self.num):
            thread = self.thread_class(queue=self.queue,content=self.content)
            thread.set_content(self.content)
            self.list.append(thread)
