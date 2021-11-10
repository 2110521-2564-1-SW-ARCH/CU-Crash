from app.services.db import user as user_services
import bcrypt
from fastapi import HTTPException
import logging

logger = logging.getLogger()

def check_password(user,db_user):
    passwd = user.password.encode('utf8')
    hashed_password = db_user.hashed_password.encode('utf8')
    matched = bcrypt.checkpw(passwd, hashed_password)
    if not matched :
        logger.info("password mismatch.")
        raise HTTPException(status_code=417, detail="Password not matched")
    return matched