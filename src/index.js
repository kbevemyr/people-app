import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Main from "./Main";
import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <HashRouter>
    <Main />
  </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
