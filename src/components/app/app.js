import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
  render() {

    return (
      <div >
        <AppHeader />
        <div className={appStyles.app}>
          <BurgerIngredients className = {appStyles.mainBox}/>
          <BurgerConstructor className = {appStyles.mainBox}/>
        </div>
      </div>
    );
  }
}

export default App;