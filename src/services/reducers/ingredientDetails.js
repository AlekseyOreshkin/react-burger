import { 
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
} from "../actions/ingredientDetails";



const initialIngredientDetails = { id: '', show: false };

const ingredientDetailsReducer = (state = initialIngredientDetails, action) => {
    switch(action.type) {
        case SHOW_INGREDIENT_DETAILS:
            return {
                ...state,
                id: action.id,
                show: true
            };
        case HIDE_INGREDIENT_DETAILS:
            return {
                ...state,
                show: false
            };
        default:
            return {...state};
    }
};

export default ingredientDetailsReducer;