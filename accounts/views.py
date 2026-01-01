from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Admin
from students.models import Student
from .serializers import AdminLoginSerializer, StudentLoginSerializer


class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            # Get admin only by username
            try:
                admin = Admin.objects.get(username=username)
            except Admin.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

            # Compare password in Python
            if admin.password != password:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Admin login successful"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentLoginView(APIView):
    def post(self, request):
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():
            roll_no = serializer.validated_data['roll_no']
            password = serializer.validated_data['password']

            try:
                student = Student.objects.get(roll_no=roll_no, password=password)
            except Student.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

            return Response(
                {"message": "Student login successful", "student_id": student.id},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
