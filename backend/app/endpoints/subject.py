from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import logging
import bcrypt

from app.services.db.sql_connection import get_db
from app.services.db import subject as subject_services
from app import models, schemas, dependencies


logger = logging.getLogger()

router = APIRouter(
    prefix="/subject",
    tags=["subject"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db)):
    logger.info(f'Get creating Subject: {subject}')
    subject_existed = subject_services.is_subject_exist(db, subject=subject)
    if subject_existed:
        logger.info(f'subject {subject} is already existed({subject_existed}).')
        raise HTTPException(status_code=400, detail=subject_existed)
    return subject_services.create_subject(db, subject)


@router.get("/all")
async def get_all_subject(db: Session = Depends(get_db)):
    subjects = subject_services.get_subjects(db)
    return subjects
    pass


@router.get("/all_with_reviews", response_model=List[schemas.SubjectWithReviews])
async def get_all_subject(db: Session = Depends(get_db)):
    subjects = subject_services.get_subjects(db)
    return subjects
    pass