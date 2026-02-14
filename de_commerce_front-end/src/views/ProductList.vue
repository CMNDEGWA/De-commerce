<template>
  <div class="container">
    <div class="product-list">
      <h2 class="list-title">Jirani Merchant Products</h2>
      
      <div class="category-dropdown-filter">
        <label class="filter-label">Filter by Category:</label>
        <select v-model="selectedCategory" class="category-dropdown">
          <option :value="null">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
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
/* Consistency with ProductDetails and Login theme */
.product-list {
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  
  padding: 2rem;
  min-height: 100vh;
}

.list-title {
  color: var(--text-color);
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(238, 186, 11, 0.3);
}

.category-dropdown-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 4rem;
}

.filter-label {
  color: var(--extra-color);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-dropdown {
  font-size: 1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  background-color: var(--background-color);
  color: var(--paragraph-color);
  border: 1.5px solid var(--extra-color);
  font-weight: 600;
  min-width: 240px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(25, 135, 84, 0.2);
}

.category-dropdown:focus {
  border-color: var(--text-color);
  box-shadow: 0 0 10px rgba(238, 186, 11, 0.4);
}

.products-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem 3vw;
  justify-items: center;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .products-columns {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .list-title {
    font-size: 1.8rem;
  }
}
</style>