from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr


class UserLogin(UserBase):
    password: str


class UserCreate(UserBase):
    name: str
    password: str


class User(UserBase):

    id: int
    is_active: bool

    class Config:

        orm_mode = True
