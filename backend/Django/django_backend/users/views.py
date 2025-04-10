from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer, ProfileImageSerializer
from rest_framework import permissions
from drf_yasg.utils import swagger_auto_schema



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