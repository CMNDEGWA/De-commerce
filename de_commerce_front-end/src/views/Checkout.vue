<template>
  <div class="checkout">
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-section-billing">
        <h3>Billing Information</h3>
        <input v-model="billing.name" placeholder="Full Name" required />
        <input v-model="billing.address" placeholder="Billing Address" required />
        <input v-model="billing.phone" placeholder="Phone Number" required />
      </div>
      <div class="form-section-payment">
        <h3>Payment Type</h3>
        <select v-model="paymentType" required>
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>
      <div class="form-section-summary">
        <h3>Order Summary</h3>
        <ul>
          <li v-for="item in cart.items" :key="item.id">
            {{ item.product.name }} (x{{ item.quantity }}) - {{ formatPrice(item.product.price) }}
          </li>
        </ul>
      </div>
      <button type="submit">Place Order</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
const cartStore = useCartStore();
cartStore.load();
const cart = ref({ items: cartStore.items.map(i => ({ id: i.product.id, product: i.product, quantity: i.quantity })) });
const billing = ref({ name: '', address: '', phone: '' });
const paymentType = ref('credit');
const router = useRouter();

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function submitOrder() {
  // Require login before placing order
  if (!isAuthenticated.value) {
    // Redirect to login; preserve next step if desired
    router.push('/login');
    return;
  }

  // Save order logic here (API call)
  const orderData = {
    billing: billing.value,
    paymentType: paymentType.value,
    items: cart.value.items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))
  };

  fetch('/api/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`
    },
    body: JSON.stringify(orderData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      return response.json();
    })
    .then(data => {
      console.log('Order placed successfully:', data);
      cartStore.clear();
      router.push('/orders');
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
  
}

.checkout {
  max-width: 700px;
  margin: 2rem auto;
  color: var(--text-color);
  padding: 2rem;
  border-radius: 0;
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.2); 
}

.checkout h2 {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  font-size: 2.8rem;
  margin: 0.7rem 1.5rem;
}

.checkout form {
  padding: 0.7rem 0;
}

.form-section-billing {
  margin-bottom: 1.5rem;
}

.form-section-payment {
  margin: 1.5rem 0;
}

.form-section h3 {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 1.4px;
  font-size: 1.5rem;
  margin: 0.5rem 1.5rem;
}

input {
  display: block;
  width: 70%;
  margin: 1.8rem 0;
  margin-left: 1.4rem;
  padding: 0.7rem;
  border-radius: 0;
  border: 1.4px solid var(--text-color);
}

button[type="submit"] {
  background: var(--text-color);
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  color: var(--extra-color);
  border: none;
  border-radius: 0;
  padding: 0.7rem 2.2rem;
  margin: 0.7rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.7s ease;
}

button[type="submit"]:hover {
  background: var(--background-color);
  color: var(--extra-color);
  border: 1.4px solid var(--extra-color);
}
</style>
