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

    class Config:

        orm_mode = True

class UserChangePassword(BaseModel):
    password: str = 'pwd1234'
    new_password: str = 'pwd4567'

class UserResetPassword(BaseModel):
    new_password: str = 'pwd1234'
    identifier: str