from django.urls import path
from .views import PredictAndSaveView, historial_predicciones

urlpatterns = [
    path('predict/', PredictAndSaveView.as_view(), name='predict'),
    path('historial/', historial_predicciones, name='historial'),
]
