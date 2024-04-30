import React from 'react';
import {
  Avatar, Box, Button, Card, CardHeader, Collapse, Typography,
} from '@mui/material';
import { User } from '../type/user.ts';
import client from '../client/client.ts';
import { usePaginatedUserListContext } from '../context/PaginatedUserListContext.tsx';

import UserUpdateModal from './UserUpdateModal.tsx';

interface UserCardProps {
  currentUser: User;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Centrer verticalement
  overflowY: 'auto',
  width: 600,
  marginBottom: 1,
  border: '1px solid black',
};

function UserCard({ currentUser }: UserCardProps): React.JSX.Element {
  const { paginatedUserList, setPaginatedUserList } = usePaginatedUserListContext();
  const [userExpanded, setUserExpanded] = React.useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = React.useState(false);

  const handleExpandUserClick = () => {
    setUserExpanded(!userExpanded);
  };

  const handleOpenUserModal = () => {
    setUpdateUserModalOpen(true);
  };

  const handleDeleteUserClick = () => {
    client.deleteUser(currentUser._id).then((response) => {
      if (response?.ok) {
        paginatedUserList.items = paginatedUserList.items.filter(
          (user: User) => currentUser._id !== user._id,
        );
        setPaginatedUserList(paginatedUserList);
      }
    });
  };

  return (
    <Box sx={style}>
      <Card onClick={handleExpandUserClick}>
        <div style={{ display: 'flex' }}>
          <CardHeader avatar={(
            <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">
              <Typography variant="subtitle2" color="white">
                {currentUser.username.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
          )}
          />
          <div style={{
            display: 'flex', justifyContent: 'space-between', flex: 1, marginLeft: '1rem', marginTop: '1.5rem',
          }}
          >
            <div>
              <Typography>
                {currentUser.username}
              </Typography>
            </div>
            <div>
              <Typography>
                {currentUser.email}
              </Typography>
            </div>
            <div>
              <Typography style={{ marginRight: '1rem' }}>
                {currentUser.role}
              </Typography>
            </div>
          </div>
        </div>

        <Collapse in={userExpanded} timeout="auto" unmountOnExit>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="primary" onClick={handleOpenUserModal}>Modifier</Button>
            <Button color="warning" onClick={handleDeleteUserClick}>Supprimer</Button>
          </div>
        </Collapse>
      </Card>
      <UserUpdateModal
        open={updateUserModalOpen}
        onClose={() => setUpdateUserModalOpen(false)}
        user={currentUser}
      />
    </Box>
  );
}

export default UserCard;
