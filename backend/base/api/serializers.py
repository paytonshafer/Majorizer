#This is the serializer file, it will have classes that will take a python object to a json object
#So that they can be sent through the api
#We will create a serializer for each model
from rest_framework.serializers import ModelSerializer #A serializer takes a python object to a json object
from base.models import Student, AdvStudConn, Request, Schedule

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class AdvStudConnSerializer(ModelSerializer):
    class Meta:
        model = AdvStudConn
        fields = '__all__'

class RequestSerializer(ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
