import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import Routes from './routes'

import AuthProvider from './context/Auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
