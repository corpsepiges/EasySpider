#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/20 9:19
# @Author  : wplct
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 初始化数据库连接:
from dome.zj_gov.entity import News

engine = create_engine("sqlite:///D:/code/python/EasySpider/data.db")
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()
news_list = session.query(News).filter(News.title!=None).all()
id_set = set()
for news in news_list:
    id_set.add(str(news.url))

json.dump(list(id_set), open('news_url.json','w'))
print len(id_set)