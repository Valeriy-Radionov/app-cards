import {Dispatch} from "redux";
import {AppRootActionsType} from "../../bll/store";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../bll/appReducer";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch<AppRootActionsType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response?.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
        console.log(error)
    }
    dispatch((setAppStatusAC('failed')))
}