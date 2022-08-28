import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import BurgerConstructorModalOrder from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { getOrder, closeOrder } from '../../services/actions/orderDetails';


const BurgerConstructorSubmit = () => {

  const {ingredients, bun} = useSelector(state => ({ingredients: state.constructor.items, bun: state.constructor.bun}));
  
  const price = useSelector(state => state.constructor.price);
  const showOrder = useSelector(state => state.orderDetails.show);
  
  const dispatch = useDispatch();
  
  const onOrderSubmit = useCallback(() => {
    const arr = [...ingredients] ?? [];
    if (bun) {
      arr.splice(-1, 0, bun, bun);
    }
    dispatch(getOrder(arr));
  }, [dispatch, bun, ingredients]);

  
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-medium">
        {price}
      </p>
      <div className={styles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="primary" size="large" onClick={onOrderSubmit} disabled={!price || !bun}>
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