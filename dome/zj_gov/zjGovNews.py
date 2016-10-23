#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2016/10/20 13:19
# @Author  : wplct
import json
import re
import threading

from bs4 import BeautifulSoup
from datetime import datetime
import time

from EasySpider import Spider, Base, spider_func
from entity import News, NewsType
from EasySpider.Web import WebTask


class ZjGovNews(Spider):
    def __init__(self, *args, **kwargs):
        Spider.__init__(self, *args, **kwargs)
        self.url_set_lock = threading.Lock()
        self.now_page = -1
        self.url_set = set(json.load(open('zj_gov/news_url.json')))
        self.info(len(self.url_set))
        self.num = 0

    def start(self):
        task_dict = {u'8378': {'name': u'其他行政行为', 'num': 0}, u'8388': {'name': u'行政裁决', 'num': 0},
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

        for k, v in task_dict.items():
            self.put((k, v))

        Spider.start(self)


    def stop(self):
        Spider.stop(self)
        json.dump(list(self.url_set), open('zj_gov/news_url.json', 'w'))

    def check_url(self, url):
        self.url_set_lock.acquire()
        r = url not in self.url_set
        self.url_set_lock.release()
        return r

    def add_url(self, url):
        self.url_set_lock.acquire()
        self.url_set.add(url)
        self.url_set_lock.release()

    # @spider_func(func_type='main', next_func='get_art')
    # def main(self, page):
    #     """
    #     按得到的page选择要爬的url，
    #     """
    #     if page == 0:
    #         url = 'http://www.zj.gov.cn/col/col818/index.html'
    #         return self.web.get(url, proxy=True)
    #     else:
    #         url = 'http://www.zj.gov.cn/module/jslib/jquery/jpage/dataproxy.jsp?startrecord={0}&endrecord={1}&perpage=18'. \
    #             format(page * 54 + 1, page * 54 + 54)
    #         data = {
    #             'appid': 1,
    #             'webid': 1,
    #             'path': '/',
    #             'columnid': 818,
    #             'sourceContentType': 1,
    #             'unitid': 10630,
    #             'webname': '浙江省人民政府',
    #             'permissiontype': 0,
    #         }
    #         return self.web.post(url, proxy=True, data=data, task_data=page)
    #
    # @spider_func(next_func=('main', 'get_news'))
    # def get_art(self, task):
    #     """
    #     发布爬取内容任务
    #     """
    #     assert isinstance(task, WebTask)
    #     if task.result is None:
    #         if task.run_num < 5:
    #             return task.data, None
    #     url_list = re.findall("http://.*?art.*?html", task.result.text)
    #     task_list = []
    #     if len(url_list) < 5:
    #         if task.run_num < 5:
    #             return task.data, None
    #     for url in url_list:
    #         if self.check_url(url):
    #             self.add_url(url)
    #             task_list.append(self.web.get(url, proxy=True))
    #     self.info(len(task_list))
    #     return None, task_list


    @spider_func(func_type='main', next_func=('get_page', 'main'))
    def put_task(self, task):
        if self.web.web_thread_manage.queue.qsize()>300:
            time.sleep(5)
        time.sleep(0.15)
        task[1]['num'] = int(task[1]['num']) -1
        if task[1]['num'] < 0:
            return None,None
        t = self.web.get(
            'http://www.zj.gov.cn/module/changepage/redirect.jsp?appid=1&webid=1'
            '&cataid=' + str(task[0]) + '&orderid=-' + str(task[1]['num']) + '&catatype=2&position=prev',
            proxy=True
        )
        self.info(self.web.web_thread_manage.queue.qsize())
        self.num+=1
        return t, task

    @spider_func(next_func=('get_news', 'get_page'))
    def get_page(self, task):
        assert isinstance(task, WebTask)
        try:
            r = re.search("location\.href='(/art.*?\.html)';", task.result.text).group(1)
            if self.check_url("http://www.zj.gov.cn"+str(r)):
                self.add_url(r)
                return self.web.get('http://www.zj.gov.cn' + str(r), proxy=True), None
            else:
                self.info("链接重复"+str(self.num))
                return
        except:
            pass
        if task.result is not None and 'alert' in task.result.text:
            pass
        else:
            if task.retry_count < 5:
                return None, task

    @spider_func(next_func=('get_news', 'get_url'))
    def get_news(self, task):
        if not isinstance(task, WebTask):
            self.info(task.data.title)
        if task.result is None:
            if task.run_num < 5:
                return task
        news = None
        try:
            dom = BeautifulSoup(task.result.text, 'lxml')
            news = News()
            news.url = task.request.url
            news.title = dom.html.head.title.text
            news.content = re.search('ContentStart.*?ContentEnd', task.result.text, re.S).group()
            news.text = dom.select('#zoom')[0].text
            re_obj = re.search('(\d{4})-(\d{1,2})-(\d{1,2}).(\d{2}):(\d{2}):(\d{2})',
                               dom.select('meta[name~=pubDate]')[0]['content'])
            news.publish_date = datetime(int(re_obj.group(1)),
                                         int(re_obj.group(2)),
                                         int(re_obj.group(3)),
                                         int(re_obj.group(4)),
                                         int(re_obj.group(5)),
                                         int(re_obj.group(6)),
                                         )
            news.source = dom.select('meta[name~=source]')[0]['content']
            news.attachment = ','.join([a['href'] for a in dom.select('#zoom a')])
            return self.db.save(news)
        except Exception as e:
            if news is not None:
                if news.content is not None:
                    return self.db.save(news)
            if '404' in task.result.text:
                task.kill_proxy()
            if task.run_num < 5:
                return task
            else:
                news = News()
                news.url = task.request.url
                return self.db.save(news)


if __name__ == '__main__':
    from EasySpider import Core
    core = Core()
    news = core.add_spider(ZjGovNews)
    core.start()
    news.put(0)
    news.put(1)
