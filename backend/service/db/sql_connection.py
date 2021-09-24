import pyodbc
from sqlalchemy import create_engine
import urllib

# urllib.parse.quote_plus for python 3
params = urllib.parse.quote_plus(
    r'Driver={ODBC Driver 13 for SQL Server};Server=tcp:cu-crash.database.windows.net,'
    '1433;Database=CU-Crash;Uid=CUAdmin;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
    )
conn_str = 'mssql+pyodbc:///?odbc_connect={}'.format(params)
engine_azure = create_engine(conn_str,echo=True)

print('connection is ok')
print(engine_azure.table_names())