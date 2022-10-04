import { AppDispatch, AppThunk, IBasicAction } from "../../utils/types";

export const CHANGE_INGREDIENTS : 'CHANGE_INGREDIENTS' = 'CHANGE_INGREDIENTS';
export const SET_PRICE : 'SET_PRICE' = 'SET_PRICE';
export const UPDATE_INGREDIENTS_ORDER : 'UPDATE_INGREDIENTS_ORDER' = 'UPDATE_INGREDIENTS_ORDER';
export const CLEAR_CONSTRUCTOR : 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

interface IClearConstructorAction extends IBasicAction<typeof CLEAR_CONSTRUCTOR> {};

interface ISetPriceAction extends IBasicAction<typeof SET_PRICE> 
{
    price: number;
};

interface IConstructorAction extends IBasicAction<typeof CHANGE_INGREDIENTS>
{
    bun: string;
    items: string[];
};
interface IUpdateIngredientsAction extends IBasicAction<typeof UPDATE_INGREDIENTS_ORDER>
{
    items: string[];
};

export type TConstructorActions = IClearConstructorAction | ISetPriceAction | IConstructorAction | IUpdateIngredientsAction;


export const changeIngredients : AppThunk = (bun: string, items: string[]) => 
    (dispatch: AppDispatch) =>
         dispatch({type: CHANGE_INGREDIENTS, bun, items});

