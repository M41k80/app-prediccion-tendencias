from django.urls import path
from .views import UserListView, UserDetailView, UploadProfileImageView, GetUserInfo, UserProfileImageView, ChangePasswordView, UpdateUserInfoView, DeleteAccountView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:pk>/upload_profile_image/', UploadProfileImageView.as_view(), name='upload-user-profile-image'),
    path('users/<int:pk>/profile_image/', UserProfileImageView.as_view(), name='user-profile-image'),
    path('user-info/', GetUserInfo.as_view(), name='user-info'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('users/me', UpdateUserInfoView.as_view(), name='user-update-info'),
    path('users/delete/', DeleteAccountView.as_view(), name='user-delete-account'),

]