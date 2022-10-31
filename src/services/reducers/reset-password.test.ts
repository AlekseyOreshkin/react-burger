import { RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER } from '../../utils/constants';
import { TApplicationActions } from '../actions';
import { CLOSE_ORDER } from '../actions/order-details';
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../actions/reset-password';
import {initialResetPassword, resetPasswordReducer} from './reset-password';

describe ('Reset-password reducer', () => {
    it('Should return initial state', () => {
        const action : TApplicationActions = {type: CLOSE_ORDER};    
        expect(resetPasswordReducer(undefined, action)).toEqual(initialResetPassword);
    });

    it('Should return requested reset password state', () => {
        const action : TApplicationActions = {
            type: RESET_PASSWORD_REQUEST
        };
        const expectedState = {
            ...initialResetPassword,
            request: true
        };

        expect(resetPasswordReducer(initialResetPassword, action)).toEqual(expectedState);
    })

    it('Should return succeded reset password state', () => {
        const message = 'reset password succeded';
        const step = RESET_PASSWORD_STEP_RECOVER;
        const action : TApplicationActions = {
            type: RESET_PASSWORD_SUCCESS,
            message,
            stepOnSuccess: step

        };
        const expectedState = {
            ...initialResetPassword,
            message, 
            step
        };

        expect(resetPasswordReducer(initialResetPassword, action)).toEqual(expectedState);
    })

    it('Should return state with error', () => {
        const message = 'reset password failed';
        const step = RESET_PASSWORD_STEP_LOGIN;
        const action : TApplicationActions = {
            type: RESET_PASSWORD_FAILED,
            error: message,
            stepOnFailed: step
        };
        const expectedState = {
            ...initialResetPassword,
            failed: true,
            message: message,
            step: step            
        };

        expect(resetPasswordReducer(initialResetPassword, action)).toEqual(expectedState);
    })
});
