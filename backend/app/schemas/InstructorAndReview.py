from app.models.Instructor import Department
from sqlalchemy.sql.sqltypes import DateTime
from pydantic import BaseModel, validator, constr
from typing import List
from typing import Optional
from datetime import datetime
import string

from app.schemas.User import User


class InstructorBase(BaseModel):
    short_name: str
    first_name: str
    last_name: str
    department: Department
    
    @validator('short_name')
    def must_be_upper(cls, v):
        return v.upper()
    
    @validator('first_name', 'last_name')
    def must_be_capital(cls, v):
        return string.capwords(v)
    
    class Config:
        
        orm_mode = True


class InstructorReviewBase(BaseModel):
    rating: float = 4.5
    content: str = 'Description'
    
    @validator('rating')
    def rating_should_betwee_zero_five(cls, v):
        if v < 0 and v > 10:
            raise ValueError('rating should between 0-10 ')
        return v


class InstructorReviewCreate(InstructorReviewBase):
    author_id: Optional[int]
    instructor_id: int
    created_at: Optional[datetime] = datetime.utcnow()


class InstructorReviewWithoutInstructor(InstructorReviewBase):
    
    id: int
    author: User
    updated_at: datetime

    class Config:

        orm_mode = True


class InstructorCreate(InstructorBase):
    pass


class Instructor(InstructorBase):

    id: int
    full_name: str
    average_rating: float = 0
    rating_count: int

    class Config:

        orm_mode = True


class InstructorWithReviews(Instructor):

    reviews: List[InstructorReviewWithoutInstructor]

    class Config:

        orm_mode = True


class InstructorReview(InstructorReviewBase):
    
    id: int
    author: User
    instructor: Instructor
    updated_at: datetime

    class Config:

        orm_mode = True