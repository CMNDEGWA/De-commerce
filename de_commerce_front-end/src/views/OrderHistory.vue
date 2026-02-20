
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
import { computed, onMounted, ref } from 'vue';
import { useOrderStore } from '../store/orders';

const ordersStore = useOrderStore();
const loading = ref(true);

const orders = computed(() => ordersStore.orders);

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString();
}

onMounted(() => {
  ordersStore.load();
  loading.value = false;
});
</script>

<style scoped>
:root  {
  --text-color: #92140c;
  --extra-color: #fff8f0;
  --paragraph-color: #fff8f0;
  --background-color: #1e1e24;
}

.order-history {
  max-width: 700px;
  margin: 4rem auto 2rem auto;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 0 40px 10px rgba(146, 20, 12, 0.08);
  position: relative;
}

.order-history ul {
  list-style: none;
  padding: 0;
}

.order-history li {
  background: var(--extra-color);
  color: #fff;
  margin-bottom: 1.2rem;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  font-size: 1.08rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-history strong {
  color: var(--text-color);
  font-size: 1.1rem;
}

.order-history .order-status {
  font-weight: 700;
  text-transform: capitalize;
  color: var(--text-color);
}
</style>
