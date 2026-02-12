
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="loading">Loading cart...</div>
    <div v-else-if="cart && cart.items && cart.items.length">
      <ul>
        <li v-for="item in cart.items" :key="item.id">
          <strong>{{ item.product.name }}</strong> (x{{ item.quantity }}) - {{ formatPrice(item.product.price) }}
        </li>
      </ul>
      <!-- Add checkout button here -->
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchCart } from '../services/cart';

const cart = ref(null);
const loading = ref(true);

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

onMounted(async () => {
  try {
    const response = await fetchCart();
    // If API returns a list, use the first cart (for single-user cart)
    cart.value = Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (error) {
    cart.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
:root  {
    --text-color: #eeba0b;
    --extra-color: #198754;
    --paragraph-color: #f0f0f0;
    --background-color: #062726;
}

.cart {
  max-width: 800px;
  margin: 2rem auto;
  background: var(--extra-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
