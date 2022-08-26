import {  
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED, 
    ADD_INGREDIENT,
    MOVE_INGREDIENTS
 } from '../actions/constructor';

const initialConstructor = { bun: '',  items: [], price: 0};
export const constructorReducer = (state = initialConstructor, action) => {
    switch (action.type)
    {
        case ADD_INGREDIENT:
            return {
                ...state,
                bun: action.isBun ? action.id : state.bun,
                items: action.isBun ? state.items : state.items ? [...state.items, action.id] : [action.id]
            };
    case MOVE_INGREDIENTS:
        return {
            ...state,
            items: action.items
        };
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

