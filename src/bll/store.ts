import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {LoginActionsType, loginReducer} from "./loginReducer";
import {RegistrationActionsType, registrationReducer} from "./registReducer";
import {PasswordActionsType, passwordReducer} from "./passwordReducer";
import {RecoveryActionsType, recoveryReducer} from "./recoveryReducer";
import {ErrorActionsType, errorReducer} from "./errorReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import axios from "axios";

const reducers = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    password: passwordReducer,
    recovery: recoveryReducer,
    profile: profileReducer,
    error: errorReducer

})

export const store = legacy_createStore(reducers,applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionsType = ErrorActionsType | LoginActionsType | PasswordActionsType | ProfileActionsType | RecoveryActionsType | RegistrationActionsType

export const useAppDispatch = store.dispatch as ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store // for dev