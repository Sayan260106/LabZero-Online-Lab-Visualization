from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('lab_api.urls')),
    path('api/auth/', include('users.urls')),
    path('api/glossary/', include('glossary.urls')),
    path('api/classrooms/', include('classrooms.urls')),
]