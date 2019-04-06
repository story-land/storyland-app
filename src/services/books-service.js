import http from './base-http-service';

const getAllBooks = () => http.get('/books').then(response => response.data);

const getRelatedBooks = genres =>
  http.get(`/books?genres=${genres}`).then(response => response.data);

const getBestRatedBooks = rating =>
  http.get(`/books?rating=${rating}`).then(response => response.data);

const getLatestBooks = year =>
  http.get(`/books?year=${year}`).then(response => response.data);

const getSearchedBook = search =>
  http.post(`/books/${search}`).then(response => response.data);

const getOneBook = book =>
  http.get(`/books/${book}`).then(response => response.data);

export default {
  getAllBooks,
  getRelatedBooks,
  getBestRatedBooks,
  getLatestBooks,
  getSearchedBook,
  getOneBook
};
