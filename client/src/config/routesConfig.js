import ProfilePage from "../pages/profilePage";
import AdminPage from "../pages/adminPage";
import AuthPage from "../pages/authPage";
import MainPage from "../pages/mainPage";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE, MAIN_ROUTE} from "./routesConsts";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  }
];

export const authRoutes = [
  {
    path: PROFILE_ROUTE + '/:id',
    Component: ProfilePage
  },
]
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage
  },
]