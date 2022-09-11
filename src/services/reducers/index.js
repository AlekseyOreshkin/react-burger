import { combineReducers } from "redux";
import ingredientsReducer from "./ingredients";
import constructorReducer from "./constructor";
import orderDetailsReducer from "./orderDetails";
import resetPasswordReducer from "./resetPassword";
import { authInfoReducer } from "./authInfo";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    authInfo: authInfoReducer
});
