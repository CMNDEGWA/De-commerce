<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Register</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label>Username</label>
          <input v-model="form.username" placeholder="Choose a username" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="form.password1" placeholder="Create a password" required />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" v-model="form.password2" placeholder="Repeat your password" required />
        </div>
        
        <button type="submit" :disabled="loading" class="register-btn">
          {{ loading ? 'Creating Account...' : 'Register' }}
        </button>

        <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="error" class="text-red-500 text-sm mb-2">
            <template v-if="Array.isArray(error)">
              <ul class="list-disc ml-5">
                <li v-for="(errMsg, idx) in error" :key="idx">{{ errMsg }}</li>
              </ul>
            </template>
            <template v-else>
              {{ error }}
            </template>
          </div>
        <div v-if="success" class="success-message">Registration successful! Redirecting to login...</div>
      </form>
      <div class="register-links">
        <router-link to="/login" class="register-link">Already have an account? Login</router-link>
      </div>
    </div>
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
    // Improved error extraction
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
      if (data && data.detail) {
        details.push(data.detail);
      }
      if (data && data.non_field_errors) {
        details = details.concat(data.non_field_errors);
      }
      if (details.length === 0 && data) {
        // Show all serializer errors
        details = details.concat(Object.values(data).flat());
      }
      error.value = `Registration failed (HTTP ${status}).\n` + details.join('\n');
    } else {
      error.value = 'Registration failed. No response from server.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.register-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
}
.register-link {
  color: var(--extra-color);
  text-decoration: underline;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.2s;
}
.register-link:hover {
  color: var(--text-color);
}
.register-container {
  /* Theme Variables from ProductDetails */
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 1rem;
}

.register-card {
  max-width: 450px;
  width: 100%;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem;
  border-radius: 18px;
  /* Matching the ProductDetails glowing shadow */
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.25);
  border: 1px solid rgba(82, 255, 134, 0.1);
}

.register-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--extra-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--extra-color);
  border-radius: 8px;
  padding: 0.8rem;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 8px rgba(238, 186, 11, 0.3);
}

.register-btn {
  width: 100%;
  background: var(--text-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
}

.register-btn:hover:not(:disabled) {
  background: #d4a608;
  transform: translateY(-2px);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4d;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  background: rgba(255, 77, 77, 0.1);
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 77, 77, 0.2);
}

.success-message {
  color: #2ecc71;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  background: rgba(46, 204, 113, 0.1);
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid rgba(46, 204, 113, 0.2);
}

@media (max-width: 480px) {
  .register-card {
    padding: 1.5rem;
  }
}
</style>