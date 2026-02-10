from django import forms

class CartAddProductForm(forms.Form):
    quantity = forms.IntegerField(min_value=1, initial=1)

class OrderForm(forms.Form):
    # Extend as needed for shipping/payment info
    pass