import React, { useCallback, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import Modal from '../modal/modal';
import { BurgerIngredientsModalDetails } from '../burger-ingredients-modal-details/burger-ingredients-modal-details';
import { setActiveTab, hideIngredientDetails } from '../../services/actions/ingredients';


const BurgerIngredientsBox = () => {

  const cats = useSelector(state => state.ingredients.cats);
  const showDetails = useSelector(state => state.ingredientDetails.show);

  const dispatch = useDispatch();
  
  const positionRef = createRef();

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
  },[cats, positionRef, dispatch]);

  return (<>
    <div  className={`${burgerIngredientsBox.main} scrollable`} onScroll={onScroll} ref={positionRef}>
        {cats.map(cat => (<BurgerIngredientsCategory 
          key={cat.type} type={cat.type}/>))};
    </div>
    <Modal  headerText='Детали ингредиента'  isShowing={showDetails} toggle={() => dispatch(hideIngredientDetails())}>
        <BurgerIngredientsModalDetails />
    </Modal>
  </>);
}

export {
   BurgerIngredientsBox
};