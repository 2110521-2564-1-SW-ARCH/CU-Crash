from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from sqlalchemy import desc, asc
import bcrypt
import logging

from app import models, schemas
from app.services.db.sql_connection import get_db

logger = logging.getLogger()

db = get_db()


def get_first_by_key_value(db: Session, model, key, value):
    return db.query(model).filter(key == value).first()


def get_all_by_filter(db: Session, model, filter, limit=100, order_by=None, desc=False):
    if not order_by:
        order_by = model.id
    if desc:
        return db.query(model).filter(filter).order_by(desc(order_by)).offset(0).limit(limit).all()
    else:
        return db.query(model).filter(filter).order_by(asc(order_by)).offset(0).limit(limit).all()


def get_all_by_key_value(db: Session, model, key, value, limit=100, order_by=None, desc=False):
    return get_all_by_filter(db, model, key == value, limit, order_by, desc)
    if not order_by:
        order_by = model.id
    if desc:
        return db.query(model).filter(key == value).order_by(desc(order_by)).offset(0).limit(limit).all()
    else:
        return db.query(model).filter(key == value).order_by(asc(order_by)).offset(0).limit(limit).all()


def get_all(db: Session, model, skip: int = 0, limit: int = 100, order_by=None, desc=False):
    if not order_by:
        order_by = model.id
    if desc:
        return db.query(model).order_by(desc(order_by)).offset(skip).limit(limit).all()
    else:
        return db.query(model).order_by(asc(order_by)).offset(skip).limit(limit).all()


def add_data(db: Session, model_data):
    try:
        db.add(model_data)
        db.commit()
        db.refresh(model_data)
    except Exception as e:
        logger.info(f"mongo error: { repr(e) } ")
        raise HTTPException(
            status_code=427,
            detail="Cannot create to database.",
        )
    return model_data
