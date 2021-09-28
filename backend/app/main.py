from fastapi import FastAPI, Depends
from fastapi.logger import logger
from logging.config import dictConfig
from fastapi.middleware.cors import CORSMiddleware
import logging

import dependencies
from endpoints import user, review
from config import CONFIG, log_config

dictConfig(log_config)

logger = logging.getLogger()

logger.info("FastAPI initializing.")

app = FastAPI(
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)

logger.info("FastAPI initialed.")

app.include_router(user.router)
app.include_router(review.router)


origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    logger.info('test logging')
    return {"message": "Hello World",
            'sql_config': repr(CONFIG)}
