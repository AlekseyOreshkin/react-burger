import styles from './ingredient.module.css';
import { BurgerIngredientsModalDetails } from '../components/burger-ingredients-modal-details/burger-ingredients-modal-details';

export const IngredientPage = () => {
    return (
        <div className={styles.main} >
            <div className={`form-area ${styles.box}`}>
              <h1 className={`text text_type_main-large ${styles.header}`}>Детали ингредиента</h1>
              <BurgerIngredientsModalDetails />
            </div>
        </div>
      );
}