from typing import List, Optional
from app.models.Instructor import Department
from fastapi import APIRouter, Depends, HTTPException, status
import logging
from sqlalchemy.orm import Session

from app.services.db.sql_connection import get_db
from app.services.db import (subject_review as subject_review_services,
                             subject as subject_services,
                             instructor_review as instructor_review_services,
                             instructor as instructor_services)
from app import models, schemas, dependencies
from app.models.Subject import SubjectCategory

from app.ex_rabbitmq.Sent import rabbit_sent

logger = logging.getLogger()

router = APIRouter(
    prefix="/review",
    tags=["review"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


###?   Subject Review  ###
@router.post("/subject_review/create")
async def create_review(review: schemas.SubjectReviewCreate,
                        current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                        db: Session = Depends(get_db)):
    subject = subject_services.get_subject_by_id(db=db, id=review.subject_id)
    if not subject:
        raise HTTPException(
            status_code=427,
            detail="Subject not found.",
        )
    review.author_id = current_user.id
    result = subject_review_services.create_review(db=db, review=review)
    rabbit_sent(review=review)
    return review


@router.get("/subject_review/get_by_category", response_model=List[schemas.SubjectReview])
async def get_review_by_category(category: Optional[SubjectCategory],
                                 current_user: schemas.User = Depends(
                                     dependencies.get_current_active_user),
                                 db: Session = Depends(get_db)):
    if category == '':
        reviews = subject_review_services.get_reviews(
            db, order_by=models.SubjectReview.updated_at)
    else:
        reviews = subject_review_services.get_review_by_category(
            db=db, category=category)
    return reviews


@router.get("/subject_review/all", response_model=List[schemas.SubjectReview])
async def get_all_reviews(current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    reviews = subject_review_services.get_reviews(db)
    return reviews


###?   Instructor Review  ###
@router.get("/instructor_review/recommend/", response_model=List[schemas.SubjectReview])
async def get_recommend_reviews(current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    reviews = instructor_review_services.get_reviews(
        db, order_by=models.SubjectReview.rating)
    return reviews


@router.post("/instructor_review/create")
async def create_instructor_review(review: schemas.InstructorReviewCreate,
                        current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                        db: Session = Depends(get_db)):
    subject = instructor_services.get_instructor_by_id(db=db, id=review.instructor_id)
    if not subject:
        raise HTTPException(
            status_code=427,
            detail="Instructor not found.",
        )
    review.author_id = current_user.id
    result = instructor_review_services.create_review(db=db, review=review)
    # rabbit_sent(review=review)
    return review


@router.get("/instructor_review/get_by_department", response_model=List[schemas.InstructorReview])
async def get_instructor_review_by_department(department: Optional[Department],
                                 current_user: schemas.User = Depends(
                                     dependencies.get_current_active_user),
                                 db: Session = Depends(get_db)):
    if department == '':
        reviews = instructor_review_services.get(
            db, order_by=models.InstructorReview.updated_at)
    else:
        reviews = instructor_review_services.get_review_by_department(
            db=db, department=department)
    return reviews


@router.get("/instructor_review/all", response_model=List[schemas.InstructorReview])
async def get_all_instructor_reviews(current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    reviews = instructor_review_services.get_reviews(db)
    return reviews


@router.get("/instructor_review/recommend/", response_model=List[schemas.InstructorReview])
async def get_recommend_instructor_reviews(current_user: schemas.User = Depends(
        dependencies.get_current_active_user),
        db: Session = Depends(get_db)):
    reviews = instructor_review_services.get_reviews(
        db, order_by=models.InstructorReview.rating)
    return reviews
