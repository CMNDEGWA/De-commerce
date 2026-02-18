# De-Commerce Project - API & Authentication Guide

**Last Updated:** February 18, 2026

---

## Project Overview

This is a full-stack e-commerce application with:
- **Backend:** Django REST Framework (DRF) with session-based authentication
- **Frontend:** Vue.js 3 with Pinia state management
- **Database:** SQLite
- **Authentication:** Django Sessions + Browser Cookies

---

## API Endpoints Summary

### Authentication (NO LOGIN REQUIRED)

| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| POST | `/api/register/` | User registration/sign-up | AllowAny |
| POST | `/api/login/` | User authentication | AllowAny |

**Notes:**
- Register endpoint creates new user with password hashing
- Login endpoint creates session cookie (httponly)
- Logout handled via clearing localStorage (server session remains valid)

---

### Products & Categories (NO LOGIN REQUIRED)

| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| GET | `/api/categories/` | List all categories | AllowAny |
| GET | `/api/categories/{id}/` | Get category details | AllowAny |
| GET | `/api/products/` | List all products | AllowAny |
| GET | `/api/products/{id}/` | Get product details | AllowAny |

**Notes:**
- Unauthenticated visitors can browse products and categories
- All users see the same product inventory
- Product details include nested category information
- Images served from `product_images/` directory

---

### Shopping Cart (REQUIRES LOGIN)

| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| GET | `/api/carts/` | Get current user's cart | IsAuthenticated |
| POST | `/api/carts/` | Add item to cart | IsAuthenticated |
| DELETE | `/api/carts/clear/` | Clear all cart items | IsAuthenticated |

**Security:**
- Users can ONLY access their own cart (filtered in `CartViewSet.get_queryset()`)
- Even if user knows another user's cart ID, the backend filters to authenticated user only
- `Cart` model: OneToOne relationship with User (one cart per user)

**Frontend State Management:**
- Cart items also tracked locally in `useCartStore` (localStorage)
- Local store synced to backend when processing checkout
- Updates are instant (no waiting for API response)

---

### Orders (REQUIRES LOGIN)

| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| GET | `/api/orders/` | List user's orders | IsAuthenticated |
| GET | `/api/orders/{id}/` | Get order details | IsAuthenticated |
| POST | `/api/orders/` | Create new order | IsAuthenticated |
| PUT | `/api/orders/{id}/` | Update entire order | IsAuthenticated |
| PATCH | `/api/orders/{id}/` | Update order status | IsAuthenticated |
| DELETE | `/api/orders/{id}/` | Delete order | IsAuthenticated |

**Security:**
- Users can ONLY view/edit their own orders
- Backend filters via `OrderViewSet.get_queryset()` 
- Order status progression: pending → shipped → delivered (or cancelled)

**Order Data:**
- Captures product snapshot + price at time of order
- Preserves historical accuracy (shows what customer paid, not current price)
- Includes shipping address, phone number, and payment method

---

## Authentication Flow

### User Registration
1. User fills out registration form (Register.vue)
2. Frontend calls `POST /api/register/` with username, email, password
3. Backend validates data via RegisterSerializer
4. If valid: User created with hashed password
5. Frontend redirects to Login page
6. User must login to access protected features

### User Login
1. User enters credentials (Login.vue)
2. Frontend calls `POST /api/login/` with username and password
3. Backend authenticates via Django's `authenticate()` function
4. Django creates session cookie (httponly, secure)
5. Frontend stores `isAuthenticated` flag in localStorage
6. **Critical:** All subsequent API calls include session cookie automatically (via `withCredentials: true`)
7. Protected routes (cart, orders) become accessible

### Session Persistence
- Session cookie stored server-side after login
- Cookie included with all requests (axios configured with `withCredentials: true`)
- Session persists across page reloads unless explicitly logged out
- CORS configured to allow credentials from `http://localhost:5173`

### User Logout
1. User clicks Logout (Navbar.vue)
2. Frontend attempts `POST /api/logout/` (may not be implemented)
3. Frontend clears `isAuthenticated` from localStorage
4. Frontend clears Pinia auth store
5. Router redirects to `/login`
6. Session cookie still exists server-side but becomes unused
7. Subsequent requests to protected endpoints get 401 Unauthorized

---

## Frontend State Management (Pinia Stores)

### useAuthStore - Authentication State
**Location:** `src/store/auth.js`

**State:**
- `isAuthenticated: boolean` - True if user logged in

**Actions:**
- `login()` - Set authenticated state, save to localStorage
- `logout()` - Clear authenticated state, remove from localStorage
- `sync()` - Refresh state from localStorage (cross-tab sync)

**Used By:**
- Navbar.vue: Shows/hides authenticated user links
- ProductDetail.vue: Shows "Add to Cart" only for authenticated users
- Route guards: Restricts access to protected routes
- Any component checking user status

### useCartStore - Shopping Cart State
**Location:** `src/store/cart.js`

**State:**
- `items: array` - [{product: {...}, quantity: number}, ...]

**Actions:**
- `add(product, quantity)` - Add item or increase quantity
- `remove(productId)` - Remove all units of product
- `clear()` - Empty entire cart
- `save()` - Persist to localStorage
- `load()` - Restore from localStorage

**Used By:**
- ProductDetail.vue: "Add to Cart" button calls `add()`
- Cart.vue: Display items and totals
- Checkout.vue: Shows summary before order
- cart.js service: Backend sync

### useOrderStore - Orders State
**Location:** `src/store/orders.js`

**State:**
- `orders: array` - [{id, product, status, created_at}, ...]

**Actions:**
- `addOrder(product, status)` - Create new order with timestamp ID
- `updateStatus(orderId, newStatus)` - Change order status
- `save()` - Persist to localStorage
- `load()` - Restore from localStorage

**Used By:**
- Profile.vue: Display user's orders
- OrderHistory.vue: List all orders
- OrderDetail.vue: Show order details

---

## Key Models & Relationships

### User Model
- Django built-in User model
- Foreign key for Cart (OneToOne)
- Foreign key for Order (OneToMany)

### Product Model
- `name`: Product name
- `description`: Full product details
- `price`: Decimal field for cost
- `category`: ForeignKey to Category
- `image`: ImageField for product photos

### Category Model
- `name`: Category name (unique)
- `description`: Category details

### Cart Model
- `user`: OneToOneField to User
- `created_at`: Timestamp (auto_now_add)
- Relations:
  - `items`: Reverse ForeignKey from CartItem

### CartItem Model
- `cart`: ForeignKey to Cart
- `product`: ForeignKey to Product
- `quantity`: Positive integer

### Order Model
- `user`: ForeignKey to User
- `status`: Choice field (pending, shipped, delivered, cancelled)
- `created_at`: Timestamp (auto_now_add)
- `updated_at`: Timestamp (auto_now)
- `shipping_address`: Text
- `phone_number`: String
- `payment_method`: Choice (Credit Card, PayPal)
- Relations:
  - `items`: Reverse ForeignKey from OrderItem

### OrderItem Model
- `order`: ForeignKey to Order
- `product`: ForeignKey to Product
- `quantity`: Positive integer
- `price`: Decimal (price at time of order, not current)

---

## File Structure Comments Summary

### Backend Files (Django)
1. **db.sqlite3** - SQLite database with all models
2. **settings.py** - Django configuration, CORS settings, REST_FRAMEWORK config
3. **urls.py** - Main URL dispatcher, includes products app URLs
4. **products/models.py** - Database models with detailed docstrings
5. **products/serializers.py** - DRF serializers with nested relationships
6. **products/views.py** - RegisterAPIView, LoginAPIView for authentication
7. **products/api.py** - ViewSets for Category, Product, Cart, Order with permissions
8. **products/urls.py** - API endpoint registration with DefaultRouter
9. **products/admin.py** - Django admin interface configuration
10. **products/forms.py** - Django forms for cart and order

### Frontend Files (Vue.js)
1. **main.js** - Vue app initialization, store setup
2. **App.vue** - Root component with Navbar, router-view, Footer
3. **router/index.js** - Vue Router configuration with all routes
4. **services/api.js** - Axios instance with credentials enabled
5. **services/auth.js** - Login, register, logout functions
6. **services/products.js** - Fetch categories and products
7. **services/cart.js** - Cart CRUD operations
8. **services/order.js** - Order history and detail fetching
9. **services/profile.js** - User profile fetching
10. **store/auth.js** - Authentication state (Pinia)
11. **store/cart.js** - Cart state (Pinia)
12. **store/orders.js** - Orders state (Pinia)
13. **components/Navbar.vue** - Navigation with auth-aware links
14. **components/ProductCard.vue** - Product display card
15. **components/Footer.vue** - Footer with links and newsletter
16. **views/Home.vue** - Landing page with features
17. **views/Login.vue** - Login form
18. **views/Register.vue** - Registration form
19. **views/ProductList.vue** - Product grid with filtering
20. **views/ProductDetail.vue** - Product details with Add to Cart
21. **views/Cart.vue** - Shopping cart review
22. **views/Checkout.vue** - Order placement form
23. **views/OrderHistory.vue** - List of user orders
24. **views/OrderDetail.vue** - Order details and items
25. **views/Profile.vue** - User profile and orders

---

## CORS Configuration

**Configured in backend settings.py:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True
```

**Why Needed:**
- Frontend runs on localhost:5173 (Vite dev server)
- Backend runs on localhost:8000 (Django)
- Different ports = cross-origin request
- CORS headers allow frontend to access backend
- `CORS_ALLOW_CREDENTIALS = True` allows session cookies

---

## Common Workflows

### Browse Products (No Login)
1. Visit home page (Home.vue)
2. Click "Products" in navbar
3. ProductList.vue fetches all products
4. Products displayed in grid with ProductCard
5. Click "View Details" on any product
6. ProductDetail.vue shows full product info
7. Only shows "Add to Cart" if authenticated

### Login & Shop
1. Click "Login" in navbar
2. Enter credentials on Login.vue
3. loginUser() POSTs to `/api/login/`
4. Session cookie created
5. auth.login() called, sets isAuthenticated
6. Navbar now shows Cart and Orders links
7. ProductDetail now shows "Add to Cart" button

### Add to Cart & Checkout
1. On ProductDetail, click "Add to Cart"
2. cart.add(product) updates local state
3. Item persists in localStorage
4. User can view cart (Cart.vue)
5. User clicks checkout
6. Checkout.vue shows order summary
7. POST order to `/api/orders/`
8. Order created in backend
9. Redirect to OrderHistory

### View Orders
1. Click "Orders" in navbar
2. OrderHistory.vue fetches from `/api/orders/`
3. User sees all their orders
4. Click order to view details
5. OrderDetail.vue shows items and status

---

## Security Considerations

1. **Session Cookies**: Django creates httponly session cookies (not accessible via JavaScript)
2. **CSRF Protection**: DRF handles CSRF tokens via session authentication
3. **User Filtering**: All queries filtered to current user (carts, orders)
4. **Password Hashing**: Django automatically hashes passwords using PBKDF2
5. **Permissions**: Backend enforces IsAuthenticated on protected endpoints
6. **CORS**: Restricted to specific origins (localhost:5173)

---

## Testing Endpoints

### Register New User
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password1":"secure123","password2":"secure123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"testuser","password":"secure123"}'
```

### Get Products
```bash
curl http://localhost:8000/api/products/
```

### Get User's Orders (with session cookie)
```bash
curl -b cookies.txt http://localhost:8000/api/orders/
```

---

## Development Server Setup

### Backend (Django)
```bash
cd de_commerce
python manage.py migrate
python manage.py runserver
# Backend runs on http://localhost:8000
```

### Frontend (Vite + Vue)
```bash
cd de_commerce_front-end
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Environment Configuration

### Backend (settings.py)
- `DJANGO_SECRET_KEY`: Secret key for Django
- `DJANGO_DEBUG`: True for development, False for production
- `DJANGO_ALLOWED_HOSTS`: Comma-separated list of allowed hosts

### Frontend (.env)
- `VITE_API_BASE_URL=http://127.0.0.1:8000/api`

---

## Conclusion

This project demonstrates a complete full-stack e-commerce application with:
- Proper separation of concerns (backend/frontend)
- Advanced state management (Pinia)
- Secure authentication (session-based)
- RESTful API design with permissions
- Responsive UI components
- Comprehensive data persistence (localStorage + database)

All files include detailed comments explaining function purposes, API access requirements, and data flow.

