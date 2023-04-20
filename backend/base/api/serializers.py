#This is the serializer file, it will have classes that will take a python object to a json object
#So that they can be sent through the api
#We will create a serializer for each model
from rest_framework.serializers import ModelSerializer #A serializer takes a python object to a json object
from base.models import Student, AdvStudConn, Schedule, Semester, Request, Course, MajorOrMinor
from django.contrib.auth.models import User


class CurrentUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MajorOrMinorSerializer(ModelSerializer):
    class Meta:
        model = MajorOrMinor
        fields = '__all__'

class StudentSerializer(ModelSerializer):
    student = CurrentUserSerializer()
    major1 = MajorOrMinorSerializer() 
    major2 = MajorOrMinorSerializer()
    minor1 = MajorOrMinorSerializer()
    minor2 = MajorOrMinorSerializer()
    class Meta:
        model = Student
        fields = '__all__'

class AdvStudConnSerializer(ModelSerializer):
    student = StudentSerializer()
    advisor = CurrentUserSerializer()

    class Meta:
        model = AdvStudConn
        fields = '__all__'

class RequestSerializer(ModelSerializer):
    adv_stud = AdvStudConnSerializer()

    class Meta:
        model = Request
        fields = '__all__'

class PutRequestSerializer(ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class SemesterSerializer(ModelSerializer):
    course1 = CourseSerializer()
    course2 = CourseSerializer()
    course3 = CourseSerializer()
    course4 = CourseSerializer()
    course5 = CourseSerializer()
    
    class Meta:
        model = Semester
        fields = '__all__'

class ScheduleSerializer(ModelSerializer):
    semester0 = SemesterSerializer()
    semester1 = SemesterSerializer()
    semester2 = SemesterSerializer()
    semester3 = SemesterSerializer()
    semester4 = SemesterSerializer()
    semester5 = SemesterSerializer()
    semester6 = SemesterSerializer()
    semester7 = SemesterSerializer()
    semester8 = SemesterSerializer()

    class Meta:
        model = Schedule
        fields = '__all__'

class PostSemesterSerializer(ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class PostScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class PostAdvStudConnSerializer(ModelSerializer):

    class Meta:
        model = AdvStudConn
        fields = '__all__'


class PostRequestSerializer(ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'