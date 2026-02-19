/**
 * Products Service Module
 *
 * This module provides functions to fetch product and category data from the API.
 * All functions return axios promises that resolve with product/category data.
 * 
 * These endpoints do NOT require authentication - all users can browse products and categories.
 * Products are displayed on ProductList, ProductDetail, ProductCard, and Home pages.
 */

import api from './api';

/**
 * Fetch All Categories
 * 
 * API: GET /api/categories/
 * Access: NO LOGIN REQUIRED (AllowAny)
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: [{id, name, description}, ...]}
 * @rejects {AxiosError} Network or server error
 * 
 * Response Data Structure:
 * {
 *   data: [
 *     { id: 1, name: "Electronics", description: "..." },
 *     { id: 2, name: "Clothing", description: "..." },
 *     ...
 *   ]
 * }
 * 
 * Usage:
 * try {
 *   const response = await fetchCategories();
 *   const categories = response.data;
 *   // Display in dropdown filter
 * } catch (error) {
 *   console.error('Failed to fetch categories:', error);
 * }
 * 
 * Frontend Integration:
 * - ProductList.vue: Fetches categories on mount for filter dropdown
 * - Displayed in category filter selector
 * - User can filter products by category
 */
export function fetchCategories() {
  return api.get('categories/');
}

/**
 * Fetch All Products
 * 
 * API: GET /api/products/
 * Access: NO LOGIN REQUIRED (AllowAny)
 * 
 * Returns all available products with full details including nested category information.
 * Unauthenticated visitors can browse products; only authenticated users can purchase.
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: [{id, name, description, price, category, image}, ...]}
 * @rejects {AxiosError} Network or server error
 * 
 * Response Data Structure:
 * {
 *   data: [
 *     {
 *       id: 1,
 *       name: "Product Name",
 *       description: "Product description",
 *       price: 29.99,
 *       category: { id: 1, name: "Electronics", description: "..." },
 *       image: "http://api.com/media/product_images/product.jpg"
 *     },
 *     ...
 *   ]
 * }
 * 
 * Usage:
 * try {
 *   const response = await fetchProducts();
 *   const products = response.data;
 *   // Filter by selected category if needed
 *   const filtered = selectedCategory 
 *     ? products.filter(p => p.category.id === selectedCategory)
 *     : products;
 *   // Display in grid
 * } catch (error) {
 *   console.error('Failed to fetch products:', error);
 * }
 * 
 * Frontend Integration:
 * - ProductList.vue: Fetches all products on mount
 * - Displays products in a grid with ProductCard components
 * - Products can be filtered by category
 * - Clicking product navigates to ProductDetail view
 * - Home.vue: Can also fetch products for featured section
 * 
 * Note: Category field is nested (full object), not just ID
 */
export function fetchProducts() {
  return api.get('products/');
}

/**
 * Fetch Single Product Details
 * 
 * API: GET /api/products/{id}/
 * Access: NO LOGIN REQUIRED (AllowAny)
 * 
 * Returns detailed information for a specific product by ID.
 * Used when user clicks on a product to view full details.
 * 
 * @param {number} id - Product ID
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: {id, name, description, price, category, image}}
 * @rejects {AxiosError} 404 if product not found, other errors on network failure
 * 
 * Response Data Structure:
 * {
 *   data: {
 *     id: 1,
 *     name: "Product Name",
 *     description: "Full product description...",
 *     price: 29.99,
 *     category: { id: 1, name: "Electronics", description: "..." },
 *     image: "http://api.com/media/product_images/product.jpg"
 *   }
 * }
 * 
 * Usage:
 * try {
 *   const response = await fetchProduct(productId);
 *   const product = response.data;
 *   // Display full product details
 *   // Show Add to Cart button (if authenticated)
 * } catch (error) {
 *   if (error.response?.status === 404) {
 *     console.error('Product not found');
 *   } else {
 *     console.error('Failed to fetch product:', error);
 *   }
 * }
 * 
 * Frontend Integration:
 * - ProductDetail.vue: Called on component mount with route.params.id
 * - Displays full product info: name, description, price, image, category
 * - If user authenticated, shows "Add to Cart" button
 * - Clicking back button navigates back to ProductList
 * - Product added to cart is stored in useCartStore (localStorage)
 */
export function fetchProduct(id) {
  return api.get(`products/${id}/`);
}
