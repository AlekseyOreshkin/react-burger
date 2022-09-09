import { combineReducers } from "redux";
import ingredientsReducer from "./ingredients";
import ingredientDetailsReducer from "./ingredientDetails";
import constructorReducer from "./constructor";
import orderDetailsReducer from "./orderDetails";
import resetPasswordReducer from "./resetPassword";
import { authInfoReducer } from "./authInfo";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    authInfo: authInfoReducer
});
