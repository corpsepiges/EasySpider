#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/30 15:42
# @Author  : wplct
import time

from sqlalchemy import Column, Integer, String
from bs4 import BeautifulSoup
from EasySpider import *
import requests
from bs4.element import Tag

core = Core()
db = core.content.db


class Proxy(db.Base):
    __tablename__ = "proxy"
    id = Column(Integer, primary_key=True)
    ip = Column(String(30))
    port = Column(Integer)
    source = Column(String(200))
    address = Column(String(100))
    hash = Column(Integer)


class ProxySearch(Spider):
    def init_task(self):
        for i in range(1, 1):
            self.put(i)

    @Spider.spider_func
    def produce(self, data):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36'
        }
        request = requests.Request(
            method="get",
            url="http://www.xicidaili.com/nn/" + str(data),
            headers=headers,
        )
        return [WebTask(request=request, proxy=False, retry_count=20)]

    def consumption(self, task):
        assert isinstance(task.response, requests.Response)
        dom = BeautifulSoup(task.response.text, "lxml")
        tr_list = dom.select("#ip_list tr")
        proxy_list = []
        for tr in tr_list:
            assert isinstance(tr, Tag)
            proxy = Proxy()
            td_list = tr.find_all("td")
            if len(td_list) > 5:
                proxy.ip = td_list[1].text
                proxy.port = int(td_list[2].text)
                proxy.address = td_list[0].alt
                proxy.source = "www.xicidaili.com"
                proxy.hash = hash(str(proxy.ip) + str(proxy.port))
                proxy_list.append(proxy)
        return [self.content.db.DBTask.filter_save(data=proxy, func=self.db_filter) for proxy in proxy_list]

    def db_filter(self, entity, session):
        assert isinstance(entity, Proxy)
        sum = session.query(Proxy). \
            filter(Proxy.hash == entity.hash).count()
        if sum >= 1:
            self.info("代理重复")
            return False
        else:
            return True


core.add_spider(ProxySearch)
core.start()
a = raw_input()
core.stop()
