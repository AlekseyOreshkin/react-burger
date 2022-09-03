import {  
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED,
    CLOSE_ORDER, 
 } from '../actions/orderDetails';

const initialOrderDetails = { number: '', name: '', request: false, failed: false, show: false};
const orderDetailsReducer = (state = initialOrderDetails, action) => {
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
            request: false,
            failed: false,
            number: String(action.number),
            name: action.name,
            show: true
        };
    case GET_ORDER_FAILED:
        return {
            ...state,
            request: false,
            failed: true
        };
    case CLOSE_ORDER:
        return {
            ...state,
            show: false,
        };
    default:
        return {...state};    }
};

export default orderDetailsReducer;

