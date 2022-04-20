import {React, useContext} from 'react';
import {Context} from'../../index';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from '../../config/routesConsts';
import './appHeader.scss';

const AppHeader = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate();
  console.log(user._user.id)

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    navigate(MAIN_ROUTE);
  }
  return (
  <div className="header">
    <h1>My litle collection</h1>
    <div className='header_menu'>
      {user.isAuth ? (
        <ul>
          <li><NavLink to={PROFILE_ROUTE}>Account</NavLink></li>
          <li><button onClick={() => logOut()}>LOG out</button></li>
      </ul>
      ) : (
        <ul>
          <li><NavLink to={REGISTRATION_ROUTE}>Sing Up</NavLink></li>
          <li><NavLink to={LOGIN_ROUTE}>Sign in</NavLink></li>
        </ul>
      )}
      
    </div>
    
  </div>
  )
});

export default AppHeader;