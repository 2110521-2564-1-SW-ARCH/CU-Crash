from enum import Enum as PyEnum

from sqlalchemy import Column, ForeignKey, DateTime, Integer, String, Enum, Float
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.orm import relationship

from app.services.db.sql_connection import Base, engine


class InstructorReview(Base):

    __tablename__ = "instructor_reviews"
    __table_args__ = {'extend_existing': True,}

    id = Column(Integer, primary_key=True, index=True)
    instructor_id = Column(Integer, ForeignKey("instructors.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float, nullable=False)
    content = Column(String(collation="Thai_CI_AS"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    author = relationship("User", back_populates="instructor_reviewing")
    instructor = relationship("Instructor", back_populates="reviews")
