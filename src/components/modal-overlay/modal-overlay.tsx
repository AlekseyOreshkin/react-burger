import { FC } from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlay : FC<{isShowing: boolean, toggle: ()=> void}> = ( {isShowing, toggle }) => {
    const handleClickAction = () => {
        if (isShowing) {
            toggle();
        }
    }
    return (
        <div className={styles.main} onClick={handleClickAction} />
    );
};
