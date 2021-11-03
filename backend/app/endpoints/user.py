from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
import bcrypt

from app.services.db.sql_connection import get_db
from app.services.db import user as user_services
from app.services import send_email, check_password
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
            res = {"access_token": access_token,
                    "user":{
                    "user_id": db_user.id,
                    "username": db_user.name,
                    "email": db_user.email}}
            logger.info(f"User Login success: {res}")
            return res
        logger.info(f"User Login failed.")
    raise HTTPException(status_code=401, detail="Incorrect email or password")


@router.put("/change/name")
async def changeName(name: str, current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                            db: Session = Depends(get_db)):
    user = user_services.change_user_name(db, id=current_user.id, name=name)
    raise HTTPException(status_code=200, detail="name change successful, Your name is "+user.name)


@router.put("/change/password")
async def changePassword(password: schemas.UserChangePassword, current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                            db: Session = Depends(get_db)):
    # check_password(db,)
    db_user = user_services.get_user_by_id(db, user_id=current_user.id)
    if db_user:
        passwd = password.password.encode('utf8')
        hashed_password = db_user.hashed_password.encode('utf8')
        matched = bcrypt.checkpw(passwd, hashed_password)
        if matched:
            newHashPwd = bcrypt.hashpw(password.new_password.encode('utf8'), bcrypt.gensalt())
            user_services.change_user_pwd(db, db_user, newHashPwd)
            logger.info(f"Change password success")
            raise HTTPException(status_code=200, detail="Change password success")
    raise HTTPException(status_code=401, detail="Incorrect email or password")


@router.post("/send_email")
async def sending_email(reciever: str):
    send_email(sending_email)
    return 200