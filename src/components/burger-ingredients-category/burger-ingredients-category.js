import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';


class BurgerIngredientsCategory extends React.Component {
  getName() {
    switch(this.props.type) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинки';
      default:
        return 'Соусы';
    }

  }
  render() {
    return (
    <div  className={burgerIngredientsCategory.main}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}>
            {this.getName()}
        </p>
        {this.props.children}
    </div>
    );
  }
}
BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
};

export default BurgerIngredientsCategory;