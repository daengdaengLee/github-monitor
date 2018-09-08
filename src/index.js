import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import MainPage from './components/5-pages/main-page';
import 'antd/dist/antd.css';

injectGlobal`
  html, body, #root {
    min-height: 100%;
    height: 100%;
  }
`;

ReactDOM.render(<MainPage />, document.getElementById('root'));
