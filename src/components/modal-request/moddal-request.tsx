import React from 'react';
import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from '../..';
import styles from './modal-request.module.css';

export const ModalRequest: FC = () => {
    const display = useSelector(state => state.authInfo.request || state.ingredients.request || state.orderDetails.request || state.resetPassword.request || state.feed.request);

    return display ? ReactDOM.createPortal(
        <React.Fragment>
        <div className={styles.main} style={{display: display ? 'flex' : 'none'}} >
            <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        </React.Fragment>, document.getElementById("react-modals")!)
    : null;
};