import React from 'react';
import PropTypes from 'prop-types';
import buttonStyles from './app-header-button.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeaderButton = ({icon, text}) => {
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
        <button>
            <div className={buttonStyles.main}>
                <p className={buttonStyles.iconWrapper} >{getIcon(icon)}</p>
                <p className={`text text_type_main-default ${buttonStyles.textWrapper}`}>
                    {text}
                </p>
            </div>
        </button>
    );
};

AppHeaderButton.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};


export default AppHeaderButton;