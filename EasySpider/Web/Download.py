#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/29 9:51
# @Author  : wplct
from requests import ReadTimeout
from requests import ConnectTimeout
from requests.packages.urllib3.connection import ConnectionError

from EasySpider.Base.Thread import RunQueueThread
from WebTask import WebTask
import requests
import traceback


class Download(RunQueueThread):
    def _run(self, task):
        assert isinstance(task, WebTask)
        if task.test_proxies:
            self.test_proxy(task)
        else:
            self.download(task)

    def download(self, task):
        retry_count = task.retry_count
        proxies_flag = task.proxies is None
        result = None
        while retry_count > 0:
            try:
                result = None
                session = requests.session()
                prepared_request = session.prepare_request(task.request)
                # 获取代理
                proxies = None
                if task.proxy:
                    if task.proxies is None:
                        proxies = self.content.proxy.get()
                    else:
                        proxies = task.proxies
                task.proxies = proxies
                task._proxies = proxies
                result = session.send(prepared_request,
                                      timeout=task.retry_timeout,
                                      proxies=proxies)
                task.set_result(result)
                if task.show_log:
                    self.info(str(task.request.url) + " 完成" + str(result))
                self.proxy.put(task.proxies)
                break
            except Exception as e:
                if task.show_log:
                    self.info(str(task.request.url) + '  ' + str(e))
            finally:
                retry_count -= 1
            if retry_count == 0:
                if task.result_queue is not None:
                    task.result_queue.put(task)
                self.error(str(task.request.url) + "重试次数用完，未完成下载")
        task.notify(result)
        if proxies_flag:
            task.proxies = None

    def test_proxy(self, task):
        assert isinstance(task, WebTask)
        try:
            session = requests.session()
            prepared_request = session.prepare_request(task.request)
            # 获取代理
            proxies = task.proxies
            result = session.send(prepared_request,
                                  timeout=task.retry_timeout,
                                  proxies=proxies)
            task.set_result(result)
            if task.result_queue is not None:
                task.result_queue.put(task)
        except:
            pass
        task.notify()
