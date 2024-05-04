import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../client/client.ts';
import Navbar from './Navbar.tsx';
import { PaginatedList } from '../type/paginatedList.ts';
import { usePaginatedHikeListContext } from '../context/PaginatedHikeListContext.tsx';
import { Hike } from '../type/hike.ts';
import HikeCard from './HikeCard.tsx';

function HikeList(): React.JSX.Element {
  const { paginatedHikeList, setPaginatedHikeList } = usePaginatedHikeListContext();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
    setIsLoading(true);
    client.getHikes().then((data: PaginatedList<Hike>) => {
      setPaginatedHikeList(data);
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
      {paginatedHikeList && (
        <div
          style={{
            overflowX: 'auto',
            width: '100%',
            height: '70vh',
            margin: '0.5rem',
          }}
        >
          {paginatedHikeList.items.map((hike) => (
            <HikeCard key={hike._id} currentHike={hike} />
          ))}
        </div>
      )}
    </>
  );
}

export default HikeList;
