from pydantic import BaseModel

class SalesPredictionRequest(BaseModel):
    store_id: int
    promo: int
    school_holiday: int
    date: str
    store_type: str
    assortment: str
    state_holiday: str
    product_name: str 
    weather: str
    sentiment_score: Optional[float] = None
