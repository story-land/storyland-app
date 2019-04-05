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

const getStateBook = book =>
  http.get(`/users/books/${book}`).then(response => response.data);

const createStateBook = (book, state) =>
  http
    .post(`/users/books/${book}?state=${state}`)
    .then(response => response.data);

export default {
  getPendingBooks,
  getReadBooks,
  getStateBook,
  createStateBook
};
