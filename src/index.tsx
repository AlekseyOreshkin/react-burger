import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import { preloadedState, rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter as Router} from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';



const store = configureStore({ 
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
 });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router >
      <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
