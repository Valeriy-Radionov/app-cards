import React from 'react';
import {Login} from "../../components/auth/login/Login";
import {Route, Routes} from "react-router-dom";
import {SetPassword} from "../../components/auth/recovery/setPassword/SetPassword";
import {Recovery} from "../../components/auth/recovery/Recovery";
import {Registration} from "../../components/auth/registration/Registration";
import {Profile} from "../../components/profile/Profile";
import {Error} from "../../components/error/Error";
import Cards from "../../components/cards/Cards";
import {Packs} from "../../components/packs/Packs";
import {PrivateRoutes} from "./PrivateRoutes";

export enum PATH {
    LOGIN = "/login",
    REGISTR = "/registration",
    PROFILE = "/profile",
    ERROR = "*",
    RECOVERY = "/recovery-password",
    SET_PASSWORD = "/set-password/:token",
    TEST = "all-super-components",
    PACKS = "/packs"
}

export const Routs = () => {
    return (
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.PACKS} element={<Packs/>}/>
                    <Route path={'/cards/:id'} element={<Cards/>}/>
                </Route>
                <Route path={'/'} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.SET_PASSWORD} element={<SetPassword/>}/>
                <Route path={PATH.RECOVERY} element={<Recovery/>}/>
                <Route path={PATH.REGISTR} element={<Registration/>}/>
                <Route path={PATH.ERROR} element={<Error/>}/>
            </Routes>
    );
};