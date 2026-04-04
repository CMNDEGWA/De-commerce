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
 * CSRF Token Flow:
 * 1. Django backend sends csrftoken cookie with each response (set via CsrfViewMiddleware)
 * 2. Frontend axios interceptor reads csrftoken from cookies
 * 3. For POST/PUT/PATCH/DELETE requests, token added to X-CSRFToken header
 * 4. Django validates CSRF token on state-changing requests
 * 5. This prevents CSRF attacks while allowing cross-origin requests
 *
 * The axios instance is used by all other service modules (auth.js, products.js, etc)
 * to make HTTP requests to the Django REST API.
 */

import axios from 'axios';

// Default to /api/ for same-origin development, or use environment value if set.
// This avoids 404 errors when VITE_API_BASE_URL is missing in .env.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/';

const api = axios.create({
  baseURL,
  withCredentials: true // Enable cookies for session auth and CSRF protection
});

/**
 * Request Interceptor: Add CSRF Token to Headers
 * 
 * For every POST/PUT/PATCH/DELETE request, this interceptor:
 * 1. Reads the 'csrftoken' cookie set by Django
 * 2. Adds it to the 'X-CSRFToken' header
 * 3. Django's CsrfViewMiddleware validates this token
 * 
 * GET requests don't need CSRF token (they don't modify state)
 */
api.interceptors.request.use(
  (config) => {
    // Only add CSRF token for state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      // Extract CSRF token from cookies
      const csrftoken = getCsrfTokenFromCookies();
      
      if (csrftoken) {
        config.headers['X-CSRFToken'] = csrftoken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Extract CSRF Token from Cookies
 * 
 * Searches document.cookie for 'csrftoken' and returns its value.
 * Django sets this cookie via CsrfViewMiddleware on first request.
 * 
 * @returns {string} CSRF token value or empty string if not found
 */
function getCsrfTokenFromCookies() {
  const name = 'csrftoken';
  let csrftoken = '';
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if cookie name matches 'csrftoken'
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        // Extract and decode the cookie value
        csrftoken = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return csrftoken;
}

export default api;
