import { createRef } from 'react';
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
 } from './constants';

const getRequestParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const postRequestParams = {
    ...getRequestParams,
    method: 'POST'
};
const securedPostRequestParams = () => {
    const token = localStorage.getItem('token');

    let params = {
        ...postRequestParams,
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
const request = async (endopoint, initParams) => {
    const url = BASE_URL + endopoint;
    try
    {
        const response = await fetch(url, initParams);
        if (response.ok) {
            const json = await response.json();
            return Promise.resolve([json, response.headers]);
        } else {
            throw new Error(`статус ${response.status}`);
        }
    }
    catch (error)
    {
        return Promise.reject([false, {error: error}]);
    }
};

const checkResult = (success) => {
    if (!success) {
        throw Error(`Сервер вернул отрицательный результат`);
    }
};
const buildParams = (params, body) => {
    let p = params
    if (typeof params === 'function') {
        p = params();
    } 
    return {...p, body: JSON.stringify(body)};
};
const makeRequest = async (endpoint, params, parseHeaders) => {
    try {
        const [json, headers] = await request(endpoint, params);
        checkResult(json?.success);
        console.log('Запрос выполнен:', endpoint, params, headers, json);
        if (typeof parseHeaders === 'function') {
            parseHeaders(headers);
        }
        return Promise.resolve(json);
    } catch(error) {
        console.log('Запрос завершен с ошибкой', endpoint, params, error);
        return Promise.reject(error);
    }
}
const makeSecuredRequest = async (endpoint, params, parseHeaders) => {
    try {
        const result = await makeRequest(endpoint, params, parseHeaders);
        return Promise.resolve(result);
    } catch(error) {
        const success = await requestRefreshToken();
        if (success) {
            const result = await makeRequest(endpoint, params, parseHeaders);
            return Promise.resolve(result);
        }
        return Promise.reject(error);
    }
}

export const mapIngredientCategoryName = (category, single = false) => {
    switch(category)
    {
        case 'bun':
            return single ? 'Булка' : 'Булки';
        case 'main':
            return single ? 'Начинка' : 'Начинки';
        case 'sauce':
            return single ? 'Соус' : 'Соусы';
        default:
            return 'Другое';
    };
};


export const requestIngredients = async () => {
    const {data} = await makeRequest(INGREDIENTS_ENDPOINT, getRequestParams);
    const cats = [];
    data.map(o => o.type).forEach(type => { 
        
        if (!cats.find(c => c.type === type)) {
            cats.splice(0, 0, {type, name: mapIngredientCategoryName(type), ref: createRef()});
        }
    });
    return Promise.resolve([data, cats.sort((l,r) => l.type.localeCompare(r.type))]);
};


export const requestOrder = async (ingredients) => {
    const { name, order: {number} } = await makeSecuredRequest(ORDER_REQUEST_ENDPOINT,
        buildParams(securedPostRequestParams, {ingredients}));
    return Promise.resolve({ name, number });
};


  export const requestPasswordReset = async (email) => {
    const {message} = await makeRequest(PASSWORD_RESET_ENDPOINT,
        buildParams(postRequestParams, {email}));
    return Promise.resolve({ message });
  };

  export const requestPasswordSet = async (passwort, token) => {
    const {message} = await makeRequest(PASSWORD_SET_ENDPOINT, 
        buildParams(postRequestParams, {passwort, token}));
    return Promise.resolve({ message });
  };
  
  export const requestRegister = async form => {
    const authInfo = await makeRequest(REGISTER_ENDPOINT, 
        buildParams(postRequestParams, form));
    return Promise.resolve(authInfo);
  };

  export const requestLogin = async (form) => {
    const authInfo = await makeRequest(LOGIN_ENDPOINT, 
        buildParams(postRequestParams, form));
    return Promise.resolve(authInfo);
  };
  export const requestLogout = async token => {
    const {message} = await makeRequest(LOGOUT_ENDPOINT, 
        buildParams(securedPostRequestParams, { token }));
    return Promise.resolve({message});
  };

  export const requestRefreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
        return Promise.resolve(false);
    }
    const data = await makeRequest(REFRESH_TOKEN_ENDPOINT, 
        buildParams(securedPostRequestParams, { token }));
    if (data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    }
    return Promise.resolve(data.success);
  };
