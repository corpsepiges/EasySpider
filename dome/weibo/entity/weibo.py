#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/17 8:58
# @Author  : wplct
from EasySpider import Base

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime


class Penson(Base):
    __tablename__ = "penson"
    id = Column(Integer, primary_key=True)
    userId = Column(String(20))  # 用户id
    name = Column(String(100))  # 用户名
    followerNum = Column(Integer)  # 粉丝数量
    weiboNum = Column(Integer)  # 微博数量
    concernNum = Column(Integer)  # 关注数量
    cover = Column(String(500))  # 头像
    location = Column(String(255))  # 地区
    intro = Column(String(500))  # 简介
    tag = Column(String(255))  # 标签
    industry = Column(String(255))  # 行业
    birthday = Column(String(255))  # 生日
    company = Column(String(255))  # 公司
    sex = Column(String(20))  # 性别
    verify = Column(String(20))  #
    time = Column(DateTime)  # 采集时间
class PensonPlan(Base):
    __tablename__ = "penson_plan"
    id = Column(Integer, primary_key=True)
    userId = Column(String(20))  # 用户id

class Weibo(Base):
    __tablename__ = "weibo"
    id = Column(Integer, primary_key=True)
    publisher = Column(Integer, ForeignKey("penson.id"))
    postTime = Column(DateTime)
    postPhone = Column(String(255))
    content = Column(String(2000))
    forwardedNum = Column(Integer)  # 转发数量
    commentNum = Column(Integer)  # 评论数量
    praiseNum = Column(Integer)  # 赞数量


class Comment(Base):
    __tablename__ = "comment"
    id = Column(Integer, primary_key=True)
    publisher = Column(Integer, ForeignKey("penson.id"))
    postTime = Column(DateTime)
    commentContent = Column(String(2000))
    praiseNum = Column(Integer)


if __name__ == '__main__':
    p = Penson()
    p.name = 'sb'
    for k in dir(p):
        v = getattr(p, k)
        print k,v,type(v)
