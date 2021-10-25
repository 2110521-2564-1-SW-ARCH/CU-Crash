from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, Integer, String, Enum, func, select
from sqlalchemy.orm import relationship, column_property
from sqlalchemy.ext.hybrid import hybrid_property

from app.services.db.sql_connection import Base
from app.models import SubjectReview


class SubjectCategory(PyEnum):
    SAHA = 'saha'
    SCIENCE = 'science'
    SOCIAL = 'social'
    HUMAN = 'human'


class Subject(Base):
    
    __tablename__ = "subjects"
    __table_args__ = {'extend_existing': True}

    id = Column(String(7), primary_key=True, index=True)
    short_name = Column(String(20), unique=True)
    full_name = Column(String(100,collation="Thai_CI_AS"), unique=True) #collation ภาษาไทย
    category = Column(Enum(SubjectCategory))
    is_exist = Column(Boolean, default=True)

    rating_count = column_property(
        select([func.count(SubjectReview.id)])
        .where(SubjectReview.subject_id == id)
    )

    reviews = relationship("SubjectReview", back_populates="subject")

    @hybrid_property
    def average_rating(self):
        '''average of review.rating'''
        ratings = [r.rating for r in self.reviews]
        try:
            return sum(ratings) / len(ratings)
        except ZeroDivisionError:
            return 0 # the default value

    @average_rating.expression
    def average_rating_value(cls):
        return func.coalesce(func.avg(SubjectReview.rating), 0)