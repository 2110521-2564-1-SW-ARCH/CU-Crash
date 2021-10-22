from fastapi import APIRouter, Depends
from fastapi_cloud_drives import GoogleDrive
from fastapi_cloud_drives import GoogleDriveConfig

import logging

from app.services.db import get_mongo

logger = logging.getLogger()

router = APIRouter(
    prefix="/supplementary",
    tags=["supplementary"],
    responses={404: {"description": "Not found"}},
)

google_conf = {
    "CLIENT_ID_JSON": "app/client_id.json",
    "SCOPES": [
        "https://www.googleapis.com/auth/drive"
    ]
}

config = GoogleDriveConfig(**google_conf)

gdrive = GoogleDrive(config)


@router.get("/create_folder")
async def create_folder():
    resp = await gdrive.create_folder(folder_name="Examples")
    return {"message": "success"}
