#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import Queue

import time

from ..Base.Thread import RunQueueThread


class Log(RunQueueThread):
    def __init__(self, content=None, *args, **kwargs):
        self.queue = Queue.Queue()
        RunQueueThread.__init__(self, queue=self.queue, content=content, *args, **kwargs)

    def _run(self, data):
        data[0](data[1])

    def stop(self):
        time.sleep(2)
        RunQueueThread.stop(self)

    def info(self, data):
        if data[:1] != "<":
            data = str(self)+"\t"+data
        data = self.format_data("INFO", data,0)
        self.queue.put((self._info, data))

    def debug(self, data):
        if data[:1] != "<":
            data = str(self) + "\t" + data
        data = self.format_data("DEBUG", data,30)
        self.queue.put((self._debug, data))

    def warn(self, data):
        if data[:1] != "<":
            data = str(self) + "\t" + data
        data = self.format_data("WARN", data,33)
        self.queue.put((self._warn, data))

    def error(self, data):
        if data[:1] != "<":
            data = str(self) + "\t" + data
        data = self.format_data("ERROR", data,31)
        self.queue.put((self._error, data))

    @staticmethod
    def format_data(method, data,color):
        return " {0} {1} \033[{3}m {2}\033[0m".format(time.ctime(), str(method), str(data),str(color))

    def _info(self, data):
        pass

    def _debug(self, data):
        pass

    def _warn(self, data):
        pass

    def _error(self, data):
        pass
