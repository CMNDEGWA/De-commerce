from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter
from .api import CategoryViewSet, ProductViewSet, CartViewSet, OrderViewSet


app_name = 'products'

router = DefaultRouter()
router.register(r'api/categories', CategoryViewSet, basename='category')
router.register(r'api/products', ProductViewSet, basename='product')
router.register(r'api/carts', CartViewSet, basename='cart')
router.register(r'api/orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
]
