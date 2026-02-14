import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  }),
  actions: {
    add(product, quantity = 1) {
      const idx = this.items.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        this.items[idx].quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.save();
    },
    remove(productId) {
      this.items = this.items.filter(i => i.product.id !== productId);
      this.save();
    },
    clear() {
      this.items = [];
      this.save();
    },
    save() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },
    load() {
      this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
  },
});
