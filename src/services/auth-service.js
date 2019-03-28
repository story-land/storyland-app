import http from './base-http-service';

const login = user => http.post('/login', user).then(response => response.data);

const register = user =>
  http.post('/register', user.user).then(response => response.data);

const logout = () => http.post('/logout').then(response => response.data);

export default {
  login,
  register,
  logout
};
