#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/10 9:09
# @Author  : wplct
import Queue
import traceback
import random
import requests
from datetime import datetime
import time
from requests.exceptions import ProxyError
from sqlalchemy import func

from ..Base.Thread import ThreadManage, RunQueueThread, BaseThread
from Entity import ProxyEntity, ProxyTest


class TestProxy(RunQueueThread):
    """
    测试代理当前状态
    """

    def __init__(self, content, queue):
        RunQueueThread.__init__(self, content=content, queue=queue)
        # 数据库保存队列

    def _run(self, task):
        test = self.test_proxy(task)
        task = self.db.save(test)
        # self.db.put(task)

    def test_proxy(self, p):
        """
        测试代理可用性
        """
        try:
            proxies = {'http': str(p['ip']) + ':' + str(p['port'])}
            request = requests.Request(method="get", url="http://ip.chinaz.com/getip.aspx")
            task = self.web.WebTask(request=request, block=True,
                                    proxy=True, proxies=proxies,
                                    test_proxies=True,
                                    )
            self.web.put(task)
            r = task.wait().result
            if r is None or r.status_code != 200:
                raise ProxyError
            assert isinstance(r, requests.Response)
            self.info("代理测试成功" + str(proxies))
            self.proxy.put(proxies)
        except ProxyError as e:
            # self.info("代理测试失败")
            pass
        except Exception as e:
            self.error(traceback.format_exc(e))


class TestProxyManage(ThreadManage, BaseThread):
    """
    管理测试进程,
    并提供测试计划
    """

    def __init__(self, content, num=200, thread_class=TestProxy, *args, **kwargs):
        self.queue = Queue.Queue(300)
        self.proxy_list = []
        ThreadManage.__init__(self, content=content, num=num, thread_class=thread_class)
        BaseThread.__init__(self, content=content, *args, **kwargs)


    def init_list(self):
        """
        初始化线程列表
        """
        self.list = []
        for i in range(self.num):
            thread = self.thread_class(queue=self.queue, content=self.content)
            self.list.append(thread)

    def start(self):
        def get_proxy(session):
            return session.query(ProxyEntity).all()

        task = self.content.db.run_func(func=get_proxy, block=True)
        proxy_list = self.db.put(task).wait().result
        for proxy in proxy_list:
            self.proxy_list.append({'id': proxy.id, 'ip': proxy.ip, 'port': proxy.port})
        self.info("初始化代理共" + str(len(self.proxy_list)) + "个")
        ThreadManage.start(self)
        BaseThread.start(self)

    def run(self):
        self.state = True
        while self.state:
            try:
                proxy = random.sample(self.proxy_list, 1)[0]
                self.queue.put(proxy,True,0.1)
            except Queue.Full:
                pass
            except Exception as e:
                self.error(traceback.format_exc(e))
                print e
