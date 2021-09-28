from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
import bcrypt

from services.db.sql_connection import get_db
from services.db import test_crud as crud
import models
import schemas
from dependencies import jwt_token
import dependencies


logger = logging.getLogger()

router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create(user: schemas.UserCreate, db: Session = Depends(get_db)):
    logger.info(f'Get creating User: {user}')
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        logger.info(f'email {user.email} is already in use.')
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)


@router.post("/login")
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    logger.info(f"User Login: {user}")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        passwd = user.password.encode('utf8')
        hashed_password = db_user.hashed_password.encode('utf8')
        matched = bcrypt.checkpw(passwd, hashed_password)
        logger.info(f"User Login success: {matched}")
        if matched:
            access_token = jwt_token(schemas.User(**db_user.__dict__).dict())
            return {"access_token": access_token}
    raise HTTPException(status_code=401, detail="Incorrect email or password")
