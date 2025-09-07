from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include('productos.urls')),
    path('api-auth/', include('rest_framework.urls')),

    # Servir React para todas las rutas no capturadas por la API o admin
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]
