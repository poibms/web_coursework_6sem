import React, { useContext } from 'react';
import { Context } from '../../index';
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';

import './authPage.scss';

import AuthForm from '../../components/authForm/authForm';
import { login, registration } from '../../services/userServices';
import { MAIN_ROUTE } from '../../config/routesConsts';

const AuthPage = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const userSubmit = async (isLogin, email, password) => {
    let data;
    if(isLogin) {
      data = await login(email, password);
    } else {
      data = await registration(email, password);
    }
    user.setUser(data)
    user.setIsAuth(true)
    navigate(MAIN_ROUTE)
  }
  return (
    <div className='wrap'>
      <AuthForm onSubmit={userSubmit}/>
    </div>
)
});

export default AuthPage;