import api from './api';

export function fetchOrder(orderId) {
  return api.get(`/orders/${orderId}/`);
}
