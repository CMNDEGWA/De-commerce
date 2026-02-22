
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="loading">Loading cart...</div>
    <div v-else-if="cart && cart.items && cart.items.length">
      <ul>
        <li v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-main">
            <strong>{{ item.product.name }}</strong>
            <span class="item-category"> <em>Category: </em> {{ item.product.category?.name || 'Uncategorized' }}</span>
            <span class="item-quantity"><em>Quantity:</em> {{ item.quantity }}</span>
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
          <select class="select" v-model="paymentMethod">
            <option class="card" value="card">Card</option>
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

@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');


:root  {
  --text-color: #191919;
  --extra-color: #f15025;
  --paragraph-color: #191919;
  --background-color: #fcfffc;
}

.cart {
  max-width: 1000px;
  margin: 2rem auto;
  background: var(--background-color);
  padding: 2rem;
  border-radius: 0;
  border: 1.4px solid var(--paragraph-color);
}

.cart h2 {
  font-family: "Jersey 10", sans-serif;
  color: var(--text-color);
  font-size: 2rem;
  margin: 0 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--extra-color);
  margin: 1.4rem 0;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-main strong {
  color: var(--text-color);
  font-size: 1.4rem;
  font-family: "Montserrat", sans-serif;
  padding: 0.7rem;
}

.item-category, .item-quantity {
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  color: var(--paragraph-color);
}

.item-main .item-category em {
  padding: 0.3rem 0.7rem;
}

.item-main .item-quantity em {
  padding: 0.3rem 0.7rem;
}

.item-main .item-price {
  font-family: "Jersey 10", sans-serif;
  font-size: 1.45rem;
  color: var(--text-color);
  margin: 1.4rem 1rem;
  letter-spacing: 1px;
}

.item-actions {
  display: flex;
  align-items: center;
  border-radius: 0;
}

.remove-btn {
  margin-left: 1rem;
  background-color: var(--extra-color);
  color: var(--text-color);
  font-family: "Jersey 10", sans-serif;
  border: none;
  border-radius: 0;
  padding: 0.5rem 1.8rem;
  font-size: 1.2rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.7s;
}

.remove-btn:hover {
  background: var(--background-color);
  border: 1.4px solid var(--text-color);
  color: var(--extra-color);
}

.cart-options {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 3.6rem 2.1rem;
}

.payment-method label, .promo-code label {
  font-family: "Jersey 10", sans-serif;
  font-size: 1.3rem;
  letter-spacing: 1px;
  color: var(--text-color);
  margin-right: 0.7rem;
}

.payment-method .select {
  font-family: "Jersey 10", sans-serif;
  padding: 0.4rem 1rem;
  border-radius: 0;
  border: 1px solid var(--extra-color);
  font-size: 1.1rem;
  letter-spacing: 1.4px;
  background-color: var(--background-color);
}

.promo-code input {
  font-family: "Jersey 10", sans-serif;
  padding: 0.4rem 1rem;
  border-radius: 0;
  border: 1px solid var(--text-color);
  font-size: 1.1rem;
  margin-right: 0.5rem;
  background-color: var(--background-color);
  transition: all 0.7s ease;
}

.promo-btn {
  background: var(--extra-color);
  color: var(--text-color);
  letter-spacing: 1.4px;
  font-family: "Jersey 10", sans-serif;
  border: none;
  border-radius: 0;
  padding: 0.4rem 1rem;
  margin-left: 1.4rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.7s;
}

.promo-btn:hover {
  background: var(--background-color);
  color: var(--extra-color);
  border-left: 1.4px solid var(--text-color);
}

.promo-success {
  color: var(--extra-color);
  font-family: "Jersey 10", sans-serif;
  letter-spacing: 1.4px;
  margin-left: 0.5rem;
}

</style>
