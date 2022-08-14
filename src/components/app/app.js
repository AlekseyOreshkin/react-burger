import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientsUrl } from '../../utils/constants';

const App = () => {

  const [state, setState] = useState({ingredients: {success: false, data: []} });
  
  useEffect(() => {
    console.log('Загрузка ингредиентов');
    fetch(IngredientsUrl)
      .then(response => response.json())
      .then(({success, data}) => {
        if (success) {
          console.log(`Загружено ингредиентов: ${data.length}`);
          setState({ ...state, ingredients: {success: success, data: data} });
        } else {
          console.log('Неизвестный ответ сервера. Пока без обработки');
        }
      }).catch(error => {
        console.log(`Ошибка выполнения запроса: ${error}`);
      });

  }, []);
  return (
    <div className='main-grid' >
      <AppHeader />
      <h1 className={`text_type_main-large ${appStyles.staticText}`}>Соберите бургер</h1>
      <BurgerIngredients data = {state.ingredients.data}/>
      <BurgerConstructor data = {state.ingredients.data}/>
    </div>
  );
}

export default App;