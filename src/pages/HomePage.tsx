import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.tsx';
import UserList from '../component/UserList.tsx';

function HomePage(): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <UserList />
    </>
  );
}

export default HomePage;
