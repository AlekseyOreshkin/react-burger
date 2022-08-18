import React, {useRef, useContext} from 'react';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerIngredientsModalDetails from '../burger-ingredients-modal-details/burger-ingredients-modal-details';
import { IngredientCategoriesContext, IngredientsContext } from '../../contexts/contexts';

const BurgerIngredientsBox = () => {
  
  const [ingregientsData, ] = useContext(IngredientsContext);
  const [ingredientsCategories, ] = useContext(IngredientCategoriesContext);
  const ingredientRef = useRef(null);
  const showModal = useModal();
  const handleShowDetails = () => {
    showModal.toggle();
  }

  return (<>
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {Array.from(ingredientsCategories.types).map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {ingregientsData.filter(ing => ing.type === cat).map((ing) => (
                    <BurgerIngredientsCard key={ing._id} ingredient={ing} ingredientRef={ingredientRef} showDetails={handleShowDetails}/>
                ))}
            </BurgerIngredientsCategory>
        ))}
    </div>
    <Modal  headerText='Детали ингредиента' {...showModal} >
        <BurgerIngredientsModalDetails ingredient={ingredientRef.current} />
    </Modal>
  </>);
}

export default BurgerIngredientsBox;