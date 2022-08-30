import React from 'react';
import {Login} from "../../components/auth/login/Login";
import {Route, Routes} from "react-router-dom";
import {SetPassword} from "../../components/auth/setPassword/SetPassword";
import {Recovery} from "../../components/auth/recovery/Recovery";
import {Registration} from "../../components/auth/registration/Registration";
import {Profile} from "../../components/profile/Profile";
import {SuperComponents} from "../../components/testSuperComponent/SuperComponents";
import {Error} from "../../components/error/Error";

export const PATH = {
    LOGIN: '/login',
    REGISTR: "/registration",
    PROFILE: "/profile",
    ERROR: "/error-404",
    RECOVERY: "/recovery-password",
    SET_PASSWORD: "/set-password",
    TEST: "all-super-components"
}
export const Routs = () => {
    return (
        <nav>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>} />
                <Route path={PATH.SET_PASSWORD} element={<SetPassword/>} />
                <Route path={PATH.RECOVERY} element={<Recovery/>} />
                <Route path={PATH.REGISTR} element={<Registration/>} />
                <Route path={PATH.PROFILE} element={<Profile/>} />
                <Route path={PATH.TEST} element={<SuperComponents/>} />
                <Route path={PATH.ERROR} element={<Error/>} />
            </Routes>
        </nav>

    );
};
