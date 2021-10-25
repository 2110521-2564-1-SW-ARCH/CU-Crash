from sqlalchemy.orm import Session
from fastapi import Depends
import logging

from app import models, schemas
from . import base, get_db

logger = logging.getLogger()

def get_review_by_id(db: Session, id: int):
    return base.get_first_by_key_value(db=db, model=models.InstructorReview,
                                       key=models.InstructorReview.id, value=id)


def get_review_by_instructor_id(db: Session, instructor_id: str, order_by=models.InstructorReview.updated_at):
    return base.get_all_by_key_value(db=db, model=models.InstructorReview,
                                             key=models.InstructorReview.instructor_id, value=instructor_id,
                                             order_by=order_by)


def get_review_by_department(db: Session, department: models.Department, order_by=models.InstructorReview.updated_at):
    return base.get_all_by_filter(db=db, model=models.InstructorReview,
                                             filter=models.InstructorReview.instructor.has(department=department),
                                             order_by=order_by)


def get_review_by_author_id(db: Session, author_id: str, order_by=models.InstructorReview.updated_at):
    return base.get_all_by_key_value(db=db, model=models.InstructorReview,
                                             key=models.InstructorReview.author_id, value=author_id,
                                             order_by=order_by)


def get_reviews(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    return base.get_all(db=db, model=models.InstructorReview,skip=skip, limit=limit, order_by = order_by)


def create_review(db: Session, review: schemas.InstructorReviewCreate):
    logger.info(f"Creating review to DB: {review}")
    db_review = models.InstructorReview(**review.dict())
    return base.add_data(db=db, model_data=db_review)

def get_reviews_by_instructor_name(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    pass