from rest_framework import serializers
from .models import Classroom, Assignment
from users.serializers import UserSerializer
from lab_api.serializers import TopicSerializer

class AssignmentSerializer(serializers.ModelSerializer):
    topic_name = serializers.ReadOnlyField(source='topic.name')

    class ImageUploadSerializer(serializers.ModelSerializer):
        class Meta:
            model = Assignment
            fields = ['id', 'classroom', 'title', 'description', 'topic', 'topic_name', 'due_date', 'status', 'created_at']

    class Meta:
        model = Assignment
        fields = ['id', 'classroom', 'title', 'description', 'topic', 'topic_name', 'due_date', 'status', 'created_at']

class ClassroomSerializer(serializers.ModelSerializer):
    teacher_name = serializers.ReadOnlyField(source='teacher.username')
    students_count = serializers.SerializerMethodField()
    assignments = AssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = ['id', 'name', 'teacher', 'teacher_name', 'invite_code', 'students_count', 'is_live', 'assignments', 'created_at']
        read_only_fields = ['invite_code', 'teacher']

    def get_students_count(self, obj):
        return obj.students.count()
