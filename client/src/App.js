import React, { useEffect, useContext, useState } from 'react';
import {BrowserRouter} from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import './App.scss';

import {Context} from './index';
import AppRouter from './components/AppRouter';
import { check } from './services/userServices';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        user.setUser(true);
        user.setIsAuth(true);
      }).finally(() => setLoading(false))
    }, 1000)
  }, [])

  if(loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>

  );
});
export default App;
