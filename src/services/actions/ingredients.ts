import { requestIngredients } from "../../utils/request";
import { AppDispatch, AppThunk, IBasicAction, IIngredient, IIngredientCategory, TIngredientType } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST : 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS : 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED : 'GET_INGREDIENTS_FAILED'  = 'GET_INGREDIENTS_FAILED';

export const SET_ACTIVE_TAB : 'SET_ACTIVE_TAB' = 'SET_ACTIVE_TAB';

interface IIngredientsAction extends IBasicAction<typeof GET_INGREDIENTS_SUCCESS>
{
    ingredients: IIngredient[];
    categories: IIngredientCategory[];
};
interface IIngredientsBasicAction extends IBasicAction<typeof GET_INGREDIENTS_REQUEST
    | typeof GET_INGREDIENTS_FAILED> {};
interface IIngredientsActiveTabAction extends IBasicAction<typeof SET_ACTIVE_TAB>
{
    active: TIngredientType;
};
    
export type TIngredientsActions = IIngredientsBasicAction | IIngredientsAction | IIngredientsActiveTabAction;

export const getIngredients : AppThunk = ()=> {
    return (dispatch : AppDispatch) => {
        dispatch({type: GET_INGREDIENTS_REQUEST});
        requestIngredients().then(([ingredients, categories]) => {
            dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients, categories});
        }).catch(() => {
            dispatch({type: GET_INGREDIENTS_FAILED});
        })
    }
};

