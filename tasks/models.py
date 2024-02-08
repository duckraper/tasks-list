from django.db import models
from datetime import datetime


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title