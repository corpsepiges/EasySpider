#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/23 0:41
# @Author  : wplct
from ..Base.Task import Task
import time

class LogTask(Task):
    def __init__(self, *args, **kwargs):
        Task.__init__(self, *args, **kwargs)
