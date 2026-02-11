from django import forms
from .models import Order


class CartAddProductForm(forms.Form):
    """Form for adding a product to the cart."""
    quantity = forms.IntegerField(min_value=1, initial=1)

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity < 1:
            raise forms.ValidationError('Quantity must be at least 1.')
        return quantity


class OrderForm(forms.ModelForm):
    """Form for placing an order."""
    class Meta:
        model = Order
        fields = ['shipping_address', 'phone_number', 'payment_method', 'status']

    def clean_phone_number(self):
        phone = self.cleaned_data.get('phone_number')
        if not phone.isdigit() or len(phone) < 7:
            raise forms.ValidationError('Enter a valid phone number.')
        return phone