import { AppThunk} from "./store";
import {Dispatch} from "redux";

const initialState = {
    isInitialized: false
}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        case "APP-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        default:
            return state
    }

}

export type AppActionType = AppinitializedACType


type AppinitializedACType = ReturnType<typeof appInitializedAC>

export const appInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP-INITIALIZED",
        payload: {
            isInitialized
        }
    } as const
}

export const initializeAPPThunkCreator = ():AppThunk => {
    return (dispatch:Dispatch) => {
        dispatch(appInitializedAC(true))
    }
}


