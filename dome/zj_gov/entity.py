#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/20 11:30
# @Author  : wplct
from EasySpider import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text


class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    publish_date = Column(DateTime)
    source = Column(String)
    content = Column(Text)
    text = Column(Text)
    attachment = Column(String)
    type = Column(String)
    url = Column(String)


class NewsType(Base):
    __tablename__ = "news_type"
    id = Column(Integer, primary_key=True)
    name = Column(String)
