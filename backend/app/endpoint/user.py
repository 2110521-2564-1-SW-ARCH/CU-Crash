from fastapi import APIRouter, Depends

import model
from service.db import sql_connection
import logging
import dependencies

logger = logging.getLogger()

router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create(user: model.User.UserCreate):
    return user


@router.post("/login")
async def login(email: str, password: str):
    logger.info("Test Login")
    return {email, password}
