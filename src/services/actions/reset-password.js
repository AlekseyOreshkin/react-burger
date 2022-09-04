import { requestPasswordReset, requestPasswordSet  } from "../../utils/request";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED  = 'RESET_PASSWORD_FAILED';


export const resetPassword = (email, stepOnSuccess, stepOnFailed) => {
    return (dispatch) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordReset(email).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};

export const setPassword = (password, token, stepOnSuccess, stepOnFailed) => {
    return (dispatch) => {
        dispatch({type: RESET_PASSWORD_REQUEST});
        requestPasswordSet({password, token}).then(({ message }) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, message, stepOnSuccess});
        }).catch(error => {
            dispatch({type: RESET_PASSWORD_FAILED, error, stepOnFailed});
        })
    }
};
