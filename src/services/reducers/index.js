import { combineReducers } from "redux";
import { ingredientsReducer, ingredientDetailsReducer } from "./ingredients";
import { constructorReducer, orderDetailsReducer } from "./constructor";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
});
