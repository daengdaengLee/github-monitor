import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { injectGlobal } from 'styled-components';
import store, { history } from './ducks';
import MainPage from './components/5-pages/main-page';
import 'antd/dist/antd.css';

injectGlobal`
  html, body, #root {
    min-height: 100%;
    height: 100%;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainPage />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
