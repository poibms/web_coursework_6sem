import React from 'react';
import {useParams} from 'react-router-dom';
const ProfilePage = () => {
  const params = useParams();
  console.log(params);
  return (
    <h1>ProfilePage {params.id}</h1>
  )
}

export default ProfilePage;