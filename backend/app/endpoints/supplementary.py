from fastapi import APIRouter, Depends
from pydantic import AnyUrl, constr
from typing import List
import os
import grpc
from google.protobuf.json_format import MessageToDict
from pymongo import MongoClient
import certifi

import logging

from app.supplementary.supplementary_pb2 import (
    GetSupplementaryRequest,
    CreateSupplementaryRequest
)
from app.supplementary.supplementary_pb2_grpc import SupplementarysStub
from app.config import CONFIG
from app.services.db import get_db, subject as subject_services
from app import schemas, models, dependencies

logger = logging.getLogger()

router = APIRouter(
    prefix="/supplementary",
    tags=["supplementary"],
    responses={404: {"description": "Not found"}},
)

grpc_host = os.getenv("GRPC_HOST", "localhost")
supplementary_channel = grpc.insecure_channel(
    f"{grpc_host}:50051"
)
supplementary_client = SupplementarysStub(supplementary_channel)


@router.get("/subject")
def get_subject_supplementarys(subject_id: constr(regex=r'[0-9]{7}'),
                               current_user: schemas.User = Depends(
                               dependencies.get_current_active_user)):
    get_supplementary_request = GetSupplementaryRequest(
        subject_id=subject_id
    )
    get_supplementary_response = supplementary_client.GetSupplementary(
        get_supplementary_request
    )
    message = MessageToDict(get_supplementary_response)
    logger.info(type(message))
    return message


@router.post("/create")
def create_supplementary(subject_id: constr(regex=r'[0-9]{7}'), url: AnyUrl,
                         current_user: schemas.User = Depends(
        dependencies.get_current_active_user)):
    create_supplementary_request = CreateSupplementaryRequest(
        subject_id=subject_id, owner_id=current_user.id, url=url
    )
    create_supplementary_response = supplementary_client.CreateSupplementary(
        create_supplementary_request
    )
    message = MessageToDict(create_supplementary_response)
    logger.info(type(message))
    return message


@router.get("/all", response_model=List[dict])
def get_all(current_user: schemas.User = Depends(
            dependencies.get_current_active_user),
            db=Depends(get_db)):
    client = MongoClient(CONFIG.MONGO['uri'], tlsCAFile=certifi.where())
    mongo = client['cucrash']
    result = list(mongo.supplementary.find())
    for item in result:
        item['_id'] = str(item['_id'])
        item['subject'] = subject_services.get_subject_by_id(
            db=db, id=item['subject_id'])
    # logger.info(f'result: {result}')
    return result
