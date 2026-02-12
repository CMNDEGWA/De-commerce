
<template>
  <div class="profile">
    <h2>User Profile</h2>
    <div v-if="loading">Loading profile...</div>
    <div v-else-if="profile">
      <p><strong>Username:</strong> {{ profile.username }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <!-- Add more profile fields as needed -->
    </div>
    <div v-else>
      <p>Profile not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchProfile } from '../services/profile';

const profile = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetchProfile();
    profile.value = response.data;
  } catch (error) {
    profile.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
