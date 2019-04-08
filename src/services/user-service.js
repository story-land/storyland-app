import http from './base-http-service';

const getSocialUsers = id =>
  http.get(`/users/${id}/friends`).then(response => response.data);

const followUser = id =>
  http.post(`/users/${id}/follow`).then(response => response.data);

export default {
  getSocialUsers,
  followUser
};
