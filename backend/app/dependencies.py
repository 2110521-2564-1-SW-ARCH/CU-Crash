from datetime import datetime, timedelta
import logging

from fastapi import Depends, HTTPException, Security, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi.security.api_key import APIKeyQuery, APIKeyCookie, APIKeyHeader
from pydantic import BaseModel
from typing import Optional
import jwt

from app.services.db.sql_connection import get_db
from app.config import CONFIG
from app import schemas
from app.services.db import user as user_services


logger = logging.getLogger()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login", auto_error=False)


api_key_query = APIKeyQuery(name=CONFIG.API_KEY['name'], auto_error=False)
api_key_header = APIKeyHeader(name=CONFIG.API_KEY['name'], auto_error=False)
api_key_cookie = APIKeyCookie(name=CONFIG.API_KEY['name'], auto_error=False)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


async def get_api_key(
    api_key_query: str = Security(api_key_query),
    api_key_header: str = Security(api_key_header),
    api_key_cookie: str = Security(api_key_cookie),
):

    if api_key_query == CONFIG.API_KEY['key']:
        return api_key_query
    elif api_key_header == CONFIG.API_KEY['key']:
        return api_key_header
    elif api_key_cookie == CONFIG.API_KEY['key']:
        return api_key_cookie
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
        )


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, CONFIG.TOKEN['secret_key'], algorithm=CONFIG.TOKEN['algorithm'])
    return encoded_jwt


def jwt_token(data: dict):
    access_token_expires = timedelta(
        minutes=CONFIG.TOKEN['access_token_expire_minutes'])
    access_token = create_access_token(
        data=data, expires_delta=access_token_expires
    )
    return access_token


def get_current_user(db: Session = Depends(get_db), token: str = Security(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, CONFIG.TOKEN['secret_key'],
                             algorithms=[CONFIG.TOKEN['algorithm']])
    except jwt.exceptions.DecodeError:
        logger.info(f'cannot get payload. from token: {token}')
        raise credentials_exception
    except jwt.exceptions.ExpiredSignatureError:
        logger.info('token has expired.')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This Token is Expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email: str = payload.get("email")
    if email is None:
        logger.info('User with this email not found.')
        raise credentials_exception
    token_data = TokenData(username=email)
    user = user_services.get_user_by_email(db, email=token_data.username)
    if user is None:
        logger.info('User is None')
        raise credentials_exception
    return user


async def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
