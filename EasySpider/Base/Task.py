#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/11 13:25
# @Author  : wplct
import Queue
import functools
import threading
import time as _t


class Task:
    def __init__(self, time=None,
                 result_queue=None,
                 block=False,
                 data=None,
                 initiator=None,
                 executor=None
                 ):
        """
        :param time 任务发起时间
        :param result_queue 完成后该去的队列
        :param block 是否阻塞
        :param data 额外的数据
        :param initiator 任务发起者
        :param executor 任务执行者
        """
        # 设置阻塞
        self.condition = None
        if block:
            self.condition = threading.Condition()
            self.condition.acquire()
        self.lock_state = False
        # 设置任务发起时间
        if time is None:
            time = _t.time()
        self.time = time
        self.result = None
        self.initiator = initiator
        self.executor = executor
        self.result_queue = result_queue
        self.data = data
        # 重试次数
        self.retry_count = 0

    def wait(self):
        """
        等待任务完成
        """
        assert self.condition is not None
        if self.lock_state:
            self.condition.release()
            return self
        self.condition.wait()
        self.condition.release()
        return self

    def notify(self, result=None):
        """
        广播任务完成事件
        """
        if self.condition is not None:
            self.lock_state = True
            self.condition.acquire()
            self.condition.notify()
            self.condition.release()
        self.result = result
        if self.result_queue is not None:
            self.result_queue.put(self)
        self.retry_count += 1
