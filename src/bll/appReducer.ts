import {AppThunk} from "./store";
import {authAPI} from "../api/auth/auth-api";
import {isLoggedInAC} from "./profileReducer";
import {handleServerNetworkError} from "../utils/errors-utils";

const SET_ERROR = "APP/SET-ERROR"

const initialState = {
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        case "APP-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }

}

export type AppActionType = AppInitializedACType | SetAppErrorACType

//actions

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
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        } finally {
            dispatch(appInitializedAC(true))
        }
    }
}


