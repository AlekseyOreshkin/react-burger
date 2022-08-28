import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import burgerConstrctorModelOrderStyles from './burger-constructor-modal-order.module.css'
import confirmImage from '../../images/modal-order/done.png';
import { closeOrder } from '../../services/actions/orderDetails';


const BurgerConstrctorModelOrder = () => {
    const order = useSelector(state => state.orderDetails.number);
    const dispatch = useDispatch();
  
    return (
        <div className={burgerConstrctorModelOrderStyles.main} >
            <p className={`text text_type_digits-large ${burgerConstrctorModelOrderStyles.orderNumber}`}>{order}</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <button className={burgerConstrctorModelOrderStyles.confirmButton}
                style={{backgroundImage : `url(${confirmImage})`}} onClick={() => dispatch(closeOrder())} /> 
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-small ${burgerConstrctorModelOrderStyles.comment}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default BurgerConstrctorModelOrder;
