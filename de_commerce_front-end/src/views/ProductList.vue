<template>
  <div class="container">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ul class="breadcrumb-list">
        <li><router-link to="/">Home</router-link></li>
        <li><span class="separator">/</span></li>
        <li class="active">
          {{ selectedCategoryName || 'All Products' }}
        </li>
      </ul>
    </nav>

    <div class="product-list">
      <header class="list-header">
        <h1 class="list-title">
          Explore {{ selectedCategoryName || 'Jirani Merchant' }} Products
        </h1>
        <p class="seo-description">
          Browse our high-quality collection of {{ selectedCategoryName?.toLowerCase() || 'merchant' }} items with real-time stock availability.
        </p>
      </header>
      
      <div class="category-dropdown-filter">
        <label class="filter-label" for="category-select">Filter by Category:</label>
        <select 
          id="category-select"
          v-model="selectedCategory" 
          class="category-dropdown"
        >
          <option :value="null">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="products-columns">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
          :show-quick-add="true"
          :show-rating="true"
          :show-availability="true"
        />
      </div>

      <div v-if="filteredProducts.length === 0" class="no-results">
        <p>No products found in this category.</p>
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

// Helper for Breadcrumbs and SEO Header
const selectedCategoryName = computed(() => {
  const cat = categories.value.find(c => c.id === selectedCategory.value);
  return cat ? cat.name : null;
});

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
    
    // Logic to handle different API response formats
    products.value = Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data.results || []);
    categories.value = Array.isArray(catRes.data) ? catRes.data : (catRes.data.results || []);
    
  } catch (error) {
    console.error('Failed to fetch data:', error);
    products.value = [];
    categories.value = [];
  }
});
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');


/* Theme Variables */
:root {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Breadcrumbs Styling */
.breadcrumb-nav {
  padding: 1.5rem 0 0 2rem;
}

.breadcrumb-list {
  font-family: "Jersey 10", sans-serif;
  list-style: none;
  display: flex;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: var(--paragraph-color);
}

.breadcrumb-list a {
  text-decoration: none;
  color: var(--extra-color);
  font-weight: 500;
}

.breadcrumb-list .active {
  font-weight: 600;
  color: var(--text-color);
}

/* Header & SEO Styling */
.list-header {
  text-align: center;
  margin-bottom: 2.8rem;
}

.list-title {
  font-family: "Jersey 10", sans-serif;
  color: var(--text-color);
  font-size: 4.2rem;
  font-weight: 800;
  margin: 1.4rem 0;
  text-shadow: 0 0 15px rgba(241, 80, 37, 0.12);
}

.seo-description {
  color: var(--paragraph-color);
  font-family: "Montserrat", sans-serif;
  letter-spacing: 1.4px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Filter Styling */
.category-dropdown-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 4rem;
}

.filter-label {
  color: var(--extra-color);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
}

.category-dropdown {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--extra-color);
  color: var(--background-color);
  min-width: 260px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.category-dropdown:focus {
  outline: none;
}

/* Responsive Grid */
.products-columns {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 5rem;
}

.no-results {
  text-align: center;
  padding: 5rem;
  font-size: 1.2rem;
  color: var(--extra-color);
}

@media (max-width: 768px) {
  .list-title {
    font-size: 1.8rem;
  }
  
  .products-columns {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}
</style>