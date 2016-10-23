#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import time

from Base.Thread import BaseThread, RunFunctionThread
from Web import WebTask
import requests
import Queue
from EasySpider.Base.Content import Content
from .DB.DBTask import DBTask
from EasySpider.Web import Web, WebTask
import functools


class SpiderThread(RunFunctionThread):
    def __init__(self, content, func, in_queue, out_queue_tuple=None, *args, **kwargs):
        assert hasattr(func, '__call__')
        assert isinstance(in_queue, Queue.Queue) or in_queue is None
        RunFunctionThread.__init__(self, func=func, queue=in_queue, content=content, *args, **kwargs)
        if out_queue_tuple is None:
            self.out_queue_tuple = None
        elif isinstance(out_queue_tuple, tuple):
            self.out_queue_tuple = out_queue_tuple
        else:
            self.out_queue_tuple = (out_queue_tuple,)

    def _run(self, data):
        task = self.func(data)
        if self.out_queue_tuple is not None and task is not None:
            if isinstance(task, tuple):
                for i in range(len(task)):
                    self.put_task_list(task[i], self.out_queue_tuple[i])
            else:
                self.put_task_list(task, self.out_queue_tuple[0] if len(self.out_queue_tuple) else None)

    def put_task_list(self, task, queue):
        if isinstance(task, list):
            for t in task:
                self.put_task(t, queue)
        else:
            self.put_task(task, queue)

    def put_task(self, task, queue):
        if task is None:
            return
        if isinstance(task, WebTask):
            task.result_queue = queue
            self.web.put(task)
        elif isinstance(task, DBTask):
            task.result_queue = queue
            self.db.put(task)
        else:
            if queue is not None:
                queue.put(task)


class SpiderFunc(object):
    def __init__(self, func_type, func, next_func):
        """
        :param next_func 运行完当前方法，接下来该的方法，可以有多个
        :type next_func tuple or str 方法名或方法名元组
        :param func_type 方法类型 默认为 wait_task
            wait_task 等待上一个任务到来
            init 爬虫init时运行 会把返回值put到main队列
            main 等待爬虫自带任务队列的任务
        """
        self.func = func
        self.spider_self = None
        self.thread = None
        self.next_func_tuple = None
        if next_func is not None:
            if not isinstance(next_func, tuple):
                next_func = (next_func,)
            self.next_func_tuple = next_func
        self.func_type = func_type
        self.queue = None
        self.next_func_queue = None

    def __call__(self, *args, **kwargs):
        return self.func(self.spider_self, *args, **kwargs)

    def init_thread(self, spider, thread_class=SpiderThread):
        assert isinstance(spider, Spider)
        assert issubclass(thread_class, SpiderThread)
        self.spider_self = spider
        # 找到或创建自己的任务队列
        if self.func_type == "main":
            self.queue = spider.queue
            self.spider_self.spider_func_queue_dict[self.func.__name__] = self.queue
        elif self.func_type == "init":
            self.queue = None
            if self.next_func_tuple is None:
                self.next_func_queue = (spider.queue,)
        else:
            self.queue = self.get_queue(self.func.__name__)
        # 找到或创建下一步的队列
        queue_list = []
        if self.next_func_tuple is not None:
            for next_func in self.next_func_tuple:
                assert isinstance(next_func, str)
                queue = self.get_queue(next_func)
                queue_list.append(queue)
        self.next_func_queue = tuple(queue_list) if self.next_func_queue is None else self.next_func_queue
        # 创建线程
        self.thread = thread_class(
            content=spider.content,
            func=self.__call__,
            in_queue=self.queue,
            out_queue_tuple=self.next_func_queue
        )
        return self.thread

    def get_queue(self, name):
        if name in self.spider_self.spider_func_queue_dict:
            return self.spider_self.spider_func_queue_dict[name]
        else:
            queue = Queue.Queue()
            self.spider_self.spider_func_queue_dict[name] = queue
            return queue


def spider_func(func_type="wait_task", next_func=None):
    """
    将类方法设置为SpiderFunc的装饰器
    :param next_func 运行完当前方法，接下来该的方法，可以有多个
    :type next_func tuple or str 方法名或方法名元组
    :param func_type 方法类型 默认为 wait_task
        wait_task 等待上一个任务到来
        init 无限循环,会把返回值put到main队列
        main 等待爬虫自带任务队列的任务
    """

    def _spider_func(func):
        return SpiderFunc(func=func, func_type=func_type, next_func=next_func)

    return _spider_func


class Spider(BaseThread):
    def __init__(self, content, thread_class=SpiderThread, *args, **kwargs):
        """
        爬虫类的父类
        :type content Content
        :param thread_class 运行produce方法和consumption方法的进程类
                            需要是SpiderThread的子类
        """
        BaseThread.__init__(self, content=content, *args, **kwargs)
        assert issubclass(thread_class, SpiderThread)
        self.name = "Spider"
        self.thread_list = []
        self.spider_func_list = []
        self.spider_func_thread = {}
        self.spider_func_queue_dict = {}
        self.queue = Queue.Queue()
        self.spider_func_queue_dict['main'] = self.queue

        self.init_spider_func()

    def init_spider_func(self):
        for k in dir(self):
            v = getattr(self, k)
            if isinstance(v, SpiderFunc):
                self.spider_func_list.append(v)
        for s in self.spider_func_list:
            s.init_thread(self)
        for v in self.spider_func_list:
            self.thread_list.append(v.thread)

    def run(self):
        for thread in self.thread_list:
            thread.start()
        self.info("启动")

    def stop(self):
        for thread in self.thread_list:
            assert isinstance(thread, SpiderThread)
            thread.stop()
        self.info("停止")

    def put(self, data):
        self.queue.put(data)
