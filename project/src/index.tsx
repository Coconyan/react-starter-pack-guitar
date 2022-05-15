import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { store } from './store';
import { fetchGuitarsAction } from './store/api-actions';

store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));