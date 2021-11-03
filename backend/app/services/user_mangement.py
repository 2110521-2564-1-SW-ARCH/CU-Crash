from app.services.db import user as user_services
import bcrypt
from fastapi import HTTPException

def check_password(user):
    passwd = user.password.encode('utf8')
    hashed_password = db_user.hashed_password.encode('utf8')
    matched = bcrypt.checkpw(passwd, hashed_password)
    if not matched :
        raise HTTPException(status_code=401, detail="Incorrect email or password")