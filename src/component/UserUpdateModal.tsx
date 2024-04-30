import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import React from 'react';
import { User } from '../type/user.ts';
import client from '../client/client.ts';
import { usePaginatedUserListContext } from '../context/PaginatedUserListContext.tsx';
import { PaginatedList } from '../type/paginatedList.ts';

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const style = {
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  textArea: {
    width: '100%',
    height: '3rem',
    border: '1px solid #000',
    resize: 'none',
    padding: '10px',
    marginBottom: '10px',
  },
};

function UserUpdateModal({ open, onClose, user }: UpdateModalProps): React.JSX.Element {
  const { setPaginatedUserList } = usePaginatedUserListContext();

  const loadUserList = () => {
    client.getUsers().then((data: PaginatedList<User>) => {
      setPaginatedUserList(data);
    });
  };

  const submitChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.elements.namedItem('username') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const selectedRole = form.elements.namedItem('selectedRole') as HTMLInputElement;

    const data: { username: string, email: string, selectedRole: string, password?: string} = {
      username: !username.value ? user.username : username.value,
      email: !email.value ? user.email : email.value,
      selectedRole: !selectedRole.value ? user.role : selectedRole.value,
      password: password.value,
    };

    if (!password.value) {
      delete data.password;
    }

    const stringifiedData = JSON.stringify(data);

    client.updateUser(user._id, stringifiedData).then((response) => {
      if (response?.ok) {
        username.value = '';
        email.value = '';
        password.value = '';
        loadUserList();
        onClose();
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.box}>
        <form
          method="post"
          onSubmit={submitChange}
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <textarea
            name="username"
            placeholder={user.username}
            style={style.textArea}
          />
          <textarea
            name="email"
            placeholder={user.email}
            style={style.textArea}
          />
          <textarea
            name="password"
            placeholder="password"
            style={style.textArea}
          />
          <select name="selectedRole" style={style.textArea}>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              justifyContent: 'flex-end', borderRadius: '30px',
            }}
          >
            <Typography color="white" sx={{ fontSize: '12px' }}>
              Sauvegarder les changements
            </Typography>
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UserUpdateModal;
