import React, {useState} from 'react';
import authStyle from '../../AuthPageContainer.module.css'
import style from "./SetPassword.module.css";
import SuperButton from "../../../../common/c2-SuperButton 2/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {useFormik} from "formik";
import displayPassword from '../../../../common/image/display-password.png'
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../../common/routings/Routs";
import {setNewPassword, setNewPasswordAC} from "../../../../bll/recoveryReducer";

export const SetPassword = () => {
    const [toggleTypeInput, setToggleTypeInput] = useState(false)
    const dispatch = useAppDispatch
    const isPasswordChanged = useAppSelector(state => state.recovery.isPasswordChanged)
    const {token} = useParams()
    const navigate = useNavigate()

    if (isPasswordChanged) {
        dispatch(setNewPasswordAC(false))
        navigate(PATH.LOGIN)
    }


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: values => {
            dispatch(setNewPassword({password: values.password, resetPasswordToken: token ? token : ''}))
        },
        validate: values => {
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            } else if (values.password.length < 8) {
                return {
                    password: 'Password should be '
                }
            }
        }
    })

    const onDisplayPasswordClick = () => {
        setToggleTypeInput(!toggleTypeInput)
    }
    return (
        <div className={authStyle.container}>
            <div className={authStyle.block}>
                <h1 style={{margin: '0 0 82.99px'}}>Create new password</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className={style.inputBlock}>
                        <input
                            className={style.superInput}
                            {...formik.getFieldProps('password')}
                            placeholder={'Password'}
                            type={toggleTypeInput ? 'text' : 'password'}
                        />
                        <img
                            className={style.displayPasswordImg}
                            src={displayPassword} alt="display password"
                            onClick={onDisplayPasswordClick}/>
                    </div>
                    <hr/>
                    <div className={style.error}>{formik.errors.password ? formik.errors.password : null}</div>
                    <p style={{margin: '18px 0 0', opacity: '0.5'}}>Create new password and we will send you further
                        instructions to email</p>
                    <div style={{margin: '42px 0 0'}}>
                        <SuperButton style={{width: '100%'}}
                                     type={'submit'}>Create New Password</SuperButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

