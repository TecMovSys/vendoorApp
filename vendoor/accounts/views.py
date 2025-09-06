from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserRegisterSerializer, CustomTokenObtainPairSerializer, PerfilNegocioSerializer
from .models import PerfilNegocio


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        # Crear automáticamente un perfil vacío para el nuevo usuario
        PerfilNegocio.objects.create(user=user)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class PerfilNegocioView(APIView):
    """
    Perfil del usuario autenticado
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            perfil = PerfilNegocio.objects.get(user=request.user)
        except PerfilNegocio.DoesNotExist:
            return Response({"detail": "Perfil no encontrado"}, status=404)

        serializer = PerfilNegocioSerializer(perfil)
        return Response(serializer.data)

    def put(self, request):
        try:
            perfil = PerfilNegocio.objects.get(user=request.user)
        except PerfilNegocio.DoesNotExist:
            return Response({"detail": "Perfil no encontrado"}, status=404)

        serializer = PerfilNegocioSerializer(perfil, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def post(self, request):
        if PerfilNegocio.objects.filter(user=request.user).exists():
            return Response({"detail": "Perfil ya existe"}, status=400)

        data = request.data.copy()
        data['user'] = request.user.id  # Asignar usuario actual

        serializer = PerfilNegocioSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PerfilNegocioDetailView(APIView):
    """
    Perfil del comerciante dado un user_id (para uso público desde frontend)
    """
    permission_classes = [AllowAny]

    def get(self, request, user_id):
        try:
            perfil = PerfilNegocio.objects.get(user__id=user_id)
        except PerfilNegocio.DoesNotExist:
            return Response({"detail": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PerfilNegocioSerializer(perfil)
        return Response(serializer.data)
