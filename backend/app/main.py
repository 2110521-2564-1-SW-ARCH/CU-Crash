from fastapi import FastAPI, Depends
from fastapi.logger import logger
from logging.config import dictConfig
import logging

import dependencies
from endpoints import user
from config import CONFIG, log_config

dictConfig(log_config)

logger = logging.getLogger()

app = FastAPI(
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)
user_router = user.router
app.include_router(user_router)


@app.get("/")
async def root():
    logger.info('test logging')
    return {"message": "Hello World",
            'sql_config': repr(CONFIG)}
