import React from 'react';
import { useSelector } from 'react-redux';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';


const BurgerConstructorSubmit = () => {

  const price = useSelector(state => state.constructor.price);
  const orderNumber = useSelector(state => state.orderDetails.number);

  const makeOrder = useModal();

  return (
    <div className={burgerConstructorSubmitStyles.main}>
      <p className="text text_type_digits-medium">
        {price}
      </p>
      <div className={burgerConstructorSubmitStyles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={burgerConstructorSubmitStyles.buttonWrapper}>
        <Button type="primary" size="large" onClick={() => {}}>
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