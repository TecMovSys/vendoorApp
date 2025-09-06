from django.urls import path
from .views import ProductListCreate, MyProductsList, ProductUpdateView

urlpatterns = [
    path('productos/', ProductListCreate.as_view(), name='product-list-create'),
    path('mis-productos/', MyProductsList.as_view(), name='my-products'),
    path('productos/<int:pk>/', ProductUpdateView.as_view(), name='product-update'),
]
