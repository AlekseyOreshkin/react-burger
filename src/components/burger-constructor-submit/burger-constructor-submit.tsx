import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor-submit.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '../ui/button'
import { Modal } from '../modal/modal';
import { BurgerConstrctorModalOrder } from '../burger-constructor-modal-order/burger-constructor-modal-order';
import { getOrder, CLOSE_ORDER } from '../../services/actions/orderDetails';
import { useHistory, useLocation } from 'react-router-dom';
import { IConstructorState, IState } from '../../utils/types';



export const BurgerConstructorSubmit = () => {
  const authorized = useSelector<IState, boolean>(state => state.authInfo.success);
  const location = useLocation();
  const {items: ingredients, bun} = useSelector<IState, IConstructorState>(state => state.constructor);
  const history = useHistory();
  const price = useSelector<IState, number>(state => state.constructor.price);
  const showOrder = useSelector<IState, boolean>(state => state.orderDetails.show);
  
  const dispatch = useDispatch();
  
  const handleOrderSubmit = (event: SyntheticEvent) => {
    event.persist();
    event.stopPropagation();
    if (!authorized) {
      history.replace({ pathname: "/login", state: { from: location } });
      return;
    }
    const arr = [...ingredients] ?? [];
    if (bun?.length > 0) {
      arr.splice(-1, 0, bun, bun);
    }
    dispatch(getOrder(arr));
  };

  const handleCloseOrder = ()  => {
    dispatch({type: CLOSE_ORDER});
  };

  
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
      </div>
      <Modal isShowing={showOrder} toggle={handleCloseOrder} headerText=' '>
          <BurgerConstrctorModalOrder />
      </Modal>
    </div>

  );
};