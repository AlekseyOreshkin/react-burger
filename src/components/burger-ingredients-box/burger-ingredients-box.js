import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import { IngredientsCategories }  from '../../utils/data'
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import BurgerIngredientsModalDetails from '../burger-ingredients-modal-details/burger-ingredients-modal-details';


const BurgerIngredientsBox = ({ data }) => {
  
  const ingredientRef = useRef(null);
  const showModal = useModal();
  const handleShowDetails = () => {
    showModal.toggle();
  }

  return (<>
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {IngredientsCategories.map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {data.filter(ing => ing.type === cat).map((ing, index) => (
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

BurgerIngredientsBox.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerIngredientsBox;