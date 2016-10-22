#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/28 11:41
# @Author  : wplct

class Base:
    def __init__(self, content):
        self.content = content

    def set_content(self, content):
        """
        更新content
        有属性为Base的子类也更新
        """
        from EasySpider.Base.Content import Content
        isinstance(content, Content)
        self.content = content
        for k, v in self.__dict__.items():
            if isinstance(v, Base):
                v.set_content(content)
            if isinstance(v, list):
                for item in v:
                    if isinstance(item, Base):
                        item.set_content(content)

    def info(self, data):
        self.content.log.info(str(self) + "\t" + str(data))

    def debug(self, data):
        self.content.log.debug(str(self) + "\t" + str(data))

    def warn(self, data):
        self.content.log.warn(str(self) + "\t" + str(data))

    def error(self, data):
        self.content.log.error(str(self) + "\t" + str(data))

    @property
    def db(self):
        return self.content.db

    @property
    def web(self):
        return self.content.web

    @property
    def log(self):
        return self.content.log

    @property
    def proxy(self):
        return self.content.proxy
    @property
    def config(self):
        return self.content.config

