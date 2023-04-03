#This is the url roughting file for our api, the main urls page will lead to here so that 
#one can interact with different parts of the api
from django.urls import path
from . import views
from .views import *

from  rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes), #this will give you all roots in api
    path('advstudconn/', AdvStudConnListApiView.as_view(), name='advisor_student_connection'),
    path('advstudconn/<int:stud_id>', AdvStudConnDetailApiView.as_view(), name='specific_advisor_student_connection'),
    path('student/', StudentListApiView.as_view(), name='student'),
    path('request/', RequestListApiView.as_view(), name='requests'),
    path('schedule/', ScheduleListApiView.as_view(), name='schedule'),
    path('schedule/<int:sched_id>', ScheduleDetailApiView.as_view(), name='specific_schedule'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #view to get a token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #view to refresh token
]