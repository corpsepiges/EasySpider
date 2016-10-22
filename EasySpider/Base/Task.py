#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/11 13:25
# @Author  : wplct
import Queue
import functools
import threading


class Task:
    def __init__(self, result_queue=None, block=False,data=None):
        self.condition = None
        if block:
            self.condition = threading.Condition()
            self.condition.acquire()
        self.result = None
        self.lock_state = False
        self.result_queue = result_queue
        self.data = data
        self.run_num = 0

    def wait(self):
        """

        """
        assert self.condition is not None
        if self.lock_state:
            self.condition.release()
            return self
        self.condition.wait()
        self.condition.release()
        return self

    def notify(self):
        if self.condition is not None:
            self.lock_state = True
            self.condition.acquire()
            self.condition.notify()
            self.condition.release()
