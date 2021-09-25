from fastapi import FastAPI, Depends

import dependencies
from endpoint import user


app = FastAPI(
    dependencies=[Depends(dependencies.get_api_key)],
    responses={404: {"description": "Not found"}},
)
user_router = user.router

app.include_router(user_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
