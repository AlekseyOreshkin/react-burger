import React, { useMemo} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsCategory = ({type}) => {

  const {items, cats } = useSelector(state => state.ingredients);

  const cat = useMemo(() => cats.find(c => c.type === type), [cats, type]);
 
  return (
    <div className={burgerIngredientsCategory.main}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}  ref={cat.ref} >{cat.name}</p>
        {items.filter(ing => ing.type === type).map(ing => (
            <BurgerIngredientsCard key={ing._id} ingredient={ing}/>
        ))}

    </div>
  );
};

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

export default BurgerIngredientsCategory;