import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {EmailSentPage} from "./EmailSentPage";
import {sendEmail} from "../../../bll/recoveryReducer";
import {useFormik} from "formik";
import SuperInputText from "../../../common/c1-SuperInputText 2/SuperInputText";
import SuperButton from "../../../common/c2-SuperButton 2/SuperButton";
import style from './Recovery.module.css'

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
                message: `password recovery link: <a href='http://localhost:3000/#/set-password/$token$'>link</a></div>`
            }))
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
        }

    })


    return (
        <div className={style.container}>
            <div className={style.block}>
                {!isSentEmail
                    ?
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label>Email</label>
                        </div>
                        <SuperInputText {...formik.getFieldProps('email')}/>
                        <div>{formik.errors.email ? formik.errors.email : null}</div>
                        {/*<input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)}/>*/}
                        <SuperButton type={'submit'}>Send</SuperButton>
                    </form>
                    : <EmailSentPage/>
                }
            </div>

        </div>
    );
};

