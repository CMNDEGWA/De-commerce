/**
 * Authentication Service Module
 *
 * This module provides functions for user authentication operations.
 * All functions return axios promises that can be awaited or .then'd.
 * 
 * API Authentication Flow:
 * 1. registerUser(): Create new account
 * 2. loginUser(): Authenticate and create session
 * 3. logoutUser(): Destroy session
 * 4. After login, session cookie automatically sent with all requests (withCredentials: true)
 * 5. Protected endpoints verify session is valid
 */

import api from './api';

/**
 * Register New User
 * 
 * API: POST /api/register/
 * Access: NO LOGIN REQUIRED (AllowAny)
 * 
 * @param {Object} data - Registration data object
 * @param {string} data.username - Desired username (must be unique)
 * @param {string} data.email - User's email (must be unique)
 * @param {string} data.password1 - Password (must match password2)
 * @param {string} data.password2 - Password confirmation
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {success: true, message: "User registered successfully."}
 * @rejects {AxiosError} {success: false, errors: {field: [error messages]}}
 * 
 * Usage Example:
 * try {
 *   const response = await registerUser({
 *     username: 'john_doe',
 *     email: 'john@example.com',
 *     password1: 'secure_pass123',
 *     password2: 'secure_pass123'
 *   });
 *   console.log('Registered successfully');
 * } catch (error) {
 *   console.error('Registration failed:', error.response.data.errors);
 * }
 * 
 * Frontend Integration: Called from Register.vue handleRegister() function
 * Validation Errors Possible:
 * - Passwords do not match
 * - Username already exists
 * - Email already exists
 * - Email invalid format
 */
export function registerUser(data) {
  return api.post('register/', data);
}

/**
 * Login User - Authenticate credentials
 * 
 * API: POST /api/login/
 * Access: NO LOGIN REQUIRED (AllowAny)
 * 
 * @param {string} username - User's username
 * @param {string} password - User's password (plain text)
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {success: true, message: "Login successful."}
 *           - Also creates httponly session cookie automatically
 * @rejects {AxiosError} {success: false, message: "Invalid credentials."}
 * 
 * Session Creation:
 * - Django creates sessionid cookie on successful login
 * - Cookie automatically included in all future requests (withCredentials: true)
 * - Session persists across page reloads until logout
 * - Backend validates session on protected endpoints
 * 
 * Usage Example:
 * try {
 *   const response = await loginUser('john_doe', 'secure_pass123');
 *   // Session cookie automatically created
 *   // Frontend auth store sets isAuthenticated = true
 *   // Redirect to home page
 * } catch (error) {
 *   if (error.response.status === 401) {
 *     console.error('Invalid username or password');
 *   }
 * }
 * 
 * Frontend Integration: Called from Login.vue handleLogin() function
 * Stores authentication state in localStorage and Pinia auth store
 * On success, regenerates CSRF token for POST requests
 */
export function loginUser(username, password) {
  return api.post('login/', { username, password });
}

/**
 * Logout User - Destroy session
 * 
 * API: POST /logout/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * Note: API endpoint may not be implemented in current backend
 * Frontend handles logout via localStorage.removeItem('isAuthenticated')
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {success: true, message: "Logout successful."}
 * @rejects {AxiosError} If user not authenticated
 * 
 * Logout Flow:
 * 1. Server destroys session (if endpoint implemented)
 * 2. Frontend clears 'isAuthenticated' from localStorage
 * 3. Frontend clears auth store via useAuthStore.logout()
 * 4. Router redirects to /login page
 * 5. Session cookie becomes invalid on server
 * 6. Subsequent API calls to protected endpoints return 401
 * 
 * Frontend Integration: Called from Navbar.vue logout() function
 * After logout, users cannot access protected routes or endpoints
 */
export function logoutUser() {
  return api.post('logout/');
}
