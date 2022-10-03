import React from 'react';
import s from './Profile.module.scss'
import ProfileRename from "./profile_rename/ProfileRename";
import {  updateUserTC} from "../../bll/profileReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {UpdateUserType} from "../../api/auth/auth-api";
import updateAva from '../../assets/image/Union.svg'
import {backgroundImg} from "../../assets/style/utilitsBg";
import {logoutTC} from "../../bll/authReducer";
import {LinkArrow} from "../../common/components/Link/LinkArrow";

export const Profile = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user = useAppSelector(state => state.profile.user)

    const logout = () => {
        dispatch(logoutTC())
    }
    const updateUsers = (model: UpdateUserType) => {
        dispatch(updateUserTC(model))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <LinkArrow className={s.link} to={'/packs'} name={'Back to Packs List'}/>
            <div className={s.block}>
                <h1>Personal information</h1>
                <div className={s.imgBlock}>
                    <div className={s.avatar} style={backgroundImg(user? user.avatar || updateAva : '')}></div>
                    <div className={s.updatePhoto}>
                        <img src={updateAva} alt='' className={s.updateAva}/>
                    </div>
                </div>
                <ProfileRename name={user?  user.name : ''} changeTask={updateUsers}/>
                <div className={s.email}>
                    <span>{user? user.email : ''}</span>
                </div>
                <button onClick={logout} className={s.logoutBtn}>Log Out</button>
            </div>
        </div>
    )
}


