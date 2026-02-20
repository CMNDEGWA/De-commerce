<template>
  <!-- Product Display Card Component -->
  <!-- Shows product image, name, category, price, and link to details -->
  <div class="product-card">
    <!-- Product Image Container -->
    <div class="image-container">
      <!-- Display Product Image if Available -->
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="product-image"
      />
      <!-- Fallback Placeholder Image if No Product Image -->
      <img
        v-else
        :src="placeholderImg"
        alt="No image available"
        class="product-image placeholder-image"
      />
    </div>

    <!-- Product Information Section -->
    <div class="product-content">
      <div class="product-row">
        <!-- Product Details on Left: Name and Category -->
        <div class="product-info-left">
          <h3 class="product-title">{{ product.name }}</h3>
          <!-- Display Category Name - handles nested category objects -->
          <span class="product-category">
            {{ product.category?.name || product.category || 'Uncategorized' }}
          </span>
        </div>
        <!-- Product Price on Right -->
        <div class="product-info-right">
          <span class="product-price">{{ formatPrice(product.price) }}</span>
        </div>
      </div>
    </div>
    
    <!-- Product Action Footer -->
    <div class="product-footer">
      <div class="product-actions">
          <!-- Add to cart button removed; only available in ProductDetail -->
      </div>
      <!-- Link to Full Product Details Page -->
      <div class="view-details-wrapper">
        <!-- router-link navigates to ProductDetail page with product ID -->
        <!-- :to dynamically sets route based on product.id -->
        <router-link :to="`/products/${product.id}`" class="details-link">
          View Details &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * ProductCard Component
 * 
 * Displays a product in card format for grid layouts.
 * Used by ProductList.vue to show all products.
 * Shows product preview with image, name, category, and price.
 * 
 * Props:
 * - product: Object {id, name, description, price, category, image}
 * 
 * Features:
 * - Handles missing images with placeholder
 * - Links to ProductDetail for full product view
 * - Formats price as currency
 * - Responsive grid layout
 * 
 * Click Flow:
 * User clicks "View Details" → ProductDetail.vue loaded with product ID → 
 * ProductDetail fetches product details → Shows "Add to Cart" button if authenticated
 */

import { ref } from 'vue';
import placeholderImg from '../assets/img/WheatBran.jpg';

/**
 * Props: Component inputs
 * - product: Product object to display {id, name, description, price, category, image}
 */
const props = defineProps({
  product: Object
});

const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));
const inCart = ref(false);

/**
 * formatPrice(): Convert number to USD currency format
 * @param {number} price - Price value
 * @returns {string} Formatted price like "$99.99"
 * 
 * Uses Intl.NumberFormat for locale-aware formatting
 * Shows currency symbol and 2 decimal places
 */
function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

/**
 * toggleCart(): Toggle cart button state
 * Currently unused - add to cart only on ProductDetail page
 */
function toggleCart() {
  inCart.value = !inCart.value;
}
</script>

<style scoped>
.product-card {
  /* Theme Variables */
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
  --glow-color: rgba(241, 80, 37, 0.10);

  background: var(--background-color);
  color: var(--paragraph-color);
  border-radius: 18px;
  /* Balanced glow to match ProductList grid */
  box-shadow: 0 0 25px 5px var(--glow-color);
  width: 100%;
  max-width: 400px; /* Adjusted from 700px for better grid fit */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(241, 80, 37, 0.06);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 40px 10px rgba(241, 80, 37, 0.16);
}

.image-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-content {
  margin-bottom: 1.5rem;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 1.2;
}

.product-category {
  font-size: 0.85rem;
  color: var(--paragraph-color);
  font-weight: 500;
  margin-top: 0.4rem;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 1.5px solid var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.details-link {
  color: var(--text-color);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.details-link:hover {
  color: #fff;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .product-card {
    padding: 1.5rem;
  }
}
</style>


<style scoped>
.product-card {
  /* Theme Variables */
  --text-color: #92140c;
  --extra-color: #fff8f0;
  --paragraph-color: #fff8f0;
  --background-color: #1e1e24;
  --glow-color: rgba(146, 20, 12, 0.10);

  background: var(--background-color);
  color: var(--paragraph-color);
  border-radius: 18px;
  /* Balanced glow to match ProductList grid */
  box-shadow: 0 0 25px 5px var(--glow-color);
  width: 100%;
  max-width: 400px; /* Adjusted from 700px for better grid fit */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(146, 20, 12, 0.06);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 40px 10px rgba(146, 20, 12, 0.16);
}

.image-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-content {
  margin-bottom: 1.5rem;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 1.2;
}

.product-category {
  font-size: 0.85rem;
  color: var(--paragraph-color);
  font-weight: 500;
  margin-top: 0.4rem;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 1.5px solid var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.add-to-cart-btn {
  background: var(--extra-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #8b0000;
}

.details-link {
  color: var(--text-color);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.details-link:hover {
  color: #fff;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .product-card {
    padding: 1.5rem;
  }
}
</style>