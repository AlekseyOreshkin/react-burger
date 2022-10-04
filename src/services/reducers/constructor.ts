import {  
    CHANGE_INGREDIENTS,
    SET_PRICE,
    UPDATE_INGREDIENTS_ORDER,
    CLEAR_CONSTRUCTOR,
    TConstructorActions
 } from '../actions/constructor';

 interface IConstructorState
 {
    bun: string;
    items: string[];
    price: number;
 }
export const initialConstructor : IConstructorState =
{
     bun: '',  items: [], price: 0
};
export const constructorReducer = (state = initialConstructor, action: TConstructorActions) => {
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
    default:
        return state;
    }
};
