import React, { useContext, useEffect, useReducer} from 'react';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { isValidIngredientsData, isValidConstructorData } from '../../utils/validation';
import { ORDER_REQUEST_URL } from '../../utils/constants';

import { ConstructorContext } from '../app/constructor-context';
import { IngredientsContext } from '../app/ingredients-context';

function calc(selectedIngredients) {
  return selectedIngredients?.map(o => Number(o.price)).reduce((prev, curr) => prev + curr);
}

const initialState = { ingredients: [], price: 0, order: '', name: '' };

function reducer (state, action)  {
  switch(action.type)
  {
    case 'set_order':
      return {
          ...state,
          order: action.order,
          name: action.name
      };
      case 'set_price':
        return {
            ...state,
            ingredients: action.ingredients.map(o => o._id),
            price: calc(action.ingredients)
        };
      case 'reset':
      return initialState;
    default:
      throw Error(`Unknonw actiontype ${action.type}`);
  }
};

const BurgerConstructorSubmit = () => {

  const [ingredientsData, ] = useContext(IngredientsContext);
  const [constructorData, ] = useContext(ConstructorContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const makeOrder = useModal();

  useEffect( () => {
    dispatch({type: 'reset'});
  }, []);

  useEffect( () => {
      if (!isValidIngredientsData(ingredientsData) || !isValidConstructorData(constructorData)) {
        dispatch({type: 'reset'});
      }
      else {
        const selectedBun = ingredientsData.find(o => o._id === constructorData.bun);
        const selectedIngredients = ingredientsData.filter(o => constructorData.ingredients.includes(o._id));
          dispatch({type: 'set_price', ingredients: [...selectedIngredients, selectedBun, selectedBun]});
      }
    }, [ingredientsData, constructorData]
  );
  
  
  const requestOrder = () => {
    console.log('Запрос заказа');
    fetch(ORDER_REQUEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: state.ingredients
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then(({ name, order: {number}, success }) => {
        if (success) {
          console.log(`Получен номер заказа: ${number}, Название: ${name}`);
          dispatch({type: 'set_order', order: String(number), name: name});
          makeOrder.toggle();
        } else {
          console.log('Неизвестный ответ сервера. Пока без обработки');
        }
      }).catch(error => {
        console.log(`Ошибка выполнения запроса: ${error}`);
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