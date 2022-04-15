import {React} from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../config/routes';
import './appHeader.scss';

const AppHeader = () => {
  return (
  <div className="header">
    <h1>My litle collection</h1>
    <div className='header_menu'>
      <ul>
        <li><NavLink to={REGISTRATION_ROUTE}>Sing Up</NavLink></li>
        <li><NavLink to={LOGIN_ROUTE}>Sign in</NavLink></li>
      </ul>
    </div>
    
  </div>
  )
}

export default AppHeader;