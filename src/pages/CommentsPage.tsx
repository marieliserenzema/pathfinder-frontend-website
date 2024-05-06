import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.tsx';
import { CommentListProvider } from '../context/CommentListContext.tsx';
import CommentList from '../component/CommentLIst.tsx';

function CommentsPage(): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <CommentListProvider>
      <Navbar />
      <CommentList />
    </CommentListProvider>
  );
}

export default CommentsPage;
