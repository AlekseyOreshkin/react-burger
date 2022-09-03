import { validBunId } from "../../utils/validation";

export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';
export const SET_PRICE = 'SET_PRICE';
export const UPDATE_INGREDIENTS_ORDER = 'UPDATE_INGREDIENTS_ORDER';
export const ADD_KEY = 'ADD_KEY';

export const changeIngredients = (bun, items) => dispatch =>
    dispatch({type: CHANGE_INGREDIENTS, bun: validBunId(bun) ? bun : '', items});

