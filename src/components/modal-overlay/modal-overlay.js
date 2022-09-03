import React from 'react';
import  PropTypes  from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ( {isShowing, toggle }) => {
    const handleClickAction = () => {
        if (isShowing) {
            toggle();
        }
    }
    return (
        <div className={styles.main} onClick={handleClickAction} />
    );
};

ModalOverlay.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
}
export default ModalOverlay;