import { IIngredient, IIngredientCategory, TApplicationActions, TIngredientType } from "../../utils/types";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_ACTIVE_TAB,
} from "../actions/ingredients";

interface IIngredientsState {
    items: IIngredient[];
    cats: IIngredientCategory[];
    activeTab: TIngredientType;
    request: boolean;
    failed: boolean;
}

export const initialIngredients: IIngredientsState = {
    items: [],
    cats: [],
    activeTab: 'bun',
    request: false,
    failed: false
};

export const ingredientsReducer = (state = initialIngredients, action: TApplicationActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                request: true,
                failed: false
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                items: action.ingredients,
                cats: action.categories,
                request: false,
                failed: false
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                request: false,
                failed: true
            }
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.active
            }
        default:
            return state;
    }
};

