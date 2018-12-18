import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './asserts/css/reset.css';

import { Provider } from 'react-redux';
// import rootSagas from '@/store/rootSagas'


// import createSagaMiddleware from 'redux-saga'

import store from './store';

// const store = configureStore();
// store.runSaga(rootSagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
