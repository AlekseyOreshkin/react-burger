import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    SET_ACTIVE_TAB
} from "../actions/ingredients";


export const initialIngredients  = {items: [], cats: [], activeTab: 'bun', request: false, failed: false};

export const ingredientsReducer = (state = initialIngredients, action ) => {
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
                activeTab: action.cat
            }
        default:
            return state;
    }
};

