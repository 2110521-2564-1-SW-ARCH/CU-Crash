from sqlalchemy.orm import Session
from fastapi import Depends
import logging

from app import models, schemas
from . import base, get_db

logger = logging.getLogger()


def get_subject_by_id(db: Session, id: int):
    return base.get_first_by_key_value(db=db, model=models.Subject,
                                       key=models.Subject.id, value=id)


def get_subject_by_short_name(db: Session, short_name: str, order_by=models.Subject.id):
    return base.get_all_by_key_value_ordered(db=db, model=models.Subject,
                                             key=models.Subject.short_name, value=short_name,
                                             order_by=order_by)


def get_subject_by_category(category: models.SubjectCategory, db: Session, order_by=models.Subject.id):
    return base.get_all_by_key_value_ordered(db=db, model=models.Subject,
                                             key=models.Subject.category, value=category,
                                             order_by=order_by)


def get_subjects(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    return base.get_all(db=db, model=models.Subject,skip=skip, limit=limit, order_by = order_by)


def is_subject_exist(db: Session, subject: schemas.SubjectCreate):
    # check id
    if base.get_first_by_key_value(db, model=models.Subject, key=models.Subject.id, value=subject.id):
        return "Subject with this id is already exists"
    # short name
    if base.get_first_by_key_value(db, model=models.Subject, key=models.Subject.id, value=subject.id):
        return "Subject with this id is already exists"
    # fullname
    if base.get_first_by_key_value(db, model=models.Subject, key=models.Subject.id, value=subject.id):
        return "Subject with this id is already exists"


def create_subject(db: Session, subject: schemas.SubjectCreate):
    logger.info(f"Creating subject to DB: {subject}")
    db_subject = models.Subject(**subject.dict())
    return base.add_data(db=db, model_data=db_subject)


'''def create_subject_item(db: Session, item: schemas.ItemCreate,_subject_id: int):
    db_item = models.Item(**item.dict(), owner_id_subject_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item'''
