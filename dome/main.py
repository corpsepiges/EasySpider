#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/17 11:37
# @Author  : wplct
from EasySpider import Core
from weibo.weibo import weibo
from zj_gov.zjGovNews import ZjGovNews

core = Core()
z = core.add_spider(ZjGovNews)
# core.start()
# z.put(0)

# w = weibo(core.content)
# core.add_spider(w)
# core.start()
raw_input()
core.stop()
