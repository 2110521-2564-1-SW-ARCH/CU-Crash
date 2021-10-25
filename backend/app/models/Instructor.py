from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, Integer, String, Enum, func, select
from sqlalchemy.orm import relationship, column_property
from sqlalchemy.ext.hybrid import hybrid_property

from app.services.db.sql_connection import Base
from app.models import InstructorReview


class Department(PyEnum):
    CHULA = 'Chula'
    EDU = 'Education'
    PSY = 'Psychology'
    DENT = 'Dentistry'
    LAW = 'Law'
    COM_ARTS = 'Communication Arts'
    NURS = 'Nursing'
    BANSHI = 'Commerce and Accountancy'
    POL = 'Political Science'
    SCI = 'Science'
    SPSC = 'Sports Science'
    ENG = 'Engineering'
    FAA = 'Fine and Applied Arts'
    ARCH = 'Architecture'
    AHS = 'Allied Health Sciences'
    VET = 'Veterinary Science'
    ART = 'Arts'
    PHARM = 'Pharmaceutical Sciences'
    ECON = 'Economics'
    MED = 'Medicine'
    OTHER = 'Other'

class Instructor(Base):
    
    __tablename__ = "instructors"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    short_name = Column(String(20), unique=True)
    first_name = Column(String(100,collation="Thai_CI_AS"), unique=True) #collation ภาษาไทย
    last_name = Column(String(100,collation="Thai_CI_AS"), unique=True) #collation ภาษาไทย
    department = Column(Enum(Department))

    reviews = relationship("InstructorReview", back_populates="instructor")
    
    @hybrid_property
    def full_name(self):
        return self.first_name + " " + self.last_name
    
    @hybrid_property
    def rating_count(self):
        '''average of review.rating'''
        ratings = [r.rating for r in self.reviews]
        return len(ratings)

    @hybrid_property
    def average_rating(self):
        '''average of review.rating'''
        ratings = [r.rating for r in self.reviews]
        try:
            return sum(ratings) / len(ratings)
        except ZeroDivisionError:
            return 0 # the default value

    @average_rating.expression
    def average_vote_value(cls):
        return func.coalesce(func.avg(InstructorReview.rating), 0)