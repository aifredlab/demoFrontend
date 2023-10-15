import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
//const ChatPage = Loadable(lazy(() => import('pages/insurance/ChatPage')));
const ChatPage = Loadable(lazy(() => import('pages/insurance/ChatPage')));

// render - utilities

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ChatPage />
    }
  ]
};

export default MainRoutes;
