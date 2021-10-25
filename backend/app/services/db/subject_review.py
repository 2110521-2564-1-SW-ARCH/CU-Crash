from sqlalchemy.orm import Session
from fastapi import Depends
import logging

from app import models, schemas
from . import base, get_db

logger = logging.getLogger()


def get_review_by_id(db: Session, id: int):
    return base.get_first_by_key_value(db=db, model=models.SubjectReview,
                                       key=models.SubjectReview.id, value=id)


def get_review_by_subject_id(db: Session, subject_id: str, order_by=models.SubjectReview.updated_at):
    return base.get_all_by_key_value(db=db, model=models.SubjectReview,
                                             key=models.SubjectReview.subject_id, value=subject_id,
                                             order_by=order_by)


def get_review_by_category(db: Session, category: models.SubjectCategory, order_by=models.SubjectReview.updated_at):
    return base.get_all_by_filter(db=db, model=models.SubjectReview,
                                             filter=models.SubjectReview.subject.has(category=category),
                                             order_by=order_by)


def get_review_by_author_id(db: Session, author_id: int, order_by=models.SubjectReview.updated_at):
    return base.get_all_by_key_value(db=db, model=models.SubjectReview,
                                             key=models.SubjectReview.author_id, value=author_id,
                                             order_by=order_by)


def get_reviews(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    return base.get_all(db=db, model=models.SubjectReview,skip=skip, limit=limit, order_by = order_by)


def create_review(db: Session, review: schemas.SubjectReviewCreate):
    logger.info(f"Creating review to DB: {review}")
    db_review = models.SubjectReview(**review.dict())
    return base.add_data(db=db, model_data=db_review)

def get_reviews_by_subject_name(db: Session, skip: int = 0, limit: int = 100, order_by = None):
    pass