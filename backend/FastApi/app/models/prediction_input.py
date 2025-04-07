from pydantic import BaseModel
from typing import List, Optional

class ProductInput(BaseModel):
    product_id: str
    stock: int
    promotion: bool

class PredictionRequest(BaseModel):
    store_id: int
    date: str
    weather: Optional[str] = None
    social_media_trend: Optional[str] = None
    products: List[ProductInput]

def get_product_id_from_name(product_name: str) -> int:
    product = PRODUCTS_DF[PRODUCTS_DF['ProductName'].str.lower() == product_name.lower()]
    if not product.empty:
        return product.iloc[0]['ProductID']
    else:
        raise ValueError(f"Producto '{product_name}' no encontrado.")