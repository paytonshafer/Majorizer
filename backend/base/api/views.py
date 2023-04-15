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
        '/api/studconn/<int:stud_id>',
        '/api/advconn/<int:adv_id>',
        '/api/token',
        '/api/token/refresh',
        '/api/student',
        '/api/request',
        '/api/schedule',
        '/api/schedule/<int:sched_id>'
    ]

    return Response(routes)


#this view will be for the admin to manage connections and for the advisor to get all of their students
class AdvStudConnAdminApiView(APIView):
    def get(self, request):
        connections = AdvStudConn.objects.all()
        serializer = AdvStudConnSerializer(connections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    '''
    {
    "student": id,
    "advisor": id
    }
    '''

#this will be for a student to get their advisor, need to add check for if user not in dataset
class AdvStudConnStudentApiView(APIView):
    def get(self, request, stud_id):
        connection = AdvStudConn.objects.get(student = Student.objects.get(student = stud_id))
        serializer = AdvStudConnSerializer(connection)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, stud_id):
        conn_instance = AdvStudConn.objects.get(student = Student.objects.get(student = stud_id))
        if not conn_instance:
            return Response(
                {"res": "Object with todo id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'advisor': request.data.get('advisor')
        }
        serializer = PostAdvStudConnSerializer(instance = conn_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdvStudConnAdvisorApiView(APIView):
    def get(self, request, adv_id):
        connection = AdvStudConn.objects.filter(advisor = adv_id)
        serializer = AdvStudConnSerializer(connection, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentDetailApiView(APIView):
    def get(self, request, stud_id):
        studentData = Student.objects.filter(student = stud_id)
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
            'adv_stud': AdvStudConn.objects.get(student = Student.objects.get(student = request.user.id)).id
        }
        serializer = PostRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RequestDetailApiView(APIView):
    def get(self, request, stud_id):
        stud_requests = Request.objects.filter(adv_stud = AdvStudConn.objects.get(student = Student.objects.get(student = stud_id)))
        serializer = RequestSerializer(stud_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

'''
{
"student": 1,
"name": "name for schedule",
"maj1": "computer science",
"maj2": "NONE",
"min1": "NONE",
"min2": "NONE",
"prev": ""
}
'''
class ScheduleListApiView(APIView):
    def get(self, request):
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        courses_taken = request.data.get('prev').split(',')
        if courses_taken[0] == '':
            courses_taken = []
        
        schedule = forecast(request.data.get('maj1'), request.data.get('maj2'), request.data.get('min1'), request.data.get('min2'), courses_taken)

        #if the schedule failed(went over 8 semesters) or the input is not valid, return 406
        if schedule == 'FAILED' or schedule == 'You have an invalid code':
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        data = {
            'student': request.data.get('student'),
            'label': request.data.get('name'),
            'major1': request.data.get('maj1'),
            'major2': request.data.get('maj2'),
            'minor1': request.data.get('min1'),
            'minor2': request.data.get('min2'),
            'semester0': None,
            'semester1': None,
            'semester2': None,
            'semester3': None,
            'semester4': None,
            'semester5': None,
            'semester6': None,
            'semester7': None,
            'semester8': None,
        }

        for sem in schedule:
            temp = []
            if sem == 0: #previously taken courses
                for x in schedule[sem]:
                    temp.append(Course.objects.get(course_code = x).id)

                sem_data = {
                    'name': request.data.get('name') + '_' + str(sem),
                    'num': sem,
                    'course1': None,
                    'course2': None,
                    'course3': None,
                    'course4': None,
                    'course5': None,
                    'course6': None,
                    'course7': None,
                    'course8': None,               
                }
                for i, x in enumerate(temp):
                    course = 'course' + str(i)
                    sem_data[course] = x

                serializer = PostSemesterSerializer(data=sem_data)
                if serializer.is_valid():
                    obj = serializer.save()
                    cur_sem = 'semester' + str(sem)
                    data[cur_sem] = obj.id
    
            else:
                for x in schedule[sem]:
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
                serializer = PostSemesterSerializer(data=sem_data)
                if serializer.is_valid():
                    obj = serializer.save()
                    cur_sem = 'semester' + str(sem)
                    data[cur_sem] = obj.id

        sched_serializer = PostScheduleSerializer(data=data)
        if sched_serializer.is_valid():
            sched_serializer.save()
            return Response(sched_serializer.data, status=status.HTTP_201_CREATED)

        return Response(sched_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScheduleDetailApiView(APIView):
    def get(self, request, stud_id):
        schedules = Schedule.objects.filter(student = stud_id)
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)