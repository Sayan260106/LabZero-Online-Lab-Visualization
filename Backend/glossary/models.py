from django.db import models

class GlossaryTerm(models.Model):
    SUBJECT_CHOICES = [
        ('chemistry', 'Chemistry'),
        ('physics', 'Physics'),
        ('math', 'Mathematics'),
        ('biology', 'Biology'),
    ]

    term = models.CharField(max_length=100, unique=True)
    definition = models.TextField()
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)

    class Meta:
        ordering = ['term']

    def __str__(self):
        return f"{self.term} ({self.get_subject_display()})"
