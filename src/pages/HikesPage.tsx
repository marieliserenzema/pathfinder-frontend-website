import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.tsx';
import HikeList from '../component/HikeList.tsx';

function HikesPage(): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <HikeList />
    </>
  );
}

export default HikesPage;
