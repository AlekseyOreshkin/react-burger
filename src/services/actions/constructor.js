import { getOrderRequest } from "../../utils/request";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED  = 'GET_ORDER_FAILED';
export const ADD_INGREDIENT    = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

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

export const addIngredient = (id, isBun) => dispatch => dispatch({type: ADD_INGREDIENT, id, isBun});
export const removeIngredient = items => dispatch => dispatch({type: REMOVE_INGREDIENT, items})
