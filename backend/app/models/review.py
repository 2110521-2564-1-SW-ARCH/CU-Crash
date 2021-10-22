from enum import Enum as PyEnum

from sqlalchemy import Column, DateTime, Integer, String, Enum, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Float

from app.services.db.sql_connection import Base, engine


class ReviewCategory(PyEnum):
    SAHA = 'saha'
    SCIENCE = 'science'
    SOCIAL = 'social'
    HUMAN = 'human'


class Review(Base):

    __tablename__ = "reviews"
    __table_args__ = {'extend_existing': True,}

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    category = Column(Enum(ReviewCategory))
    author = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    content = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
