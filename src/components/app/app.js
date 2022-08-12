import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
  render() {

    return (
      <div className='main-grid' style={{height: window.innerHeight}}>
        <AppHeader />
        <h1 className={`text_type_main-large ${appStyles.staticText}`}>Соберите бургер</h1>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    );
  }
}

export default App;