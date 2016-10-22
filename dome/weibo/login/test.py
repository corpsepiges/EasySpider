#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/9/28 16:11
# @Author  : wplct
import json

import requests
from bs4 import BeautifulSoup
from bs4 import Tag
import re


session = requests.session()
headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "If-Modified-Since": "0"
}
r = session.get("http://passport.weibo.com/visitor/genvisitor?cb=gen_callback")
r.encoding = "gbk"
print r.text
print r.url
# http://passport.weibo.com/visitor/genvisitor
tid = json.loads(re.search('{.*}', r.text).group())['data']['tid']
print tid
incarnate_intr = "http://passport.weibo.com/visitor/visitor?a=incarnate&t=" + \
                 str(tid) + "&w=" + "&c=" + "&gc=" + "&cb=cross_domain&from=" + "&_rand="
r = session.get(incarnate_intr)
r.encoding = "utf8"
print r.text
print r
data = re.search('{.*}', r.text).group()
data = json.loads(data)
sub = data['data']['sub']
subp = data['data']['subp']
print data
print sub
print subp
r = session.get("http://login.sina.com.cn/visitor/visitor?a=crossdomain&cb=return_back&s="+sub+"&sp="+subp)
print r.text
# r = session.get("http://weibo.com/")
# r.encoding = "gbk"
# print r.text
# # print r.content
# print r
print session.cookies.get_dict()
"""
get http://passport.weibo.com/visitor/genvisitor?cb=gen_callback
获取tid
get http://passport.weibo.com/visitor/visitor?a=incarnate&t=" + \
                 str(tid) + "&w=" + "&c=" + "&gc=" + "&cb=cross_domain&from=" + "&_rand="
获取sub subp
get "http://login.sina.com.cn/visitor/visitor?a=crossdomain&cb=return_back&s="+sub+"&sp="+subp
登陆 取得cookies
"""
