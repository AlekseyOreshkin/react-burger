import { FC } from 'react';
import { useSelector } from '../..';
import styles from './modal-request.module.css';

export const ModalRequest: FC = () => {
    const display = useSelector(state => state.authInfo.request || state.ingredients.request || state.orderDetails.request || state.resetPassword.request);

    return (
        <div className={styles.main} style={{display: display ? 'flex' : 'none'}} >
            <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};