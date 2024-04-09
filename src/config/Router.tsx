import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage.tsx';
import Loginpage from '../pages/Loginpage.tsx';

const Router = createBrowserRouter([
  {
    path: '/',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <Homepage />,
  },
  {
    path: '/login',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <Loginpage />,
  },
]);
export default Router;
