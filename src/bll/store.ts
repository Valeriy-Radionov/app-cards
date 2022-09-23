import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {LoginActionsType, loginReducer} from "./loginReducer";
import {RegistrationActionsType, registrationReducer} from "./registReducer";
import {RecoveryActionsType, recoveryReducer} from "./recoveryReducer";
import {ErrorActionsType, errorReducer} from "./errorReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionType, appReducer} from "./appReducer";

const reducers = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    profile: profileReducer,
    error: errorReducer,
    app: appReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionsType =
    ErrorActionsType
    | LoginActionsType
    | ProfileActionsType
    | RecoveryActionsType
    | RegistrationActionsType
    | AppActionType

export const useAppDispatch = store.dispatch as ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store // for dev