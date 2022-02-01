from xmlrpc.client import ResponseError
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import UserSerializerWithToken


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



# ----------------------- USER --------------------------

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = get_object_or_404(User, id=self.user.id)
        if (user):
            serializer = UserSerializerWithToken(user, many=False).data

            for k, v in serializer.items():
                data[k] = v

            return data
        return Response(False)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    user = User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data["password"]),
    )
    
    if user.first_name == "":
        user.first_name = user.email
        user.save()
  
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
