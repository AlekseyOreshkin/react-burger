import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor-modal-order.module.css'
import confirmImage from '../../images/modal-order/done.png';
import { closeOrder } from '../../services/actions/orderDetails';


const BurgerConstrctorModelOrder = () => {
    const order = useSelector(state => state.orderDetails.number);
    const dispatch = useDispatch();
    const onCloseOrder = useCallback(() => {
        dispatch(closeOrder());
    }, [dispatch]);
  
    return (
        <div className={styles.main} >
            <p className={`text text_type_digits-large ${styles.orderNumber}`}>{order}</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <button className={styles.confirmButton}
                style={{backgroundImage : `url(${confirmImage})`}} onClick={onCloseOrder} /> 
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-small ${styles.comment}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default BurgerConstrctorModelOrder;
