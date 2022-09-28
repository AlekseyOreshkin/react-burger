import {  
    CHANGE_INGREDIENTS,
    SET_PRICE,
    UPDATE_INGREDIENTS_ORDER,
    CLEAR_CONSTRUCTOR,
    ADD_KEY
 } from '../actions/constructor';

export const initialConstructor = { bun: '',  items: [], price: 0, keys: []};
export const constructorReducer = (state = initialConstructor, action) => {
    switch (action.type)
    {
    case CHANGE_INGREDIENTS:
        return {
            ...state,
            bun: action.bun,
            items: action.items
        };
    case UPDATE_INGREDIENTS_ORDER:
        return {
            ...state,
            items: action.items
        };
    case CLEAR_CONSTRUCTOR:
        return initialConstructor;
    case SET_PRICE:
        return {
            ...state,
            price: action.price
        }
    case ADD_KEY:
        return {
            ...state,
            keys: state.keys ? [...state.keys, action.key] : [action.key]
        }
        default:
        return state;
    }
};
