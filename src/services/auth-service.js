import http from './base-http-service';

const login = user => http.post('/login', user).then(response => response.data);

const register = user =>
  http.post('/register', user).then(response => response.data);

const logout = () => http.post('/logout').then(response => response.data);

const updateProfile = user => {
  const data = new FormData();
  Object.keys(user).forEach(prop => {
    if (prop === 'password' && user.password === '') return;
    data.append(prop, user[prop]);
  });
  return http
    .put('/users/profile', data)
    .then(res => Promise.resolve(res.data));
};

export default {
  login,
  register,
  logout,
  updateProfile
};
