
<template>
  <div class="product-detail" v-if="product">
    <div class="detail-header">
      <button class="back-btn" @click="$router.back()">&larr; Back</button>
      <span v-if="isAuthenticated" class="add-to-cart-btn" @click="toggleCart">
        {{ inCart ? 'Remove from Cart' : 'Add to Cart' }}
      </span>
    </div>
    <div class="detail-main">
      <div class="detail-image-container">
        <img v-if="product.image" :src="product.image" :alt="product.name" class="product-image" />
      </div>
      <div class="detail-info">
        <div class="detail-row">
          <div class="detail-info-left">
            <h2 class="product-title">{{ product.name }}</h2>
            <span class="product-category">{{ product.category?.name || 'Uncategorized' }}</span>
          </div>
          <div class="detail-info-right">
            <span class="product-price">{{ formatPrice(product.price) }}</span>
          </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProduct } from '../services/products';

const route = useRoute();
const router = useRouter();
const product = ref(null);
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
  max-width: 700px;
  margin: 4rem auto 2rem auto;
  background: #fff;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  position: relative;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}
.back-btn {
  background: none;
  border: none;
  color: #198754;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #f7f7f7;
}
.add-to-cart-btn {
  background: #198754;
  color: #fff;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.add-to-cart-btn:hover {
  background: #146c43;
}
.detail-main {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
}
.detail-image-container {
  flex: 0 0 240px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 12px;
  min-height: 220px;
  max-height: 260px;
  overflow: hidden;
}
.product-image {
  width: 100%;
  max-width: 220px;
  height: 220px;
  object-fit: contain;
  border-radius: 12px;
  background: #f7f7f7;
}
.detail-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.detail-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
.detail-info-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}
.product-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  line-height: 1.2;
}
.product-category {
  font-size: 1rem;
  color: #888;
  font-weight: 500;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  margin-top: 0.2rem;
  display: inline-block;
}
.detail-info-right {
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
.product-description {
  font-size: 1.08rem;
  color: #444;
  margin-top: 0.5rem;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .product-detail {
    padding: 1.2rem;
  }
  .detail-main {
    flex-direction: column;
    gap: 1.5rem;
  }
  .detail-image-container {
    min-height: 160px;
    max-height: 180px;
  }
  .product-image {
    max-width: 100%;
    height: 160px;
  }
}
</style>
