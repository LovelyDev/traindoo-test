import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { configureStore } from 'app/store';
import firebase from 'app/firebase';
import { App } from './app';

// prepare store
const history = createBrowserHistory();
const store = configureStore();

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
