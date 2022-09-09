import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
} from '../actions/authInfo';

const initialAuthState = {
    request: false,
    success: false,
    user: {
        email: '',
        name: ''
    },
  } ;

export const authInfoReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: return {
            ...state,
            request: true,
            success: false,
        };
        case REGISTER_SUCCESS: {
            let {user, accessToken, refreshToken} = action.authInfo;
            accessToken = accessToken.split('Bearer ')[1];
            return {
                ...state,
                request: false,
                success: true,
                user,
                accessToken,
                refreshToken
            };
        } case REGISTER_FAILED: return {
            ...state,
            request: false,
        }; 
        case LOGIN_REQUEST: return {
            ...state,
            request: true,
        }; 
        case LOGIN_SUCCESS: {
            const {user, accessToken, refreshToken} = action.authInfo;
            return {
                ...state,
                request: false,
                success: true,
                user,
                accessToken: accessToken.split('Bearer ')[1],
                refreshToken
            }; 
        } case LOGIN_FAILED: return {
            ...state,
            request: false,
        }; 
        case LOGOUT_REQUEST: return {
            ...state,
            request: true
        } 
        case LOGOUT_SUCCESS: {
            return initialAuthState;
        } 
        case LOGOUT_FAILED: return {
            ...state,
            request: false,
        }; 
        default: {
            return state ?? initialAuthState;
        } 
    }
};