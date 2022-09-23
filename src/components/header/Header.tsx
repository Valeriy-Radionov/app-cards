import React from 'react';
import style from "./Header.module.css"
import {PATH} from "../../common/routings/Routs";
import {NavLink} from "react-router-dom";
import SuperButton from "../../common/c2-SuperButton 2/SuperButton";
import {useAppDispatch} from "../../bll/store";
import {logoutTC} from "../../bll/profileReducer";

export const Header = () => {

    const dispatch = useAppDispatch

    const logoutHandler = () => {
        dispatch(logoutTC)
    }

    return (
        <div className={style.container}>
            {/*<NavLink to={PATH.LOGIN} className={style.linkNavBar}>LOGIN</NavLink>*/}
            {/*<NavLink to={PATH.REGISTR} className={style.linkNavBar}>REGISTRATION</NavLink>*/}
            {/*<NavLink to={PATH.SET_PASSWORD} className={style.linkNavBar}>SET PASSWORD</NavLink>*/}
            {/*<NavLink to={PATH.RECOVERY} className={style.linkNavBar}>RECOVERY PASSWORD</NavLink>*/}
            <NavLink to={PATH.PROFILE} className={style.linkNavBar}>PROFILE</NavLink>
            {/*<NavLink to={PATH.TEST} className={style.linkNavBar}>ALL COMPONENTS</NavLink>*/}
            {/*<NavLink to={PATH.ERROR} className={style.linkNavBar}>ERROR 404 NOT FOUND</NavLink>*/}
            {/*<SuperButton onClick={logoutHandler}>Logout︎</SuperButton>*/}
            {/*<SuperButton>Menu︎</SuperButton>*/}
        </div>
    );
};
