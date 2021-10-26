from sqlalchemy.orm import Session
from fastapi import Depends
import logging

from app import models, schemas
from . import base, get_db

logger = logging.getLogger()

def get_instructor_by_id(db: Session, id: int):
    return base.get_first_by_key_value(db=db, model=models.Instructor,
                                       key=models.Instructor.id, value=id)


def get_instructor_by_short_name(db: Session, short_name: str, order_by=models.Instructor.id):
    return base.get_all_by_key_value(db=db, model=models.Instructor,
                                             key=models.Instructor.short_name, value=short_name,
                                             order_by=order_by)


def get_instructor_by_full_name(db: Session, full_name: str, order_by=models.Instructor.id):
    return base.get_all_by_key_value(db=db, model=models.Instructor,
                                             key=models.Instructor.full_name, value=full_name,
                                             order_by=order_by)


def get_instructor_by_category(category: models.Department, db: Session, order_by=models.Instructor.id):
    return base.get_all_by_key_value(db=db, model=models.Instructor,
                                             key=models.Instructor.category, value=category,
                                             order_by=order_by)


def get_instructors(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    return base.get_all(db=db, model=models.Instructor,skip=skip, limit=limit, order_by = models.Instructor.department)


def is_instructor_exist(db: Session, instructor: schemas.InstructorCreate):
    # check short name
    if base.get_first_by_key_value(db, model=models.Instructor, key=models.Instructor.short_name, value=instructor.short_name):
        return "Subject with this id is already exists"
    # short last name
    if base.get_first_by_key_value(db, model=models.Instructor, key=models.Instructor.last_name, value=instructor.last_name):
        return "Subject with this id is already exists"
    # fullname
    if base.get_first_by_key_value(db, model=models.Instructor, key=models.Instructor.id, value=instructor.id):
        return "Subject with this id is already exists"


def create_instructor(db: Session, instructor: schemas.InstructorCreate):
    logger.info(f"Creating Instructor to DB: {instructor}")
    db_instructor = models.Instructor(**instructor.dict())
    return base.add_data(db=db, model_data=db_instructor)