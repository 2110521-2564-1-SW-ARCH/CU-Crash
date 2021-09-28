import pyodbc
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib

import logging

from config import CONFIG

logger = logging.getLogger()

# urllib.parse.quote_plus for python 3
# ? connection for azure
params = urllib.parse.quote_plus(
    r'Driver={ODBC Driver 17 for SQL Server};'+
    'Server=tcp:{},{};Database={};Uid={};Pwd={};Encrypt=yes;TrustServerCertificate=no;'.format(
        CONFIG.SQL['host'], CONFIG.SQL['port'], CONFIG.SQL['db_name'], CONFIG.SQL['user'], CONFIG.SQL['password']
    )
)
SQLALCHEMY_DATABASE_URL = 'mssql+pyodbc:///?odbc_connect={}'.format(params)


logger.info('begin connecting ...')
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
