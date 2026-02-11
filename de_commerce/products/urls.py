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
    path('', views.home, name='home'),
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart_detail, name='cart_detail'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('place-order/', views.place_order, name='place_order'),
    path('register/', views.register, name='register'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
    path('profile/', views.profile, name='profile'),
    path('orders/', views.order_history, name='order_history'),
    path('orders/<int:order_id>/', views.order_detail, name='order_detail'),
    path('', include(router.urls)),
]
