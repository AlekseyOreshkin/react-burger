import { requestPatchUser, requestLogin, requestLogout, requestRefreshToken, requestRegister, requestGetUser } from "../../utils/request";
import { IBasicAction, ILoginForm, IProfileForm, TAuthResponse } from "../../utils/types";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED  =  'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED  =  'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED  = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED  = 'PATCH_USER_FAILED';

interface IAuthAction extends IBasicAction
{
    authInfo: TAuthResponse;
};
interface IAuthInfoAction extends IBasicAction
{
    message: string;
};

export const register = (form : IProfileForm) : any => {
    return (dispatch: (arg: IBasicAction | IAuthAction) => void) => {
        dispatch({type: LOGIN_REQUEST});
        requestRegister(form).then((authInfo) => {
            localStorage.setItem('token', authInfo.accessToken);
            localStorage.setItem('refreshToken', authInfo.refreshToken);
            dispatch({type: LOGIN_SUCCESS, authInfo});
        }).catch(() => {
            dispatch({type: LOGIN_FAILED});
        })
    }
};

export const login = (form : ILoginForm) : any => {
    return (dispatch: (arg: IBasicAction | IAuthAction) => void) => {
        dispatch({type: LOGIN_REQUEST});
        requestLogin(form).then( authInfo => {
            localStorage.setItem('token', authInfo.accessToken);
            localStorage.setItem('refreshToken', authInfo.refreshToken);
            dispatch({type: LOGIN_SUCCESS, authInfo});
        }).catch(() => {
            dispatch({type: LOGIN_FAILED});
        })
    }
};

export const tokenLogin = () : any => {
    return (dispatch: (arg: IBasicAction | IAuthAction) => void) => {
        requestRefreshToken().then(() => {
            requestGetUser().then( authInfo => {
                dispatch({type: LOGIN_SUCCESS, authInfo});
            })
        }).catch(() => {
            dispatch({type: LOGIN_FAILED});
        })
    }
};

export const logout = () : any => {
    return (dispatch: (arg: IBasicAction | IAuthInfoAction) => void) => {
        dispatch({type: LOGOUT_REQUEST});
        const token = localStorage.getItem('refreshToken');
        if (token === null) {
            return dispatch({type: LOGOUT_FAILED});
        }
        requestLogout(token).then(({message}) => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch({type: LOGOUT_SUCCESS, message});
        }).catch(() => {
            dispatch({type: LOGOUT_FAILED});
        })
    }
};

export const getUser = () : any => {
    return (dispatch: (arg: IBasicAction | IAuthAction) => void) => {
        dispatch({type: LOGIN_REQUEST});
        requestGetUser()
            .then(authInfo => dispatch({type: LOGIN_SUCCESS, authInfo}))
            .catch(error => Promise.reject(error));
    }
}
export const patchUser = (form : IProfileForm) : any => {
    return (dispatch : (arg: IBasicAction | IAuthAction) => void) => {
        requestPatchUser(form)
            .then(authInfo => dispatch({type: LOGIN_SUCCESS, authInfo}))
            .catch(error => Promise.reject(error));
    }
}
