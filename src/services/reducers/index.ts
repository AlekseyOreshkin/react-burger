import { combineReducers } from "redux";
import { ingredientsReducer, initialIngredients} from "./ingredients";
import { constructorReducer, initialConstructor } from "./constructor";
import { orderDetailsReducer, initialOrderDetails } from "./orderDetails";
import { resetPasswordReducer, initialResetPassword } from "./resetPassword";
import { authInfoReducer, initialAuthState } from "./authInfo";
import { initialWsState, wsReducer } from "./socket-middleware";

export const preloadedState = {
    ingredients: initialIngredients,
    constructor: initialConstructor,
    orderDetails: initialOrderDetails,
    resetPassword: initialResetPassword,
    authInfo: initialAuthState,
    wsState: initialWsState
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    authInfo: authInfoReducer,
    wsReducer: wsReducer
});
