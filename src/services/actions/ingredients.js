import { requestIngredients } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED  = 'GET_INGREDIENTS_FAILED';

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({type: GET_INGREDIENTS_REQUEST});
        requestIngredients().then(([data, cats]) => {
            dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: data, categories: cats});
        }).catch(() => {
            dispatch({type: GET_INGREDIENTS_FAILED});
        })
    }
};

