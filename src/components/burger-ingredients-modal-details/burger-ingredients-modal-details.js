import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsModalDetailsStyles from './burger-ingredients-modal-details.module.css'

const detailsAccessors = [
    { name: 'Калории,ккал', accsessor: 'calories'},
    { name: 'Белки, г', accsessor: 'proteins'},
    { name: 'Жиры, г', accsessor: 'fat'},
    { name: 'Углеводы, г', accsessor: 'carbohydrates'},
]

const BurgerIngredientsModalDetails = ({ingredient}) => {

    return (
        <div className={burgerIngredientsModalDetailsStyles.main} >
           <img src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium'>{ingredient.name}</p>
            <div className={burgerIngredientsModalDetailsStyles.details}>
                {detailsAccessors.map( (o, i) => (
                    <div key={i} className={burgerIngredientsModalDetailsStyles.info}>
                        <p className={`text text_type_main-small`}>{o.name}</p>
                        <p className={`text text_type_main-medium`}>{ingredient[o.accsessor]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

BurgerIngredientsModalDetails.propTypes = {
    ingredient : PropTypes.object.isRequired
}

export default BurgerIngredientsModalDetails;