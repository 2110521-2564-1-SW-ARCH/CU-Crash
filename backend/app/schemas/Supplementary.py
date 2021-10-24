from pydantic import BaseModel,AnyUrl

class SupplementaryBase(BaseModel):
    url: AnyUrl = 'www.example.com'

