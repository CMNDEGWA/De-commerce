<template>
  <div class="product-card">
    <div class="image-container">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="product-image"
      />
      <img
        v-else
        :src="placeholderImg"
        alt="No image available"
        class="product-image placeholder-image"
      />
    </div>
    <div class="product-content">
      <div class="product-row">
        <div class="product-info-left">
          <h3 class="product-title">{{ product.name }}</h3>
          <span class="product-category">
            {{ product.category?.name || product.category || 'Uncategorized' }}
          </span>
        </div>
        <div class="product-info-right">
          <span class="product-price">{{ formatPrice(product.price) }}</span>
        </div>
      </div>
    </div>
    
    <div class="product-footer">
      <div class="product-actions">
          <!-- Add to cart button removed; only available in ProductDetail -->
      </div>
      <div class="view-details-wrapper">
        <router-link :to="`/products/${product.id}`" class="details-link">
          View Details &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import placeholderImg from '../assets/img/WheatBran.jpg';

const props = defineProps({
  product: Object
});

const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));
const inCart = ref(false);

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function toggleCart() {
  inCart.value = !inCart.value;
}
</script>

<style scoped>
.product-card {
  /* Theme Variables */
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  --glow-color: rgba(82, 255, 134, 0.4);

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
  border: 1px solid rgba(82, 255, 134, 0.1);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.6);
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
  background: #146c43;
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