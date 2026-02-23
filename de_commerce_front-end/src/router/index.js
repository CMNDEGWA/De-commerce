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
import ResetPassword from '../views/ResetPassword.vue';
import CookiePolicy from '../views/CookiePolicy.vue';
import TermsOfUse from '../views/TermsOfUse.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import Contact from '../views/Contact.vue';
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
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/cookie-policy', name: 'CookiePolicy', component: CookiePolicy },
  { path: '/terms-of-use', name: 'TermsOfUse', component: TermsOfUse },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/contact', name: 'Contact', component: Contact },
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
