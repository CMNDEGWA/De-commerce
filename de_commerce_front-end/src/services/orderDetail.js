/**
 * Order Detail Service Module
 *
 * This module provides a function to fetch detailed information for a specific order.
 * This is a duplicate/alias of the fetchOrder function from order.js
 * Both services fetch the same endpoint: GET /api/orders/{orderId}/
 * 
 * The separation allows different view components to have their own service imports
 * if needed, though this represents code duplication that could be consolidated.
 */

import api from './api';

/**
 * Fetch Single Order Details
 * 
 * API: GET /api/orders/{orderId}/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * 
 * Returns detailed information for a specific order by ID,  including all items.
 * This function is identical to fetchOrder() in order.js
 * 
 * @param {number} orderId - ID of the order to retrieve
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: {id, user, created_at, status, items: [...], ...}}
 * @rejects {AxiosError} 401 if not logged in, 404 if order not found
 * 
 * Response Data Structure:
 * {
 *   data: {
 *     id: 1,
 *     user: 2,
 *     created_at: "2024-01-15T10:30:00Z",
 *     updated_at: "2024-01-20T14:45:00Z",
 *     shipping_address: "123 Main St, City, State 12345",
 *     phone_number: "555-0123",
 *     payment_method: "Credit Card",
 *     status: "shipped",
 *     items: [
 *       {
 *         id: 45,
 *         product: {id: 3, name: "Product", price: 999.99, ...},
 *         quantity: 1,
 *         price: 999.99
 *       },
 *       ...
 *     ]
 *   }
 * }
 * 
 * Order Status Values:
 * - 'pending': Order created, awaiting processing
 * - 'shipped': Order sent to customer
 * - 'delivered': Order received by customer
 * - 'cancelled': Order was cancelled
 * 
 * Key Feature:
 * - Items include 'price' field which is price at time of order
 * - Not current product price - ensures historical accuracy
 * - If product price changed after order, shows original paid price
 * 
 * Usage:
 * try {
 *   const response = await fetchOrder(orderId);
 *   const order = response.data;
 *   
 *   // Display order details
 *   console.log(`Order #${order.id} - Status: ${order.status}`);
 *   
 *   // Calculate total
 *   const total = order.items.reduce((sum, item) => {
 *     return sum + (item.price * item.quantity);
 *   }, 0);
 *   
 *   // Display items
 *   order.items.forEach(item => {
 *     console.log(`${item.product.name}: ${item.quantity} x $${item.price}`);
 *   });
 * } catch (error) {
 *   if (error.response?.status === 404) {
 *     console.error('Order not found');
 *   }
 * }
 * 
 * Frontend Integration:
 * - OrderDetail.vue: Imports and calls this to fetch order data
 * - Displays full order breakdown with all items
 * - Shows total items, prices, and order status
 * - Used as fallback if OrderHistory detail fetch fails
 * 
 * Security:
 * - Only authenticated users can access
 * - Backend filters to user's own orders
 * - User cannot access other users' order details
 * 
 * Code Quality Note:
 * This appears to duplicate functionality from order.js fetchOrder()
 * Both services are identical and could be consolidated
 * using a single import to reduce code duplication
 */
export function fetchOrder(orderId) {
  return api.get(`api/orders/${orderId}/`);
}
