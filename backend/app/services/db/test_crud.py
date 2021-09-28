from sqlalchemy.orm import Session
import bcrypt
import logging

from app import models, schemas

logger = logging.getLogger()

def get_user(db: Session, user_id: int):

    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):

    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):

    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    logger.info(f"Creating user to DB: {user}")
    passwd = bcrypt.hashpw(user.password.encode('utf8'), bcrypt.gensalt())
    db_user = models.User(**user.dict(exclude={'password'}), hashed_password=passwd)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


'''def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item'''
