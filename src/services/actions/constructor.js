export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';
export const SET_PRICE = 'SET_PRICE';

export const changeIngredients = (bun, items) => dispatch =>
    dispatch({type: CHANGE_INGREDIENTS, bun: typeof(bun) === 'undefined' ? '' : bun, items});
export const setPrice = price => dispatch => dispatch({type: SET_PRICE, price});

