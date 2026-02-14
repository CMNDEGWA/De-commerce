export function fetchCategories() {
  return api.get('/categories/');
}
import api from './api';

export function fetchProducts() {
  return api.get('/products/');
}

export function fetchProduct(id) {
  return api.get(`/products/${id}/`);
}
