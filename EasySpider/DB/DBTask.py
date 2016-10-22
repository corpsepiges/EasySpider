#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/11 11:06
# @Author  : wplct
from ..Base.Task import Task


class DBTask(Task):
    def __init__(self, type, data=None, func=None, sql=None, *args, **kwargs):
        """
        :param type [save,run_func,filter_save,run_sql]
        """
        Task.__init__(self, *args, **kwargs)
        self.func = func
        self.type = type
        self.data = data
        self.sql = sql

    def __str__(self):
        s = "type:" + str(self.type)
        if self.sql:
            s += " sql:" + str(self.sql)
        if self.data:
            s += " data:" + str(self.data)
        return s

    def run(self, session):
        getattr(self, '_' + str(self.type))(session)
        self.notify()

    def _save(self, session):
        if not isinstance(self.data, list):
            self.data = [self.data]
        for data in self.data:
            session.flush()
            session.add(data)
            session.commit()

    def _run_func(self, session):
        self.result = self.func(session)

    def _filter_save(self, session):
        if self.func(self.data, session):
            self._save(session)

    def _run_sql(self, session):
        self.result = session.execute(self.sql).fetchall()

    def _delete(self, session):
        session.flush()
        session.delete(self.data)
        session.commit()

    @staticmethod
    def save(data):
        return DBTask("save", data)

    @staticmethod
    def delete(data):
        return DBTask("delete", data)

    @staticmethod
    def run_func(func):
        return DBTask('run_func', func=func)

    @staticmethod
    def filter_save(func, data):
        return DBTask('filter_save', func=func, data=data)

    @staticmethod
    def run_sql(sql):
        return DBTask('run_sql', sql=sql)
