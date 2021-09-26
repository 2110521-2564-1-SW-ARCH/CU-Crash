import pyodbc
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib

import logging


from config import CONFIG

logger = logging.getLogger(__name__)

# urllib.parse.quote_plus for python 3
# ? connection for azure
params = urllib.parse.quote_plus(
    r'Driver={ODBC Driver 17 for SQL Server};Server=tcp:cu-crash.database.windows.net,1433;Database=CU-Crash;Uid=CUAdmin;Pwd=CU-crash1234;Encrypt=yes;TrustServerCertificate=no;'
)
SQLALCHEMY_DATABASE_URL = 'mssql+pyodbc:///?odbc_connect={}'.format(params)

# ? connection for AWS
'''SQLALCHEMY_DATABASE_URL = 'mysql+mysqlconnector://{}:{}@{}/{}'.format(
    config.SQL['user'], config.SQL['password'],
    config.SQL['host'], config.SQL['db_name']
)'''


logger.info('begin connecting ...')
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

logger.info(engine.table_names())

Base = declarative_base()