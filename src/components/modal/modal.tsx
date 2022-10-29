import React, { useEffect, useCallback, FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
    isShowing: boolean;
    toggle: () => void;
    headerText: string;
};

export const Modal: FC<IProps> = (props) => {

    const isOpen = props.isShowing

    const closeModal = useCallback(() => {
        if (isOpen) {
            props.toggle();
        }
    }, [isOpen, props]);

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                closeModal();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen, closeModal])

    const renderHeader = (text: string) => {
        return (<>
            <p className={`text text_type_main-large`}>
                {text}
            </p>
            <button data-testid='close-modal-btn' className={styles.closeButton} onClick={closeModal}><CloseIcon type='primary' /></button>
        </>)
    }

    return props.isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className={styles.main}>
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
        </React.Fragment>, document.getElementById("react-modals")!)
        : null;
};
