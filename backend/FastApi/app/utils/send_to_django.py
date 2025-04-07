import requests
from app.core.config import DJANGO_API_URL

def send_prediction_to_django(prediction_data, token):
    headers = {"Authorization": token}
    response = requests.post(
        f"{DJANGO_API_URL}/api/save_prediction/",
        json=prediction_data,
        headers=headers
    )
    
    if response.status_code != 201:
        print("Error al enviar a Django:", response.text)
