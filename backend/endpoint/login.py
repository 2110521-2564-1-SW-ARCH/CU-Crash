from fastapi import APIRouter, Depends

import dependencies 

router = APIRouter(
    prefix="/login",
    tags=["login"],
    dependencies=[Depends(dependencies.get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.post("/items/")
async def create(test: str):
    return  test
