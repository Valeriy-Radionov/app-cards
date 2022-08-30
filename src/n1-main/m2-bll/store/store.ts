import {combineReducers, legacy_createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {registrReducer} from "./reducers/registReducer";
import {passwordReducer} from "./reducers/passwordReducer";
import {recoveryReducer} from "./reducers/recoveryReducer";
import {errorReducer} from "./reducers/errorReducer";
import {profileReducer} from "./reducers/profileReducer";
const reducers = combineReducers({
    login: loginReducer,
    registr: registrReducer,
    password: passwordReducer,
    recovery: recoveryReducer,
    profile: profileReducer,
    error: errorReducer

})

const store = legacy_createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev