from pydantic import BaseSettings, Field
from functools import lru_cache

log_config = {
    "version":1,
    "disable_existing_loggers": False,
    "root":{
        "handlers" : ["console"],
        "level": "DEBUG"
    },
    "handlers":{
        "console":{
            "formatter": "std_out",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        }
    },
    "formatters":{
        "std_out": {
            "()": "uvicorn.logging.DefaultFormatter",
            "fmt": "%(levelprefix)s : %(asctime)s : %(module)s : %(funcName)s : %(lineno)d \n^MSG-->%(message)s",
            "datefmt":"%d-%m-%Y %I:%M:%S"
        }
    },
}


class SQL_CONFIG(BaseSettings):
    host: str
    port: int
    db_name: str
    user: str
    password: str

    class Config:
        env_file = ".env"
        env_prefix = 'sql_'


class API_KEY_CONFIG(BaseSettings):
    key: str = Field(..., env='api_key')
    name: str = Field(..., env='api_key_name')
    cookie_domain: str

    class Config:
        env_file = ".env"


class Config():
    SQL = SQL_CONFIG().dict()
    API_KEY = API_KEY_CONFIG().dict()


CONFIG = lru_cache()(Config)()
