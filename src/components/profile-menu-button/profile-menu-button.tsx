import { FC, useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styles from './profile-menu-button.module.css';

interface IProps {
    path?: string;
    text: string;
    onClick?: () => void;
}

export const ProfileMenuButton : FC<IProps> = ({path, text, onClick}) => {
    
    const { pathname } = useLocation();
    const history = useHistory();

    const active = useMemo(() => {
        return pathname.toLowerCase() === path?.toLowerCase();
    }, [pathname, path]);

    const handleClick= useCallback(() => {
        if (!active) {
            if (typeof onClick === 'function') {
                return onClick();
            } else {
                history.push({pathname: path, state: {from: pathname}});
            }
        }
    }, [active, history, path, onClick, pathname]);

    return (
        <button className={styles.main} onClick={handleClick}>
            <p className={`text text_type_main-medium${active ? '' : ' text_color_inactive'}`}>
                {text}
            </p>
        </button>
    );
};
