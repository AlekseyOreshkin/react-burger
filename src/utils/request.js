import { createRef } from 'react';
import {
    BASE_URL,
    INGREDIENTS_ENDPOINT,
    ORDER_REQUEST_ENDPOINT,
    PASSWORD_RESET_ENDPOINT,
    PASSWORD_SET_ENDPOINT
 } from './constants';

const request = async (endopoint, initParams = {headers: {'Content-Type': 'application/json'}}) => {
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
    try
    {
        const endpoint = INGREDIENTS_ENDPOINT;
        const [result, {success, data}] = await request(endpoint);
        checkResult(endpoint, result, success);
        const cats = [];
        data.map(o => o.type).forEach(type => { 
            
            if (!cats.find(c => c.type === type)) {
                cats.splice(0, 0, {type, name: mapIngredientCategoryName(type), ref: createRef()});
            }
        });
        return Promise.resolve([data, cats.sort((l,r) => l.type.localeCompare(r.type))]);
    }
    catch(error)
    {
        console.error(error);
        return Promise.reject(error);
    }
};

const postRequestParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};
  
export const requestOrder = async (ingredients) => {
    try {
        const endpoint = ORDER_REQUEST_ENDPOINT;
        const params = {...postRequestParams, body: JSON.stringify({ingredients: ingredients})};
        const [result, { name, order: {number}, success }] = await request(endpoint, params);
        checkResult(endpoint, result, success);
        return Promise.resolve({ name, number });
    } catch (error) {
        return Promise.reject();
    }
  };

  export const requestPasswordReset = async (email) => {
    try {
        const endpoint = PASSWORD_RESET_ENDPOINT;
        const params = {...postRequestParams, body: JSON.stringify({email: email})};
        const [result, { message, success }] = await request(endpoint, params);
        checkResult(endpoint, result, success);
        return Promise.resolve({ message });
    } catch (error) {
        return Promise.reject({ error });
    }
  };
  export const requestPasswordSet = async (passwort, token) => {
    try {
        const endpoint = PASSWORD_SET_ENDPOINT;
        const params = {...postRequestParams, body: JSON.stringify({passwort, token})};
        const [result, { message, success }] = await request(endpoint, params);
        checkResult(endpoint, result, success);
        return Promise.resolve({ message });
    } catch (error) {
        return Promise.reject({ error });
    }
  };
