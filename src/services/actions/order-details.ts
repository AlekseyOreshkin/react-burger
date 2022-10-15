
import { requestOrder } from "../../utils/request";
import { AppDispatch, AppThunk, IBasicAction } from "../../utils/types";
import { CLEAR_CONSTRUCTOR } from "./constructor";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';

interface IOrderDetailsSuccessAction extends IBasicAction<typeof GET_ORDER_SUCCESS> {
    name: string;
    number: string;
}
interface IOrderDetailsAction extends IBasicAction<typeof GET_ORDER_REQUEST
    | typeof GET_ORDER_FAILED | typeof CLOSE_ORDER> { };

export type TOrderDetailsActions = IOrderDetailsAction | IOrderDetailsSuccessAction;

export const getOrder: AppThunk = (ingredients: string[]) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: GET_ORDER_REQUEST });
        requestOrder(ingredients).then(({ name, number }) => {
            dispatch({ type: GET_ORDER_SUCCESS, name, number });
            dispatch({ type: CLEAR_CONSTRUCTOR });
        }).catch(() => {
            dispatch({ type: GET_ORDER_FAILED });
        })
    }
};

