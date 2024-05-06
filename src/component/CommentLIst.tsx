import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { useCommentListContext } from '../context/CommentListContext.tsx';
import { Comment } from '../type/comment.ts';
import CommentCard from './CommentCard.tsx';

function CommentList(): React.JSX.Element {
  const { commentList, setCommentList } = useCommentListContext();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    setIsLoading(true);
    client.getComments().then((data: Comment[]) => {
      console.log(data);
      setCommentList(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <p>
        loading
      </p>
    );
  }

  return (
    <>
      <Navbar />
      {commentList.length ? (
        <div
          style={{
            overflowX: 'auto',
            width: '100%',
            height: '70vh',
            margin: '0.5rem',
          }}
        >
          {commentList.map((comment) => (
            <CommentCard key={comment._id} currentComment={comment} />
          ))}
        </div>
      ) : (
        <div>
          <p>Aucune données trouvés</p>
        </div>
      )}
    </>
  );
}

export default CommentList;
