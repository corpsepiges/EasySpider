#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/30 14:35
# @Author  : wplct
import Queue
import traceback

from DBTask import DBTask
from sqlalchemy.orm.session import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..Base.Thread import RunQueueThread


class DB(RunQueueThread):
    DBTask = DBTask
    # sqlite:///D:/code/Python/spider-frame/data.db
    def __init__(self, content, url=None):
        self.queue = Queue.Queue(1000)
        RunQueueThread.__init__(self, content=content, queue=self.queue)
        from EasySpider import Base
        self.Base = Base
        # 初始化数据库连接:

        if url is None:
            url = self.config.db_url
        self.engine = create_engine(url)
        # 创建DBSession类型:
        self.DBSession = sessionmaker(bind=self.engine)
        self.session = None

    def run(self):
        self.Base.metadata.create_all(self.engine)
        self.session = self.DBSession()
        RunQueueThread.run(self)

    def put(self, data):
        self.queue.put(data)
        return data

    def _run(self, task):
        assert isinstance(self.session, Session)
        assert isinstance(task, DBTask)
        task.run(self.session)

    def save(self, data, *args, **kwargs):
        db_task = DBTask(type="save", data=data, *args, **kwargs)
        return db_task

    def delete(self, data, *args, **kwargs):
        db_task = DBTask(type="delete", data=data, *args, **kwargs)
        return db_task

    def run_func(self, func, *args, **kwargs):
        db_task = DBTask(type="run_func", func=func, *args, **kwargs)
        return db_task

    def run_sql(self, sql, *args, **kwargs):
        db_task = DBTask(type="run_sql", sql=sql, *args, **kwargs)
        return db_task

# if isinstance(data, tuple) and hasattr(data[1], "__call__"):
#     if data[1](data[0], self.session):
#         data = data[0]
#     else:
#         return
# self.session.add(data)
# self.session.commit()
#
# self.info("保存 " + str(data) + " id=" + str(data.id) + " 成功")
