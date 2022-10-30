import { TApplicationActions } from "../actions";
import { ingredientsReducer, initialIngredients } from "./ingredients";

describe('Ingregients reducer', () => {
    it('Should return initial ingredients state', () => {
        const action : TApplicationActions = {type: "CLOSE_ORDER"};
        expect(ingredientsReducer(undefined, action)).toEqual(initialIngredients);
    });

    it('Should return requested ingredients state', () => {
        const action : TApplicationActions = {
            type: 'GET_INGREDIENTS_REQUEST'
        };
        const expectedState = {
            ...initialIngredients,
            request: true
        };

        expect(ingredientsReducer(initialIngredients, action)).toEqual(expectedState);
    })

    it('Should return ingredients state on success', () => {
        const action : TApplicationActions = {
            type: 'GET_INGREDIENTS_SUCCESS',
            ingredients: [],
            categories: []
        };
        const expectedState = {
            ...initialIngredients,
        };

        expect(ingredientsReducer(initialIngredients, action)).toEqual(expectedState);
    })

    it('Should return ingredients state on failure', () => {
        const action : TApplicationActions = {
            type: 'GET_INGREDIENTS_FAILED'
        };
        const expectedState = {
            ...initialIngredients,
            failed: true
        };

        expect(ingredientsReducer(initialIngredients, action)).toEqual(expectedState);
    })

    it('Should return ingredients state on active tab', () => {
        const tab = "bun";
        const action : TApplicationActions = {
            type: 'SET_ACTIVE_TAB',
            active: tab
        };
        const expectedState = {
            ...initialIngredients,
            activeTab: tab
        };

        expect(ingredientsReducer(initialIngredients, action)).toEqual(expectedState);
    })
});