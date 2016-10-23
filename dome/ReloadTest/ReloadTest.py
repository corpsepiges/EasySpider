#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/23 21:48
# @Author  : wplct
import time

from EasySpider import *


class ReloadTest(Spider):
    @spider_func(func_type='init')
    def test(self,task):
        time.sleep(1)
        self.info(2)


if __name__ == '__main__':
    c = Core()
    c.add_spider(ReloadTest)
    c.start()
    raw_input()
    c.reload(ReloadTest)
