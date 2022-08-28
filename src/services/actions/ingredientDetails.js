export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';

export const showIngredientDetails = id => dispatch => dispatch({type: SHOW_INGREDIENT_DETAILS, id});

export const hideIngredientDetails = () => dispatch => dispatch({type: HIDE_INGREDIENT_DETAILS});
