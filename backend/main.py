from fastapi import FastAPI

import dependencies
import endpoint.login


app = FastAPI()
login_router = endpoint.login.router

app.include_router(login_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
