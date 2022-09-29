import { FC, ReactElement, useMemo } from 'react';
import styles from './app-header-button.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom';

const getIcon = (icon : string) : ReactElement | null => {
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
};

interface IProps {
    icon: string;
    text: string;
    path?: string;
};


export const AppHeaderButton : FC<IProps> = ({ icon, text, path}) => {

    const { pathname } = useLocation();

    const active = useMemo(() => {
        return pathname.toLowerCase() === path?.toLowerCase();
    }, [pathname, path]);

    
    return (
        <Link className={styles.main} to={ {pathname: path ?? '', state: { from: pathname }} } >
            <p className={styles.iconWrapper} >{getIcon(icon)}</p>
            <p className={`text text_type_main-default ${styles.textWrapper} ${active ? styles.active : ''}`}>
                {text}
            </p>
        </Link>
    );
};
