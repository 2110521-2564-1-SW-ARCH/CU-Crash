from fastapi import Header, HTTPException

async def get_token_header(api_key: str = Header(...)):
    if api_key != "apikey":
        raise HTTPException(status_code=403, detail="Unauthorized request")