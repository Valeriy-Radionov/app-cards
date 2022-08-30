import React from 'react';
import './App.css';
import {Header} from "./n1-main/m1-ui/main/pageNavigation/header/Header";
import {Routs} from "./n1-main/m1-ui/main/pageNavigation/routs/Routs";

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
