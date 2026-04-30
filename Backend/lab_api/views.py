from rest_framework.views import APIView
from rest_framework import generics
from .models import Element, Molecule, Subject, Topic
from .serializers import ElementSerializer, MoleculeSerializer, SubjectSerializer, TopicSerializer
from rest_framework.response import Response

class APIStatus(APIView):
    def get(self, request):
        return Response({"status": "Online", "version": "1.0.0"})

class ElementList(generics.ListCreateAPIView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

class ElementDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    lookup_field = 'number'

class MoleculeList(generics.ListCreateAPIView):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeSerializer

class MoleculeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeSerializer
    lookup_field = 'formula'

class SubjectList(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_field = 'slug'

class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class TopicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    lookup_field = 'slug'