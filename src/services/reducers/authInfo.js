import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
} from '../actions/authInfo';

export const initialAuthState = {
    request: false,
    success: false,
    user: {
        email: '',
        name: ''
    }
  } ;

export const authInfoReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            request: true,
        }; 
        case LOGIN_SUCCESS: {
            const { user } = action.authInfo;
            return {
                ...state,
                request: false,
                success: true,
                user
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