import React from 'react';
import style from "./Login.module.scss"
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import {useFormik} from "formik";
import SuperCheckbox from "../../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../common/routings/Routs";
import {authAPI} from "../../../api/auth/auth-api";
import {loginTC} from "../../../bll/loginReducer";
import {useAppDispatch, useAppSelector} from "../../../bll/store";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn)

    // const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
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
            } else if (values.password.length < 8) {
                errors.password = "Password must be more 8 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
    const ping = () => {
        authAPI.login({email: 'ursegovnikolaj@gmail.com', password:'12345678', rememberMe: true})
    }
    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={style.container}>
            <div className={style.blockAuth}>
                <h1>Sign in</h1>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <label>email</label>
                    <SuperInputText {...formik.getFieldProps("email")}/>
                    {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                    <label>password</label>
                    <SuperInputText {...formik.getFieldProps("password")}/>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}
                    <SuperCheckbox className={style.checkbox} {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe}>Remember me</SuperCheckbox>
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