from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ('id', 'title', 'description', 'completed', 'created_at')
        model = Task
        fields = '__all__'
