from rest_framework import serializers
from .models import Admin
from students.models import Student

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class StudentLoginSerializer(serializers.Serializer):
    roll_no = serializers.CharField()
    password = serializers.CharField()