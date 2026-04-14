from django.contrib import admin
from django.urls import path
from lab_api.views import lab_status

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/status/', lab_status),
]