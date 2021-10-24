from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr = 'example@email.com'


class UserLogin(UserBase):
    password: str = 'pwd1234'


class UserCreate(UserBase):
    name: str = 'John Wicker'
    password: str = 'pwd1234'


class User(UserBase):

    id: int
    name: str
    is_active: bool

    class Config:

        orm_mode = True
