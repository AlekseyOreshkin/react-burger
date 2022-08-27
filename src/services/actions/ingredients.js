import { getIngredientsRequest } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED  = 'GET_INGREDIENTS_FAILED';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({type: GET_INGREDIENTS_REQUEST});
        getIngredientsRequest().then(([data, cats]) => {
            dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: data, categories: cats});
        }).catch(() => {
            dispatch({type: GET_INGREDIENTS_FAILED});
        })
    }
};

export const showIngredientDetails = id => dispatch => dispatch({type: SHOW_INGREDIENT_DETAILS, id});

export const hideIngredientDetails = () => dispatch => dispatch({type: HIDE_INGREDIENT_DETAILS});

export const setActiveTab = cat => dispatch => dispatch({type: SET_ACTIVE_TAB, cat});

