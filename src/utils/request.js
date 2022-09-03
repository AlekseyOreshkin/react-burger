import { createRef } from 'react';
import { BASE_URL, INGREDIENTS_ENDPOINT, ORDER_REQUEST_ENDPOINT } from './constants';

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


export const getIngredientsRequest = async () => {
    try
    {
        const [result, {success, data}] = await request(INGREDIENTS_ENDPOINT);
        checkResult(INGREDIENTS_ENDPOINT, result, success);
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
  
export const getOrderRequest = async (ingredients) => {
    try {
        const params = {...postRequestParams, body: JSON.stringify({ingredients: ingredients})};
        const [result, { name, order: {number}, success }] = await request(ORDER_REQUEST_ENDPOINT, params);
        checkResult(ORDER_REQUEST_ENDPOINT, result, success);
        return Promise.resolve({ name, number });
        //makeOrder.toggle();
    } catch (error) {
        return Promise.reject();
    }
  };
