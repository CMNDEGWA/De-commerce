<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="navbar-brand">
        <router-link to="/" class="brandName">Jirani Merchants</router-link>
      </div>
      <ul class="navbar-nav flex-row align-items-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/" exact-active-class="active-page">
            <i class="fas fa-home me-2"></i> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products" active-class="active-page">
            <i class="fas fa-building me-2"></i> Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart" active-class="active-page">
            <i class="fas fa-shopping-cart me-2"></i> Cart
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders" active-class="active-page">
            <i class="fas fa-box me-2"></i> Orders
          </router-link>
        </li>
        
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/login" active-class="active-page">
            <i class="fas fa-user-plus me-2"></i> Login
          </router-link>
        </li>
        
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile" active-class="active-page">
              <i class="fas fa-user me-2"></i> Profile
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Logout
            </a>
          </li>
        </template>
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

<style scoped>
:root {
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  /* semi-transparent version for the glass effect */
  --navbar-bg: rgba(6, 39, 37, 0.8); 
}

.navbar {
  height: 12vh; /* Adjusted for better visibility */
  background-color: var(--navbar-bg);
  /* The Blur Effect */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  
  /* Border and Box Shadow */
  border-bottom: 3px solid var(--text-color);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  
  transition: all 0.3s ease;
  z-index: 1000;
}

.navbar-brand .brandName {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.6rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  letter-spacing: 3px;
}

.navbar-nav .nav-item {
  margin: 0 0.5rem;
  transition: transform 0.3s ease;
}

.nav-link {
  color: var(--text-color) !important;
  font-family: "Newsreader", sans-serif;
  font-weight: 600;
  padding: 10px 18px !important;
  border-radius: 12px;
  display: flex;
  align-items: center;
}

/* Hover Effect */
.nav-link:hover {
  background-color: rgba(238, 186, 11, 0.15);
  transform: translateY(-2px);
}

/* --- ACTIVE PAGE STYLING --- */
.active-page {
  background-color: var(--text-color) !important;
  color: var(--background-color) !important; /* Dark text for contrast */
  box-shadow: 0 4px 15px rgba(238, 186, 11, 0.6); /* Glowing shadow */
  font-weight: 700;
}

.active-page i {
  color: var(--background-color) !important;
}

/* Ensures the icon inherits the link's color */
.nav-item i {
  transition: color 0.3s ease;
}
</style>