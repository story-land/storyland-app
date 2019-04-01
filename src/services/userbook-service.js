import http from './base-http-service';

const getPendingBooks = () =>
  http
    .get('/users/books', {
      params: {
        state: 'pending'
      }
    })
    .then(response => response.data);

const getReadBooks = () =>
  http
    .get('users/books', {
      params: {
        state: 'read'
      }
    })
    .then(response => response.data);

export default {
  getPendingBooks,
  getReadBooks
};
