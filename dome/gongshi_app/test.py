#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/17 14:26
# @Author  : wplct
import requests
import bs4
imei = '867302023304554'

headers = {'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*',
           'User-Agent': "Mozilla/5.0 (Android;V6.0;23;);Version/ErrorVersion;ISN_GSXT",
           'Cookie':imei
           }

proxies = {
    'http': '177.234.12.202:3128',
    'https': '177.234.12.202:3128',
}
session = requests.session()
session.headers = headers

# https://120.52.121.75:8443/QuerySummary
#
"""
    <string name="areacode100000">国家工商行政管理总局</string>
    <string name="areacode110000">北京</string>
    <string name="areacode120000">天津</string>
    <string name="areacode130000">河北</string>
    <string name="areacode140000">山西</string>
    <string name="areacode150000">内蒙古</string>
    <string name="areacode210000">辽宁</string>
    <string name="areacode220000">吉林</string>
    <string name="areacode230000">黑龙江</string>
    <string name="areacode310000">上海</string>
    <string name="areacode320000">江苏</string>
    <string name="areacode330000">浙江</string>
    <string name="areacode340000">安徽</string>
    <string name="areacode350000">福建</string>
    <string name="areacode360000">江西</string>
    <string name="areacode370000">山东</string>
    <string name="areacode440000">广东</string>
    <string name="areacode450000">广西</string>
    <string name="areacode460000">海南</string>
    <string name="areacode410000">河南</string>
    <string name="areacode420000">湖北</string>
    <string name="areacode430000">湖南</string>
    <string name="areacode500000">重庆</string>
    <string name="areacode510000">四川</string>
    <string name="areacode520000">贵州</string>
    <string name="areacode530000">云南</string>
    <string name="areacode540000">西藏</string>
    <string name="areacode610000">陕西</string>
    <string name="areacode620000">甘肃</string>
    <string name="areacode630000">青海</string>
    <string name="areacode640000">宁夏</string>
    <string name="areacode650000">新疆</string>
"""
def test1():
    r = session.get("https://120.52.121.75:8443/QuerySummary",
                    params={
                         'AreaCode':'310000',
                         'Page':'1',
                         'Limit':'30',
                         'Q':'中电'
                     },
                     # proxies=proxies,
                     verify=False
                    )

    r.encoding = 'utf-8'
    print r.text,r
def test2():
    r = session.get("https://120.52.121.75:8443/QuerySite?OS=Android;SB;SB&IMEI="+imei,
                    # params={
                    #     'AreaCode': '1',
                    #     'Page': '0',
                    #     'Limit': '5',
                    #     'Q': '杭州'
                    # },
                    # proxies=proxies,
                    verify=False)


    r.encoding = 'utf-8'
    print r.text, r
def test3():
    r = session.get("https://120.52.121.75:8443/QueryGSInfo?AreaCode=140000&EntId=&EntNo=&Info=All",
                    # params={
                    #     'AreaCode': '1',
                    #     'Page': '0',
                    #     'Limit': '5',
                    #     'Q': '杭州'
                    # },
                    # proxies=proxies,
                    verify=False)


    r.encoding = 'utf-8'
    print r.text, r
if __name__ == '__main__':
    # test1()
    test2()