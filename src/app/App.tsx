import React from 'react';
import './App.css';
import {Header} from "../components/header/Header";
import {Routs} from "../common/routings/Routs";

const App = () => {
  return (
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
  );
}

export default App;
