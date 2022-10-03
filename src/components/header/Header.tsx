import React from 'react';
import style from "./Header.module.scss"
import {PATH} from "../../common/routes/Routs";
import {NavLink} from "react-router-dom";
import SuperButton from "../../common/components/c2-SuperButton 2/SuperButton";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../bll/store";
import {logoutTC} from "../../bll/authReducer";
import {LinearProgress} from "@mui/material";

export const Header = () => {
    const status = useAppSelector((state: AppRootStateType) => state.app.status)
    const dispatch = useAppDispatch

    const logoutHandler = () => {
        dispatch(logoutTC)
    }

    return (
        <div className={style.container}>
            <div className={style.blockLink}>
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
            {status === "loading" && <LinearProgress/>}
        </div>
    )
        ;
};
