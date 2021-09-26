from pydantic import BaseSettings, Field
from functools import lru_cache

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


config = lru_cache()(Config)()
