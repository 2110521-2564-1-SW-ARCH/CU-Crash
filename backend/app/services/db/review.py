from sqlalchemy.orm import Session
from fastapi import Depends
import logging

from app import models, schemas
from . import base, get_db

logger = logging.getLogger()


def get_review_by_id(db: Session, id: int):
    return base.get_first_by_key_value(db=db, model=models.Review,
                                       key=models.Review.id, value=id)


def get_review_by_subject(db: Session, subject: str, order_by=models.Review.updated_at):
    return base.get_all_by_key_value_ordered(db=db, model=models.Review,
                                             key=models.Review.subject, value=subject,
                                             order_by=order_by)


def get_review_by_category(category: models.ReviewCategory, db: Session, order_by=models.Review.updated_at):
    return base.get_all_by_key_value_ordered(db=db, model=models.Review,
                                             key=models.Review.category, value=category,
                                             order_by=order_by)


def get_review_by_author(db: Session, author: str, order_by=models.Review.updated_at):
    return base.get_all_by_key_value_ordered(db=db, model=models.Review,
                                             key=models.Review.author, value=author,
                                             order_by=order_by)


def get_reviews(db: Session, limit: int = 100):
    return base.get_all(db=db, model=models.Review, limit=limit)


def create_review(db: Session, review: schemas.ReviewCreate):
    logger.info(f"Creating review to DB: {review}")
    db_review = models.Review(**review.dict())
    return base.add_data(db=db, model_data=db_review)


'''def create_review_item(db: Session, item: schemas.ItemCreate,_review_id: int):
    db_item = models.Item(**item.dict(), owner_id_review_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item'''