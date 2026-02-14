<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" placeholder="Enter username" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Enter password" required />
        </div>
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Authenticating...' : 'Login' }}
        </button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
      <div class="login-links">
        <router-link to="/register" class="login-link">Don't have an account? Register</router-link>
        <router-link to="/reset-password" class="login-link">Forgot password?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/auth';
import { useAuthStore } from '../store/auth';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();
const auth = useAuthStore();

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await loginUser(username.value, password.value);
    auth.login();
    router.push('/');
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      let details = [];
      if (data && data.errors) {
        if (typeof data.errors === 'string') {
          details.push(data.errors);
        } else if (typeof data.errors === 'object') {
          details = details.concat(Object.values(data.errors).flat());
        }
      }
      if (data && data.message) {
        details.push(data.message);
      }
      if (data && data.detail) {
        details.push(data.detail);
      }
      if (details.length === 0 && data) {
        details = details.concat(Object.values(data).flat());
      }
      error.value = `Login failed (HTTP ${status}).\n` + details.join('\n');
    } else {
      error.value = 'Login failed. No response from server.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
}
.login-link {
  color: var(--extra-color);
  text-decoration: underline;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.2s;
}
.login-link:hover {
  color: var(--text-color);
}
/* Matching the Color Palette from ProductDetails */
.login-container {
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Centers the card vertically on the page */
}

.login-card {
  max-width: 400px;
  width: 100%;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem;
  border-radius: 18px;
  /* Matching the ProductDetails glowing shadow */
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.2); 
  border: 1px solid rgba(82, 255, 134, 0.1);
}

.login-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--extra-color);
}

input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--extra-color);
  border-radius: 8px;
  padding: 0.8rem;
  color: #fff;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
}

.login-btn {
  width: 100%;
  background: var(--text-color);
  color: var(--background-color); /* Dark text on gold button for high contrast */
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
}

.login-btn:hover:not(:disabled) {
  background: #d4a608;
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4d;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  background: rgba(255, 77, 77, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}
</style>