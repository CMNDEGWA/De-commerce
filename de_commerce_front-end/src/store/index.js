/**
 * Pinia Store Entry Point
 *
 * This module creates and exports the Pinia instance (store manager).
 * Pinia is a state management library for Vue 3 that replaces Vuex.
 * 
 * Global Store is created here and used in main.js to provide state
 * to all Vue components throughout the application.
 * 
 * Stores Managed by Pinia:
 * 1. auth.js (useAuthStore): Authentication state
 * 2. cart.js (useCartStore): Shopping cart state
 * 3. orders.js (useOrderStore): Orders state
 * 
 * Each store is a Pinia defineStore() instance registered globally
 */

import { createPinia } from 'pinia';

/**
 * createPinia(): Create Pinia instance
 * 
 * Function from 'pinia' library that creates the main store.
 * This instance enables reactive state management across components.
 * 
 * Features provided by Pinia:
 * - Reactive state (automatically updates components when changed)
 * - Actions (methods to modify state)
 * - Getters (computed-like properties)
 * - DevTools integration (for debugging)
 * - TypeScript support (optional)
 * 
 * The created store needs to be:
 * 1. Assigned to a variable (const store = createPinia())
 * 2. Exported for use in main.js
 * 3. Installed in Vue app via app.use(store)
 */
const store = createPinia();

/**
 * Export store instance
 * 
 * Used in main.js as: import store from './store'
 * Then installed: app.use(store)
 * 
 * After installation, all components can access stores:
 * - import { useAuthStore } from '@/store/auth'
 * - const auth = useAuthStore()  // Access auth store
 * 
 * - import { useCartStore } from '@/store/cart'
 * - const cart = useCartStore()  // Access cart store
 * 
 * - import { useOrderStore } from '@/store/orders'
 * - const orders = useOrderStore()  // Access orders store
 */
export default store;
