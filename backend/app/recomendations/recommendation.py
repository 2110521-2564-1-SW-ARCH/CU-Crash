from concurrent import futures
import logging
import random
import logging
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Column, DateTime, Integer, String,
                        Enum, Float, create_engine, desc)
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.orm import sessionmaker


import grpc

from recommendations_pb2 import (
    ReviewCategory,
    ReviewRecommendation,
    RecommendationResponse,
)
import recommendations_pb2_grpc
from app.services.db import get_manual_db, get_review_by_category
from app.models import Review, ReviewCategory as ReviewCategory_py
from app import schemas


logger = logging.getLogger()


class RecommendationService(
    recommendations_pb2_grpc.RecommendationsServicer
):
    def Recommend(self, request, context):
        category = ReviewCategory.Name(request.category)
        logger.info(category)
        category = ReviewCategory_py[category]
        logger.info(category)
        db = get_manual_db()
        try:
            reviews_for_category = get_review_by_category(category=category, db=db,
                                                          order_by=Review.rating)  # read from db
        finally:
            db.close()
        reviews_to_recommend = reviews_for_category[:request.max_results]

        reviews_to_recommend = [ReviewRecommendation(
            id=review.id,
            subject=review.subject,
            body=review.content,
            category=review.category.value,
            author=review.author,
            created_at=review.created_at.strftime("%m/%d/%Y, %H:%M:%S")
        )
            for review in reviews_to_recommend]
        logger.info(f'result = {reviews_to_recommend}')
        return RecommendationResponse(recommendations=reviews_to_recommend)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    recommendations_pb2_grpc.add_RecommendationsServicer_to_server(
        RecommendationService(), server
    )
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logger.info('running GRPC Server...')
    serve()
