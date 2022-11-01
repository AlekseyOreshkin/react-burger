import { TApplicationActions } from '../actions';
import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from '../actions/reset-password';

interface IResetPasswordState {
    message: string;
    step: string;
    request: boolean;
    failed: boolean;
};
export const initialResetPassword: IResetPasswordState =
{
    message: '',
    step: '',
    request: false,
    failed: false
};

export const resetPasswordReducer = (state = initialResetPassword, action: TApplicationActions) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                request: true,
                failed: false
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                request: false,
                failed: false,
                message: action.message,
                step: action.stepOnSuccess
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                request: false,
                failed: true,
                message: action.error,
                step: action.stepOnFailed
            };
        default:
            return state;
    }
};


