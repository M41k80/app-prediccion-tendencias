from django.urls import path
from .views import UserListView, UserDetailView, UploadProfileImageView, GetUserInfo, UserProfileImageView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:pk>/upload_profile_image/', UploadProfileImageView.as_view(), name='upload-user-profile-image'),
    path('users/<int:pk>/profile_image/', UserProfileImageView.as_view(), name='user-profile-image'),
    path('user-info/', GetUserInfo.as_view(), name='user-info'),
]