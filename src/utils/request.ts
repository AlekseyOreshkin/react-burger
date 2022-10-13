import {
    BASE_URL,
    INGREDIENTS_ENDPOINT,
    ORDER_REQUEST_ENDPOINT,
    PASSWORD_RESET_ENDPOINT,
    PASSWORD_SET_ENDPOINT,
    LOGIN_ENDPOINT,        
    REGISTER_ENDPOINT,     
    LOGOUT_ENDPOINT,       
    REFRESH_TOKEN_ENDPOINT,
    USER_ENDPOINT
 } from './constants';
import { IIngredient,
    IIngredientCategory, 
    IProfileForm, 
    IResetPasswordForm, 
    TIngredientName, 
    TIngredientType, 
    ILoginForm, 
    IAuthToken, 
    TAuthResponse, 
    ILogoutResponse } from './types';
import { padOrderNumber } from './utils';


type TRequestParams = {
    method: 'GET' | 'POST' | 'PATCH';
    headers : {
        [header: string] : string;
    };
    body?: string;
 };

type TRequestParamsBuilder = () => TRequestParams;

const getRequestParams : TRequestParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const postRequestParams : TRequestParams = {
    ...getRequestParams,
    method: 'POST'
};

const patchRequestParams : TRequestParams = {
    ...getRequestParams,
    method: 'PATCH'
};

export type TResponseBoty<T> = {success: boolean} & T;


const securedRequestParams = (initParams : TRequestParams) : TRequestParams => {
    const token = localStorage.getItem('token');
    let params = {
        ...initParams,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    if (token) {
        params = {
            ...params,
            headers: {
                ...params.headers,
                Authorization: token
            }
        };
    }
    return params;
};

const securedPostRequestParams  = () => securedRequestParams(postRequestParams);
const securedGetRequestParams   = () => securedRequestParams(getRequestParams);
const securedPatchRequestParams = () => securedRequestParams(patchRequestParams);

const request = async <T>(endopoint : string, initParams : TRequestParams) : Promise<[json: TResponseBoty<T>, headers: Headers]> => {
    const url = BASE_URL + endopoint;
    try
    {
        const response = await fetch(url, initParams);
        if (response.ok) {
            const json = (await response.json()) as TResponseBoty<T>;
            return Promise.resolve([json, response.headers]);
        } else {
            throw new Error(`статус ${response.status}`);
        }
    }
    catch (error)
    {
        return Promise.reject([false, {error}]);
    }
};

const checkResult = (success : boolean) : void => {
    if (!success) {
        throw Error(`Сервер вернул отрицательный результат`);
    }
};

const buildParams = <T>(params : TRequestParams | TRequestParamsBuilder, body : T | null = null) : TRequestParams => {
    let p : TRequestParams;
    if (typeof params === 'function') {
        p = params();
    } else {
        p = params;
    }

    if (body) {
        return {...p, body: JSON.stringify(body)};
    }
    else {
        return {...p};
    }
};

const makeRequest = async <T>(endpoint : string, params : TRequestParams, parseHeaders: ((headers: Headers) => void) | undefined = undefined) : Promise<T> => {
    try {
        const [json, headers] = await request<T>(endpoint, params);
        checkResult(json.success);
        console.log('Запрос выполнен:', endpoint, params, headers, json);
        if (typeof parseHeaders === 'function') {
            parseHeaders(headers);
        }
        return Promise.resolve(json);
    } catch(error) {
        console.log('Запрос завершен с ошибкой', endpoint, params, error);
        return Promise.reject(error);
    }
};

const makeSecuredRequest = async <T>(endpoint : string, params : TRequestParams, parseHeaders: ((headers: Headers) => void) | undefined = undefined) : Promise<T> => {
    try {
        const result = await makeRequest<T>(endpoint, params, parseHeaders);
        return Promise.resolve<T>(result);
    } catch(error) {
        const success = await requestRefreshToken();
        if (success) {
            const result = await makeRequest<T>(endpoint, params, parseHeaders);
            return Promise.resolve<T>(result);
        }
        return Promise.reject(error);
    }
};

export const mapIngredientCategoryName = (category: TIngredientType) : TIngredientName => {
    switch(category)
    {
        case 'bun':
            return 'Булки';
        case 'main':
            return 'Начинки';
        case 'sauce':
            return 'Соусы';
    };
};

export const requestIngredients = async () => {
    const {data} = await makeRequest<{data: IIngredient[]}>(INGREDIENTS_ENDPOINT, getRequestParams);
    const cats : IIngredientCategory[] = [];
    data.map(o => o.type).forEach(type => { 
        
        if (!cats.find(c => c.type === type)) {
            cats.splice(0, 0, {type, name: mapIngredientCategoryName(type)});
        }
    });
    return Promise.resolve<[IIngredient[], IIngredientCategory[]]>([data, cats.sort((l,r) => l.type.localeCompare(r.type))]);
};

export const requestOrder = async (ingredients: string[]) => {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
        return Promise.reject();
    }
    const { name, order: {number} } = await makeSecuredRequest<{name: string, order: {number: number}}>(ORDER_REQUEST_ENDPOINT,
        buildParams(securedPostRequestParams, { token, ingredients }));
    return Promise.resolve({ name, number: padOrderNumber(number) });
};

export const requestPasswordReset = async (email: string) => {
    const {message} = await makeRequest<{message: string}>(PASSWORD_RESET_ENDPOINT,
        buildParams(postRequestParams, {email}));
    return Promise.resolve({ message });
};

export const requestPasswordSet = async (form: IResetPasswordForm) => {
    const {message} = await makeRequest<{message: string}>(PASSWORD_SET_ENDPOINT, 
        buildParams(postRequestParams, form));
    return Promise.resolve({ message });
};

export const requestRegister = async (form : IProfileForm) => {
    const authInfo = await makeRequest<TAuthResponse>(REGISTER_ENDPOINT, 
        buildParams(postRequestParams, form));
    return Promise.resolve(authInfo);
};

export const requestLogin = async (form : ILoginForm) => {
    const authInfo = await makeRequest<TAuthResponse>(LOGIN_ENDPOINT, 
        buildParams(postRequestParams, form));
    return Promise.resolve(authInfo);
};

export const requestLogout = async (token: string) => {
    const {message} = await makeRequest<ILogoutResponse>(LOGOUT_ENDPOINT, 
        buildParams(securedPostRequestParams, { token }));
    return Promise.resolve({message});
};

export const requestRefreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
        return Promise.resolve(false);
    }
    const data = await makeRequest<IAuthToken>(REFRESH_TOKEN_ENDPOINT, 
        buildParams(securedPostRequestParams, { token }));
    
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return Promise.resolve(true);
};

export const requestGetUser = async () => {
    try {
        const authInfo = await makeRequest<TAuthResponse>(USER_ENDPOINT, buildParams(securedGetRequestParams));
        return Promise.resolve(authInfo);
    } catch(error) {
        console.log('не удалось восстановить контекст', error);
        return Promise.reject(error);
    }
};

export const requestPatchUser = async (form: IProfileForm) => {
    const authInfo = await makeRequest<TAuthResponse>(USER_ENDPOINT, 
        buildParams(securedPatchRequestParams, form));
    return Promise.resolve(authInfo);
};
