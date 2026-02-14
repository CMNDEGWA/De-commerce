<template>
  <div class="container">
      <div class="product-list">
    <h2>Jirani Merchant Products</h2>
    <!-- Dynamic Category Dropdown Filter -->
    <div class="category-dropdown-filter">
      <select v-model="selectedCategory" class="category-dropdown">
        <option :value="null">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>
    <div class="products-columns">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { fetchProducts, fetchCategories } from '../services/products';

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref(null);

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter(p => p.category && p.category.id === selectedCategory.value);
});

onMounted(async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
    if (Array.isArray(prodRes.data)) {
      products.value = prodRes.data;
    } else if (Array.isArray(prodRes.data.results)) {
      products.value = prodRes.data.results;
    } else {
      products.value = [];
    }
    if (Array.isArray(catRes.data)) {
      categories.value = catRes.data;
    } else if (Array.isArray(catRes.data.results)) {
      categories.value = catRes.data.results;
    } else {
      categories.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch products or categories:', error);
    products.value = [];
    categories.value = [];
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

.category-dropdown-filter {
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;
  border: none;
  color: var(--background-color);
}

.category-dropdown {
  font-size: 1.1rem;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-weight: 600;
  min-width: 200px;
  cursor: pointer;
}

h2 {
  color: var(--text-color);
  text-align: center;
  margin-top: 1rem;
}

h3 {
  color: var(--paragraph-color);
  text-align: center;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.products-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem 10vw; /* huge whitespace between columns and rows */
  margin: 5rem 0 0 0;
  justify-content: center;
  border: none;
  align-items: start;
}

@media (max-width: 900px) {
  .products-columns {
    grid-template-columns: 1fr;
    gap: 5rem 0;
  }
}
</style>
