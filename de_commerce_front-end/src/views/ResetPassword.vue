<template>
  <div class="reset-password-container">
    <div class="reset-password-card">
      <h2 class="reset-password-title">Reset Password</h2>
      <form @submit.prevent="submitResetRequest" class="reset-password-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
        </div>
        <button type="submit" :disabled="loading" class="reset-password-btn">
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>
      </form>
      <div class="reset-password-links">
        <router-link to="/login" class="reset-password-link">Back to Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const email = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

async function submitResetRequest() {
  loading.value = true;
  error.value = '';
  success.value = '';
  
  try {
    const response = await api.post('password-reset/', {
      email: email.value
    });
    
    // Reset form and show success
    email.value = '';
    success.value = response.data?.message || 'Password reset link sent to your email!';
    error.value = '';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = '';
    }, 5000);
    
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      let details = [];
      
      // Extract error details from various response formats
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
      
      error.value = details.length > 0 
        ? `Reset failed (HTTP ${status}).\n` + details.join('\n')
        : `Reset failed. Server returned HTTP ${status}.`;
    } else if (err.request) {
      error.value = 'Reset failed. No response from server. Please check your connection and try again.';
    } else {
      error.value = 'Reset failed. ' + (err.message || 'Unknown error occurred.');
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
}


.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 55vh;
}

.reset-password-card {
  max-width: 500px;
  width: 100%;
  background: var(--background-color);
  color: var(--paragraph-color);
  padding: 2.5rem;
  border-radius: 0;
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.2);
  border: 1px solid var(--text-color);
}

.reset-password-title {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  font-size: 2.8rem;
  color: var(--text-color);
  margin-bottom: 2.8rem;
  text-align: center;
}

.reset-password-form .form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reset-password-form label {
  font-size: 1rem;
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  color: var(--text-color);
  padding: 0rem 1.4rem;
}

.reset-password-form input {
  background: var(--background-color);
  border: 1px solid var(--paragraph-color);
  border-radius: 0;
  border-bottom: none;
  padding: 0.8rem;
  color: var(--text-color);
  outline: none;
  transition: border-color 0.7s ease;
}

.reset-password-form input:focus {
  border-color: var(--text-color);
  background: var(--background-color);
}

.reset-password-form input::placeholder {
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  font-size: 1rem;
}

.reset-password-btn {
  width: 100%;
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  background: var(--extra-color);
  color: var(--text-color);
  border: none;
  border-radius: 0;
  padding: 0.8rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.7s ease;
  margin-top: 3rem;
}

.reset-password-btn:hover:not(:disabled) {
  background: var(--background-color);
  color: var(--extra-color);
  border-bottom: 2px solid var(--extra-color);
  transform: translateY(-2px);
  margin-top: 1.8rem;
}

.reset-password-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: var(--extra-color);
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  background: var(--text-color);
  padding: 0.5rem;
  border-radius: 0;
}

.success-message {
  color: var(--background-color);
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  background: #4CAF50;
  padding: 0.8rem;
  border-radius: 0;
  font-weight: 600;
  animation: fadeOut 5s ease-in-out;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

.reset-password-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}

.reset-password-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.7s ease;
  padding: 0.4rem 0.8rem;
  border-bottom: 1.4px solid var(--extra-color);
}

.reset-password-link:hover {
  border: none;
  background-color: var(--paragraph-color);
  color: var(--background-color);
}
</style>