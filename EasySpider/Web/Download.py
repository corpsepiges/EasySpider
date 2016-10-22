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
        while retry_count > 0:
            try:
                # self.info(str(task.request.url) + " 开始")
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
                if result.status_code != 200:
                    raise requests.ConnectionError
                task.set_result(result)
                if task.result_queue is not None:
                    task.result_queue.put(task)
                if task.show_log:
                    self.info(str(task.request.url) + " 完成" + str(result))
                self.proxy.put(task.proxies)
                break
            except requests.exceptions.ProxyError:
                if task.show_log:
                    self.info(str(task.request.url) + "  代理连接错误")
            except ConnectTimeout:
                if task.show_log:
                    self.info(str(task.request.url) + "  连接超时")
            except ConnectionError:
                if task.show_log:
                    self.info(str(task.request.url) + "  连接错误")
            except requests.ConnectionError:
                if task.show_log:
                    self.info(str(task.request.url) + "  连接错误")
            except ReadTimeout:
                if task.show_log:
                    self.info(str(task.request.url) + "  读取超时")
            except Exception as e:
                if task.show_log:
                    self.error(str(task.request.url) + traceback.format_exc(e))
            finally:
                retry_count -= 1
            if retry_count == 0:
                if task.result_queue is not None:
                    task.result_queue.put(task)
                self.error(str(task.request.url) + "重试次数用完，未完成下载")
        task.notify()
        if proxies_flag:
            task.proxies = None
        task.run_num += 1

    def test_proxy(self, task):
        assert isinstance(task, WebTask)
        try:
            # self.info("代理测试开始")
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
                # self.info(str(task.request.url) + "  代理测试成功")
        except requests.exceptions.ProxyError:
            # self.info(str(task.request.url) + "  代理测试 代理连接错误")
            pass
        except ConnectTimeout:
            # self.info(str(task.request.url) + "  代理测试 连接超时")
            pass
        except Exception as e:
            pass
        task.notify()
