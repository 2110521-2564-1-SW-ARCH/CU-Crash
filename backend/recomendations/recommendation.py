from concurrent import futures
import logging
import random
import logging

import grpc

from recommendations_pb2 import (
    ReviewCategory,
    ReviewRecommendation,
    RecommendationResponse,
)
import recommendations_pb2_grpc

reviews_by_category = {
    ReviewCategory.SAHA: [
        ReviewRecommendation(id=1, subject="WINE EDUCATION",
                             body="This is very good",
                             category='saha',
                             author='Superman',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=2, subject="WASTE MANAGEMENT",
                             body="This is very good",
                             category='saha',
                             author='Jame',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=3, subject="PROF COMM SKL INNO",
                             body="This is very good",
                             category='saha',
                             author='John',
                             created_at='01-02-2021'),
    ],
    ReviewCategory.SCIENCE: [
        ReviewRecommendation(id=4,
                             subject="DRUG DAILY LIFE",
                             body="This is very good",
                             category='science',
                             author='Knot',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=5, subject="PHYS BIO SYS",
                             body="This is very good",
                             category='science',
                             author='Job',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=6, subject="NATURAL SCIENCE",
                             body="This is very good",
                             category='science',
                             author='Heart',
                             created_at='01-02-2021'),
    ],
    ReviewCategory.SOCIAL: [
        ReviewRecommendation(id=7, subject="FOUNDATION ECON",
                             body="Great markq kaa very good.",
                             category='social',
                             author='Book',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=8, subject="PRIN MKTG",
                             body="This is very hard, go away.",
                             category='social',
                             author='Up',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=9, subject="INTRO TO LAW",
                             body="If you are doing great at this, you are books.",
                             category='social',
                             author='Tar',
                             created_at='01-02-2021'),
    ],
    ReviewCategory.HUMAN: [
        ReviewRecommendation(id=10, subject="PHILOS LOGIC",
                             body="This is awards to our universe.",
                             category='human',
                             author='Superman',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=11, subject="BUDDHIST TEACHING",
                             body="Believe me, this is the best.",
                             category='human',
                             author='Superman',
                             created_at='01-02-2021'),
        ReviewRecommendation(id=12, subject="JAPAN TODAY",
                             body="Konichiwa itai des.",
                             category='human',
                             author='Superman',
                             created_at='01-02-2021'),
    ],
}


class RecommendationService(
    recommendations_pb2_grpc.RecommendationsServicer
):
    def Recommend(self, request, context):
        if request.category not in reviews_by_category:
            context.abort(grpc.StatusCode.NOT_FOUND, "Category not found")

        reviews_for_category = reviews_by_category[request.category]
        num_results = min(request.max_results, len(reviews_for_category))
        reviews_to_recommend = random.sample(
            reviews_for_category, num_results
        )

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
    serve()
