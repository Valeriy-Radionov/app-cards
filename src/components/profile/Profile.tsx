import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import ProfileRename from "./profile_rename/ProfileRename";
import {initializeProfileTC, logoutTC, updateUserTC} from "../../bll/profileReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {UpdateUserType} from "../../api/auth/auth-api";

export const Profile = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn)
    const user = useAppSelector(state => state.profile.user)
    useEffect(() => {
        dispatch(initializeProfileTC())
    }, [])

    const logout = () => {
        dispatch(logoutTC())
    }
    const updateUsers = (model:UpdateUserType) => {
        dispatch(updateUserTC(model))
    }

    if(!isLoggedIn) {
        return <Navigate  to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <div className={s.block}>
                <h1>Personal information</h1>
                <img src="" alt=""/>
                <ProfileRename name={user.name} changeTask={updateUsers}/>
                <div className={s.email}>
                    <span>{user.email}</span>
                </div>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>

    )
}


