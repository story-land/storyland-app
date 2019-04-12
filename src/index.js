import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'antd/dist/antd.css';
import 'react-slick/dist/react-slick';
import './scss/style.scss';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './utils/ScrollToTop';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <AuthStore>
        <App />
      </AuthStore>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
