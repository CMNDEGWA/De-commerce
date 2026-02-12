<template>
  <div class="order-detail">
    <h2>Order Detail</h2>
    <div v-if="loading">Loading order...</div>
    <div v-else-if="order">
      <p><strong>Order #{{ order.id }}</strong></p>
      <p>Status: {{ order.status }}</p>
      <p>Date: {{ formatDate(order.created_at) }}</p>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          {{ item.product.name }} (x{{ item.quantity }}) - {{ formatPrice(item.price) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Order not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchOrder } from '../services/orderDetail';

const route = useRoute();
const order = ref(null);
const loading = ref(true);

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString();
}
function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

onMounted(async () => {
  try {
    const response = await fetchOrder(route.params.id);
    order.value = response.data;
  } catch (error) {
    order.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.order-detail {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
