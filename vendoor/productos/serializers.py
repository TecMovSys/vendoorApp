from rest_framework import serializers
from .models import Product
from accounts.models import PerfilNegocio
from accounts.serializers import PerfilNegocioSerializer

class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')  # < Agregado para obtener ID del dueño
    perfil_negocio = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'owner', 'owner_id', 'whatsapp', 'name', 'description', 'price',
            'is_available', 'quantity', 'perfil_negocio'
        ]
        read_only_fields = ['owner', 'owner_id', 'perfil_negocio']

    def get_perfil_negocio(self, obj):
        perfil = PerfilNegocio.objects.filter(user=obj.owner).first()
        if perfil:
            return PerfilNegocioSerializer(perfil).data
        return None
