import React from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.scss';

import AppHeader from './components/addHeader/appHeader';

// import MainPage from './pages/mainPage';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <AppHeader/>
      </BrowserRouter>
    </div>
  );
}
export default App;
