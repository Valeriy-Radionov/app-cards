import React, {useState} from 'react';
import style from "./ProfileBar.module.scss"
import {backgroundImg} from "../../../assets/style/utilitsBg";
import {useAppSelector} from "../../../bll/store";
import {ProfileBarSettings} from "./profileBarSettings/ProfileBarSettings";

type ProfileBarPropsType = {}
export const ProfileBar: React.FC<ProfileBarPropsType> = () => {
    const nameUser = useAppSelector(state => state.profile.user?.name)
    const avatarUser = useAppSelector(state => state.profile?.user?.avatar)
    const [expand, setExpand] = useState<boolean>(false)
    const userSettingsHandler = () => {
        setExpand(!expand)
    }
    //отловить клик вне компоненты для закрытия окна
    return (
        <div className={style.container}>
            <span className={style.nickName} onClick={userSettingsHandler}>{nameUser}</span>
            <div className={style.avatar}
                 style={backgroundImg(`${avatarUser}`)}></div>
            {expand ? <ProfileBarSettings onClickHandler={userSettingsHandler}/> : null}
        </div>
    );
};

