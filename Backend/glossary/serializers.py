from rest_framework import serializers
from .models import GlossaryTerm

class GlossaryTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryTerm
        fields = '__all__'
