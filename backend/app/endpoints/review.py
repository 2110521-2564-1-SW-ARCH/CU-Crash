from fastapi import APIRouter, Depends
import os
import grpc
import logging
from google.protobuf.json_format import MessageToDict
from sqlalchemy.orm import Session

from app.services.db.sql_connection import get_db
from app.services.db import test_crud as crud
from app import models, schemas, dependencies
from app.models.review import ReviewCategory

from recomendations.recommendations_pb2 import RecommendationRequest
from recomendations.recommendations_pb2_grpc import RecommendationsStub


logger = logging.getLogger()

router = APIRouter(
    prefix="/reviews",
    tags=["user"],
    # dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


recommendations_host = os.getenv("RECOMMENDATIONS_HOST", "localhost")
recommendations_channel = grpc.insecure_channel(
    f"{recommendations_host}:50051"
)
recommendations_client = RecommendationsStub(recommendations_channel)


@router.get("/recommend/")
def get_recommened_reviews(category: ReviewCategory, max_results: int,
                           current_user: schemas.User = Depends(dependencies.get_current_active_user)):
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
async def create_review(current_user: schemas.User = Depends(dependencies.get_current_active_user),):
    return current_user
