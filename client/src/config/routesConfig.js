import ProfilePage from "../pages/profilePage/profilePage";
import AdminPage from "../pages/adminPage";
import AuthPage from "../pages/authPage/authPage";
import MainPage from "../pages/mainPage";
import CollectionPage from "../pages/collectionPage";
import AdminCollList from "../components/adminList/adminCollectList";
import AdminListUsers from "../components/adminList/adminListUsers";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, MAIN_ROUTE, COLLECTION_ROUTE, ADMINCOLLLIST_ROUTE, ADMINUSERLIST_ROUTE} from "./routesConsts";

export const adminRoutes = [
  {
    path: ADMINCOLLLIST_ROUTE,
    Component: AdminCollList
  },
  {
    path: ADMINUSERLIST_ROUTE,
    Component: AdminListUsers
  }
];

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
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
  {
    path: COLLECTION_ROUTE + '/:id',
    Component: CollectionPage
  },
]