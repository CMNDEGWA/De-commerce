
<template>
  <div class="order-history">
    <h2>Order History</h2>
    <div v-if="loading">Loading orders...</div>
    <div v-else-if="orders && orders.length">
      <ul>
        <li v-for="order in orders" :key="order.id">
          <strong>Order #{{ order.id }}</strong> - {{ order.status }}<br />
          <span>Date: {{ formatDate(order.created_at) }}</span><br />
          <span>Total items: {{ order.items.length }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchOrders } from '../services/order';

const orders = ref([]);
const loading = ref(true);

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString();
}

onMounted(async () => {
  try {
    const response = await fetchOrders();
    orders.value = Array.isArray(response.data) ? response.data : response.data.results || [];
  } catch (error) {
    orders.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.order-history {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
