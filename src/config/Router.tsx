import { createBrowserRouter } from 'react-router-dom';
import UsersPage from '../pages/UsersPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import HikesPage from '../pages/HikesPage.tsx';
import AlertsPage from '../pages/AlertsPage.tsx';

const Router = createBrowserRouter([
  {
    path: '/users',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <UsersPage />,
  },
  {
    path: '/login',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <LoginPage />,
  },
  {
    path: '/hikes',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <HikesPage />,
  },
  {
    path: '/alerts',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <AlertsPage />,
  },
]);
export default Router;
