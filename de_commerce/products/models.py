from django.db import models
from django.conf import settings

class Category(models.Model):

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # New field for product images

    def __str__(self):
        return self.name

    def get_price(self):
        """Return the price of the product."""
        return self.price

    def get_category(self):
        """Return the category of the product."""
        return self.category

class Cart(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

    def total_items(self):
        """Return the total number of items in the cart."""
        return sum(item.quantity for item in self.items.all())

    def total_price(self):
        """Return the total price of all items in the cart."""
        return sum(item.product.price * item.quantity for item in self.items.select_related('product').all())

class CartItem(models.Model):

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def get_total_price(self):
        """Return the total price for this cart item."""
        return self.product.price * self.quantity

class Order(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        help_text='Order status',
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    shipping_address = models.TextField(default='Default Address')  # Default value for existing rows
    phone_number = models.CharField(max_length=15)  # New field for phone number
    payment_method = models.CharField(
        max_length=50,
        choices=[('Credit Card', 'Credit Card'), ('PayPal', 'PayPal')],
        default='Credit Card'  # Default value for existing rows
    )  # New field for payment method

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    def total_items(self):
        """Return the total number of items in the order."""
        return sum(item.quantity for item in self.items.all())

    def total_price(self):
        """Return the total price of the order."""
        return sum(item.price * item.quantity for item in self.items.all())

class OrderItem(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # price at time of order


    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order {self.order.id})"

    def get_total_price(self):
        """Return the total price for this order item."""
        return self.price * self.quantity

