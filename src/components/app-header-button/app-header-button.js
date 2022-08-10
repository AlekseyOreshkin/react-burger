import React from 'react';
import buttonStyles from './app-header-button.module.css';
import { Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeaderButton extends React.Component {
    getIcon = (icon) =>
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
  render() {
    return (
        <Button type="secondary" size="medium" >
            {this.getIcon(this.props.icon)}
            <span className="text text_type_main-default">{this.props.children}</span>
        </Button>
    );
  }
}

export default AppHeaderButton;