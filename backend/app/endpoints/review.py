from fastapi import APIRouter, Depends
import os
import grpc
import logging
from google.protobuf.json_format import MessageToDict

from services.db.sql_connection import SessionLocal, engine
from services.db.sql_connection import Base
import dependencies

from recomendations.recommendations_pb2 import ReviewCategory, RecommendationRequest
from recomendations.recommendations_pb2_grpc import RecommendationsStub
from recomendations.recommendation import serve as start_server


Base.metadata.create_all(bind=engine)

logger = logging.getLogger()

router = APIRouter(
    prefix="/reviews",
    tags=["user"],
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


recommendations_host = os.getenv("RECOMMENDATIONS_HOST", "localhost")
recommendations_channel = grpc.insecure_channel(
    f"{recommendations_host}:50051"
)
recommendations_client = RecommendationsStub(recommendations_channel)


@router.get("/recommend")
def get_recommened_reviews(user_id: int, category: str, max_results: int):
    recommendations_request = RecommendationRequest(
        user_id=user_id, category=ReviewCategory.SAHA, max_results=max_results
    )
    recommendations_response = recommendations_client.Recommend(
        recommendations_request
    )
    logger.info(recommendations_response.recommendations)
    message = MessageToDict(recommendations_response)
    logger.info(type(message))
    return message
