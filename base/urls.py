from django.urls import path
from . import views

# Toto je ve skutečnosti /api/

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('users/register/', views.registerUser, name="registerUser"),

]
