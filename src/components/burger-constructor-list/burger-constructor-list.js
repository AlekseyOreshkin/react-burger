import React, { useContext } from 'react';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { isValidIngredientsData, isValidConstructorData } from '../../utils/validation';

import { ConstructorContext, IngredientsContext } from '../../contexts/contexts';

const BurgerConstructorList = () => {

  const [ingredientsData, ] = useContext(IngredientsContext);
  const [constructorData, ] = useContext(ConstructorContext);
  
  if (!isValidIngredientsData(ingredientsData) || !isValidConstructorData(constructorData)) {
    return null;
  }
  const topData = ingredientsData.find(o => o._id === constructorData.bun);
  const bottomData = topData;
  const selectedIngredients = ingredientsData.filter(o => constructorData.ingredients.includes(o._id));
  
  return (
    <div className={burgerConstructorListStyles.main}>
        <div className={burgerConstructorListStyles.topBun}>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>
        <div className={`${burgerConstructorListStyles.ingredients} scrollable`}>
            {selectedIngredients.map((data) => {
                return (
                  data && 
                    <div className={burgerConstructorListStyles.ingredientWrapper} key={data._id}>
                      <div className={burgerConstructorListStyles.dragIconWrapper}>
                        <DragIcon />
                      </div>
                      <ConstructorElement
                        text={data.name}
                        thumbnail={data.image}
                        price={data.price}/>
                    </div>
                  )
              })
            }
        </div>
        <div className={burgerConstructorListStyles.bottomBun}>
          <ConstructorElement
            type='bottom'
            isLocked='true'
            text={`${bottomData.name} (низ)`}
            thumbnail={bottomData.image}
            price={bottomData.price}/>
        </div>
    </div>
  );
};


export default BurgerConstructorList;