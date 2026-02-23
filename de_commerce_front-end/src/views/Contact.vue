<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitContactForm">
      <div class="form-section">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" placeholder="Your Name" required />
      </div>
      <div class="form-section">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" placeholder="Your Email" required />
      </div>
      <div class="form-section">
        <label for="message">Message</label>
        <textarea v-model="form.message" id="message" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({ name: '', email: '', message: '' });

function submitContactForm() {
  fetch('/api/contact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form.value)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      alert('Message sent successfully');
      form.value = { name: '', email: '', message: '' };
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send message');
    });
}
</script>

<style scoped>
.contact {
  max-width: 600px;
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
input, textarea {
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