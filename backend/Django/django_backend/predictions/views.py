from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Prediction
from .serializers import PredictionSerializer
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Prediction
from datetime import datetime

class PredictAndSaveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data.copy()

        # enviar datos al microservicio FastAPI
        fastapi_response = requests.post("http://localhost:8001/predict_sales", json=data)

        if fastapi_response.status_code != 200:
            return Response({"error": "La predicción falló"}, status=500)

        prediction_result = fastapi_response.json()

        # guardar la predicción en la base de datos
        prediction = Prediction.objects.create(
            user=user,
            store_id=data["store_id"],
            product_name=data["product_name"],
            start_date=data["start_date"],
            n_days=data["n_days"],
            result=prediction_result
        )

        return Response(PredictionSerializer(prediction).data)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def historial_predicciones(request):
    predicciones = Prediction.objects.filter(user=request.user)
    
    # obtener parámetros opcionales de fecha
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if start_date:
        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            predicciones = predicciones.filter(date_requested__date__gte=start_date)
        except ValueError:
            return Response({"error": "start_date inválida. Usa el formato YYYY-MM-DD."}, status=400)

    if end_date:
        try:
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
            predicciones = predicciones.filter(date_requested__date__lte=end_date)
        except ValueError:
            return Response({"error": "end_date inválida. Usa el formato YYYY-MM-DD."}, status=400)

    predicciones = predicciones.order_by('-date_requested')

    data = [
        {
            "id": p.id,
            "store_id": p.store_id,
            "product_name": p.product_name,
            "start_date": p.start_date,
            "n_days": p.n_days,
            "result": p.result,
            "date_requested": p.date_requested
        } for p in predicciones
    ]
    return Response(data)