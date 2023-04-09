#In this file we will create each model for the database
from django.db import models
from django.contrib.auth.models import User
from django.forms import ValidationError #this is to get the user model from the default django users

def validate_major(value):
    obj = MajorOrMinor.objects.get(pk=value)
    if obj.major:
        return value
    else:
        raise ValidationError("Please only select majors for majors")

def validate_minor(value):
    obj = MajorOrMinor.objects.get(pk=value)
    if obj.major:
        raise ValidationError("Please only select minors for minors")
    else:
        return value

# Create your models here.
class MajorOrMinor(models.Model):
    code = models.TextField()
    name = models.TextField()
    major = models.BooleanField() #true if it is a major, false if it is a minor

    def __str__(self):
        return self.name
    
class Student(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='studentsMajors')
    major1 = models.ForeignKey(MajorOrMinor, on_delete=models.CASCADE, null=True, related_name='major1', validators =[validate_major])
    major2 = models.ForeignKey(MajorOrMinor, on_delete=models.CASCADE, null=True, blank=True, related_name='major2', validators =[validate_major])
    minor1 = models.ForeignKey(MajorOrMinor, on_delete=models.CASCADE, null=True, blank=True, related_name='minor1', validators =[validate_minor])
    minor2 = models.ForeignKey(MajorOrMinor, on_delete=models.CASCADE, null=True, blank=True, related_name='minor2', validators =[validate_minor])

    def clean(self):
        if self.major1 == self.major2:
            raise ValidationError('Please choose two different majors')
        
        if not(self.minor1 == None and self.minor2 == None):
            if self.minor1 == self.minor2:
                raise ValidationError('Please choose two different minors')

    def __str__(self):
        return self.student.username

class AdvStudConn(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    advisor = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='advisor')

    def clean(self):
        if str(self.student.student.groups.all()[0]) == 'advisor' or str(self.advisor.groups.all()[0]) == 'student':
            raise ValidationError('Please only choose students for student and advisors for advisor')

    def __str__(self):
        return self.student.student.username + ' - ' + self.advisor.username



    
class Request(models.Model):
    adv_stud = models.ForeignKey(AdvStudConn, on_delete=models.CASCADE, null=True)
    subject = models.TextField()
    data = models.TextField()
    result = models.BooleanField(null=True)

    def __str__(self):
        return self.subject + ': ' + self.data[:10]

class Course(models.Model):
    maj_min = models.ForeignKey(MajorOrMinor, on_delete=models.CASCADE, null=True)
    course_code = models.TextField()
    title = models.TextField()
    description = models.TextField()
    professor = models.TextField()
    days = models.TextField()
    num_credits = models.IntegerField()

    def __str__(self):
        return self.title

class Semester(models.Model):
    name = models.TextField(default='unnamed')
    num = models.IntegerField()
    course1 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=False, related_name='course1')
    course2 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=False, related_name='course2')
    course3 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=False, related_name='course3')
    course4 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=False, related_name='course4')
    course5 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, related_name='course5')
    course6 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, related_name='course6')
    course7 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, related_name='course7')
    course8 = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True, related_name='course8')

    def __str__(self):
        return self.name


class Schedule(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='studentSched')
    name = models.TextField(blank=True, default='unnamed_schedule')
    major1 = models.TextField(blank=True, default='None') 
    major2 = models.TextField(blank=True, default='None') 
    minor1 = models.TextField(blank=True, default='None')
    minor2 = models.TextField(blank=True, default='None')
    semester0 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester0')
    semester1 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester1')
    semester2 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester2')
    semester3 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester3')
    semester4 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester4')
    semester5 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester5')
    semester6 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester6')
    semester7 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester7')
    semester8 = models.ForeignKey(Semester, on_delete=models.CASCADE, null=True, blank=True, related_name='semester8')


    def clean(self):
        if self.major1 == self.major2:
            raise ValidationError('Please choose two different majors')
        
        if self.minor1 == self.minor2:
            raise ValidationError('Please choose two different minors')

    def __str__(self):
        return self.name