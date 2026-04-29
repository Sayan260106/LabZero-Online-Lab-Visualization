from django.contrib import admin
from .models import Classroom, Assignment

@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher', 'invite_code', 'is_live', 'created_at')
    search_fields = ('name', 'teacher__username', 'invite_code')
    list_filter = ('is_live', 'created_at')
    readonly_fields = ('invite_code',)

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'classroom', 'due_date', 'status', 'created_at')
    search_fields = ('title', 'classroom__name', 'status')
    list_filter = ('status', 'created_at', 'due_date')
