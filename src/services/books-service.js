import http from './base-http-service';

const getRegisterBooks = () =>
  http.get('/books/register').then(response => response.data);

const getAllBooks = () => http.get('/books').then(response => response.data);

const getRelatedBooks = genres => {
  if (genres.includes('&')) {
    genres = genres.replace('&', '@');
  }
  return http.get(`/books?genres=${genres}`).then(response => response.data);
};

const getBestRatedBooks = rating =>
  http.get(`/books?rating=${rating}`).then(response => response.data);

const getLatestBooks = year =>
  http.get(`/books?year=${year}`).then(response => response.data);

const getSearchedBook = search =>
  http.post(`/books/${search}`).then(response => response.data);

const getOneBook = book =>
  http.get(`/books/${book}`).then(response => response.data);

export default {
  getRegisterBooks,
  getAllBooks,
  getRelatedBooks,
  getBestRatedBooks,
  getLatestBooks,
  getSearchedBook,
  getOneBook
};
