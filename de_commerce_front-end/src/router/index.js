import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';

import OrderHistory from '../views/OrderHistory.vue';
import OrderDetail from '../views/OrderDetail.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/orders', name: 'OrderHistory', component: OrderHistory },
  { path: '/orders/:id', name: 'OrderDetail', component: OrderDetail, props: true },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to redirect authenticated users
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.name === 'Home' && auth.isAuthenticated) {
    next({ name: 'Profile' });
  } else {
    next();
  }
});

export default router;
