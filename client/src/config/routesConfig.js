import ProfilePage from "../pages/profilePage/profilePage";
import AdminPage from "../pages/adminPage";
import AuthPage from "../pages/authPage/authPage";
import MainPage from "../pages/mainPage";
import CollectionPage from "../pages/collectionPage";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, COLLECTION_ROUTE} from "./routesConsts";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
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