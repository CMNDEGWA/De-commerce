
<template>
  <div class="product-detail" v-if="product">
    <img v-if="product.image" :src="product.image" :alt="product.name" class="product-image" />
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p><strong>Category:</strong> {{ product.category?.name }}</p>
    <p><strong>Price:</strong> {{ formatPrice(product.price) }}</p>
    <!-- Add to cart button can go here -->
  </div>
  <div v-else>
    <p>Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProduct } from '../services/products';

const route = useRoute();
const product = ref(null);

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

onMounted(async () => {
  try {
    const response = await fetchProduct(route.params.id);
    product.value = response.data;
  } catch (error) {
    product.value = null;
  }
});
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}
</style>
