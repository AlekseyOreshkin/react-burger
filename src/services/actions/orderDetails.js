import { requestOrder } from "../../utils/request";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED  = 'GET_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const getOrder = ingredients => {
    return (dispatch) => {
        dispatch({type: GET_ORDER_REQUEST});
        requestOrder(ingredients).then(({ name, number }) => {
            dispatch({type: GET_ORDER_SUCCESS, name, number});
        }).catch(() => {
            dispatch({type: GET_ORDER_FAILED});
        })
    }
};
