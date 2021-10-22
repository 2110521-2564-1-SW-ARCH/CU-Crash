from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy import desc
import bcrypt
import logging

from app import models, schemas
from app.services.db.sql_connection import get_db

logger = logging.getLogger()

db = get_db()

def get_first_by_key_value(db: Session, model, key, value):
    return db.query(model).filter(key == value).first()


def get_all_by_key_value(db: Session, model, key, value):
    return db.query(model).filter(key == value).all()


def get_all_by_key_value_ordered(db: Session, model, key, value, order_by):
    return db.query(model).filter(key == value).order_by(desc(order_by)).all()


def get_all(db: Session, model, skip: int = 0, limit: int = 100):
    return db.query(model).offset(skip).limit(limit).all()


def add_data(db: Session, model_data):
    db.add(model_data)
    db.commit()
    db.refresh(model_data)
    return model_data