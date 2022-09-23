import { AnyAction } from "@reduxjs/toolkit";

export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';
export const SET_PRICE = 'SET_PRICE';
export const UPDATE_INGREDIENTS_ORDER = 'UPDATE_INGREDIENTS_ORDER';
export const ADD_KEY = 'ADD_KEY';

export const changeIngredients = (bun: string, items: string[]) => (dispatch: any) =>
    dispatch({type: CHANGE_INGREDIENTS, bun: bun ?? '', items});

