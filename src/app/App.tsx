import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../components/header/Header";
import {Routs} from "../common/routes/Routs";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../bll/store";
import {initializeAPPThunkCreator} from "../bll/appReducer";
import {ErrorSnackbar} from "../components/error/ErrorSnackbar";
import {CircularProgress} from "@mui/material";

const App = () => {
    const isInitialized = useAppSelector((state: AppRootStateType) => state.app.isInitialized)
    const dispatch = useAppDispatch

    useEffect(() => {
        dispatch(initializeAPPThunkCreator())
    }, [dispatch])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (

        <div className="App">

            <ErrorSnackbar/>
            {/*
      рекомендуют тут hash router + Provider
      */}
            <Header/>
            <Routs/>
            {/*<Main/> ---> в main будут Header и Router(в роуте пути в виде строковыч констант)
      в папке common компонента с кнопкой инпутом  и Navlink
      */}
        </div>
    );
}

export default App;
