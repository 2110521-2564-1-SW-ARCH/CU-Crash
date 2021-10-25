import logging
from app.models.Subject import Subject
import grpc
from concurrent import futures
from pymongo import MongoClient
import certifi
from bson.objectid import ObjectId

import supplementary_pb2_grpc
from supplementary_pb2 import(
    GetSupplementaryResponse,
    CreateSupplementaryResponse,
    Supplementary
)
from app.config import CONFIG

logger = logging.getLogger()

client = MongoClient(CONFIG.MONGO['uri'], tlsCAFile=certifi.where())


class SupplementarysServicer(supplementary_pb2_grpc.SupplementarysServicer):

    def CreateSupplementary(self, request, context):
        supplementary = {
            'owner_id': request.owner_id,
            'url': request.url,
            'subject_id': request.subject_id 
        }
        try:
            mongo = client['cucrash']
            ## add to mongo
            id = str( mongo.supplementary.insert_one(supplementary).inserted_id) 
            res = CreateSupplementaryResponse(
                id=id,
                url=request.url
            )
        except Exception as e:
            res = CreateSupplementaryResponse(
                id=-1,
                url=request.url
            )
        finally:
            client.close()
        return res

    def GetSupplementary(self, request, context):
        try:
            logger.debug('get supplementary recieved.')
            subject_id = request.subject_id
            mongo = client['cucrash']
            ## query all sup for this subject
            result = list(mongo.supplementary.find({"subject_id": subject_id}))
            logger.info(f'result: {result}')
            
            supplementarys = [Supplementary(
                owner_id=supplementary['owner_id'],
                url=supplementary['url'],
                subject_id=supplementary['subject_id']
            )
                   for supplementary in result]
            logger.info(supplementarys)
        except Exception as e:
            supplementarys = []
        finally:
            client.close()
        return GetSupplementaryResponse(supplementarys=supplementarys)



def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    supplementary_pb2_grpc.add_SupplementarysServicer_to_server(
        SupplementarysServicer(), server
    )
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logger.info('running GRPC Server...')
    serve()