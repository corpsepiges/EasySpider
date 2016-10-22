#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/20 9:19
# @Author  : wplct
import json

from sqlalchemy.orm.session import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from entity.weibo import Penson

# 初始化数据库连接:
engine = create_engine("sqlite:///D:/code/Python/spider-frame/data.db")
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()
p_list = session.query(Penson).all()
id_set = set()
for p in p_list:
    id_set.add(str(p.userId))

json.dump(list(id_set), open('user_id_list.json','w'))
