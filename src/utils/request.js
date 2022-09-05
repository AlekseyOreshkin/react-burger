import { createRef } from 'react';
import {
    BASE_URL,
    INGREDIENTS_ENDPOINT,
    ORDER_REQUEST_ENDPOINT,
    PASSWORD_RESET_ENDPOINT,
    PASSWORD_SET_ENDPOINT,
    //AUTH_LOGIN_ENDPOINT,        
    AUTH_REGISTER_ENDPOINT,     
    //AUTH_LOGOUT_ENDPOINT,       
    //AUTH_REFRESH_TOKEN_ENDPOINT,
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
const securedPostRequestParams = {
    ...postRequestParams,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
};
const request = async (endopoint, initParams) => {
    const url = BASE_URL + endopoint;
    try
    {
        const response = await fetch(url, initParams);
        if (response.ok) {
            console.log(`Запрос выполнен`);
            const json = await response.json();
            return Promise.resolve([true, json]);
        } else {
            throw new Error(`Ошибка ${response.status}`);
        }
    }
    catch (error)
    {
        return Promise.reject([false, {error: error}]);
    }
};

const checkResult = (endpoint, result, success) => {
    if (!result || !success) {
        throw Error(`Сервер вернул ошибку: endpoint - ${endpoint}, result - ${result}, succes - ${success}`);
    }
};
const buildParams = (params, body) => { 
    return {...params, body: JSON.stringify(body)}
};
const makeRequest = async (endpoint, params) => {
    try {
        const [result, response] = await request(endpoint, params);
        checkResult(endpoint, result, response?.success);
        console.log('request succeded', endpoint, params, result);
        return Promise.resolve(response);
    } catch(error) {
        console.log('request failed', endpoint, params, error);
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
    const { name, order: {number} } = await makeRequest(ORDER_REQUEST_ENDPOINT,
        buildParams(postRequestParams, {ingredients}));
    return Promise.resolve({ name, number });
};


  export const requestPasswordReset = async (email) => {
    const {message} = await makeRequest(PASSWORD_RESET_ENDPOINT, buildParams(postRequestParams, {email}));
    return Promise.resolve({ message });
  };

  export const requestPasswordSet = async (passwort, token) => {
    const {message} = await makeRequest(PASSWORD_SET_ENDPOINT, buildParams(postRequestParams, {passwort, token}));
    return Promise.resolve({ message });
  };
  
  export const requestRegister = async (email, password, name) => {
    const response = await makeRequest(AUTH_REGISTER_ENDPOINT, 
        buildParams(securedPostRequestParams, {email, password, name}));
    return Promise.resolve(response);
  }