from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
import logging
from sqlalchemy.orm import Session

from app.services.db.sql_connection import get_db
from app.services.db import instructor as instructor_services
from app import models, schemas, dependencies

from app.ex_rabbitmq.Sent import rabbit_sent

logger = logging.getLogger()

router = APIRouter(
    prefix="/instructor",
    tags=["instructor"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)

@router.post("/create")
async def create_review(instructor: schemas.InstructorCreate,
                        db: Session = Depends(get_db)):
    find = instructor_services.get_instructor_by_full_name(db=db, full_name=instructor.first_name+" "+instructor.last_name)
    if find :
        raise HTTPException(
            status_code=400,
            detail="Instructor is already.",
        ) 
    return instructor_services.create_instructor(db,instructor)

@router.get("/all", response_model=List[schemas.Instructor])
async def get_all_reviews(db: Session = Depends(get_db)):
    instructors = instructor_services.get_instructors(db)
    return instructors


@router.get("/all_with_reviews", response_model=List[schemas.InstructorWithReviews])
async def get_all_subject(db: Session = Depends(get_db)):
    subjects = instructor_services.get_instructors(db)
    return subjects