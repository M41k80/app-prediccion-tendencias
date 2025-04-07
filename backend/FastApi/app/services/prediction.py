import tensorflow as tf
import joblib  
import pandas as pd
from app.services.product_lookup import get_product_category

# Cargamos el modelo y los metadatos
model = tf.keras.models.load_model('ml_model/modelo_ventas_rossmann.keras')
scaler_data = joblib.load('ml_model/scaler_data.pkl')

def predict_sales(store_id, promo, school_holiday, date, store_type, assortment, state_holiday, product_name, weather, sentiment_score):
    # obtener la categoría del producto desde s nombre
    product_category = get_product_category(product_name)
    if product_category is None:
        raise ValueError(f"Product '{product_name}' not found in the product catalog.")

    # diccionario base
    data_input = {
        "Store": [store_id],
        "Promo": [promo],
        "SchoolHoliday": [school_holiday],
        "Year": [date.year],
        "Month": [date.month],
        "Day": [date.day],
        "WeekOfYear": [date.isocalendar()[1]],
        "DayOfWeek": [date.weekday()],
        "Weather": [weather],
        "SentimentScore": [sentiment_score]
    }

    # one-hote codificacion para store_type
    for x in ['a', 'b', 'c', 'd']:
        data_input[f"StoreType_{x}"] = [1 if store_type == x else 0]

    # one-hot codificacion para assortment
    for x in ['a', 'b', 'c']:
        data_input[f"Assortment_{x}"] = [1 if assortment == x else 0]

    # one-hot codificacion para state_holiday
    for x in ['0', 'a', 'b', 'c']:
        data_input[f"StateHoliday_{x}"] = [1 if state_holiday == x else 0]

    # one-hot codificacion para categoría del producto
    all_categories = scaler_data.get("product_categories", [])
    for cat in all_categories:
        data_input[f"ProductCategory_{cat}"] = [1 if product_category == cat else 0]

    # orden y escalado
    feature_order = scaler_data['feature_order']
    numeric_features = scaler_data['numeric_features']
    data_df = pd.DataFrame(data_input)[feature_order]
    data_df[numeric_features] = scaler_data['scaler'].transform(data_df[numeric_features])
    data_scaled = data_df.values

    # prediccion
    prediction = model.predict(data_scaled)
    return {
        "sales_prediction": float(prediction[0][0]),
        "customer_prediction": float(prediction[0][1])
    }
