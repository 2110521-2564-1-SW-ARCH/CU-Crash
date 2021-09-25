import model
from fastapi import APIRouter, Depends
from service.db import sql_connection

import dependencies

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
    return {email, password}
