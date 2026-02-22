
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

@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
}

.profile-container {
  max-width: 800px;
  margin: 4rem auto 2rem auto;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 0;
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.2); 
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
  width: 210px;
  height: 210px;
  border-radius: 0%;
  object-fit: cover;
  border: 3px solid var(--text-color);
  margin-bottom: 1rem;
}

.profile-title {
  font-size: 2.7rem;
  letter-spacing: 1.4px;
  font-family: "Jersey 10", sans-serif;
  color: var(--text-color);
}

.profile-email {
  font-family: "Jersey 10", sans-serif;
  font-size: 1.35rem;
  color: var(--extra-color);
}

.profile-info {
  width: 100%;
  margin: 2rem 0;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border-bottom: 1.4px solid var(--extra-color);
}

.profile-row {
  font-family: "Montserrat", sans-serif;
  font-size: 1.08rem;
  color: var(--paragraph-color);
}

.profile-row strong {
  padding: 1rem;
}

.profile-orders {
  width: 100%;
}

.profile-orders h3 {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  color: var(--text-color);
  margin-bottom: 2.7rem;
}

.profile-orders ul {
  list-style: none;
  padding: 0;
}

.profile-orders li {
  background: var(--paragraph-color);
  font-family: "Montserrat", sans-serif;
  color: var(--background-color);
  margin: 4rem 0;
  padding: 1.2rem 1.5rem;
  border-radius: 0;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-orders strong {
  color: var(--extra-color);
  font-size: 1.1rem;
}

.order-status {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  font-size: 1.1rem;
  text-transform: capitalize;
  color: var(--extra-color);
}

</style>
