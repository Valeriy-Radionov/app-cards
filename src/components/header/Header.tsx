import React from 'react';
import style from "./Header.module.scss"
import {PATH} from "../../common/routes/Routs";
import {NavLink} from "react-router-dom";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../bll/store";
import {logoutTC} from "../../bll/authReducer";
import {LinearProgress} from "@mui/material";
import {ProfileBar} from "./profileBar/ProfileBar";

export const Header = () => {
    const status = useAppSelector((state: AppRootStateType) => state.app.status)
    const dispatch = useAppDispatch

    const logoutHandler = () => {
        dispatch(logoutTC)
    }

    return (
        <div className={style.container}>
            <div className={style.blockLink}>
                <NavLink to={PATH.PROFILE} className={style.linkNavBar}>PROFILE</NavLink>
                <ProfileBar/>
            </div>
            {status === "loading" && <LinearProgress/>}
        </div>
    )
        ;
};
