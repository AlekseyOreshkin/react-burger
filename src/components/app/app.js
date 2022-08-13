import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';


const App = () => {

  return (
    <div className='main-grid' >
      <AppHeader />
      <h1 className={`text_type_main-large ${appStyles.staticText}`}>Соберите бургер</h1>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;