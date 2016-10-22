#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
from Log import Log


class PrintLog(Log):
    def __init__(self, *args, **kwargs):
        Log.__init__(self, *args, **kwargs)

    def _info(self, data):
        print(data)

    def _debug(self, data):
        print(data)

    def _warn(self, data):
        print(data)

    def _error(self, data):
        print(data)
