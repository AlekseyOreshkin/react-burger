import { requestPatchUser, requestLogin, requestLogout, requestRefreshToken, requestRegister, requestGetUser } from "../../utils/request";
import { AppDispatch, AppThunk, IAuthUserInfo, IBasicAction, ILoginForm, IProfileForm } from "../../utils/types";

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

interface ILoginRequestAction extends IBasicAction<typeof LOGIN_REQUEST> { };
interface ILoginSuccessAction extends IBasicAction<typeof LOGIN_SUCCESS> {
    authInfo: IAuthUserInfo;
};
interface ILoginFailedAction extends IBasicAction<typeof LOGIN_FAILED> { };

interface ILogoutRequestAction extends IBasicAction<typeof LOGOUT_REQUEST> { };
interface ILogoutSuccessAction extends IBasicAction<typeof LOGOUT_SUCCESS> {
    message: string;
};
interface ILogoutFailedAction extends IBasicAction<typeof LOGOUT_FAILED> { };

export type TAuthInfoActions = ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction
    | ILogoutRequestAction | ILogoutSuccessAction | ILogoutFailedAction;



export const register: AppThunk = (form: IProfileForm) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        requestRegister(form).then((authInfo) => {
            localStorage.setItem('token', authInfo.accessToken);
            localStorage.setItem('refreshToken', authInfo.refreshToken);
            dispatch({ type: LOGIN_SUCCESS, authInfo });
        }).catch(() => {
            dispatch({ type: LOGIN_FAILED });
        })
    }
};

export const login: AppThunk = (form: ILoginForm) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        requestLogin(form).then(authInfo => {
            localStorage.setItem('token', authInfo.accessToken);
            localStorage.setItem('refreshToken', authInfo.refreshToken);
            dispatch({ type: LOGIN_SUCCESS, authInfo });
        }).catch(() => {
            dispatch({ type: LOGIN_FAILED });
        })
    }
};

export const tokenLogin: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        requestRefreshToken().then(() => {
            requestGetUser().then(authInfo => {
                dispatch({ type: LOGIN_SUCCESS, authInfo });
            })
        }).catch(() => {
            dispatch({ type: LOGIN_FAILED });
        })
    }
};

export const logout: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGOUT_REQUEST });
        const token = localStorage.getItem('refreshToken');
        if (token === null) {
            return dispatch({ type: LOGOUT_FAILED });
        }
        requestLogout(token).then(({ message }) => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch({ type: LOGOUT_SUCCESS, message });
        }).catch(() => {
            dispatch({ type: LOGOUT_FAILED });
        })
    }
};

export const getUser: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        requestGetUser()
            .then(authInfo => dispatch({ type: LOGIN_SUCCESS, authInfo }))
            .catch(error => Promise.reject(error));
    }
}
export const patchUser: AppThunk = (form: IProfileForm) => {
    return (dispatch: AppDispatch) => {
        requestPatchUser(form)
            .then(authInfo => dispatch({ type: LOGIN_SUCCESS, authInfo }))
            .catch(error => Promise.reject(error));
    }
}
