import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
  render() {
    return (
    <div className={`${burgerConstructorStyles.main} mt-5 ml-5`}>
    </div>
    );
  }
}

export default BurgerConstructor;