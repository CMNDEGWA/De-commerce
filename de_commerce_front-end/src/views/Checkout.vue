<template>
  <div class="checkout">
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-section">
        <h3>Billing Information</h3>
        <input v-model="billing.name" placeholder="Full Name" required />
        <input v-model="billing.address" placeholder="Billing Address" required />
        <input v-model="billing.phone" placeholder="Phone Number" required />
      </div>
      <div class="form-section">
        <h3>Payment Type</h3>
        <select v-model="paymentType" required>
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>
      <div class="form-section">
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
  // On success:
  router.push('/orders');
}
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.form-section {
  margin-bottom: 1.5rem;
}
input, select {
  display: block;
  width: 100%;
  margin: 0.5rem 0 1rem 0;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button[type="submit"] {
  background: #fff8f0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="submit"]:hover {
  background: #146c43;
}
</style>
