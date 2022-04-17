import React from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.scss';

import AppHeader from './components/addHeader/appHeader';
import AppRouter from './components/AppRouter';

// import MainPage from './pages/mainPage';

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>

  );
}
export default App;
