from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import PerfilNegocio


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField()
        self.fields.pop('username', None)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Debe proporcionar correo y contraseña.")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("No existe un usuario con ese correo electrónico.")

        user = authenticate(username=user.username, password=password)

        if not user:
            raise AuthenticationFailed("Contraseña incorrecta.")

        data = super().validate({
            "username": user.username,
            "password": password
        })

        data["username"] = user.username
        data["email"] = user.email
        data["user_id"] = user.id

        return data


class PerfilNegocioSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PerfilNegocio
        fields = [
            'id',  
            'user',
            'username',
            'email',
            'nombre_negocio',
            'descripcion',
            'provincia',
            'horario',
            'contacto'
        ]
        read_only_fields = ['user', 'username', 'email']

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email
