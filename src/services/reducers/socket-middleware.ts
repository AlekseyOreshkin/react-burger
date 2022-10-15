import { IFeedOrdersMessage } from "../../utils/types";
import { padOrderNumber } from "../../utils/utils";
import { TSocketMiddlewareActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/socket-middleware";

interface IWsState {
  wsConnected: boolean;
  data: IFeedOrdersMessage<string>;

  error?: Event;
};

export const initialWsState: IWsState = {
  wsConnected: false,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  }
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state = initialWsState, action: TSocketMiddlewareActions): IWsState => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE: {
      const message: IFeedOrdersMessage<number> = JSON.parse(action.payload);
      return {
        ...state,
        error: undefined,
        data: {
          ...message,
          orders: message.orders?.map(o => ({ ...o, number: padOrderNumber(o.number) })) ?? []
        }
      };
    }
    default:
      return state;
  }
}; 
