from app.models.Subject import SubjectCategory
from sqlalchemy.sql.sqltypes import DateTime
from pydantic import BaseModel, validator, constr
from typing import List
from typing import Optional
from datetime import datetime
import string

from app.schemas.User import User


class SubjectBase(BaseModel):
    id: constr(regex=r'[0-9]{7}') = "2110222"
    short_name: str
    full_name: str
    category: SubjectCategory
    
    @validator('short_name')
    def must_be_upper(cls, v):
        return v.upper()
    
    @validator('full_name')
    def must_be_capital(cls, v):
        return string.capwords(v)
    
    @validator('id')
    def subject_must_exist(cls, v):
        if len(v) != 7:
            raise ValueError('subject id is not valid(7 Integer).')
        return v
    
    class Config:
    
        orm_mode = True


class ReviewBase(BaseModel):
    rating: float = 4.5
    content: str = 'Description'


class ReviewCreate(ReviewBase):
    # author_id: Optional[int]
    subject_id: str = "2110221"
    # created_at: Optional[datetime] = datetime.utcnow()
    
    @validator('subject_id')
    def subject_must_exist(cls, v):
        if len(v) != 7:
            raise ValueError('subject id is not valid(7 Integer).')
        return v


class Review(ReviewBase):

    id: int
    author: User
    subject: SubjectBase
    updated_at: datetime

    class Config:

        orm_mode = True


class ReviewWithoutSubject(ReviewBase):
    
    id: int
    author: User
    updated_at: datetime

    class Config:

        orm_mode = True


class SubjectCreate(SubjectBase):
    pass


class Subject(SubjectBase):

    is_exist: bool
    avg_rating: float = 0
    rating_count: int
    
    @validator('avg_rating', pre=True)
    def subject_must_exist(cls, v):
        if v is None:
            return 0
        return v

    class Config:

        orm_mode = True


class SubjectWithReviews(Subject):

    reviews: List[ReviewWithoutSubject]

    class Config:

        orm_mode = True
