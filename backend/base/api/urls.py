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
    path('advstudconn/', AdvStudConnAdminApiView.as_view(), name='advisor_student_connection'),
    path('studconn/<int:stud_id>', AdvStudConnStudentApiView.as_view(), name='student_advisor_student_connection'),
    path('advconn/<int:adv_id>', AdvStudConnAdvisorApiView.as_view(), name='advisors_advisor_student_connection'),
    path('student/<int:stud_id>', StudentDetailApiView.as_view(), name='student'),
    path('request/', RequestListApiView.as_view(), name='requests'),
    path('request/<int:stud_id>', RequestStudentApiView.as_view(), name='detail_requests'),
    path('updatereq/<int:req_id>', RequestDetailApiView.as_view(), name='update_requests'),
    path('schedule/', ScheduleListApiView.as_view(), name='schedule'),
    path('schedule/<int:stud_id>', ScheduleDetailApiView.as_view(), name='specific_schedule'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #view to get a token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #view to refresh token
]