import React from 'react';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModal from '../modal/use-modal';
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';

const BurgerConstructorSubmit = () => {
  
  const makeOrder = useModal();
  
  return (
    <div className={burgerConstructorSubmitStyles.main}>
      <p className="text text_type_digits-medium">
        123 
      </p>
      <div className={burgerConstructorSubmitStyles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={burgerConstructorSubmitStyles.buttonWrapper}>
        <Button type="primary" size="large" onClick={makeOrder.toggle}>
            Оформить заказ
        </Button>
        <Modal {...makeOrder} >
            <BurgerConstructorModalOrder close={makeOrder.toggle}/>
        </Modal>
      </div>
    </div>

  );
};


export default BurgerConstructorSubmit;