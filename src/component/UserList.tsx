import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { User } from '../type/user.ts';
import { PaginatedList } from '../type/paginatedList.ts';
import UserCard from './UserCard.tsx';
import { usePaginatedUserListContext } from '../context/PaginatedUserListContext.tsx';

function UserList(): React.JSX.Element {
  const { paginatedUserList, setPaginatedUserList } = usePaginatedUserListContext();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    setIsLoading(true);
    client.getUsers().then((data: PaginatedList<User>) => {
      setPaginatedUserList(data);
      setIsLoading(false);
    });
  }, [navigate]);

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
