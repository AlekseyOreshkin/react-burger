import { requestLogin, requestLogout, requestRegister } from "../../utils/request";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED  =  'REGISTER_FAILED';

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

export const register = form => {
    return (dispatch) => {
        dispatch({type: REGISTER_REQUEST});
        requestRegister(form).then((authInfo) => {
            localStorage.setItem('token', authInfo.accessToken);
            localStorage.setItem('refreshToken', authInfo.refreshToken);
            dispatch({type: REGISTER_SUCCESS, authInfo});
        }).catch(() => {
            dispatch({type: REGISTER_FAILED});
        })
    }
};

export const login = form => {
    return (dispatch) => {
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

export const logout = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT_REQUEST});
        const token = localStorage.getItem('refreshToken');
        requestLogout(token).then(({message}) => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch({type: LOGOUT_SUCCESS, message});
        }).catch(() => {
            dispatch({type: LOGOUT_FAILED});
        })
    }
};

export const requestGetUser = () => {
    return (dispatch) => {

    }
}

export const requestPatchUser = form => {
    return (dispatch) => {

    }
}
