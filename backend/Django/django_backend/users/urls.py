from django.urls import path
from .views import UserListView, UserDetailView, UploadProfileImageView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:pk>/profile_image/', UploadProfileImageView.as_view(), name='user-profile-image'),
]