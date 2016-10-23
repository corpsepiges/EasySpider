#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
from Log import Log


class PrintLog(Log):
    def __init__(self, *args, **kwargs):
        Log.__init__(self, *args, **kwargs)

    def _info(self, task):
        self._print(task)

    def _debug(self, task):
        self._print(task)

    def _warn(self, task):
        self._print(task)

    def _error(self, task):
        self._print(task)

    @staticmethod
    def _print(task):
        print task.time, task.initiator, task.data
