import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { getOrder, closeOrder } from '../../services/actions/constructor';


const BurgerConstructorSubmit = () => {

  const {ingredients, bun} = useSelector(state => ({ingredients: state.constructor.items, bun: state.constructor.bun}));
  
  const price = useSelector(state => state.constructor.price);
  const showOrder = useSelector(state => state.orderDetails.show);
  
  const dispatch = useDispatch();
  
  const onOrderSubmit = () => {
    const arr = [...ingredients] ?? [];
    if (bun) {
      arr.splice(-1, 0, bun, bun);
    }
    if (price > 0) {
      dispatch(getOrder(arr));
    } else {
      alert("Надо добавить продукты в заказ");
    }
  };

  
  return (
    <div className={burgerConstructorSubmitStyles.main}>
      <p className="text text_type_digits-medium">
        {price}
      </p>
      <div className={burgerConstructorSubmitStyles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={burgerConstructorSubmitStyles.buttonWrapper}>
        <Button type="primary" size="large" onClick={onOrderSubmit}>
            Оформить заказ
        </Button>
        <Modal isShowing={showOrder} toggle={() => dispatch(closeOrder())}>
            <BurgerConstructorModalOrder />
        </Modal>
      </div>
    </div>

  );
};


export default BurgerConstructorSubmit;