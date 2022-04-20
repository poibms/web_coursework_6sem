import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './profilePage.scss';

import profilePage from '../../assets/profile_img.png';
import { Context } from '../../index';
import CreateCollection from '../../modals/createCollection/createCollection';

const ProfilePage = observer(() => {
  const [collectVisible, setCollectVisible] = useState(false);
  const { user } = useContext(Context);

  return (
    <div className="container">
      <div className="profile">
        <h2 className="profile_title">Добро пожаловать в ваш профиль</h2>
        <div className='profile_layout'>
          <img src={profilePage} alt="profile img" className="profile_img" />
          <div className="profile_info">
            <div className="profile_title">
              <p className="profile_info-items">email: {user._user.email}</p>
              <p className="profile_info-items">role: {user._user.role}</p>
              <button 
                onClick={() => setCollectVisible(true)}
              >
                Создать коллецию
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateCollection show={collectVisible} onHide={() => setCollectVisible(false)}/>
    </div>
  );
});

export default ProfilePage;
