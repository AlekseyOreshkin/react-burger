import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { getOrder } from '../../services/actions/constructor';


const BurgerConstructorSubmit = () => {

  const {ingredients, bun} = useSelector(state => ({ingredients: state.constructor.items, bun: state.constructor.bun}));
  const price = useSelector(state => state.constructor.price);
  const orderNumber = useSelector(state => state.orderDetails.number);
  const dispatch = useDispatch();
  const makeOrder = useModal();

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

  useEffect(() => {
    if (orderNumber) {
      makeOrder.toggle();
    } 
  // eslint-disable-next-line
}, [orderNumber]);


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
        <Modal {...makeOrder} >
            <BurgerConstructorModalOrder order={orderNumber} close={makeOrder.toggle}/>
        </Modal>
      </div>
    </div>

  );
};


export default BurgerConstructorSubmit;