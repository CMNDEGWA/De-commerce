import api from './api';

export function fetchOrders() {
  return api.get('/orders/');
}

export function fetchOrder(orderId) {
  return api.get(`/orders/${orderId}/`);
}
