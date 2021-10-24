from typing import List
from fastapi import APIRouter, Depends
import logging
from sqlalchemy.orm import Session

from app.services.db.sql_connection import get_db
from app.services.db import review as review_services
from app import models, schemas, dependencies
from app.models.Subject import SubjectCategory


logger = logging.getLogger()

router = APIRouter(
    prefix="/reviews",
    tags=["review"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create_review(review: schemas.ReviewCreate,
                        current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                        db: Session = Depends(get_db)):
    review.author_id = current_user.id
    review_services.create_review(db=db, review=review)
    return review


@router.get("/get_by_category", response_model=List[schemas.Review])
async def get_review_by_category(category: SubjectCategory,
                                 current_user: schemas.User = Depends(
                                     dependencies.get_current_active_user),
                                 db: Session = Depends(get_db)):
    reviews = review_services.get_reviews(db)
    return reviews


@router.get("/all", response_model=List[schemas.Review])
async def get_all_reviews(current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                          db: Session = Depends(get_db)):
    reviews = review_services.get_reviews(db)
    return reviews


@router.get("/recommend/", response_model=List[schemas.Review])
async def get_recommend_reviews(current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                          db: Session = Depends(get_db)):
    reviews = review_services.get_reviews(db, order_by=models.Review.updated_at)
    return reviews