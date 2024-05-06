import React from 'react';
import {
  Box, Button, Card, Collapse, Typography,
} from '@mui/material';
import client from '../client/client.ts';
import { useCommentListContext } from '../context/CommentListContext.tsx';
import { Comment } from '../type/comment.ts';

interface CommentCardProps {
  currentComment: Comment;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: 'auto',
  width: 600,
  marginBottom: 1,
  border: '1px solid black',
};

function CommentCard({ currentComment }: CommentCardProps): React.JSX.Element {
  const { commentList, setCommentList } = useCommentListContext();
  const [commentExpanded, setCommentExpanded] = React.useState(false);

  const handleExpandCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };

  const handleDeleteCommentClick = () => {
    client.deleteComment(currentComment._id).then((response) => {
      if (response?.ok) {
        setCommentList(commentList.filter(
          (comment: Comment) => currentComment._id !== comment._id,
        ));
      }
    });
  };

  return (
    <Box sx={style}>
      <Card onClick={handleExpandCommentClick}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', flex: 1, margin: '1rem',
        }}
        >
          {currentComment.user !== null ? (
            <Typography>
              {'De '}
              {currentComment.user.username}
            </Typography>
          ) : (
            <Typography>
              Utilisateur inconnue
            </Typography>
          )}
          <Typography>
            {' le '}
            {new Date(currentComment.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </div>

        <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            textAlign: 'start',
            marginLeft: '0.5rem',
          }}
          >
            <div style={{ margin: '0.5rem' }}>
              {currentComment.text}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="warning" onClick={handleDeleteCommentClick}>Supprimer</Button>
          </div>
        </Collapse>
      </Card>
    </Box>
  );
}

export default CommentCard;
