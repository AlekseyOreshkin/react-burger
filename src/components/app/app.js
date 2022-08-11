import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
  render() {

    return (
      <div className='main-grid'>
        <AppHeader />
        <p className={`text_type_main-large ${appStyles.staticText}`}>Соберите бургер</p>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    );
  }
}

export default App;