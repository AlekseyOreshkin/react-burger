
export type TIngredientBunType = 'bun';
export type TIngredientMainType = 'main';
export type TIngredientSpiceType = 'sauce';


export type TIngredientType = TIngredientBunType | TIngredientMainType | TIngredientSpiceType;

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
}

export interface IIngredientsState
{
    items: IIngredient[];
    cats: TIngredientType[];
    activeTab: TIngredientType;
    request: boolean;
    failed: boolean;
}

interface IAuthUserInfo
{
    email: string;
    name: string;
}
export interface IAuthInfoState
{
    request: boolean;
    success: boolean;
    user: IAuthUserInfo;
}

export interface IOrderDetailsState
{ 
    number: string;
    name: string;
    request: boolean;
    failed: boolean;
    show: boolean
};

export interface IState
{
    constructor: IConstructorState;
    ingredients: IIngredientsState;
    authInfo: IAuthInfoState;
    orderDetails: IOrderDetailsState;
}

