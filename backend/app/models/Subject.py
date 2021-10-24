from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, Integer, String, Enum, func, select
from sqlalchemy.orm import relationship, column_property

from app.services.db.sql_connection import Base
from app.models import Review


class SubjectCategory(PyEnum):
    SAHA = 'saha'
    SCIENCE = 'science'
    SOCIAL = 'social'
    HUMAN = 'human'


class Subject(Base):
    
    __tablename__ = "subjects"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    short_name = Column(String(20), unique=True)
    full_name = Column(String(100), unique=True)
    category = Column(Enum(SubjectCategory))
    is_exist = Column(Boolean, default=True)
    avg_rating = column_property(
        select([func.avg(Review.id)])
        .where(Review.subject_id == id)
    )
    rating_count = column_property(
        select([func.count(Review.id)])
        .where(Review.subject_id == id)
    )

    reviews = relationship("Review", back_populates="subject")
