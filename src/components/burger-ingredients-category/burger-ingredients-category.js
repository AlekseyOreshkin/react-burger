import React from 'react';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';


class BurgerIngredientsCategory extends React.Component {
  render() {
    return (
    <div  className={burgerIngredientsCategory.main}>
        <p className="text text_type_main-large" style={{width: '100%'}}>
            {this.props.type === 'bun' ? 'Булки' 
            : this.props.type === 'main' ? 'Начинки'
            : 'Соусы'}
        </p>
        {this.props.children}
    </div>
    );
  }
}

export default BurgerIngredientsCategory;