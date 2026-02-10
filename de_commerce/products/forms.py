from django import forms

class CartAddProductForm(forms.Form):
    quantity = forms.IntegerField(min_value=1, initial=1)

class OrderForm(forms.Form):
    # Example: add shipping address field
    shipping_address = forms.CharField(max_length=255, required=False, label="Shipping Address (optional)")