import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { User } from '../type/user.ts';
import { PaginatedList } from '../type/paginatedList.ts';

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
  const [paginatedUsers, setPaginatedUsers] = useState<PaginatedList<User> | undefined>(undefined);
  const [limit, setLimit] = useState<number>(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    client.getUsers().then((data: PaginatedList<User>) => {
      setPaginatedUsers(data);
    });
  }, [navigate]);

  if (!paginatedUsers) {
    return (
      <p>
        loading
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ width: '100%' }}>
        <DataGrid
          autosizeOptions={{
            columns: ['username', 'email', 'role', 'favorite'],
          }}
          getRowId={(user: User) => user._id}
          sx={{ width: '100%', height: '100%' }}
          rows={paginatedUsers.items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: paginatedUsers.currentPage, pageSize: limit },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default UserList;
