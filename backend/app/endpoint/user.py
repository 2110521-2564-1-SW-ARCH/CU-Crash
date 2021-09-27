from backend.app.dependencies import jwt_token
from fastapi import APIRouter, Depends, HTTPException
from service.db import test_crud as crud, dummy_models as models, dummy_schemas as schemas
from sqlalchemy.orm import Session

from service.db.sql_connection import SessionLocal, engine
import logging
import dependencies
import bcrypt

models.Base.metadata.create_all(bind=engine)

logger = logging.getLogger()

router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
async def create(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)


@router.post("/login")
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    logger.info("Test Login")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        passwd = bytes(user.password, encoding='utf-8')
        matched = bcrypt.checkpw(passwd, db_user.hashed_password)
        if matched:
            access_token = jwt_token(db_user)
            return {"access_token": access_token}
    raise HTTPException(status_code=401, detail="Incorrect email or password")
