
<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';
</script>



<style>
main {
  min-height: 80vh;
  padding: 2rem 0;
}
</style>
