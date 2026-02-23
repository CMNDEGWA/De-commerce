<template>
  <div class="reset-password">
    <h2>Reset Password</h2>
    <form @submit.prevent="submitResetRequest">
      <div class="form-section">
        <label for="email">Email Address</label>
        <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
      </div>
      <button type="submit">Send Reset Link</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

function submitResetRequest() {
  fetch('/api/password-reset/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }
      alert('Password reset link sent to your email');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send reset link');
    });
}
</script>

<style scoped>
.reset-password {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.form-section {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>