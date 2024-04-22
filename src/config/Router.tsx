import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage.tsx';
import LoginPage from '../pages/LoginPage.tsx';

const Router = createBrowserRouter([
  {
    path: '/',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <HomePage />,
  },
  {
    path: '/login',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <LoginPage />,
  },
]);
export default Router;
