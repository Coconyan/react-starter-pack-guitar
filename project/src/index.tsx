import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'));
