import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import { BurgerConstrctorModalOrder } from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { getOrder, CLOSE_ORDER } from '../../services/actions/orderDetails';
import { validBunId } from '../../utils/validation';
import { useHistory, useLocation } from 'react-router-dom';


const BurgerConstructorSubmit = () => {
  const authorized = useSelector(state => state.authInfo.success);
  const location = useLocation();
  const {ingredients, bun} = useSelector(state => ({ingredients: state.constructor.items, bun: state.constructor.bun}));
  const history = useHistory();
  const price = useSelector(state => state.constructor.price);
  const showOrder = useSelector(state => state.orderDetails.show);
  
  const dispatch = useDispatch();
  
  const handleOrderSubmit = useCallback(() => {
    if (!authorized) {
      history.replace({ pathname: "/login", state: { from: location } });
      return;
    }
    const arr = [...ingredients] ?? [];
    if (validBunId(bun)) {
      arr.splice(-1, 0, bun, bun);
    }
    dispatch(getOrder(arr));
  }, [dispatch, bun, ingredients, history, location, authorized ]);

  const handleCloseOrder = useCallback(() => dispatch(({type: CLOSE_ORDER})), [dispatch]);

  
  return (
    <div className={styles.main}>
      <p className="text text_type_digits-medium">
        {price}
      </p>
      <div className={styles.iconWrapper}>
        <CurrencyIcon type='primary' />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="primary" size="large" onClick={handleOrderSubmit} disabled={!price || !bun}>
            Оформить заказ
        </Button>
        <Modal isShowing={showOrder} toggle={handleCloseOrder}>
            <BurgerConstrctorModalOrder />
        </Modal>
      </div>
    </div>

  );
};


export default BurgerConstructorSubmit;