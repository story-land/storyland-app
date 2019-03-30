import http from './base-http-service';

const getAllBooks = () => http.get('/books').then(response => response.data);

const getOneBook = book =>
  http.get(`/books/${book}`).then(response => response.data);

export default {
  getAllBooks,
  getOneBook
};
