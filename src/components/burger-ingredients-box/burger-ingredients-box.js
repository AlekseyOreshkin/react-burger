import React, { useRef, useCallback, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import useModal from '../../hooks/use-modal';
import Modal from '../modal/modal';
import { BurgerIngredientsModalDetails } from '../burger-ingredients-modal-details/burger-ingredients-modal-details';
import { setActiveTab } from '../../services/actions/ingredients';


const BurgerIngredientsBox = () => {

  const {cats} = useSelector(state => ({items: state.ingredients.items, cats: state.ingredients.cats}));
  const dispatch = useDispatch();
  
  const ingredientRef = useRef(null);
  const positionRef = createRef();

  const showModal = useModal();
  
  const handleShowDetails = (ingredient) => {
    console.log(ingredient);
    ingredientRef.current = ingredient;
    showModal.toggle();
  };

  const onScroll = useCallback( (e) => {
    const getYPos = (ref) => Math.abs(Math.floor(ref.current.getBoundingClientRect().top));
    const parentTop = positionRef.current.getBoundingClientRect().top + 2;
    const closestCat = {type: cats[0].type, pos: getYPos(cats[0].ref)};
    cats.forEach(cat => {
      if (closestCat.type === cat.type) {
          return;
      }
      const top = Math.abs(parentTop - getYPos(cat.ref));
      if (closestCat.pos > top)
      {
        closestCat.type = cat.type;
        closestCat.pos = top;
      }
    });
    dispatch(setActiveTab(closestCat.type));
    //console.log(parentTop, 'set active', closestCat.type, closestCat.pos );
    
  },[cats, positionRef, dispatch]);

  return (<>
    <div  className={`${burgerIngredientsBox.main} scrollable`} onScroll={onScroll} ref={positionRef}>
        {cats.map(cat => (<BurgerIngredientsCategory 
          key={cat.type} type={cat.type} name={cat.name}
          handleShowDetails={handleShowDetails}/>))};
    </div>
    <Modal  headerText='Детали ингредиента' {...showModal} >
        <BurgerIngredientsModalDetails ingredient={ingredientRef.current} />
    </Modal>
  </>);
}

export {
   BurgerIngredientsBox
};