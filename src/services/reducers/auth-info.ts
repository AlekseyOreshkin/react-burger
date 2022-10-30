import { IAuthUserInfo, TApplicationActions } from '../../utils/types';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
} from '../actions/auth-info';

interface IAuthInfoState {
    request: boolean;
    success: boolean;
    user: IAuthUserInfo;
};

export const initialAuthState: IAuthInfoState = {
    request: false,
    success: false,
    user: {
        email: '',
        name: ''
    }
};

export const authInfoReducer = (state = initialAuthState, action: TApplicationActions) => {
    switch (action.type) {
        case LOGIN_REQUEST: return {
            ...state,
            request: true,
        };
        case LOGIN_SUCCESS: {
            return {
                ...state,
                request: false,
                success: action.authInfo.success,
                user: action.authInfo.user
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
            return state;
        }
    }
};