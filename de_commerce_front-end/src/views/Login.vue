
<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Username</label>
        <input v-model="username" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/auth';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await loginUser(username.value, password.value);
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/');
  } catch (err) {
    error.value = 'Login failed. Check your credentials.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
