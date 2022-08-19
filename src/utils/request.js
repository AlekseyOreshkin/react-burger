import { BASE_URL} from './constants';

export async function request (endopoint, initParams = {headers: {'Content-Type': 'application/json'}}) {
    const url = BASE_URL + endopoint;
    console.log(`Request to ${url}`);
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
}