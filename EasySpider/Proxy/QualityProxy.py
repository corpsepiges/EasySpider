#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/10 10:15
# @Author  : wplct
import Queue
import traceback

from ..Base.Thread import BaseThread
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import func

from EasySpider.Proxy.Entity import ProxyEntity, ProxyTest


class QualityProxy(BaseThread):
    """
    获取优质代理存放到队列中
    """

    def __init__(self, content, quality_proxy_queue, url="sqlite:///data.db", *args, **kwargs):
        BaseThread.__init__(self, content=content, *args, **kwargs)
        self.quality_proxy_queue = quality_proxy_queue

    def run(self):
        self.state = True
        while self.state:
            try:
                task = self.db.run_sql("""
SELECT * FROM
(SELECT ip,port,avg(ping) as ping_avg,count(*) FROM proxy JOIN test ON proxy.id = test.proxy_id
GROUP BY proxy_id
ORDER BY avg(ping))
WHERE ping_avg is NOT NULL AND ping_avg < 10
ORDER BY random()
LIMIT 30;""", block=True)
                list = self.db.put(task).wait().result
                for p in list:
                    try:
                        if self.state:
                            proxy = {'http': str(p[0]) + ':' + str(p[1])}
                            self.quality_proxy_queue.put(proxy, True, 1)
                    except Queue.Full:
                        pass
            except Queue.Full:
                pass
            except Exception as e:
                if self.content is None:
                    print self
                self.error(traceback.format_exc(e))
                print e
