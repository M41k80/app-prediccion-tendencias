from tracemalloc import start
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.product_lookup import get_product_id_from_name
from app.services.prediction import predict_sales  
from datetime import datetime, timedelta
import pandas as pd


router = APIRouter()

class SalesPredictionRequest(BaseModel):
    store_id: int
    promo: int
    school_holiday: int
    n_days: int
    start_date: str
    store_type: str
    assortment: str
    state_holiday: str
    product_name: str
    weather: float
    sentiment_score: float

@router.post("/predict_sales")
async def predict_sales_endpoint(request: SalesPredictionRequest):
    product_id = get_product_id_from_name(request.product_name)
   
    try:
        start_date = pd.to_datetime(request.start_date)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid start_date: {e}")
   
    predictions = []
    for i in range(request.n_days):
        current_date = start_date + timedelta(days=i)
        try:
            prediction = predict_sales(
                store_id=request.store_id,
                promo=request.promo,
                school_holiday=request.school_holiday,
                date=current_date,
                store_type=request.store_type,
                assortment=request.assortment,
                state_holiday=request.state_holiday,
                product_name=request.product_name,
                weather=request.weather,
                sentiment_score=request.sentiment_score
            )
            predictions.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "sales_prediction": prediction["sales_prediction"],
                "customer_prediction": prediction["customer_prediction"]
            })
        except Exception as e:
            predictions.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "error": str(e)
            })

    return {"predictions": predictions}





@router.get("/products")
async def list_all_products():
    return {"products": get_all_products()}
