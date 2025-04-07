from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="Prediction API")
app.include_router(router)

