from django.contrib import admin
from .models import Element, Molecule, AtomPosition, LonePair

@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    list_display = ('number', 'symbol', 'name', 'mass', 'category', 'electrons', 'discovery', 'color', 'config', 'radius', 'ionization', 'electronegativity', 'period', 'group', 'summary')

class AtomPositionInline(admin.TabularInline):
    model = AtomPosition
    extra = 1

class LonePairInline(admin.TabularInline):
    model = LonePair
    extra = 1

@admin.register(Molecule)
class MoleculeAdmin(admin.ModelAdmin):
    list_display = ('name', 'formula', 'central_atom', 'real_angle', 'model_angle')
    inlines = [AtomPositionInline, LonePairInline]

@admin.register(AtomPosition)
class AtomPositionAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'molecule', 'x', 'y', 'z')

@admin.register(LonePair)
class LonePairAdmin(admin.ModelAdmin):
    list_display = ('molecule', 'x', 'y', 'z')