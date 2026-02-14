import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
  }),
  actions: {
    addOrder(product, status = 'pending') {
      this.orders.push({
        id: Date.now(),
        product,
        status,
        created_at: new Date().toISOString(),
      });
      this.save();
    },
    updateStatus(orderId, status) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) order.status = status;
      this.save();
    },
    save() {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    },
    load() {
      this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
    }
  },
});
