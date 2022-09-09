import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React  from 'react';
import PropTypes from 'prop-types';
import styles from './common-form.module.css';


export const CommonForm = ({children, headerText, submitText, onSubmit}) => {
    return (<form className={styles.main} >
        <h1 className={`text text_type_main-medium ${styles.header}`}>{headerText}</h1>
        {children}
        <div className={styles.buttonWrapper}>
        <Button type='primary' size='large' onClick={onSubmit}>
            {submitText}
        </Button>
        </div>
      </form>);
}
CommonForm.defaultProps = {
    headerText: '',
    submitText: '',
    onSubmit: () => {}
};
CommonForm.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
    headerText: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};
