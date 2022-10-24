import { TApplicationActions } from "../actions";
import { authInfoReducer, initialAuthState } from "./auth-info";

describe('Auth info reducer', () => {
    it('Should return initial auth state', () => {
        const action : any = {};
        expect(authInfoReducer(undefined, action)).toEqual(initialAuthState);
    });

    it('Should return auth state on request login', () => {
        const action : TApplicationActions = {
            type: 'LOGIN_REQUEST',
        };
        const expectedState = {
            ...initialAuthState,
            request: true
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(expectedState);
    })

    const user = {email : 'email', name: 'name'};
    const authInfo = {
        accessToken: 'abc',
        refreshToken: 'cde',
        success: true,
        user
    };

    it('Should return auth state on login succeded', () => {
        const action : TApplicationActions = {
            type: 'LOGIN_SUCCESS',
            authInfo,
        };
        const expectedState = {
            ...initialAuthState,
            success: authInfo.success,
            user
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(expectedState);
    })

    it('Should return auth state on login failed', () => {
        const action : TApplicationActions = {
            type: 'LOGIN_FAILED',
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(initialAuthState);
    })

    it('Should return auth state on logout request', () => {
        const action : TApplicationActions = {
            type: 'LOGOUT_REQUEST',
        };
        const expectedState = {
            ...initialAuthState,
            request: true
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(expectedState);
    })

    it('Should return auth state on logout succeded', () => {
        const action : TApplicationActions = {
            type: 'LOGOUT_SUCCESS',
            message: ''
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(initialAuthState);
    })

    it('Should return auth state on logout failed', () => {
        const action : TApplicationActions = {
            type: 'LOGOUT_FAILED',
        };

        expect(authInfoReducer(initialAuthState, action)).toEqual(initialAuthState);
    })
});