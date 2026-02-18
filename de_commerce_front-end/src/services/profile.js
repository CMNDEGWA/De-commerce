/**
 * Profile Service Module
 *
 * This module provides functions to fetch user profile information.
 * Currently only fetchProfile() function, which may not be fully implemented
 * in the backend.
 * 
 * Frontend Profile Management:
 * - User data (username, email) stored in localStorage
 * - Profile information retrieved from local storage, not API
 * - Orders from useOrderStore (localStorage)
 */

import api from './api';

/**
 * Fetch User Profile
 * 
 * API: GET /api/profile/
 * Access: REQUIRES LOGIN (IsAuthenticated)
 * 
 * Returns authenticated user's profile information.
 * Note: This endpoint may not be implemented in the current backend.
 * Frontend Profile.vue instead retrieves profile data from localStorage.
 * 
 * @returns {Promise} Axios promise
 * @resolves {Object} {data: {id, username, email, created_at, ...}}
 * @rejects {AxiosError} 401 Unauthorized if not logged in, 404 if endpoint not found
 * 
 * Expected Response Structure (if implemented):
 * {
 *   data: {
 *     id: 2,
 *     username: "john_doe",
 *     email: "john@example.com",
 *     created_at: "2024-01-10T08:00:00Z",
 *     first_name: "John",
 *     last_name: "Doe",
 *     ...
 *   }
 * }
 * 
 * Usage:
 * try {
 *   const response = await fetchProfile();
 *   const profile = response.data;
 *   console.log(`Welcome, ${profile.username}!`);
 * } catch (error) {
 *   if (error.response?.status === 401) {
 *     console.error('Must login to view profile');
 *   } else if (error.response?.status === 404) {
 *     console.error('Profile endpoint not implemented');
 *   }
 * }
 * 
 * Frontend Integration:
 * - Profile.vue: May attempt to call this (currently uses localStorage instead)
 * - Displays user information in profile page
 * - Shows user's orders below profile info
 * - Allows logout from profile page
 * 
 * Current Implementation Notes:
 * - Backend endpoint may not be implemented
 * - Frontend currently stores data in localStorage:
 *   - username
 *   - email
 *   - created_at
 *   - profilePic
 * - User information persists across sessions via localStorage
 * - Orders retrieved from useOrderStore (also localStorage-based)
 * 
 * Security:
 * - User can only access their own profile
 * - Backend would return only authenticated user's data
 */
export function fetchProfile() {
  return api.get('api/profile/');
}
