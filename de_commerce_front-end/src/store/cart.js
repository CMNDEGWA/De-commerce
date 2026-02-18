/**
 * Shopping Cart Store Module (Pinia)
 *
 * This module manages the user's shopping cart using Pinia stores.
 * Cart state is persisted to localStorage for persistence across sessions.
 * 
 * Implementation Strategy:
 * - Frontend maintains local cart state (Pinia + localStorage)
 * - Products are added/removed locally for instant UI feedback
 * - Backend cart synced when user proceeds to checkout
 * - No real-time backend sync (reduces API calls)
 * 
 * Workflow:
 * 1. User adds product on ProductDetail.vue → useCartStore.add()
 * 2. Cart item added to local state immediately
 * 3. Quantity updated if product already in cart
 * 4. Data persisted to localStorage via save()
 * 5. On checkout, cart items converted to Order
 * 6. Cart cleared after successful order
 */

import { defineStore } from 'pinia';

/**
 * useCartStore: Shopping cart state store
 * 
 * State Properties:
 * - items: Array of cart items
 *   - Initial value: Loaded from localStorage or empty array
 *   - Each item has: {product: {...}, quantity: number}
 * 
 * Store ID: 'cart'
 * - Used to create store instance: const cart = useCartStore()
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    /**
     * items: Array of items currently in the shopping cart
     * 
     * Data Structure:
     * [
     *   {
     *     product: {id, name, description, price, category, image},
     *     quantity: 2
     *   },
     *   {
     *     product: {id, name, description, price, category, image},
     *     quantity: 1
     *   }
     * ]
     * 
     * Initialized from localStorage:
     * - On component mount, load() called to restore saved items
     * - Empty array if nothing in localStorage
     * 
     * Persisted via:
     * - save(): Called after every add/remove/clear operation
     * - Saves as JSON string in localStorage key 'cartItems'
     * 
     * Accessed by:
     * - Cart.vue: Displays all items for review
     * - Checkout.vue: Shows summary before order placement
     * - ProductDetail.vue: Checks if product already in cart
     * - Navbar.vue: Could show cart count badge
     */
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  }),
  
  actions: {
    /**
     * add(): Add product to cart or increase quantity
     * 
     * @param {Object} product - Product object {id, name, price, ...}
     * @param {number} [quantity=1] - Quantity to add (default 1)
     * 
     * Logic:
     * 1. Check if product already in cart by product.id
     * 2. If found: Increase quantity for existing item
     * 3. If not found: Push new item object {product, quantity}
     * 4. Call save() to persist to localStorage
     * 
     * Called by:
     * - ProductDetail.vue toggleCart() when user clicks "Add to Cart"
     * - Immediately updates UI (reactive)
     * - No backend API call (instant feedback)
     * 
     * Example:
     * const product = {id: 3, name: "Laptop", price: 999.99, ...};
     * cart.add(product, 1);
     * // Cart now has {product, quantity: 1}
     * 
     * cart.add(product, 1);
     * // Same product: {product, quantity: 2}
     */
    add(product, quantity = 1) {
      const idx = this.items.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        this.items[idx].quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.save();
    },

    /**
     * remove(): Delete item from cart by product ID
     * 
     * @param {number} productId - ID of product to remove
     * 
     * Logic:
     * 1. Filter items array to exclude product with matching ID
     * 2. Reassign filtered array to this.items
     * 3. Call save() to persist change
     * 
     * Called by:
     * - Cart.vue when user clicks "Remove" button on an item
     * - Removes entire item regardless of quantity
     * 
     * Example:
     * cart.remove(3);
     * // Item with product.id === 3 removed completely
     * // If quantity was 2, all 2 units removed
     */
    remove(productId) {
      this.items = this.items.filter(i => i.product.id !== productId);
      this.save();
    },

    /**
     * clear(): Remove all items from cart
     * 
     * Logic:
     * 1. Sets items to empty array []
     * 2. Call save() to persist empty cart
     * 
     * Called by:
     * - Checkout success: After order placed, clear cart for next purchase
     * - Cart.vue "Clear Cart" button
     * - Navbar logout: Could clear cart on logout
     * 
     * Example:
     * cart.clear();
     * // Items array now []
     * // localStorage cartItems now '[]'
     */
    clear() {
      this.items = [];
      this.save();
    },

    /**
     * save(): Persist cart to localStorage
     * 
     * Logic:
     * 1. Converts this.items array to JSON string
     * 2. Stores as localStorage['cartItems']
     * 3. Survives page reloads and browser closes
     * 
     * Called automatically by:
     * - add(): After adding item
     * - remove(): After removing item
     * - clear(): After clearing all items
     * 
     * Storage Format:
     * JSON string with compact format (no whitespace)
     * Example: [{"product":{...},"quantity":2},{"product":{...},"quantity":1}]
     * 
     * Accessible direct access:
     * JSON.parse(localStorage.getItem('cartItems'))
     */
    save() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    /**
     * load(): Restore cart from localStorage
     * 
     * Logic:
     * 1. Reads localStorage['cartItems']
     * 2. Parses JSON string to array
     * 3. Assigns to this.items
     * 4. Defaults to [] if localStorage key missing
     * 
     * Called by:
     * - ProductDetail.vue onMounted: Restore cart state when viewing product
     * - Cart.vue onMounted: Ensure latest cart loaded
     * - Any component needing current cart state
     * 
     * Use Case:
     * User has cart with 3 items, closes browser, reopens site
     * load() restores those 3 items automatically
     * 
     * Example:
     * cart.load();
     * console.log(cart.items); // [item1, item2, item3] (restored)
     */
    load() {
      this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
  },
});
