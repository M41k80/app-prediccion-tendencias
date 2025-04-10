from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer, ProfileImageSerializer
from rest_framework import permissions
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


class UserListView(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    
class UploadProfileImageView(generics.UpdateAPIView):
    serializer_class = ProfileImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = get_user_model().objects.none()  

    def get_object(self):
        return self.request.user
    
    # Opcional: Desactivar documentación Swagger para métodos específicos
    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
class GetUserInfo(APIView):
    permission_classes = [IsAuthenticated]  # Asegura que el usuario esté autenticado

    def get(self, request):
        # Obtener el nombre del usuario autenticado
        user = request.user
        
        return Response({
            "id": user.id,  
            "username": user.username
        }, status=status.HTTP_200_OK)

class UserProfileImageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = self.get_object(pk)  # Obtener el usuario por el ID
        if user.profile_image:  # Verifica si el usuario tiene una imagen de perfil
            return Response({"profile_image_url": user.profile_image.url})  # Devuelve la URL de la imagen
        return Response({"profile_image_url": None}, status=404)  # Si no tiene imagen, devuelve null

    def get_object(self, pk):
        return User.objects.get(pk=pk)