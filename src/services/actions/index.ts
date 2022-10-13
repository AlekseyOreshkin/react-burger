import { TAuthInfoActions } from "./auth-info";
import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TOrderDetailsActions } from "./order-details";
import { TResetPasswordActions } from "./reset-password";
import { TSocketMiddlewareActions } from "./socket-middleware";


// Типизация всех экшенов приложения
export type TApplicationActions =
    TAuthInfoActions
    | TConstructorActions
    | TIngredientsActions
    | TOrderDetailsActions
    | TResetPasswordActions
    | TSocketMiddlewareActions;
