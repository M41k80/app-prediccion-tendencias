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
from django.contrib.auth.password_validation import validate_password

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
    
    
class UpdateUserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not new_password or not confirm_password:
            return Response({"detail": "Debe completar ambos campos de contraseña."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"detail": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password)
        except Exception as e:
            return Response({"detail": list(e)}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)
    
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response({'detail': 'Cuenta eliminada correctamente.'}, status=status.HTTP_204_NO_CONTENT)
