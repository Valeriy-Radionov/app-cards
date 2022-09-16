import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {LoginActionsType, loginReducer} from "./reducers/loginReducer";
import {RegistrationActionsType, registrationReducer} from "./reducers/registReducer";
import {PasswordActionsType, passwordReducer} from "./reducers/passwordReducer";
import {RecoveryActionsType, recoveryReducer} from "./reducers/recoveryReducer";
import {ErrorActionsType, errorReducer} from "./reducers/errorReducer";
import {ProfileActionsType, profileReducer} from "./reducers/profileReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
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
export type AppActionsType = ErrorActionsType | LoginActionsType | PasswordActionsType | ProfileActionsType | RecoveryActionsType | RegistrationActionsType

export const useAppDispatch = store.dispatch as ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store // for dev