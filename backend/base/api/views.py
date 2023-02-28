#this is the veiws file, here we will generate different veiws for our API
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

#the two classes below add for you to add custom parts to the token so the front end can get them
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #This is a custom class that willl allow for us to send group and user name in the token
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['group'] = str(user.groups.all()[0])
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
        serializer_class = MyTokenObtainPairSerializer #we use the class above to seialize the token

#THis veiw get's all the routes in the api
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)