from fastapi import FastAPI, Depends
from fastapi.logger import logger
from logging.config import dictConfig
from fastapi.middleware.cors import CORSMiddleware
import logging
import uvicorn

from app import dependencies
from app.services.db import Base, engine, get_mongo
from app.endpoints import user, review, supplementary
from app.config import CONFIG, log_config
from app.scripts import start_grpc_server

dictConfig(log_config)

logger = logging.getLogger()

logger.info("FastAPI initializing.")

app = FastAPI(
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)

logger.info("FastAPI initialed.")

app.include_router(user.router)
app.include_router(review.router)
app.include_router(supplementary.router)

Base.metadata.create_all(bind=engine)

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
    logger.info('test logging at root.')
    return {"message": "Hello World",
            'config': repr(CONFIG)}


# @app.on_event("startup")
# async def startup_event():
#     mongo = Depends(get_mongo)
    # sup = mongo.supplementary
    # logger.info(sup.find()[0])


def start():
    """Launched with `poetry run start` at backend level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=5567, reload=True)
