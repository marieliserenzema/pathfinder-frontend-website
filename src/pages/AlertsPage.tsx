import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.tsx';
import UserList from '../component/UserList.tsx';
import AlertList from '../component/AlertList.tsx';
import { AlertListProvider } from '../context/PaginatedAlertListContext.tsx';

function AlertsPage(): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AlertListProvider>
      <Navbar />
      <AlertList />
    </AlertListProvider>
  );
}

export default AlertsPage;
