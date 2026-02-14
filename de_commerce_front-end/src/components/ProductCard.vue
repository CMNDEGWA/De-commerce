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
          <span class="product-category">{{ product.category || 'Uncategorized' }}</span>
        </div>
        <div class="product-info-right">
          <span class="product-price">{{ formatPrice(product.price) }}</span>
        </div>
      </div>
    </div>
    <div class="product-actions">
      <button v-if="isAuthenticated" class="add-to-cart" @click="toggleCart">
        {{ inCart ? 'Remove from Cart' : 'Add to Cart' }}
      </button>
    </div>
    <div class="view-details-wrapper">
      <router-link :to="`/products/${product.id}`" class="details-link">View Details</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  product: Object
});
import placeholderImg from '../assets/img/WheatBran.jpg';
const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));
const inCart = ref(false);

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function toggleCart() {
  inCart.value = !inCart.value;
  // Here you would call addToCart/removeFromCart API
}
</script>

<style scoped>
:root {
  --text-color: #eeba0b;
  --extra-color: #198754;
  --paragraph-color: #f0f0f0;
  --background-color: #062726;
  --card-width: 700px;
  --card-height: 420px;
  --card-padding: 2.5rem;
  --card-radius: 18px;
  --card-shadow: 0 0 40px 10px rgba(82, 255, 134, 0.7);
  --card-gap: 2rem;
  --image-height: 220px;
  --action-gap: 1.5rem;
}

.product-card {
  background: var(--background-color);
  color: var(--paragraph-color);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  width: var(--card-width);
  height: var(--card-height);
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
}

.image-container {
  width: 100%;
  height: var(--image-height);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--card-gap);
  overflow: hidden;
  border-radius: 12px;
  background: var(--background-color);
}

.product-image {
  width: 100%;
  height: 100%;
  min-height: 120px;
  max-height: var(--image-height);
  object-fit: contain;
  border-radius: 12px;
  background: var(--background-color);
  display: block;
}
.placeholder-image {
  opacity: 0.5;
  filter: grayscale(80%);
}

.product-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: var(--action-gap);
}

.product-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.product-info-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}
.product-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  line-height: 1.2;
}
.product-category {
  font-size: 1rem;
  color: var(--paragraph-color);
  font-weight: 500;
  background: var(--background-color);
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  margin-top: 0.2rem;
  display: inline-block;
  transition: background 0.7s ease, color 0.7s ease;
  border-bottom: 1.4px solid var(--text-color);
}
.product-category:hover {
  background: var(--text-color);
  color: var(--background-color);
}
.product-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 90px;
}
.product-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #eeba0b;
  margin-bottom: 0.5rem;
}

.product-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}
.add-to-cart {
  background: var(--text-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.add-to-cart:hover {
  background: #146c43;
}



.back-btn {
  background: none;
  border: none;
  color: var(--extra-color);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.back-btn:hover {
  color: var(--text-color);
}

.details-link {
  background: var(--text-color);
  color: var(--background-color);
  padding: 0.7rem 1.7rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(238, 186, 11, 0.13);
  transition: background 0.2s;
  border: none;
  outline: none;
  display: inline-block;
}
.details-link:hover {
  background: #b88a00;
  color: #fff;
}

@media (max-width: 900px) {
  .product-card {
    width: 95vw;
    min-width: 0;
    max-width: 100vw;
    height: auto;
    padding: 1.2rem;
  }
  .view-details-wrapper {
    right: 1.2rem;
    width: calc(100% - 2.4rem);
  }
}
</style>
