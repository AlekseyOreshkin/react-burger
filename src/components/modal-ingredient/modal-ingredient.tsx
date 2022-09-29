import {useCallback, useState} from "react";
import { Redirect, useLocation } from 'react-router-dom';
 import styles from './modal-ingredient.module.css';
 import { Modal } from '../modal/modal';
 import { BurgerIngredientsModalDetails } from '../burger-ingredients-modal-details/burger-ingredients-modal-details';


export const ModalIngredient = () => {
    const location=useLocation<{from: string;}>();
    const [show, setShow] = useState(true);
    const onHideDetails = useCallback( () => {
        setShow(false);
    }, [setShow]);
    if (!show) {
      return (<Redirect to={location?.state?.from || '/'} />);
    }
    return (
    <div className={styles.main}>
        <Modal  headerText='Детали ингредиента'  isShowing={show} toggle={onHideDetails}>
            <BurgerIngredientsModalDetails />
        </Modal>
    </div>
    );
}