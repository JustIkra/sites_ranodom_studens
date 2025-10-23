from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('learning_logs.urls')), # Все URL с '' (корневой) перенаправляются в learning_logs
    path('users/', include('users.urls')),   # Все URL с 'users/' перенаправляются в users
]