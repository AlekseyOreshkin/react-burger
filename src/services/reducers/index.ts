import { combineReducers } from "redux";
import { ingredientsReducer, initialIngredients} from "./ingredients";
import { constructorReducer, initialConstructor } from "./constructor";
import { orderDetailsReducer, initialOrderDetails } from "./order-details";
import { resetPasswordReducer, initialResetPassword } from "./reset-password";
import { authInfoReducer, initialAuthState } from "./auth-info";
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
    feed: wsReducer
});
