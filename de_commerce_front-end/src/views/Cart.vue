
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="loading">Loading cart...</div>
    <div v-else-if="cart && cart.items && cart.items.length">
      <ul>
        <li v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-main">
            <strong>{{ item.product.name }}</strong>
            <span class="item-category">Category: {{ item.product.category?.name || 'Uncategorized' }}</span>
            <span class="item-quantity">Quantity: {{ item.quantity }}</span>
            <span class="item-price">Price: {{ formatPrice(item.product.price) }}</span>
          </div>
          <div class="item-actions">
            <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
          </div>
        </li>
      </ul>
      <div class="cart-options">
        <div class="payment-method">
          <label>Payment Method:</label>
          <select v-model="paymentMethod">
            <option value="card">Card</option>
            <option value="mpesa">Mpesa</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div class="promo-code">
          <label>Promo Code:</label>
          <input v-model="promoCode" placeholder="Enter promo code" />
          <button @click="applyPromo" class="promo-btn">Apply</button>
          <span v-if="promoApplied" class="promo-success">Promo applied!</span>
          <span v-else-if="promoCode && !promoApplied" class="promo-error">Invalid code</span>
        </div>
      </div>
      <!-- Add checkout button here -->
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchCart } from '../services/cart';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const cart = ref(null);
const loading = ref(true);
const cartStore = useCartStore();
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
const paymentMethod = ref('card');
const promoCode = ref('');
const promoApplied = ref(false);
const discount = ref(0);

function formatPrice(price) {
  if (price == null) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function removeItem(itemId) {
  if (!cart.value) return;
  cart.value.items = cart.value.items.filter(item => item.id !== itemId);
}

function applyPromo() {
  // Example: 'SAVE10' gives $10 off
  if (promoCode.value === 'SAVE10') {
    discount.value = 10;
    promoApplied.value = true;
  } else {
    discount.value = 0;
    promoApplied.value = false;
  }
}

onMounted(async () => {
  // Always load local cart from localStorage for instant UI
  cartStore.load();

  if (isAuthenticated.value) {
    try {
      const response = await fetchCart();
      cart.value = Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
      // If backend cart fetch fails, fall back to local cart store
      cart.value = { items: cartStore.items.map(i => ({ id: i.product.id, product: i.product, quantity: i.quantity })) };
    } finally {
      loading.value = false;
    }
  } else {
    // Unauthenticated users see local cart only
    cart.value = { items: cartStore.items.map(i => ({ id: i.product.id, product: i.product, quantity: i.quantity })) };
    loading.value = false;
  }
});
</script>

<style scoped>
:root  {
  --text-color: #92140c;
  --extra-color: #fff8f0;
  --paragraph-color: #fff8f0;
  --background-color: #1e1e24;
}

.cart {
  max-width: 800px;
  margin: 2rem auto;
  background: var(--extra-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}
.item-main {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.item-category, .item-quantity, .item-price {
  font-size: 0.95rem;
  color: var(--paragraph-color);
}
.item-actions {
  display: flex;
  align-items: center;
}
.remove-btn {
  margin-left: 1rem;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.remove-btn:hover {
  background: #b30000;
}
.cart-options {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
}
.payment-method label, .promo-code label {
  font-weight: 600;
  color: var(--text-color);
  margin-right: 0.5rem;
}
.payment-method select {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--text-color);
  font-size: 1rem;
}
.promo-code input {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--text-color);
  font-size: 1rem;
  margin-right: 0.5rem;
}
.promo-btn {
  background: var(--text-color);
  color: var(--background-color);
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.promo-btn:hover {
  background: #d4a608;
}
.promo-success {
  color: #82ff86;
  font-weight: 600;
  margin-left: 0.5rem;
}
</style>
