import { FC } from 'react';
import styles from './counter.module.css';
// сначала нарисовал свой, потом увидел в либе
export const Counter: FC<{ count: number | undefined }> = ({ count }) => {
    if (!count || count < 1) {
        return null;
    }
    return (
        <div className={styles.main}>
            <p className='text text_type_main-small'>{count}</p>
        </div>
    );
}