import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'antd/dist/antd.css';
import 'react-slick/dist/react-slick';
import './scss/style.scss';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
