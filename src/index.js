import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css';
import { userActions } from './redux/actions';

store.dispatch(userActions.fetchUserData());

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

