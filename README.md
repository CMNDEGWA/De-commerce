# De-commerce: Backend & Frontend Overview

This project is split into two main parts:

- **Backend:** Django (this directory)
- **Frontend:** Vue.js (see `de_commerce_front-end/`)

---

## Architecture Overview

De-commerce is a modern e-commerce platform with a clear separation between backend and frontend:

- **Backend (Django):**
  - Handles all business logic, data storage, authentication, and API endpoints.
  - Exposes a RESTful API (using Django REST Framework) for all product, cart, and order operations.
  - No longer serves any HTML or static front-end files; all user interface is handled by the frontend.

- **Frontend (Vue.js):**
  - Located in the `de_commerce_front-end/` directory.
  - Handles all user interface, routing, and state management using Vue 3, Vue Router, and Pinia.
  - Communicates with the Django backend exclusively via HTTP API calls (using Axios).

---

## Key Differences

| Aspect         | Django Backend                | Vue.js Frontend                |
| --------------| ----------------------------- | ------------------------------ |
| Role          | API, business logic, database | UI, routing, user experience   |
| Technology    | Django, DRF                   | Vue 3, Vite, Pinia, Vue Router |
| Serves HTML?  | No                            | Yes                            |
| Auth          | Session/cookie or token-based | Uses backend API for auth      |
| Static Files  | No (except admin)             | Yes (all UI assets)            |
| Communication | REST API (JSON)               | Axios HTTP requests            |

---

## How They Work Together

1. **Frontend (Vue.js)** is served separately (usually on a different port during development, e.g., 5173).
2. **User actions** (login, view products, add to cart, place order) trigger HTTP requests from the Vue app to the Django API (usually at http://localhost:8000/api/...).
3. **Django backend** processes the request, interacts with the database, and returns JSON responses.
4. **Vue frontend** updates the UI based on the API response.

**CORS** is configured on the backend to allow the frontend to communicate securely.

---

## Getting Started: Step-by-Step Guide

Follow these steps to set up and run the De-commerce project locally:

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone <your-repo-url>
cd De-commerce
```

### 2. Set Up the Backend (Django)
- Create and activate a Python virtual environment:
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```
- Install backend dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Set environment variables (create a `.env` file or export in your shell):
  - `DJANGO_SECRET_KEY` (required)
  - `DJANGO_DEBUG` (default: True)
  - `DJANGO_ALLOWED_HOSTS` (comma-separated)
- Run database migrations:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```
- Create a superuser for admin access:
  ```bash
  python manage.py createsuperuser
  ```
- Start the Django development server:
  ```bash
  python manage.py runserver
  ```
  The backend API will be available at http://localhost:8000/

### 3. Set Up the Frontend (Vue.js)
- Open a new terminal and navigate to the frontend directory:
  ```bash
  cd de_commerce_front-end
  ```
- Install frontend dependencies:
  ```bash
  npm install
  ```
- Start the Vue development server:
  ```bash
  npm run dev
  ```
  The frontend will be available at http://localhost:5173/

### 4. Using the Application
- Open http://localhost:5173 in your browser.
- Register a new user or log in with your superuser credentials.
- Browse products, add to cart, and place orders—all actions are handled by the Vue frontend and processed by the Django backend via API calls.

### 5. Notes
- Make sure both servers (backend and frontend) are running for full functionality.
- For production, configure environment variables securely and use production-ready servers (e.g., Gunicorn for Django, Nginx for static files).
- See the API Endpoints section below for available backend routes.

---

## API Endpoints (Backend)

All API endpoints are under `/api/`:

- `GET /api/categories/` — List categories
- `GET /api/products/` — List products
- `GET/POST /api/carts/` — User's cart (auth required)
- `GET/POST /api/orders/` — User's orders (auth required)

Authentication is required for cart and order endpoints. The frontend handles login and passes credentials (cookies or tokens) with each request.

---

## Security & Data Protection
- Authentication and permissions are enforced on the backend.
- No sensitive data is exposed in API responses.
- All secrets and keys are loaded from environment variables (never hardcoded).

---

## Summary

- The Django backend and Vue.js frontend are fully decoupled.
- All user interaction is handled by the Vue app, which communicates with the backend via REST API.
- No sensitive data or business logic is exposed on the frontend.

For more details, see the README in `de_commerce_front-end/` for frontend-specific setup and usage.

## License
MIT
