import React from "react";

export type TIngredientName = 'Булки' | 'Начинки' | 'Соусы';
export type TIngredientType = 'bun' | 'main' | 'sauce';

export interface IIngredientCategory
{
    name: TIngredientName;
    ref: React.RefObject<HTMLParagraphElement>;
    type: TIngredientType;
};

export interface IIngredient
{
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

export interface IConstructorState
{
    bun: string;
    items: string[];
    price: number;
};

export interface IIngredientsState
{
    items: IIngredient[];
    cats: IIngredientCategory[];
    activeTab: TIngredientType;
    request: boolean;
    failed: boolean;
};

export interface IAuthUserInfo
{
    email: string;
    name: string;
};

export interface IAuthToken 
{
    accessToken: string;
    refreshToken: string;
};

export type TAuthResponse = IAuthUserInfo & IAuthToken;

export interface ILogoutResponse
{
    message: string;
};

export interface IAuthInfoState
{
    request: boolean;
    success: boolean;
    user: IAuthUserInfo;
};

export interface IOrderDetailsState
{ 
    number: string;
    name: string;
    request: boolean;
    failed: boolean;
    show: boolean
};

export interface IResetPasswordState
{ 
    message: string;
    step: string;
    request: boolean;
    failed: boolean;
};

export interface IState
{
    resetPassword: IResetPasswordState;
    constructor: IConstructorState;
    ingredients: IIngredientsState;
    authInfo: IAuthInfoState;
    orderDetails: IOrderDetailsState;
};

export interface ILocationState
{
    background: undefined;
};


export interface IProfileForm
{
    name: string;
    email: string;
    password: string;
};

export interface IResetPasswordForm
{
   password: string;
   token: string;
};

export interface ILoginForm
{
    email: string;
    password: string;
};

export interface IBasicAction 
{
    type: string;
};

export interface ILocationState
{
    from: {
        pathname: string;
    };
}
