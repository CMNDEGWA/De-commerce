
from django.contrib import admin
from .models import Category, Product, Cart, CartItem, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ('name', 'description')
	search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('name', 'category', 'price')
	list_filter = ('category',)
	search_fields = ('name',)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
	list_display = ('user', 'created_at')
	search_fields = ('user__username',)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
	list_display = ('cart', 'product', 'quantity')
	search_fields = ('cart__user__username', 'product__name')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
	list_display = ('id', 'user', 'created_at', 'status', 'payment_method')
	list_filter = ('status', 'payment_method')
	search_fields = ('user__username', 'id')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
	list_display = ('order', 'product', 'quantity', 'price')
	search_fields = ('order__id', 'product__name')
