def product_detail(request, pk):
	product = get_object_or_404(Product, pk=pk)
	return render(request, 'products/productDetail.html', {'product': product})
from django.shortcuts import render, get_object_or_404, redirect
from .models import Product, Category, Cart, CartItem, Order, OrderItem
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages

def product_list(request):
	category_id = request.GET.get('category')
	if category_id:
		products = Product.objects.filter(category_id=category_id)
	else:
		products = Product.objects.all()
	categories = Category.objects.all()
	return render(request, 'products/productList.html', {'products': products, 'categories': categories})

@login_required
@require_POST
def add_to_cart(request, product_id):
	product = get_object_or_404(Product, id=product_id)
	cart, created = Cart.objects.get_or_create(user=request.user)
	quantity = int(request.POST.get('quantity', 1))
	cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
	if not created:
		cart_item.quantity += quantity
	else:
		cart_item.quantity = quantity
	cart_item.save()
	messages.success(request, f"Added {product.name} to your cart.")
	return redirect('products:cart_detail')

@login_required
def cart_detail(request):
	cart, created = Cart.objects.get_or_create(user=request.user)
	items = cart.items.select_related('product')
	if request.method == 'POST':
		for item in items:
			quantity = request.POST.get(f'quantity_{item.id}')
			if quantity is not None:
				try:
					quantity = int(quantity)
					if quantity > 0:
						item.quantity = quantity
						item.save()
					else:
						item.delete()
				except ValueError:
					pass
		messages.success(request, "Cart updated.")
		return redirect('products:cart_detail')
	return render(request, 'products/cart.html', {'cart': cart, 'items': items})

@login_required
@require_POST
def place_order(request):
	cart = get_object_or_404(Cart, user=request.user)
	if not cart.items.exists():
		messages.error(request, "Your cart is empty.")
		return redirect('products:cart_detail')
	order = Order.objects.create(user=request.user)
	for item in cart.items.all():
		OrderItem.objects.create(
			order=order,
			product=item.product,
			quantity=item.quantity,
			price=item.product.price
		)
	cart.items.all().delete()
	messages.success(request, "Order placed successfully!")
	return redirect('products:product_list')
