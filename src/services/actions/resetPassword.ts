import { requestPasswordReset, requestPasswordSet  } from "../../utils/request";
import { AppDispatch, AppThunk, IBasicAction, IResetPasswordForm } from "../../utils/types";

export const RESET_PASSWORD_REQUEST : 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS : 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED  : 'RESET_PASSWORD_FAILED'  = 'RESET_PASSWORD_FAILED';

interface IResetPasswordAction extends IBasicAction<typeof RESET_PASSWORD_REQUEST> {};

interface IResetPasswordSuccessAction extends IBasicAction<typeof RESET_PASSWORD_SUCCESS>
{
    message: string;
    stepOnSuccess: string;
};

interface IResetPasswordFailedAction extends IBasicAction<typeof RESET_PASSWORD_FAILED>
{
    error: string;
    stepOnFailed: string;
};

export type TResetPasswordActions = IResetPasswordAction | IResetPasswordSuccessAction | IResetPasswordFailedAction;

export const resetPassword : AppThunk = (email : string, stepOnSuccess: string, stepOnFailed: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordReset(email).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};

export const setPassword : AppThunk = (form : IResetPasswordForm, stepOnSuccess: string, stepOnFailed: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordSet(form).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};
