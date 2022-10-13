import { RootState, AppThunk, AppDispatch } from "..";
import { TApplicationActions } from "../services/actions";

export {
    type RootState,
    type AppThunk,
    type AppDispatch,
    type TApplicationActions
};

export type TIngredientName = 'Булки' | 'Начинки' | 'Соусы';
export type TIngredientType = 'bun' | 'main' | 'sauce';

export interface IIngredientCategory {
    name: TIngredientName;
    type: TIngredientType;
};

export interface IIngredient {
    _id: string;
    name: string;
    type: TIngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: 0
};

export interface IAuthUserInfo {
    email: string;
    name: string;
};

export interface IAuthToken {
    accessToken: string;
    refreshToken: string;
};

export type TAuthResponse = IAuthUserInfo & IAuthToken;

export interface ILogoutResponse {
    message: string;
};

export interface ILocationState {
    background: undefined;
};


export interface IProfileForm {
    name: string;
    email: string;
    password: string;
};

export interface IResetPasswordForm {
    password: string;
    token: string;
};

export interface ILoginForm {
    email: string;
    password: string;
};

export interface IBasicAction<T> {
    readonly type: T;
};

export interface ILocationState {
    from: {
        pathname: string;
    };
};

export const TFeedOrderStatusDone: 'done' = 'done';
export type TFeedOrderStatus = typeof TFeedOrderStatusDone;

export interface IFeedOrder<TNumber> {
    _id: string;
    ingredients: string[];
    status: TFeedOrderStatus;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: TNumber;
};

export interface IFeedOrdersMessage<TNumber> {
    success: boolean;
    orders: IFeedOrder<TNumber>[];
    total: number;
    totalToday: number;
};

export interface IConstructorCounter {
    [id: string]: number;
}
