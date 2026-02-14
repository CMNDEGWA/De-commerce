import api from './api';


export function loginUser(username, password) {
  return api.post('login/', { username, password });
}

export function registerUser(data) {
  return api.post('register/', data);
}

export function logoutUser() {
  return api.post('logout/');
}
