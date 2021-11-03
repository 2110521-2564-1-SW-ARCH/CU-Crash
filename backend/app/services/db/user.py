from sqlalchemy.orm import Session
import bcrypt
import logging

from app import models, schemas
from . import base

logger = logging.getLogger()

def get_user_by_id(db: Session, user_id: int):
    return base.get_first_by_key_value(db=db, model=models.User,
                                 key=models.User.id, value=user_id)


def get_user_by_email(db: Session, email: str):
    return base.get_first_by_key_value(db=db, model=models.User,
                                 key=models.User.email, value=email)


def get_users(db: Session,limit: int = 100):
    return base.get_all(db=db, model=models.User, limit=limit)


def create_user(db: Session, user: schemas.UserCreate):
    logger.info(f"Creating user to DB: {user}")
    passwd = bcrypt.hashpw(user.password.encode('utf8'), bcrypt.gensalt())
    db_user = models.User(**user.dict(exclude={'password'}), hashed_password=passwd)
    return base.add_data(db=db, model_data=db_user)

def change_user_name(db: Session, id, name):
    return base.update_name(db= db, model=models.User, key= models.User.id, id = id, name=name)
    
def change_user_pwd(db: Session, db_user, newHashPwd):
  return base.update_pwd(db= db, model=models.User, key= models.User.id, db_user = db_user, newHashPwd= newHashPwd)

'''def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item'''
