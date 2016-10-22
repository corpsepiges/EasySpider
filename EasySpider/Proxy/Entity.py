#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/9 13:35
# @Author  : wplct
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship


Base = declarative_base()


class ProxyEntity(Base):
    __tablename__ = "proxy"
    id = Column(Integer, primary_key=True)
    ip = Column(String(30))
    port = Column(Integer)
    source = Column(String(200))
    address = Column(String(100))
    hash = Column(Integer)
    tests = relationship("ProxyTest", cascade="delete, delete-orphan", backref='proxy')


class ProxyTest(Base):
    __tablename__ = "test"
    id = Column(Integer, primary_key=True)
    proxy_id = Column(Integer, ForeignKey("proxy.id"))
    time = Column(DateTime)
    ping = Column(Float)
    state = Column(Boolean)
