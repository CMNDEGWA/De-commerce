from rest_framework.test import APIClient
class OrderStatusTest(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='apitest', password='pass')
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)
		self.category = Category.objects.create(name='APIcat')
		self.product = Product.objects.create(name='APIprod', description='desc', price=1.0, category=self.category)
		self.cart = Cart.objects.create(user=self.user)
		self.order = Order.objects.create(user=self.user, shipping_address='addr', phone_number='1234567', payment_method='Credit Card', status='pending')

	def test_order_status_field(self):
		self.assertEqual(self.order.status, 'pending')
		self.order.status = 'shipped'
		self.order.save()
		self.assertEqual(Order.objects.get(id=self.order.id).status, 'shipped')

	def test_order_status_api(self):
		response = self.client.get(f'/api/orders/{self.order.id}/')
		self.assertEqual(response.status_code, 200)
		self.assertIn('status', response.data)

from django.contrib.auth import get_user_model
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .forms import CartAddProductForm, OrderForm
from django.urls import reverse

User = get_user_model()

class CategoryModelTest(TestCase):
	def test_str(self):
		category = Category.objects.create(name='Electronics')
		self.assertEqual(str(category), 'Electronics')

class ProductModelTest(TestCase):
	def setUp(self):
		self.category = Category.objects.create(name='Books')
		self.product = Product.objects.create(name='Django Book', description='A book on Django', price=10.0, category=self.category)

	def test_str(self):
		self.assertEqual(str(self.product), 'Django Book')
	def test_get_price(self):
		self.assertEqual(self.product.get_price(), 10.0)

class CartModelTest(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testuser', password='pass')
		self.cart = Cart.objects.create(user=self.user)
		self.category = Category.objects.create(name='Toys')
		self.product = Product.objects.create(name='Toy', description='A toy', price=5.0, category=self.category)
		self.item = CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)

	def test_total_items(self):
		self.assertEqual(self.cart.total_items(), 2)
	def test_total_price(self):
		self.assertEqual(self.cart.total_price(), 10.0)

class CartAddProductFormTest(TestCase):
	def test_valid_quantity(self):
		form = CartAddProductForm({'quantity': 2})
		self.assertTrue(form.is_valid())
	def test_invalid_quantity(self):
		form = CartAddProductForm({'quantity': 0})
		self.assertFalse(form.is_valid())

class ProductListViewTest(TestCase):
	def setUp(self):
		self.category = Category.objects.create(name='Clothes')
		Product.objects.create(name='Shirt', description='A shirt', price=20.0, category=self.category)

	def test_product_list_view(self):
		response = self.client.get(reverse('products:product_list'))
		self.assertEqual(response.status_code, 200)
		self.assertContains(response, 'Shirt')
