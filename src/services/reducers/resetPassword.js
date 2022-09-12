import {  
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAILED,
 } from '../actions/resetPassword';


const initialResetPassword = { message: '', step: '', request: false, failed: false};
const resetPasswordReducer = (state = initialResetPassword, action) => {
    switch(action.type)
    {
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
            message: action.message,
            step: action.stepOnFailed
        };
    default:
        return state;
    }
};

export default resetPasswordReducer;

