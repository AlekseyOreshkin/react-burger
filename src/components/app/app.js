import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ConstructorContext } from './constructor-context';
import { IngredientsContext } from './ingredients-context';
import { INGREDIENTS_URL } from '../../utils/constants';

const initialConstructorData = { bun: '',  ingredients: []};
const initialIngredientsData = [];

function isBun(ingredient) {
   return ingredient?.type === 'bun';
}
function getConstructorData(data) {
  if (data?.length > 0) {
    return {bun: (data.find(o => isBun(o))?._id), ingredients: (data.filter(o => !isBun(o)).map(o => o._id))};
    } 
    return initialConstructorData;
};

const App = () => {

  const [ingredientsData, setIngredientsData] = useState(initialIngredientsData);
  const [constructorData, setConstructorData] = useState(initialConstructorData);
  
  
  useEffect(() => {
    console.log('Загрузка ингредиентов');
    fetch(INGREDIENTS_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
        
      })
      .then(({success, data}) => {
        if (success) {
          console.log(`Загружено ингредиентов: ${data.length}`);
          setIngredientsData(data);
          setConstructorData(getConstructorData(data));
        } else {
          console.log('Неизвестный ответ сервера. Пока без обработки');
        }
      }).catch(error => {
        console.log(`Ошибка выполнения запроса: ${error}`);
      });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='main-grid' >
      <AppHeader />
      <h1 className={`text_type_main-large ${appStyles.staticText}`}>Соберите бургер</h1>
      <IngredientsContext.Provider value={[ingredientsData, setIngredientsData]}>
        <BurgerIngredients />
        <ConstructorContext.Provider value={[constructorData, setConstructorData]}>
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;