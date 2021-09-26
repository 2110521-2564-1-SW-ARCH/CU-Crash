from fastapi import  HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi import Security,HTTPException
from fastapi.security.api_key import APIKeyQuery, APIKeyCookie, APIKeyHeader

from starlette.status import HTTP_403_FORBIDDEN

from config import CONFIG


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


api_key_query = APIKeyQuery(name=CONFIG.API_KEY['name'], auto_error=False)
api_key_header = APIKeyHeader(name=CONFIG.API_KEY['name'], auto_error=False)
api_key_cookie = APIKeyCookie(name=CONFIG.API_KEY['name'], auto_error=False)


async def get_api_key(
    api_key_query: str = Security(api_key_query),
    api_key_header: str = Security(api_key_header),
    api_key_cookie: str = Security(api_key_cookie),
):

    if api_key_query == CONFIG.API_KEY['key']:
        return api_key_query
    elif api_key_header == CONFIG.API_KEY['key']:
        return api_key_header
    elif api_key_cookie == CONFIG.API_KEY['key']:
        return api_key_cookie
    else:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )
