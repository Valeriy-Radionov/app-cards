import React, {useEffect, useRef, useState} from 'react';
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
        setExpand(prev => !prev)
    }
    const spanBarRef = useRef(null)

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (e.target !== spanBarRef.current) {
                return setExpand(false)
            }
        }
        document.body.addEventListener("click", closeDropdown)
        return () => document.body.removeEventListener("click", closeDropdown)
    }, [])

    return (
        <div className={style.container}>
            <span ref={spanBarRef} id={"nameUser"} className={style.nickName}
                  onClick={userSettingsHandler}>{nameUser}</span>
            <div className={style.avatar}
                 style={backgroundImg(`${avatarUser}`)}></div>
            {expand ? <ProfileBarSettings onClickHandler={userSettingsHandler}/> : null}
        </div>
    );
};

