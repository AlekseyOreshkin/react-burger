import burgerIngredients from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from '../burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsBox } from '../burger-ingredients-box/burger-ingredients-box';
import { CategoryContext, initialCategoryContext } from '../../hooks/category-context';


export const BurgerIngredients = () => {
  
  return (
  <div  className={burgerIngredients.main}>
    <CategoryContext.Provider value={initialCategoryContext}>
      <BurgerIngredientsTabs />
      <BurgerIngredientsBox />
    </CategoryContext.Provider>
  </div>
  );
};
