/**
 * API Service Module - Axios Configuration
 *
 * This module creates and exports a configured axios instance that is used for all
 * API calls to the Django backend.
 *
 * Key Configuration:
 * - baseURL: Points to backend API root (from .env VITE_API_BASE_URL)
 * - withCredentials: true - Enables sending/receiving cookies (session authentication)
 *
 * The axios instance is used by all other service modules (auth.js, products.js, etc)
 * to make HTTP requests to the Django REST API.
 *
 * CORS and Cookie Flow:
 * 1. Backend configured to allow requests from http://localhost:5173
 * 2. Session cookie sent with POST /api/login/ response
 * 3. Cookie automatically included in subsequent requests (withCredentials: true)
 * 4. Backend authenticates user via session cookie on protected endpoints
 * 5. No additional headers needed - cookie-based auth is automatic
 */

import axios from 'axios';

// Default to /api/ for same-origin development, or use environment value if set.
// This avoids 404 errors when VITE_API_BASE_URL is missing in .env.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/';

const api = axios.create({
  baseURL,
  withCredentials: true // Enable if using session/cookie auth
});

export default api;
