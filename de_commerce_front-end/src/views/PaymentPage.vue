<template>
  <section class="payment-page">
    <div class="page-header">
      <h2>Payment for Order #{{ order && order.id ? order.id : id }}</h2>
      <p class="subtitle">Complete payment to confirm your order and start shipment.</p>
    </div>

    <div v-if="loading" class="loading-state">Loading order details...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else>
      <div class="order-summary">
        <div class="summary-header">
          <strong>Status:</strong>
          <span :class="['status-chip', order.status]">{{ statusLabel }}</span>
        </div>

        <div class="summary-row">
          <strong>Total:</strong>
          <span>{{ formatPrice(total) }}</span>
        </div>
        <div class="summary-row">
          <strong>Current method:</strong>
          <span>{{ order.payment_method || 'Not selected' }}</span>
        </div>
      </div>

      <div class="payment-actions">
        <h3>Select payment option</h3>
        <div class="payment-methods">
          <label v-for="method in paymentMethods" :key="method.value" class="payment-method">
            <input
              type="radio"
              :value="method.value"
              v-model="selectedMethod"
              :disabled="order.status !== 'ordered'"
            />
            <span>{{ method.label }}</span>
          </label>
        </div>

        <button
          class="primary-button"
          @click="startPayment"
          :disabled="order.status !== 'ordered' || paymentMessage"
        >
          Begin {{ selectedMethodLabel }} Payment
        </button>

        <button class="secondary-button" type="button" @click="refreshStatus">
          Refresh status
        </button>

        <p class="payment-hint">{{ paymentHint }}</p>
        <p v-if="paymentMessage" class="payment-message">{{ paymentMessage }}</p>
      </div>

      <div class="order-details">
        <h3>Order items</h3>
        <ul>
          <li v-for="item in order.items || []" :key="item.id" class="order-item">
            <span>{{ item.product_name || (item.product && item.product.name) || 'Item' }}</span>
            <span>{{ formatPrice(item.price || (item.product && item.product.price) || 0) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchOrder } from '../services/order';

const route = useRoute();
const id = route.params.id;
const order = ref(null);
const loading = ref(true);
const error = ref('');
const paymentMessage = ref('');
const selectedMethod = ref('mpesa');
let pollTimer = null;

const paymentMethods = [
  { value: 'mpesa', label: 'M-Pesa' },
  { value: 'card', label: 'Card' },
  { value: 'crypto', label: 'Crypto' },
];

const selectedMethodLabel = computed(() => {
  const method = paymentMethods.find((option) => option.value === selectedMethod.value);
  return method ? method.label : 'Payment';
});

const total = computed(() => {
  if (!order.value || !Array.isArray(order.value.items)) {
    return 0;
  }
  return order.value.items.reduce((sum, item) => sum + Number(item.price || item.product?.price || 0), 0);
});

const statusLabel = computed(() => {
  if (!order.value) return 'Unknown';
  if (order.value.status === 'ordered') return 'Awaiting payment';
  if (order.value.status === 'paid') return 'Paid';
  return order.value.status.charAt(0).toUpperCase() + order.value.status.slice(1);
});

const paymentHint = computed(() => {
  if (!order.value) return '';
  if (order.value.status === 'ordered') {
    return 'Select a payment option and begin payment. This page will poll for updates automatically.';
  }
  if (order.value.status === 'paid') {
    return 'Payment completed. Your order is now confirmed and will be processed for shipment.';
  }
  return 'Your current order status is up to date.';
});

async function loadOrder() {
  loading.value = true;
  error.value = '';
  try {
    const response = await fetchOrder(id);
    order.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.detail || err.message || 'Unable to load order details.';
  } finally {
    loading.value = false;
  }
}

function startPolling() {
  stopPolling();
  pollTimer = window.setInterval(async () => {
    if (!order.value || order.value.status !== 'ordered') {
      stopPolling();
      return;
    }
    await loadOrder();
  }, 5000);
}

function stopPolling() {
  if (pollTimer !== null) {
    window.clearInterval(pollTimer);
    pollTimer = null;
  }
}

function refreshStatus() {
  paymentMessage.value = '';
  loadOrder();
}

function startPayment() {
  if (!order.value || order.value.status !== 'ordered') {
    return;
  }
  paymentMessage.value = `Payment flow for ${selectedMethodLabel.value} is pending integration. Please complete the payment with your chosen provider, then refresh status.`;
}

onMounted(async () => {
  await loadOrder();
  if (order.value && order.value.status === 'ordered') {
    startPolling();
  }
});

onUnmounted(() => {
  stopPolling();
});
</script>

<style scoped>
.payment-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
}
.page-header {
  margin-bottom: 1.5rem;
}
.subtitle {
  color: #555;
}
.loading-state,
.error-state {
  padding: 1rem;
  border-radius: 8px;
  background: #fff5f5;
  color: #900;
}
.order-summary,
.payment-actions,
.order-details {
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fbfbfb;
}
.summary-header,
.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.status-chip {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.95rem;
}
.status-chip.ordered {
  background: #fef3c7;
  color: #92400e;
}
.status-chip.paid {
  background: #d1fae5;
  color: #065f46;
}
.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  cursor: pointer;
}
.payment-method input {
  accent-color: #2563eb;
}
.primary-button,
.secondary-button {
  border: none;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  margin-right: 0.75rem;
}
.primary-button {
  background: #2563eb;
  color: white;
}
.secondary-button {
  background: #f3f4f6;
  color: #111827;
}
.payment-hint,
.payment-message {
  margin-top: 1rem;
}
.order-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}
.order-item:last-child {
  border-bottom: none;
}
</style>
