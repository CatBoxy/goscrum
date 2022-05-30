import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store';

// Wrap App component in HashRouter for routing and Provider for Redux states
// Provider component provides Redux states to App
ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>,
  document.getElementById('root'),
);
