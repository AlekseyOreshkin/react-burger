import React, { createRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsCategory = ({type, name, handleShowDetails}) => {

  const {items, active } = useSelector(state => ({items: state.ingredients.items, active: state.ingredients.activeTab}));
  
  const catRef = createRef();

  useEffect(() => {
    if (type === active) {
        catRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active, catRef, type]);

  return (
    <div className={burgerIngredientsCategory.main} ref={catRef}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}>{name}</p>
        {items.filter(ing => ing.type === type).map(ing => (
            <BurgerIngredientsCard key={ing._id} ingredient={ing} showDetails={handleShowDetails}/>
        ))}

    </div>
  );
};

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  name: PropTypes.string.isRequired,
  handleShowDetails: PropTypes.func.isRequired
};

export default BurgerIngredientsCategory;