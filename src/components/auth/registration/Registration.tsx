import React from 'react';
import {useFormik} from "formik";
import style from "../login/Login.module.scss";
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/routings/Routs";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import {registrationTC} from "../../../bll/registReducer";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {Login} from "../login/Login";


type FormikErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}
export const Registration = () => {

    let errorMessage = useAppSelector( state =>state.registration.errorMessage )
    let isRegistrationSuccessful = useAppSelector( state =>state.registration.isRegistrationSuccessful )
    let dispatch = useAppDispatch

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmedPassword: ""
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
            } else if (values.password.length < 7) {
                errors.password = "Password must be more 7 symbols"
            }

            if (!values.confirmedPassword) {
                errors.confirmedPassword = "required"
            } else if (values.confirmedPassword.length < 7) {
                errors.confirmedPassword = "Password must be more 7 symbols"
            } else if (values.password !== values.confirmedPassword) {
                errors.confirmedPassword = "password does not match"
            }
            return errors;
        },
        onSubmit: values => {
            let newRegistration = {
                email:values.email,
                password:values.password
            }
            dispatch(registrationTC(newRegistration))
            formik.resetForm()
        },
    });

    return (
        !isRegistrationSuccessful ?
        <div className={style.container}>
            <div className={style.blockAuth}>
                <h1>Registration</h1>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <label>email</label>
                    <SuperInputText
                        {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>
                        {formik.errors.email}</div>}
                    <label>password</label>
                    <SuperInputText
                    type = {"password"}
                    {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>
                        {formik.errors.password}</div>}
                    <label>confirm password</label>
                    <SuperInputText
                        type = {"password"}
                        {...formik.getFieldProps('confirmedPassword')}
                    />
                    {formik.touched.confirmedPassword && formik.errors.confirmedPassword && <div style={{color: 'red'}}>
                        {formik.errors.confirmedPassword}</div>}
                    <SuperButton type={'submit'}>Sign Up</SuperButton>
                    <label className={style.descriptionInfo}>Already have an account?</label>
                    <NavLink to={PATH.LOGIN} className={style.signUpLink}>Sign in</NavLink>
                    <div style={{color: 'red'}}>{errorMessage}</div>
                </form>
            </div>
        </div>
            :
            <Login/>
    );
};

