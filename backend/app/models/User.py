from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from app.services.db.sql_connection import Base


class User(Base):
    
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
