from django import forms
from .models import Order

class CartAddProductForm(forms.Form):
    quantity = forms.IntegerField(min_value=1, initial=1)

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['shipping_address', 'phone_number', 'payment_method']