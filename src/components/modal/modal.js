import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const Modal = (props) => {

    const isOpen = props.isShowing 

    const closeModal = useCallback(() => {
       if (isOpen) {
        props.toggle();
       }
    }, [isOpen, props]);

    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeModal();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen, closeModal]) 

    const renderHeader = (text) => {
        return (<>
            <p className={`text text_type_main-large`}>
                {text?.length > 0 ? text : ' '}
            </p>
            <button className={styles.closeButton} onClick={closeModal}><CloseIcon /></button>
    </>)}
    
    return props.isShowing && ReactDOM.createPortal(
    <React.Fragment>
        <div  className={styles.main}>
            <div className='modal-grid'>
                <div className={styles.modalHeader}>
                    {renderHeader(props.headerText)}
                </div>
                <div className={styles.modalContent}>
                    {props.children}
                </div>
            </div>
        </div>
        <ModalOverlay isShowing={props.isShowing} toggle={props.toggle} />
    </React.Fragment>, document.getElementById("react-modals")
    ) ;
};

Modal.propTypes = {
    isShowing: PropType.bool.isRequired,
    toggle: PropType.func.isRequired,
    headerText: PropType.string,
    children: PropType.element
}

export default Modal;