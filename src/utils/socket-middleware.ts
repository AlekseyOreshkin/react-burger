// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';
import { IWsActions, TSocketMiddlewareActions } from '../services/actions/socket-middleware';
import { AppDispatch, RootState } from './types';


export const socketMiddleware = (wsActions : IWsActions) : Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TSocketMiddlewareActions) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.wsStart) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
      }

      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch(wsActions.onOpen(event));
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch(wsActions.onError(event));
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          dispatch(wsActions.onMessage(event));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch(wsActions.onClose(event));
        };

        if (type === wsActions.wsSend) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};