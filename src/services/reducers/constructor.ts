import { IConstructorCounter, IConstructorItem, TApplicationActions } from '../../utils/types';
import { calcConstructorCounter } from '../../utils/utils';
import {
    CHANGE_INGREDIENTS,
    SET_PRICE,
    UPDATE_INGREDIENTS_ORDER,
    CLEAR_CONSTRUCTOR,
} from '../actions/constructor';

interface IConstructorState {
    bun: string;
    items: IConstructorItem[];
    price: number;
    counter: IConstructorCounter;
}
export const initialConstructor: IConstructorState =
{
    bun: '', items: [], price: 0, counter: {}
};
export const constructorReducer = (state = initialConstructor, action: TApplicationActions) => {
    switch (action.type) {
        case CHANGE_INGREDIENTS:
            return {
                ...state,
                bun: action.bun,
                items: action.items,
                counter: calcConstructorCounter(action.bun, action.items)
            };
        case UPDATE_INGREDIENTS_ORDER:
            return {
                ...state,
                items: action.items
            };
        case CLEAR_CONSTRUCTOR:
            return initialConstructor;
        case SET_PRICE:
            return {
                ...state,
                price: action.price
            }
        default:
            return state;
    }
};
