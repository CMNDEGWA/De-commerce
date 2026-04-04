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
            {{ item.product.name }} (x{{ item.quantity }}) - {{ formatPrice(item.product.price * item.quantity) }}
          </li>
        </ul>
        <p><strong>Total: {{ formatPrice(total) }}</strong></p>
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
const total = ref(0);
const router = useRouter();

// Calculate total
total.value = cart.value.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

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
  max-width: 1000px;
  margin: 2rem auto;
  background: var(--background-color);
  padding: 2rem;
  border-radius: 0;
  border: 1.4px solid var(--paragraph-color);
}

.checkout h2 {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  font-size: 2rem;
  margin: 0 2rem;
  color: var(--text-color);
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

.form-section-summary {
  color: var(--text-color);
}

.form-section-billing,
.form-section-payment,
.form-section-summary h3 {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1px;
  font-size: 1.3rem;
  margin: 0.5rem 1.5rem;
  color: var(--text-color);
}

input, select {
  font-family: "Jersey 10", sans-serif;
  padding: 0.4rem 1rem;
  border-radius: 0;
  border: 1px solid var(--extra-color);
  font-size: 1.1rem;
  letter-spacing: 1.4px;
  background-color: var(--background-color);
  display: block;
  width: 70%;
  margin: 1.8rem 0;
  margin-left: 1.4rem;
}

button[type="submit"] {
  background-color: var(--paragraph-color);
  color: var(--background-color);
  font-family: "Jersey 10", sans-serif;
  border: none;
  border-radius: 0;
  padding: 0.7rem 2rem;
  margin: 0.7rem 1.5rem;
  font-size: 1.2rem;
  letter-spacing: 1.4px;
  cursor: pointer;
  transition: all 0.7s ease;
}

button[type="submit"]:hover {
  background: var(--background-color);
  border: 1.4px solid var(--text-color);
  color: var(--extra-color);
}
</style>
