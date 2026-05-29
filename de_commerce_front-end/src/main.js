import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

const app = createApp(App);
app.use(router);
app.use(store);
import api from './services/api';
import { useAuthStore } from './store/auth';
import { useCartStore } from './store/cart';

// App bootstrap: fetch /api/me/ to confirm session and sync profile/cart
async function bootstrap() {
	try {
		const response = await api.get('me/');
		const data = response.data;
		const auth = useAuthStore();
		const cart = useCartStore();

		if (data.authenticated) {
			auth.login();
			// sync cart items from server into frontend store
			if (data.cart && Array.isArray(data.cart.items)) {
				cart.items = data.cart.items.map(i => ({ product: i.product, quantity: i.quantity }));
				cart.save();
			}
		} else {
			// anonymous: if server returned session cart, sync it
			if (data.cart && data.cart.items && data.cart.items.length) {
				cart.items = data.cart.items.map(i => ({ product: i.product, quantity: i.quantity }));
				cart.save();
			}
		}
	} catch (err) {
		// ignore bootstrap errors; app will still run (e.g., backend down)
		console.warn('Bootstrap /api/me/ failed', err?.response?.status || err.message);
	}

	app.mount('#app');
}

bootstrap();
