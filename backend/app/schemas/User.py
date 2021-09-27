from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


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