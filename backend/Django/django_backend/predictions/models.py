from django.conf import settings
from django.db import models

class Prediction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    store_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    date_requested = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    n_days = models.IntegerField()
    result = models.JSONField()  # almacena el resultado de la predicción
    prediction_date = models.DateTimeField(auto_now_add=True)