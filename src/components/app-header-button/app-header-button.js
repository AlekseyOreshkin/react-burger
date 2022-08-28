import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-header-button.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeaderButton = ({icon, text, active}) => {
    const getIcon = (icon) =>
    {
        switch(icon)
        {
            case 'burger':
                return (<BurgerIcon type="primary" />);
            case 'list':
                return (<ListIcon type="primary" />);
            case 'profile':
                return (<ProfileIcon type="primary" />);
            default:
                return null;
        }
    }
    
    return (
        <button className={styles.main}>
            <p className={styles.iconWrapper} >{getIcon(icon)}</p>
            <p className={`text text_type_main-default ${styles.textWrapper} ${active ? styles.active : ''}`}>
                {text}
            </p>
        </button>
    );
};
AppHeaderButton.defaultProps = {
    icon: '',
    text: '',
    active: false
};
AppHeaderButton.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool
};


export default AppHeaderButton;