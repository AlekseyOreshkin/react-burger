import { TAuthInfoActions } from "./authInfo";
import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TOrderDetailsActions } from "./orderDetails";
import { TResetPasswordActions } from "./resetPassword";


// Типизация всех экшенов приложения
export type TApplicationActions = 
    TAuthInfoActions 
    | TConstructorActions
    | TIngredientsActions 
    | TOrderDetailsActions
    | TResetPasswordActions;
