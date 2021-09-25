from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None


class UserCreate(UserBase):
    email: EmailStr
    password: str
