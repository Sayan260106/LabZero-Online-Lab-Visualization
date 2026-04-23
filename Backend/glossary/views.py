from rest_framework import generics
from .models import GlossaryTerm
from .serializers import GlossaryTermSerializer

class GlossaryTermList(generics.ListCreateAPIView):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer

class GlossaryTermDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer
