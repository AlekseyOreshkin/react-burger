import React from 'react';
import  PropTypes  from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ( {isShowing, toggle }) => {
    const handleClickAction = (e) => {
        if (isShowing) {
            toggle();
        }
    }
    return (
        <div className={modalOverlayStyles.main} onClick={(e) => handleClickAction(e)}>
        </div>
    );
};

ModalOverlay.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
}
export default ModalOverlay;