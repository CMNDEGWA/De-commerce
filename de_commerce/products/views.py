from django.shortcuts import render, get_object_or_404, redirect
from .models import Product, Category, Cart, CartItem, Order, OrderItem
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse
from django.core.paginator import Paginator
from .forms import OrderForm

@login_required
@require_POST
def cancel_order(request, order_id):
	"""Cancel a pending order for the logged-in user."""
	order = get_object_or_404(Order, id=order_id, user=request.user, status='pending')
	order.status = 'cancelled'
	order.save()
	messages.success(request, f"Order #{order.id} cancelled.")
	return redirect('products:order_history')

@login_required
@require_POST
def clear_cart(request):
	"""Clear all items from the user's cart."""
	cart = get_object_or_404(Cart, user=request.user)
	cart.items.all().delete()
	messages.success(request, "Cart cleared.")
	return redirect('products:cart_detail')
from django.db.models import Count


# User registration view
def register(request):
	"""Handle user registration."""
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			return redirect('products:product_list')
	else:
		form = UserCreationForm()
	return render(request, 'products/register.html', {'form': form})

@login_required
def profile(request):
	"""Display user profile."""
	return render(request, 'products/profile.html')

# User logout view
class CustomLogoutView(LogoutView):
	next_page = 'products:home'
def product_detail(request, pk):
	"""Display product details."""
	product = get_object_or_404(Product, pk=pk)
	return render(request, 'products/productDetail.html', {'product': product})

@login_required
def order_history(request):
	"""Display user's order history."""
	orders = request.user.order_set.order_by('-created_at').prefetch_related('items__product')
	return render(request, 'products/order_history.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
	"""Display details for a specific order."""
	order = get_object_or_404(Order, id=order_id, user=request.user)
	return render(request, 'products/order_detail.html', {'order': order})

@login_required
def cart_detail(request):
	"""Display and update user's cart."""
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
def add_to_cart(request, product_id):
	"""Add a product to the user's cart."""
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
@require_POST
def place_order(request):
	"""Place an order for the items in the user's cart."""
	cart = get_object_or_404(Cart, user=request.user)
	if not cart.items.exists():
		messages.error(request, "Your cart is empty.")
		return redirect('products:cart_detail')

	if request.method == 'POST':
		form = OrderForm(request.POST)
		if form.is_valid():
			order = form.save(commit=False)
			order.user = request.user
			order.save()
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
	else:
		form = OrderForm()

	return render(request, 'products/place_order.html', {'form': form, 'cart': cart})


# Home view for top 10 popular products
def home(request):
	"""Display the home page with top 10 popular products."""
	popular_products = Product.objects.annotate(order_count=Count('orderitem')).order_by('-order_count')[:10]
	return render(request, 'products/home.html', {'products': popular_products})


# Product list view with category filtering and sorting
def product_list(request):
	"""Display a list of products with optional filtering and sorting."""
	query = request.GET.get('q')
	category_id = request.GET.get('category')
	sort_by = request.GET.get('sort', 'name')

	products = Product.objects.all()
	if query:
		products = products.filter(name__icontains=query)
	if category_id:
		products = products.filter(category_id=category_id)

	if sort_by in ['name', 'price']:
		products = products.order_by(sort_by)

	paginator = Paginator(products, 10)
	page_number = request.GET.get('page')
	page_obj = paginator.get_page(page_number)

	categories = Category.objects.all()
	return render(request, 'products/productList.html', {'products': page_obj, 'categories': categories})


# Custom login view
class CustomLoginView(LoginView):
	template_name = 'products/login.html'

	def get_success_url(self):
		return self.get_redirect_url() or reverse('products:product_list')
