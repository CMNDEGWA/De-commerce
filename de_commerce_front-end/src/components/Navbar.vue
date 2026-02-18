<template>
  <!-- Navigation Bar with Dynamic Links Based on Authentication Status -->
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Brand/Logo - Always Visible -->
      <div class="navbar-brand">
        <!-- router-link: Navigate to home without page reload -->
        <router-link to="/" class="brandName">Jirani Merchants</router-link>
      </div>

      <!-- Navigation Links -->
      <ul class="navbar-nav flex-row align-items-center">
        <!-- Home Link - Always Visible -->
        <li class="nav-item">
          <router-link class="nav-link" to="/" exact-active-class="active-page">
            <i class="fas fa-home me-2"></i> Home
          </router-link>
        </li>

        <!-- Products Link - Always Visible (No Login Required) -->
        <li class="nav-item">
          <router-link class="nav-link" to="/products" active-class="active-page">
            <i class="fas fa-building me-2"></i> Products
          </router-link>
        </li>

        <!-- Cart Link - ONLY FOR AUTHENTICATED USERS -->
        <!-- v-if="isAuthenticated": Only renders if user is logged in -->
        <!-- Links to /cart route where user can review shopping cart -->
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/cart" active-class="active-page">
            <i class="fas fa-shopping-cart me-2"></i> Cart
          </router-link>
        </li>

        <!-- Orders Link - ONLY FOR AUTHENTICATED USERS -->
        <!-- v-if="isAuthenticated": Only renders if user is logged in -->
        <!-- Links to /orders route where user can view order history -->
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/orders" active-class="active-page">
            <i class="fas fa-box me-2"></i> Orders
          </router-link>
        </li>

        <!-- Conditional Authentication Links -->
        <!-- v-if="!isAuthenticated": Show for logged-out users -->
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/login" active-class="active-page">
            <i class="fas fa-user-plus me-2"></i> Login
          </router-link>
        </li>

        <!-- Authenticated User Menu: Profile and Logout -->
        <!-- v-else (implicit from v-if): Show for logged-in users -->
        <template v-else>
          <!-- Profile Link - ONLY FOR AUTHENTICATED USERS -->
          <!-- Links to /profile route with user information and order history -->
          <li class="nav-item">
            <router-link class="nav-link" to="/profile" active-class="active-page">
              <i class="fas fa-user me-2"></i> Profile
            </router-link>
          </li>

          <!-- Logout Link - ONLY FOR AUTHENTICATED USERS -->
          <!-- @click.prevent="logout": Calls logout function on click -->
          <!-- .prevent: Prevents default link behavior (navigation) -->
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
/**
 * Navbar Component Script
 * 
 * Displays navigation bar with links to main pages.
 * Links dynamically shown/hidden based on authentication status.
 * Uses reactive state from useAuthStore (Pinia) for isAuthenticated flag.
 */

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logoutUser } from '../services/auth';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
/**
 * storeToRefs: Convert Pinia store properties to Vue reactive refs
 * Allows using isAuthenticated directly in template
 * When auth.isAuthenticated changes, template automatically updates
 */
const { isAuthenticated } = storeToRefs(auth);
const router = useRouter();

/**
 * logout(): Handle user logout
 * 
 * Called when user clicks "Logout" link
 * Steps:
 * 1. Call logoutUser() API to server (destroy session)
 * 2. Call auth.logout() to update Pinia store
 * 3. Redirect to /login page
 * 
 * Error Handling:
 * - Try-catch silently ignores API errors
 * - Store logout still executes even if API fails
 * - User always redirected to login page
 * 
 * Effects After Logout:
 * - isAuthenticated set to false
 * - localStorage 'isAuthenticated' key removed
 * - Navbar shows Login link instead of Cart/Orders/Profile
 * - Protected routes redirect to /login if accessed
 * - API calls include session cookie but will return 401
 */
async function logout() {
  try {
    await logoutUser();
  } catch {}  // Silently handle API errors
  auth.logout();  // Clear frontend auth state
  router.push('/login');  // Redirect to login page
}

/**
 * onMounted(): Lifecycle hook - runs after component rendered
 * 
 * Responsibilities:
 * 1. Load Font Awesome icons if not already loaded
 * 2. Set up cross-tab authentication sync
 */
onMounted(() => {
  /**
   * Load Font Awesome icons dynamically
   * Checks if Font Awesome stylesheet already in document
   * If not, creates <link> element and appends to <head>
   * Allows icons (fas fa-home, fas fa-shopping-cart, etc) to render
   */
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(link);
  }

  /**
   * Cross-Tab Authentication Sync
   * 
   * Scenario: User has two browser tabs open, logs in on Tab A
   * - Tab A: localStorage 'isAuthenticated' set to 'true'
   * - Tab B: Needs to detect change and update UI
   * 
   * Solution: Listen for 'storage' event
   * - Fires when localStorage changes in another tab
   * - Calls auth.sync() to refresh state from localStorage
   * - Navbar automatically updates to show logged-in state
   * 
   * Implementation:
   * window.addEventListener('storage', callback)
   * Callback updates Pinia store from localStorage
   */
  window.addEventListener('storage', () => {
    auth.sync();
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