import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsCategory = ({type, name, handleShowDetails}) => {

  const {items, cats } = useSelector(state => ({items: state.ingredients.items, cats: state.ingredients.cats}));
 
  return (
    <div className={burgerIngredientsCategory.main}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}  ref={cats.find(c => c.type === type).ref} >{name}</p>
        {items.filter(ing => ing.type === type).map(ing => (
            <BurgerIngredientsCard key={ing._id} ingredient={ing} showDetails={handleShowDetails}/>
        ))}

    </div>
  );
};

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  name: PropTypes.string.isRequired,
  handleShowDetails: PropTypes.func.isRequired,
};

export default BurgerIngredientsCategory;