from django.urls import path
from .views import UserRegisterView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegisterView, CustomTokenObtainPairView, PerfilNegocioView, PerfilNegocioDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('perfil/', PerfilNegocioView.as_view(), name='perfil-negocio'),  # perfil del usuario autenticado
    path('perfil/<int:user_id>/', PerfilNegocioDetailView.as_view(), name='perfil-negocio-detail'),  # perfil público por user_id
    
]
