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

## run RabbitMq and kong container
```
cd backend
docker-compose up
```

## stop and start RabbitMq and kong container after run
```
cd backend
docker-compose stop

docker-compose start
```

## run RabbitMq reciever
```
py .\backend\app\ex_rabbitmq\Admin.py
```

## Kong setup
```
service:
    name: backend-service
    protocol: http
    host: 192.168.0.112
    port: 5567

route:
    name: backend-route
    path: /backend
    protocols: http
    method: GET, POST
```

## Install db driver
If error:
    Data source name not found and no default driver specified (0) (SQLDriverConnect)')
Then install:
    https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver15
## swagger!

```
http://127.0.0.1:5567/docs
```
