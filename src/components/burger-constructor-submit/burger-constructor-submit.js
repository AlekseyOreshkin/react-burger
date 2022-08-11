import React from 'react';
import burgerConstructorSubmitStyles from './burger-constructor-submit.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerConstructorSubmit extends React.Component {
  render() {
    return (
    <div className={burgerConstructorSubmitStyles.main}>
      <p className="text text_type_digits-medium">
        123 
      </p>
      <div style={{paddingLeft: '9.5px'}}>
        <CurrencyIcon type='primary' />
      </div>
      <div style={{padding: '0  16px 0 40px'}}>
        <Button type="primary" size="large" onClick={() => {}}>
            Оформить заказ
        </Button>
      </div>
    </div>

    );
  }
}

export default BurgerConstructorSubmit;