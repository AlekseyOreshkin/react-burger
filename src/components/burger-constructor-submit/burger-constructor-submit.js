import React, { useContext, useEffect, useReducer} from 'react';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { isValidIngredientsData, isValidConstructorData } from '../../utils/validation';
import { ORDER_REQUEST_ENDPOINT } from '../../utils/constants';
import { request } from '../../utils/request';
import { reducer, initialState } from './reduser';
import { SET_ORDER, SET_PRICE, RESET } from '../../actions/actions';

import { ConstructorContext, IngredientsContext } from '../../contexts/contexts';

const orderRequestParams = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};


const BurgerConstructorSubmit = () => {

  const [ingredientsData, ] = useContext(IngredientsContext);
  const [constructorData, ] = useContext(ConstructorContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const makeOrder = useModal();

  useEffect( () => {
    dispatch({type: RESET});
  }, []);
  

  useEffect( () => {
      if (!isValidIngredientsData(ingredientsData) || !isValidConstructorData(constructorData)) {
        dispatch({type: RESET});
      }
      else {
        const selectedBun = ingredientsData.find(o => o._id === constructorData.bun);
        const selectedIngredients = [...(ingredientsData.filter(o => constructorData.ingredients.includes(o._id))), selectedBun, selectedBun];
        const price = selectedIngredients.map(o => Number(o.price)).reduce((prev, curr) => prev + curr);
        dispatch({type: SET_PRICE, ingredients: selectedIngredients.map(o => o._id), price: price} );
      }
    }, [ingredientsData, constructorData] 
  ); 
  
  
  const requestOrder = () => {
    const params = {...orderRequestParams, body: JSON.stringify({ingredients: state.ingredients})};
    request(ORDER_REQUEST_ENDPOINT, params)
    .then(([result, { name, order: {number}, success }]) => {
      if (result && success) {
        console.log(`Получен номер заказа: ${number}, Название: ${name}`);
        dispatch({type: SET_ORDER, order: String(number), name: name});
        makeOrder.toggle();
      } else {
        console.log('Ошибка выполнения запроса');}})
    .catch(([ ,error]) => {
      console.log(`Ошибка выполнения запроса ${error}`);
    });
  };

  return (
    <div className={burgerConstructorSubmitStyles.main}>
      <p className="text text_type_digits-medium">
        {state.price}
      </p>
      <div className={burgerConstructorSubmitStyles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={burgerConstructorSubmitStyles.buttonWrapper}>
        <Button type="primary" size="large" onClick={requestOrder}>
            Оформить заказ
        </Button>
        <Modal {...makeOrder} >
            <BurgerConstructorModalOrder order={state.order} close={makeOrder.toggle}/>
        </Modal>
      </div>
    </div>

  );
};


export default BurgerConstructorSubmit;