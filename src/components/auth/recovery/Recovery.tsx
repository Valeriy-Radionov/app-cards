import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {EmailSentPage} from "./EmailSentPage";
import {recoveryAC, sendEmail} from "../../../bll/recoveryReducer";
import {useFormik} from "formik";
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import style from './Recovery.module.css'
import {PATH} from "../../../common/routings/Routs";
import {Link} from 'react-router-dom';

type FormikErrorType = {
    email?: string
}

export const Recovery = () => {
    const dispatch = useAppDispatch
    const isSentEmail = useAppSelector(state => state.recovery.isEmailSent)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            dispatch(sendEmail({
                email: values.email,
                from: '',
                message: `Follow the link to create a new password: <a href='http://localhost:3000/#/set-password/$token$'> Link</a></div>`
            }))
        },
        validate: values => {
            const errors: FormikErrorType = {}
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
        dispatch(recoveryAC(false))
    }, [])


    return (
        <div className={style.container}>
            <div className={style.block}>
                {!isSentEmail
                    ? <>
                        <h1 style={{fontWeight: 'bold', margin: '0 0 54.19px', fontSize: '26px'}}>Forgot your
                            password?</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <SuperInputText
                                style={{
                                    width: '100%',
                                    height: '30px',
                                    boxSizing: 'border-box',
                                    outline: 'none',
                                    border: "none",
                                    fontSize: '16px',
                                    opacity: 0.7
                                }}  {...formik.getFieldProps('email')}
                                placeholder={'Email'}/>
                            <hr style={{margin: 0, backgroundColor: "black", borderRadius: '1px', opacity: 0.5}}/>
                            <div style={{
                                color: 'red',
                                fontSize: '14px'
                            }}>{formik.errors.email ? formik.errors.email : null}</div>

                            <p style={{margin: '25.93px 0 0', opacity: '0.5'}}>Enter your email address and we will send
                                you further
                                instructions</p>
                            <div style={{margin: '65px 0 31px'}}>
                                <SuperButton style={{width: '100%'}}
                                             type={'submit'}>Send instructions</SuperButton>
                            </div>
                        </form>
                        <span style={{margin: '0 0 11px', fontWeight: 'bold', opacity: '0.5'}}>Did you remember yor password</span>
                        <Link style={{fontWeight: 'bold', color: '#366EFF', fontSize: '16px'}} to={PATH.LOGIN}>Try
                            logging in</Link>
                    </>
                    : <EmailSentPage/>
                }

            </div>

        </div>
    );
};

