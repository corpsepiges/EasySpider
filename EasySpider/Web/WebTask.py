#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 9:57
# @Author  : wplct
import requests
from requests import Response

from ..Base.Task import Task


class WebTask(Task):
    def __init__(self,
                 request,
                 queue=None,
                 retry_count=10,
                 proxy=False,
                 proxies=None,
                 retry_timeout=300,
                 test_proxies=False,
                 show_log=True,
                 *args, **kwargs):
        """
        :param retry_count 重试次数
        """
        Task.__init__(self, *args, **kwargs)
        # todo 添加重试超时设置
        assert isinstance(request, requests.Request)
        assert isinstance(proxy, bool)
        assert isinstance(retry_count, int)
        self.request = request
        self.result = None
        self.result_queue = queue
        self.retry_count = retry_count
        self.proxy = proxy
        self.retry_timeout = retry_timeout
        self.proxies = proxies
        self._proxies = proxies
        self.test_proxies = test_proxies
        self.show_log = show_log

    def kill_proxy(self):
        try:
            self._proxies['http'] = None
        except:
            pass

    def set_result(self, response):
        assert isinstance(response, Response)
        self.result = response
