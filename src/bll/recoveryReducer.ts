import {authAPI, ForgotPasswordDataType} from "../api/auth/auth-api";
import {Dispatch} from "redux";

const RECOVERY = "RECOVERY/RECOVERY"

const initState = {
    isEmailSent: false
}
export const recoveryReducer = (state = initState, action: RecoveryActionsType): typeof initState => {
    switch (action.type) {
        case RECOVERY: {
            return {...state, isEmailSent: action.isEmailSent}
        }
        default:
            return state
    }
}

export type RecoveryActionsType = RecoveryACType

type RecoveryACType = ReturnType<typeof recoveryAC>
export const recoveryAC = (isEmailSent: boolean) => (
    {
        type: RECOVERY,
        isEmailSent,
    } as const
)
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
