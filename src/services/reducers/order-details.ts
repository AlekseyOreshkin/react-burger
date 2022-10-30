import { TApplicationActions } from '../actions';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER,
} from '../actions/order-details';

interface IOrderDetailsState {
    number: string;
    name: string;
    request: boolean;
    failed: boolean;
    show: boolean;
}

export const initialOrderDetails: IOrderDetailsState =
{
    number: '',
    name: '',
    request: false,
    failed: false,
    show: false
};

export const orderDetailsReducer = (state = initialOrderDetails, action: TApplicationActions) => {
    switch (action.type) {
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
                number: action.number,
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
            return state;
    }
};


