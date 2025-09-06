from django.db import models

#modelo del perfil usuario 
# models.py

from django.db import models
from django.contrib.auth.models import User

class PerfilNegocio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre_negocio = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    rubro = models.CharField(max_length=100, blank=True)
    provincia = models.CharField(max_length=100, blank=True)
    canton = models.CharField(max_length=100, blank=True)
    horario = models.CharField(max_length=255, blank=True)
    contacto = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Perfil de {self.user.username}"
