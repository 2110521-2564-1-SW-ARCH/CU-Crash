from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging
import bcrypt

from app.services.db.sql_connection import get_db
from app.services.db import user as user_services
from app.services import send_comfirmation_email, check_password, send_forgot_pasword_email
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
    user_dict = {'email': user.__dict__['email']}
    logging.info(f'Registering for: {user_dict}')
    token = jwt_token(user_dict)
    send_comfirmation_email(user.email, user.name, token)
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
    matched = check_password(user, db_user)
    if matched and db_user.is_active:
        access_token = jwt_token(schemas.User(**db_user.__dict__).dict())
        res = {"access_token": access_token,
               "user": {
                   "user_id": db_user.id,
                   "username": db_user.name,
                   "email": db_user.email}}
        logger.info(f"User Login success: {res}")
        return res
    logger.info("This user does not verify eamil yet.")
    raise HTTPException(status_code=427, detail="Please verify your email.")


@router.put("/change/name")
async def changeName(name: str, current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    user = user_services.change_user_name(db, id=current_user.id, name=name)
    user_dict = schemas.User(**user.__dict__).dict()
    logging.info(f'Change username success : {user_dict}')
    access_token = jwt_token(user_dict)
    logging.info(f'token: {access_token}')
    return {'access_token': access_token,
            'detail': "name change successful, Your name is "+user.name,
            'user': user_dict}


@router.put("/change/password")
async def changePassword(password: schemas.UserChangePassword, current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    db_user = user_services.get_user_by_id(db, user_id=current_user.id)
    matched = check_password(password, db_user)
    if matched:
        newHashPwd = bcrypt.hashpw(
            password.new_password.encode('utf8'), bcrypt.gensalt())
        user_services.change_user_pwd(db, db_user, newHashPwd)
        logger.info(f"Change password success")
        return {'detail': "Change password success"}


@router.put("/reset_password")
async def changePassword(password: schemas.UserResetPassword,
        db: Session = Depends(get_db)):
    db_user = dependencies.get_current_user(db, password.identifier)
    logger.info(db_user)
    newHashPwd = bcrypt.hashpw(
            password.new_password.encode('utf8'), bcrypt.gensalt())
    user_services.change_user_pwd(db, db_user, newHashPwd)
    logger.info(f"Reset password success")
    return {'detail': "Change password success"}


@router.post("/send_email")
async def sending_email(reciever: str, username: str):
    user_dict = {'email': reciever}
    logging.info(f'Registering for: {reciever}')
    token = jwt_token(user_dict)
    send_comfirmation_email(reciever, username, token)
    return 200


@router.get("/confirm_email")
async def confirm_email(token: str, db: Session = Depends(get_db)):
    user = dependencies.get_current_user(db, token)
    logger.info(user)
    user_dict = schemas.User(**user.__dict__).dict()
    logger.info(user_dict)
    user_services.verify_email(db, user_dict['id'])
    return f"email confirmation for {user_dict['name']} successfully"


@router.get("/forgot_password")
async def forgot_password(email: str,
        db: Session = Depends(get_db)):
    user = user_services.get_user_by_email(db=db, email=email)
    if not user:
        return f"This user does not exist"
    user_dict = schemas.User(**user.__dict__).dict()
    logging.info(f'Reseting password for: {user_dict["email"]}')
    token = jwt_token(user_dict)
    send_forgot_pasword_email(user_dict, token)
    return f"restting email for { user_dict['name'] } successfully"
