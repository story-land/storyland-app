import http from './base-http-service';

const getProfileBooks = state =>
  http
    .get('/users/books', {
      params: {
        state: state
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
  getProfileBooks,
  getStateBook,
  createStateBook
};
