
# De-commerce Backend

> **This repository contains the back-end part of the De-commerce project.**


## Overview
De-commerce (Back-end) is a Django-based backend for a modern e-commerce platform. It provides robust product, cart, and order management, user authentication, and a RESTful API for integration with any frontend.


## Features
- Product and category management
- User registration, login, logout, and profile
- Cart and order management
- Order status tracking
- Django admin for all models
- REST API endpoints for all major resources
- Secure, production-ready settings


## Project Structure

```
de_commerce/
├── db.sqlite3
├── manage.py
├── de_commerce/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── products/
	├── __init__.py
	├── admin.py
	├── api.py
	├── apps.py
	├── forms.py
	├── models.py
	├── serializers.py
	├── tests.py
	├── urls.py
	├── views.py
	├── migrations/
	├── static/
	└── templates/
```

## Setup (Back-end)
1. Clone the repository and navigate to the project directory.
2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set environment variables for production:
   - `DJANGO_SECRET_KEY` (required)
   - `DJANGO_DEBUG` (default: True)
   - `DJANGO_ALLOWED_HOSTS` (comma-separated)
5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
7. Start the development server:
   ```bash
   python manage.py runserver
   ```


## API Endpoints

All API endpoints are under `/api/`:

- `GET /api/categories/` — List categories
- `GET /api/products/` — List products
- `GET/POST /api/carts/` — User's cart (auth required)
- `GET/POST /api/orders/` — User's orders (auth required)

Authentication is required for cart and order endpoints.


## Security
- Uses Django’s authentication and password validation
- CSRF protection enabled
- Sensitive settings loaded from environment variables


## Testing
Run all tests with:
```bash
python manage.py test products
```


## Deployment
- Set all environment variables for production
- Use a production-ready database and web server (e.g., Gunicorn + Nginx)
- Collect static files:
	```bash
	python manage.py collectstatic
	```


## License
MIT
# An E-Commerce Website Using Django

## Project Structure


## The Django Application