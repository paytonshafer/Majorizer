#This is the url roughting file for our api, the main urls page will lead to here so that 
#one can interact with different parts of the api
from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from  rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]