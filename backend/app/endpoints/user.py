from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
import bcrypt

from app.services.db.sql_connection import get_db
from app.services.db import user as user_services
from fastapi.security import OAuth2PasswordRequestForm
from app import models, schemas, dependencies
from app.dependencies import jwt_token


logger = logging.getLogger()

router = APIRouter(
    prefix="/user",
    tags=["user"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create(user: schemas.UserCreate, db: Session = Depends(get_db)):
    logger.info(f'Get creating User: {user}')
    db_user = user_services.get_user_by_email(db, email=user.email)
    if db_user:
        logger.info(f'email {user.email} is already in use.')
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_services.create_user(db, user)


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(),
                db: Session = Depends(get_db)):
    user = schemas.UserLogin(
        email=form_data.username,
        password=form_data.password
    )
    logger.info(f"User Login: {user}")
    db_user = user_services.get_user_by_email(db, email=user.email)
    if db_user:
        passwd = user.password.encode('utf8')
        hashed_password = db_user.hashed_password.encode('utf8')
        matched = bcrypt.checkpw(passwd, hashed_password)
        if matched:
            access_token = jwt_token(schemas.User(**db_user.__dict__).dict())
            logger.info(f"User Login success: {access_token}")
            return {"access_token": access_token}
        logger.info(f"User Login failed.")
    raise HTTPException(status_code=401, detail="Incorrect email or password")
