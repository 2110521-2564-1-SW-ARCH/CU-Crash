# CU-Crash Backend

## Run these code to set up!

```
cd backend
pip install poetry
poetry shell
poetry install
poetry run start
```

## gRPC start server
```
cd backend
poetry run start_grpc
```
## Install db driver
If error:
    Data source name not found and no default driver specified (0) (SQLDriverConnect)')
Then install:
    https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver15
## swagger!

```
http://127.0.0.1:8000/docs
```


