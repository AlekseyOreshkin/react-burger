import { requestIngredients } from "../../utils/request";
import { IBasicAction, IIngredient, IIngredientCategory } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED  = 'GET_INGREDIENTS_FAILED';

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

interface IAction extends IBasicAction
{
    ingredients: IIngredient[];
    categories: IIngredientCategory[];
};

export const getIngredients = () : any => {
    return (dispatch : (arg: IAction | IBasicAction) => void) => {
        dispatch({type: GET_INGREDIENTS_REQUEST});
        requestIngredients().then(([ingredients, categories]) => {
            dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients, categories});
        }).catch(() => {
            dispatch({type: GET_INGREDIENTS_FAILED});
        })
    }
};

