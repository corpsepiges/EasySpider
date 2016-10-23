#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/17 11:37
# @Author  : wplct
from EasySpider import Core
from dome.ReloadTest.ReloadTest import ReloadTest


core = Core()
z = core.add_spider(ReloadTest)

core.start()
while True:
    raw_input()
    core.reload(ReloadTest)
