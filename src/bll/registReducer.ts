import {Dispatch} from "redux";
import {authAPI, RegistrationDatatype} from "../api/auth/auth-api";
import {appInitializedAC} from "./appReducer";
import {AppThunk} from "./store";

const REGISTRATION = "REGISTRATION/REGISTRATION"
const SETERRORMESSAGE = "REGISTRATION/SETERRORMESSAGE"

export type RegistrationStateType = {
    isRegistrationSuccessful:boolean,
    errorMessage:string
}

export type RegistrationActionsType = RegistrationACType
 | SetErrorMessageACType

type RegistrationACType = ReturnType<typeof registrationAC>
type SetErrorMessageACType = ReturnType<typeof setErrorMessageAC>

const initState = {
    isRegistrationSuccessful:false,
    errorMessage:''
}

export const registrationReducer = (state:RegistrationStateType = initState, action: RegistrationActionsType): typeof initState => {
    switch (action.type) {
        case "REGISTRATION/REGISTRATION": {
            return {...state,isRegistrationSuccessful: action.payload.isRegistrationSuccessful}
        }
        case "REGISTRATION/SETERRORMESSAGE": {
            return {...state,errorMessage: action.payload.message}
        }
        default: return state
    }
}





export const registrationAC = (isRegistrationSuccessful:boolean) => (
    {
        type: REGISTRATION,
        payload:{
            isRegistrationSuccessful
        }
    } as const
)
export const setErrorMessageAC = (message:string) => (
    {
        type: SETERRORMESSAGE,
        payload:{
            message
        }
    } as const
)


export const registrationTC = (data:RegistrationDatatype):AppThunk => {
    return (dispatch:Dispatch) => {
        dispatch(appInitializedAC(false))
        authAPI.registration(data).then( () => {
          dispatch(registrationAC(true))
        }).catch( err => {
            dispatch(setErrorMessageAC(err.response.data.error))
        }).finally( () => {
            dispatch(appInitializedAC(true))
        })
    }
}