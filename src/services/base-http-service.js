import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_baseURL,
  withCredentials: true
});

export default http;