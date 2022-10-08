import { IBasicAction } from "../../utils/types";

export const WS_CONNECTION_START : 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

interface IWsAction<T, P = unknown> extends IBasicAction<T>
{
    payload: P;
} 

type TWsConnectionStartAction = IWsAction<typeof WS_CONNECTION_START>;
type TWsConnectionSuccessAction = IWsAction<typeof WS_CONNECTION_SUCCESS>;
type TWsConnectionErrorAction = IWsAction<typeof WS_CONNECTION_ERROR>;
type TWsConnectionClosedAction = IWsAction<typeof WS_CONNECTION_CLOSED>;
type TWsGetMessageAction = IWsAction<typeof WS_GET_MESSAGE>;
type TWsSendMessageAction = IWsAction<typeof WS_SEND_MESSAGE>;

export type TSocketMiddlewareActions = TWsConnectionStartAction | TWsConnectionSuccessAction
    | TWsConnectionErrorAction | TWsConnectionClosedAction | TWsGetMessageAction | TWsSendMessageAction;