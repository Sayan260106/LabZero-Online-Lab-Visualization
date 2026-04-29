from django.urls import path
from .views import ElementList, ElementDetail, APIStatus, MoleculeList, SubjectList

urlpatterns = [
    path('status/', APIStatus.as_view(), name='api-status'),
    path('elements/', ElementList.as_view(), name='element-list'),
    path('elements/<int:number>/', ElementDetail.as_view(), name='element-detail'),
    path('molecules/', MoleculeList.as_view(), name='molecule-list'),
    path('subjects/', SubjectList.as_view(), name='subject-list'),
]