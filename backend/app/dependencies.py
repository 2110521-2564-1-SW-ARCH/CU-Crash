from fastapi import Header, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi import Security, Depends, FastAPI, HTTPException
from fastapi.security.api_key import APIKeyQuery, APIKeyCookie, APIKeyHeader, APIKey
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from starlette.status import HTTP_403_FORBIDDEN
from starlette.responses import RedirectResponse, JSONResponse

from config import config


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


api_key_query = APIKeyQuery(name=config.API_KEY['name'], auto_error=False)
api_key_header = APIKeyHeader(name=config.API_KEY['name'], auto_error=False)
api_key_cookie = APIKeyCookie(name=config.API_KEY['name'], auto_error=False)


async def get_api_key(
    api_key_query: str = Security(api_key_query),
    api_key_header: str = Security(api_key_header),
    api_key_cookie: str = Security(api_key_cookie),
):

    if api_key_query == config.API_KEY['key']:
        return api_key_query
    elif api_key_header == config.API_KEY['key']:
        return api_key_header
    elif api_key_cookie == config.API_KEY['key']:
        return api_key_cookie
    else:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )
