import { SET_ORDER, SET_PRICE, RESET } from '../../actions/actions';

const initialState = { ingredients: [], price: 0, order: '', name: '' };


function reducer (state, action)  {
    switch(action.type)
    {
      case SET_ORDER:
        return {
            ...state,
            order: action.order,
            name: action.name
        };
        case SET_PRICE:
          return {
              ...state,
              ingredients: action.ingredients,
              price: action.price
          };
        case RESET:
        return initialState;
      default:
        throw Error(`Unknonw actiontype ${action.type}`);
    }
  };

  export {
    reducer,
    initialState
  }