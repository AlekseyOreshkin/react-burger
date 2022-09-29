import { requestPasswordReset, requestPasswordSet  } from "../../utils/request";
import { IResetPasswordForm } from "../../utils/types";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED  = 'RESET_PASSWORD_FAILED';


export const resetPassword = (email : string, stepOnSuccess: string, stepOnFailed: string) : any => {
    return (dispatch: (arg0: { type: string; message?: string; stepOnSuccess?: string; error?: any; stepOnFailed?: string; }) => void) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordReset(email).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};

export const setPassword = (form : IResetPasswordForm, stepOnSuccess: string, stepOnFailed: string) : any => {
    return (dispatch: (arg0: { type: string; message?: any; stepOnSuccess?: string; error?: any; stepOnFailed?: string; }) => void) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordSet(form).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};
