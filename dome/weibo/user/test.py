#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/14 16:20
# @Author  : wplct
import json
import re
from bs4 import BeautifulSoup
import requests
import sqlite3

from dome.weibo.entity.weibo import Penson

session = requests.session()
cookies = {
    'SUB': '_2AkMvXB9Mf8NhqwJRmP4VyWPgbIRxyAHEieLBAH7sJRMyHRl - yD83qnMhtRAwj1oEC3A3cpC6oEyF1dC6_2mheQ..',
    'SUBP': '0033WrSXqPxfM72-Ws9jqgMF55529P9D9WhWTI.m_fPA2Y4YFZrbh-To'
}
for k, v in cookies.items():
    session.cookies.set(k, v)

user_list = ['3800815220', '2145291155', '1197964571', '1705180884', '5234797239', '2026366955', '1100856704',
             '1235457821', '1689618340', '1233536692', '1749127163', '1640571365', '1149665262', '1999607273',
             '1222713954', '1676368781', '1826792401', '1197161814', '1303154437', '2121667213', '2121667213',
             '1226106902', '2074807893', '1734449870', '1530797013', '1985636721', '2559830984', '2075811071',
             '1726602910', '1730715441', '1558247760', '1946109133', '1629966190', '1558226504', '1649005320',
             '1642333010', '5524254784', '2128864880', '1711096872', '1670071920', '1197033464', '1187986757',
             '1415636805', '2368532821', '1277101115', '1665232543', '5599903006', '1284032347', '1135315733',
             '1671342103', '1642540914', '1407381861', '3994032075', '1824398821', '1217743083', '1618356784',
             '1813482925', '2073811681', '2135652992', '1195910797', '1195910797', '1662429125', '3668293823',
             '1781046021', '2073031193', '1785075601', '1250748474', '2337530130', '1898386062', '1197890497',
             '2149069737', '1880143303', '5462234663', '1003716184', '2262263940', '1106758220', '1918946154',
             '3225904690', '1900093822', '1104503584', '1679013335', '1582488432', '1803814487', '1380265057',
             '1593165014', '1700651321', '1806500430', '1768340073', '1853632123', '1862695480', '1862695480',
             '1756644751', '1665356035', '5742406115', '1496853453', '1890943125', '1216546252', '1759084801',
             '1790060184', '2573254044', '1221895385', '1714100821', '1198389164', '1421241042', '1319542477',
             '1958644142', '2661298321', '1594643405', '1350947532', '1496850204', '1984147945', '2057070473',
             '3216125915', '1460816392', '2827358934', '1342828732', '3192339774', '1644684164', '1711537382',
             '1275397673', '1275397673', '1699909555', '1934452647', '1731923587', '1650513902', '1813083760',
             '1660147107', '2377371197', '1980916411', '1219795431', '1219542061', '1059916762', '1559756213',
             '1573961430', '1794851152', '1932846000', '1196539523', '1737545242', '1057581555', '1449132437',
             '1449132437', '1315707265', '1249647347', '1989561273', '1894461183', '1685834351', '1407992350',
             '2170282760', '1189852602', '2298603490', '2298603490', '1957069385', '1713405614', '3089608332',
             '1496915057', '1561301300', '5813914347', '1644926821', '2818900581', '1841835853', '2574304344',
             '1638965542', '2367392191', '1243861097', '1732950433', '1402675360', '5706639940']
r = session.get("http://weibo.com/u/1734449870",cookies= session.cookies)


def get_weibo_html_data(html):
    # 获取FM.view的数据
    fm_list = re.findall("FM.view\(\{.*?\}\)", html)
    data = {}
    for fm in fm_list:
        fm_data = json.loads(fm[8:-1])
        if 'domid' in fm_data and 'html' in fm_data:
            if fm_data['domid'] in data:
                fm_data['domid'] = str(fm_data['domid']) + '+'
            data[fm_data['domid']] = fm_data['html']
    return data


data = get_weibo_html_data(r.text)


def get_dom(k):
    if k in data:
        return BeautifulSoup(data[k], "lxml")
    return None


penson = Penson()
dom = get_dom('Pl_Official_Headerv6__1')
if dom is not None:
    penson.name = dom.select("h1.username")[0].text
    penson.sex = u'女' if len(dom.select('i.W_icon.icon_pf_female')) > 0 else u'男'
    penson.verify = u'机构认证' if len(dom.select('em.W_icon_co2.icon_pf_approve_co')) else u''
    penson.verify = u'个人认证' if len(dom.select('em.W_icon.icon_pf_approve')) else u''

dom = get_dom('Pl_Core_UserInfo__8')
if dom is not None:
    for li in dom.select("li.item.S_line2.clearfix"):
        text = li.span.text
        if text == '2':
            penson.location = li.find_all('span')[1].text.strip()
        elif text == u'Ü':
            penson.intro = li.find_all('span')[1].text.strip()[3:].strip()
        elif text == 'T':
            tag_list = []
            for a in li.find_all('a'):
                tag_list.append(a.text.strip())
            penson.tag = ','.join(tag_list)
        elif text == u'ö':
            penson.birthday = li.find_all('span')[1].text.strip()
        elif text == '3':
            penson.company = li.find_all('span')[1].text.strip()
dom = get_dom('Pl_Core_T8CustomTriColumn__3')
if dom is not None:
    num_list = dom.select("td.S_line1 strong")
    penson.followerNum = int(num_list[1].text)
    penson.weiboNum = int(num_list[2].text)
    penson.concernNum = int(num_list[0].text)
print penson.name
print penson.location
print penson.intro
print penson.tag
print penson.verify
print penson.sex
print penson.birthday
print penson.company
print penson.followerNum
print penson.weiboNum
print penson.concernNum
print session.cookies
print r.text
dom = get_dom('Pl_Core_UserGrid__14')
if dom is None:
    dom = get_dom('Pl_Core_UserGrid__11')
print dom
a_list = dom.select('li.picitems a.S_txt1')
for a in a_list:
    print re.search('id=\d*?&',a['usercard']).group()[3:-1]
    print a['usercard']