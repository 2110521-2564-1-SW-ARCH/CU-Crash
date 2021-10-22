from sqlalchemy.sql.sqltypes import DateTime
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.models.Review import ReviewCategory


class ReviewBase(BaseModel):
    subject: str = 'Subject'
    category: ReviewCategory
    author: str = 'Writer'
    rating: float = 4.5
    content: str = 'Description'


class ReviewCreate(ReviewBase):
    created_at: Optional[datetime] = datetime.utcnow()


class Review(ReviewBase):

    id: int
    updated_at: datetime

    class Config:

        orm_mode = True
