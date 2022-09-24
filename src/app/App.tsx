import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../components/header/Header";
import {Routs} from "../common/routings/Routs";
import {Preloader} from "../common/Preloader/Preloader";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../bll/store";
import {initializeAPPThunkCreator} from "../bll/appReducer";

const App = () => {
    const status = useAppSelector((state: AppRootStateType) => state.app.status)
    const isInitialized = useAppSelector((state: AppRootStateType) => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)

    const dispatch = useAppDispatch

    useEffect(() => {
        dispatch(initializeAPPThunkCreator())
    }, [dispatch])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (

        <div className="App">
            {/*
      рекомендуют тут hash router + Provider
      */}
            <Header/>
            {status === "loading" && <Preloader/>}
            <Routs/>
            {/*<Main/> ---> в main будут Header и Router(в роуте пути в виде строковыч констант)
      в папке common компонента с кнопкой инпутом  и Navlink
      */}
        </div>
    );
}

export default App;
