import { IConstructorCounter, IConstructorItem, TApplicationActions } from "../../utils/types";
import { CHANGE_INGREDIENTS, CLEAR_CONSTRUCTOR, SET_PRICE, UPDATE_INGREDIENTS_ORDER } from "../actions/constructor";
import { CLOSE_ORDER } from "../actions/order-details";
import { constructorReducer, initialConstructor } from "./constructor";

describe('Constructor reducer', () => {
    it('Should return initial constructor state', () => {
        const action : TApplicationActions = {type: CLOSE_ORDER};
        expect(constructorReducer(undefined, action)).toEqual(initialConstructor);
    });
    const bun : string = 'bun';
    const items : IConstructorItem[] = [];
    const counter : IConstructorCounter = { "bun" : 2 };

    it('Should return ingredients state on success', () => {
        const action : TApplicationActions = {
            type: CHANGE_INGREDIENTS,
            bun,
            items,
        };
        const expectedState = {
            ...initialConstructor,
            bun,
            items,
            counter
        };

        expect(constructorReducer(initialConstructor, action)).toEqual(expectedState);
    })

    it('Should return constructor state on update order', () => {
        const action : TApplicationActions = {
            type: UPDATE_INGREDIENTS_ORDER,
            items
        };
        const expectedState = {
            ...initialConstructor,
            items,
        };

        expect(constructorReducer(initialConstructor, action)).toEqual(expectedState);
    })

    it('Should return constructor state on clear constructor', () => {
        const action : TApplicationActions = {
            type: CLEAR_CONSTRUCTOR,
        };

        expect(constructorReducer(initialConstructor, action)).toEqual(initialConstructor);
    })

    it('Should return constructor state on set price', () => {
        const price = 0;
        const action : TApplicationActions = {
            type: SET_PRICE,
            price
        };
        const expectedState = {
            ...initialConstructor,
            price
        };

        expect(constructorReducer(initialConstructor, action)).toEqual(expectedState);
    })
});
