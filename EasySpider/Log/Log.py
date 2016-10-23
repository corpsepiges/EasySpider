#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import Queue
from .LogTask import LogTask
import time

from ..Base.Thread import RunQueueThread


class Log(RunQueueThread):
    LogTask = LogTask

    def __init__(self, content=None, *args, **kwargs):
        self.queue = Queue.Queue()
        RunQueueThread.__init__(self, queue=self.queue, content=content, *args, **kwargs)

    def _run(self, data):
        assert isinstance(data, LogTask)
        func = getattr(self, '_' + str(data.level))
        func(data)

    def stop(self):
        time.sleep(2)
        RunQueueThread.stop(self)

    def info(self, data):
        self._log('info', data, self)

    def debug(self, data):
        self._log('info', data, self)

    def warn(self, data):
        self._log('info', data, self)

    def error(self, data):
        self._log('info', data, self)

    def _log(self, level, data, initiator):
        self.queue.put(LogTask(level=level, data=data, initiator=initiator))

    @staticmethod
    def format_data(method, data, color):
        return " {0} {1} \033[{3}m {2}\033[0m".format(time.ctime(), str(method), str(data), str(color))

    def _info(self, data):
        pass

    def _debug(self, data):
        pass

    def _warn(self, data):
        pass

    def _error(self, data):
        pass
