import { IBasicAction } from "../../utils/types";

export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';
export const SET_PRICE = 'SET_PRICE';
export const UPDATE_INGREDIENTS_ORDER = 'UPDATE_INGREDIENTS_ORDER';
export const ADD_KEY = 'ADD_KEY';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

interface IAction extends IBasicAction
{
    bun: string;
    items: string[];
};

export const changeIngredients = (bun: string, items: string[]) : any => 
    (dispatch: (arg: IAction) => void) =>
         dispatch({type: CHANGE_INGREDIENTS, bun, items});

