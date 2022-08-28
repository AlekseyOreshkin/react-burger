import {  
    CHANGE_INGREDIENTS,
    SET_PRICE
 } from '../actions/constructor';

const initialConstructor = { bun: '',  items: [], price: 0};
const constructorReducer = (state = initialConstructor, action) => {
    switch (action.type)
    {
    case CHANGE_INGREDIENTS:
        return {
            ...state,
            bun: action.bun,
            items: action.items
        };
    case SET_PRICE:
        return {
            ...state,
            price: action.price
        }
    default:
        return {...state};    }
};

export default constructorReducer;