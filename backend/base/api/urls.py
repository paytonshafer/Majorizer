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
    path('advstudconn/stud', AdvStudConnDetailApiView.as_view(), name='advisor_student_connection'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #view to get a token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #view to refresh token
]