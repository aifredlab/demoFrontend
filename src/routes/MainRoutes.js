import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
//const ChatPage = Loadable(lazy(() => import('pages/insurance/ChatPage')));
const ChatPage = Loadable(lazy(() => import('pages/insurance/ChatPage')));

// render - utilities

// ==============================|| MAIN ROUTING ||============================== //

//TODO: 임시..startup 시에 /free 로 가는거 수정해야함
const Temp = () => {
  location.href = '/';
  return <></>;
};

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ChatPage />
    },
    {
      path: '/free',
      element: <Temp />
    }
  ]
};

export default MainRoutes;
