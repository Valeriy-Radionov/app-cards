import {authAPI, LoginDataType} from "../api/auth/auth-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";
import {isLoggedInAC, ProfileActionsType, setProfileAC} from "./profileReducer";
import {appInitializedAC} from "./appReducer";

const initState = {}
export const loginReducer = (state = initState, action: LoginActionsType): typeof initState => {
    switch (action.type) {
        default:
            return state
    }
}

export type LoginActionsType = ProfileActionsType

export const loginTC = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(appInitializedAC(false))
    try {
        const res = await authAPI.login(data)
        dispatch(isLoggedInAC(true))
        dispatch(setProfileAC(res.data))

    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appInitializedAC(true))
    }

}