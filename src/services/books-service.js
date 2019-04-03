import http from './base-http-service';

const getAllBooks = () => http.get('/books').then(response => response.data);

const getSearchedBook = search =>
  http.post(`/books/${search}`).then(response => response.data);

const getOneBook = book =>
  http.get(`/books/${book}`).then(response => response.data);

export default {
  getAllBooks,
  getSearchedBook,
  getOneBook
};
