import React, {useContext} from 'react';
import { Switch ,Route, Redirect, Routes, Navigate } from 'react-router-dom';
import {authRoutes, publicRoutes, adminRoutes} from '../config/routesConfig';
import {Context} from "../index";
import { MAIN_ROUTE } from '../config/routesConsts';

const AppRouter = () => {
  const {user} = useContext(Context);
  console.log(user.user);

  return (
    <Routes>
      {user.isAuth ===true  && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      {user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}

      <Route
        path="*"
        element={<Navigate to={MAIN_ROUTE} replace />}
      />
    </Routes>
  );
};

export default AppRouter;