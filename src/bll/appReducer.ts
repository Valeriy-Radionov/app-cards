import {AppThunk} from "./store";
import {authAPI} from "../api/auth/auth-api";
import { setProfileAC} from "./profileReducer";
import {handleServerNetworkError} from "../assets/utils/errors-utils";
import {isLoggedInAC} from "./authReducer";

const SET_ERROR = "APP/SET-ERROR"
const SET_STATUS = "APP/SET-STATUS"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        case "APP-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        case "APP/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }

}

export type AppActionType = AppInitializedACType | SetAppErrorACType | SetAppStatusACType

//actions

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => (
    {
        type: SET_STATUS,
        status
    } as const
)

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null | string) => (
    {
        type: SET_ERROR,
        error
    } as const
)

type AppInitializedACType = ReturnType<typeof appInitializedAC>

export const appInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP-INITIALIZED",
        payload: {
            isInitialized
        }
    } as const
}

//thunks

export const initializeAPPThunkCreator = (): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authAPI.isAuth()
            dispatch(isLoggedInAC(true))
            dispatch(setProfileAC(res.data))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        } finally {
            dispatch(appInitializedAC(true))
        }
    }
}


