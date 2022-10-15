import { FC } from "react";
import { ProfileMenuButton } from "../profile-menu-button/profile-menu-button";
import styles from './profile-menu.module.css';

interface IProps {
    onLogout: () => void;
}

export const ProfileMenu: FC<IProps> = ({ onLogout }) => {

    return (
        <div className={styles.main}>
            <ProfileMenuButton path='/profile' text='Профиль' />
            <ProfileMenuButton path='/profile/orders' text='История заказов' />
            <ProfileMenuButton text='Выход' onClick={onLogout} />
            <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}

