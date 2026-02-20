
<template>
  <div class="product-detail" v-if="product">
    <div class="detail-header">
      <button class="back-btn" @click="$router.back()">&larr; Back</button>
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
        </div>
        <p class="product-description">{{ product.description }}</p>
        <div class="add-to-cart-btn-wrapper">
          <button class="add-to-cart-btn" @click="toggleCart">
            {{ inCart ? 'Remove from Cart' : 'Add to Cart' }}
          </button>
          <router-link to="/cart" class="go-to-cart-link">Go to Cart &rarr;</router-link>
        </div>
          <div class="detail-info-right">
            <span class="product-price">{{ formatPrice(product.price) }}</span>
          </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProduct } from '../services/products';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { useOrderStore } from '../store/orders';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const cart = useCartStore();
const orders = useOrderStore();
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

const inCart = computed(() => {
  return cart.items.some(i => i.product.id === product.value?.id);
});

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function toggleCart() {
  if (!product.value) return;
  if (inCart.value) {
    cart.remove(product.value.id);
    orders.addOrder(product.value, 'pending');
  } else {
    cart.add(product.value, 1);
  }
}

onMounted(async () => {
  try {
    const response = await fetchProduct(route.params.id);
    product.value = response.data;
    cart.load();
    orders.load();
  } catch (error) {
    product.value = null;
  }
});
</script>

<style scoped>
.add-to-cart-btn-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
}

:root  {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
}

.product-detail {
  max-width: 700px;
  margin: 4rem auto 2rem auto;
  background: var(--background-color);
  color: var(--paragraph-color) ;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 0 40px 10px rgba(241, 80, 37, 0.08);
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

.add-to-cart-btn {
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
  background: var(--background-color);
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
  background: var(--background-color);
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
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 1.08rem;
  color: var(--paragraph-color);
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
