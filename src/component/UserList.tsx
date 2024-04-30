import React, { useEffect, useRef, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Button, Card, CardContent, CardHeader, Collapse, Typography,
} from '@mui/material';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { User } from '../type/user.ts';
import { PaginatedList } from '../type/paginatedList.ts';
import UserCard from './UserCard.tsx';
import { usePaginatedUserListContext } from '../context/PaginatedUserListContext.tsx';

const columns: GridColDef[] = [
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'email', headerName: 'Email', width: 180 },
  {
    field: 'favorite',
    headerName: 'Favorite',
    width: 230,
  },
  { field: 'role', headerName: 'Role', width: 130 },
];

function UserList(): React.JSX.Element {
  const { paginatedUserList, setPaginatedUserList } = usePaginatedUserListContext();
  const [limit, setLimit] = useState<number>(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    client.getUsers().then((data: PaginatedList<User>) => {
      setPaginatedUserList(data);
    });
  }, [navigate]);

  if (!paginatedUserList) {
    return (
      <p>
        loading
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centrer verticalement
        alignItems: 'center', // Centrer horizontalement
        height: '100vh', // Hauteur de la vue
        overflowY: 'auto', // Activer le défilement vertical si nécessaire
        width: 600,
      }}
      >
        {paginatedUserList
            && paginatedUserList.items.map((user) => (
              <UserCard key={user._id} currentUser={user} />
            ))}
      </div>
    </>
  );
}

export default UserList;
