from rest_framework.views import APIView
from rest_framework import generics
from .models import Element, Molecule, Subject
from .serializers import ElementSerializer, MoleculeSerializer, SubjectSerializer
from rest_framework.response import Response

class APIStatus(APIView):
    def get(self, request):
        return Response({"status": "Online", "version": "1.0.0"})

class ElementList(generics.ListAPIView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

class ElementDetail(generics.RetrieveAPIView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    lookup_field = 'number'

class MoleculeList(generics.ListAPIView):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeSerializer

class SubjectList(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer