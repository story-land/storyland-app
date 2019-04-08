import http from './base-http-service';

const getUser = id =>
  http.get(`/users/${id}/profile`).then(response => response.data);

const getUsers = () => http.get(`/users/`).then(response => response.data);

const getSocialUsers = id =>
  http.get(`/users/${id}/friends`).then(response => response.data);

const followUser = id =>
  http.post(`/users/${id}/follow`).then(response => response.data);

const unfollowUser = id =>
  http.delete(`/users/${id}/follow`).then(response => response.data);

export default {
  getUser,
  getUsers,
  getSocialUsers,
  followUser,
  unfollowUser
};
