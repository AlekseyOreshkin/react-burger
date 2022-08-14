import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModal from '../modal/use-modal';
import Modal from '../modal/modal';
import BurgerIngredientsModalDetails from '../burger-ingredients-modal-details/burger-ingredients-modal-details';

const BurgerIngredientsCard = ({ ingredient }) => {

  const showDetails = useModal();

  return (<>
    <div  className={burgerIngredientsCard.main} onClick={showDetails.toggle}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={burgerIngredientsCard.priceWrapper}>
          <p className={`text_type_digits-default ${burgerIngredientsCard.textWrapper}`}>
              {ingredient.price}
          </p>
          <div className={burgerIngredientsCard.logoWrapper}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p className="text text_type_main-small">
            {ingredient.name}
        </p>
    </div>
    <Modal  headerText='Детали ингредиента' {...showDetails} >
        <BurgerIngredientsModalDetails ingredient={ingredient} />
    </Modal>
  </>);
};

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
export default BurgerIngredientsCard;