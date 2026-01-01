from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Academic
from .serializers import AcademicSerializer

class AcademicCreateView(generics.CreateAPIView):
    queryset = Academic.objects.all()
    serializer_class = AcademicSerializer

class StudentAcademicReportView(APIView):
    def get(self, request, student_id):
        records = Academic.objects.filter(student_id=student_id)
        serializer = AcademicSerializer(records, many=True)
        return Response(serializer.data)