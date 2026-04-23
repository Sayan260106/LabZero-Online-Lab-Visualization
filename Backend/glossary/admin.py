from django.contrib import admin
from .models import GlossaryTerm

@admin.register(GlossaryTerm)
class GlossaryTermAdmin(admin.ModelAdmin):
    list_display = ('term', 'subject', 'definition')
    list_filter = ('subject',)
    search_fields = ('term', 'definition')
