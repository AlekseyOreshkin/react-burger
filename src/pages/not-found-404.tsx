import styles from './not-found-404.module.css';


export const NotFound404Page = () => {
    return (
        <div className={styles.main} >
            <div className='form-area'>
                <p className="text text_type_main-large">Страница не найдена</p>
            </div>
        </div>
    );
}