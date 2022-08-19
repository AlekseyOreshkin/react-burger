import React from 'react';
import PropTypes from 'prop-types';
import burgerConstrctorModelOrderStyles from './burger-constructor-modal-order.module.css'
import confirmImage from '../../images/modal-order/done.png';


const BurgerConstrctorModelOrder = ({order, close}) => {

    return (
        <div className={burgerConstrctorModelOrderStyles.main} >
            <p className={`text text_type_digits-large ${burgerConstrctorModelOrderStyles.orderNumber}`}>{order}</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <button className={burgerConstrctorModelOrderStyles.confirmButton}
                style={{backgroundImage : `url(${confirmImage})`}} onClick={close} /> 
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-small ${burgerConstrctorModelOrderStyles.comment}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

BurgerConstrctorModelOrder.propTypes = {
    order: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
}

export default BurgerConstrctorModelOrder;
