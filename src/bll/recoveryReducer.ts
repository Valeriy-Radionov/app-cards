import {authAPI, ForgotPasswordDataType, SetNewPasswordDataType} from "../api/auth/auth-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";

const TOGGLE_IS_EMAIL_SENT = 'RECOVERY/TOGGLE_IS_EMAIL_SENT'
const TOGGLE_IS_PASSWORD_CHANGED = 'RECOVERY/TOGGLE_IS_PASSWORD_CHANGED'


const initState = {
    isEmailSent: false,
    isPasswordChanged: false
}
export const recoveryReducer = (state = initState, action: RecoveryActionsType): typeof initState => {
    switch (action.type) {
        case TOGGLE_IS_EMAIL_SENT: {
            return {...state, isEmailSent: action.isEmailSent}
        }
        case TOGGLE_IS_PASSWORD_CHANGED:
            return {...state, isPasswordChanged: action.isPasswordChanged}
        default:
            return state
    }
}

//actions
export const toggleIsEmailSentAC = (isEmailSent: boolean) => ({type: TOGGLE_IS_EMAIL_SENT, isEmailSent,} as const)
export const toggleIsPasswordChangedAC = (isPasswordChanged: boolean) => ({
    type: TOGGLE_IS_PASSWORD_CHANGED,
    isPasswordChanged,
} as const)

//thunks
export const sendEmail = (forgotPasswordData: ForgotPasswordDataType) => (dispatch: Dispatch) => {
    authAPI.forgotPassword(forgotPasswordData)
        .then(() => {
            dispatch(toggleIsEmailSentAC(true))
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
                dispatch(toggleIsPasswordChangedAC(true))
                console.log(res.data)
            })
            .catch(res => {
                console.log(res.data.error)
            })
    }

//types
export type RecoveryActionsType =
    | ReturnType<typeof toggleIsEmailSentAC>
    | ReturnType<typeof toggleIsPasswordChangedAC>
