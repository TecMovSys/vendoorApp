from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from vendoor.views import test_index 

urlpatterns = [
     # Servir React para todas las rutas no capturadas por la API o admin
    path('api/', test_index, name='home'),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include('productos.urls')),
    path('api-auth/', include('rest_framework.urls')),

   
]
