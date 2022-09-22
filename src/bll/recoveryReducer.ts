import {authAPI, ForgotPasswordDataType, SetNewPasswordDataType} from "../api/auth/auth-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";

const RECOVERY = 'RECOVERY/RECOVERY'
const SET_NEW_PASSWORD = 'RECOVERY/SET_NEW_PASSWORD'


const initState = {
    isEmailSent: false,
    isPasswordChanged: false
}
export const recoveryReducer = (state = initState, action: RecoveryActionsType): typeof initState => {
    switch (action.type) {
        case RECOVERY: {
            return {...state, isEmailSent: action.isEmailSent}
        }
        case SET_NEW_PASSWORD:
            return {...state, isPasswordChanged: action.isPasswordChanged}
        default:
            return state
    }
}


export type RecoveryActionsType =
    | ReturnType<typeof recoveryAC>
    | ReturnType<typeof setNewPasswordAC>
export const recoveryAC = (isEmailSent: boolean) => ({type: RECOVERY, isEmailSent,} as const)
export const setNewPasswordAC = (isPasswordChanged: boolean) => ({type: SET_NEW_PASSWORD, isPasswordChanged,} as const)
export const sendEmail = (forgotPasswordData: ForgotPasswordDataType) => (dispatch: Dispatch) => {
    authAPI.forgotPassword(forgotPasswordData)
        .then(() => {
            dispatch(recoveryAC(true))
        })
        .catch(res => {
            console.log(res)
            alert(res.response.data.error)
        })
}
export const setNewPassword = (setNewPasswordData: SetNewPasswordDataType): AppThunk =>
    (dispatch) => {
        authAPI.setNewPassword(setNewPasswordData)
            .then(res => {
                dispatch(setNewPasswordAC(true))
                console.log(res.data)
            })
            .catch(res => {
                console.log(res.data.error)
            })
    }
