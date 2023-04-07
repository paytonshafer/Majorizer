#this is the veiws file, here we will generate different veiws for our API
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.models import User
from base.models import Student, AdvStudConn, Request, Schedule, Semester, Course, MajorOrMinor
from .serializers import *
from rest_framework import status
from .forecasting import forecast

#the two classes below add for you to add custom parts to the token so the front end can get them
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #This is a custom class that willl allow for us to send group and user name in the token
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['group'] = str(user.groups.all()[0])
        token['id'] = str(user.id)
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
        serializer_class = MyTokenObtainPairSerializer #we use the class above to serialize the token

#This view get's all the routes in the api
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/advstudconn',
        '/api/advstudconn/<int:stud_id>',
        '/api/token',
        '/api/token/refresh',
        '/api/student',
        '/api/request',
        '/api/schedule',
        '/api/schedule/<int:sched_id>'
    ]

    return Response(routes)


#this view will be for the admin to manage connections and for the advisor to get all of their students
class AdvStudConnListApiView(APIView):
    def get(self, request):
        connections = AdvStudConn.objects.all()
        serializer = AdvStudConnSerializer(connections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#this will be for a student to get their advisor, need to add check for if user not in dataset
class AdvStudConnDetailApiView(APIView):
    def get(self, request, stud_id):
        connection = AdvStudConn.objects.get(student = stud_id)
        serializer = AdvStudConnSerializer(connection)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentListApiView(APIView):
    def get(self, request):
        studentData = Student.objects.all()
        serializer = StudentSerializer(studentData, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

'''
{
"subject": "test subject",
"data": "test data",
}
'''   
class RequestListApiView(APIView):
    def get(self, request):
        stud_requests = Request.objects.all()
        serializer = RequestSerializer(stud_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = {
            "subject": request.data.get('subject'),
            "data": request.data.get('data'),
            'adv_stud': AdvStudConn.objects.get(student = request.user.id)
        }
        serializer = RequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
{
"student": 1,
"name": "name for schedule",
"maj1": "computer science",
"maj2": "NONE",
"min1": "NONE",
"min2": "NONE"
}
'''
class ScheduleListApiView(APIView):
    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        schedule = forecast(request.data.get('maj1'), request.data.get('maj2'), request.data.get('min1'), request.data.get('min2'))

        data = {
            'student': request.data.get('student'),
            'name': request.data.get('name'),
            'major1': request.data.get('maj1'),
            'major2': request.data.get('maj2'),
            'minor1': request.data.get('min1'),
            'minor2': request.data.get('min2'),
            'semester1': None,
            'semester2': None,
            'semester3': None,
            'semester4': None,
            'semester5': None,
            'semester6': None,
            'semester7': None,
            'semester8': None,
            'semester9': None,
            'semester10': None,
        }

        for sem in schedule:
            temp = []
            for x in schedule[sem]:
                print(x)
                temp.append(Course.objects.get(course_code = x).id)
            sem_data = {
                'name': request.data.get('name') + '_' + str(sem),
                'num': sem,
                'course1': temp[0],
                'course2': temp[1],
                'course3': temp[2],
                'course4': temp[3],
                'course5': temp[4],
                'course6': None,
                'course7': None,
                'course8': None,               
            }
            serializer = SemesterSerializer(data=sem_data)
            print(serializer)
            if serializer.is_valid():
                obj = serializer.save()
                cur_sem = 'semester' + str(sem)
                data[cur_sem] = obj.id

        sched_serializer = ScheduleSerializer(data=data)
        if sched_serializer.is_valid():
            print('yay')
            sched_serializer.save()
            return Response(sched_serializer.data, status=status.HTTP_201_CREATED)

        return Response(sched_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScheduleDetailApiView(APIView):
    def get(self, request, sched_id):
        connection = Schedule.objects.get(id = sched_id)
        serializer = ScheduleSerializer(connection)
        return Response(serializer.data, status=status.HTTP_200_OK)