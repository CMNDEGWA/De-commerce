/**
 * Cart Service Module
 *
 * This module provides functions to manage the user's shopping cart.
 * All cart operations REQUIRE LOGIN - unauthenticated users get 401 errors.
 * 
 * Backend vs Frontend State:
 * - Frontend: useCartStore maintains local cart state in localStorage
 * - Backend: Cart model tracks database records for checkout/order creation
 * - Frontend adds items locally; backend syncs items when processing checkout
 * 
 * Note on API:
 * The API endpoints (/carts/, addToCart) may not be fully implemented in the
 * current backend. Frontend cart management primarily uses local state (useCartStore).
 */

import api from './api';

/**
 * Fetch User's Shopping Cart
 * 
 * API: GET /api/carts/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * 
 * Returns the authenticated user's shopping cart with all items.
 * Only returns current user's cart due to get_queryset() filter in CartViewSet.
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: {id, user, created_at, items: [{product, quantity}, ...]}}
 * @rejects {AxiosError} 401 Unauthorized if not logged in
 * 
 * Response Data Structure:
 * {
 *   data: {
 *     id: 5,
 *     user: 1,
 *     created_at: "2024-01-15T10:30:00Z",
 *     items: [
 *       {
 *         id: 12,
 *         product: {
 *           id: 3,
 *           name: "Product",
 *           description: "...",
 *           price: 19.99,
 *           category: {...},
 *           image: "..."
 *         },
 *         quantity: 2
 *       },
 *       ...
 *     ]
 *   }
 * }
 * 
 * Usage:
 * try {
 *   const response = await fetchCart();
 *   const cart = response.data;
 *   // Display cart items and calculate total
 * } catch (error) {
 *   if (error.response?.status === 401) {
 *     console.error('Must login to view cart');
 *   }
 * }
 * 
 * Frontend Integration:
 * - Cart.vue: Calls this on component mount to load user's cart
 * - Shows cart items, quantities, prices
 * - Allows removing items and applying promo codes
 * 
 * Security:
 * - User can ONLY view their own cart (filtered in backend)
 * - Even if user ID guessed, backend filters to authenticated user
 */
export function fetchCart() {
  return api.get('carts/');
}

/**
 * Add Item to Cart
 * 
 * API: POST /api/carts/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * 
 * Adds a product to the user's shopping cart or increases quantity if already present.
 * The user is automatically set to the current authenticated user on backend.
 * 
 * @param {number} productId - ID of product to add
 * @param {number} [quantity=1] - Number of units to add (default: 1)
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: {id, product, quantity, ...}}
 * @rejects {AxiosError} 400 Bad Request if data invalid, 401 if not logged in
 * 
 * Request Payload:
 * {
 *   product: 3,
 *   quantity: 2
 * }
 * 
 * Response Data Structure:
 * {
 *   data: {
 *     id: 13,
 *     product: {id: 3, name: "Product", price: 19.99, ...},
 *     quantity: 2
 *   }
 * }
 * 
 * Usage:
 * try {
 *   const response = await addToCart(productId, 2);
 *   console.log('Added to cart successfully');
 *   // Update local cart store
 * } catch (error) {
 *   if (error.response?.status === 401) {
 *     console.error('Must login to add to cart');
 *   }
 * }
 * 
 * Frontend Integration:
 * - ProductDetail.vue: "Add to Cart" button calls this
 * - useCartStore.add() locally updates cart state
 * - Database syncs when order is placed during checkout
 * 
 * Note:
 * Frontend primarily uses local cart store (useCartStore with localStorage)
 * for managing cart items. API calls are secondary for data persistence.
 */
export function addToCart(productId, quantity = 1) {
  return api.post('carts/', { product: productId, quantity });
}

/**
 * Clear User's Cart
 * 
 * API: DELETE /api/carts/clear/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * 
 * Removes all items from the user's shopping cart.
 * Note: This endpoint may not be implemented in current backend.
 * Frontend clears cart locally via useCartStore.clear().
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {success: true, message: "Cart cleared."}
 * @rejects {AxiosError} 401 if not logged in
 * 
 * Usage:
 * try {
 *   await clearCart();
 *   console.log('Cart cleared');
 *   // Clear local store
 * } catch (error) {
 *   console.error('Failed to clear cart:', error);
 * }
 * 
 * Frontend Integration:
 * - Could be called from Cart.vue "Clear Cart" button
 * - Currently cart clearing is handled by useCartStore.clear() (localStorage)
 * 
 * Note:
 * Not currently used as frontend manages cart locally.
 * Would be useful for syncing backend before checkout.
 */
export function clearCart() {
  return api.delete('carts/clear/');
}
