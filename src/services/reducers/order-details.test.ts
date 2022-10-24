import { TApplicationActions } from "../actions";
import { initialOrderDetails, orderDetailsReducer } from "./order-details";

describe('Order details reducer', () => {
    it('Should return initial order details state', () => {
        const action : any = {};
        expect(orderDetailsReducer(undefined, action)).toEqual(initialOrderDetails);
    });
    it('Should return requested order details state', () => {
        const action : TApplicationActions = {
            type: 'GET_ORDER_REQUEST'
        };
        const expectedState = {
            ...initialOrderDetails,
            request: true
        };

        expect(orderDetailsReducer(initialOrderDetails, action)).toEqual(expectedState);
    })
    
    it('Should return order details success state', () => {
        const number = '000001';
        const name = 'Order';
        const action : TApplicationActions = {
            type: 'GET_ORDER_SUCCESS',
            number,
            name
        };
        const expectedState = {
            ...initialOrderDetails,
            number,
            name,
            show: true
        };

        expect(orderDetailsReducer(initialOrderDetails, action)).toEqual(expectedState);
    })

    it('Should return order details failed state', () => {
        const action : TApplicationActions = {
            type: 'GET_ORDER_FAILED',
        };
        const expectedState = {
            ...initialOrderDetails,
            failed: true
        };

        expect(orderDetailsReducer(initialOrderDetails, action)).toEqual(expectedState);
    })

    it('Should return close modal order details state', () => {
        const action : TApplicationActions = {
            type: 'CLOSE_ORDER',
        };
        const expectedState = {
            ...initialOrderDetails,
        };

        expect(orderDetailsReducer(initialOrderDetails, action)).toEqual(expectedState);
    })
});