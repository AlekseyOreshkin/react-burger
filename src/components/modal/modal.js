import React from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useEscapeKey from './use-escape-key';


const Modal = (props) => {

    const closeModal = () => {
       if (props.isShowing) {
        props.toggle();
       }
    }
    
    useEscapeKey(() => {
        console.log('Escape pressed');
        closeModal();
    });

    const renderHeader = (text) => {
        return (<>
            <p className={`text text_type_main-large`}>
                {text?.length > 0 ? text : ' '}
            </p>
            <button className={modalStyles.closeButton} onClick={closeModal}><CloseIcon /></button>
    </>)}
    
    return props.isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div  className={modalStyles.main}>
            <div className='modal-grid'>
                <div className={modalStyles.modalHeader}>
                    {renderHeader(props.headerText)}
                </div>
                <div className={modalStyles.modalContent}>
                    {props.children}
                </div>
            </div>
        </div>
        <ModalOverlay isShowing={props.isShowing} toggle={props.toggle} />
        </React.Fragment>, document.getElementById("react-modals")
    ) : null;
};

Modal.propTypes = {
    isShowing: PropType.bool.isRequired,
    toggle: PropType.func.isRequired,
    headerText: PropType.string,
    children: PropType.element
}

export default Modal;