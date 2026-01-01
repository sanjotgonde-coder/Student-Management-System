from django.db import models
from students.models import Student

class Academic(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.CharField(max_length=100)
    semester = models.IntegerField()
    year = models.IntegerField()
    marks = models.FloatField()
    grade = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.student.roll_no} - {self.course}"
