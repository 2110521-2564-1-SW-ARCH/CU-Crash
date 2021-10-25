from enum import Enum as PyEnum

from sqlalchemy import Column, ForeignKey, DateTime, Integer, String, Enum, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.orm import relationship

from app.services.db.sql_connection import Base, engine


class SubjectReview(Base):

    __tablename__ = "subject_reviews"
    __table_args__ = {'extend_existing': True,}

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(String(7), ForeignKey("subjects.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float, nullable=False)
    content = Column(String(collation="Thai_CI_AS"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    author = relationship("User", back_populates="subject_reviewing")
    subject = relationship("Subject", back_populates="reviews")
