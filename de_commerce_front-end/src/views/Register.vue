
<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label>Username</label>
        <input v-model="form.username" required />
      </div>
      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password1" required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" v-model="form.password2" required />
      </div>
      <button type="submit" :disabled="loading">Register</button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">Registration successful! You can now log in.</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../services/auth';

const form = ref({ username: '', email: '', password1: '', password2: '' });
const loading = ref(false);
const error = ref('');
const success = ref(false);
const router = useRouter();

async function handleRegister() {
  loading.value = true;
  error.value = '';
  success.value = false;
  if (form.value.password1 !== form.value.password2) {
    error.value = 'Passwords do not match.';
    loading.value = false;
    return;
  }
  try {
    await registerUser({
      username: form.value.username,
      email: form.value.email,
      password1: form.value.password1,
      password2: form.value.password2
    });
    success.value = true;
    localStorage.setItem('isAuthenticated', 'true');
    setTimeout(() => router.push('/login'), 1500);
  } catch (err) {
    error.value = 'Registration failed. Please check your input.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.register {
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
.success {
  color: green;
  margin-top: 1rem;
}
</style>
