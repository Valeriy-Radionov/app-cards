import {
    authAPI,
    ForgotPasswordDataType,
    LoginDataType,
    RegistrationDatatype,
    SetNewPasswordDataType
} from "../api/auth/auth-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";
import {setProfileAC} from "./profileReducer";
import {setAppStatusAC} from "./appReducer";
import {Dispatch} from "redux";


const LOGGEDIN = "PROFILE/LOGGEDIN"
const TOGGLE_IS_EMAIL_SENT = 'RECOVERY/TOGGLE_IS_EMAIL_SENT'
const TOGGLE_IS_PASSWORD_CHANGED = 'RECOVERY/TOGGLE_IS_PASSWORD_CHANGED'
const REGISTRATION = "REGISTRATION/REGISTRATION"


export type InitStateType = {
    isLoggedIn: boolean
    isEmailSent: boolean
    isPasswordChanged: boolean
    isRegistrationSuccessful: boolean
}
const initState = {
    isLoggedIn: false,
    isEmailSent: false,
    isPasswordChanged: false,
    isRegistrationSuccessful: false
}


export const authReducer = (state = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case LOGGEDIN: {
            return {
                ...state,
                isLoggedIn: action.payload.log
            }
        }
        case TOGGLE_IS_EMAIL_SENT: {
            return {
                ...state,
                isEmailSent: action.payload.isEmailSent
            }
        }
        case TOGGLE_IS_PASSWORD_CHANGED: {
            return {
                ...state,
                isPasswordChanged: action.payload.isPasswordChanged
            }
        }
        case REGISTRATION: {
            return {
                ...state,
                isRegistrationSuccessful: action.payload.isRegistrationSuccessful
            }
        }
        default:
            return state
    }
}

// Types
export type AuthActionsType = IsLoggedInACType
    | ToggleIsEmailSentACType
    | ToggleIsPasswordChangedACType
    | RegistrationACType
type IsLoggedInACType = ReturnType<typeof isLoggedInAC>
type ToggleIsEmailSentACType = ReturnType<typeof toggleIsEmailSentAC>
type ToggleIsPasswordChangedACType = ReturnType<typeof toggleIsPasswordChangedAC>
type RegistrationACType = ReturnType<typeof registrationAC>


// AC
export const isLoggedInAC = (log: boolean) => {
    return {
        type: LOGGEDIN,
        payload: {
            log
        }
    } as const
}
export const toggleIsEmailSentAC = (isEmailSent: boolean) => {
    return {
        type: TOGGLE_IS_EMAIL_SENT,
        payload: {
            isEmailSent
        }
    } as const
}
export const toggleIsPasswordChangedAC = (isPasswordChanged: boolean) => {
    return {
        type: TOGGLE_IS_PASSWORD_CHANGED,
        payload: {
            isPasswordChanged
        }
    } as const
}
export const registrationAC = (isRegistrationSuccessful: boolean) => {
    return {
        type: REGISTRATION,
        payload: {
            isRegistrationSuccessful
        }
    } as const
}


// login and logout TCs
export const loginTC = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(isLoggedInAC(true))
        dispatch(setProfileAC(res.data))
        dispatch(setAppStatusAC("idle"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
    }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await authAPI.logOut()
        dispatch(isLoggedInAC(false))
        dispatch(setProfileAC(null))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// recovery TCs
export const sendEmail = (forgotPasswordData: ForgotPasswordDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.forgotPassword(forgotPasswordData)
        .then(() => {
            dispatch(toggleIsEmailSentAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
            alert(e.response.data.error)
        })
}
export const setNewPassword = (setNewPasswordData: SetNewPasswordDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.setNewPassword(setNewPasswordData)
        .then(res => {
            dispatch(toggleIsPasswordChangedAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)        })
}

// registration TC
export const registrationTC = (data: RegistrationDatatype): AppThunk => {
    return (dispatch: Dispatch) => {
        setAppStatusAC("loading")
        authAPI.registration(data).then(() => {
            dispatch(registrationAC(true))
            setAppStatusAC("loading")
        }).catch(e => {
            handleServerNetworkError(e, dispatch)
        })
    }
}