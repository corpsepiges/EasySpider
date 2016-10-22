#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/20 10:29
# @Author  : wplct
import requests
import json
import re

# page = 1
# if page == 0:
#     url = 'http://www.zj.gov.cn/col/col818/index.html'
#     r = requests.get(url, proxies={'http': '202.171.253.72:80'})
# else:
#     url = 'http://www.zj.gov.cn/module/jslib/jquery/jpage/dataproxy.jsp?startrecord={0}&endrecord={1}&perpage=18'. \
#         format(page * 54 + 1, page * 54 + 54)
#     data = {
#         'appid': 1,
#         'webid': 1,
#         'path': '/',
#         'columnid': 818,
#         'sourceContentType': 1,
#         'unitid': 10630,
#         'webname': '浙江省人民政府',
#         'permissiontype': 0,
#     }
#     print url
#     r = requests.post(url,
#                       data=data,
#                       proxies={'http': '202.171.253.72:80'}
#                       )
# text = r.text
# url_list = re.findall("http://.*?art.*?html", text)
# print len(url_list)
# print url
#
# print r.text, r
from datetime import datetime
import time

"""
/module/changepage/redirect.jsp?appid=1&webid=1&cataid=5527&orderid=-1266&catatype=2&position=next
/module/changepage/redirect.jsp?appid=1&webid=1&cataid=5527&orderid=-1265&catatype=2&position=next
发布时间：2011-12-29
"""
# # re.search('',r.text)
from bs4 import BeautifulSoup, Tag

#
# r = requests.get("http://www.zj.gov.cn/art/2016/10/19/art_5527_2187651.html")
# dom = BeautifulSoup(r.text, 'lxml')
# from entity import News
#
# print r.text
# print dom.select('#zoom div')[0].contents[0]
# news = News()
# news.title = dom.html.head.title.text
# re_obj = re.search('(\d{4})-(\d{1,2})-(\d{1,2}).(\d{2}):(\d{2}):(\d{2})',
#                    dom.select('meta[name~=pubDate]')[0]['content'])
# news.publish_date = datetime(int(re_obj.group(1)),
#                              int(re_obj.group(2)),
#                              int(re_obj.group(3)),
#                              int(re_obj.group(4)),
#                              int(re_obj.group(5)),
#                              int(re_obj.group(6)),
#                              )
# news.source = dom.select('meta[name~=source]')[0]['content']
# news.content = dom.select('#zoom')[0].text
# news.attachment = ','.join([a['href'] for a in dom.select('#zoom a')])
# print news.publish_date
# print news.title
# print news.source
# print news.content
# print news.attachment
# url = 'http://www.zj.gov.cn/module/jslib/jquery/jpage/dataproxy.jsp?startrecord=379&endrecord=432&perpage=18 '
# data = {
#     'appid': 1,
#     'webid': 1,
#     'path': '/',
#     'columnid': 818,
#     'sourceContentType': 1,
#     'unitid': 10630,
#     'webname': '浙江省人民政府',
#     'permissiontype': 0,
# }
#
#
# r = requests.get("http://www.zj.gov.cn/module/changepage/redirect.jsp?appid=1&webid=1&cataid=5525&orderid=-142102&catatype=2&position=prev")
#
#
# print r.text
# print len(r.text)
# r = requests.get('http://www.zj.gov.cn/module/changepage/redirect.jsp?appid=1&webid=1&cataid=12371&orderid=-5&catatype=2&position=prev')
# print r.text
# ro = re.findall("location\.href='(/art.*?\.html)';",r.text)
# print ro[0]
# id_list = [u'5494', u'5495', u'5496', u'7239', u'5497', u'5498', u'5499', u'5500', u'5501', u'5503', u'5502', u'5515',
#            u'5517', u'5516', u'5518', u'7243', u'5519', u'5520', u'5521', u'5522', u'13091', u'7406', u'5525', u'5526',
#            u'5527', u'5528', u'12451', u'12455', u'12459', u'12879', u'12880', u'12881', u'8381', u'8382', u'8383',
#            u'8384', u'8385', u'8386', u'8387', u'8388', u'8376', u'8377', u'8378', u'8379', u'8380']
# id_num_dict = {}
# for id in id_list:
#     def _():
#         title = None
#         try:
#             time.sleep(0.5)
#             r = requests.get(url='http://www.zj.gov.cn/module/rss/rssfeed.jsp?colid=' + id)
#             title = BeautifulSoup(r.text, 'lxml').select('title')[0].text
#             url = re.findall('http://www.zj.gov.cn/art.*?.html', r.text)[0]
#             r = requests.get(url)
#             _type = re.search(
#                 'orderid=-(\d*?)&',
#                 r.text)
#             id_num_dict[id] = {'name':title,'id':_type.group(1)}
#             print _type.group(1)
#         except Exception as e:
#             print e
#             id_num_dict[id] = {'name':title,'id':0}
#     _()
#     print id_num_dict[id]
#
# print id_num_dict
# r = requests.get("http://www.zj.gov.cn/art/2007/11/2/art_12371_340918.html")
# dom = BeautifulSoup(r.text, 'lxml')
# zoom = dom.select('#zoom')[0]
# assert isinstance(zoom, Tag)
#
# data = zoom.html
# print data, type(data)
data = {u'8378': {'name': u'其他行政行为', 'num': 0}, u'8388': {'name': u'行政裁决', 'num': 0},
        u'8387': {'name': u'行政确认', 'num': 0}, u'8386': {'name': u'行政征收', 'num': 0},
        u'8385': {'name': u'行政复议', 'num': 0}, u'8384': {'name': u'行政强制', 'num': 0},
        u'8383': {'name': u'行政处罚', 'num': 0}, u'8382': {'name': u'其他审批事项', 'num': 0},
        u'12879': {'name': u'部门文件', 'num': u'319'}, u'8380': {'name': u'行政征用', 'num': 0},
        u'5520': {'name': u'预警及应对情况', 'num': u'24065'}, u'5521': {'name': u'重要会议', 'num': u'5627'},
        u'5522': {'name': u'领导活动', 'num': u'99930'}, u'5498': {'name': u'统计数据', 'num': u'11'},
        u'5499': {'name': u'统计分析', 'num': u'13190'}, u'5526': {'name': u'招投标行为', 'num': u'9320'},
        u'5527': {'name': u'监督检查结果', 'num': u'1269'}, u'5494': {'name': u'重大决策', 'num': u'99726'},
        u'5495': {'name': u'规划信息', 'num': u'2019'}, u'5496': {'name': u'计划总结', 'num': u'850'},
        u'5497': {'name': u'统计公报', 'num': u'102'}, u'5502': {'name': u'行政事业性收费', 'num': u'806'},
        u'5503': {'name': u'专项经费', 'num': u'257'}, u'5500': {'name': u'财政预决算', 'num': u'938'},
        u'5501': {'name': u'政府采购', 'num': u'48191'}, u'7243': {'name': u'职称评审', 'num': u'686'},
        u'7239': {'name': u'规划解读', 'num': u'64'}, u'8376': {'name': u'行政给付', 'num': 0},
        u'8377': {'name': u'行政奖励', 'num': 0}, u'12880': {'name': u'行政规范性文件', 'num': 0},
        u'12881': {'name': u'政策解读', 'num': u'323'}, u'5519': {'name': u'应急预案', 'num': u'505'},
        u'5518': {'name': u'事业单位招考', 'num': u'1913'}, u'5528': {'name': u'其他业务公告', 'num': u'28966'},
        u'8381': {'name': u'行政许可', 'num': 0}, u'8379': {'name': u'行政监管', 'num': 0},
        u'5515': {'name': u'人事任免', 'num': u'5098'}, u'5517': {'name': u'干部选拔', 'num': u'308'},
        u'5516': {'name': u'公务员考录', 'num': u'474'}, u'12455': {'name': u'政府规章', 'num': u'356'},
        u'12451': {'name': u'地方性法规', 'num': u'315'}, u'12459': {'name': u'政府文件', 'num': u'2946'},
        u'13091': {'name': u'部门动态', 'num': u'2739'}, u'7406': {'name': u'政策措施', 'num': u'4338'},
        u'5525': {'name': u'行政许可结果', 'num': u'142134'}}
i = 0
for k,v in data.items():
    i+=int(v['num'])
print i