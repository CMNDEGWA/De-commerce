<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="navbar-brand fw-bold text-uppercase" style="color: var(--text-color); letter-spacing: 2px;">
        <router-link to="/" class="text-decoration-none" style="color: inherit;">De-commerce</router-link>
      </div>
      <ul class="navbar-nav flex-row align-items-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home me-2"></i>
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-building me-2"></i>
            Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">
            <i class="fas fa-shopping-cart me-2"></i>
            Cart
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">
            <i class="fas fa-box me-2"></i>
            Orders
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/register">
            <i class="fas fa-user-plus me-2"></i>
            Register / Login
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/profile">
            <i class="fas fa-user me-2"></i>
            Profile
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a class="nav-link" href="#" @click.prevent="logout">
            <i class="fas fa-sign-out-alt me-2"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


import { logoutUser } from '../services/auth';
const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));
const router = useRouter();

async function logout() {
  try {
    await logoutUser();
  } catch {}
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
}

// Ensure Font Awesome is loaded for icons
onMounted(() => {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(link);
  }
  // Listen for login/logout events
  window.addEventListener('storage', () => {
    isAuthenticated.value = !!localStorage.getItem('isAuthenticated');
  });
});
</script>

<style>

:root  {
    --text-color: #eeba0b;
    --extra-color: #198754;
}

.navbar {
    height: 14vh;    
    background: var(--extra-color); /* semi-transparent background */
    backdrop-filter: blur(5px);
    cursor: pointer;
}

.navbar-nav {
    font-family: "Newsreader", sans-serif;
    font-weight: 600;
}

.navbar-nav .nav-item {
    position: relative;
    padding-right: 21px;
    margin-right: 14px;
}

</style>
