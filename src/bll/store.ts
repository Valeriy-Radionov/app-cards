import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionType, appReducer} from "./appReducer";
import {AuthActionsType, authReducer} from "./authReducer";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionsType =
    | ProfileActionsType
    | AppActionType
    | AuthActionsType

export const useAppDispatch = store.dispatch as ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store // for dev