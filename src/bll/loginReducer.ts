import {authAPI, LoginDataType} from "../api/auth/auth-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";
import {isLoggedInAC, ProfileActionsType} from "./profileReducer";
import {appInitializedAC} from "./appReducer";

const SET_IS_LOGGED_IN = "LOGIN/SET-IS-LOGGED-IN"

const initState = {
    isLoggedIn: false
}
export const loginReducer = (state = initState, action: LoginActionsType): typeof initState => {
    switch (action.type) {
        // case "LOGIN/SET-IS-LOGGED-IN": {
        //     return {...state, isLoggedIn: action.isLoggedIn}
        // }
        case "PROFILE/LOGGEDIN": {
            return {
                ...state,
                isLoggedIn: action.payload.log
            }
        }
        default: return state
    }
}

export type LoginActionsType = ProfileActionsType //| LoginACType

// type LoginACType = ReturnType<typeof loginAC>
// export const loginAC = (isLoggedIn: boolean) => (
//     {
//         type: SET_IS_LOGGED_IN,
//         isLoggedIn
//     } as const
// )

export const loginTC = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(appInitializedAC(false))
    try {
        const res = await authAPI.login(data)
        dispatch(isLoggedInAC(true))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appInitializedAC(true))
    }

}