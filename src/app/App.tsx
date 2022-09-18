import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../components/header/Header";
import {Routs} from "../common/routings/Routs";
import {Preloader} from "../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../bll/store";
import {initializeAPPThunkCreator} from "../bll/appReducer";

const App = () => {
    const isInitialized = useAppSelector((state: AppRootStateType) => state.app.isInitialized)
    const dispatch = useAppDispatch

    useEffect(() => {
        dispatch(initializeAPPThunkCreator())
    }, [dispatch])



  return (
      isInitialized ?
    <div className="App">
      {/*
      рекомендуют тут hash router + Provider
      */}
      <>
          <Header/>
          <Routs/>
              {/*<Main/> ---> в main будут Header и Router(в роуте пути в виде строковыч констант)
      в папке common компонента с кнопкой инпутом  и Navlink
      */}

      </>
    </div>
          :
          <>
          <Preloader/>
          </>
  );
}

export default App;
