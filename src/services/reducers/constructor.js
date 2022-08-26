import {  
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED, 
    CHANGE_INGREDIENTS,
    SET_PRICE
 } from '../actions/constructor';

const initialConstructor = { bun: '',  items: [], price: 0};
export const constructorReducer = (state = initialConstructor, action) => {
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
        return state ?? initialConstructor;
    }
};

const initialOrderDetails = { number: '', name: '', request: false, failed: false};
export const orderDetailsReducer = (state = initialOrderDetails, action) => {
    switch(action.type)
    {
    case GET_ORDER_REQUEST:
        return {
            ...state,
            request: true,
            failed: false
        };
    case GET_ORDER_SUCCESS:
        return {
            ...state,
            request: true,
            failed: false
        };
    case GET_ORDER_FAILED:
        return {
            ...state,
            request: false,
            failed: true
        };
    default:
        return state ?? initialOrderDetails;
    }
};

