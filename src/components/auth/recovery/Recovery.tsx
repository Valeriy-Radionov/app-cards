import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {EmailSentPage} from "./EmailSentPage/EmailSentPage";
import {useFormik} from "formik";
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import style from './Recovery.module.css'
import authStyle from '../AuthPageContainer.module.css'
import {PATH} from "../../../common/routings/Routs";
import {Link} from 'react-router-dom';
import {sendEmail, toggleIsEmailSentAC} from "../../../bll/authReducer";


export const Recovery = () => {
    const dispatch = useAppDispatch
    const isSentEmail = useAppSelector(state => state.auth.isEmailSent)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            dispatch(sendEmail({
                email: values.email,
                from: '',
                message: process.env.NODE_ENV === 'development'
                    ? `Follow the link to create a new password: <a href='http://localhost:3000/#/set-password/$token$'> Link</a>`
                    : `Follow the link to create a new password: <a href='https://valeriy-radionov.github.io/app-cards/#/set-password/$token$'> Link</a>`
            }))
        },
        validate: values => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            }
        }

    })

    useEffect(() => {
        dispatch(toggleIsEmailSentAC(false))
    }, [])


    return (
        <div className={authStyle.container}>
            <div className={authStyle.block}>
                {!isSentEmail
                    ? <>
                        <h1 style={{margin: '0 0 54.19px'}}>Forgot your password?</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <SuperInputText
                                className={style.superInput}
                                {...formik.getFieldProps('email')}
                                placeholder={'Email'}
                            />
                            <hr />
                            <div className={style.error}>{formik.errors.email ? formik.errors.email : null}</div>
                            <p style={{margin: '25.93px 0 0', opacity: '0.5'}}>Enter your email address and we will send
                                you further
                                instructions</p>
                            <div style={{margin: '65px 0 31px'}}>
                                <SuperButton style={{width: '100%'}}
                                             type={'submit'}>Send instructions</SuperButton>
                            </div>
                        </form>
                        <span style={{margin: '0 0 11px', fontWeight: '600', opacity: '0.5'}}>Did you remember yor password</span>
                        <Link style={{fontWeight: '600', color: '#366EFF', fontSize: '16px'}} to={PATH.LOGIN}>Try
                            logging in</Link>
                    </>
                    : <EmailSentPage/>
                }
            </div>
        </div>
    );
};

