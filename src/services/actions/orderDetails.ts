
import { requestOrder } from "../../utils/request";
import { IBasicAction } from "../../utils/types";
import { CLEAR_CONSTRUCTOR } from "./constructor";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED  = 'GET_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

interface IAction extends IBasicAction
{
    name: string;
    number: number;
}
export const getOrder = ( ingredients : string[] ) : any => {
    return (dispatch : (arg: IAction | IBasicAction) => void) => {
        dispatch({type: GET_ORDER_REQUEST});
        requestOrder(ingredients).then(({ name, number }) => {
            dispatch({type: GET_ORDER_SUCCESS, name, number});
            dispatch({type: CLEAR_CONSTRUCTOR});
        }).catch(() => {
            dispatch({type: GET_ORDER_FAILED});
        })
    }
};

