    import React from 'react';
import style from "./Login.module.scss"
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import {useFormik} from "formik";
import SuperCheckbox from "../../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/routings/Routs";
import {authAPI} from "../../../api/auth/auth-api";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = "required"
            } else if (values.password.length < 6) {
                errors.password = "Password must be more 6 symbols"
            }
            return errors;
        },
        onSubmit: values => {
        },
    });
    const ping = () => {
        authAPI.login({email: 'alexkas2511@gmail.com', password:'123456789', rememberMe: false})
    }
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
            <button onClick={ping}>ping</button>
        </div>
    );
};