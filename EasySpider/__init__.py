from sqlalchemy.ext.declarative import declarative_base
from Core import Core
from Base.Thread import BaseThread, ThreadManage, RunQueueThread
from Spider import Spider,spider_func
from Web import WebTask
from DB.DB import DB
Base = declarative_base()