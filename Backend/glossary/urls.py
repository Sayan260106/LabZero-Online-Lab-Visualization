from django.urls import path
from . import views

urlpatterns = [
    path('terms/', views.GlossaryTermList.as_view(), name='term-list'),
    path('terms/<int:pk>/', views.GlossaryTermDetail.as_view(), name='term-detail'),
]
