import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import { Provider, TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import './index.css';
import App from './components/app/app';
import { rootReducer } from './services/reducers';
import thunk, { ThunkAction } from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { TApplicationActions } from './services/actions';
import { socketMiddleware } from './utils/socket-middleware';
import { wsActions } from './services/actions/socket-middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

//export const useDispatch = () => dispatchHook<ThunkDispatch<RootState, never, TApplicationActions>>();
/* @ts-ignore*/
export const useDispatch = () => dispatchHook<AppThunk | AppDispatch>();


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
