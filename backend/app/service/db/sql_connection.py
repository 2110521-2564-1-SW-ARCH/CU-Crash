import pyodbc
from sqlalchemy import create_engine
import urllib
import logging
from fastapi.logger import logger

# urllib.parse.quote_plus for python 3
params = urllib.parse.quote_plus(
    r'Driver={ODBC Driver 17 for SQL Server};Server=tcp:cu-crash.database.windows.net,1433;Database=CU-Crash;Uid=CUAdmin;Pwd=CU-crash1234;Encrypt=yes;TrustServerCertificate=no;'
)
conn_str = 'mssql+pyodbc:///?odbc_connect={}'.format(params)
logger.info('begin connecting ...')
engine_azure = create_engine(conn_str, echo=True)

logger.info('connection is ok')
logger.info(engine_azure.table_names())
