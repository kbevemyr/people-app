import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router} from 'react-router-dom';
import Main from "./Main";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import thunkMiddleware from 'redux-thunk';
import { configSocket } from './WebSocketService';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  compose (applyMiddleware(logger, thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
/* eslint-enable */
configSocket(store);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
