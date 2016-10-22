#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import Queue
import traceback

from .BaseThread import BaseThread


class RunQueueThread(BaseThread):
    """
    循环运行的线程
    自动检测是否该关闭
    """

    def __init__(self, content, queue=None, run_timeout=0.1, *args, **kwargs):
        BaseThread.__init__(self, content=content, *args, **kwargs)
        self.state = False
        self.run_timeout = run_timeout
        assert isinstance(queue, Queue.Queue) or queue is None
        self.queue = queue

    def run(self):
        """
        循环运行
        """
        self.state = True
        self.info("启动")
        while self.state:
            try:
                if self.queue is None:
                    self._run(None)
                else:
                    task = self.queue.get(block=True, timeout=self.run_timeout)
                    if task is not None:
                        self._run(task)
                        self.queue.task_done()
            except Queue.Empty:
                pass
            except Exception as e:
                if self.content is None:
                    print self
                self.error(traceback.format_exc(e))

    def _run(self, task):
        """
        循环体
        """
        pass
