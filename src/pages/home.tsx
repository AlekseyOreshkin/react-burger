import styles from './home.module.css';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export const HomePage = () => {
  return (<>
    <h1 className={`text_type_main-large ${styles.staticText}`}>Соберите бургер</h1>
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  </>);
}