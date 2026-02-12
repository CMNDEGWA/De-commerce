import api from './api';

export function fetchCart() {
  return api.get('/carts/');
}

export function addToCart(productId, quantity = 1) {
  return api.post('/carts/', { product: productId, quantity });
}

export function clearCart() {
  return api.delete('/carts/clear/');
}
