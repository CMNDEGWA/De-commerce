<template>
  <div class="product-list">
    <h2>All Products</h2>
    <div class="products-columns">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { fetchProducts } from '../services/products';

const products = ref([]);

onMounted(async () => {
  try {
    const response = await fetchProducts();
    if (Array.isArray(response.data)) {
      products.value = response.data;
    } else if (Array.isArray(response.data.results)) {
      products.value = response.data.results;
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    products.value = [];
  }
});
</script>

<style scoped>
:root  {
    --text-color: #eeba0b;
    --extra-color: #198754;
    --paragraph-color: #f0f0f0;
    --background-color: #062726;
}

h2 {
  color: var(--text-color);
  text-align: center;
  margin-top: 1rem;
}

.products-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem 10vw; /* huge whitespace between columns and rows */
  margin: 5rem 0 0 0;
  justify-content: center;
  align-items: start;
}

@media (max-width: 900px) {
  .products-columns {
    grid-template-columns: 1fr;
    gap: 5rem 0;
  }
}
</style>
