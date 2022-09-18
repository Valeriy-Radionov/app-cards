import React from 'react';


import style from "./Login.module.scss"
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import {useFormik} from "formik";
import SuperCheckbox from "../../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/routings/Routs";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    return (
        <div className={style.container}>
            <div className={style.blockAuth}>
                <h1>Sign in</h1>
                <form className={style.form}>
                    <label>email</label>
                    <SuperInputText/>
                    <label>password</label>
                    <SuperInputText/>
                    <SuperCheckbox className={style.checkbox}>Remember me</SuperCheckbox>
                    <NavLink to={PATH.RECOVERY} className={style.forgotLink}>Forgot Password</NavLink>
                    <SuperButton type={'submit'}>Sign In</SuperButton>
                    <label className={style.descriptionInfo}>Already have an account?</label>
                    <NavLink to={PATH.REGISTR} className={style.signUpLink}>Sign Up</NavLink>
                </form>
            </div>
        </div>
    );
};

