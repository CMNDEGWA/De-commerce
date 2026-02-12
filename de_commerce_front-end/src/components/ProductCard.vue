<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h3>{{ product.name }}</h3>
    <p>{{ formatPrice(product.price) }}</p>
    <router-link :to="`/products/${product.id}`">View Details</router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object
});
function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}
</script>

<style scoped>
:root  {
    --text-color: #eeba0b;
    --extra-color: #198754;
}

.product-card {
  background: var(--extra-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1rem;
  text-align: center;
}
.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
