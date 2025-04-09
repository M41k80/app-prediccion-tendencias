from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    # Define qué campos mostrar en la lista
    list_display = ('id', 'username', 'password', 'email')
    # Puedes añadir más campos que quieras mostrar según sea necesario
    search_fields = ('username', 'password', 'email')
    list_filter = ('is_active', 'is_staff')

admin.site.register(CustomUser, CustomUserAdmin)


