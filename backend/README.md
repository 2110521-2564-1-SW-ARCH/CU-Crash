# CU-Crash Backend

Run these code to set up!

```
cd backend
pip install poetry
pip3 install mysql-connector-python
poetry shell
poetry install
cd app
uvicorn main:app --reload
```

gRPC start server
```
cd backend
cd .\recomendations\
python .\recommendation.py
```

swagger!

```
http://127.0.0.1:8000/docs
```


