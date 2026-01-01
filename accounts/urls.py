from django.urls import path
from .views import AdminLoginView, StudentLoginView

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view()),
    path('student/login/', StudentLoginView.as_view()),
]