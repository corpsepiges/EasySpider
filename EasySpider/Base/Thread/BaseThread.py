#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 10:30
# @Author  : wplct
import threading

import time

from ..Base import Base


class BaseThread(threading.Thread, Base):
    def __init__(self,content, *args, **kwargs):
        Base.__init__(self,content=content)
        threading.Thread.__init__(self, *args, **kwargs)
        self.state = False

    def stop(self):
        self.state = False
        self.info("停止")

