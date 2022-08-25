import React, { useRef} from 'react';
import { useSelector } from 'react-redux';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import { BurgerIngredientsModalDetails } from '../burger-ingredients-modal-details/burger-ingredients-modal-details';

const BurgerIngredientsBox = () => {

  const {cats} = useSelector(state => ({items: state.ingredients.items, cats: state.ingredients.cats}));
  
  const ingredientRef = useRef(null);
  const showModal = useModal();
  
  const handleShowDetails = (ingredient) => {
    console.log(ingredient);
    ingredientRef.current = ingredient;
    showModal.toggle();
  };

  return (<>
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {cats.map(cat => (
          <BurgerIngredientsCategory type={cat.type} key={cat.type} name={cat.name} handleShowDetails={handleShowDetails}/> 
        ))}
    </div>
    <Modal  headerText='Детали ингредиента' {...showModal} >
        <BurgerIngredientsModalDetails ingredient={ingredientRef.current} />
    </Modal>
  </>);
}

export {
   BurgerIngredientsBox
};