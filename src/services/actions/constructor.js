import { getOrderRequest } from "../../utils/request";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED  = 'GET_ORDER_FAILED';
export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';
export const SET_PRICE = 'SET_PRICE';

export const getOrder = ingredients => {
    return (dispatch) => {
        dispatch({type: GET_ORDER_REQUEST});
        getOrderRequest(ingredients).then(({ name, number }) => {
            dispatch({type: GET_ORDER_SUCCESS, name, number});
        }).catch(() => {
            dispatch({type: GET_ORDER_FAILED});
        })
    }
};

export const changeIngredients = (bun, items) => dispatch => dispatch({type: CHANGE_INGREDIENTS, bun, items});
export const setPrice = (price) => dispatch => dispatch({type: SET_PRICE, price});
