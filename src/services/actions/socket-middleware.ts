import { AppThunk, IBasicAction } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

interface IWsServiceAction<T, P = Event> extends IBasicAction<T> {
    payload: P;
}
interface ISendMessage {

}
interface IWsMessageAction<T, P> extends IBasicAction<T> {
    payload: P;
}

export const openWsConnection: AppThunk = (url: string, secured = false) =>
    dispatch => {
        let payload = url;
        if (secured) {
            const token = localStorage.getItem('token')?.split(' ')[1];
            payload += `?token=${token}`;
        }

        dispatch({ type: WS_CONNECTION_START, payload });
    }


type TWsConnectionStartAction = IWsServiceAction<typeof WS_CONNECTION_START, string>;
type TWsConnectionSuccessAction = IWsServiceAction<typeof WS_CONNECTION_SUCCESS>;
type TWsConnectionErrorAction = IWsServiceAction<typeof WS_CONNECTION_ERROR>;
type TWsConnectionClosedAction = IWsServiceAction<typeof WS_CONNECTION_CLOSED>;
type TWsGetMessageAction = IWsMessageAction<typeof WS_GET_MESSAGE, string>;
type TWsSendMessageAction = IWsMessageAction<typeof WS_SEND_MESSAGE, ISendMessage>;

export type TSocketMiddlewareActions = TWsConnectionStartAction | TWsConnectionSuccessAction
    | TWsConnectionErrorAction | TWsConnectionClosedAction | TWsGetMessageAction | TWsSendMessageAction;


type TWsActionCreator<TEvent = Event> = (event: TEvent) => TSocketMiddlewareActions;

export interface IWsActions
{
    wsStart: typeof WS_CONNECTION_START;
    wsSend: typeof WS_SEND_MESSAGE;
    onOpen: TWsActionCreator;
    onError: TWsActionCreator;
    onMessage: TWsActionCreator<MessageEvent<string>>;
    onClose: TWsActionCreator;
};

export const wsActions : IWsActions = {
    wsStart: WS_CONNECTION_START,
    wsSend: WS_SEND_MESSAGE,
    onOpen: (event) => ({ type: WS_CONNECTION_SUCCESS, payload: event }),
    onError: (event) => ({ type: WS_CONNECTION_ERROR, payload: event }),
    onMessage: (event) => {
        const { data } = event;
        return ({ type: WS_GET_MESSAGE, payload: data })
    },
    onClose: (event) => ({ type: WS_CONNECTION_CLOSED, payload: event }),
};

