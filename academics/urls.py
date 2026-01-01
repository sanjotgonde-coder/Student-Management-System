from django.urls import path
from .views import AcademicCreateView, StudentAcademicReportView

urlpatterns = [
    path('academics/', AcademicCreateView.as_view()),
    path('academics/<int:student_id>/', StudentAcademicReportView.as_view()),
]