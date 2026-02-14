
<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="profilePic" alt="Profile Picture" class="profile-pic" />
        <h2 class="profile-title">{{ user.username }}</h2>
        <span class="profile-email">{{ user.email }}</span>
      </div>
      <div class="profile-info">
        <div class="profile-row"><strong>Username:</strong> {{ user.username }}</div>
        <div class="profile-row"><strong>Email:</strong> {{ user.email }}</div>
        <div class="profile-row"><strong>Registered:</strong> {{ formatDate(user.created_at) }}</div>
        <!-- Add more fields as needed -->
      </div>
      <div class="profile-orders">
        <h3>Your Orders</h3>
        <ul>
          <li v-for="order in orders" :key="order.id" :class="['order-status', order.status]">
            <strong>Order #{{ order.id }}</strong> - <span class="order-status">{{ order.status }}</span><br />
            <span>Date: {{ formatDate(order.created_at) }}</span><br />
            <span>Product: {{ order.product.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../store/orders';

const ordersStore = useOrderStore();
const orders = computed(() => ordersStore.orders);

const user = ref({
  username: localStorage.getItem('username') || 'Guest',
  email: localStorage.getItem('email') || 'guest@example.com',
  created_at: localStorage.getItem('created_at') || new Date().toISOString(),
});

const profilePic = localStorage.getItem('profilePic') || 'https://i.pravatar.cc/150?img=3';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString();
}

onMounted(() => {
  ordersStore.load();
});
</script>

<style scoped>
:root  {
    --text-color: #eeba0b;
    --extra-color: #198754;
    --paragraph-color: #f0f0f0;
    --background-color: #062726;
}
.profile-container {
  max-width: 700px;
  margin: 4rem auto 2rem auto;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.7);
  position: relative;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--extra-color);
  margin-bottom: 1rem;
}
.profile-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}
.profile-email {
  font-size: 1rem;
  color: var(--extra-color);
}
.profile-info {
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.profile-row {
  font-size: 1.08rem;
  color: var(--paragraph-color);
}
.profile-orders {
  width: 100%;
  margin-top: 2rem;
}
.profile-orders h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}
.profile-orders ul {
  list-style: none;
  padding: 0;
}
.profile-orders li {
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
.profile-orders strong {
  color: var(--text-color);
  font-size: 1.1rem;
}
.order-status {
  font-weight: 700;
  text-transform: capitalize;
  color: var(--text-color);
}
</style>
