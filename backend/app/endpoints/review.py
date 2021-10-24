from typing import List
from fastapi import APIRouter, Depends
import os
import grpc
import logging
from google.protobuf.json_format import MessageToDict
from sqlalchemy.orm import Session

from app.services.db.sql_connection import get_db
from app.services.db import review as review_services
from app import models, schemas, dependencies
from app.models.Subject import SubjectCategory

from recomendations.recommendations_pb2 import RecommendationRequest
from recomendations.recommendations_pb2_grpc import RecommendationsStub


logger = logging.getLogger()

router = APIRouter(
    prefix="/reviews",
    tags=["review"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


recommendations_host = os.getenv("RECOMMENDATIONS_HOST", "localhost")
recommendations_channel = grpc.insecure_channel(
    f"{recommendations_host}:50051"
)
recommendations_client = RecommendationsStub(recommendations_channel)


@router.get("/recommend/")
def get_recommened_reviews(category: SubjectCategory, max_results: int,
                           current_user: schemas.User = Depends(
                               dependencies.get_current_active_user)):
    recommendations_request = RecommendationRequest(
        user_id=1, category=category._name_, max_results=max_results
    )
    recommendations_response = recommendations_client.Recommend(
        recommendations_request
    )
    logger.info(recommendations_response.recommendations)
    message = MessageToDict(recommendations_response)
    logger.info(type(message))
    return message


@router.post("/create")
async def create_review(review: schemas.ReviewCreate,
                        current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                        db: Session = Depends(get_db)):
    review.author_id = current_user.id
    review_services.create_review(db=db, review=review)
    return review


@router.get("/get_by_category")
async def get_review_by_category(category: SubjectCategory,
                                 current_user: schemas.User = Depends(
                                     dependencies.get_current_active_user),
                                 db: Session = Depends(get_db)):
    logger.info(f'get reviews from category: {category._name_}')
    reviews = review_services.get_review_by_category(db=db, category=category)
    return reviews


@router.get("/all", response_model=List[schemas.Review])
async def get_akk_reviews(current_user: schemas.User = Depends(
                            dependencies.get_current_active_user),
                          db: Session = Depends(get_db)):
    reviews = review_services.get_reviews(db)
    logger.info(f'Reviews: {  reviews[0].__dict__ }')
    return reviews