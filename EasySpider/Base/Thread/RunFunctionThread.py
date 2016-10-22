#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 17:04
# @Author  : wplct
from RunQueueThread import RunQueueThread


class RunFunctionThread(RunQueueThread):
    def __init__(self, content, func, queue, *args, **kwargs):
        RunQueueThread.__init__(self, content=content, queue=queue, *args, **kwargs)
        self.func = func

    def _run(self, task):
        self.func(task)
