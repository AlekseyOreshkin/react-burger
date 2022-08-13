import React from 'react';
import PropTypes from 'prop-types';
import buttonStyles from './app-header-button.module.css';
import { Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeaderButton = ({icon, text}) => {
    const getIcon = (icon) =>
    {
        if (icon === 'burger') {
            return (<BurgerIcon type="primary" />);
        } else if (icon === 'list') {
            return (<ListIcon type="primary" />);
        } else if (icon === 'profile') {
            return (<ProfileIcon type="primary" />);
        }
        return null; 
    }
    return (
        <Button type="secondary" size="medium" >
            <div className={buttonStyles.main}>
                <p className={buttonStyles.iconWrapper} >{getIcon(icon)}</p>
                <p className={`text text_type_main-default ${buttonStyles.textWrapper}`}>
                    {text}
                </p>
            </div>
        </Button>
    );
};

AppHeaderButton.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};


export default AppHeaderButton;