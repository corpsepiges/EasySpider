#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/14 11:51
# @Author  : wplct
import Queue
import json
import re
from cookielib import CookieJar

from bs4 import BeautifulSoup
import requests
import time
import threading
from datetime import datetime
from requests.cookies import cookiejar_from_dict
from sqlalchemy.orm import Session

from entity.weibo import Weibo, Penson, Comment, PensonPlan
from EasySpider import Spider, spider_func, WebTask, Core

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36'
}


def get_penson_from_html(html):
    def get_weibo_html_data(_html):
        # 获取FM.view的数据
        fm_list = re.findall("FM.view\(\{.*?\}\)", _html)
        _data = {}
        for fm in fm_list:
            fm_data = json.loads(fm[8:-1])
            if 'domid' in fm_data and 'html' in fm_data:
                if fm_data['domid'] in _data:
                    fm_data['domid'] = str(fm_data['domid']) + '+'
                _data[fm_data['domid']] = fm_data['html']
        return _data

    data = get_weibo_html_data(html)

    def get_dom(k):
        if k in data:
            return BeautifulSoup(data[k], "lxml")
        return None

    penson = Penson()
    dom = get_dom('Pl_Official_Headerv6__1')
    if dom is not None:
        try:
            penson.name = dom.select("h1.username")[0].text
            penson.sex = u'女' if len(dom.select('i.W_icon.icon_pf_female')) > 0 else u'男'
            penson.verify = u'机构认证' if len(dom.select('em.W_icon_co2.icon_pf_approve_co')) else u''
            penson.verify = u'个人认证' if len(dom.select('em.W_icon.icon_pf_approve')) else u''
        except:
            pass

    dom = get_dom('Pl_Core_UserInfo__8')
    if dom is not None:
        for li in dom.select("li.item.S_line2.clearfix"):
            try:
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
            except:
                pass

    dom = get_dom('Pl_Core_T8CustomTriColumn__3')
    if dom is not None:
        try:
            num_list = dom.select("td.S_line1 strong")
            penson.followerNum = int(num_list[1].text)
            penson.weiboNum = int(num_list[2].text)
            penson.concernNum = int(num_list[0].text)
        except:
            pass
    penson.time = datetime.now()
    dom = get_dom('Pl_Core_UserGrid__14')
    id_list = []
    if dom is None:
        dom = get_dom('Pl_Core_UserGrid__11')
    if dom is not None:
        a_list = dom.select('li.picitems a.S_txt1')
        i = 0
        for a in a_list:
            i += 1
            if i < 5:
                try:
                    id_list.append(re.search('id=\d*?&', a['usercard']).group()[3:-1])
                except:
                    pass

    return penson, id_list


class weibo(Spider):
    def __init__(self, content):
        Spider.__init__(self, content=content)
        self.cookies_queue = Queue.Queue()
        self.cookies_lock = True
        self.id_set = set()

    def stop(self):
        json.dump(list(self.id_set), 'id_set.json')
        Spider.stop(self)

    @spider_func(func_type="init", next_func="get_visitor_cookies_get_tid")
    def get_visitor_cookies_start(self, task):
        """
        获取游客cookies:获取tid
        """
        time.sleep(1)
        # todo:改为一个线程进行所有获取身份的方法
        if self.cookies_lock and self.cookies_queue.qsize() < 5:
            self.cookies_lock = False
            return self.web.get("http://passport.weibo.com/visitor/genvisitor?cb=gen_callback",
                                proxy=True,
                                show_log=False,
                                headers=headers)
        else:
            time.sleep(0.1)

    @spider_func(next_func="get_visitor_cookies_get_sub")
    def get_visitor_cookies_get_tid(self, task):
        """
        获取游客cookies:得到tid 请求sub
        """
        self.cookies_lock = True
        tid = None
        try:
            tid = json.loads(re.search('{.*}', task.result.text).group())['data']['tid']
        except:
            pass
        if tid is not None:
            url = "http://passport.weibo.com/visitor/visitor?a=incarnate&t=" + \
                  str(tid) + "&w=" + "&c=" + "&gc=" + "&cb=cross_domain&from=" + "&_rand="
            return self.web.get(url,
                                cookies=task.result.cookies,
                                proxy=True,
                                show_log=False,
                                headers=headers)



    @spider_func(next_func="get_visitor_cookies_test")
    def get_visitor_cookies_get_sub(self, task):
        """
        获取游客cookies:得到sub 以游客身份登陆
        """
        data = None
        try:
            data = json.loads(re.search('{.*}', task.result.text).group())
        except:
            pass
        try:
            if data is not None:
                if data['retcode'] == 20000000:
                    sub = data['data']['sub']
                    subp = data['data']['subp']

                    return self.web.get(
                        "http://login.sina.com.cn/visitor/visitor?a=crossdomain&cb=return_back&s=" + sub + "&sp=" + subp,
                        proxy=True,
                        show_log=False,
                        cookies=task.result.cookies,
                        headers=headers
                    )
        except:
            pass

    @spider_func(next_func="get_visitor_cookies")
    def get_visitor_cookies_test(self, task):
        """
        获取游客cookies:得到cookies
        """
        try:
            data = json.loads(re.search('{.*}', task.result.text).group())
            if data['retcode'] == 20000000:
                self.cookies_queue.put(task.result.cookies.get_dict())
                self.info("得到游客身份")
        except:
            pass

    @spider_func(func_type='main', next_func='save_penson')
    def get_user_data(self, task):
        """
        获取某个用户的信息,task是用户id
        """
        retry = 0
        if isinstance(task, dict):
            retry = task['retry'] + 1
            task = task['user_id']
            if retry > 5:
                return
        self.id_set.add(str(task))
        cookies_data = self.cookies_queue.get()
        cookies = cookiejar_from_dict({})
        cookies.set('SUB', cookies_data['SUB'])
        cookies.set('SUBP', cookies_data['SUBP'])
        return self.web.get('http://weibo.com/u/' + str(task), proxy=True, cookies=cookies,
                            task_data={'user_id': str(task), 'cookies_data': cookies_data, 'retry': retry})

    @spider_func(next_func='get_user_data')
    def save_penson(self, task):
        if task.result is None:
            return task.data
        if self.is_login(task.result):
            self.cookies_queue.put(task.data['cookies_data'])
            penson, id_list = get_penson_from_html(task.result.text)
            if penson.name is None or penson.followerNum is None:
                return task.data
            penson.userId = task.data['user_id']
            db_task = self.db.save(penson)
            self.info("用户" + str(task.data['user_id']) + "完成")
            self.id_set.add(str(task.data['user_id']))
            self.db.put(db_task)
            for _id in id_list:
                if _id not in self.id_set:
                    pp = PensonPlan()
                    pp.userId = _id
                    db_task = self.db.save(pp)
                    self.db.put(db_task)
        else:
            self.error("身份失效")
            return task.data

    @spider_func(func_type='init')
    def get_plan(self, task):
        def get_plan(session):
            assert isinstance(session, Session)
            return session.query(PensonPlan).limit(20).all()

        if self.queue.qsize() < 100 and self.cookies_queue.qsize() > 0:
            db_task = self.db.run_func(func=get_plan, block=True)
            self.db.put(db_task)
            db_task.wait()
            plan_list = db_task.result
            result = []
            if len(plan_list) == 0:
                self.info('plan_list为空')
                time.sleep(4)
            for p in plan_list:
                if str(p.userId) not in self.id_set:
                    result.append(str(p.userId))
                    self.id_set.add(str(p.userId))
                self.db.put(self.db.delete(p))
            return result
        else:
            time.sleep(2)

    @staticmethod
    def is_login(response):
        assert isinstance(response, requests.Response)
        if "/visitor/visitor" in response.url:
            return False
        else:
            return True


if __name__ == '__main__':
    core = Core()
    w = core.add_spider(weibo)
    core.start(w)
